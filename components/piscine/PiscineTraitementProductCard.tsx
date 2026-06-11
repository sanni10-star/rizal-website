"use client";

import { ProductImage } from "@/components/catalog/ProductImage";
import type { PiscineTraitementProduct } from "@/content/piscine-marques-traitement";

export function PiscineTraitementProductCard({
  product,
  sectionTitle,
  accent,
  whatsappHref,
}: {
  product: PiscineTraitementProduct;
  sectionTitle: string;
  accent: string;
  whatsappHref: string;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm">
      <div className="aspect-[4/5] w-full bg-white p-5">
        <ProductImage
          src={product.image}
          alt={`${product.name} — vue produit`}
          loading="lazy"
          fit="contain"
          className="h-full w-full"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-ink/8 p-5">
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
            Traitement
          </span>
        </div>

        <p className="text-sm text-ink/70">{product.summary}</p>
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink/45">{sectionTitle}</p>

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
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-wa px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-600"
          >
            Demander un devis
          </a>
        </div>
      </div>
    </article>
  );
}
