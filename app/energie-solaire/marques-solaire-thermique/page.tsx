import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText, MessageCircle, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SolaireThermiqueProductCard } from "@/components/solaire/SolaireThermiqueProductCard";
import {
  SOLAIRE_MARQUES_THERMIQUE_PATH,
  solaireThermiqueMarqueSections,
  type SolaireThermiqueProduct,
} from "@/content/solaire-marques-thermique";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { whatsappLinkSimple } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Solaire thermique — LATO / Teliko & Sonne Aktion | RIZAL",
  description:
    "Chauffe-eau solaire émaillé thermosiphon LATO/Teliko et capteurs thermiques Solar Keymark Sonne Aktion. Produits et devis RIZAL au Maroc.",
  path: SOLAIRE_MARQUES_THERMIQUE_PATH,
});

function whatsappForProduct(product: SolaireThermiqueProduct, marqueTitle: string) {
  const text = [
    "Bonjour RIZAL,",
    "",
    "Je souhaite des informations / un devis pour le produit solaire thermique suivant :",
    `• ${product.name}`,
    `• Marque / gamme : ${marqueTitle}`,
    "",
    "Merci pour votre retour (disponibilité, prix, délais).",
    "",
    `— Envoyé depuis ${SITE.domain}`,
  ].join("\n");
  return whatsappLinkSimple(text);
}

export default function MarquesSolaireThermiquePage() {
  return (
    <article className="bg-bone">

      {/* ── Hero ── */}
      <div className="bg-ink pb-16 pt-24">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-xs text-bone/45">
            <Link href="/" className="transition hover:text-bone/80">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/energie-solaire" className="transition hover:text-bone/80">Énergie Solaire</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-bone/70">Solaire thermique</span>
          </nav>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
                Gammes solaires thermiques
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-bone md:text-6xl">
                Eau chaude solaire<br className="hidden md:block" /> pour votre maison
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/65">
                Thermosiphons, ballons émaillés et capteurs plans pour produire
                votre eau chaude sanitaire avec le soleil. Deux marques certifiées
                Solar Keymark, dimensionnement sur toiture inclus.
              </p>
            </div>

            {/* Logos marques */}
            <div className="flex shrink-0 flex-wrap gap-3">
              {solaireThermiqueMarqueSections.map((s) => (
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

      {/* ── Sections marques ── */}
      <div className="pb-24">
        {solaireThermiqueMarqueSections.map((section, index) => (
          <section key={section.id} className={index > 0 ? "mt-0" : ""}>

            {/* Bandeau marque */}
            <div className={index > 0 ? "border-t border-ink/8" : ""}>
              <Container>
                <div className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-6">
                    {/* Logo */}
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
                      {section.brandOrigin ? (
                        <p className="mt-1 text-[11px] font-medium uppercase tracking-brand text-sand-600">
                          {section.brandOrigin}
                        </p>
                      ) : null}
                      <p className="mt-2 max-w-lg text-sm text-ink/60">
                        {section.intro}
                      </p>
                    </div>
                  </div>

                  {section.pdfHref ? (
                    <a
                      href={section.pdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-ink/5"
                    >
                      <FileText className="h-4 w-4" aria-hidden />
                      Fiche technique
                    </a>
                  ) : null}
                </div>
              </Container>
            </div>

            {/* Grille produits */}
            <Container>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 pb-4">
                {section.products.map((product) => (
                  <SolaireThermiqueProductCard
                    key={product.id}
                    product={product}
                    marqueTitle={section.title}
                    whatsappHref={whatsappForProduct(product, section.title)}
                  />
                ))}
              </div>
            </Container>

          </section>
        ))}
      </div>

      {/* ── CTA final ── */}
      <div className="border-t border-ink/8 bg-white">
        <Container className="py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                Étude personnalisée
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Besoin d&apos;un dimensionnement sur mesure ?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Nos équipes calculent la surface capteurs, le volume ballon et
                la configuration selon votre toiture et votre consommation ECS
                au Maroc.
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
