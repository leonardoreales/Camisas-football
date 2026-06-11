import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/ProductCard";
import { CategoryCard, LEAGUE_COLORS } from "@/components/store/CategoryCard";
import { Reveal } from "@/components/anim/Reveal";
import { Hero3DLazy } from "@/components/three/Hero3DLazy";
import { WhatsAppButton } from "@/components/store/WhatsAppButton";
import { getProductosFeatured, getProductoBySlug, categoriasMock } from "@/lib/mock-data";

export default function Home() {
  const featured = getProductosFeatured();
  const heroJersey = getProductoBySlug("barcelona-local-24-25") ?? featured[0];

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ─────────── HERO ─────────── */}
        <section className="relative overflow-hidden">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-accent-green/15 blur-[140px]" />
          <div className="pointer-events-none absolute -left-40 top-60 h-[400px] w-[400px] rounded-full bg-accent-red/10 blur-[120px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-24">
            {/* Jersey — primera en mobile, segunda en desktop */}
            <div className="order-first lg:order-last relative mx-auto w-full max-w-sm lg:max-w-none">
              <div
                className="pointer-events-none absolute inset-0 opacity-50 blur-3xl"
                style={{
                  background: `radial-gradient(circle at 50% 45%, ${heroJersey.colores.primario}, transparent 60%)`,
                }}
              />
              <Hero3DLazy
                colores={heroJersey.colores}
                nombre={heroJersey.dorsal?.nombre}
                numero={heroJersey.dorsal?.numero}
              />
            </div>

            {/* Copy — segunda en mobile, primera en desktop */}
            <div className="order-last lg:order-first">
              <span className="border-edge text-accent-green inline-flex items-center gap-2 rounded-full border bg-black/30 px-4 py-1.5 font-mono text-xs uppercase tracking-wider">
                <span className="size-1.5 rounded-full bg-accent-green animate-pulse" />
                Temporada 2024/2025 disponible
              </span>

              <h1 className="mt-5 text-5xl font-bold leading-[0.9] sm:text-6xl lg:text-[5.5rem]">
                El escudo no va
                <br />
                en la pared.
                <br />
                <span className="text-accent-green">Va en la espalda.</span>
              </h1>

              <p className="text-muted mt-4 font-display text-sm font-medium uppercase tracking-[0.2em]">
                Los colores no se explican. Se visten.
              </p>

              <p className="text-muted mt-5 max-w-md text-base normal-case leading-relaxed">
                Camisas de fútbol premium, versión jugador y aficionado.
                Personaliza tu dorsal con nombre y número, y recíbela en toda
                Colombia.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/catalogo">
                    Ver catálogo <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/catalogo?version=jugador">Versión jugador</Link>
                </Button>
              </div>

              <div className="text-muted mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase">
                <span className="flex items-center gap-2">
                  <Star className="text-accent-green size-4 fill-current" /> +2.000 clientes
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="text-accent-green size-4" /> Pago seguro Wompi
                </span>
                <span className="flex items-center gap-2">
                  <Truck className="text-accent-green size-4" /> Envío nacional
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── CATEGORÍAS ─────────── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Explora por liga
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="text-muted hover:text-accent-green hidden items-center gap-2 font-display text-sm font-medium uppercase tracking-wide transition-colors sm:flex"
              >
                Ver todo <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Mobile: scroll horizontal. Desktop: grid 5 cols */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
              {categoriasMock.map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  nombre={cat.nombre}
                  slug={cat.slug}
                  count={cat.count}
                  color={LEAGUE_COLORS[cat.nombre] ?? "#C9A84C"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── DESTACADOS ─────────── */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Camisas destacadas
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="text-muted hover:text-accent-green hidden items-center gap-2 font-display text-sm font-medium uppercase tracking-wide transition-colors sm:flex"
            >
              Ver todo <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Desktop: editorial asimétrico */}
          <div className="hidden md:grid md:grid-cols-[3fr_2fr] md:grid-rows-[auto_auto_auto] md:gap-4">
            {featured[0] && (
              <Reveal className="md:row-span-2">
                <ProductCard producto={featured[0]} hero />
              </Reveal>
            )}
            {featured.slice(1, 4).map((producto) => (
              <Reveal key={producto.id}>
                <ProductCard producto={producto} />
              </Reveal>
            ))}
          </div>

          {/* Mobile: scroll horizontal */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden">
            {featured.map((producto) => (
              <div key={producto.id} className="w-64 flex-shrink-0 snap-start">
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        </section>

        {/* ─────────── BANNER PERSONALIZACIÓN ─────────── */}
        <Reveal className="mx-auto block max-w-7xl px-4 pb-16 sm:px-6">
          <div className="border-edge from-elevated to-surface relative overflow-hidden rounded-md border bg-gradient-to-br p-10 sm:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-green/10 blur-[100px]" />
            <div className="relative max-w-xl">
              <p className="font-mono text-xs uppercase tracking-widest text-accent-green">
                Personalización
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Escríbelo.
                <span className="text-accent-green"> Es tu escudo.</span>
              </h2>
              <p className="text-muted mt-4 normal-case">
                Personaliza el dorsal de cualquier camisa con estampado de alta
                durabilidad. Tu número, tu nombre, tu identidad.
              </p>
              <Button asChild className="mt-6">
                <Link href="/catalogo">
                  Personalizar ahora <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
