"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRANDS_HVAC, brandSlug } from "@/content/catalog";

type MenuItem = {
  label: string;
  href?: string;
  columns?: { title: string; links: { label: string; href: string }[] }[];
};

const menu: MenuItem[] = [
  {
    label: "Climatisation",
    href: "/climatisation",
    columns: [
      {
        title: "Marques officielles",
        links: BRANDS_HVAC.map((b) => ({
          label: b,
          href: `/climatisation/${brandSlug(b)}`,
        })),
      },
      {
        title: "Formats",
        links: [
          { label: "Encastrable (Cassette / Gainable)", href: "/climatisation?format=Encastrable" },
          { label: "Multi-split", href: "/climatisation?format=Multi-split" },
          { label: "Mural Split", href: "/climatisation?format=Mural" },
          { label: "Mobile", href: "/climatisation?format=Mobile" },
        ],
      },
    ],
  },
  { label: "Énergie Solaire", href: "/energie-solaire" },
  {
    label: "Services",
    href: "/services/renovation-villa",
    columns: [
      {
        title: "Services Villa",
        links: [
          { label: "Construction de Piscines", href: "/services/piscine" },
          { label: "Rénovation Villa", href: "/services/renovation-villa" },
          { label: "Traitement d'Eau", href: "/services/traitement-eau" },
        ],
      },
    ],
  },
  { label: "Outils", href: "/outils" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function DesktopNav() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav
      className="hidden lg:flex items-center gap-1"
      onMouseLeave={() => setOpen(null)}
    >
      {menu.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => setOpen(item.label)}
        >
          <Link
            href={item.href ?? "#"}
            className={cn(
              "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition hover:text-ink",
              open === item.label && "text-ink",
            )}
          >
            {item.label}
            {item.columns ? (
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            ) : null}
          </Link>
          {item.columns && open === item.label ? (
            <div
              className={cn(
                "absolute left-0 top-full z-50 mt-2 w-[640px] rounded-3xl border border-ink/5 bg-white p-6 shadow-2xl shadow-ink/15",
              )}
            >
              <div className="grid grid-cols-2 gap-6">
                {item.columns.map((col) => (
                  <div key={col.title}>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                      {col.title}
                    </p>
                    <ul className="space-y-1.5">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded-lg px-3 py-2 text-sm text-ink/80 transition hover:bg-bone hover:text-ink"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </nav>
  );
}

export function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {menu.map((item) => (
        <div key={item.label}>
          <Link
            href={item.href ?? "#"}
            onClick={onNavigate}
            className="block rounded-xl px-4 py-3 font-medium text-ink hover:bg-bone"
          >
            {item.label}
          </Link>
          {item.columns ? (
            <div className="ml-4 border-l border-ink/10 pl-4">
              {item.columns.flatMap((col) =>
                col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    className="block rounded-lg px-3 py-2 text-sm text-ink/70 hover:bg-bone hover:text-ink"
                  >
                    {link.label}
                  </Link>
                )),
              )}
            </div>
          ) : null}
        </div>
      ))}
    </nav>
  );
}
