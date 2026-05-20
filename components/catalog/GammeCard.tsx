"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CatalogItem } from "@/types/catalog";
import { AddToCartButton } from "./AddToCartButton";
import { ProductImage } from "./ProductImage";

export function GammeCard({
  item,
  href,
}: {
  item: CatalogItem;
  href: string;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-sm transition hover:shadow-xl hover:shadow-ink/10">
      <Link href={href} className="relative block aspect-[3/2] overflow-hidden bg-white">
        <ProductImage
          src={item.image}
          alt={item.name}
          fit="contain"
          className="transition duration-700 group-hover:scale-[1.03]"
        />
        {item.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-ink/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-sand-300 backdrop-blur">
            {item.badge}
          </span>
        ) : null}
        {item.brand ? (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wider text-ink backdrop-blur">
            {item.brand}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-xl leading-tight text-ink">
            {item.name}
          </h3>
          {item.gammeLabel ? (
            <p className="mt-1 text-xs uppercase tracking-widest2 text-sand-600">
              {item.gammeLabel}
            </p>
          ) : null}
        </div>

        <p className="line-clamp-3 text-sm text-ink/70">{item.shortDescFr}</p>

        {item.formats && item.formats.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {item.formats.slice(0, 3).map((f) => (
              <span
                key={f}
                className="rounded-full border border-ink/10 bg-bone px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ink/70"
              >
                {f}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-center gap-2 pt-3">
          <AddToCartButton itemId={item.id} className="flex-1" />
          <Link
            href={href}
            aria-label="Voir la gamme"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-bone"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
