"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Talla } from "@/types";

type FilterPanelProps = {
  ligas: { nombre: string; slug: string; count: number }[];
  versiones: readonly string[];
  tallas: readonly string[];
};

export function FilterPanel({ ligas, versiones, tallas }: FilterPanelProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const activeLiga = searchParams.get("liga");
  const activeVersion = searchParams.get("version");
  const activeTalla = searchParams.get("talla");
  const activeCount = [activeLiga, activeVersion, activeTalla].filter(Boolean).length;

  function updateFilter(key: string, value: string) {
    const current = new URLSearchParams(searchParams.toString());
    if (current.get(key) === value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }
    startTransition(() => {
      router.push(`/catalogo?${current.toString()}`);
    });
  }

  function clearFilters() {
    startTransition(() => {
      router.push("/catalogo");
    });
  }

  return (
    <div className={cn("space-y-8 transition-opacity duration-200", isPending && "opacity-50 pointer-events-none")}>
      {/* Active filters bar */}
      {activeCount > 0 && (
        <div className="flex items-center justify-between border-b border-edge pb-4">
          <span className="font-mono text-xs text-accent-green">
            {activeCount} {activeCount === 1 ? "filtro activo" : "filtros activos"}
          </span>
          <button
            onClick={clearFilters}
            className="font-mono text-xs text-muted hover:text-content transition-colors"
          >
            Limpiar
          </button>
        </div>
      )}

      {/* Liga */}
      <div>
        <h3 className="font-display text-content mb-3 text-sm font-semibold uppercase tracking-wide">
          Liga
        </h3>
        <div className="space-y-2">
          {ligas.map((liga) => {
            const isActive = activeLiga === liga.nombre;
            return (
              <label
                key={liga.slug}
                className="group flex cursor-pointer items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => updateFilter("liga", liga.nombre)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "grid size-4 place-items-center rounded-sm border transition-colors",
                      isActive
                        ? "border-accent-green bg-accent-green"
                        : "border-edge group-hover:border-accent-green"
                    )}
                    aria-hidden="true"
                  >
                    {isActive && <Check className="size-2.5 text-base stroke-[3]" />}
                  </span>
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      isActive ? "text-content" : "text-muted group-hover:text-content"
                    )}
                  >
                    {liga.nombre}
                  </span>
                </span>
                <span className="text-disabled font-mono text-xs">{liga.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Versión */}
      <div>
        <h3 className="font-display text-content mb-3 text-sm font-semibold uppercase tracking-wide">
          Versión
        </h3>
        <div className="space-y-2">
          {versiones.map((v) => {
            const isActive = activeVersion === v;
            return (
              <label
                key={v}
                className="group flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => updateFilter("version", v)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "grid size-4 place-items-center rounded-sm border transition-colors",
                    isActive
                      ? "border-accent-green bg-accent-green"
                      : "border-edge group-hover:border-accent-green"
                  )}
                  aria-hidden="true"
                >
                  {isActive && <Check className="size-2.5 text-base stroke-[3]" />}
                </span>
                <span
                  className={cn(
                    "text-sm capitalize transition-colors",
                    isActive ? "text-content" : "text-muted group-hover:text-content"
                  )}
                >
                  {v}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Talla */}
      <div>
        <h3 className="font-display text-content mb-3 text-sm font-semibold uppercase tracking-wide">
          Talla
        </h3>
        <div className="flex flex-wrap gap-2">
          {tallas.map((t) => {
            const isActive = activeTalla === t;
            return (
              <button
                key={t}
                onClick={() => updateFilter("talla", t as Talla)}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded border font-mono text-xs transition-colors",
                  isActive
                    ? "border-accent-green text-accent-green bg-accent-green/10"
                    : "border-edge text-muted hover:border-accent-green hover:text-accent-green"
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
