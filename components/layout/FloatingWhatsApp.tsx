"use client";

import { MessageCircle } from "lucide-react";
import { whatsappContactUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappContactUrl("expert")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter RIZAL sur WhatsApp"
      className="group fixed bottom-6 right-6 z-30 inline-flex items-center gap-2.5 rounded-full bg-wa px-5 py-3.5 font-semibold text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-105 hover:bg-emerald-600"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </span>
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm sm:inline">Parler à un Expert</span>
    </a>
  );
}
