import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "ghost" | "wa" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-400 focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  gold: "bg-sand-400 text-ink hover:bg-sand-300 shadow-lg shadow-sand-900/10",
  ghost:
    "border border-bone/40 bg-transparent text-bone hover:bg-bone/10 backdrop-blur",
  wa: "bg-wa text-white hover:bg-emerald-600 shadow-xl shadow-emerald-900/20",
  dark: "bg-ink text-bone hover:bg-ink/85",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "gold", size = "md", ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);
ButtonLink.displayName = "ButtonLink";
