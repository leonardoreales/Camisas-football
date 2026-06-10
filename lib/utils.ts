import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases de Tailwind resolviendo conflictos (patrón shadcn/ui). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea un valor en pesos colombianos: 89900 → "$ 89.900". */
export function formatCOP(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

/** Convierte un texto a slug url-safe: "Real Madrid 24/25" → "real-madrid-24-25". */
export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quitar acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Pesos colombianos → centavos (Wompi cobra en centavos). */
export function copACentavos(pesos: number): number {
  return Math.round(pesos * 100);
}

/** Genera una referencia única para una orden de Wompi. */
export function generarReferencia(prefijo = "KS"): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefijo}-${ts}-${rand}`;
}
