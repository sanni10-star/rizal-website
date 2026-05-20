import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { garanties } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Garanties",
  description: "Toutes les garanties RIZAL — climatisation, solaire, piscine, rénovation, traitement d'eau.",
  path: "/garanties",
});

export default function Page() {
  return <LegalShell page={garanties} />;
}
