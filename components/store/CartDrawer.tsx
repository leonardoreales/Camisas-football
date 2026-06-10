"use client";

import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart, selectSubtotal } from "@/lib/store/cart";
import { formatCOP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { JerseyVisual } from "./JerseyVisual";

/** Drawer lateral del carrito. Se monta una vez (en Providers). */
export function CartDrawer() {
  const { items, isOpen, close, removeLine, setQty } = useCart();
  const subtotal = useCart(selectSubtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="bg-base border-edge fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l shadow-2xl"
          >
            {/* Header */}
            <div className="border-edge flex items-center justify-between border-b px-5 py-4">
              <h2 className="font-display text-lg font-semibold">
                Tu carrito{" "}
                <span className="text-muted font-mono text-sm">
                  ({items.length})
                </span>
              </h2>
              <button
                onClick={close}
                className="text-muted hover:text-content hover:bg-elevated grid size-9 place-items-center rounded transition-colors"
                aria-label="Cerrar"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="text-disabled size-12" />
                <p className="text-muted normal-case">Tu carrito está vacío.</p>
                <Button asChild variant="outline" onClick={close}>
                  <Link href="/catalogo">Explorar camisas</Link>
                </Button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <ul className="space-y-4">
                  {items.map((l) => (
                    <li key={l.lineId} className="flex gap-3">
                      {/* Mini visual */}
                      <div className="border-edge bg-surface grid size-20 shrink-0 place-items-center overflow-hidden rounded border p-1">
                        {l.colores ? (
                          <JerseyVisual
                            {...l.colores}
                            numero={l.personalizacion?.numero}
                            className="h-full w-full"
                          />
                        ) : (
                          <ShoppingBag className="text-disabled size-6" />
                        )}
                      </div>

                      {/* Detalle */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-display truncate text-sm font-semibold">
                              {l.equipo}
                            </p>
                            <p className="text-muted text-xs normal-case">
                              Talla {l.talla}
                              {l.personalizacion?.nombre &&
                                ` · ${l.personalizacion.nombre} ${l.personalizacion.numero ?? ""}`}
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

                        <div className="mt-2 flex items-center justify-between">
                          {/* Cantidad */}
                          <div className="border-edge flex items-center rounded border">
                            <button
                              onClick={() => setQty(l.lineId, l.cantidad - 1)}
                              className="text-muted hover:text-content grid size-7 place-items-center"
                              aria-label="Menos"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-sm">
                              {l.cantidad}
                            </span>
                            <button
                              onClick={() => setQty(l.lineId, l.cantidad + 1)}
                              className="text-muted hover:text-content grid size-7 place-items-center"
                              aria-label="Más"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="font-mono text-accent-green text-sm">
                            {formatCOP(l.precio * l.cantidad)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-edge border-t px-5 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-muted text-sm normal-case">Subtotal</span>
                  <span className="font-mono text-content text-lg font-medium">
                    {formatCOP(subtotal)}
                  </span>
                </div>
                <p className="text-disabled mb-4 text-xs normal-case">
                  Envío e impuestos se calculan en el checkout.
                </p>
                <Button asChild size="lg" className="w-full" onClick={close}>
                  <Link href="/carrito">Finalizar compra</Link>
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
