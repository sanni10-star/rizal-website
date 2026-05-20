import { NextRequest, NextResponse } from "next/server";
import { QuoteSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { createLead, extractClientMeta } from "@/lib/leads";
import { pushToSheet } from "@/lib/sheets";
import { trackPurchase } from "@/lib/conversions";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = QuoteSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Devis invalide", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const input = parsed.data;
    const meta = extractClientMeta(req.headers);

    // Create a lead first (link to quote)
    const lead = await createLead({
      source: "WHATSAPP_QUOTE",
      firstName: input.firstName ?? null,
      lastName: input.lastName ?? null,
      email: input.email || null,
      phone: input.phone ?? null,
      city: input.city ?? null,
      ip: meta.ip,
      userAgent: meta.userAgent,
      referrer: meta.referrer,
    });

    const quote = await db.quote.create({
      data: {
        leadId: lead.id,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email || undefined,
        phone: input.phone,
        city: input.city,
        source: input.source,
        utm: input.utm ?? undefined,
        itemsCount: input.lines.reduce((s, l) => s + l.qty, 0),
        status: "SENT",
        whatsappSent: true,
        sentAt: new Date(),
        lines: {
          create: input.lines.map((l) => ({
            itemId: l.itemId,
            name: l.name,
            brand: l.brand,
            gammeLabel: l.gammeLabel,
            qty: l.qty,
          })),
        },
      },
    });

    pushToSheet({
      tab: "Quotes",
      payload: {
        id: quote.id,
        createdAt: quote.createdAt.toISOString(),
        leadId: lead.id,
        firstName: input.firstName ?? undefined,
        lastName: input.lastName ?? undefined,
        phone: input.phone ?? undefined,
        email: input.email || undefined,
        city: input.city ?? undefined,
        itemsCount: quote.itemsCount,
        items: input.lines
          .map((l) => `${l.qty}x ${l.brand ?? ""} ${l.name}`.trim())
          .join(" | "),
      },
    }).catch((e) => console.error("sheet push failed", e));

    trackPurchase({
      leadId: lead.id,
      quoteId: quote.id,
      email: input.email || null,
      phone: input.phone ?? null,
      firstName: input.firstName ?? null,
      lastName: input.lastName ?? null,
      city: input.city ?? null,
      clientIp: meta.ip,
      clientUserAgent: meta.userAgent,
      eventSourceUrl: meta.referrer,
    }).catch((e) => console.error("conversion track failed", e));

    return NextResponse.json({ ok: true, quoteId: quote.id, leadId: lead.id });
  } catch (err) {
    console.error("[/api/quote] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
