import { NextRequest, NextResponse } from "next/server";
import { AppointmentSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { createLead, extractClientMeta } from "@/lib/leads";
import { pushToSheet } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = AppointmentSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Demande invalide", issues: parsed.error.flatten() },
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
      city: input.city,
      subject: `Rendez-vous: ${input.type}`,
      message: input.notes,
      ip: meta.ip,
      userAgent: meta.userAgent,
      referrer: meta.referrer,
    });

    const appt = await db.appointment.create({
      data: {
        leadId: lead.id,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email || undefined,
        phone: input.phone,
        city: input.city,
        address: input.address,
        scheduledAt: new Date(input.scheduledAt),
        type: input.type,
        notes: input.notes,
      },
    });

    pushToSheet({
      tab: "Appointments",
      payload: {
        id: appt.id,
        createdAt: appt.createdAt.toISOString(),
        type: appt.type,
        scheduledAt: appt.scheduledAt.toISOString(),
        firstName: appt.firstName,
        lastName: appt.lastName,
        phone: appt.phone,
        email: appt.email ?? undefined,
        city: appt.city,
        notes: appt.notes ?? undefined,
      },
    }).catch((e) => console.error("sheet push failed", e));

    return NextResponse.json({ ok: true, appointmentId: appt.id });
  } catch (err) {
    console.error("[/api/appointment] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
