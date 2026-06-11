import type { Producto, Talla } from "@/types";

/**
 * Datos de muestra para previsualizar el frontend sin base de datos.
 * Cuando Supabase esté configurado, estos se reemplazan por el fetch real.
 * `colores` es solo para la ilustración SVG de la camiseta (placeholder).
 */
export type MockProducto = Producto & {
  colores: { primario: string; secundario: string; detalle: string };
  dorsal?: { nombre: string; numero: string };
};

const tallasFull: Talla[] = ["S", "M", "L", "XL"];

function variantes(productoId: string, stocks: Partial<Record<Talla, number>>) {
  return tallasFull.map((talla, i) => ({
    id: `${productoId}-${talla}`,
    producto_id: productoId,
    talla,
    stock: stocks[talla] ?? [8, 12, 6, 3][i],
  }));
}

export const productosMock: MockProducto[] = [
  {
    id: "p1",
    nombre: "Local 24/25 — Versión Jugador",
    slug: "argentina-local-24-25",
    descripcion: "Camiseta titular con tres estrellas. Tecnología de tela ligera.",
    equipo: "Argentina",
    liga: "Selecciones",
    temporada: "2024/2025",
    version: "jugador",
    precio: 189900,
    precio_descuento: null,
    imagenes: ["https://images.unsplash.com/photo-1671016233693-53162078ca1c?auto=format&fit=crop&w=600&q=80"],
    categoria_id: null,
    activo: true,
    featured: true,
    colores: { primario: "#6CC7E8", secundario: "#FFFFFF", detalle: "#0B1F3A" },
    dorsal: { nombre: "MESSI", numero: "10" },
    variantes: variantes("p1", { M: 14, L: 9 }),
  },
  {
    id: "p2",
    nombre: "Local 24/25 — Versión Aficionado",
    slug: "real-madrid-local-24-25",
    descripcion: "El blanco de siempre. Corte regular, máxima comodidad.",
    equipo: "Real Madrid",
    liga: "LaLiga",
    temporada: "2024/2025",
    version: "aficionado",
    precio: 159900,
    precio_descuento: 129900,
    imagenes: ["https://images.unsplash.com/photo-1649771543037-916e2702008a?auto=format&fit=crop&w=600&q=80"],
    categoria_id: null,
    activo: true,
    featured: true,
    colores: { primario: "#FFFFFF", secundario: "#F0F0F5", detalle: "#D4AF37" },
    dorsal: { nombre: "BELLINGHAM", numero: "5" },
    variantes: variantes("p2", { S: 4, M: 20, L: 11, XL: 7 }),
  },
  {
    id: "p3",
    nombre: "Local 24/25 — Versión Jugador",
    slug: "barcelona-local-24-25",
    descripcion: "Blaugrana icónica con patrocinador de temporada.",
    equipo: "FC Barcelona",
    liga: "LaLiga",
    temporada: "2024/2025",
    version: "jugador",
    precio: 199900,
    precio_descuento: null,
    imagenes: ["https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?auto=format&fit=crop&w=600&q=80"],
    categoria_id: null,
    activo: true,
    featured: true,
    colores: { primario: "#A50044", secundario: "#004D98", detalle: "#FFED02" },
    dorsal: { nombre: "YAMAL", numero: "19" },
    variantes: variantes("p3", { M: 9, L: 5 }),
  },
  {
    id: "p4",
    nombre: "Local 24/25 — Versión Aficionado",
    slug: "manchester-city-local-24-25",
    descripcion: "Celeste cielo. Edición de campeón.",
    equipo: "Manchester City",
    liga: "Premier League",
    temporada: "2024/2025",
    version: "aficionado",
    precio: 169900,
    precio_descuento: 139900,
    imagenes: ["https://images.unsplash.com/photo-1662096909714-e2f206d0a636?auto=format&fit=crop&w=600&q=80"],
    categoria_id: null,
    activo: true,
    featured: false,
    colores: { primario: "#6CABDD", secundario: "#FFFFFF", detalle: "#1C2C5B" },
    dorsal: { nombre: "HAALAND", numero: "9" },
    variantes: variantes("p4", { S: 6, M: 15, L: 8, XL: 2 }),
  },
  {
    id: "p5",
    nombre: "Local 24/25 — Versión Jugador",
    slug: "liverpool-local-24-25",
    descripcion: "Rojo total. La camiseta de Anfield.",
    equipo: "Liverpool",
    liga: "Premier League",
    temporada: "2024/2025",
    version: "jugador",
    precio: 189900,
    precio_descuento: null,
    imagenes: ["https://images.unsplash.com/photo-1577212017184-80cc0da11082?auto=format&fit=crop&w=600&q=80"],
    categoria_id: null,
    activo: true,
    featured: true,
    colores: { primario: "#C8102E", secundario: "#F6EB61", detalle: "#00B2A9" },
    dorsal: { nombre: "SALAH", numero: "11" },
    variantes: variantes("p5", { M: 10, L: 7 }),
  },
  {
    id: "p6",
    nombre: "Titular 2024 — Versión Aficionado",
    slug: "atletico-nacional-local-2024",
    descripcion: "El verde de la afición. Liga BetPlay.",
    equipo: "Atlético Nacional",
    liga: "Liga BetPlay",
    temporada: "2024",
    version: "aficionado",
    precio: 139900,
    precio_descuento: 119900,
    imagenes: ["https://images.unsplash.com/photo-1668791160369-d20b8175eab2?auto=format&fit=crop&w=600&q=80"],
    categoria_id: null,
    activo: true,
    featured: true,
    colores: { primario: "#00843D", secundario: "#FFFFFF", detalle: "#0B1F3A" },
    dorsal: { nombre: "10", numero: "10" },
    variantes: variantes("p6", { S: 9, M: 18, L: 12, XL: 5 }),
  },
];

export const categoriasMock = [
  { nombre: "Liga BetPlay", slug: "liga-betplay", count: 12 },
  { nombre: "Premier League", slug: "premier-league", count: 24 },
  { nombre: "LaLiga", slug: "laliga", count: 18 },
  { nombre: "Champions League", slug: "champions", count: 16 },
  { nombre: "Selecciones", slug: "selecciones", count: 20 },
];

export function getProductosFeatured() {
  return productosMock.filter((p) => p.featured);
}

export function getProductoBySlug(slug: string) {
  return productosMock.find((p) => p.slug === slug) ?? null;
}
