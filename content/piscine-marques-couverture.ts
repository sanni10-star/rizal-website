/** Page catalogue couverture thermique piscine — 5 bâches à bulles. */
export const PISCINE_MARQUES_COUVERTURE_PATH =
  "/services/piscine/marques-couverture" as const;

export type PiscineCouvertureSpec = { label: string; value: string };

export type PiscineCouvertureProduct = {
  id: string;
  catalogId: string;
  name: string;
  series: string;
  summary: string;
  specs: PiscineCouvertureSpec[];
  image: string;
};

export type PiscineCouvertureSection = {
  id: string;
  title: string;
  tagline: string;
  intro: string;
  brandLogo: string;
  accent: string;
  products: PiscineCouvertureProduct[];
};

const COUVERTURE = "/img/piscine/couverture";
const PRODUCTS = `${COUVERTURE}/products`;
const LOGOS = `${COUVERTURE}/logos`;

export const piscineCouvertureSections: PiscineCouvertureSection[] = [
  {
    id: "baches-400",
    title: "Bâches à bulles 400 microns",
    tagline: "Astralpool / Fluidra — 3 finitions",
    intro:
      "Couvertures isothermes 400 µ sur mesure — brut de coupe, bordée 2 côtés ou bordée 4 côtés QUATRO. Réduisent l'évaporation, conservent la chaleur et protègent l'eau des débris.",
    brandLogo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#003DA5",
    products: [
      {
        id: "couverture-non-bordee",
        catalogId: "couverture-non-bordee",
        name: "Bâche à bulles — Non bordée",
        series: "400 µ · Brut de coupe",
        summary:
          "Bâche 400 microns non bordée — découpée aux cotes exactes du bassin, sans œillets ni renforts. Solution économique pour limiter l'évaporation.",
        image: `${PRODUCTS}/non-bordee.jpg`,
        specs: [
          { label: "Épaisseur", value: "400 microns" },
          { label: "Finition", value: "Brut de coupe" },
          { label: "Coloris", value: "Bleu / Bleu" },
          { label: "Enrouleur", value: "Non compatible" },
        ],
      },
      {
        id: "couverture-bordee-2",
        catalogId: "couverture-bordee-2",
        name: "Bâche à bulles — Bordée 2 côtés",
        series: "400 µ · DUO",
        summary:
          "Renfort polyéthylène cousu sur 2 largeurs, œillets tous les 50 cm côté enrouleur. Bâchette de protection et sandows inclus.",
        image: `${PRODUCTS}/bordee-2.jpg`,
        specs: [
          { label: "Épaisseur", value: "400 microns" },
          { label: "Finition", value: "Bordée 2 côtés" },
          { label: "Œillets", value: "Tous les 50 cm" },
          { label: "Gain thermique", value: "+3 à +7 °C" },
        ],
      },
      {
        id: "couverture-bordee-4",
        catalogId: "couverture-bordee-4",
        name: "Bâche à bulles — Bordée 4 côtés",
        series: "400 µ · QUATRO",
        summary:
          "Périmètre entièrement renforcé — ourlet cousu sur 4 côtés, œillets aux angles et côté enrouleur. Durabilité maximale face à l'abrasion.",
        image: `${PRODUCTS}/bordee-4.jpg`,
        specs: [
          { label: "Épaisseur", value: "400 microns" },
          { label: "Finition", value: "Bordée 4 côtés" },
          { label: "Évaporation", value: "Réduite ~90 %" },
          { label: "Fabrication", value: "Sur mesure France" },
        ],
      },
    ],
  },
  {
    id: "geobubble",
    title: "GeoBubble — Technologie brevetée",
    tagline: "Plastipack · Bulles en forme de huit",
    intro:
      "GeoBubble utilise des bulles interconnectées sans point faible — 50 % plus épaisses qu'une bâche classique, durée de vie prolongée de 25 %. Idéal avec PAC Laswim pour conserver la chaleur.",
    brandLogo: `${LOGOS}/logo-geobubble.svg`,
    accent: "#2D6A4F",
    products: [
      {
        id: "couverture-geobubble-400",
        catalogId: "couverture-geobubble-400",
        name: "GeoBubble — 400 microns",
        series: "Sur mesure · Bleu clair",
        summary:
          "Couverture GeoBubble 400 µ — bulles brevetées, résistance UV et chimique accrue. Bon rapport qualité-prix pour villas à Essaouira.",
        image: `${PRODUCTS}/geobubble-400.jpg`,
        specs: [
          { label: "Épaisseur", value: "400 microns" },
          { label: "Technologie", value: "GeoBubble breveté" },
          { label: "Durée de vie", value: "+25 % vs classique" },
          { label: "Évaporation", value: "Réduite 98 %" },
        ],
      },
      {
        id: "couverture-geobubble-500",
        catalogId: "couverture-geobubble-500",
        name: "GeoBubble — 500 microns",
        series: "Premium · Haute résistance",
        summary:
          "GeoBubble 500 µ — épaisseur premium pour piscines chauffées ou à usage intensif. Isolation thermique et résistance à l'usure renforcées.",
        image: `${PRODUCTS}/geobubble-500.jpg`,
        specs: [
          { label: "Épaisseur", value: "500 microns" },
          { label: "Technologie", value: "GeoBubble breveté" },
          { label: "Usage", value: "PAC / fort usage" },
          { label: "Poids", value: "~460 g/m²" },
        ],
      },
    ],
  },
];
