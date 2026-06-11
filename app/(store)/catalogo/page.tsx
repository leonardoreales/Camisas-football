import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { FilterPanel } from "@/components/store/FilterPanel";
import { WhatsAppButton } from "@/components/store/WhatsAppButton";
import { productosMock, categoriasMock } from "@/lib/mock-data";
import type { Talla } from "@/types";

const VERSIONES = ["jugador", "aficionado"] as const;
const TALLAS = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const metadata = { title: "Catálogo — Rewind" };

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ liga?: string; version?: string; talla?: string }>;
}) {
  const { liga, version, talla } = await searchParams;

  const productosFiltrados = productosMock.filter((p) => {
    if (liga && p.liga !== liga) return false;
    if (version && p.version !== version) return false;
    if (talla) {
      const tieneStock = p.variantes?.some(
        (v) => v.talla === (talla as Talla) && v.stock > 0
      );
      if (!tieneStock) return false;
    }
    return true;
  });

  return (
    <>
      <Navbar />

      <main className="mx-auto flex-1 max-w-7xl px-4 py-10 sm:px-6">
        <header className="mb-8">
          <p className="text-accent-green font-mono text-xs uppercase tracking-wider">
            {productosFiltrados.length} productos
          </p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Catálogo</h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Panel de filtros — client component */}
          <aside>
            <Suspense
              fallback={
                <div className="space-y-8 animate-pulse">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-4 w-20 rounded bg-elevated" />
                      <div className="space-y-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-5 w-full rounded bg-elevated" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <FilterPanel
                ligas={categoriasMock}
                versiones={VERSIONES}
                tallas={TALLAS}
              />
            </Suspense>
          </aside>

          {/* Grid de productos */}
          <div>
            {productosFiltrados.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <p className="font-display text-xl text-muted uppercase">Sin resultados</p>
                <p className="text-sm text-disabled normal-case max-w-xs">
                  Sin resultados para esta combinación. Prueba con otros filtros.
                </p>
                <a
                  href="/catalogo"
                  className="font-mono text-xs text-accent-green hover:underline mt-2"
                >
                  Limpiar filtros
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {productosFiltrados.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
