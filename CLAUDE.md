# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

**Rewind** — e-commerce de camisas de fútbol retro premium para Colombia (monorepo fullstack Next.js).
Idioma del dominio: **español** (productos, ordenes, variantes, items_orden, datos_envio…).
Paleta: navy `#1C2346` + oro satinado `#C9A84C`. Tipografía display: Oswald + Abril Fatface.

## Comandos

```bash
npm run dev      # desarrollo (http://localhost:3000)
npm run build    # build de producción (corre también el typecheck de TS)
npm start        # servir el build
npm run lint     # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
```

No hay framework de tests configurado todavía. El typecheck vive dentro de `next build`.

## Stack real (diverge del spec original — es intencional)

El spec de diseño pedía Next 14 / Tailwind v3 / `@supabase/auth-helpers-nextjs`.
Este repo usa deliberadamente versiones modernas. **No revertir a las del spec.**

- **Next.js 16** (App Router) + **React 19** + TypeScript estricto
- **Tailwind CSS v4** — config CSS-first, **no existe `tailwind.config.ts`**
- **`@supabase/ssr`** (el `auth-helpers-nextjs` del spec está deprecado)
- **React Three Fiber v9** (compat. React 19), **Motion** (ex framer-motion), GSAP
- Zustand, react-hook-form + zod, shadcn/ui (`components.json`, estilo new-york)

## Sistema de diseño (Tailwind v4)

Los tokens viven en `app/globals.css` dentro de `@theme`, no en un archivo JS.
Las utilidades custom generadas son: `bg-base/surface/elevated`, `border-edge`,
`text-content/muted/disabled`, `bg-accent-green` (dorado `#C9A84C`), `bg-accent-red` (rojo `#C0392B`), y las fuentes
`font-display` (Oswald), `font-brand` (Abril Fatface — logo/hero), `font-body` (Inter), `font-mono` (JetBrains).
`globals.css` fuerza `h1–h4` a `uppercase` con `font-display`; para texto normal
en headings usar `normal-case`. Radius por defecto 4px (estética geométrica).

## Arquitectura

**Auth/Supabase — tres clientes según el contexto** (no mezclarlos):
- `lib/supabase/client.ts` → `createClient()` para Client Components (anon key).
- `lib/supabase/server.ts` → `createClient()` (async, lee cookies) para Server
  Components / Route Handlers; y `createAdminClient()` con **service role**,
  bypassa RLS, solo server-side de confianza (webhooks, descontar stock).
- `lib/supabase/middleware.ts` → `updateSession()` refresca la sesión y protege
  rutas. La lista de rutas privadas está en `RUTAS_PROTEGIDAS` (`/dashboard`).
- `proxy.ts` (raíz) llama a `updateSession`. En Next 16 el `middleware.ts` se
  renombra a **`proxy.ts`** con función exportada `proxy`.

**Capa de datos — actualmente mock:** el frontend se alimenta de
`lib/mock-data.ts` (`MockProducto` = `Producto` + `colores` para el SVG). La
conexión real a Supabase (API Routes `/api/...`) está pendiente. Al implementarla,
reemplazar los imports de mock por fetch real respetando los tipos de `types/index.ts`.

**Imágenes de producto:** `components/store/JerseyVisual.tsx` dibuja una camiseta
SVG con los colores del producto como placeholder premium. Las fotos reales irán
en Supabase Storage (bucket `productos`) y poblarán `Producto.imagenes`.

**Rutas:** grupos `app/(store)` y `app/(auth)` no afectan la URL. El home es
`app/page.tsx` — **no crear `app/(store)/page.tsx`** (colisiona en `/`).

## Reglas de dominio que se rompen fácil

- **Dinero:** precios en BD/tipos en **pesos COP**. Wompi cobra en **centavos** →
  usar `copACentavos()`. Formatear siempre con `formatCOP()` (`lib/utils.ts`).
- **Webhook de Wompi** (`/api/webhooks/wompi`, pendiente) debe responder **200
  siempre**, incluso ante error interno (Wompi reintenta si no recibe 200).
  El descuento de stock se hace vía la función SQL `descontar_stock_orden`.
- **RLS activo** en todas las tablas (ver `supabase/schema.sql`): productos/
  variantes/categorías lectura pública; ordenes/items_orden/profiles solo del
  dueño. El service role la bypassa — usarlo solo en webhooks/operaciones server.
- **GSAP y R3F** solo en client components; importar el canvas 3D con
  `next/dynamic` `{ ssr: false }`. No superponer GSAP y Motion en el mismo nodo.

## Base de datos

`supabase/schema.sql` es la fuente de verdad (8 tablas, RLS, triggers de
`updated_at`, trigger `handle_new_user` que crea el profile, función
`descontar_stock_orden`). Se ejecuta manualmente en el SQL Editor de Supabase.

## Git

Se trabaja directo en `main` (decisión del owner para este proyecto solo-dev).
`.env.local` está gitignorado; nunca commitear secretos. `.env.example` es el template.
