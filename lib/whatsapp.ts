import { SITE } from "./site";
import type { CatalogItem } from "@/types/catalog";
import type { CartLine } from "@/stores/cart";

function phone() {
  return SITE.whatsappPhone.replace(/\D/g, "");
}

export function whatsappLinkSimple(message: string) {
  return `https://wa.me/${phone()}?text=${encodeURIComponent(message)}`;
}

export function whatsappLinkForItem(item: CatalogItem) {
  const lines = [
    `Bonjour RIZAL,`,
    ``,
    `Je suis intéressé(e) par :`,
    `• Produit : ${item.name}`,
    item.brand ? `• Marque : ${item.brand}` : null,
    item.gammeLabel ? `• Gamme : ${item.gammeLabel}` : null,
    item.whatsappContext ? `• Détails : ${item.whatsappContext}` : null,
    ``,
    `Merci de me communiquer la disponibilité, le devis et les délais d'installation.`,
    ``,
    `— Envoyé depuis ${SITE.domain}`,
  ]
    .filter(Boolean)
    .join("\n");

  return whatsappLinkSimple(lines);
}

export function whatsappLinkForVariant(
  item: CatalogItem,
  variant: { title: string },
) {
  const lines = [
    `Bonjour RIZAL,`,
    ``,
    `Je suis intéressé(e) par :`,
    `• Gamme : ${item.name}`,
    item.brand ? `• Marque : ${item.brand}` : null,
    `• Modèle : ${variant.title}`,
    ``,
    `Merci de me confirmer la disponibilité et un devis détaillé.`,
    ``,
    `— Envoyé depuis ${SITE.domain}`,
  ]
    .filter(Boolean)
    .join("\n");

  return whatsappLinkSimple(lines);
}

export function whatsappCheckoutUrl(
  lines: CartLine[],
  catalog: CatalogItem[],
) {
  if (lines.length === 0) {
    return whatsappLinkSimple(
      `Bonjour RIZAL, je souhaite être recontacté(e) pour un devis personnalisé. Merci.`,
    );
  }

  const items = lines
    .map((line, idx) => {
      const item = catalog.find((c) => c.id === line.itemId);
      if (!item) return null;
      const meta = [item.brand, item.gammeLabel].filter(Boolean).join(" — ");
      return `${idx + 1}. ${item.name}${meta ? ` (${meta})` : ""} — Quantité : ${line.qty}`;
    })
    .filter(Boolean)
    .join("\n");

  const message = [
    `Bonjour RIZAL,`,
    ``,
    `Je souhaite finaliser ma demande de devis pour les produits/services suivants :`,
    ``,
    items,
    ``,
    `Merci de me confirmer la disponibilité, le devis détaillé, les délais de livraison et la date d'installation possible.`,
    ``,
    `— Envoyé depuis ${SITE.domain}`,
  ].join("\n");

  return whatsappLinkSimple(message);
}

export function whatsappContactUrl(
  reason: "general" | "rappel" | "expert" = "general",
) {
  const messages: Record<typeof reason, string> = {
    general: `Bonjour RIZAL, je souhaite des informations sur vos produits et services.`,
    rappel: `Bonjour RIZAL, merci de me rappeler dès que possible pour une demande de devis.`,
    expert: `Bonjour RIZAL, je souhaite parler à un expert pour mon projet (climatisation / villa / piscine / solaire).`,
  };
  return whatsappLinkSimple(messages[reason]);
}
