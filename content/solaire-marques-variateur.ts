/** Page catalogue variateurs solaires — Veichi & INVT. */
export const SOLAIRE_MARQUES_VARIATEUR_PATH =
  "/energie-solaire/marques-variateur-solaire" as const;

export type SolaireVariateurSpec = { label: string; value: string };

export type SolaireVariateurProduct = {
  id: string;
  catalogId: string;
  name: string;
  series: string;
  summary: string;
  specs: SolaireVariateurSpec[];
  image: string;
  imageInstall: string;
  imageInstallAlt: string;
};

export type SolaireVariateurMarqueSection = {
  id: string;
  title: string;
  tagline: string;
  intro: string;
  brandLogo: string;
  accent: string;
  accentSecondary?: string;
  products: SolaireVariateurProduct[];
};

const VAR = "/img/solaire/variateurs";
const PRODUCTS = `${VAR}/products`;
const INSTALL = `${VAR}/install`;

export const solaireVariateurMarqueSections: SolaireVariateurMarqueSection[] = [
  {
    id: "veichi",
    title: "Veichi",
    tagline: "SI22 / SI23 · Pompage solaire",
    intro:
      "Variateurs de fréquence Veichi pour pompage solaire — séries SI22 (monophasé) et SI23 (triphasé). MPPT intégré, compatible pompes immergées et de surface.",
    brandLogo: `${VAR}/logo-veichi.svg`,
    accent: "#00A8B5",
    products: [
      {
        id: "variateur-veichi-monophase",
        catalogId: "variateur-veichi-monophase",
        name: "Veichi SI22 — Monophasé",
        series: "220 V · 0,75 – 7,5 kW",
        summary:
          "Variateur monophasé 220 V pour pompes solaires — série SI22-D3, MPPT jusqu'à 99 %, plage DC 60–450 V.",
        image: `${PRODUCTS}/veichi-variateur-product.jpg`,
        imageInstall: `${INSTALL}/veichi-install-villa.jpg`,
        imageInstallAlt: "Variateur Veichi monophasé installé — local technique villa",
        specs: [
          { label: "Phase", value: "Monophasé 220 V" },
          { label: "Série", value: "SI22-D3" },
          { label: "Puissance", value: "0,75 – 7,5 kW" },
          { label: "MPPT", value: "Jusqu'à 99 %" },
        ],
      },
      {
        id: "variateur-veichi-triphase",
        catalogId: "variateur-veichi-triphase",
        name: "Veichi SI23 — Triphasé",
        series: "380 V · 2,2 – 75 kW",
        summary:
          "Variateur triphasé 380 V — série SI23-D5, pour forage, irrigation et piscines à forte puissance.",
        image: `${PRODUCTS}/veichi-variateur-product.jpg`,
        imageInstall: `${INSTALL}/veichi-install-villa.jpg`,
        imageInstallAlt: "Variateur Veichi triphasé — installation pompage solaire",
        specs: [
          { label: "Phase", value: "Triphasé 380 V" },
          { label: "Série", value: "SI23-D5" },
          { label: "Puissance", value: "2,2 – 75 kW" },
          { label: "MPPT", value: "Jusqu'à 99 %" },
        ],
      },
    ],
  },
  {
    id: "invt",
    title: "INVT",
    tagline: "GD100-PV · Goodrive",
    intro:
      "Variateurs INVT série GD100-PV — conçus pour le pompage solaire agricole et résidentiel. Entrée hybride PV + réseau, protection intégrée, IP54.",
    brandLogo: `${VAR}/logo-invt.svg`,
    accent: "#005BAC",
    products: [
      {
        id: "variateur-invt-monophase",
        catalogId: "variateur-invt-monophase",
        name: "INVT GD100-PV — Monophasé",
        series: "220 V · 0,4 – 7,5 kW",
        summary:
          "Variateur monophasé 220 V GD100-PV — démarrage automatique, sans paramétrage complexe, idéal pompes de surface.",
        image: `${PRODUCTS}/invt-variateur-product.jpg`,
        imageInstall: `${INSTALL}/invt-mono-install.jpg`,
        imageInstallAlt: "Variateur INVT monophasé installé — villa Maroc",
        specs: [
          { label: "Phase", value: "Monophasé 220 V" },
          { label: "Série", value: "GD100-PV" },
          { label: "Puissance", value: "0,4 – 7,5 kW" },
          { label: "Hybride", value: "PV + réseau" },
        ],
      },
      {
        id: "variateur-invt-triphase",
        catalogId: "variateur-invt-triphase",
        name: "INVT GD100-PV — Triphasé",
        series: "380 V · 4 – 110 kW",
        summary:
          "Variateur triphasé 380 V GD100-PV — irrigation, forage profond et grands débits, monitoring et protections avancées.",
        image: `${PRODUCTS}/invt-variateur-product.jpg`,
        imageInstall: `${INSTALL}/invt-tri-install.jpg`,
        imageInstallAlt: "Variateur INVT triphasé — pompage solaire Essaouira",
        specs: [
          { label: "Phase", value: "Triphasé 380 V" },
          { label: "Série", value: "GD100-PV" },
          { label: "Puissance", value: "4 – 110 kW" },
          { label: "Protection", value: "IP54" },
        ],
      },
    ],
  },
];
