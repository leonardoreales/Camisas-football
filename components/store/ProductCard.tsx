"use client";

import Image from "next/image";
import Link from "next/link";
import { useMotionValue, useSpring, useTransform, motion } from "motion/react";
import { formatCOP } from "@/lib/utils";
import { JerseyVisual } from "./JerseyVisual";
import type { MockProducto } from "@/lib/mock-data";

export function ProductCard({
  producto,
  hero = false,
}: {
  producto: MockProducto;
  hero?: boolean;
}) {
  const { colores, dorsal } = producto;
  const tieneDescuento = producto.precio_descuento != null;
  const precioFinal = producto.precio_descuento ?? producto.precio;
  const descuentoPct = tieneDescuento
    ? Math.round((1 - producto.precio_descuento! / producto.precio) * 100)
    : 0;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group h-full"
    >
      <Link
        href={`/producto/${producto.slug}`}
        className="border-edge bg-surface hover:border-accent-green/50 relative flex h-full flex-col overflow-hidden rounded-md border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_oklch(0.82_0.22_155_/_0.25)]"
      >
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {tieneDescuento && (
            <span className="bg-accent-red text-content rounded px-2 py-1 font-mono text-xs font-medium">
              -{descuentoPct}%
            </span>
          )}
          {producto.version === "jugador" && (
            <span className="border-accent-green/40 text-accent-green rounded border bg-black/40 px-2 py-1 font-display text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
              Jugador
            </span>
          )}
        </div>

        {/* Visual */}
        <div
          className={`from-elevated to-base relative bg-gradient-to-b overflow-hidden ${
            hero ? "aspect-[3/4]" : "aspect-square"
          } ${producto.imagenes.length === 0 ? "p-6" : ""}`}
        >
          <div
            className="absolute inset-0 opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60 z-[1]"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${colores.primario}, transparent 70%)`,
            }}
          />
          {producto.imagenes.length > 0 ? (
            <Image
              src={producto.imagenes[0]}
              alt={`${producto.equipo} — ${producto.nombre}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <JerseyVisual
              {...colores}
              nombre={dorsal?.nombre}
              numero={dorsal?.numero}
              className="relative h-full w-full drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        {/* Info */}
        <div className="border-edge flex flex-1 flex-col border-t p-4">
          <p className="text-muted font-mono text-[11px] uppercase tracking-wider">
            {producto.liga} · {producto.temporada}
          </p>
          <h3
            className={`font-display mt-1 font-semibold leading-tight ${
              hero ? "text-2xl" : "text-lg"
            }`}
          >
            {producto.equipo}
          </h3>
          <p className="text-muted mt-0.5 line-clamp-1 text-xs normal-case">
            {producto.nombre}
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono text-accent-green text-base font-medium">
              {formatCOP(precioFinal)}
            </span>
            {tieneDescuento && (
              <span className="text-disabled font-mono text-xs line-through">
                {formatCOP(producto.precio)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
