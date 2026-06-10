import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock3, ShieldCheck, Waves } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PiscinePompesRubrique } from "@/components/piscine/PiscinePompesRubrique";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { catalog, getByCategory } from "@/content/catalog";
import { whatsappContactUrl, whatsappLinkForItem } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Piscine Essaouira — Construction & Équipements",
  description:
    "Construction de piscine à Essaouira : skimmer, débordement, couloir de nage. Pompes Astralpool & Waterpool, garantie décennale. Devis gratuit RIZAL.",
  path: "/services/piscine",
  keywords: [
    "piscine Essaouira",
    "construction piscine Essaouira",
    "pompe piscine Essaouira",
    "Astralpool Essaouira",
  ],
});

const piscineConstruction = getByCategory("piscine").filter(
  (i) =>
    !i.id.startsWith("pompe-") &&
    !i.id.startsWith("astralpool-") &&
    !i.id.startsWith("waterpool-"),
);

const accessoires = ["electrolyseur-sel", "pac-piscine", "eclairage-led-rgb"]
  .map((id) => catalog.find((c) => c.id === id))
  .filter((x): x is NonNullable<typeof x> => Boolean(x));

const process = [
  {
    title: "Étude & devis",
    text: "Visite sur site, étude de sol, plans 3D et devis détaillé sous 7 jours.",
  },
  {
    title: "Terrassement",
    text: "Préparation du terrain, découpe et excavation aux dimensions validées.",
  },
  {
    title: "Structure béton armé",
    text: "Coulage de la coque monobloc avec ferraillage et bonde de fond.",
  },
  {
    title: "Étanchéité & revêtement",
    text: "Liner armé 150/100, polyester ou pierre/mosaïque selon votre choix.",
  },
  {
    title: "Mise en eau & livraison",
    text: "Filtration, traitement, équipements, formation à l'usage et livraison clé-en-main.",
  },
];

export default function PiscinePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-ink pt-28 pb-20 text-bone">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/img/products/piscine/construction/piscine-debordement.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink/60 to-ink" />
        <Container className="relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Piscine & Villa
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            Piscine à Essaouira — des bassins dignes de vos plus belles villas.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-bone/80 md:text-lg">
            De la première étude à la première baignade, RIZAL construit votre
            piscine à Essaouira : gros œuvre, équipements, pompes de marque et
            accessoires. Délais 8 à 16 semaines, garantie décennale.
          </p>

          <div className="mt-8 inline-flex flex-wrap gap-3">
            <a
              href={whatsappContactUrl("expert")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-brand/20 hover:bg-brand-600"
            >
              Demander une étude gratuite
            </a>
            <Link
              href="/realisations"
              className="inline-flex h-12 items-center rounded-full border border-bone/30 bg-bone/5 px-6 text-sm font-semibold text-bone backdrop-blur hover:bg-bone/10"
            >
              Voir nos réalisations
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-6">
            <div className="inline-flex items-center gap-2 text-sm text-bone/80">
              <Clock3 className="h-4 w-4 text-sand-400" /> Délais respectés
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-bone/80">
              <ShieldCheck className="h-4 w-4 text-sand-400" /> Garantie
              décennale
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-bone/80">
              <Waves className="h-4 w-4 text-sand-400" /> Astralpool &
              Waterpool
            </div>
          </div>
        </Container>
      </section>

      {/* ─── POMPES — TOP (Brand Rubriques) ─── */}
      <section className="bg-bone py-16 md:py-20">
        <Container>
          <SectionTitle
            eyebrow="Équipements Piscine"
            title="Pompes & filtration pour piscine à Essaouira"
            description="Pompes, filtres et accessoires Astralpool et Waterpool disponibles à Essaouira pour votre bassin."
          />
          <PiscinePompesRubrique />
        </Container>
      </section>

      {/* ─── CONSTRUCTION — Choisissez votre piscine ─── */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionTitle
            eyebrow="Construction sur-mesure"
            title="Choisissez votre piscine"
            description="5 styles de piscines de prestige, construites en béton armé monobloc avec garantie décennale."
          />
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {piscineConstruction.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="grid grid-cols-1 gap-6 rounded-3xl border border-ink/5 bg-bone p-6 sm:grid-cols-5"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink/5 sm:col-span-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  {item.badge ? (
                    <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-sand-300">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col sm:col-span-3">
                  <h3 className="font-display text-2xl text-ink">
                    {item.name}
                  </h3>
                  {item.gammeLabel ? (
                    <p className="mt-1 text-xs uppercase tracking-widest2 text-sand-600">
                      {item.gammeLabel}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm text-ink/75">
                    {item.longDescFr ?? item.shortDescFr}
                  </p>
                  {item.highlights && item.highlights.length > 0 ? (
                    <ul className="mt-3 space-y-1.5">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-ink/80"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <AddToCartButton
                      itemId={item.id}
                      className="h-11 px-5 text-sm"
                    />
                    <a
                      href={whatsappLinkForItem(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center rounded-full bg-wa px-5 text-sm font-semibold text-white hover:bg-emerald-600"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="bg-bone py-16 md:py-20">
        <Container>
          <SectionTitle
            eyebrow="Processus"
            title="Comment nous construisons votre piscine"
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {process.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white p-5">
                <p className="mb-2 font-display text-3xl text-sand-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display text-lg text-ink">{s.title}</p>
                <p className="mt-1.5 text-sm text-ink/60">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── ACCESSORIES — Cross-sell ─── */}
      {accessoires.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <Container>
            <SectionTitle
              eyebrow="Accessoires"
              title="Complétez votre piscine"
              description="Traitement de l'eau, chauffage et éclairage pour profiter pleinement de votre bassin."
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {accessoires.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-ink/5 bg-bone transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-widest2 text-sand-600">
                      {item.gammeLabel}
                    </p>
                    <p className="mt-2 text-sm text-ink/70 line-clamp-2">
                      {item.shortDescFr}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <AddToCartButton
                        itemId={item.id}
                        className="h-10 px-4 text-xs"
                      />
                      <a
                        href={whatsappLinkForItem(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center rounded-full bg-wa px-4 text-xs font-semibold text-white hover:bg-emerald-600"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
