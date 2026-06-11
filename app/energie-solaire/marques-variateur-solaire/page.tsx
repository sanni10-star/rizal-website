import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SolaireVariateurProductCard } from "@/components/solaire/SolaireVariateurProductCard";
import {
  SOLAIRE_MARQUES_VARIATEUR_PATH,
  solaireVariateurMarqueSections,
  type SolaireVariateurProduct,
} from "@/content/solaire-marques-variateur";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { whatsappLinkSimple } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Variateur solaire — Veichi & INVT Monophasé / Triphasé | RIZAL",
  description:
    "Variateurs solaires Veichi SI22/SI23 et INVT GD100-PV à Essaouira — monophasé et triphasé pour pompage solaire, irrigation et forage. Devis RIZAL.",
  path: SOLAIRE_MARQUES_VARIATEUR_PATH,
  keywords: [
    "variateur solaire Essaouira",
    "Veichi pompage solaire Maroc",
    "INVT GD100-PV",
    "variateur monophasé triphasé",
  ],
});

function whatsappForProduct(product: SolaireVariateurProduct, marqueTitle: string) {
  const text = [
    "Bonjour RIZAL,",
    "",
    "Je souhaite un devis pour un variateur solaire :",
    `• ${product.name} — ${product.series}`,
    `• Marque : ${marqueTitle}`,
    "",
    "Merci pour votre retour (puissance, prix, délais installation).",
    "",
    `— Envoyé depuis ${SITE.domain}`,
  ].join("\n");
  return whatsappLinkSimple(text);
}

export default function MarquesVariateurSolairePage() {
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
            <span className="text-bone/70">Variateur solaire</span>
          </nav>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
                Pompage solaire — Mono & Triphasé
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-bone md:text-6xl">
                Variateurs solaires
                <br className="hidden md:block" /> pour pompage & irrigation
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/65">
                Veichi et INVT — variateurs de fréquence dédiés au pompage
                solaire. Monophasé 220 V et triphasé 380 V, MPPT intégré,
                alimentation hybride PV + réseau.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              {solaireVariateurMarqueSections.map((s) => (
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

      <div className="pb-24">
        {solaireVariateurMarqueSections.map((section, index) => (
          <section key={section.id} id={section.id} className={index > 0 ? "border-t border-ink/8" : ""}>
            <Container className="py-12">
              <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-6">
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
                    <h2 className="font-display text-2xl text-ink md:text-3xl">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-brand text-sand-600">
                      {section.tagline}
                    </p>
                    <p className="mt-2 max-w-lg text-sm text-ink/60">{section.intro}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {section.products.map((product) => (
                  <SolaireVariateurProductCard
                    key={product.id}
                    product={product}
                    marqueTitle={section.title}
                    accent={section.accent}
                    whatsappHref={whatsappForProduct(product, section.title)}
                  />
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
                Dimensionnement pompe
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Besoin d&apos;un variateur adapté à votre pompe ?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Nos équipes dimensionnent le variateur selon votre pompe
                (immergeée, surface, forage), la puissance panneaux et la
                phase disponible sur site.
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
