import { NextRequest, NextResponse } from "next/server";
import { CalculatorSchema } from "@/lib/validation";
import { createLead, extractClientMeta } from "@/lib/leads";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = CalculatorSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Donnees invalides" },
        { status: 400 },
      );
    }
    const { type, email, phone, result } = parsed.data;
    const meta = extractClientMeta(req.headers);

    if (email || phone) {
      await createLead({
        source: type === "btu" ? "BTU_CALCULATOR" : "SOLAR_CALCULATOR",
        email: email || null,
        phone: phone ?? null,
        message: `Resultat ${type}: ${JSON.stringify(result)}`,
        ip: meta.ip,
        userAgent: meta.userAgent,
        referrer: meta.referrer,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/calculator] error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
