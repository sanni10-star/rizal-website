"use client";

import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/stores/cart";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  itemId,
  label = "Ajouter au Devis",
  variant = "gold",
  className,
}: {
  itemId: string;
  label?: string;
  variant?: "gold" | "ghost";
  className?: string;
}) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        add(itemId);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition active:scale-[0.97]",
        variant === "gold"
          ? "bg-sand-400 text-ink shadow-md shadow-sand-400/20 hover:bg-sand-300"
          : "border border-ink/15 bg-white text-ink hover:bg-bone",
        className,
      )}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Ajouté à votre devis
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}
