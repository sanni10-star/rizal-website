"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function svgFallbackFor(src: string): string | null {
  if (!src.startsWith("/img/products/")) return null;
  if (src.endsWith(".svg")) return null;

  const lower = src.toLowerCase();

  if (lower.includes("/megalife/")) {
    if (lower.includes("gainable"))
      return "/img/products/megalife/gainable-inverter-r410a.svg";
    if (lower.includes("cassette"))
      return "/img/products/megalife/cassette-inverter.svg";
    if (lower.includes("mobile"))
      return "/img/products/megalife/multi-split-units-int.svg";
    return "/img/products/megalife/bi-split-system.svg";
  }

  if (lower.includes("/ingelec/")) {
    if (lower.includes("mural") && lower.includes("inverter"))
      return "/img/products/ingelec/mural-split-inverter.svg";
    if (lower.includes("mural"))
      return "/img/products/ingelec/mural-split-onoff.svg";
    if (lower.includes("cassette"))
      return "/img/products/ingelec/cassette.svg";
    if (lower.includes("gainable"))
      return "/img/products/ingelec/gainable.svg";
    if (lower.includes("multi"))
      return "/img/products/ingelec/multi-split.svg";
    if (lower.includes("mobile"))
      return "/img/products/ingelec/mobile.svg";
  }

  if (lower.includes("/trane/")) return "/img/products/trane/multi-split.svg";
  if (lower.includes("/lg/")) return "/img/products/lg/multi-split.svg";

  return null;
}

export function ProductImage({
  src,
  alt,
  className,
  fallbackClassName,
  loading = "lazy",
  fit = "contain",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  loading?: "eager" | "lazy";
  fit?: "contain" | "cover";
}) {
  const [current, setCurrent] = useState(src ?? "");
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setCurrent(src ?? "");
    setHasFailed(false);
  }, [src]);

  if (!current || hasFailed) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-ink to-ink-900 p-6 text-center",
          fallbackClassName,
        )}
        aria-label={`${alt} - photo produit à ajouter`}
      >
        <span className="font-display text-3xl font-semibold italic text-brand-500">
          Rizal
        </span>
        <span className="mt-2 text-[10px] font-semibold uppercase tracking-brand text-bone/70">
          Photo produit à ajouter
        </span>
      </div>
    );
  }

  return (
    <img
      src={current}
      alt={alt}
      className={cn(
        "h-full w-full object-center",
        fit === "contain" ? "object-contain" : "object-cover",
        className,
      )}
      loading={loading}
      onError={() => {
        const fb = svgFallbackFor(current);
        if (fb && fb !== current) {
          setCurrent(fb);
          return;
        }
        setHasFailed(true);
      }}
    />
  );
}
