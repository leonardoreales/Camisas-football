---
name: KitStore
description: E-commerce de camisas de fútbol premium para Colombia — identidad editorial oscura, señal eléctrica
colors:
  dark-void: "oklch(0.082 0.010 265)"
  dark-surface: "oklch(0.115 0.012 265)"
  dark-elevated: "oklch(0.158 0.018 265)"
  dark-edge: "oklch(0.178 0.020 265)"
  volt-green: "oklch(0.82 0.22 155)"
  signal-red: "oklch(0.61 0.22 10)"
  ghost-white: "oklch(0.945 0.005 265)"
  fog: "oklch(0.490 0.018 275)"
  smoke: "oklch(0.295 0.018 270)"
typography:
  display:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(3rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Oswald, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.volt-green}"
    textColor: "{colors.dark-void}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.volt-green}"
    textColor: "{colors.dark-void}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ghost-white}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "transparent"
    textColor: "{colors.volt-green}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ghost-white}"
    rounded: "{rounded.sm}"
    height: "44px"
  button-danger:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.ghost-white}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  product-card:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.ghost-white}"
    rounded: "{rounded.md}"
  badge-discount:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.ghost-white}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  badge-version:
    backgroundColor: "transparent"
    textColor: "{colors.volt-green}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  nav-header:
    backgroundColor: "{colors.dark-void}"
    textColor: "{colors.ghost-white}"
    height: "64px"
---

# Design System: KitStore

## 1. Overview

**Creative North Star: "La Vitrina del Coleccionista"**

The design of KitStore is the architecture of a specialist's glass case after closing hours. Products are not listed — they are exhibited. Each jersey rests against a near-black void that removes all distraction and elevates the object. The volt-green accent functions like the gallery's track light: it illuminates exactly what matters (price, CTA, hover state) and retreats everywhere else.

This system explicitly rejects the three anti-patterns named in PRODUCT.md. It does not look like a cheap replica site — no blurry crops, no missing hierarchy, no price without context. It does not look like SaaS productivity software — no light-mode grays, no neutral Inter-on-white, no soul-less palette. It does not look like a mass marketplace — no undifferentiated grid on a white canvas, no generic category UI.

Two typographic voices handle everything: Oswald in uppercase carries stadium-signage authority — section headers, product names, button labels, the brand mark itself. JetBrains Mono carries data precision — prices, liga labels, temporada codes, SKU metadata. Inter handles the one thing neither can do: flowing body prose. No other typefaces enter this system.

**Key Characteristics:**
- Dark and revealing: the void is not absent design — it is the velvet that makes the jersey glow
- Geometric precision: 4px default corners, exact 1px borders. Softness that dilutes is prohibited
- Volt-green as the sole signal: appears on 3–4 semantic roles maximum and nowhere decorative
- Dual typographic register: Oswald for authority, JetBrains Mono for numeric truth, Inter for prose
- Earned glow: light emerges from the product, not the UI. The radial halo in product cards IS the jersey's own color reflecting on the surface

## 2. Colors: La Paleta del Estadio Nocturno

One chromatic commitment (volt-green CTA), one urgency color (signal-red), and a cold-tinted void for everything else. Black here is not a default — it is a deliberate choice that makes the product the only light source in the room.

### Primary
- **Volt Green** (`oklch(0.82 0.22 155)` — approx. #00d870): The brand's exclusive light source. Used on CTAs, active states, price display, hover borders, and the brand mark accent. **Reserved absolutely:** if it appears on more than 4 distinct elements per viewport, something is wrong. Its scarcity is its power. This is a deliberate downgrade from the original fluorescent #00ff87 (oklch 0.92) — richer, more premium, less neon.

### Secondary
- **Signal Red** (`oklch(0.61 0.22 10)` — #ff2e5b): Urgency, not danger. Discount badges, promo alerts, danger button states. Never decorative. Always used in the same grammatical role (badge, alert, or destructive action) — never as a section accent or hover color.

### Neutral
- **Dark Void** (`oklch(0.082 0.010 265)` — #08080e): The root canvas. Near-pure black with a barely perceptible cool-blue tint. Establishes the authority of the space.
- **Dark Surface** (`oklch(0.115 0.012 265)` — #111118): Product card backgrounds, table rows, sidebar panels. The first emergence from the void.
- **Dark Elevated** (`oklch(0.158 0.018 265)` — #1a1a26): Modal overlays, cart drawers, ghost button hover backgrounds. The second tier.
- **Dark Edge** (`oklch(0.178 0.020 265)` — #1e1e2e): All borders and dividers. The precise outline between surfaces.
- **Ghost White** (`oklch(0.945 0.005 265)` — #f0f0f5): Primary text. Slightly cool-tinted to belong to the void family. Contrast vs. Dark Void: ~15:1.
- **Fog** (`oklch(0.490 0.018 275)` — #6b6b80): Secondary text — liga, temporada, supplementary metadata. Contrast vs. Dark Void: ~4.7:1 (meets WCAG AA).
- **Smoke** (`oklch(0.295 0.018 270)` — #3a3a4a): Disabled states and strikethrough prices only. Not for live interactive text.

**The Scarcity Rule.** Volt-green appears on ≤4 distinct elements per viewport. If it touches decoration, it loses its role as the brand signal. Every use must answer: "Is this a CTA, a price, an active state, or a hover confirmation?" If the answer is none of these, remove the green.

**The Void Tint Rule.** All neutral surfaces carry the same cool hue family (H ≈ 265–275). Never introduce warm-tinted neutrals — no beige, no sand, no paper-white. Warmth lives in jersey colors and product photography, not in the canvas. A warm surface next to a cool surface creates visual noise that undermines the exhibition quality.

## 3. Typography

**Display Font:** Oswald (var(--font-oswald), sans-serif fallback)
**Body Font:** Inter (var(--font-inter), sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (var(--font-jetbrains), monospace fallback)

**Character:** Oswald at uppercase is the typographic equivalent of a scoreboard — commanding, legible at distance, with zero ambiguity about importance. JetBrains Mono brings the precision of a technical readout to every datum: price, size, date, code. Inter bridges the gap when a sentence needs to be read, not scanned. Together they make a system with exactly two registers: authority and precision.

### Hierarchy
- **Display** (Oswald, 700, `clamp(3rem, 5vw, 4.5rem)`, lh 1, ls -0.01em): Hero and campaign headings only. All h1–h4 elements are uppercase by default via globals.css. Use `normal-case` class when sentence case is semantically required.
- **Headline** (Oswald, 600, `clamp(1.75rem, 3vw, 2.25rem)`, lh 1.2, ls -0.01em): Section titles ("Camisas Destacadas", "Tu nombre. Tu número."). The hierarchy step below display.
- **Title** (Oswald, 600, `1.125rem`, lh 1.3): Product card team names, drawer headers, sub-section identifiers.
- **Body** (Inter, 400, `1rem`, lh 1.625): Product descriptions, legal copy, long prose. Add `normal-case` class. Max-width 65ch enforced. On dark backgrounds, 1.625 line-height provides the extra breathing room that light-on-dark type needs.
- **Label** (JetBrains Mono, 500, `0.75rem`, ls 0.05em, uppercase): Liga, temporada, prices, version badges, trust metrics, category pill counts. The language of exact data.

**The Two-Voice Rule.** Every text element belongs to one of two typographic voices: display authority (Oswald) or data precision (JetBrains Mono). Inter is prose only. When uncertain: if the element is a name, entity, or call-to-action, it is Oswald. If it is a number, code, abbreviation, or structured datum, it is Mono.

**The Uppercase Gate.** h1–h4 are uppercase globally. Everything outside headings (`p`, `span`, `li`, `a`) is sentence case by default. Uppercase outside headings requires deliberate class + font-display and must be 4 words or fewer. Body copy in all-caps is prohibited.

## 4. Elevation

This system uses **tonal layering**, not structural shadows. Surfaces communicate depth by which layer of the void they occupy: Dark Void (base) → Dark Surface → Dark Elevated → floating elements. Shadows do not appear in the static layout — a card at rest has no shadow.

**Active state glow** is the deliberate exception: interactive elements earn a radial halo when the user hovers. This is a response to human presence, not a decorative choice. The glow uses the relevant brand color.

### Shadow Vocabulary
- **Card hover glow** (`box-shadow: 0 12px 40px -12px oklch(0.82 0.22 155 / 0.25)`): Applied to product cards on hover only. Volt-green at 25% opacity — soft enough to feel atmospheric, specific enough to feel branded.
- **CTA button glow** (`box-shadow: 0 0 24px -4px var(--accent-green)`): Applied to primary and danger buttons on hover. The button becomes the light source. Bloom, not border.
- **Product radial halo** (inline radial-gradient using `colores.primario`): The colored glow behind each jersey SVG uses the jersey's own primary color — 30% opacity at rest, 60% on hover. The object illuminates itself.

**The Flat-By-Default Rule.** If a surface looks lifted in the static state, it is doing so through tonal contrast between its background color and the layer beneath it — not through shadow. Shadows belong to transitions and hover states only. Adding a box-shadow to a static element is a mistake, not a design choice.

## 5. Components

### Buttons
Five variants. All use Oswald font-display, uppercase, tracking-wide. Radius is always 4px (sharp). Pill-shaped buttons are prohibited.

- **Primary:** Volt-green background (`oklch(0.82 0.22 155)`), Dark Void text. Height 44px (md) / 52px (lg). Padding 20px (md) / 32px (lg). Hover: `brightness(1.1)` + CTA glow shadow. Focus: `ring-2 ring-accent-green/60`.
- **Outline:** Transparent background, Dark Edge border (1px), Ghost White text. Hover: border-color and text color shift to volt-green. This is the only button where the border is a semantic actor.
- **Ghost:** Transparent, no border, Ghost White text. Hover: Dark Elevated background fill. For tertiary actions only — when a button must exist but must not compete.
- **Danger:** Signal Red background, Ghost White text. Identical hover mechanics to primary (brightness + red glow). Destructive and irreversible actions only.
- **Surface:** Dark Surface background, Dark Edge border, Ghost White text. Hover: Dark Elevated fill. Secondary actions on already-dark surfaces where outline would disappear.

### Product Cards
The signature component of the system. Each card is a display case.

- **Container:** Dark Surface bg, Dark Edge border (1px), 8px radius, `overflow-hidden`. Hover: `-translate-y-1` lift + card hover glow. Full transition: 300ms ease-out.
- **Visual area:** Gradient background (`from-elevated to-base`, vertical). Generous padding (24px). Jersey SVG scales to `105%` on group-hover. Radial halo uses `colores.primario` at 30% opacity (static) → 60% (hover). The halo is the jersey — it bleeds the product's color into the space around it.
- **Info area:** Separated by 1px Dark Edge border-top. Internal padding 16px. Layout: liga + temporada in Label style (Mono uppercase Fog), team name in Title (Oswald Ghost White), product subname in xs Inter Fog, price in Label Mono + Volt Green.
- **Badges:** Positioned absolute, top-left, 12px inset. Discount badge: Signal Red bg, Ghost White Mono text, pattern `-XX%`. Version badge: transparent bg, Volt Green text, Volt Green border at 40% opacity, backdrop-blur.

### Navigation (Navbar)
- **Container:** Sticky top-0, z-50. `bg-base/80` with `backdrop-blur-xl` — the intentional glass effect in this system. 1px bottom border in Dark Edge. Height 64px.
- **Brand mark:** KIT in Ghost White + STORE in Volt Green. Oswald, xl, font-bold, tracking-tight. The brand mark is the only place the volt-green appears in the site header at rest.
- **Nav links:** Oswald, sm, font-medium, uppercase, tracking-wide. Default: Fog. Hover: Ghost White (smooth 200ms transition). Active: Ghost White.
- **Action icons:** 40×40px touch target. Default: Fog. Hover: Ghost White + Dark Elevated background. Rounded 4px.
- **Mobile:** Nav links hidden below `md` breakpoint. Icon actions always visible.

### Badges and Chips
- **Discount badge:** Signal Red bg, Ghost White text, JetBrains Mono xs. Rounded 4px (sm). Always format: `-XX%`. Never other content in this pattern.
- **Version Jugador badge:** Transparent bg, Volt Green text, Volt Green/40 border, backdrop-blur. Font-display 10px uppercase tracking-wider. Only text: `JUGADOR`.
- **Category pills (in nav/filter bar):** Font-display sm uppercase, Fog text + Smoke count. No background or border — typographic-only. They do not compete; they label.
- **Trust metrics (hero):** Font-mono xs uppercase, Fog text, Volt Green icon. Format: `Icon + Label`. Never more than 3 in a row.

### Hero Section (Signature Pattern)
- **Layout:** Two-column grid on `lg+`. Copy left, 3D jersey right (R3F loaded via `next/dynamic` with `ssr: false`).
- **Atmospheric glows:** Two radial gradients — `volt-green/20` top-right, `signal-red/10` left. These are purely atmospheric. They do not contain information. They are the stadium lights.
- **CTA pair:** Always primary Button + outline Button in this order. Never more than two hero CTAs.
- **Trust bar:** Below CTAs. Font-mono xs uppercase, Fog color, volt-green icons. The three trust signals are fixed: `+2.000 clientes`, `Pago seguro Wompi`, `Envío nacional`.

## 6. Do's and Don'ts

### Do:
- **Do** use Volt Green for exactly these semantic roles: CTA button fill, price/value display, active link/nav state, hover border on product cards. Nothing else.
- **Do** render all prices in JetBrains Mono using `formatCOP()` from `lib/utils.ts`. Never display raw numbers. Never use Oswald for prices.
- **Do** keep all h1–h4 uppercase — it is enforced globally in `globals.css`. Add `normal-case` class only when sentence case is semantically required (product names that include lowercase proper nouns, etc.).
- **Do** separate the display voice (Oswald) and data voice (JetBrains Mono) rigorously. A heading is Oswald. A number, code, or abbreviation is Mono.
- **Do** use `backdrop-blur-xl` only on the Navbar. It is the one intentional glass effect in this system. Repeating it on cards or panels dilutes it.
- **Do** animate product cards with `group-hover:scale-105` on the jersey visual and `-translate-y-1` on the card container. This is the signature hover interaction.
- **Do** use the jersey's own `colores.primario` as the radial glow source behind jersey visuals. The product illuminates itself — the UI does not impose a brand color on top of the product.
- **Do** wrap all animations in `@media (prefers-reduced-motion: reduce)` — the global rule in `globals.css` handles this. New animated components must respect it.
- **Do** enforce 65ch max-width on all body prose. Anything wider creates uncomfortably long scan lines on desktop.

### Don't:
- **Don't** use Volt Green as body text or for decorative elements. It is a signal, not a texture. Fog and Ghost White handle all text weight; green is reserved for semantic roles.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on cards, callouts, or list items. This is prohibited. Use a full border, a background tint, or nothing.
- **Don't** use gradient text (`background-clip: text` + gradient). Solid color only. Emphasis through weight and size — never through gradient.
- **Don't** introduce warm-tinted backgrounds. No beige, sand, cream, paper-white, or any neutral in the OKLCH hue range 40–100. The entire neutral family is cold (H ≈ 265–275). Warmth is the product's job, not the canvas's.
- **Don't** design this to look like Falabella, Éxito, or Mercado Libre — a mass marketplace with generic grid on white. KitStore has a distinct visual point of view that must be visible in every screen.
- **Don't** design this to look like a cheap replica site — low-fidelity images, no typographic hierarchy, price without context. Every element communicates craft and intent.
- **Don't** design this to feel like SaaS productivity software — Inter-on-white with blue/gray neutrals. This is a cultural object, not a task manager.
- **Don't** add shadows to static layout elements. Shadows are earned through hover/active interaction only (The Flat-By-Default Rule).
- **Don't** use glassmorphism on cards or content panels. The one intentional glass move is the Navbar backdrop-blur; adding blur-based surfaces elsewhere dilutes its meaning.
- **Don't** put more than 4 Volt Green elements in a single viewport. Scarcity is the rule (The Scarcity Rule). When in doubt, remove the green.
- **Don't** exceed 65ch line length for body copy, product descriptions, or any flowing prose.
