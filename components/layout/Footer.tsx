import Link from "next/link";

const COLUMNS = [
  {
    title: "Tienda",
    links: ["Catálogo", "Versión Jugador", "Selecciones", "Ofertas"],
  },
  {
    title: "Ayuda",
    links: ["Cómo comprar", "Envíos", "Cambios y tallas", "Personalización"],
  },
  {
    title: "Nosotros",
    links: ["Sobre Rewind", "Autenticidad", "Contacto", "WhatsApp"],
  },
];

export function Footer() {
  return (
    <footer className="border-edge bg-surface mt-24 border-t">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            {/* Logo Concepto E */}
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <span className="block h-8 w-[3px] bg-accent-green transition-all duration-200 group-hover:h-6" />
              <div>
                <span className="font-display block text-2xl font-bold tracking-[0.18em] text-content leading-none">
                  REWIND
                </span>
                <span className="font-display block text-[9px] tracking-[0.3em] text-accent-green normal-case mt-0.5">
                  CAMISAS RETRO
                </span>
              </div>
            </Link>
            <p className="text-muted mt-5 max-w-xs text-sm normal-case leading-relaxed">
              Los kits icónicos del fútbol mundial. Versiones jugador y
              aficionado, personalización de dorsal y envío a toda Colombia.
            </p>
            <p className="text-disabled mt-4 font-mono text-xs">
              Pagos con Wompi · PSE · Nequi · Tarjetas
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-content text-sm font-semibold">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-muted hover:text-accent-green cursor-pointer text-sm normal-case transition-colors">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-edge text-disabled mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs normal-case sm:flex-row">
          <p>© {new Date().getFullYear()} Rewind. Todos los derechos reservados.</p>
          <p className="font-mono">Hecho en Colombia</p>
        </div>
      </div>
    </footer>
  );
}
