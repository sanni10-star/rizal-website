import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-brand",
            invert ? "text-sand-400" : "text-sand-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl leading-tight md:text-5xl",
          invert ? "text-bone" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base md:text-lg",
            invert ? "text-bone/80" : "text-ink/70",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
