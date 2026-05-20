"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

const sizeWord = {
  sm: "text-[1.25rem] sm:text-[1.4rem]",
  md: "text-[1.45rem] sm:text-[1.65rem]",
  lg: "text-[1.85rem] sm:text-3xl md:text-[2.35rem]",
} as const;

const sizeIcon = {
  sm: "h-[1.85rem] w-[0.85rem] sm:h-[2rem]",
  md: "h-[2.1rem] w-[0.95rem] sm:h-[2.35rem]",
  lg: "h-[2.65rem] w-[1.05rem] sm:h-[3rem]",
} as const;

/** Minimal geometric mark: precision pillar + abstract R / lintel (architecture). */
function LogoMark({
  gradId,
  className,
  variant,
}: {
  gradId: string;
  className?: string;
  variant: "dark" | "light" | "gold";
}) {
  const stroke =
    variant === "light"
      ? `url(#${gradId}-hero)`
      : variant === "gold"
        ? `url(#${gradId}-hero)`
        : `url(#${gradId}-nav)`;

  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 20 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={`${gradId}-hero`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#D35400" />
          <stop offset="40%" stopColor="#E67E22" />
          <stop offset="75%" stopColor="#EB984E" />
          <stop offset="100%" stopColor="#C9A96E" />
        </linearGradient>
        <linearGradient
          id={`${gradId}-nav`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#7E2E00" />
          <stop offset="35%" stopColor="#D35400" />
          <stop offset="70%" stopColor="#E67E22" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>
      </defs>
      <path
        d="M6 4V48"
        stroke={stroke}
        strokeWidth="1.35"
        strokeLinecap="round"
        className="opacity-95 transition-[stroke-opacity] duration-500 group-hover/logo:opacity-100"
      />
      <path
        d="M6 4H13.5C16.5 4 17.5 6.2 17.5 9.2C17.5 12.5 15.8 15 12.5 15H6M12 15L17.5 34"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-95 transition-[stroke-opacity] duration-500 group-hover/logo:opacity-100"
      />
      <path
        d="M6 4H16"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity={0.85}
        className="transition-opacity duration-500 group-hover/logo:opacity-100"
      />
    </svg>
  );
}

/**
 * Maison de luxe wordmark: Playfair Display, copper-leaf gradient clip,
 * airy tracking, geometric monogram, refined hover (glow + tracking).
 */
export function Logo({
  className,
  variant = "dark",
  withTagline = false,
  size = "md",
}: {
  className?: string;
  variant?: "dark" | "light" | "gold";
  withTagline?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `rizal-luxe-${uid}`;

  const wordGradient =
    variant === "light" || variant === "gold"
      ? "bg-gradient-luxe-hero bg-[length:160%_auto] bg-clip-text text-transparent"
      : "bg-gradient-luxe-nav bg-[length:150%_auto] bg-clip-text text-transparent";

  const taglineClass =
    variant === "light" || variant === "gold"
      ? "text-bone/80"
      : "text-ink/55";

  return (
    <span className={cn("inline-flex flex-col items-start", className)}>
      <span className="inline-flex items-center gap-2.5 sm:gap-3.5">
        <LogoMark
          gradId={gradId}
          className={sizeIcon[size]}
          variant={variant}
        />
        <span
          className={cn(
            "font-logo font-semibold leading-[1.05] tracking-[0.2em]",
            "transition-[letter-spacing,filter,text-shadow] duration-500 ease-out",
            "group-hover/logo:tracking-[calc(0.2em+1px)]",
            variant === "light" || variant === "gold"
              ? "group-hover/logo:drop-shadow-[0_0_18px_rgba(230,126,34,0.55)] group-hover/logo:[text-shadow:0_0_24px_rgba(230,126,34,0.35)]"
              : "group-hover/logo:drop-shadow-[0_0_14px_rgba(211,84,0,0.4)] group-hover/logo:[text-shadow:0_0_20px_rgba(230,126,34,0.25)]",
            sizeWord[size],
            wordGradient,
          )}
        >
          RIZAL
        </span>
      </span>
      <span
        className={cn(
          "mt-2 h-px rounded-full bg-gradient-to-r sm:mt-2.5",
          variant === "light" || variant === "gold"
            ? "w-14 from-[#E67E22]/90 via-[#C9A96E]/70 to-transparent sm:w-16"
            : "w-12 from-[#D35400]/85 via-[#E67E22]/50 to-transparent sm:w-14",
          size === "lg" ? "w-16 sm:w-20" : "",
        )}
        aria-hidden
      />
      {withTagline ? (
        <span
          className={cn(
            "mt-2 max-w-[15rem] font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.18em] sm:text-[11px]",
            taglineClass,
          )}
        >
          N°1 au Maroc · Luxury home &amp; hardware
        </span>
      ) : null}
    </span>
  );
}
