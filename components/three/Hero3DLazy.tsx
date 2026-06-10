"use client";

import dynamic from "next/dynamic";
import { JerseyVisual } from "@/components/store/JerseyVisual";
import type { Hero3DColores } from "./Hero3D";

// El canvas WebGL solo se carga en cliente (sin SSR). Mientras tanto se
// muestra la ilustración SVG como fallback para evitar saltos de layout.
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => null,
});

export function Hero3DLazy({
  colores,
  numero,
  nombre,
}: {
  colores: Hero3DColores;
  numero?: string;
  nombre?: string;
}) {
  return (
    <div className="relative aspect-square w-full">
      {/* Fallback SVG detrás del canvas */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-100">
        <JerseyVisual
          {...colores}
          nombre={nombre}
          numero={numero}
          className="w-3/4 opacity-20"
        />
      </div>
      <div className="absolute inset-0">
        <Hero3D colores={colores} numero={numero} />
      </div>
    </div>
  );
}
