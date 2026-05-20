import type { Metadata } from "next";
import { ServicePageShell } from "@/components/catalog/ServicePageShell";
import { catalog, getByCategory } from "@/content/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Traitement d'Eau Villa Maroc — Adoucisseurs, Osmose, UV",
  description:
    "RIZAL installe vos systèmes de traitement d'eau : adoucisseur anti-calcaire, osmose inverse, stérilisation UV. Eau pure dans toute la villa.",
  path: "/services/traitement-eau",
});

const items = getByCategory("traitement-eau");
const crossSells = [
  "kit-solaire-villa-10kwc",
  "renovation-villa-complete",
  "ingelec-cassette-inverter",
]
  .map((id) => catalog.find((c) => c.id === id))
  .filter((x): x is NonNullable<typeof x> => Boolean(x));

const process = [
  { title: "Analyse de l'eau", text: "Prélèvement et analyse en laboratoire (dureté, fer, bactéries, nitrates)." },
  { title: "Étude personnalisée", text: "Solution sur-mesure adaptée à votre eau, votre villa et votre budget." },
  { title: "Installation experte", text: "Pose discrète au point d'entrée d'eau, sous-évier ou en local technique." },
  { title: "Mise en service", text: "Réglages, contrôles qualité, formation à l'usage et au remplacement des filtres." },
  { title: "Maintenance annuelle", text: "Contrats de maintenance disponibles : changement filtres, contrôles annuels." },
];

export default function TraitementEauPage() {
  return (
    <ServicePageShell
      eyebrow="Traitement d'Eau"
      title="Une eau pure dans toute votre villa."
      intro="L'eau du Maroc est calcaire, parfois minérale, parfois bactériologiquement instable. RIZAL installe des solutions complètes : adoucisseurs, osmoseurs, stérilisation UV — pour la santé de votre famille et la durabilité de vos équipements."
      heroImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=2400&q=85"
      items={items}
      process={process}
      guarantee="Garantie 2 à 5 ans selon équipement"
      crossSells={crossSells}
    />
  );
}
