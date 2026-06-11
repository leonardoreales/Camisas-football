import Link from "next/link";
import { Search, User } from "lucide-react";
import { CartButton } from "@/components/store/CartButton";

const NAV_LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/catalogo?liga=Liga+BetPlay", label: "Liga BetPlay" },
  { href: "/catalogo?liga=Premier+League", label: "Europa" },
  { href: "/catalogo?version=jugador", label: "Versión Jugador" },
];

export function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      {/* Barra de anuncio — marketing CRO */}
      <div className="bg-elevated border-b border-[#242B4A] py-2 text-center">
        <p className="font-display text-[11px] font-medium tracking-[0.2em] text-accent-green uppercase">
          Envío gratis a toda Colombia en compras mayores a{" "}
          <span className="text-content">$200.000</span>
        </p>
      </div>

      {/* Navbar principal */}
      <header className="border-edge bg-surface/90 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

          {/* Logo — Concepto E: barra dorada + wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="block h-7 w-[3px] bg-accent-green transition-all duration-200 group-hover:h-5" />
            <span className="font-display text-xl font-bold tracking-[0.18em] text-content">
              REWIND
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted hover:text-accent-green font-display text-sm font-medium uppercase tracking-wide transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-1">
            <button
              className="text-muted hover:text-content hover:bg-elevated grid size-10 place-items-center rounded transition-colors"
              aria-label="Buscar"
            >
              <Search className="size-5" />
            </button>
            <Link
              href="/login"
              className="text-muted hover:text-content hover:bg-elevated grid size-10 place-items-center rounded transition-colors"
              aria-label="Mi cuenta"
            >
              <User className="size-5" />
            </Link>
            <CartButton />
          </div>
        </div>
      </header>
    </div>
  );
}
