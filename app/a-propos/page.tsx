import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { Award, Clock3, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "À propos de RIZAL — N°1 au Maroc",
  description:
    "RIZAL — Luxury Home & Hardware Solutions. Notre histoire, nos valeurs, notre engagement pour les villas marocaines de prestige.",
  path: "/a-propos",
});

const values = [
  { icon: Award, title: "Excellence", text: "Marques officielles, installation certifiée, finitions irréprochables." },
  { icon: Clock3, title: "Engagement", text: "Délais et budget contractualisés dès la signature — sans surprise." },
  { icon: ShieldCheck, title: "Garantie", text: "Décennale gros œuvre, biennale finitions, garantie constructeur respectée." },
  { icon: Sparkles, title: "Service", text: "Conseillers experts WhatsApp 7j/7, intervention prioritaire pour nos clients." },
];

export default function AProposPage() {
  return (
    <>
      <section className="bg-ink pt-28 pb-20 text-bone">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            À Propos
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            La référence des villas marocaines.
          </h1>
          <p className="mt-5 max-w-3xl text-base text-bone/75 md:text-lg">
            RIZAL réunit sous une signature unique les expertises les plus
            exigeantes de l&apos;habitat de prestige : climatisation premium,
            énergie solaire, piscines, rénovation totale et traitement
            d&apos;eau. Une approche, un standard : N°1 au Maroc.
          </p>
        </Container>
      </section>

      <section className="bg-bone py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionTitle eyebrow="Notre Mission" title="Élever le standard du luxe résidentiel marocain." />
              <div className="mt-5 space-y-4 text-base text-ink/75">
                <p>
                  Nous croyons que les propriétaires de villa au Maroc méritent
                  une expérience à la hauteur de leurs attentes : produits
                  authentiques de marques mondiales, équipes formées,
                  engagements écrits, respect absolu des délais.
                </p>
                <p>
                  RIZAL distribue officiellement MEGALIFE, INGELEC, LG et
                  TRANE pour la climatisation, sélectionne les meilleurs
                  fabricants Tier 1 pour le solaire (Jinko, LONGi, Canadian
                  Solar, Huawei, Pylontech), et coordonne sous un seul
                  interlocuteur les chantiers de piscine, rénovation et
                  traitement d&apos;eau.
                </p>
                <p>
                  Notre conviction : la confiance se gagne par la livraison.
                  Chaque projet RIZAL est livré dans les délais convenus, avec
                  les garanties écrites, et un service après-vente accessible
                  en un message WhatsApp.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink/10">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
                alt="Villa contemporaine équipée par RIZAL"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionTitle
            eyebrow="Nos Valeurs"
            title="Quatre engagements qui ne se négocient pas."
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-ink/5 bg-bone p-7"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sand-400/15 text-sand-700">
                  <v.icon className="h-5 w-5" />
                </div>
                <p className="font-display text-xl text-ink">{v.title}</p>
                <p className="mt-1.5 text-sm text-ink/60">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-16 text-bone md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { kpi: "5", label: "Villes couvertes" },
              { kpi: "4", label: "Marques officielles HVAC" },
              { kpi: "10 ans", label: "Garantie compresseur LG" },
              { kpi: "25 ans", label: "Garantie production solaire" },
            ].map((k) => (
              <div key={k.label}>
                <p className="font-display text-5xl text-sand-400 md:text-6xl">
                  {k.kpi}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest2 text-bone/65">
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
