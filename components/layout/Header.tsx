"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { DesktopNav, MobileNav } from "@/components/layout/MegaMenu";
import { useCart } from "@/stores/cart";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = useCart((s) => s.open);
  const lines = useCart((s) => s.lines);
  const count = lines.reduce((acc, l) => acc + l.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink/5 bg-white/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="RIZAL — Accueil"
          className="shrink-0 group/logo"
        >
          <Logo variant={scrolled ? "dark" : "light"} />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 text-[11px] uppercase tracking-widest2 text-ink/50">
            <span>FR</span>
            <span className="opacity-30">|</span>
            <span className="opacity-50">AR</span>
            <span className="opacity-30">|</span>
            <span className="opacity-50">EN</span>
          </div>

          <button
            onClick={open}
            aria-label="Ouvrir mon devis"
            className={cn(
              "relative inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition",
              scrolled
                ? "border-ink/15 text-ink hover:bg-bone"
                : "border-bone/40 text-bone hover:bg-bone/10",
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Mon Devis</span>
            {count > 0 ? (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sand-400 px-1.5 text-[11px] font-semibold text-ink">
                {count}
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              "lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border",
              scrolled
                ? "border-ink/15 text-ink"
                : "border-bone/40 text-bone",
            )}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/5 p-4">
              <Link
                href="/"
                className="group/logo shrink-0"
                onClick={() => setMobileOpen(false)}
                aria-label="RIZAL — Accueil"
              >
                <Logo variant="dark" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-bone"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <MobileNav onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
