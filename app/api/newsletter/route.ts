import { NextRequest, NextResponse } from "next/server";
import { NewsletterSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { pushToSheet } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = NewsletterSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Email invalide" },
        { status: 400 },
      );
    }
    const { email, firstName, city, source } = parsed.data;

    const sub = await db.subscriber.upsert({
      where: { email: email.toLowerCase() },
      update: { firstName, city, source, unsubscribedAt: null },
      create: {
        email: email.toLowerCase(),
        firstName,
        city,
        source: source ?? "footer",
        consent: true,
      },
    });

    pushToSheet({
      tab: "Newsletter",
      payload: {
        id: sub.id,
        createdAt: sub.createdAt.toISOString(),
        email: sub.email,
        firstName: sub.firstName ?? undefined,
        city: sub.city ?? undefined,
        source: sub.source ?? undefined,
      },
    }).catch((e) => console.error("sheet push failed", e));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/newsletter] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
