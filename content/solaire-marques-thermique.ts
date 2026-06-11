/** Page catalogue solaire thermique (documents RIZAL : LATO/Teliko, Sonne Aktion). */
export const SOLAIRE_MARQUES_THERMIQUE_PATH = "/energie-solaire/marques-solaire-thermique" as const;

export const SOLAIRE_THERMIQUE_DOCS = {
  chauffeEauEmaille: "/docs/solaire-thermique/chauffe-eau-solaire-emaille.pdf",
  latoTeliko: "/docs/solaire-thermique/lato-teliko-a4-en.pdf",
  sonneKeymark: "/docs/solaire-thermique/certificat-sonne-aktion-keymark.pdf",
} as const;

export type SolaireThermiqueSpec = { label: string; value: string };

export type SolaireThermiqueProduct = {
  id: string;
  name: string;
  summary: string;
  specs: SolaireThermiqueSpec[];
  /** Visuel produit (fiche / catalogue). */
  image: string;
  /** Mise en situation villa ou appartement. */
  imageInstall: string;
  /** Fiche PDF constructeur associée. */
  pdfHref?: string;
};

export type SolaireThermiqueMarqueSection = {
  id: "lato-teliko" | "sonne-aktion";
  title: string;
  intro: string;
  /** Logo extrait du document constructeur. */
  brandLogo: string;
  /** Site officiel de la marque. */
  brandUrl?: string;
  /** Pays / localisation fabricant. */
  brandOrigin?: string;
  pdfHref?: string;
  products: SolaireThermiqueProduct[];
};

const BRAND_LOGO = "/img/brands/solaire";

const IMG = "/img/solaire/thermique";

export const solaireThermiqueMarqueSections: SolaireThermiqueMarqueSection[] = [
  {
    id: "lato-teliko",
    title: "LATO / Teliko",
    brandLogo: `${BRAND_LOGO}/logo-lato.png`,
    brandUrl: "https://www.lato.com.gr/en/",
    brandOrigin: "Fabricant grec · certifié ISO 9001 & Solar Keymark depuis 1971",
    intro:
      "Gamme TSR ECO — thermosiphon acier émaillé (brochure LATO s.a.). Volumes et surfaces capteurs selon fiche technique fournie.",
    pdfHref: SOLAIRE_THERMIQUE_DOCS.latoTeliko,
    products: [
      {
        id: "lato-thermosiphon-150",
        name: "TSR ECO — 150 L (1 capteur)",
        summary: "Thermosiphon TSR ECO, ballon acier émaillé, 1 capteur plan — réf. TSR1502 / TSR15025 / TSR1503.",
        image: `${IMG}/lato-150-main.png`,
        imageInstall: `${IMG}/lato-150-install.jpg`,
        pdfHref: SOLAIRE_THERMIQUE_DOCS.latoTeliko,
        specs: [
          { label: "Volume", value: "150 L" },
          { label: "Capteurs", value: "1 × plan" },
          { label: "Ballon", value: "Acier émaillé" },
        ],
      },
      {
        id: "lato-thermosiphon-200",
        name: "TSR ECO — 200 L (2 capteurs)",
        summary: "Thermosiphon TSR ECO double capteur — réf. TSR2002 / TSR20025 / TSR2003 / TSR2004.",
        image: `${IMG}/lato-200-main.png`,
        imageInstall: `${IMG}/lato-200-install.jpg`,
        pdfHref: SOLAIRE_THERMIQUE_DOCS.latoTeliko,
        specs: [
          { label: "Volume", value: "200 L" },
          { label: "Capteurs", value: "2 × plan" },
          { label: "Rendement η₀", value: "77,2 %" },
        ],
      },
      {
        id: "lato-thermosiphon-300",
        name: "TSR ECO — double capteur (grande surface)",
        summary: "Configuration 2 capteurs grande surface nette (jusqu’à 4 m²) — fiche TSR ECO page 2.",
        image: `${IMG}/lato-300-main.png`,
        imageInstall: `${IMG}/lato-300-install.jpg`,
        pdfHref: SOLAIRE_THERMIQUE_DOCS.latoTeliko,
        specs: [
          { label: "Surface nette", value: "jusqu’à 4,00 m²" },
          { label: "Capteurs", value: "2 × plan" },
          { label: "Garantie ballon", value: "5 ans" },
        ],
      },
      {
        id: "lato-surpression",
        name: "TSR ECO — kit complet (fiche technique)",
        summary: "Ballon émaillé, capteur(s), support Magnelis®, kit de raccordement — extrait brochure LATO.",
        image: `${IMG}/lato-split-main.png`,
        imageInstall: `${IMG}/lato-split-install.jpg`,
        pdfHref: SOLAIRE_THERMIQUE_DOCS.latoTeliko,
        specs: [
          { label: "Kit", value: "Complet RIZAL" },
          { label: "Support", value: "Magnelis®" },
          { label: "Certification", value: "Solar Keymark" },
        ],
      },
    ],
  },
  {
    id: "sonne-aktion",
    title: "Sonne Aktion",
    brandLogo: `${BRAND_LOGO}/logo-sonne-aktion.png`,
    brandUrl: "https://sonne.gr/en/",
    brandOrigin: "Fabricant grec · Solar Keymark SKM 10078 · 40+ ans d'expérience",
    intro:
      "Chauffe-eau solaire émaillé thermosiphon Sonne Aktion — visuels et certificat Solar Keymark (ATLAS CA 160 / 200 / 230).",
    pdfHref: SOLAIRE_THERMIQUE_DOCS.chauffeEauEmaille,
    products: [
      {
        id: "sonne-capteur-plan",
        name: "Thermosiphon compact — 1 capteur",
        summary: "Petit système thermosiphon Sonne Aktion (document chauffe-eau émaillé).",
        image: `${IMG}/sonne-collector-main.jpg`,
        imageInstall: `${IMG}/sonne-collector-install.jpg`,
        pdfHref: SOLAIRE_THERMIQUE_DOCS.chauffeEauEmaille,
        specs: [
          { label: "Type", value: "Thermosiphon" },
          { label: "Capteurs", value: "1 plan" },
          { label: "Ballon", value: "Émaillé" },
        ],
      },
      {
        id: "sonne-pack-2",
        name: "Thermosiphon — 2 capteurs",
        summary: "Système double capteurs + ballon horizontal (visuel catalogue PDF partagé).",
        image: `${IMG}/sonne-pack-main.jpg`,
        imageInstall: `${IMG}/sonne-pack-install.jpg`,
        pdfHref: SOLAIRE_THERMIQUE_DOCS.chauffeEauEmaille,
        specs: [
          { label: "Capteurs", value: "2 × plan" },
          { label: "Certification", value: "Solar Keymark SKM 10078" },
          { label: "Gamme certifiée", value: "ATLAS CA" },
        ],
      },
      {
        id: "sonne-regulation",
        name: "Thermosiphon grande capacité",
        summary: "Double capteur grande surface + ballon — ligne premium Sonne Aktion du PDF.",
        image: `${IMG}/sonne-regulation-main.jpg`,
        imageInstall: `${IMG}/sonne-regulation-install.jpg`,
        pdfHref: SOLAIRE_THERMIQUE_DOCS.sonneKeymark,
        specs: [
          { label: "Modèles cert.", value: "ATLAS CA 160 / 200 / 230" },
          { label: "η₀", value: "0,767" },
          { label: "Licence", value: "SKM 10078" },
        ],
      },
    ],
  },
];
