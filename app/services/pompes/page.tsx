import type { Metadata } from "next";
import { ServicePageShell } from "@/components/catalog/ServicePageShell";
import { catalog, getByCategory } from "@/content/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pompes Villa — Immergées & Surpresseurs | RIZAL",
  description:
    "Pompes pour villa à Essaouira : pompes immergées Deversopompes pour forage et puits, surpresseurs Ecwat multicellulaires. Dimensionnement et installation par RIZAL.",
  path: "/services/pompes",
});

const items = getByCategory("pompes");
const crossSells = ["adoucisseur-villa", "auto-euromatic-techno", "renovation-villa-complete"]
  .map((id) => catalog.find((c) => c.id === id))
  .filter((x): x is NonNullable<typeof x> => Boolean(x));

const process = [
  {
    title: "Étude hydraulique",
    text: "Analyse du forage, débit, hauteur manométrique et besoins en pression de votre villa.",
  },
  {
    title: "Dimensionnement",
    text: "Choix de la pompe immergée Deversopompes et du surpresseur Ecwat adaptés à votre installation.",
  },
  {
    title: "Installation",
    text: "Pose de la pompe immergée, raccordement électrique, groupe de surpression et protections.",
  },
  {
    title: "Mise en service",
    text: "Réglage de la pression, test de débit, vérification étanchéité et formation à l'utilisation.",
  },
  {
    title: "SAV & maintenance",
    text: "Contrôle annuel, remplacement joints et accessoires — intervention RIZAL à Essaouira.",
  },
];

export default function PompesPage() {
  return (
    <ServicePageShell
      eyebrow="Pompes Villa"
      title="Captage, surpression et alimentation en eau pour votre villa."
      intro="RIZAL installe des solutions de pompage complètes pour les villas au Maroc : pompes immergées Deversopompes pour forage et puits, surpresseurs Ecwat pour une pression constante dans toute la maison. Une seule équipe pour dimensionner, poser et régler votre installation hydraulique."
      heroImage="/img/categories/pompes-hero.jpg"
      items={items}
      process={process}
      guarantee="Garantie constructeur 2 ans"
      crossSells={crossSells}
    />
  );
}
