// ============================================================
// KITSTORE — Tipos TypeScript globales
// ============================================================

// ─── Supabase DB Types ───────────────────────────────────────────

export type Categoria = {
  id: string;
  nombre: string;
  tipo: "liga" | "equipo" | "seleccion";
  slug: string;
  imagen_url: string | null;
  orden: number;
};

export type Talla = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Variante = {
  id: string;
  producto_id: string;
  talla: Talla;
  stock: number;
};

export type Producto = {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  equipo: string;
  liga: string;
  temporada: string;
  version: "jugador" | "aficionado";
  precio: number;
  precio_descuento: number | null;
  imagenes: string[];
  categoria_id: string | null;
  activo: boolean;
  featured: boolean;
  variantes?: Variante[];
};

export type DatosEnvio = {
  nombre: string;
  apellido: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  codigo_postal?: string;
  telefono: string;
};

export type EstadoOrden =
  | "pendiente"
  | "pagado"
  | "procesando"
  | "enviado"
  | "entregado"
  | "cancelado";

export type ItemOrden = {
  id: string;
  orden_id: string;
  producto_id: string;
  variante_id: string;
  cantidad: number;
  precio_unitario: number;
  personalizacion: Personalizacion | null;
  producto?: Producto;
  variante?: Variante;
};

export type Orden = {
  id: string;
  user_id: string;
  estado: EstadoOrden;
  total: number;
  wompi_referencia: string | null;
  wompi_transaction_id: string | null;
  datos_envio: DatosEnvio;
  notas: string | null;
  created_at: string;
  updated_at: string;
  items?: ItemOrden[];
};

// ─── Carrito ────────────────────────────────────────────────────

export type Personalizacion = {
  nombre?: string;
  numero?: string;
};

export type CartItem = {
  productoId: string;
  varianteId: string;
  nombre: string;
  imagen: string;
  equipo: string;
  talla: string;
  precio: number;
  cantidad: number;
  personalizacion?: Personalizacion;
};

// ─── API Responses ───────────────────────────────────────────────

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

// ─── Filtros de catálogo ─────────────────────────────────────────

export type FiltrosCatalogo = {
  liga?: string;
  equipo?: string;
  talla?: string;
  version?: "jugador" | "aficionado";
  temporada?: string;
  page?: number;
  limit?: number;
};

// ─── Wompi ───────────────────────────────────────────────────────

export type WompiTransactionStatus =
  | "APPROVED"
  | "DECLINED"
  | "VOIDED"
  | "ERROR";

export type WompiWebhookEvent = {
  event: string;
  data: {
    transaction: {
      id: string;
      reference: string;
      status: WompiTransactionStatus;
      amount_in_cents: number;
      currency: string;
    };
  };
  signature: {
    checksum: string;
    properties: string[];
  };
  timestamp: number;
};
