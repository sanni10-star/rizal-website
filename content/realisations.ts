export type Realisation = {
  id: string;
  title: string;
  city: string;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
  gallery?: { src: string; caption: string }[];
  timeline?: { phase: string; label: string; image: string }[];
  stats?: { label: string; value: string }[];
};

const GHAZOUA = "/img/realisations/villa-ghazoua";

export const realisations: Realisation[] = [
  {
    id: "villa-ghazoua-construction",
    title: "Villa Ghazoua — Construction complète",
    city: "Ghazoua, Essaouira",
    category: "Construction Villa",
    image: `${GHAZOUA}/villa-finished-front.png`,
    description:
      "Construction d'une villa moderne de 450 m² avec piscine à débordement, terrasses panoramiques, garde-corps en verre et carrelage grand format. Du gros œuvre à la livraison clé-en-main.",
    featured: true,
    stats: [
      { label: "Surface", value: "450 m²" },
      { label: "Piscine", value: "Débordement" },
      { label: "Étages", value: "R+2 + Toit-terrasse" },
      { label: "Durée", value: "8 mois" },
    ],
    timeline: [
      {
        phase: "01",
        label: "Fondations & Gros œuvre",
        image: `${GHAZOUA}/villa-fondations.png`,
      },
      {
        phase: "02",
        label: "Structure & Piscine",
        image: `${GHAZOUA}/villa-construction-pool.png`,
      },
      {
        phase: "03",
        label: "Menuiserie & Garde-corps",
        image: `${GHAZOUA}/villa-construction-side.png`,
      },
      {
        phase: "04",
        label: "Carrelage & Finitions",
        image: `${GHAZOUA}/villa-carrelage.png`,
      },
      {
        phase: "05",
        label: "Résultat final",
        image: `${GHAZOUA}/villa-finished-front.png`,
      },
    ],
    gallery: [
      { src: `${GHAZOUA}/villa-finished-front.png`, caption: "Façade principale terminée" },
      { src: `${GHAZOUA}/villa-side-palm.png`, caption: "Vue latérale avec palmiers" },
      { src: `${GHAZOUA}/villa-construction-pool.png`, caption: "Piscine en construction" },
      { src: `${GHAZOUA}/villa-carrelage.png`, caption: "Pose du carrelage extérieur" },
      { src: `${GHAZOUA}/villa-fondations.png`, caption: "Gros œuvre et fondations" },
    ],
  },
  {
    id: "villa-diabat-clim-vrf",
    title: "Villa Diabat — Climatisation centralisée VRF",
    city: "Essaouira",
    category: "Climatisation",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    description:
      "Système LG MULTI V 5 — 12 unités intérieures, pilotage centralisé domotique.",
  },
  {
    id: "villa-medina-renovation",
    title: "Villa Medina — Rénovation totale 600 m²",
    city: "Essaouira",
    category: "Rénovation",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    description:
      "Rénovation complète : gros œuvre, climatisation, marbre, domotique KNX. Livrée en 16 semaines.",
  },
  {
    id: "villa-mogador-piscine",
    title: "Villa Mogador — Piscine à débordement",
    city: "Essaouira",
    category: "Piscine",
    image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=1600&q=80",
    description:
      "Piscine à débordement 14×6 m, pierre naturelle Atlas, électrolyse au sel + PAC.",
  },
  {
    id: "riad-medina-clim",
    title: "Riad Medina — Climatisation Multi-Split discrète",
    city: "Essaouira",
    category: "Climatisation",
    image: "/img/realisations/riad-medina-clim-multisplit.jpg",
    description:
      "TRANE Multi-Split 5 unités cassettes encastrées, intégration patrimoniale.",
  },
  {
    id: "villa-ghazoua-solaire",
    title: "Villa Ghazoua — Installation solaire 15 kWc",
    city: "Essaouira",
    category: "Solaire",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
    description:
      "30 panneaux Tier 1 + onduleur triphasé SolaX 15 kW + 15 kWh batteries Dyness.",
  },
  {
    id: "villa-ounagha-eau",
    title: "Villa Ounagha — Traitement d'eau complet",
    city: "Essaouira",
    category: "Traitement d'eau",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80",
    description:
      "Adoucisseur 50 L + osmose villa 500 L/h + UV — eau pure dans toute la villa.",
  },
];
