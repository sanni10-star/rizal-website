import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BrandCard } from "@/components/catalog/BrandCard";
import { GammeCard } from "@/components/catalog/GammeCard";
import { BRANDS_HVAC, climatisationItems } from "@/content/catalog";
import { gammeHref } from "@/lib/links";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Climatiseur Essaouira — MEGALIFE, INGELEC, LG, TRANE",
  description:
    "Achat et installation de climatiseur à Essaouira : split, encastrable, mobile. Marques officielles MEGALIFE, INGELEC, LG, TRANE. Devis gratuit, garantie constructeur.",
  path: "/climatisation",
  keywords: [
    "climatiseur Essaouira",
    "climatisation Essaouira",
    "split Essaouira",
    "MEGALIFE Essaouira",
  ],
});

export default function ClimatisationPage() {
  return (
    <>
      <section className="bg-ink pt-28 pb-20 text-bone">
        <Container>
          <Link
            href="/"
            className="relative z-10 mb-6 inline-flex items-center gap-2 text-xs font-medium text-bone/70 transition hover:text-bone"
          >
            <span aria-hidden className="select-none">
              ←
            </span>
            Retour à l&apos;accueil
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Climatisation — Catalogue Complet
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            Climatiseur à Essaouira — l&apos;air des villas d&apos;exception.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-bone/75 md:text-lg">
            MEGALIFE, INGELEC, LG et TRANE — vente et pose de climatiseur à
            Essaouira : encastrable, multi-split et mobile, avec installation
            certifiée et garantie constructeur.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Blue Essaouira coastal photo */}
        <Image
          src="/img/bg/essaouira-blue.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center saturate-[1.05]"
          quality={85}
          priority={false}
          aria-hidden
        />
        {/* Navy brand overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170deg, rgba(26,40,69,0.72) 0%, rgba(14,22,42,0.80) 40%, rgba(11,15,28,0.88) 100%)",
          }}
          aria-hidden
        />
        {/* Blue radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(56,120,200,0.10) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <Container className="relative z-10">
          <SectionTitle
            eyebrow="Marques officielles"
            title="Choisissez votre climatiseur à Essaouira"
            description="Quatre marques officielles disponibles dans notre showroom Essaouira — cliquez pour explorer les gammes."
            align="center"
            invert
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {BRANDS_HVAC.map((brand) => (
              <BrandCard key={brand} brand={brand} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionTitle
            eyebrow="Toutes les gammes"
            title="L'intégralité du catalogue Climatisation"
            description="Les gammes des 4 marques officielles dans tous les formats."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {climatisationItems.map((item) => (
              <GammeCard key={item.id} item={item} href={gammeHref(item)} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
