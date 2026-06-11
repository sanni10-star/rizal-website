"use client";

import { useState } from "react";
import { ProductImage } from "@/components/catalog/ProductImage";
import type { PiscineFiltreProduct } from "@/content/piscine-marques-filtres";
import { cn } from "@/lib/utils";

type Tab = "produit" | "installation";

export function PiscineFiltreProductCard({
  product,
  marqueTitle,
  accent,
  whatsappHref,
}: {
  product: PiscineFiltreProduct;
  marqueTitle: string;
  accent: string;
  whatsappHref: string;
}) {
  const [tab, setTab] = useState<Tab>("produit");

  const activeSrc = tab === "produit" ? product.image : product.imageInstall;
  const activeLabel =
    tab === "produit" ? "Vue produit catalogue" : product.imageInstallAlt;

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm">
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white p-0">
          <ProductImage
            key={activeSrc}
            src={activeSrc}
            alt={`${product.name} — ${activeLabel}`}
            loading="lazy"
            className="!absolute !inset-0 !block !h-full !w-full !min-h-0 !min-w-0 !object-cover !object-center transition-opacity duration-300"
          />
        </div>

        <div className="flex border-b border-ink/8">
          <button
            type="button"
            onClick={() => setTab("produit")}
            className={cn(
              "flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition",
              tab === "produit" ? "bg-ink text-bone" : "bg-bone text-ink/60 hover:bg-ink/5",
            )}
          >
            Produit
          </button>
          <button
            type="button"
            onClick={() => setTab("installation")}
            className={cn(
              "flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition",
              tab === "installation" ? "bg-ink text-bone" : "bg-bone text-ink/60 hover:bg-ink/5",
            )}
          >
            Villa Essaouira
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-tight text-ink">{product.name}</h3>
            <p
              className="mt-1 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: accent }}
            >
              {product.series}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink/70">
            Filtre à sable
          </span>
        </div>

        <p className="text-sm text-ink/70">{product.summary}</p>
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink/45">{marqueTitle}</p>

        <dl className="mt-auto space-y-1.5 border-t border-ink/6 pt-3 text-sm">
          {product.specs.map((s) => (
            <div key={s.label} className="flex justify-between gap-3 text-ink/80">
              <dt className="text-ink/55">{s.label}</dt>
              <dd className="text-right font-medium text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-wa px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-600"
          >
            Demander un devis
          </a>
        </div>
      </div>
    </article>
  );
}
