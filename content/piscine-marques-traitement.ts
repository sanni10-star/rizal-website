/** Page catalogue traitement piscine — 8 produits chimiques. */
export const PISCINE_MARQUES_TRAITEMENT_PATH =
  "/services/piscine/marques-traitement" as const;

export type PiscineTraitementSpec = { label: string; value: string };

export type PiscineTraitementProduct = {
  id: string;
  catalogId: string;
  name: string;
  series: string;
  summary: string;
  specs: PiscineTraitementSpec[];
  image: string;
};

export type PiscineTraitementSection = {
  id: string;
  title: string;
  tagline: string;
  intro: string;
  brandLogo: string;
  accent: string;
  products: PiscineTraitementProduct[];
};

const TRAITEMENT = "/img/piscine/traitement";
const PRODUCTS = `${TRAITEMENT}/products`;
const LOGOS = `${TRAITEMENT}/logos`;

export const piscineTraitementSections: PiscineTraitementSection[] = [
  {
    id: "chloration",
    title: "Chloration",
    tagline: "Désinfection & chlore actif",
    intro:
      "Chlore poudre Astralpool et RIZAL, pastilles et chlore choc — désinfection quotidienne et traitements de choc pour une eau saine toute la saison.",
    brandLogo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#003DA5",
    products: [
      {
        id: "traitement-chlore-poudre-astral",
        catalogId: "traitement-chlore-poudre-astral",
        name: "Chlore poudre — Astralpool",
        series: "5 kg · Trichlor 90%",
        summary:
          "Chlore en poudre Astralpool — trichlor stabilisé, dissolution lente, 3 à 4 g/m³/jour pour désinfection continue.",
        image: `${PRODUCTS}/chlore-poudre-astral.jpg`,
        specs: [
          { label: "Marque", value: "Astralpool" },
          { label: "Format", value: "Poudre 5 kg" },
          { label: "Chlore actif", value: "90%" },
          { label: "Dosage", value: "3 – 4 g/m³/jour" },
        ],
      },
      {
        id: "traitement-chlore-poudre-rizal",
        catalogId: "traitement-chlore-poudre-rizal",
        name: "Chlore poudre — RIZAL",
        series: "5 kg · Qualité pro",
        summary:
          "Chlore en poudre RIZAL — désinfection quotidienne, excellent rapport qualité-prix pour piscines au Maroc.",
        image: `${PRODUCTS}/chlore-poudre-rizal.jpg`,
        specs: [
          { label: "Marque", value: "RIZAL" },
          { label: "Format", value: "Poudre 5 kg" },
          { label: "Usage", value: "Entretien quotidien" },
          { label: "pH cible", value: "7,2 – 7,6" },
        ],
      },
      {
        id: "traitement-chlore-pastille",
        catalogId: "traitement-chlore-pastille",
        name: "Chlore pastille — Astralpool",
        series: "Galets 200 g · 5 kg",
        summary:
          "Chlore en galets Astralpool — pastilles 200 g à dissolution lente pour skimmer ou doseur flottant.",
        image: `${PRODUCTS}/chlore-pastille.jpg`,
        specs: [
          { label: "Marque", value: "Astralpool" },
          { label: "Format", value: "Galets 200 g" },
          { label: "Chlore actif", value: "90%" },
          { label: "Application", value: "Skimmer / doseur" },
        ],
      },
      {
        id: "traitement-chlore-choc",
        catalogId: "traitement-chlore-choc",
        name: "Chlore choc — Granulé",
        series: "V60 · 5 kg",
        summary:
          "Chlore choc granulé — dissolution rapide, traitement choc 150 g/10 m³ pour eau verte ou trouble.",
        image: `${PRODUCTS}/chlore-choc.jpg`,
        specs: [
          { label: "Type", value: "Granulé rapide" },
          { label: "Format", value: "5 kg" },
          { label: "Choc", value: "150 g / 10 m³" },
          { label: "Usage", value: "Eau trouble / algues" },
        ],
      },
    ],
  },
  {
    id: "equilibre",
    title: "Équilibre & entretien",
    tagline: "pH, algues, floculation & calcaire",
    intro:
      "Anti-algues, floculant, anti-calcaire et pH− — l'essentiel pour maintenir une eau équilibrée, cristalline et confortable à Essaouira.",
    brandLogo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#0077B6",
    products: [
      {
        id: "traitement-anti-algue",
        catalogId: "traitement-anti-algue",
        name: "Anti-algue — Astralpool",
        series: "5 L · Double action",
        summary:
          "Anti-algues Astralpool — prévention et élimination des algues, action floculante, 1 L/100 m³ initial.",
        image: `${PRODUCTS}/anti-algue.jpg`,
        specs: [
          { label: "Marque", value: "Astralpool" },
          { label: "Format", value: "Liquide 5 L" },
          { label: "Dosage", value: "1 L / 100 m³" },
          { label: "Action", value: "Algicide + floculant" },
        ],
      },
      {
        id: "traitement-floculant",
        catalogId: "traitement-floculant",
        name: "Floculant — Liquide",
        series: "5 L · Clarification",
        summary:
          "Floculant liquide — élimine l'eau trouble, 10 ml/m³ récupération ou 0,5 ml/m³ entretien.",
        image: `${PRODUCTS}/floculant.jpg`,
        specs: [
          { label: "Type", value: "Floculant liquide" },
          { label: "Format", value: "5 L" },
          { label: "Récupération", value: "10 ml / m³" },
          { label: "Entretien", value: "0,5 ml / m³" },
        ],
      },
      {
        id: "traitement-anti-calcaire",
        catalogId: "traitement-anti-calcaire",
        name: "Anti-calcaire — Détartrant",
        series: "5 L · Séquestrant",
        summary:
          "Anti-calcaire / détartrant — prévient les dépôts sur liner et équipements, idéal eau dure.",
        image: `${PRODUCTS}/anti-calcaire.jpg`,
        specs: [
          { label: "Type", value: "Séquestrant calcaire" },
          { label: "Format", value: "Liquide 5 L" },
          { label: "Usage", value: "Prévention dépôts" },
          { label: "Eau", value: "Dure / Essaouira" },
        ],
      },
      {
        id: "traitement-ph-moins",
        catalogId: "traitement-ph-moins",
        name: "pH− — Poudre",
        series: "5 kg · Correcteur",
        summary:
          "pH Minus poudre — abaisse le pH entre 7,2 et 7,6. 150 g/10 m³ pour −0,2 unité.",
        image: `${PRODUCTS}/ph-moins.jpg`,
        specs: [
          { label: "Type", value: "Réducteur de pH" },
          { label: "Format", value: "Poudre 5 kg" },
          { label: "Dosage", value: "150 g / 10 m³" },
          { label: "pH cible", value: "7,2 – 7,6" },
        ],
      },
    ],
  },
];
