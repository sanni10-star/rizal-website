import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { cookies } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de Cookies",
  description: "Cookies utilisés sur rizal.click et gestion de vos préférences.",
  path: "/politique-cookies",
});

export default function Page() {
  return <LegalShell page={cookies} />;
}
