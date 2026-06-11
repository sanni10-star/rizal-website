/** Liens services — source unique pour menu, footer et sitemap. */

export type NavLink = { label: string; href: string };

export const VILLA_SERVICE_LINKS: NavLink[] = [
  { label: "Construction de Piscines", href: "/services/piscine" },
  { label: "Rénovation Villa", href: "/services/renovation-villa" },
  { label: "Traitement d'Eau", href: "/services/traitement-eau" },
  { label: "Automatisation Eau & Portail", href: "/services/automatisation-eau-portail" },
  { label: "Sécurité Villa", href: "/services/securite" },
  { label: "Pompes Villa", href: "/services/pompes" },
  { label: "Chauffe-eau Électrique", href: "/services/chauffe-eau-electrique" },
];

export const VILLA_SERVICE_MENU_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Eau & Confort",
    links: VILLA_SERVICE_LINKS.filter((l) =>
      ["/services/traitement-eau", "/services/automatisation-eau-portail", "/services/pompes", "/services/chauffe-eau-electrique"].includes(
        l.href,
      ),
    ),
  },
  {
    title: "Villa & Sécurité",
    links: VILLA_SERVICE_LINKS.filter((l) =>
      ["/services/piscine", "/services/renovation-villa", "/services/securite"].includes(l.href),
    ),
  },
];

export const FOOTER_SERVICE_LINKS: NavLink[] = [
  { label: "Droguerie Essaouira", href: "/services/droguerie-essaouira" },
  { label: "Construction Essaouira", href: "/services/construction-essaouira" },
  ...VILLA_SERVICE_LINKS,
  { label: "Réalisations", href: "/realisations" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Garanties", href: "/garanties" },
];

export const HOME_CATEGORY_CARDS = [
  {
    title: "Climatisation",
    eyebrow: "MEGALIFE · INGELEC · LG · TRANE",
    description: "Encastrable, Multi-split, Mobile — toutes les gammes officielles.",
    image: "/img/categories/climatisation.jpg",
    href: "/climatisation",
  },
  {
    title: "Énergie Solaire",
    eyebrow: "Tier 1 · Hybrides · Lithium",
    description: "Panneaux premium, onduleurs Huawei, batteries Pylontech.",
    image: "/img/solaire/panels/panneau-tier1-hero.jpg",
    href: "/energie-solaire",
  },
  {
    title: "Piscines & Villa",
    eyebrow: "Construction · Rénovation",
    description: "Piscines à débordement, rénovation totale, délais respectés.",
    image: "/img/products/piscine/construction/piscine-debordement.jpg",
    href: "/services/piscine",
  },
  {
    title: "Traitement d'Eau",
    eyebrow: "Adoucisseurs · Osmose · UV",
    description: "Eau pure dans toute la villa — santé et durabilité.",
    image: "/img/products/traitement-eau/adoucisseur-villa.jpg",
    href: "/services/traitement-eau",
  },
  {
    title: "Automatisation Eau & Portail",
    eyebrow: "Eauromatic · Key",
    description: "Arrosage, régulation d'eau et motorisation de portails — installé par RIZAL.",
    image: "/img/categories/automatisation-eau-portail.jpg",
    href: "/services/automatisation-eau-portail",
  },
  {
    title: "Sécurité Villa",
    eyebrow: "Hikvision · Imou",
    description: "Alarme intrusion, détection incendie et caméras connectées — installé par RIZAL.",
    image: "/img/categories/securite-villa.jpg",
    href: "/services/securite",
  },
  {
    title: "Pompes Villa",
    eyebrow: "Deversopompes · Ecwat",
    description: "Pompes immergées et surpresseurs pour captage et pression d'eau — installé par RIZAL.",
    image: "/img/categories/pompes-villa.jpg",
    href: "/services/pompes",
  },
  {
    title: "Chauffe-eau Électrique",
    eyebrow: "MEGALIFE",
    description: "Cumulus slim, Smart Square, instantané Flashheat et protection ELCB — installé par RIZAL.",
    image: "/img/categories/chauffe-eau-villa.jpg",
    href: "/services/chauffe-eau-electrique",
  },
] as const;

/** Routes services indexées pour le sitemap. */
export const SITEMAP_SERVICE_ROUTES = [
  "/services/piscine",
  "/services/renovation-villa",
  "/services/traitement-eau",
  "/services/automatisation-eau-portail",
  "/services/securite",
  "/services/pompes",
  "/services/chauffe-eau-electrique",
  "/services/piscine/marques-pompes",
  "/services/piscine/marques-filtres",
  "/services/piscine/marques-pac",
  "/services/piscine/marques-traitement",
  "/services/piscine/marques-couverture",
] as const;
