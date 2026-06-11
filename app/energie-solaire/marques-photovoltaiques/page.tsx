import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SolairePvProductCard } from "@/components/solaire/SolairePvProductCard";
import {
  SOLAIRE_MARQUES_PHOTOVOLTAIQUE_PATH,
  solairePhotovoltaiqueMarqueSections,
  type SolairePvProduct,
} from "@/content/solaire-marques-photovoltaique";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { whatsappLinkSimple } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Panneaux photovoltaïques Tier 1 — Jinko, JA Solar, Trina, Canadian Solar | RIZAL",
  description:
    "Catalogue panneaux solaires Tier 1 à Essaouira : Jinko Tiger Neo, JA Solar DeepBlue, Trina Vertex S+, Canadian Solar. Photos produit et installation villa — devis RIZAL.",
  path: SOLAIRE_MARQUES_PHOTOVOLTAIQUE_PATH,
  keywords: [
    "panneau solaire Essaouira",
    "Jinko Solar Maroc",
    "JA Solar Essaouira",
    "Trina Solar Maroc",
    "Canadian Solar Essaouira",
  ],
});

function whatsappForProduct(product: SolairePvProduct, marqueTitle: string) {
  const text = [
    "Bonjour RIZAL,",
    "",
    "Je souhaite un devis pour des panneaux photovoltaïques :",
    `• ${product.name} — ${product.series}`,
    `• Marque : ${marqueTitle}`,
    "",
    "Merci pour votre retour (dimensionnement, prix, délais installation).",
    "",
    `— Envoyé depuis ${SITE.domain}`,
  ].join("\n");
  return whatsappLinkSimple(text);
}

export default function MarquesPhotovoltaiquesPage() {
  return (
    <article className="bg-bone">
      <div className="bg-ink pb-16 pt-24">
        <Container>
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-xs text-bone/45">
            <Link href="/" className="transition hover:text-bone/80">
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/energie-solaire" className="transition hover:text-bone/80">
              Énergie Solaire
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-bone/70">Panneaux photovoltaïques</span>
          </nav>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
                Modules Tier 1 — 500 à 700 Wc
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-bone md:text-6xl">
                Panneaux photovoltaïques
                <br className="hidden md:block" /> pour votre villa
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/65">
                Jinko, JA Solar, Trina et Canadian Solar — les quatre références
                mondiales installées par RIZAL à Essaouira. Comparez les gammes,
                visualisez chaque module et son installation sur villa marocaine.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              {solairePhotovoltaiqueMarqueSections.map((s) => (
                <div
                  key={s.id}
                  className="flex h-16 w-44 items-center justify-center rounded-2xl border border-bone/15 bg-white/10 px-4 backdrop-blur-sm"
                >
                  <Image
                    src={s.brandLogo}
                    alt={`Logo ${s.title}`}
                    width={160}
                    height={48}
                    className="h-9 w-auto max-w-full object-contain drop-shadow"
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {solairePhotovoltaiqueMarqueSections.map((section) => (
            <div key={section.id} id={section.id}>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-36 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-white px-3 shadow-sm">
                  <Image
                    src={section.brandLogo}
                    alt={`Logo ${section.title}`}
                    width={140}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-ink">{section.title}</h2>
                  <p className="text-[11px] font-medium uppercase tracking-brand text-sand-600">
                    {section.tagline}
                  </p>
                </div>
              </div>
              <p className="mb-5 text-sm text-ink/65">{section.intro}</p>
              <SolairePvProductCard
                product={section.product}
                marqueTitle={section.title}
                accent={section.accent}
                whatsappHref={whatsappForProduct(section.product, section.title)}
              />
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-ink/8 bg-white">
        <Container className="py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                Étude gratuite
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Dimensionnement sur mesure pour votre toiture
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Nos équipes calculent le nombre de panneaux, la puissance
                onduleur et la configuration batteries selon votre consommation
                et votre toiture à Essaouira.
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
                href="/energie-solaire"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ink/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Énergie solaire
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}
