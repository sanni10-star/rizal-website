import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GammeCard } from "@/components/catalog/GammeCard";
import { brandFromSlug, getByBrand, BRANDS_HVAC, brandSlug } from "@/content/catalog";
import { gammeHref } from "@/lib/links";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ brand: string }> };

export async function generateStaticParams() {
  return BRANDS_HVAC.map((b) => ({ brand: brandSlug(b) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = brandFromSlug(slug);
  if (!brand) return {};
  return buildMetadata({
    title: `Climatisation ${brand} au Maroc`,
    description: `Découvrez toutes les gammes ${brand} distribuées par RIZAL : encastrable, multi-split, mobile. Installation et garantie constructeur.`,
    path: `/climatisation/${slug}`,
  });
}

export default async function BrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = brandFromSlug(slug);
  if (!brand) notFound();

  const items = getByBrand(brand);

  return (
    <>
      <section className="bg-ink pt-28 pb-16 text-bone">
        <Container>
          <nav className="mb-5 flex items-center gap-2 text-xs text-bone/50">
            <Link href="/" className="hover:text-bone">Accueil</Link>
            <span>/</span>
            <Link href="/climatisation" className="hover:text-bone">Climatisation</Link>
            <span>/</span>
            <span className="text-bone">{brand}</span>
          </nav>
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Marque officielle
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-widest2 md:text-7xl">
            {brand}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-bone/75 md:text-lg">
            Toutes les gammes {brand} distribuées par RIZAL — produits officiels,
            installation certifiée, garantie constructeur.
          </p>
        </Container>
      </section>

      <section className="bg-bone py-16 md:py-20">
        <Container>
          <SectionTitle
            eyebrow={`${items.length} gamme${items.length > 1 ? "s" : ""}`}
            title={`Catalogue ${brand}`}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <GammeCard key={item.id} item={item} href={gammeHref(item)} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
