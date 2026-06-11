import type { Metadata } from "next";
import { ServicePageShell } from "@/components/catalog/ServicePageShell";
import { catalog, getByCategory } from "@/content/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sécurité Villa — Alarme, Incendie & Caméras | RIZAL",
  description:
    "Systèmes de sécurité pour villa à Essaouira : alarme intrusion Hikvision AX PRO, détecteurs incendie, caméras Hikvision ColorVu et Imou. Installation et paramétrage par RIZAL.",
  path: "/services/securite",
});

const items = getByCategory("securite");
const crossSells = ["auto-key-coulissant", "renovation-villa-complete", "adoucisseur-villa"]
  .map((id) => catalog.find((c) => c.id === id))
  .filter((x): x is NonNullable<typeof x> => Boolean(x));

const process = [
  {
    title: "Audit sécurité",
    text: "Analyse des accès, points faibles, besoins alarme, incendie et vidéo pour votre villa.",
  },
  {
    title: "Conception Hikvision & Imou",
    text: "Choix de la centrale AX PRO, détecteurs, caméras ColorVu et Imou selon votre budget et vos usages.",
  },
  {
    title: "Installation",
    text: "Pose des détecteurs, caméras, câblage PoE ou Wi-Fi, sirènes et centrale — finitions propres.",
  },
  {
    title: "Paramétrage & apps",
    text: "Configuration Hik-Connect et Imou Life, notifications smartphone, zones et scénarios d'armement.",
  },
  {
    title: "SAV & maintenance",
    text: "Contrôle annuel, mise à jour firmware, extension du système — intervention RIZAL à Essaouira.",
  },
];

export default function SecuritePage() {
  return (
    <ServicePageShell
      eyebrow="Sécurité Villa"
      title="Alarme, incendie et vidéo pour protéger votre villa."
      intro="RIZAL installe des solutions de sécurité complètes pour les villas au Maroc : alarme intrusion sans fil Hikvision AX PRO, détection incendie et caméras connectées Hikvision ColorVu et Imou. Une seule équipe pour sécuriser accès, détecter les risques et surveiller votre propriété depuis votre smartphone."
      heroImage="/img/categories/securite-hero.jpg"
      items={items}
      process={process}
      guarantee="Garantie constructeur 2 à 3 ans"
      crossSells={crossSells}
    />
  );
}
