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
    <header className="border-edge bg-base/80 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          KIT<span className="text-accent-green">STORE</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted hover:text-content font-display text-sm font-medium uppercase tracking-wide transition-colors"
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
  );
}
