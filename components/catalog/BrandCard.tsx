import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Brand } from "@/types/catalog";
import { brandSlug } from "@/content/catalog";
import { cn } from "@/lib/utils";
import { IndustrialBrandBadge } from "@/components/catalog/IndustrialBrandBadge";

const BRAND_META: Record<Brand, { tagline: string; description: string }> = {
  MEGALIFE: {
    tagline: "Performance & Innovation",
    description:
      "Gammes Inverter R32, design Versaty, cassettes et gainables, multi-split et mobile.",
  },
  INGELEC: {
    tagline: "Référence Marocaine",
    description:
      "Fabricant marocain — adapté au climat extrême, gammes mural, cassette et gainable.",
  },
  LG: {
    tagline: "Premium & Design",
    description:
      "ARTCOOL Mirror UVnano, DUALCOOL, Multi-Split et VRF MULTI V 5 — élégance coréenne.",
  },
  TRANE: {
    tagline: "Excellence Américaine",
    description:
      "Cassette, gainable, multi-split, VRF et solutions location chillers. Garantie 3 ans.",
  },
};

export function BrandCard({ brand }: { brand: Brand }) {
  const meta = BRAND_META[brand];
  const href = `/climatisation/${brandSlug(brand)}`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "perspective-[1200px] transform-gpu",
        "border border-[#2a3f6e]/40",
        "transition-all duration-500",
        "hover:border-[#3b5998]/50 hover:shadow-[0_0_48px_rgba(26,40,69,0.55)]",
      )}
      style={{
        background:
          "linear-gradient(145deg, #142240 0%, #111c36 40%, #0d1628 100%)",
      }}
    >
      {/* ── Hero badge plate ── */}
      <div className="relative w-full">
        <IndustrialBrandBadge brand={brand} className="w-full" />
      </div>

      {/* ── Blue accent separator ── */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent 5%, rgba(56,120,200,0.20) 30%, rgba(100,160,240,0.30) 50%, rgba(56,120,200,0.20) 70%, transparent 95%)",
        }}
      />

      {/* ── Text & CTA ── */}
      <div className="flex flex-1 flex-col justify-between px-6 pt-5 pb-6 md:px-7">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7B9FD4]">
            {meta.tagline}
          </p>
          <p className="text-sm leading-relaxed text-[#C8D8ED]/85 md:text-[15px]">
            {meta.description}
          </p>
        </div>

        <div className="mt-6">
          <div
            className="mb-4 h-px w-full"
            style={{
              background:
                "linear-gradient(to right, rgba(56,120,200,0.12) 0%, rgba(56,120,200,0.06) 50%, transparent 100%)",
            }}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-[#6B8EC0]/60">
              Voir les gammes
            </span>
            <span
              className={cn(
                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                "border border-[#3b5998]/30 text-[#7B9FD4]/50",
                "transition-all duration-300",
                "group-hover:border-[#5B8FD4]/60 group-hover:bg-[#1A2845] group-hover:text-white",
              )}
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
