"use client";

import { useState } from "react";
import { ProductImage } from "@/components/catalog/ProductImage";
import type { SolaireThermiqueProduct } from "@/content/solaire-marques-thermique";
import { cn } from "@/lib/utils";

type Tab = "produit" | "installation";

export function SolaireThermiqueProductCard({
  product,
  marqueTitle,
  whatsappHref,
}: {
  product: SolaireThermiqueProduct;
  marqueTitle: string;
  whatsappHref: string;
}) {
  const [tab, setTab] = useState<Tab>("produit");

  const activeSrc = tab === "produit" ? product.image : product.imageInstall;
  const activeLabel =
    tab === "produit" ? "Vue produit (document constructeur)" : "Détail installation / mise en situation";

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm">
      <div className="relative">
        {/**
         * Cadre fixe 4:3. Les PNG catalogue ont souvent de la transparence sur les bords :
         * sans fond blanc, le bone du parent crée des « bandes » latérales visibles.
         * object-cover assure que le bitmap couvre tout le cadre (pas de trous).
         */}
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
            En situation
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl leading-tight text-ink">{product.name}</h3>
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

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-wa px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-600 sm:min-w-[10rem]"
          >
            Demander ce produit
          </a>
        </div>
      </div>
    </article>
  );
}
