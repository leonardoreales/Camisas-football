import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Sparkles, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/ProductCard";
import { JerseyVisual } from "@/components/store/JerseyVisual";
import { WhatsAppButton } from "@/components/store/WhatsAppButton";
import { getProductosFeatured, categoriasMock } from "@/lib/mock-data";

export default function Home() {
  const featured = getProductosFeatured();
  const heroJersey = featured[2]; // Barcelona

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ───────────── HERO ───────────── */}
        <section className="relative overflow-hidden">
          {/* Glow de fondo */}
          <div className="bg-accent-green/20 pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full blur-[120px]" />
          <div className="bg-accent-red/10 pointer-events-none absolute -left-40 top-40 h-[400px] w-[400px] rounded-full blur-[120px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="border-edge text-accent-green inline-flex items-center gap-2 rounded-full border bg-black/30 px-4 py-1.5 font-mono text-xs uppercase tracking-wider">
                <Sparkles className="size-3" /> Temporada 2024/2025 disponible
              </span>
              <h1 className="mt-6 text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
                Viste los
                <br />
                <span className="text-accent-green">colores</span> que
                <br />
                te definen
              </h1>
              <p className="text-muted mt-6 max-w-md text-base normal-case leading-relaxed">
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

              <div className="text-muted mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase">
                <span className="flex items-center gap-2">
                  <Star className="text-accent-green size-4" /> +2.000 clientes
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="text-accent-green size-4" /> Pago seguro
                  Wompi
                </span>
                <span className="flex items-center gap-2">
                  <Truck className="text-accent-green size-4" /> Envío nacional
                </span>
              </div>
            </div>

            {/* Camiseta protagonista */}
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute inset-0 opacity-40 blur-3xl"
                style={{
                  background: `radial-gradient(circle at 50% 45%, ${heroJersey.colores.primario}, transparent 65%)`,
                }}
              />
              <JerseyVisual
                {...heroJersey.colores}
                nombre={heroJersey.dorsal?.nombre}
                numero={heroJersey.dorsal?.numero}
                className="relative w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </section>

        {/* ───────────── CATEGORÍAS ───────────── */}
        <section className="border-edge border-y">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
              {categoriasMock.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/catalogo?liga=${encodeURIComponent(cat.nombre)}`}
                  className="group flex items-center gap-2"
                >
                  <span className="font-display text-muted group-hover:text-content text-sm font-semibold uppercase tracking-wide transition-colors">
                    {cat.nombre}
                  </span>
                  <span className="text-disabled font-mono text-xs">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── DESTACADOS ───────────── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-accent-green font-mono text-xs uppercase tracking-wider">
                Lo más buscado
              </p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
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

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </section>

        {/* ───────────── BANNER PERSONALIZACIÓN ───────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="border-edge from-elevated to-surface relative overflow-hidden rounded-md border bg-gradient-to-br p-10 sm:p-14">
            <div className="bg-accent-green/10 pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[100px]" />
            <div className="relative max-w-xl">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Tu nombre. Tu número.
                <span className="text-accent-green"> Tu camisa.</span>
              </h2>
              <p className="text-muted mt-4 normal-case">
                Personaliza el dorsal de cualquier camisa con estampado de alta
                durabilidad. Lleva el 10 de tu equipo o tu propio apellido.
              </p>
              <Button asChild className="mt-6">
                <Link href="/catalogo">
                  Personalizar ahora <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
