import { NextRequest, NextResponse } from "next/server";
import { ContactSchema } from "@/lib/validation";
import { createLead, extractClientMeta } from "@/lib/leads";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = ContactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const input = parsed.data;
    const meta = extractClientMeta(req.headers);

    const lead = await createLead({
      source: "CONTACT_FORM",
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email || null,
      phone: input.phone,
      city: input.city ?? null,
      subject: input.subject ?? null,
      message: input.message ?? null,
      budget: input.budget ?? null,
      utm: input.utm,
      referrer: input.referrer ?? meta.referrer,
      landingPage: input.landingPage ?? null,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error("[/api/contact] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
