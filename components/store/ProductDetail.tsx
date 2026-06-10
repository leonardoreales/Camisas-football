"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { formatCOP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { JerseyVisual } from "./JerseyVisual";
import type { MockProducto } from "@/lib/mock-data";

export function ProductDetail({ producto }: { producto: MockProducto }) {
  const [tallaSel, setTallaSel] = useState<string | null>(null);
  const [nombre, setNombre] = useState(producto.dorsal?.nombre ?? "");
  const [numero, setNumero] = useState(producto.dorsal?.numero ?? "");

  const tieneDescuento = producto.precio_descuento != null;
  const precioFinal = producto.precio_descuento ?? producto.precio;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Visual */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="border-edge from-elevated to-base relative overflow-hidden rounded-md border bg-gradient-to-b p-10">
          <div
            className="absolute inset-0 opacity-30 blur-3xl"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${producto.colores.primario}, transparent 65%)`,
            }}
          />
          <JerseyVisual
            {...producto.colores}
            nombre={nombre || undefined}
            numero={numero || undefined}
            className="relative mx-auto w-full max-w-sm drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Info + acciones */}
      <div>
        <p className="text-muted font-mono text-xs uppercase tracking-wider">
          {producto.liga} · {producto.temporada}
        </p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{producto.equipo}</h1>
        <p className="text-muted mt-1 normal-case">{producto.nombre}</p>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-mono text-accent-green text-3xl font-medium">
            {formatCOP(precioFinal)}
          </span>
          {tieneDescuento && (
            <span className="text-disabled font-mono text-lg line-through">
              {formatCOP(producto.precio)}
            </span>
          )}
        </div>

        {producto.descripcion && (
          <p className="text-muted mt-5 max-w-md text-sm normal-case leading-relaxed">
            {producto.descripcion}
          </p>
        )}

        {/* Selector de talla */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
              Talla
            </h3>
            <span className="text-muted text-xs normal-case">Guía de tallas</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {producto.variantes?.map((v) => {
              const agotado = v.stock <= 0;
              const activa = tallaSel === v.talla;
              return (
                <button
                  key={v.id}
                  disabled={agotado}
                  onClick={() => setTallaSel(v.talla)}
                  className={`grid h-12 w-12 place-items-center rounded border font-display font-semibold transition-all ${
                    activa
                      ? "border-accent-green bg-accent-green text-base"
                      : "border-edge text-content hover:border-accent-green"
                  } ${agotado ? "text-disabled cursor-not-allowed line-through opacity-40" : ""}`}
                >
                  {v.talla}
                </button>
              );
            })}
          </div>
        </div>

        {/* Personalización */}
        <div className="border-edge mt-8 rounded-md border p-5">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
            Personaliza tu dorsal
            <span className="text-accent-green"> · opcional</span>
          </h3>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
            <div>
              <label className="text-muted text-xs normal-case">Nombre</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value.toUpperCase())}
                maxLength={12}
                placeholder="TU NOMBRE"
                className="border-edge bg-base text-content focus:border-accent-green mt-1 w-full rounded border px-3 py-2 font-display uppercase outline-none"
              />
            </div>
            <div className="w-20">
              <label className="text-muted text-xs normal-case">N°</label>
              <input
                value={numero}
                onChange={(e) =>
                  setNumero(e.target.value.replace(/\D/g, "").slice(0, 2))
                }
                placeholder="10"
                className="border-edge bg-base text-content focus:border-accent-green mt-1 w-full rounded border px-3 py-2 text-center font-mono outline-none"
              />
            </div>
          </div>
        </div>

        {/* Add to cart */}
        <div className="mt-8 flex gap-3">
          <Button size="lg" className="flex-1" disabled={!tallaSel}>
            <ShoppingBag className="size-4" />
            {tallaSel ? "Agregar al carrito" : "Selecciona una talla"}
          </Button>
        </div>

        {/* Garantías */}
        <ul className="text-muted mt-8 space-y-2 text-sm normal-case">
          {[
            "Estampado de dorsal de alta durabilidad",
            "Envío a todo Colombia · 2-5 días hábiles",
            "Pago seguro con Wompi (PSE, Nequi, tarjetas)",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="text-accent-green size-4 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
