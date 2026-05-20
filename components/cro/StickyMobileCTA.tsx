"use client";

import { Phone, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/stores/cart";
import { whatsappContactUrl } from "@/lib/whatsapp";
import { SITE } from "@/lib/site";

export function StickyMobileCTA() {
  const open = useCart((s) => s.open);
  const lines = useCart((s) => s.lines);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-3 gap-px border-t border-ink/10 bg-white/95 backdrop-blur md:hidden">
      <a
        href={`tel:+${SITE.whatsappPhone}`}
        className="flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold uppercase tracking-widest2 text-ink"
      >
        <Phone className="h-4 w-4" />
        Appeler
      </a>
      <a
        href={whatsappContactUrl("expert")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 bg-wa py-2.5 text-[10px] font-semibold uppercase tracking-widest2 text-white"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
      <button
        onClick={open}
        className="relative flex flex-col items-center justify-center gap-1 bg-sand-400 py-2.5 text-[10px] font-semibold uppercase tracking-widest2 text-ink"
      >
        <ShoppingBag className="h-4 w-4" />
        Mon Devis
        {count > 0 ? (
          <span className="absolute right-3 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[9px] text-sand-300">
            {count}
          </span>
        ) : null}
      </button>
    </div>
  );
}
