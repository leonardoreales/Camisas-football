import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { WhatsAppButton } from "@/components/store/WhatsAppButton";
import { productosMock, categoriasMock } from "@/lib/mock-data";

const VERSIONES = ["jugador", "aficionado"] as const;
const TALLAS = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const metadata = { title: "Catálogo" };

export default function CatalogoPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto flex-1 max-w-7xl px-4 py-10 sm:px-6">
        <header className="mb-8">
          <p className="text-accent-green font-mono text-xs uppercase tracking-wider">
            {productosMock.length} productos
          </p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Catálogo</h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Panel de filtros (visual) */}
          <aside className="space-y-8">
            <FilterGroup title="Liga">
              {categoriasMock.map((c) => (
                <FilterRow key={c.slug} label={c.nombre} count={c.count} />
              ))}
            </FilterGroup>

            <FilterGroup title="Versión">
              {VERSIONES.map((v) => (
                <FilterRow key={v} label={v} capitalize />
              ))}
            </FilterGroup>

            <FilterGroup title="Talla">
              <div className="flex flex-wrap gap-2">
                {TALLAS.map((t) => (
                  <span
                    key={t}
                    className="border-edge text-muted hover:border-accent-green hover:text-accent-green grid h-9 w-9 cursor-pointer place-items-center rounded border font-mono text-xs transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </FilterGroup>
          </aside>

          {/* Grid de productos */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {productosMock.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-content mb-3 text-sm font-semibold uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterRow({
  label,
  count,
  capitalize,
}: {
  label: string;
  count?: number;
  capitalize?: boolean;
}) {
  return (
    <label className="group flex cursor-pointer items-center justify-between">
      <span className="flex items-center gap-2">
        <span className="border-edge group-hover:border-accent-green size-4 rounded-sm border transition-colors" />
        <span
          className={`text-muted group-hover:text-content text-sm transition-colors ${
            capitalize ? "capitalize" : "normal-case"
          }`}
        >
          {label}
        </span>
      </span>
      {count != null && (
        <span className="text-disabled font-mono text-xs">{count}</span>
      )}
    </label>
  );
}
