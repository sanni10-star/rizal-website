/** Page catalogue pompes à chaleur piscine — Laswim 9 à 40 kW. */
export const PISCINE_MARQUES_PAC_PATH =
  "/services/piscine/marques-pac" as const;

export type PiscinePacSpec = { label: string; value: string };

export type PiscinePacProduct = {
  id: string;
  catalogId: string;
  name: string;
  series: string;
  summary: string;
  specs: PiscinePacSpec[];
  image: string;
  imageInstall: string;
  imageInstallAlt: string;
};

export type PiscinePacMarqueSection = {
  id: string;
  title: string;
  tagline: string;
  intro: string;
  brandLogo: string;
  accent: string;
  products: PiscinePacProduct[];
};

const PAC = "/img/piscine/pac";
const PRODUCTS = `${PAC}/products`;
const INSTALL = `${PAC}/install`;
const LOGOS = `${PAC}/logos`;

export const piscinePacMarqueSections: PiscinePacMarqueSection[] = [
  {
    id: "laswim",
    title: "Laswim",
    tagline: "Pompes à chaleur piscine — 9 à 40 kW",
    intro:
      "Pompes à chaleur Laswim — fabricant chinois de référence depuis 1989. Série FIQ Inverter pour villas (9–24 kW) et V-Type commercial pour grands bassins (30–40 kW). Réfrigérant R32, échangeur titane, Wi-Fi intégré.",
    brandLogo: `${LOGOS}/logo-laswim.svg`,
    accent: "#1B4F8A",
    products: [
      {
        id: "pac-laswim-fiq-9-16",
        catalogId: "pac-laswim-fiq",
        name: "Laswim FIQ Inverter — Résidentiel",
        series: "9 – 16 kW · Mono 220 V",
        summary:
          "Pompe à chaleur Laswim FIQ — full inverter, COP jusqu'à 15, ultra-silencieuse (42 dB), Wi-Fi. Modèles LAS09 à LAS16 pour piscines de 20 à 75 m³.",
        image: `${PRODUCTS}/laswim-fiq-product.jpg`,
        imageInstall: `${INSTALL}/laswim-install-villa.jpg`,
        imageInstallAlt: "Pompe à chaleur Laswim FIQ 9-16 kW — installation villa",
        specs: [
          { label: "Puissance", value: "9 – 16 kW" },
          { label: "Modèles", value: "LAS09 / LAS13 / LAS16" },
          { label: "COP max", value: "Jusqu'à 15" },
          { label: "Volume bassin", value: "20 – 75 m³" },
        ],
      },
      {
        id: "pac-laswim-fiq-20-24",
        catalogId: "pac-laswim-fiq",
        name: "Laswim FIQ Inverter — Grande villa",
        series: "20 – 24 kW · Mono 220 V",
        summary:
          "Pompe à chaleur Laswim FIQ grande capacité — modèles LAS20 et LAS24, idéale pour villas avec grands bassins jusqu'à 110 m³, chauffage et refroidissement.",
        image: `${PRODUCTS}/laswim-fiq-product.jpg`,
        imageInstall: `${INSTALL}/laswim-install-villa.jpg`,
        imageInstallAlt: "Pompe à chaleur Laswim FIQ 20-24 kW — piscine villa Maroc",
        specs: [
          { label: "Puissance", value: "20 – 24 kW" },
          { label: "Modèles", value: "LAS20 / LAS24" },
          { label: "Réfrigérant", value: "R32" },
          { label: "Volume bassin", value: "50 – 110 m³" },
        ],
      },
      {
        id: "pac-laswim-vtype-30-40",
        catalogId: "pac-laswim-vtype",
        name: "Laswim V-Type — Commercial",
        series: "30 – 40 kW · Tri 380 V",
        summary:
          "Pompe à chaleur Laswim V-Type — évaporateur en V, basse température jusqu'à -10 °C, triphasé. Modèles LAS35 à LAS42 pour hôtels, spas et grands bassins.",
        image: `${PRODUCTS}/laswim-vtype-product.jpg`,
        imageInstall: `${INSTALL}/laswim-install-villa.jpg`,
        imageInstallAlt: "Pompe à chaleur Laswim V-Type 30-40 kW — chauffage piscine",
        specs: [
          { label: "Puissance", value: "30 – 40 kW" },
          { label: "Modèles", value: "LAS35 / LAS42" },
          { label: "Alimentation", value: "380 V triphasé" },
          { label: "Volume bassin", value: "Jusqu'à 540 m³" },
        ],
      },
    ],
  },
];
