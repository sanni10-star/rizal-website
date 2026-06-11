import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PiscineTraitementProductCard } from "@/components/piscine/PiscineTraitementProductCard";
import {
  PISCINE_MARQUES_TRAITEMENT_PATH,
  piscineTraitementSections,
  type PiscineTraitementProduct,
} from "@/content/piscine-marques-traitement";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { whatsappLinkSimple } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Traitement piscine — Chlore, pH−, anti-algue & floculant | RIZAL",
  description:
    "Produits de traitement piscine à Essaouira : chlore poudre Astralpool & RIZAL, pastilles, chlore choc, anti-algue, floculant, anti-calcaire et pH−. Devis RIZAL.",
  path: PISCINE_MARQUES_TRAITEMENT_PATH,
  keywords: [
    "traitement piscine Essaouira",
    "chlore piscine Maroc",
    "anti algue piscine",
    "pH moins piscine",
  ],
});

function whatsappForProduct(product: PiscineTraitementProduct) {
  const text = [
    "Bonjour RIZAL,",
    "",
    "Je souhaite un devis pour un produit de traitement piscine :",
    `• ${product.name} — ${product.series}`,
    "",
    "Merci pour votre retour (format, prix, délais).",
    "",
    `— Envoyé depuis ${SITE.domain}`,
  ].join("\n");
  return whatsappLinkSimple(text);
}

export default function MarquesTraitementPiscinePage() {
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
            <span className="text-bone/70">Traitement piscine</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
              Chimie piscine — 8 produits
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-bone md:text-6xl">
              Traitement piscine
              <br className="hidden md:block" /> pour une eau cristalline
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/65">
              Chlore poudre Astralpool & RIZAL, pastilles, chlore choc, anti-algue,
              floculant, anti-calcaire et pH− — tout pour entretenir votre bassin au
              Maroc.
            </p>
          </div>
        </Container>
      </div>

      <div className="pb-24">
        {piscineTraitementSections.map((section, index) => (
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
                  <div key={product.id} id={product.id.replace("traitement-", "")}>
                    <PiscineTraitementProductCard
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
                Conseil entretien
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Besoin d&apos;un plan de traitement adapté ?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Nos équipes vous conseillent sur le dosage selon le volume de votre
                bassin, la fréquence de baignade et la qualité de l&apos;eau à
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
