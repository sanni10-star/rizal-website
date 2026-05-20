import type { CatalogItem, Brand, Category } from "@/types/catalog";
import { climatisationItems as rawClimatisationItems } from "./climatisation";
import { solaireItems as rawSolaireItems } from "./solaire";
import { servicesItems as rawServicesItems } from "./services";
import { accessoiresItems as rawAccessoiresItems } from "./accessoires";

function useCaseForItem(item: CatalogItem): string {
  const formats = item.formats ?? [];
  if (formats.includes("Mobile")) {
    return "Usage d'appoint sans installation : résidence secondaire, bureau temporaire, location saisonnière";
  }
  if (formats.includes("Multi-split")) {
    return "Villas et appartements multi-pièces : 1 unité extérieure pour plusieurs zones";
  }
  if (formats.includes("VRF")) {
    return "Grandes villas, hôtels boutique, programmes résidentiels et projets tertiaires";
  }
  if (formats.includes("Gainable")) {
    return "Faux-plafond, villas premium, intégration invisible avec grilles de soufflage";
  }
  if (formats.includes("Cassette")) {
    return "Faux-plafond, grands salons, open-spaces, bureaux et commerces";
  }
  if (formats.includes("Encastrable")) {
    return "Installation encastrée pour villas modernes et espaces professionnels";
  }
  if (formats.includes("Mural")) {
    return "Chambres, salons, bureaux et pièces de vie";
  }
  return "Projet résidentiel ou professionnel sur étude RIZAL";
}

function withStructuredSpecs(item: CatalogItem): CatalogItem {
  if (item.category !== "climatisation") return item;

  const existingLabels = new Set(item.specs.map((s) => s.label));
  const required = [
    { label: "Catégorie", value: "Climatisation" },
    { label: "Marque", value: item.brand ?? "RIZAL" },
    {
      label: "Type de climatisation",
      value: item.formats?.join(" / ") ?? "Sur étude",
    },
    { label: "Produit conseillé pour", value: useCaseForItem(item) },
  ].filter((spec) => !existingLabels.has(spec.label));

  return {
    ...item,
    specs: [...required, ...item.specs],
  };
}

export const catalog: CatalogItem[] = [
  ...rawClimatisationItems,
  ...rawSolaireItems,
  ...rawServicesItems,
  ...rawAccessoiresItems,
].map(withStructuredSpecs);

export const climatisationItems: CatalogItem[] =
  rawClimatisationItems.map(withStructuredSpecs);
export const solaireItems: CatalogItem[] = rawSolaireItems;
export const servicesItems: CatalogItem[] = rawServicesItems;
export const accessoiresItems: CatalogItem[] = rawAccessoiresItems;

export function getById(id: string): CatalogItem | undefined {
  return catalog.find((c) => c.id === id);
}

export function getByCategory(category: Category): CatalogItem[] {
  return catalog.filter((c) => c.category === category);
}

export function getByBrand(brand: Brand): CatalogItem[] {
  return catalog.filter((c) => c.brand === brand);
}

export function getBrandsForCategory(category: Category): Brand[] {
  const brands = new Set<Brand>();
  catalog.forEach((c) => {
    if (c.category === category && c.brand) brands.add(c.brand);
  });
  return [...brands];
}

export function brandSlug(brand: Brand): string {
  return brand.toLowerCase();
}

export function brandFromSlug(slug: string): Brand | undefined {
  const map: Record<string, Brand> = {
    megalife: "MEGALIFE",
    ingelec: "INGELEC",
    lg: "LG",
    trane: "TRANE",
  };
  return map[slug.toLowerCase()];
}

export const BRANDS_HVAC: Brand[] = ["MEGALIFE", "INGELEC", "LG", "TRANE"];

export {
  rawClimatisationItems,
  rawSolaireItems,
  rawServicesItems,
  rawAccessoiresItems,
};
