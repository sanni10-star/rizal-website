import type { Brand } from "@/types/catalog";

/**
 * Les cartes marques utilisent désormais `IndustrialBrandBadge` (CSS + SVG).
 * Ce module est conservé pour compatibilité d’import éventuel ; aucun asset requis.
 */
export const BRAND_CARD_LOGO_3D: Partial<Record<Brand, string>> = {};
