export type Category =
  | "climatisation"
  | "solaire"
  | "piscine"
  | "renovation"
  | "traitement-eau"
  | "accessoire";

export type Brand = "MEGALIFE" | "INGELEC" | "LG" | "TRANE";

export type Format =
  | "Encastrable"
  | "Multi-split"
  | "Mobile"
  | "Mural"
  | "Cassette"
  | "Gainable"
  | "Console"
  | "VRF";

export type Spec = { label: string; value: string };

/** Variante produit (sans prix à l'écran). */
export type CatalogProductVariant = {
  id: string;
  title: string;
  image?: string;
  gallery?: string[];
};

export type CatalogItem = {
  id: string;
  category: Category;
  brand?: Brand;
  name: string;
  gammeLabel?: string;
  shortDescFr: string;
  longDescFr?: string;
  image: string;
  gallery?: string[];
  specs: Spec[];
  formats?: Format[];
  capacities?: string[];
  variants?: CatalogProductVariant[];
  highlights?: string[];
  crossSell?: string[];
  whatsappContext?: string;
  badge?: string;
};
