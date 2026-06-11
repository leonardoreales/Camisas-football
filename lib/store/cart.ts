import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

/** Línea del carrito: un CartItem con identificador único de línea. */
export type CartLine = CartItem & { lineId: string };

/**
 * Genera el id de línea. Una misma variante (producto+talla) con distinta
 * personalización cuenta como líneas separadas.
 */
function makeLineId(item: CartItem): string {
  const p = item.personalizacion;
  return [item.varianteId, p?.nombre ?? "", p?.numero ?? ""].join("|");
}

interface CartState {
  items: CartLine[];
  /** Drawer abierto/cerrado. */
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeLine: (lineId: string) => void;
  setQty: (lineId: string, cantidad: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const lineId = makeLineId(item);
          const existente = state.items.find((l) => l.lineId === lineId);
          if (existente) {
            return {
              isOpen: true,
              items: state.items.map((l) =>
                l.lineId === lineId
                  ? { ...l, cantidad: l.cantidad + item.cantidad }
                  : l,
              ),
            };
          }
          return {
            isOpen: true,
            items: [...state.items, { ...item, lineId }],
          };
        }),

      removeLine: (lineId) =>
        set((state) => ({
          items: state.items.filter((l) => l.lineId !== lineId),
        })),

      setQty: (lineId, cantidad) =>
        set((state) => ({
          items: state.items.flatMap((l) => {
            if (l.lineId !== lineId) return [l];
            if (cantidad <= 0) return []; // 0 → eliminar línea
            return [{ ...l, cantidad: Math.min(cantidad, 99) }];
          }),
        })),

      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: "rewind-cart",
      // No persistir el estado del drawer
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// ─── Selectores derivados ────────────────────────────────────────

export const selectCount = (s: CartState) =>
  s.items.reduce((acc, l) => acc + l.cantidad, 0);

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((acc, l) => acc + l.precio * l.cantidad, 0);
