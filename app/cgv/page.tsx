import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { cgv } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Conditions Générales de Vente",
  description: "CGV — Conditions Générales de Vente RIZAL.",
  path: "/cgv",
});

export default function Page() {
  return <LegalShell page={cgv} />;
}
