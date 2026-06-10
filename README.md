# ⚽ KitStore — E-commerce de camisas de fútbol

Tienda online premium de camisas de fútbol para Colombia. Estética editorial
oscura con detalles eléctricos. Monorepo fullstack con Next.js.

> **Nombre provisional** — la marca oficial se definirá más adelante.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript estricto |
| Estilos | Tailwind CSS v4 (config CSS-first) + shadcn/ui |
| Animaciones | Motion (ex Framer Motion) + GSAP + ScrollTrigger |
| 3D | React Three Fiber v9 + drei (hero) |
| Estado | Zustand + `persist` (carrito) |
| Auth + DB | Supabase (Postgres + RLS + Auth Google) vía `@supabase/ssr` |
| Pagos | Wompi (PSE, Nequi, tarjetas) |
| Deploy | Vercel |

## Estado del proyecto

- ✅ **Fase 1** — Setup, sistema de diseño, tipos, utilidades.
- ✅ **Fase 2 (código)** — Clientes Supabase, proxy de auth, login con Google,
  callback OAuth, schema SQL. _Falta configurar la cuenta de Supabase._
- ✅ **Frontend de muestra** — Home, catálogo, detalle de producto (con
  personalización de dorsal en vivo) y login, usando datos mock
  (`lib/mock-data.ts`) para previsualizar sin base de datos.
- ⏳ **Pendiente** — Carrito (Zustand), checkout Wompi, dashboard de pedidos,
  hero 3D y animaciones, conexión real a Supabase.

## Cómo correrlo en local

```bash
# 1. Instalar dependencias
npm install

# 2. Variables de entorno
cp .env.example .env.local
# (para solo ver el frontend de muestra no necesitas valores reales todavía)

# 3. Desarrollo
npm run dev      # http://localhost:3000
```

## Configurar Supabase (pendiente)

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. SQL Editor → pegar y ejecutar `supabase/schema.sql`.
3. Authentication → habilitar **Google** como proveedor OAuth.
4. Copiar `Project URL` y `anon key` a `.env.local`.
5. (Storage) Crear el bucket público `productos` para las imágenes.

## Estructura

```
app/
  (store)/        catálogo, producto/[slug]
  (auth)/         login, auth/callback
  page.tsx        home
components/
  layout/         Navbar, Footer, Providers
  store/          ProductCard, ProductDetail, JerseyVisual, WhatsAppButton
  ui/             primitivos (shadcn)
hooks/            useAuth
lib/
  supabase/       client, server, middleware (proxy)
  whatsapp/       helper
  utils.ts        formatCOP, slugify, ...
supabase/         schema.sql
types/            tipos globales
```
