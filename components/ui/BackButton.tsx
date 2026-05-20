"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-medium text-ink shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md"
    >
      <ArrowLeft className="h-4 w-4" />
      Retour
    </button>
  );
}
