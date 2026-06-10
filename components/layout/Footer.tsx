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
    links: ["Sobre KitStore", "Autenticidad", "Contacto", "WhatsApp"],
  },
];

export function Footer() {
  return (
    <footer className="border-edge bg-surface mt-24 border-t">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight"
            >
              KIT<span className="text-accent-green">STORE</span>
            </Link>
            <p className="text-muted mt-4 max-w-xs text-sm">
              Camisas de fútbol premium. Versiones jugador y aficionado,
              personalización de dorsal y pago seguro en Colombia.
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
          <p>© {new Date().getFullYear()} KitStore. Todos los derechos reservados.</p>
          <p className="font-mono">Hecho en Colombia 🇨🇴</p>
        </div>
      </div>
    </footer>
  );
}
