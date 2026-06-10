import type { Metadata } from "next";
import { Sun, Battery, Plug } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GammeCard } from "@/components/catalog/GammeCard";
import { SolairePanneauxRubrique } from "@/components/solaire/SolairePanneauxRubrique";
import { SolaireOnduloursRubrique } from "@/components/solaire/SolaireOnduloursRubrique";
import { SolaireBatteriesRubrique } from "@/components/solaire/SolaireBatteriesRubrique";
import { solaireItems } from "@/content/catalog";
import type { CatalogItem } from "@/types/catalog";
import { gammeHref } from "@/lib/links";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Panneau Solaire Essaouira — Kits Photovoltaïques Premium",
  description:
    "Panneau solaire à Essaouira : modules Tier 1, onduleurs SolaX / Solis / Deye, batteries LiFePO4. Étude gratuite et installation certifiée par RIZAL.",
  path: "/energie-solaire",
  keywords: [
    "panneau solaire Essaouira",
    "photovoltaïque Essaouira",
    "kit solaire Essaouira",
    "batterie solaire Essaouira",
  ],
});

const benefits = [
  { icon: Sun, title: "Panneaux Tier 1", text: "Modules haut rendement sélectionnés sur devis et étude toiture." },
  { icon: Plug, title: "Onduleurs Hybrides", text: "SolaX, Solis, Deye — monophasé et triphasé, monitoring app." },
  { icon: Battery, title: "Batteries LiFePO4", text: "Dyness, MUST, Elitec — 6 000+ cycles, empilables, garantie longue." },
];

function isPanneauItem(item: CatalogItem) {
  return item.id.startsWith("panneau-");
}

const EXCLUDED_PANNEAU_IDS = new Set(["panneau-jinko-tiger-neo", "panneau-longi-himo-6"]);

export default function SolairePage() {
  const panneauItems = solaireItems
    .filter(isPanneauItem)
    .filter((i) => !EXCLUDED_PANNEAU_IDS.has(i.id));

  return (
    <>
      <section className="bg-ink pt-28 pb-20 text-bone">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Énergie Solaire — Villa Autonome
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            Panneau solaire à Essaouira — votre villa alimentée par le soleil.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-bone/75 md:text-lg">
            RIZAL conçoit, installe et garantit des panneaux solaires à
            Essaouira : modules Tier 1, onduleurs hybrides SolaX / Solis / Deye,
            batteries LiFePO4 Dyness / MUST / Elitec. Autonomie quasi-totale en
            autoconsommation.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-bone/10 bg-bone/5 p-5 backdrop-blur"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sand-400/15 text-sand-300">
                  <b.icon className="h-5 w-5" />
                </div>
                <p className="font-display text-lg text-bone">{b.title}</p>
                <p className="mt-1 text-xs text-bone/65">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionTitle
            eyebrow="Catalogue Solaire"
            title="Panneau solaire, onduleurs & batteries à Essaouira"
            description="Tous les composants RIZAL pour bâtir votre installation photovoltaïque à Essaouira et dans la région."
          />

          <div className="mt-12 border-b border-ink/8 pb-12">
            <h2 className="font-display text-2xl text-ink md:text-3xl">Panneaux photovoltaïques</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink/70">
              Modules Tier 1 proposés selon votre projet — rendement élevé et garanties constructeur sur devis.
            </p>

            <SolairePanneauxRubrique />

            {panneauItems.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {panneauItems.map((item) => (
                  <GammeCard key={item.id} item={item} href={gammeHref(item)} />
                ))}
              </div>
            ) : null}

          </div>

          <div className="mt-14 border-b border-ink/8 pb-12">
            <h2 className="font-display text-2xl text-ink md:text-3xl">Onduleurs hybrides</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink/70">
              SolaX, Solis, Deye — monophasé et triphasé, compatibles batteries lithium.
            </p>
            <SolaireOnduloursRubrique />
          </div>

          <div className="mt-14">
            <h2 className="font-display text-2xl text-ink md:text-3xl">Batteries LiFePO4</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink/70">
              Dyness, MUST, Elitec — stockage lithium de 5 à 15 kWh, empilable.
            </p>
            <SolaireBatteriesRubrique />
          </div>
        </Container>
      </section>
    </>
  );
}
