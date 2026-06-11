"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/lib/nav-links";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger button — solo mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-muted hover:text-content hover:bg-elevated grid size-10 place-items-center rounded transition-colors"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer panel */}
            <motion.aside
              key="mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-0 top-0 z-[60] flex h-full w-72 flex-col bg-elevated border-r border-edge shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-edge px-5 py-4">
                <Link href="/" onClick={close} className="flex items-center gap-3 group">
                  <span className="block h-6 w-[3px] bg-accent-green transition-all duration-200 group-hover:h-4" />
                  <span className="font-display text-lg font-bold tracking-[0.18em] text-content">
                    REWIND
                  </span>
                </Link>
                <button
                  onClick={close}
                  className="text-muted hover:text-content grid size-8 place-items-center rounded transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 space-y-1 px-5 py-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    className="block py-2 font-display text-2xl font-semibold uppercase tracking-wide text-muted hover:text-accent-green transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Footer links */}
              <div className="space-y-3 border-t border-edge px-5 py-5">
                <Link
                  href="/login"
                  onClick={close}
                  className="flex items-center gap-3 text-sm normal-case text-muted hover:text-content transition-colors"
                >
                  <User className="size-4" />
                  Mi cuenta
                </Link>
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex items-center gap-3 text-sm normal-case text-muted hover:text-content transition-colors"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
