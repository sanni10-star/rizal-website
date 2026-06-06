"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HeroStatic } from "@/components/hero/HeroStatic";

const HeroCarousel = dynamic(
  () =>
    import("@/components/hero/HeroCarousel").then((m) => m.HeroCarousel),
  { ssr: false },
);

export function HeroMount() {
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const enable = () => setInteractive(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = setTimeout(enable, 800);
    return () => clearTimeout(timer);
  }, []);

  if (!interactive) {
    return <HeroStatic />;
  }

  return <HeroCarousel />;
}
