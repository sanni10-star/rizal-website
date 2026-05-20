import Link from "next/link";
import type { CatalogItem } from "@/types/catalog";
import { gammeHref } from "@/lib/links";
import { AddToCartButton } from "./AddToCartButton";
import { ProductImage } from "./ProductImage";

export function CrossSellRow({
  items,
  title = "Souvent associé à votre projet",
}: {
  items: CatalogItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-ink/5 bg-bone py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl text-ink md:text-3xl">{title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-2xl border border-ink/5 bg-white p-4 transition hover:shadow-lg hover:shadow-ink/5"
            >
              <Link
                href={gammeHref(item)}
                className="aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-bone"
              >
                <ProductImage src={item.image} alt={item.name} fit="contain" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                {item.brand ? (
                  <p className="text-[10px] font-semibold uppercase tracking-widest2 text-sand-600">
                    {item.brand}
                  </p>
                ) : null}
                <Link
                  href={gammeHref(item)}
                  className="line-clamp-1 font-display text-base text-ink hover:text-sand-600"
                >
                  {item.name}
                </Link>
                <p className="line-clamp-2 text-xs text-ink/60">{item.shortDescFr}</p>
                <div className="mt-2">
                  <AddToCartButton
                    itemId={item.id}
                    label="Ajouter"
                    variant="ghost"
                    className="h-9 px-3 text-xs"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
