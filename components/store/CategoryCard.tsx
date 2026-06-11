import Link from "next/link";

export const LEAGUE_COLORS: Record<string, string> = {
  "Liga BetPlay": "#C9A84C",
  "Premier League": "#37003C",
  "LaLiga": "#FF4B44",
  "Champions League": "#0A3785",
  "Selecciones": "#C8102E",
};

type CategoryCardProps = {
  nombre: string;
  slug: string;
  count: number;
  color: string;
};

export function CategoryCard({ nombre, slug, count, color }: CategoryCardProps) {
  return (
    <Link
      href={`/catalogo?liga=${encodeURIComponent(nombre)}`}
      style={{ "--league-color": color } as React.CSSProperties}
      className="group relative flex flex-col justify-end overflow-hidden rounded-md border border-edge bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-[var(--league-color)] flex-shrink-0 w-44 aspect-[3/4] md:w-full snap-start"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 90%, ${color}40, transparent 65%)`,
        }}
      />

      {/* Content */}
      <div className="relative px-4 pb-4 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {count} camisas
        </p>
        <p className="mt-1 font-display text-base font-bold leading-tight text-content">
          {nombre}
        </p>
      </div>

      {/* Bottom accent bar animada */}
      <div
        className="h-0.5 w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: color }}
      />
    </Link>
  );
}
