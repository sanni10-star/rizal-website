/** Traitement piscine — slider 8 produits chimiques. */
export type PiscineTraitementProduit = {
  id: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  phaseLabel: string;
  productImage: string;
  productImageAlt: string;
  logo: string;
  accent: string;
  accentLight: string;
  bgGradient: string;
};

const TRAITEMENT = "/img/piscine/traitement";
const PRODUCTS = `${TRAITEMENT}/products`;
const LOGOS = `${TRAITEMENT}/logos`;

export const piscineTraitementProduits: PiscineTraitementProduit[] = [
  {
    id: "chlore-poudre-astral",
    name: "Chlore poudre",
    series: "Astralpool — 5 kg",
    tagline: "Trichlor 90% · Dissolution lente",
    description:
      "Chlore en poudre Astralpool — trichlor stabilisé 90% chlore actif, dissolution lente pour traitement continu. 3 à 4 g/m³/jour dans le skimmer.",
    phaseLabel: "Désinfection",
    productImage: `${PRODUCTS}/chlore-poudre-astral.jpg`,
    productImageAlt: "Chlore poudre Astralpool 5 kg — traitement piscine",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#003DA5",
    accentLight: "#E8F0FA",
    bgGradient: "linear-gradient(145deg, #002855 0%, #00408a 45%, #001a3d 100%)",
  },
  {
    id: "chlore-poudre-rizal",
    name: "Chlore poudre",
    series: "RIZAL — 5 kg",
    tagline: "Qualité pro · Rapport prix",
    description:
      "Chlore en poudre RIZAL — désinfection quotidienne pour piscines résidentielles au Maroc. Dosage simple, compatible tous revêtements.",
    phaseLabel: "Désinfection",
    productImage: `${PRODUCTS}/chlore-poudre-rizal.jpg`,
    productImageAlt: "Chlore poudre RIZAL 5 kg — traitement piscine Essaouira",
    logo: `${LOGOS}/logo-rizal.svg`,
    accent: "#E85D04",
    accentLight: "#FEF3E8",
    bgGradient: "linear-gradient(145deg, #7a3500 0%, #e85d04 45%, #5c2800 100%)",
  },
  {
    id: "chlore-pastille",
    name: "Chlore pastille",
    series: "Astralpool — 200 g",
    tagline: "Galets · Skimmer ou doseur",
    description:
      "Chlore en galets Astralpool — pastilles 200 g à dissolution lente, 90% chlore utile. À placer dans le skimmer ou doseur flottant.",
    phaseLabel: "Entretien",
    productImage: `${PRODUCTS}/chlore-pastille.jpg`,
    productImageAlt: "Chlore pastille Astralpool — galets 200 g piscine",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#003DA5",
    accentLight: "#E8F0FA",
    bgGradient: "linear-gradient(145deg, #002855 0%, #00408a 45%, #001a3d 100%)",
  },
  {
    id: "chlore-choc",
    name: "Chlore choc",
    series: "Granulé V60 — 5 kg",
    tagline: "Dissolution rapide · Traitement choc",
    description:
      "Chlore choc granulé — dissolution rapide pour remonter le taux de chlore, éliminer algues et eau trouble. 150 g/10 m³ en traitement choc.",
    phaseLabel: "Choc",
    productImage: `${PRODUCTS}/chlore-choc.jpg`,
    productImageAlt: "Chlore choc granulé V60 — traitement choc piscine",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#1A6B3C",
    accentLight: "#E8F5EE",
    bgGradient: "linear-gradient(145deg, #0d3d22 0%, #1a6b3c 45%, #082818 100%)",
  },
  {
    id: "anti-algue",
    name: "Anti-algue",
    series: "Astralpool — 5 L",
    tagline: "Prévention · Action floculante",
    description:
      "Anti-algues Astralpool — prévention et élimination des algues, action floculante intégrée. 1 L/100 m³ en traitement initial.",
    phaseLabel: "Algicide",
    productImage: `${PRODUCTS}/anti-algue.jpg`,
    productImageAlt: "Anti-algues Astralpool 5 L — traitement piscine",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#0077B6",
    accentLight: "#E6F4FA",
    bgGradient: "linear-gradient(145deg, #003d5c 0%, #0077b6 45%, #002a40 100%)",
  },
  {
    id: "floculant",
    name: "Floculant",
    series: "Liquide — 5 L",
    tagline: "Eau cristalline · Turbidité",
    description:
      "Floculant liquide — élimine les particules responsables de l'eau trouble. 10 ml/m³ en traitement récupération, 0,5 ml/m³ en entretien.",
    phaseLabel: "Clarification",
    productImage: `${PRODUCTS}/floculant.jpg`,
    productImageAlt: "Floculant liquide 5 L — eau piscine cristalline",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#4A5568",
    accentLight: "#EDF2F7",
    bgGradient: "linear-gradient(145deg, #2d3748 0%, #4a5568 45%, #1a202c 100%)",
  },
  {
    id: "anti-calcaire",
    name: "Anti-calcaire",
    series: "Détartrant — 5 L",
    tagline: "Séquestrant · Prévention dépôts",
    description:
      "Anti-calcaire / détartrant — prévient les dépôts calcaires sur liner et équipements. Indispensable pour l'eau dure d'Essaouira.",
    phaseLabel: "Anti-calcaire",
    productImage: `${PRODUCTS}/anti-calcaire.jpg`,
    productImageAlt: "Anti-calcaire détartrant 5 L — traitement piscine",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#6B4E9B",
    accentLight: "#F0EBF8",
    bgGradient: "linear-gradient(145deg, #3d2d5c 0%, #6b4e9b 45%, #2a1f40 100%)",
  },
  {
    id: "ph-moins",
    name: "pH−",
    series: "Poudre — 5 kg",
    tagline: "Correcteur pH · 7,2 – 7,6",
    description:
      "pH Minus poudre — abaisse le pH de l'eau de piscine. 150 g/10 m³ pour baisser de 0,2 unité. Compatible tous traitements.",
    phaseLabel: "Équilibre pH",
    productImage: `${PRODUCTS}/ph-moins.jpg`,
    productImageAlt: "pH Minus poudre 5 kg — équilibre eau piscine",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#C53030",
    accentLight: "#FDE8E8",
    bgGradient: "linear-gradient(145deg, #5c1010 0%, #c53030 45%, #3d0a0a 100%)",
  },
];
