# CLAUDE.md — Cerebro del Proyecto

> Este archivo es la fuente de verdad compartida entre Claude y el repositorio.
> Al final de cada sesión de trabajo, Claude lo actualiza con avances, decisiones y pendientes.
> **No crear memorias fragmentadas — todo vive aquí.**

---

## 1. Identidad

**Nombre:** Rewind (nombre de marca activo en UI y código)
**Producto:** E-commerce de camisas de fútbol premium para Colombia — versión jugador y aficionado con personalización de dorsal.
**Diferencial:** Confianza y calidad percibida. No somos réplicas baratas ni marketplace genérico. Somos la tienda donde el hincha confía.
**Usuarios:** Hinchas jóvenes 16–30 + compradores de regalo. Compra impulsiva y emocional, mayoritariamente móvil.
**Referencia de feeling:** Nike.com — producto que domina, tipografía bold, UI que sirve al producto.
**Anti-references:** Tiendas de réplicas baratas, SaaS bland, marketplaces genéricos (Falabella, ML).

> **Nota de branding:** `login/page.tsx` aún dice "KITSTORE" (nombre anterior). Pendiente unificar todo a "Rewind".

---

## 2. Comandos

```bash
npm run dev      # desarrollo → http://localhost:3000
npm run build    # build de producción (incluye typecheck TS)
npm start        # servir el build
npm run lint     # ESLint flat config
```

No hay framework de tests. El typecheck vive en `next build`.

---

## 3. Stack

| Capa | Tecnología | Nota |
|------|-----------|------|
| Framework | Next.js 16 (App Router) | No revertir a versiones del spec original |
| UI | React 19 + TypeScript estricto | |
| Estilos | Tailwind CSS v4 | Config CSS-first, **no existe `tailwind.config.ts`** |
| Auth/DB | Supabase (`@supabase/ssr`) | `auth-helpers-nextjs` está deprecado, no usarlo |
| 3D | React Three Fiber v9 + Drei | Solo client components, `dynamic({ ssr: false })` |
| Animación | GSAP + ScrollTrigger | Solo client components |
| Motion | Motion (ex framer-motion) | No superponer con GSAP en el mismo nodo |
| Estado | Zustand v5 | Sin Provider, persistencia en localStorage |
| Formularios | react-hook-form + zod | |
| Componentes | shadcn/ui (estilo new-york) | |
| Pagos | Wompi (pendiente) | Webhook `/api/webhooks/wompi` aún no implementado |

---

## 4. Variables de entorno

Ver `.env.example`. Todas requeridas para funcionar:

```
NEXT_PUBLIC_SUPABASE_URL          # URL del proyecto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY     # clave pública (anon)
SUPABASE_SERVICE_ROLE_KEY         # bypassa RLS — solo server-side
NEXT_PUBLIC_WHATSAPP_NUMBER       # número sin "+" (ej. 573001234567)
```

---

## 5. Sistema de diseño (Tailwind v4)

Los tokens viven en `app/globals.css` dentro de `@theme`. No hay `tailwind.config.ts`.

### Paleta
| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-base` | `oklch(0.082 0.010 265)` | Fondo principal (dark-void) |
| `--bg-surface` | `oklch(0.115 0.012 265)` | Cards, paneles |
| `--bg-elevated` | `oklch(0.158 0.018 265)` | Dropdowns, modales |
| `--border-edge` | `oklch(0.178 0.020 265)` | Bordes |
| `--accent-green` | `oklch(0.82 0.22 155)` | Volt-green — CTAs primarios |
| `--accent-red` | `oklch(0.61 0.22 10)` | Signal-red — badges, errores |
| `--text-content` | `oklch(0.945 0.005 265)` | Texto principal |
| `--text-muted` | `oklch(0.490 0.018 275)` | Texto secundario |
| `--text-disabled` | `oklch(0.295 0.018 270)` | Texto deshabilitado |

**Regla scarcity:** máximo 4 elementos volt-green por viewport.

### Tipografía
| Token | Fuente | Uso |
|-------|--------|-----|
| `font-display` | Oswald | Headings, UI authority |
| `font-brand` | Abril Fatface | Logo, hero statements |
| `font-body` | Inter | Texto de cuerpo |
| `font-mono` | JetBrains Mono | Labels, precios, datos |

`globals.css` fuerza `h1–h4` a `uppercase font-display`. Para texto normal en headings usar `normal-case`.
Radius por defecto: 4px (estética geométrica).

### Utilidades custom generadas
`bg-base`, `bg-surface`, `bg-elevated`, `border-edge`, `text-content`, `text-muted`, `text-disabled`, `bg-accent-green`, `bg-accent-red`, `font-display`, `font-brand`, `font-body`, `font-mono`.

---

## 6. Arquitectura

### Auth/Supabase — tres clientes, no mezclarlos

```
lib/supabase/client.ts    → createClient()        Client Components (anon key)
lib/supabase/server.ts    → createClient()        Server Components / Route Handlers (async, lee cookies)
                          → createAdminClient()   Webhooks / operaciones server (service role, bypassa RLS)
lib/supabase/middleware.ts → updateSession()      Refresca sesión, protege rutas (/dashboard)
proxy.ts                  → llama updateSession() Middleware de Next.js 16 (se llama proxy.ts, no middleware.ts)
```

Auth: **solo Google OAuth**. No hay email/contraseña. Hook: `hooks/useAuth.ts`.

### Carrito — `lib/store/cart.ts`

- Persiste `items` en localStorage bajo la key `"rewind-cart"`. El `isOpen` del drawer **no** se persiste.
- `lineId` = `varianteId|nombre|numero`. Mismo producto con distinta personalización = líneas separadas.
- Selectores exportados: `selectCount` (unidades totales), `selectSubtotal` (total COP).
- Zustand no requiere Provider. `CartDrawer` vive en `components/layout/Providers.tsx`.
- Componentes que leen el carrito deben usar `useHydrated()` para evitar mismatch SSR/localStorage.

### Capa de datos — actualmente mock

Todo el frontend corre sobre `lib/mock-data.ts`. `MockProducto` = `Producto` + `colores` para el SVG.
La capa `/api/...` **no está implementada**. Al implementarla: reemplazar imports de mock por fetch real respetando `types/index.ts`.

### Imágenes de producto

`components/store/JerseyVisual.tsx` dibuja una camiseta SVG paramétrica con los colores del producto como placeholder premium. Las fotos reales irán en Supabase Storage (bucket `productos`) y poblarán `Producto.imagenes`.

### Rutas

- Grupos `app/(store)` y `app/(auth)` no afectan la URL.
- Home: `app/page.tsx` — **no crear `app/(store)/page.tsx`** (colisiona en `/`).
- `/dashboard` está protegida en el middleware pero la página no existe aún.
- Auth callback: redirige a `/dashboard/pedidos` (ruta aún no implementada).

### WhatsApp

`lib/whatsapp/helper.ts` → `buildWhatsAppUrl()` construye links `wa.me` pre-formateados.
`WhatsAppButton` aparece en todas las páginas de tienda, acepta prop `producto` opcional.

---

## 7. Reglas de dominio

- **Dinero:** precios en BD en **pesos COP**. Wompi cobra en **centavos** → usar `copACentavos()`. Formatear siempre con `formatCOP()` (`lib/utils.ts`).
- **Webhook Wompi** (`/api/webhooks/wompi`, pendiente): debe responder **200 siempre**, incluso en error interno — Wompi reintenta si no recibe 200. Descuento de stock vía función SQL `descontar_stock_orden`.
- **RLS activo** en todas las tablas: productos/variantes/categorías = lectura pública; ordenes/items_orden/profiles = solo del dueño. Service role la bypassa — solo en webhooks y operaciones server de confianza.
- **GSAP y R3F** solo en client components. Canvas 3D con `next/dynamic { ssr: false }`. No superponer GSAP y Motion en el mismo nodo.
- **Colores de camiseta** (`primario`, `secundario`, `detalle`) viven en `lib/mock-data.ts` (frontend only). El `schema.sql` actual **no tiene estos campos** — al conectar Supabase habrá que agregarlos a la tabla `productos`.

---

## 8. Base de datos

`supabase/schema.sql` es la fuente de verdad. Se ejecuta manualmente en el SQL Editor de Supabase.

**8 tablas:** `profiles`, `categorias`, `productos`, `variantes`, `ordenes`, `items_orden` + triggers `updated_at` + trigger `handle_new_user` + función `descontar_stock_orden`.

**RLS:** productos/variantes/categorías públicas; ordenes/items/profiles restringidas al dueño.
**Índices:** slug, liga, equipo, featured, producto, user_id, wompi_ref.

**Gap conocido:** los campos de color (primario, secundario, detalle) no están en el schema. Pendiente añadirlos a `productos` antes de conectar datos reales.

---

## 9. Árbol del proyecto (resumen)

```
app/
  layout.tsx                   Root layout, fuentes, metadata global
  page.tsx                     Landing: hero 3D, categorías, featured, banner
  globals.css                  Design system @theme (tokens, fuentes, utilidades)
  robots.ts                    SEO
  sitemap.ts                   SEO (rutas hardcodeadas, pendiente dinámico)
  (auth)/login/page.tsx        Login Google OAuth
  (auth)/auth/callback/route   OAuth callback handler
  (store)/catalogo/page.tsx    Catálogo con filtros — UI lista, lógica pendiente
  (store)/producto/[slug]/     Detalle de producto dinámico
  (store)/carrito/page.tsx     Página carrito

components/
  anim/Reveal.tsx              GSAP ScrollTrigger fade-up wrapper
  layout/Navbar.tsx            Sticky nav — búsqueda sin implementar
  layout/Footer.tsx            Footer — links son spans sin href (pendiente)
  layout/Providers.tsx         GSAP plugins + CartDrawer mount
  store/CartButton.tsx         Badge + toggle drawer
  store/CartContent.tsx        Lista + resumen — checkout DESHABILITADO
  store/CartDrawer.tsx         Side panel animado
  store/JerseyVisual.tsx       SVG jersey paramétrico (placeholder fotos)
  store/ProductCard.tsx        Card catálogo
  store/ProductDetail.tsx      Vista detalle + talla + personalización
  store/WhatsAppButton.tsx     CTA flotante WhatsApp
  three/Hero3D.tsx             Canvas R3F + iluminación 3-point + scroll
  three/Hero3DLazy.tsx         Wrapper dynamic() ssr:false con fallback SVG
  three/JerseyMesh.tsx         Mesh 3D ExtrudeGeometry + texture número
  ui/button.tsx                Primitivo shadcn/ui (5 variantes)

lib/
  mock-data.ts                 6 productos mock — reemplazar al conectar Supabase
  utils.ts                     cn, formatCOP, slugify, copACentavos, generarReferencia
  store/cart.ts                Zustand store (rewind-cart localStorage)
  whatsapp/helper.ts           buildWhatsAppUrl()
  supabase/client.ts           createClient() browser
  supabase/server.ts           createClient() + createAdminClient() server
  supabase/middleware.ts       updateSession(), RUTAS_PROTEGIDAS

types/index.ts                 Tipos globales: Producto, Orden, CartItem, Wompi, Filtros
hooks/useAuth.ts               user, loading, signInWithGoogle, signOut
hooks/useHydrated.ts           true post-mount (evita mismatch SSR/localStorage)
proxy.ts                       Middleware Next.js 16 → updateSession()
supabase/schema.sql            Schema completo BD (fuente de verdad)
brand-concepts/index.html      Galería 6 conceptos de logo (referencia estática)
```

---

## 10. Git

Se trabaja directo en `main` (proyecto solo-dev).
`.env.local` está gitignorado. Nunca commitear secretos. `.env.example` es el template.

---

## 11. Estado actual del proyecto

**Completitud estimada: ~75%**

### Implementado y funcional
- [x] Sistema de diseño completo (tokens, paleta, tipografías, utilidades)
- [x] Landing page redesign: hero con copy nuevo, CategoryCards visuales, featured grid editorial asimétrico
- [x] Imágenes reales de camisetas (Unsplash) en todos los productos
- [x] ProductCard con CSS 3D tilt (Motion useSpring) e imagen real o SVG fallback
- [x] Mobile nav: hamburger + drawer Motion desde izquierda (MobileMenu.tsx)
- [x] Filtros catálogo funcionales: URL query params, FilterPanel client, server-side filter, empty state
- [x] Detalle de producto (visual SVG, selector talla, personalización dorsal)
- [x] Carrito completo (Zustand, drawer, página, persistencia)
- [x] Auth Google OAuth (login, callback, middleware)
- [x] SEO básico (robots.ts, sitemap.ts)
- [x] Conceptos de marca (brand-concepts/index.html, Concepto E activo en Navbar)
- [x] Schema BD completo (8 tablas, RLS, triggers, Wompi types)
- [x] WhatsApp CTA flotante

### Pendiente — por prioridad

| Prioridad | Tarea | Notas |
|-----------|-------|-------|
| 🔴 Alta | Conectar Supabase (capa API) | Reemplazar mock-data por fetch real `/api/productos` |
| 🔴 Alta | Checkout / integración Wompi | Botón actualmente disabled |
| 🔴 Alta | Agregar colores a schema SQL | Campos primario/secundario/detalle en tabla `productos` |
| 🟡 Media | Dashboard `/dashboard/pedidos` | Ruta protegida pero página no existe |
| 🟡 Media | Búsqueda en Navbar | Icono sin handler |
| 🟡 Media | Footer links | Spans sin href |
| 🟡 Media | Webhook Wompi `/api/webhooks/wompi` | Responder 200 siempre; descontar stock |
| 🟡 Media | Animate phase (impeccable) | ScrollTrigger reveals en CategoryCards y hero |
| 🟢 Baja | Sitemap dinámico | Actualmente rutas hardcodeadas |
| 🟢 Baja | Unificar marca "KITSTORE" → "Rewind" | login/page.tsx aún dice KITSTORE |
| 🟢 Baja | Guía de tallas | Texto sin funcionalidad en ProductDetail |
| 🟢 Baja | WhatsApp number en MobileMenu | Hardcodeado como placeholder; usar `NEXT_PUBLIC_WHATSAPP_NUMBER` |

---

## 12. Log de sesiones

<!-- Claude actualiza esta sección al final de cada sesión de trabajo -->

### Sesión 2026-06-11

**Contexto:** Setup inicial del entorno + reconocimiento completo del repo.

**Hecho:**
- Creado `.env.example` con las 4 variables necesarias
- `npm install` ejecutado correctamente
- `git pull` — traídos 10 archivos del push del owner: Navbar refactor, Footer refactor, globals.css ajustes, layout.tsx actualización, robots.ts, sitemap.ts, brand-concepts/index.html (6 conceptos de logo), cart.ts fix, CLAUDE.md update
- Escaneo completo del árbol con dos agentes paralelos
- Creado este CLAUDE.md unificado como cerebro del proyecto

**Decisiones tomadas:**
- Nombre de marca activo en código: **Rewind** (unificar; login aún dice KITSTORE)
- Concepto de logo activo: **Concepto E** (barra dorada + wordmark Oswald) — ya en Navbar
- Memoria del proyecto: este archivo es la única fuente de verdad; no hay memorias fragmentadas

**Próxima sesión sugerida:**
Implementar filtros funcionales del catálogo (URL query params) — es lo más impactante sin necesitar backend.

---

### Sesión 2026-06-11 (continuación — redesign sprint)

**Contexto:** Impeccable skill — shape → build. Tres superficies en scope: landing, mobile nav, filtros catálogo.

**Hecho:**
- `next.config.ts` — agregado `images.remotePatterns` para `images.unsplash.com`
- `lib/nav-links.ts` — creado: array NAV_LINKS compartido Navbar ↔ MobileMenu
- `lib/mock-data.ts` — 6 productos ahora tienen URLs Unsplash verificadas (fotos reales de camisetas)
- `components/store/CategoryCard.tsx` — creado: cards visuales por liga con color accent, glow animado, scroll horizontal mobile
- `components/layout/MobileMenu.tsx` — creado: hamburger `md:hidden` + drawer Motion desde izquierda, body scroll lock, AnimatePresence
- `components/layout/Navbar.tsx` — importa MobileMenu y NAV_LINKS desde lib
- `components/store/ProductCard.tsx` — reescrito: "use client", CSS 3D tilt con Motion useSpring, next/Image condicional, prop `hero`
- `components/store/FilterPanel.tsx` — creado: checkboxes reales, useSearchParams + useRouter + useTransition, toggle activo/inactivo, Limpiar
- `app/(store)/catalogo/page.tsx` — reescrito: async searchParams (Next.js 16), server-side filter por liga/versión/talla, FilterPanel en Suspense, empty state
- `app/page.tsx` — redesign completo: hero con copy nuevo, jersey mobile-first, CategoryCards, featured grid editorial asimétrico desktop + scroll mobile, banner personalización

**Nuevos archivos (4):** `lib/nav-links.ts`, `components/store/CategoryCard.tsx`, `components/layout/MobileMenu.tsx`, `components/store/FilterPanel.tsx`

**Commit:** `5ba20af` — `npm run build` 0 errores TypeScript

**Próxima sesión sugerida:**
`/impeccable animate` — ScrollTrigger reveals en CategoryCards, hero entrance, stagger en featured grid. Luego `/impeccable layout` para afinar espaciado y ritmo.
