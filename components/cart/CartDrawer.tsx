"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, type CartLine } from "@/stores/cart";
import { catalog } from "@/content/catalog";
import type { CatalogItem } from "@/types/catalog";
import { getCrossSells } from "@/lib/crossSell";
import { whatsappCheckoutUrl, whatsappContactUrl } from "@/lib/whatsapp";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { ProductImage } from "@/components/catalog/ProductImage";
import { gammeHref } from "@/lib/links";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const itemsInCart = lines
    .map((l) => {
      const item = catalog.find((c) => c.id === l.itemId);
      return item ? { line: l, item } : null;
    })
    .filter((x): x is { line: CartLine; item: CatalogItem } => x !== null);

  const crossSells = getCrossSells(lines, catalog, 4);
  const checkoutUrl = whatsappCheckoutUrl(lines, catalog);
  const totalCount = lines.reduce((acc, l) => acc + l.qty, 0);

  return (
    <>
      <div
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none",
        )}
        role="dialog"
        aria-label="Mon devis RIZAL"
      >
        <header className="flex items-center justify-between border-b border-ink/5 bg-ink px-6 py-5 text-bone">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-400">
              RIZAL
            </p>
            <h2 className="font-display text-xl">Mon Devis</h2>
          </div>
          <button
            onClick={close}
            aria-label="Fermer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 hover:bg-bone/10"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {itemsInCart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-bone">
                <ShoppingBag className="h-7 w-7 text-sand-600" />
              </div>
              <h3 className="font-display text-2xl text-ink">
                Votre devis est vide
              </h3>
              <p className="mt-2 max-w-xs text-sm text-ink/60">
                Ajoutez des produits ou services à votre devis pour les
                envoyer en un clic à notre équipe via WhatsApp.
              </p>
              <Link
                href="/climatisation"
                onClick={close}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-bone hover:bg-ink/85"
              >
                Découvrir le catalogue
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink/5">
              {itemsInCart.map(({ line, item }) => (
                <li key={line.itemId} className="flex gap-4 p-5">
                  <Link
                    href={gammeHref(item)}
                    onClick={close}
                    className="aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-bone"
                  >
                    <ProductImage src={item.image} alt={item.name} />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    {item.brand ? (
                      <p className="text-[10px] font-semibold uppercase tracking-widest2 text-sand-600">
                        {item.brand}
                      </p>
                    ) : null}
                    <Link
                      href={gammeHref(item)}
                      onClick={close}
                      className="line-clamp-1 font-display text-base text-ink hover:text-sand-600"
                    >
                      {item.name}
                    </Link>
                    {item.gammeLabel ? (
                      <p className="line-clamp-1 text-[11px] text-ink/55">
                        {item.gammeLabel}
                      </p>
                    ) : null}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-ink/10">
                        <button
                          aria-label="Diminuer la quantité"
                          onClick={() => setQty(line.itemId, Math.max(0, line.qty - 1))}
                          className="inline-flex h-8 w-8 items-center justify-center text-ink/70 hover:text-ink"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">
                          {line.qty}
                        </span>
                        <button
                          aria-label="Augmenter la quantité"
                          onClick={() => setQty(line.itemId, line.qty + 1)}
                          className="inline-flex h-8 w-8 items-center justify-center text-ink/70 hover:text-ink"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        aria-label="Retirer du devis"
                        onClick={() => remove(line.itemId)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/40 hover:bg-bone hover:text-ink"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {crossSells.length > 0 ? (
            <div className="border-t border-ink/5 bg-bone/50 p-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                ✦ Complétez votre installation
              </p>
              <ul className="space-y-3">
                {crossSells.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 rounded-xl border border-ink/5 bg-white p-3"
                  >
                    <div className="aspect-square w-14 shrink-0 overflow-hidden rounded-lg bg-bone">
                      <ProductImage src={item.image} alt={item.name} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <p className="line-clamp-1 text-sm font-semibold text-ink">
                          {item.name}
                        </p>
                        <p className="line-clamp-1 text-[11px] text-ink/55">
                          {item.gammeLabel ?? item.shortDescFr}
                        </p>
                      </div>
                    </div>
                    <AddToCartButton
                      itemId={item.id}
                      label="+"
                      className="h-9 w-9 px-0 text-base"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <footer className="border-t border-ink/5 bg-white p-5">
          {totalCount > 0 ? (
            <p className="mb-3 text-center text-xs text-ink/60">
              {totalCount} article{totalCount > 1 ? "s" : ""} dans votre
              demande de devis
            </p>
          ) : null}
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (itemsInCart.length === 0) return;
              const payload = {
                source: "cart-drawer",
                lines: itemsInCart.map(({ line, item }) => ({
                  itemId: item.id,
                  name: item.name,
                  brand: item.brand ?? undefined,
                  gammeLabel: item.gammeLabel ?? undefined,
                  qty: line.qty,
                })),
              };
              try {
                navigator.sendBeacon?.(
                  "/api/quote",
                  new Blob([JSON.stringify(payload)], { type: "application/json" }),
                );
              } catch {}
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-wa py-4 font-semibold text-white shadow-xl shadow-emerald-900/20 transition hover:bg-emerald-600"
          >
            Finaliser sur WhatsApp &rarr;
          </a>
          <div className="mt-3 flex items-center justify-between text-xs">
            <a
              href={whatsappContactUrl("rappel")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/60 underline-offset-2 hover:text-ink hover:underline"
            >
              Être rappelé(e)
            </a>
            {itemsInCart.length > 0 ? (
              <button
                onClick={clear}
                className="text-ink/40 hover:text-ink/70"
              >
                Vider le devis
              </button>
            ) : null}
          </div>
        </footer>
      </aside>
    </>
  );
}
