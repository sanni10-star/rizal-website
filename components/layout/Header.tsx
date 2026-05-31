"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { DesktopNav, MobileNav } from "@/components/layout/MegaMenu";
import { useCart } from "@/stores/cart";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const openCart = useCart((s) => s.open);
  const lines = useCart((s) => s.lines);
  const count = lines.reduce((acc, l) => acc + l.qty, 0);

  const closeMobile = () => setMobileOpen(false);
  const toggleMobile = () => setMobileOpen((open) => !open);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const mobileMenu = (
    <div
      className={cn(
        "fixed inset-0 z-[100] lg:hidden",
        !mobileOpen && "pointer-events-none",
      )}
      aria-hidden={!mobileOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ease-out",
          mobileOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={closeMobile}
        aria-hidden
      />
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300 ease-out will-change-transform",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-ink/5 p-4">
          <Link
            href="/"
            className="group/logo shrink-0"
            onClick={closeMobile}
            aria-label="RIZAL — Accueil"
          >
            <Logo variant="dark" />
          </Link>
          <button
            type="button"
            onClick={closeMobile}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-bone"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <MobileNav onNavigate={closeMobile} />
        </div>
      </div>
    </div>
  );

  return (
    <>
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
            className="group/logo relative z-10 shrink-0"
          >
            <Logo variant={scrolled ? "dark" : "light"} />
          </Link>

          <DesktopNav />

          <div className="relative z-10 flex items-center gap-2">
            <div className="hidden items-center gap-1 text-[11px] uppercase tracking-widest2 text-ink/50 md:flex">
              <span>FR</span>
              <span className="opacity-30">|</span>
              <span className="opacity-50">AR</span>
              <span className="opacity-30">|</span>
              <span className="opacity-50">EN</span>
            </div>

            <button
              type="button"
              onClick={openCart}
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
              type="button"
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden",
                scrolled
                  ? "border-ink/15 text-ink hover:bg-bone"
                  : "border-bone/40 text-bone hover:bg-bone/10",
              )}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
