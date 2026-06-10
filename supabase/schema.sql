-- ============================================
-- KITSTORE — Schema PostgreSQL para Supabase
-- Ejecutar en el SQL Editor de Supabase.
-- ============================================

-- Extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- TABLA: profiles  (extiende auth.users)
-- ─────────────────────────────────────────────
CREATE TABLE profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name   TEXT,
  avatar_url  TEXT,
  phone       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: crear perfil automáticamente al registrar usuario
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─────────────────────────────────────────────
-- TABLA: categorias
-- ─────────────────────────────────────────────
CREATE TABLE categorias (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre     TEXT NOT NULL,
  tipo       TEXT NOT NULL CHECK (tipo IN ('liga', 'equipo', 'seleccion')),
  slug       TEXT UNIQUE NOT NULL,
  imagen_url TEXT,
  orden      INTEGER DEFAULT 0,
  activo     BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- TABLA: productos
-- ─────────────────────────────────────────────
CREATE TABLE productos (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre           TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  descripcion      TEXT,
  equipo           TEXT NOT NULL,
  liga             TEXT NOT NULL,
  temporada        TEXT NOT NULL,          -- ej: '2024/2025'
  version          TEXT NOT NULL CHECK (version IN ('jugador', 'aficionado')),
  precio           NUMERIC(10,2) NOT NULL CHECK (precio > 0),
  precio_descuento NUMERIC(10,2) CHECK (precio_descuento > 0),
  imagenes         TEXT[] DEFAULT '{}',    -- URLs de Supabase Storage
  categoria_id     UUID REFERENCES categorias(id) ON DELETE SET NULL,
  activo           BOOLEAN DEFAULT TRUE,
  featured         BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- TABLA: variantes  (producto + talla + stock)
-- ─────────────────────────────────────────────
CREATE TABLE variantes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  producto_id UUID REFERENCES productos(id) ON DELETE CASCADE NOT NULL,
  talla       TEXT NOT NULL CHECK (talla IN ('XS', 'S', 'M', 'L', 'XL', 'XXL')),
  stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(producto_id, talla)
);

-- ─────────────────────────────────────────────
-- TABLA: ordenes
-- ─────────────────────────────────────────────
CREATE TABLE ordenes (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id              UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  estado               TEXT NOT NULL DEFAULT 'pendiente'
                         CHECK (estado IN ('pendiente', 'pagado', 'procesando', 'enviado', 'entregado', 'cancelado')),
  total                NUMERIC(10,2) NOT NULL CHECK (total > 0),
  wompi_referencia     TEXT UNIQUE,         -- referencia que enviamos a Wompi
  wompi_transaction_id TEXT,                -- ID confirmado por Wompi
  datos_envio          JSONB NOT NULL,      -- { nombre, apellido, direccion, ... }
  notas                TEXT,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- TABLA: items_orden
-- ─────────────────────────────────────────────
CREATE TABLE items_orden (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  orden_id         UUID REFERENCES ordenes(id) ON DELETE CASCADE NOT NULL,
  producto_id      UUID REFERENCES productos(id) ON DELETE RESTRICT NOT NULL,
  variante_id      UUID REFERENCES variantes(id) ON DELETE RESTRICT NOT NULL,
  cantidad         INTEGER NOT NULL DEFAULT 1 CHECK (cantidad > 0),
  precio_unitario  NUMERIC(10,2) NOT NULL CHECK (precio_unitario > 0),
  personalizacion  JSONB,                   -- { nombre: "Messi", numero: "10" } | null
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- FUNCIÓN: descontar stock atómicamente
-- Se llama tras confirmar el pago vía webhook.
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION descontar_stock_orden(p_orden_id UUID)
RETURNS VOID AS $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN
    SELECT variante_id, cantidad
    FROM items_orden
    WHERE orden_id = p_orden_id
  LOOP
    UPDATE variantes
    SET stock = stock - item.cantidad
    WHERE id = item.variante_id
      AND stock >= item.cantidad;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Stock insuficiente para variante %', item.variante_id;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────────
-- TRIGGER: updated_at automático
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER productos_updated_at
  BEFORE UPDATE ON productos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER ordenes_updated_at
  BEFORE UPDATE ON ordenes
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─────────────────────────────────────────────
-- RLS (Row Level Security)
-- ─────────────────────────────────────────────

-- Profiles: solo el propio usuario
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_own" ON profiles
  FOR ALL USING (auth.uid() = id);

-- Productos: lectura pública (solo activos)
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "productos_read_public" ON productos
  FOR SELECT USING (activo = TRUE);

-- Variantes: lectura pública
ALTER TABLE variantes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "variantes_read_public" ON variantes
  FOR SELECT USING (TRUE);

-- Categorías: lectura pública (solo activas)
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categorias_read_public" ON categorias
  FOR SELECT USING (activo = TRUE);

-- Órdenes: solo el propio usuario
ALTER TABLE ordenes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ordenes_own_read" ON ordenes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ordenes_own_insert" ON ordenes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Items de orden: usuario propietario de la orden
ALTER TABLE items_orden ENABLE ROW LEVEL SECURITY;
CREATE POLICY "items_orden_own" ON items_orden
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ordenes
      WHERE ordenes.id = items_orden.orden_id
        AND ordenes.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────
-- ÍNDICES para performance
-- ─────────────────────────────────────────────
CREATE INDEX idx_productos_slug ON productos(slug);
CREATE INDEX idx_productos_liga ON productos(liga);
CREATE INDEX idx_productos_equipo ON productos(equipo);
CREATE INDEX idx_productos_featured ON productos(featured) WHERE featured = TRUE;
CREATE INDEX idx_variantes_producto ON variantes(producto_id);
CREATE INDEX idx_ordenes_user ON ordenes(user_id);
CREATE INDEX idx_ordenes_wompi_ref ON ordenes(wompi_referencia);
CREATE INDEX idx_items_orden ON items_orden(orden_id);
