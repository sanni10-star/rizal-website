/** Pompes à chaleur piscine Laswim — slider gammes 9–40 kW. */
export type PiscinePacMarque = {
  id: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  phaseLabel: string;
  installImage: string;
  installImageAlt: string;
  logo: string;
  accent: string;
  accentLight: string;
  bgGradient: string;
};

const PAC = "/img/piscine/pac";
const INSTALL = `${PAC}/install`;
const LOGOS = `${PAC}/logos`;

export const piscinePacMarques: PiscinePacMarque[] = [
  {
    id: "fiq-inverter",
    name: "Laswim",
    series: "FIQ Inverter — 9 à 24 kW",
    tagline: "Full Inverter · COP jusqu'à 15 · Wi-Fi",
    description:
      "Pompes à chaleur Laswim série FIQ — compresseur DC twin-rotary, réfrigérant R32, échangeur titane torsadé, pilotage Wi-Fi. De 9 à 24 kW pour piscines résidentielles et villas jusqu'à 110 m³.",
    phaseLabel: "9 – 24 kW",
    installImage: `${INSTALL}/laswim-install-villa.jpg`,
    installImageAlt: "Pompe à chaleur Laswim installée au bord d'une piscine villa Essaouira",
    logo: `${LOGOS}/logo-laswim.svg`,
    accent: "#1B4F8A",
    accentLight: "#E8F2FA",
    bgGradient: "linear-gradient(145deg, #0d2d52 0%, #1b4f8a 45%, #0a2240 100%)",
  },
  {
    id: "vtype-commercial",
    name: "Laswim",
    series: "V-Type — 30 à 40 kW",
    tagline: "Commercial · Basse température · Triphasé",
    description:
      "Pompes à chaleur Laswim V-Type — évaporateur en V haute performance, fonctionnement jusqu'à -10 °C, triphasé 380 V. De 30 à 40 kW pour grands bassins, hôtels et piscines semi-professionnelles.",
    phaseLabel: "30 – 40 kW",
    installImage: `${INSTALL}/laswim-install-villa.jpg`,
    installImageAlt: "Pompe à chaleur Laswim grande capacité — chauffage piscine villa Maroc",
    logo: `${LOGOS}/logo-laswim.svg`,
    accent: "#2D6A9F",
    accentLight: "#E6F0F8",
    bgGradient: "linear-gradient(145deg, #1a3d5c 0%, #2d6a9f 45%, #142d45 100%)",
  },
];
