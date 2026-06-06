import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Clock3, Award, Sparkles, Phone } from "lucide-react";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BrandCard } from "@/components/catalog/BrandCard";
import { GammeCard } from "@/components/catalog/GammeCard";
import { BRANDS_HVAC, climatisationItems, solaireItems, servicesItems } from "@/content/catalog";
import { realisations } from "@/content/realisations";
import { gammeHref } from "@/lib/links";
import { whatsappContactUrl } from "@/lib/whatsapp";
import { TrustRibbon } from "@/components/cro/TrustRibbon";
import { BrandComparator } from "@/components/catalog/BrandComparator";
import { ReviewsBlock } from "@/components/catalog/ReviewsBlock";
import { Faq } from "@/components/catalog/Faq";
import { faqGeneral } from "@/content/faq";

const categories = [
  {
    title: "Climatisation",
    eyebrow: "MEGALIFE · INGELEC · LG · TRANE",
    description: "Encastrable, Multi-split, Mobile — toutes les gammes officielles.",
    image: "/img/categories/climatisation.jpg",
    href: "/climatisation",
  },
  {
    title: "Énergie Solaire",
    eyebrow: "Tier 1 · Hybrides · Lithium",
    description: "Panneaux premium, onduleurs Huawei, batteries Pylontech.",
    image: "/img/solaire/panels/panneau-tier1-hero.jpg",
    href: "/energie-solaire",
  },
  {
    title: "Piscines & Villa",
    eyebrow: "Construction · Rénovation",
    description: "Piscines à débordement, rénovation totale, délais respectés.",
    image: "/img/products/piscine/construction/piscine-debordement.jpg",
    href: "/services/piscine",
  },
  {
    title: "Traitement d'Eau",
    eyebrow: "Adoucisseurs · Osmose · UV",
    description: "Eau pure dans toute la villa — santé et durabilité.",
    image: "/img/products/traitement-eau/adoucisseur-villa.jpg",
    href: "/services/traitement-eau",
  },
];

const pillars = [
  {
    icon: Award,
    title: "Marques Officielles",
    description: "Distribution certifiée MEGALIFE, INGELEC, LG, TRANE — produits 100 % authentiques avec garantie constructeur.",
  },
  {
    icon: Clock3,
    title: "Délais Respectés",
    description: "Engagement contractualisé sur les délais — rénovation, piscine, climatisation : nous livrons à la date promise.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie Décennale",
    description: "Gros œuvre garanti 10 ans, finitions 2 ans, équipements selon constructeur. Tout est couvert, par écrit.",
  },
  {
    icon: Sparkles,
    title: "Service Premium 7j/7",
    description: "Conseillers experts disponibles WhatsApp 7j/7, intervention prioritaire pour nos clients sous contrat.",
  },
];

const featured = [
  climatisationItems.find((i) => i.id === "lg-artcool-mirror"),
  climatisationItems.find((i) => i.id === "trane-vrf"),
  climatisationItems.find((i) => i.id === "ingelec-cassette-inverter"),
  climatisationItems.find((i) => i.id === "megalife-bi-split-system"),
  solaireItems.find((i) => i.id === "kit-solaire-villa-10kwc"),
  servicesItems.find((i) => i.id === "piscine-debordement"),
].filter((x): x is NonNullable<typeof x> => Boolean(x));

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <TrustRibbon />

      {/* 4 Catégories */}
      <section className="bg-bone py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Notre Univers"
            title="Quatre expertises, une seule signature."
            description="RIZAL réunit sous un même toit les expertises les plus exigeantes de l'habitat de prestige au Maroc."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-ink"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/30 to-ink/95" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-bone">
                  <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-300">
                    {cat.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-sm text-bone/70">{cat.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest2 text-sand-300">
                    Découvrir <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Marques HVAC — Essaouira blue atmosphere */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Blue Essaouira coastal photo */}
        <Image
          src="/img/bg/essaouira-blue.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover saturate-[1.15]"
          quality={80}
          aria-hidden
        />
        {/* Navy brand overlay — deepens the blue, ensures readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(170deg, rgba(26,40,69,0.72) 0%, rgba(14,22,42,0.80) 40%, rgba(11,15,28,0.88) 100%)",
          }}
          aria-hidden
        />
        {/* Subtle blue radial glow — atmospheric depth behind content */}
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
            eyebrow="Climatisation"
            title="Les quatre noms qui définissent l'air de prestige."
            description="MEGALIFE, INGELEC, LG et TRANE — chacun avec son ADN, tous distribués officiellement par RIZAL."
            invert
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {BRANDS_HVAC.map((brand) => (
              <BrandCard key={brand} brand={brand} />
            ))}
          </div>
        </Container>
      </section>

      {/* Sélection */}
      <section className="bg-white py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionTitle
              eyebrow="Sélection RIZAL"
              title="Nos gammes phares"
              description="Une sélection de produits et services demandés par nos clients villas."
            />
            <Link
              href="/climatisation"
              className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-widest2 text-sand-600 hover:text-sand-700 md:inline-flex"
            >
              Tout le catalogue <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <GammeCard key={item.id} item={item} href={gammeHref(item)} />
            ))}
          </div>
        </Container>
      </section>

      {/* Piliers */}
      <section className="bg-ink py-20 text-bone md:py-28">
        <Container>
          <SectionTitle
            invert
            eyebrow="Pourquoi RIZAL"
            title="Le standard du luxe, sans compromis."
            description="Quatre engagements qui font de RIZAL la référence des villas marocaines de prestige."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl border border-bone/10 bg-bone/5 p-7 backdrop-blur"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sand-400/15 text-sand-300">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl text-bone">{p.title}</h3>
                <p className="mt-2 text-sm text-bone/70">{p.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Réalisations */}
      <section className="bg-bone py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Réalisations"
            title="Quelques villas que nous avons servies."
            description="À Essaouira et dans la région, des projets conçus, livrés et garantis par RIZAL."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {realisations.slice(0, 6).map((r) => (
              <article
                key={r.id}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-600">
                    {r.category} &mdash; {r.city}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink/65">{r.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/realisations"
              className="inline-flex h-12 items-center rounded-full border border-ink/15 bg-white px-6 text-sm font-semibold text-ink hover:bg-ink hover:text-bone"
            >
              Voir toutes les réalisations
            </Link>
          </div>
        </Container>
      </section>

      <BrandComparator />

      <ReviewsBlock />

      <Container>
        <Faq items={faqGeneral} />
      </Container>

      {/* CTA Final */}
      <section className="relative bg-gradient-to-br from-ink to-ink/95 py-20 text-bone md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
              Prêt à démarrer votre projet ?
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
              Parlons de votre villa.
            </h2>
            <p className="mt-5 text-base text-bone/75 md:text-lg">
              Un chef de projet RIZAL vous rappelle gratuitement sous 24h pour
              étudier votre projet — climatisation, solaire, piscine,
              rénovation ou traitement d&apos;eau.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappContactUrl("expert")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-wa px-8 font-semibold text-white shadow-xl shadow-emerald-900/20 hover:bg-emerald-600"
              >
                <Phone className="h-4 w-4" />
                WhatsApp Direct
              </a>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center rounded-full border border-bone/30 bg-bone/5 px-8 font-semibold text-bone backdrop-blur hover:bg-bone/10"
              >
                Demander un Rappel
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
