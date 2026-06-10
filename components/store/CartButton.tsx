"use client";

import { ShoppingBag } from "lucide-react";
import { useCart, selectCount } from "@/lib/store/cart";
import { useHydrated } from "@/hooks/useHydrated";

/** Icono de carrito en la navbar con contador; abre el drawer. */
export function CartButton() {
  const count = useCart(selectCount);
  const open = useCart((s) => s.open);
  const hydrated = useHydrated();

  return (
    <button
      onClick={open}
      className="text-muted hover:text-content hover:bg-elevated relative grid size-10 place-items-center rounded transition-colors"
      aria-label="Abrir carrito"
    >
      <ShoppingBag className="size-5" />
      {hydrated && count > 0 && (
        <span className="bg-accent-green text-base absolute right-0.5 top-0.5 grid min-w-4 place-items-center rounded-full px-1 font-mono text-[10px] font-bold">
          {count}
        </span>
      )}
    </button>
  );
}
