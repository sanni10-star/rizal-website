import type { CatalogItem } from "@/types/catalog";
import { brandSlug } from "@/content/catalog";

export function gammeHref(item: CatalogItem): string {
  switch (item.category) {
    case "climatisation":
      if (item.brand) {
        return `/climatisation/${brandSlug(item.brand)}/${item.id}`;
      }
      return "/climatisation";
    case "solaire":
      return `/energie-solaire/${item.id}`;
    case "piscine":
      return `/services/piscine#${item.id}`;
    case "renovation":
      return `/services/renovation-villa#${item.id}`;
    case "traitement-eau":
      return `/services/traitement-eau#${item.id}`;
    case "automatisation":
      return `/services/automatisation-eau-portail#${item.id}`;
    case "securite":
      return `/services/securite#${item.id}`;
    case "pompes":
      return `/services/pompes#${item.id}`;
    case "chauffe-eau":
      return `/services/chauffe-eau-electrique#${item.id}`;
    case "accessoire":
      return `/contact?accessoire=${item.id}`;
    default:
      return "/";
  }
}
