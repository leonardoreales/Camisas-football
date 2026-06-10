"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CartDrawer } from "@/components/store/CartDrawer";

/**
 * Providers globales de la app.
 * - Registra los plugins de GSAP una sola vez (client-side).
 * - Refresca ScrollTrigger en resize para mantener los triggers alineados.
 *
 * Zustand no requiere provider (store global) y el cliente de Supabase
 * se instancia bajo demanda, así que aquí solo vive el contexto de animación.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}
