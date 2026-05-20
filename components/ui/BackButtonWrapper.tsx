"use client";

import { usePathname } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";

export function BackButtonWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="fixed left-4 top-20 z-20 md:left-6 md:top-24">
      <BackButton />
    </div>
  );
}
