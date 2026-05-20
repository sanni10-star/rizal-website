import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { CrossSellRow } from "@/components/catalog/CrossSellRow";
import { ProductImage } from "@/components/catalog/ProductImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { catalog, solaireItems } from "@/content/catalog";
import { getRelatedToItem } from "@/lib/crossSell";
import { whatsappLinkForItem } from "@/lib/whatsapp";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ gamme: string }> };

export async function generateStaticParams() {
  return solaireItems.map((i) => ({ gamme: i.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gamme } = await params;
  const item = catalog.find((c) => c.id === gamme);
  if (!item) return {};
  return buildMetadata({
    title: item.name,
    description: item.shortDescFr,
    path: `/energie-solaire/${gamme}`,
    image: item.image,
  });
}

export default async function SolaireGammePage({ params }: Props) {
  const { gamme } = await params;
  const item = catalog.find((c) => c.id === gamme && c.category === "solaire");
  if (!item) notFound();

  const related = getRelatedToItem(item, catalog, 3);
  const url = `${SITE.url}/energie-solaire/${gamme}`;

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: item.name,
          description: item.shortDescFr,
          category: "Énergie Solaire",
          image: item.image,
          url,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", url: SITE.url },
          { name: "Énergie Solaire", url: `${SITE.url}/energie-solaire` },
          { name: item.name, url },
        ])}
      />

      <article className="bg-bone pt-28">
        <Container className="pb-12">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-ink/55">
            <Link href="/" className="hover:text-ink">Accueil</Link>
            <span>/</span>
            <Link href="/energie-solaire" className="hover:text-ink">Énergie Solaire</Link>
            <span>/</span>
            <span className="text-ink">{item.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-ink/5 lg:sticky lg:top-28">
              <ProductImage
                src={item.image}
                alt={item.name}
                loading="eager"
              />
              {item.badge ? (
                <span className="absolute left-5 top-5 rounded-full bg-ink/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest2 text-sand-300 backdrop-blur">
                  {item.badge}
                </span>
              ) : null}
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                Énergie Solaire
              </p>
              <h1 className="mt-2 font-display text-4xl leading-tight text-ink md:text-5xl">
                {item.name}
              </h1>
              {item.gammeLabel ? (
                <p className="mt-2 text-sm uppercase tracking-widest2 text-ink/60">
                  {item.gammeLabel}
                </p>
              ) : null}

              <p className="mt-6 text-base leading-relaxed text-ink/75">
                {item.longDescFr ?? item.shortDescFr}
              </p>

              {item.highlights && item.highlights.length > 0 ? (
                <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-ink/80">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sand-400/20 text-sand-700">
                        <Check className="h-3 w-3" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.capacities && item.capacities.length > 0 ? (
                <div className="mt-7">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                    Capacités / Configurations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.capacities.map((c) => (
                      <span key={c} className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/80">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <AddToCartButton itemId={item.id} className="h-14 px-7 text-base" />
                <a
                  href={whatsappLinkForItem(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center gap-2 rounded-full bg-wa px-7 text-base font-semibold text-white shadow-xl shadow-emerald-900/20 hover:bg-emerald-600"
                >
                  Demander via WhatsApp
                </a>
              </div>

              <div className="mt-10 rounded-3xl border border-ink/5 bg-white p-6">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                  Caractéristiques techniques
                </p>
                <dl className="divide-y divide-ink/5">
                  {item.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-2 gap-3 py-2.5 text-sm">
                      <dt className="text-ink/60">{s.label}</dt>
                      <dd className="font-medium text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </article>

      <CrossSellRow items={related} title="Pour compléter votre installation solaire" />
    </>
  );
}
