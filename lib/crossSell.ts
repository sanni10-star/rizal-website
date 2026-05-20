import type { CatalogItem, Category } from "@/types/catalog";
import type { CartLine } from "@/stores/cart";

const CATEGORY_RULES: Record<Category, string[]> = {
  climatisation: [
    "support-mural-inox",
    "kit-goulotte-decorative",
    "contrat-entretien-annuel",
  ],
  solaire: [
    "onduleur-huawei-sun2000",
    "batterie-pylontech-us5000",
    "kit-fixation-toiture",
  ],
  piscine: ["electrolyseur-sel", "pac-piscine", "eclairage-led-rgb"],
  renovation: [
    "ingelec-cassette-inverter",
    "kit-solaire-villa-10kwc",
    "adoucisseur-villa",
  ],
  "traitement-eau": ["osmoseur-domestique-6etages", "lampe-uv-sterilisation"],
  accessoire: [],
};

export function getCrossSells(
  lines: CartLine[],
  catalog: CatalogItem[],
  max = 4,
): CatalogItem[] {
  const inCart = new Set(lines.map((l) => l.itemId));
  const cats = new Set<Category>();
  const explicit = new Set<string>();

  lines.forEach((l) => {
    const item = catalog.find((c) => c.id === l.itemId);
    if (!item) return;
    cats.add(item.category);
    item.crossSell?.forEach((id) => explicit.add(id));
  });

  const suggestions = new Set<string>();
  cats.forEach((c) => CATEGORY_RULES[c]?.forEach((id) => suggestions.add(id)));
  explicit.forEach((id) => suggestions.add(id));

  return [...suggestions]
    .filter((id) => !inCart.has(id))
    .map((id) => catalog.find((c) => c.id === id))
    .filter((x): x is CatalogItem => Boolean(x))
    .slice(0, max);
}

export function getRelatedToItem(
  item: CatalogItem,
  catalog: CatalogItem[],
  max = 3,
): CatalogItem[] {
  const explicit = (item.crossSell ?? [])
    .map((id) => catalog.find((c) => c.id === id))
    .filter((x): x is CatalogItem => Boolean(x));

  if (explicit.length >= max) return explicit.slice(0, max);

  const fallback = catalog.filter(
    (c) =>
      c.id !== item.id &&
      c.category === item.category &&
      !explicit.some((e) => e.id === c.id),
  );

  return [...explicit, ...fallback].slice(0, max);
}
