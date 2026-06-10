"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Revela su contenido con un fade-up al entrar en viewport (GSAP ScrollTrigger).
 * Si `stagger` es true, anima los hijos directos en secuencia (ideal para grids).
 * Respeta prefers-reduced-motion: sin movimiento, el contenido queda visible.
 */
export function Reveal({
  children,
  className,
  y = 36,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets =
          stagger && ref.current ? ref.current.children : ref.current;
        gsap.from(targets, {
          y,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
