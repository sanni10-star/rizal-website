import { NextRequest, NextResponse } from "next/server";
import { LeadMagnetSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { createLead, extractClientMeta } from "@/lib/leads";

const MAGNET_FILES: Record<string, { url: string; title: string }> = {
  "guide-climatisation": {
    url: "/lead-magnets/rizal-guide-climatisation-villa-2026.pdf",
    title: "Guide RIZAL : Choisir la climatisation de votre villa au Maroc 2026",
  },
  "guide-solaire-villa": {
    url: "/lead-magnets/rizal-guide-solaire-villa-2026.pdf",
    title: "Guide RIZAL : L'autonomie solaire de votre villa marocaine",
  },
  "checklist-renovation": {
    url: "/lead-magnets/rizal-checklist-renovation-villa.pdf",
    title: "Checklist RIZAL : 47 points avant de rénover votre villa",
  },
  "guide-piscine": {
    url: "/lead-magnets/rizal-guide-piscine-villa.pdf",
    title: "Guide RIZAL : La piscine de villa idéale au Maroc",
  },
};

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = LeadMagnetSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Email invalide" },
        { status: 400 },
      );
    }
    const { email, firstName, city, magnet } = parsed.data;
    const file = MAGNET_FILES[magnet];
    if (!file) {
      return NextResponse.json({ ok: false, error: "Guide inconnu" }, { status: 404 });
    }

    const meta = extractClientMeta(req.headers);

    await createLead({
      source: "LEAD_MAGNET",
      firstName: firstName ?? null,
      email,
      city: city ?? null,
      subject: magnet,
      ip: meta.ip,
      userAgent: meta.userAgent,
      referrer: meta.referrer,
    });

    await db.subscriber.upsert({
      where: { email: email.toLowerCase() },
      update: { firstName, city, source: `lead-magnet:${magnet}` },
      create: {
        email: email.toLowerCase(),
        firstName,
        city,
        source: `lead-magnet:${magnet}`,
        consent: true,
      },
    });

    return NextResponse.json({ ok: true, file });
  } catch (err) {
    console.error("[/api/lead-magnet] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
