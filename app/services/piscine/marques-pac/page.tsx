import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PiscinePacProductCard } from "@/components/piscine/PiscinePacProductCard";
import {
  PISCINE_MARQUES_PAC_PATH,
  piscinePacMarqueSections,
  type PiscinePacProduct,
} from "@/content/piscine-marques-pac";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { whatsappLinkSimple } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Pompes à chaleur piscine Laswim — 9 à 40 kW | RIZAL",
  description:
    "Pompes à chaleur piscine Laswim FIQ Inverter et V-Type à Essaouira — de 9 à 40 kW, COP jusqu'à 15, Wi-Fi, échangeur titane. Devis RIZAL.",
  path: PISCINE_MARQUES_PAC_PATH,
  keywords: [
    "pompe à chaleur piscine Essaouira",
    "Laswim PAC piscine Maroc",
    "chauffage piscine 9 kW",
    "PAC piscine 40 kW",
  ],
});

function whatsappForProduct(product: PiscinePacProduct, marqueTitle: string) {
  const text = [
    "Bonjour RIZAL,",
    "",
    "Je souhaite un devis pour une pompe à chaleur piscine :",
    `• ${product.name} — ${product.series}`,
    `• Marque : ${marqueTitle}`,
    "",
    "Merci pour votre retour (puissance, COP, prix, délais).",
    "",
    `— Envoyé depuis ${SITE.domain}`,
  ].join("\n");
  return whatsappLinkSimple(text);
}

export default function MarquesPacPiscinePage() {
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
            <span className="text-bone/70">Pompes à chaleur</span>
          </nav>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
                Chauffage — 9 à 40 kW
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-bone md:text-6xl">
                Pompes à chaleur piscine
                <br className="hidden md:block" /> Laswim — 9 à 40 kW
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/65">
                Laswim FIQ Inverter et V-Type — prolongez la saison de baignade
                d&apos;avril à octobre au Maroc. Full inverter, réfrigérant R32,
                échangeur titane et pilotage Wi-Fi.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              {piscinePacMarqueSections.map((s) => (
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
        {piscinePacMarqueSections.map((section, index) => (
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
                    <h2 className="font-display text-2xl text-ink md:text-3xl">{section.title}</h2>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-brand text-sand-600">
                      {section.tagline}
                    </p>
                    <p className="mt-2 max-w-lg text-sm text-ink/60">{section.intro}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.products.map((product) => (
                  <PiscinePacProductCard
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
                Dimensionnement chauffage
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Besoin d&apos;une PAC adaptée à votre bassin ?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Nos équipes dimensionnent la pompe à chaleur selon le volume de
                votre piscine, la couverture isothermique et la saison de
                baignade souhaitée.
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
