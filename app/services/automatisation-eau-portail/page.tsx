import type { Metadata } from "next";
import { ServicePageShell } from "@/components/catalog/ServicePageShell";
import { catalog, getByCategory } from "@/content/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Automatisation Eau & Portail — Eauromatic & Key | RIZAL",
  description:
    "Motorisation de portail Key Automation et Eauromatic, régulation et arrosage automatique de l'eau. Installation et SAV à Essaouira par RIZAL.",
  path: "/services/automatisation-eau-portail",
});

const items = getByCategory("automatisation");
const crossSells = ["adoucisseur-villa", "piscine-skimmer-classique", "renovation-villa-complete"]
  .map((id) => catalog.find((c) => c.id === id))
  .filter((x): x is NonNullable<typeof x> => Boolean(x));

const process = [
  {
    title: "Étude sur site",
    text: "Dimensions du portail, type d'ouverture, alimentation électrique et besoins en eau (arrosage, pompe, régulation).",
  },
  {
    title: "Choix Eauromatic & Key",
    text: "Sélection du moteur battant Eauromatic ou coulissant Key adapté au poids et à la fréquence d'usage.",
  },
  {
    title: "Installation",
    text: "Pose des vérins, centrale, photocellules, télécommandes et raccordement réseau d'eau automatisé.",
  },
  {
    title: "Mise en service",
    text: "Réglage des fins de course, tests de sécurité anti-écrasement et programmation des cycles d'eau.",
  },
  {
    title: "SAV & maintenance",
    text: "Contrôle annuel, pièces détachées Eauromatic et Key, intervention rapide à Essaouira.",
  },
];

export default function AutomatisationEauPortailPage() {
  return (
    <ServicePageShell
      eyebrow="Automatisation Eau & Portail"
      title="Eau et accès automatisés pour votre villa."
      intro="RIZAL installe les motorisations Eauromatic et Key pour vos portails, ainsi que les solutions d'automatisation de l'eau : arrosage, régulation de pression et pilotage des pompes. Confort, sécurité et économies d'eau au quotidien."
      heroImage="/img/categories/automatisation-hero.jpg"
      items={items}
      process={process}
      guarantee="Garantie constructeur 2 à 5 ans"
      crossSells={crossSells}
    />
  );
}
