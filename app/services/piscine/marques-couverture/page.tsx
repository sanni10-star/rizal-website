import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PiscineCouvertureProductCard } from "@/components/piscine/PiscineCouvertureProductCard";
import {
  PISCINE_MARQUES_COUVERTURE_PATH,
  piscineCouvertureSections,
  type PiscineCouvertureProduct,
} from "@/content/piscine-marques-couverture";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { whatsappLinkSimple } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Couverture thermique piscine — Bâche à bulles sur mesure | RIZAL",
  description:
    "Couvertures thermiques et bâches à bulles pour piscine à Essaouira : 400 microns brut de coupe, bordée 2 ou 4 côtés, GeoBubble 400 & 500 µ. Devis sur mesure RIZAL.",
  path: PISCINE_MARQUES_COUVERTURE_PATH,
  keywords: [
    "couverture thermique piscine Essaouira",
    "bâche à bulles piscine Maroc",
    "GeoBubble piscine",
    "bâche solaire piscine",
  ],
});

function whatsappForProduct(product: PiscineCouvertureProduct) {
  const text = [
    "Bonjour RIZAL,",
    "",
    "Je souhaite un devis pour une couverture thermique piscine :",
    `• ${product.name} — ${product.series}`,
    "",
    "Merci pour votre retour (dimensions, finition, prix, délais).",
    "",
    `— Envoyé depuis ${SITE.domain}`,
  ].join("\n");
  return whatsappLinkSimple(text);
}

export default function MarquesCouverturePiscinePage() {
  return (
    <article className="bg-bone">
      <div className="bg-ink pb-16 pt-24">
        <Container>
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-xs text-bone/45">
            <Link href="/" className="transition hover:text-bone/80">
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/services/piscine" className="transition hover:text-bone/80">
              Piscine
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-bone/70">Couverture thermique</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
              Bâche à bulles — 5 références
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-bone md:text-6xl">
              Couverture thermique
              <br className="hidden md:block" /> pour votre piscine
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/65">
              Bâches à bulles 400 microns Astralpool / Fluidra et GeoBubble sur mesure —
              limitez l&apos;évaporation, conservez la chaleur et réduisez les produits
              chimiques au Maroc.
            </p>
          </div>
        </Container>
      </div>

      <div className="pb-24">
        {piscineCouvertureSections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={index > 0 ? "border-t border-ink/8" : ""}
          >
            <Container className="py-12">
              <div className="mb-8 flex items-start gap-6">
                <div className="flex shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
                  <Image
                    src={section.brandLogo}
                    alt={`Logo ${section.title}`}
                    width={160}
                    height={56}
                    className="h-10 w-auto max-w-[9rem] object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-ink md:text-3xl">{section.title}</h2>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-brand text-sand-600">
                    {section.tagline}
                  </p>
                  <p className="mt-2 max-w-lg text-sm text-ink/60">{section.intro}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {section.products.map((product) => (
                  <div key={product.id} id={product.id.replace("couverture-", "")}>
                    <PiscineCouvertureProductCard
                      product={product}
                      sectionTitle={section.title}
                      accent={section.accent}
                      whatsappHref={whatsappForProduct(product)}
                    />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ))}
      </div>

      <div className="border-t border-ink/8 bg-white">
        <Container className="py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                Conseil couverture
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Besoin d&apos;une bâche sur mesure ?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Nos équipes prennent vos dimensions intérieures, la forme du bassin et
                l&apos;usage (enrouleur, PAC) pour vous proposer la finition adaptée à
                Essaouira.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-600"
              >
                <MessageCircle className="h-4 w-4" />
                Demander une étude
              </Link>
              <Link
                href="/services/piscine"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ink/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Piscine
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}
