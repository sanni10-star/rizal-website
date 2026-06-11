import type { Metadata } from "next";
import { ServicePageShell } from "@/components/catalog/ServicePageShell";
import { catalog, getByCategory } from "@/content/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Chauffe-eau Électrique — Megalife | RIZAL",
  description:
    "Chauffe-eau électriques Megalife pour villa à Essaouira : Slim Silver, Smart Square, Blanc ELCB, Mini Eco, horizontal, déco et instantané Flashheat. Vente, pose et SAV par RIZAL.",
  path: "/services/chauffe-eau-electrique",
});

const items = getByCategory("chauffe-eau");
const crossSells = ["adoucisseur-villa", "pomp-ecwat-surpresseur", "renovation-villa-complete"]
  .map((id) => catalog.find((c) => c.id === id))
  .filter((x): x is NonNullable<typeof x> => Boolean(x));

const process = [
  {
    title: "Étude des besoins",
    text: "Analyse du nombre de points d'eau, habitudes de consommation et emplacement disponible dans votre villa.",
  },
  {
    title: "Dimensionnement",
    text: "Choix de la gamme Megalife et de la capacité adaptée — vertical, horizontal ou instantané selon l'usage.",
  },
  {
    title: "Installation",
    text: "Pose murale ou au sol, raccordement hydraulique et électrique, mise en place du disjoncteur ELCB si requis.",
  },
  {
    title: "Mise en service",
    text: "Remplissage, test d'étanchéité, réglage de la température et configuration Wi-Fi sur les modèles connectés.",
  },
  {
    title: "SAV & garantie",
    text: "Garantie constructeur Megalife 12 mois — intervention RIZAL à Essaouira et région.",
  },
];

export default function ChauffeEauElectriquePage() {
  return (
    <ServicePageShell
      eyebrow="Chauffe-eau Électrique"
      title="Eau chaude sanitaire fiable pour votre villa."
      intro="RIZAL distribue et installe la gamme complète de chauffe-eau électriques Megalife : cumulus slim Wi-Fi, modèles carrés Smart Square, blancs avec protection ELCB, mini format sous évier, version horizontale pour combles, déco design et chauffe-eau instantané Flashheat. Une seule équipe pour choisir, poser et régler votre production d'eau chaude."
      heroImage="/img/categories/chauffe-eau-hero.jpg"
      items={items}
      process={process}
      guarantee="Garantie constructeur Megalife 12 mois"
      crossSells={crossSells}
    />
  );
}
