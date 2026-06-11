"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const CURRENT_KEY = "rizal_nav_current";
const PREV_KEY = "rizal_nav_prev";

function parentPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length <= 1) return "/";
  return `/${parts.slice(0, -1).join("/")}`;
}

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const current = sessionStorage.getItem(CURRENT_KEY);
    if (current && current !== pathname) {
      sessionStorage.setItem(PREV_KEY, current);
    }
    sessionStorage.setItem(CURRENT_KEY, pathname);
  }, [pathname]);

  const handleBack = useCallback(() => {
    // Historique navigateur : évite un router.push qui peut casser le chargement des chunks client.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    const prev = sessionStorage.getItem(PREV_KEY);
    const target = prev && prev !== pathname ? prev : parentPath(pathname);
    router.push(target);
  }, [pathname, router]);

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-medium text-ink shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md"
    >
      <ArrowLeft className="h-4 w-4" />
      Page précédente
    </button>
  );
}
