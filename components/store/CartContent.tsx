"use client";

import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Lock } from "lucide-react";
import { useCart, selectSubtotal } from "@/lib/store/cart";
import { useHydrated } from "@/hooks/useHydrated";
import { formatCOP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { JerseyVisual } from "./JerseyVisual";

export function CartContent() {
  const { items, removeLine, setQty } = useCart();
  const subtotal = useCart(selectSubtotal);
  const hydrated = useHydrated();

  // Evita parpadeo de "carrito vacío" antes de hidratar el localStorage.
  if (!hydrated) {
    return <div className="h-64" />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
        <ShoppingBag className="text-disabled size-16" />
        <div>
          <h2 className="text-2xl font-bold">Tu carrito está vacío</h2>
          <p className="text-muted mt-2 normal-case">
            Aún no has agregado ninguna camisa.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/catalogo">
            Explorar catálogo <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      {/* Lista de items */}
      <ul className="divide-edge border-edge divide-y border-y">
        {items.map((l) => (
          <li key={l.lineId} className="flex gap-4 py-5">
            <Link
              href={`/producto/${l.slug}`}
              className="border-edge bg-surface grid size-28 shrink-0 place-items-center overflow-hidden rounded border p-2"
            >
              {l.colores ? (
                <JerseyVisual
                  {...l.colores}
                  numero={l.personalizacion?.numero}
                  className="h-full w-full"
                />
              ) : (
                <ShoppingBag className="text-disabled size-8" />
              )}
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/producto/${l.slug}`}
                    className="font-display hover:text-accent-green text-lg font-semibold transition-colors"
                  >
                    {l.equipo}
                  </Link>
                  <p className="text-muted text-xs normal-case">{l.nombre}</p>
                  <p className="text-muted mt-1 text-xs normal-case">
                    Talla <span className="text-content">{l.talla}</span>
                    {l.personalizacion?.nombre && (
                      <>
                        {" · "}
                        <span className="text-content">
                          {l.personalizacion.nombre} {l.personalizacion.numero}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => removeLine(l.lineId)}
                  className="text-muted hover:text-accent-red transition-colors"
                  aria-label="Eliminar"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="border-edge flex items-center rounded border">
                  <button
                    onClick={() => setQty(l.lineId, l.cantidad - 1)}
                    className="text-muted hover:text-content grid size-8 place-items-center"
                    aria-label="Menos"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono text-sm">
                    {l.cantidad}
                  </span>
                  <button
                    onClick={() => setQty(l.lineId, l.cantidad + 1)}
                    className="text-muted hover:text-content grid size-8 place-items-center"
                    aria-label="Más"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <span className="font-mono text-accent-green">
                  {formatCOP(l.precio * l.cantidad)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Resumen */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="border-edge bg-surface rounded-md border p-6">
          <h2 className="font-display text-lg font-semibold">Resumen</h2>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted normal-case">Subtotal</dt>
              <dd className="font-mono">{formatCOP(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted normal-case">Envío</dt>
              <dd className="text-muted font-mono normal-case">
                Calculado en pago
              </dd>
            </div>
          </dl>

          <div className="border-edge mt-5 flex justify-between border-t pt-5">
            <span className="font-display font-semibold">Total</span>
            <span className="font-mono text-accent-green text-lg font-medium">
              {formatCOP(subtotal)}
            </span>
          </div>

          <Button size="lg" className="mt-6 w-full" disabled>
            <Lock className="size-4" />
            Pagar con Wompi
          </Button>
          <p className="text-disabled mt-3 text-center text-xs normal-case">
            Checkout en construcción · PSE, Nequi y tarjetas
          </p>

          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link href="/catalogo">Seguir comprando</Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}
