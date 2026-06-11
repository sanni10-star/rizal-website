/** Marques variateur solaire — Veichi & INVT (pompage solaire). */
export type SolaireVariateurMarque = {
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
  accentSecondary?: string;
  accentLight: string;
  bgGradient: string;
};

const VAR = "/img/solaire/variateurs";
const INSTALL = `${VAR}/install`;

export const solaireVariateurMarques: SolaireVariateurMarque[] = [
  {
    id: "veichi",
    name: "Veichi",
    series: "SI22 / SI23",
    tagline: "Pompage solaire · MPPT 99 %",
    description:
      "Variateurs Veichi SI22 et SI23 pour pompes immergées et de surface — monophasé 220 V et triphasé 380 V, alimentation PV directe avec tracker MPPT intégré.",
    phaseLabel: "Mono & Triphasé",
    installImage: `${INSTALL}/veichi-install-villa.jpg`,
    installImageAlt:
      "Variateur Veichi installé — pompage solaire Essaouira",
    logo: `${VAR}/logo-veichi.svg`,
    accent: "#00A8B5",
    accentLight: "#E6F7F9",
    bgGradient: "linear-gradient(145deg, #004d55 0%, #007a88 45%, #003840 100%)",
  },
  {
    id: "invt",
    name: "INVT",
    series: "GD100-PV",
    tagline: "Goodrive · Pompage PV",
    description:
      "Série INVT GD100-PV — variateurs dédiés au pompage solaire, monophasé et triphasé 220 V / 380 V, fonction hybride PV + réseau, plage 0,4 à 110 kW.",
    phaseLabel: "Mono & Triphasé",
    installImage: `${INSTALL}/invt-essaouira-install.jpg`,
    installImageAlt:
      "Variateur INVT GD100-PV — irrigation solaire Essaouira",
    logo: `${VAR}/logo-invt.svg`,
    accent: "#005BAC",
    accentLight: "#E6F0FA",
    bgGradient: "linear-gradient(145deg, #002855 0%, #00408a 45%, #001a3d 100%)",
  },
];
