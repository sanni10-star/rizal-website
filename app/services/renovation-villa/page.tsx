import type { Metadata } from "next";
import { ServicePageShell } from "@/components/catalog/ServicePageShell";
import { catalog, getByCategory } from "@/content/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Construction & Rénovation Villa Essaouira — Clé-en-main",
  description:
    "Construction et rénovation de villa à Essaouira : gros œuvre, climatisation, marbre, domotique. RIZAL, un seul interlocuteur, délais et budget contractualisés.",
  path: "/services/renovation-villa",
  keywords: [
    "construction Essaouira",
    "rénovation villa Essaouira",
    "constructeur Essaouira",
  ],
});

const items = getByCategory("renovation");
const crossSells = [
  "ingelec-cassette-inverter",
  "kit-solaire-villa-10kwc",
  "adoucisseur-villa",
  "piscine-debordement",
]
  .map((id) => catalog.find((c) => c.id === id))
  .filter((x): x is NonNullable<typeof x> => Boolean(x));

const process = [
  { title: "Visite & métré", text: "Visite de votre villa, relevé précis, écoute de votre vision." },
  { title: "Plans & devis ferme", text: "Plans 3D, sélection des matériaux, devis ferme et planning contractualisé." },
  { title: "Démolition & gros œuvre", text: "Démolition propre, reprise structure, électricité, plomberie aux normes NM." },
  { title: "Finitions premium", text: "Marbre, tadelakt, zellige, menuiserie, peinture décorative — savoir-faire marocain." },
  { title: "Votre villa de rêve, livrée", text: "Réception clé-en-main avec procès-verbal signé. Garantie décennale gros œuvre + biennale finitions. Votre villa prête à vivre — exactement comme vous l'avez imaginée." },
];

export default function RenovationPage() {
  return (
    <ServicePageShell
      eyebrow="Rénovation de Villa"
      title="Construction & rénovation de villa à Essaouira — sans surprise."
      intro="Un seul interlocuteur RIZAL coordonne tous les corps de métier à Essaouira et région : gros œuvre, électricité, plomberie, climatisation, marbre, domotique. Délais et budget contractualisés, garantie décennale."
      heroImage="/img/realisations/villa-ghazoua/villa-hero-enhanced.jpg"
      items={items}
      process={process}
      crossSells={crossSells}
    />
  );
}
