import { db } from "./db";
import { Resend } from "resend";
import type { LeadSource } from "@prisma/client";
import { pushToSheet } from "./sheets";
import { trackLead } from "./conversions";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

type CreateLeadInput = {
  source: LeadSource;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  subject?: string | null;
  message?: string | null;
  budget?: string | null;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  referrer?: string | null;
  landingPage?: string | null;
  ip?: string | null;
  userAgent?: string | null;
};

// Lead scoring: heuristic 0-100
function computeLeadScore(input: CreateLeadInput): number {
  let score = 0;
  if (input.phone) score += 20;
  if (input.email) score += 10;
  if (input.firstName && input.lastName) score += 10;
  if (input.city) score += 5;
  if (input.budget && input.budget !== "<50k") score += 15;
  if (input.budget === ">500k") score += 10;
  if (input.subject) score += 5;
  if (input.message && input.message.length > 30) score += 10;
  if (
    input.source === "WHATSAPP_QUOTE" ||
    input.source === "CONTACT_FORM" ||
    input.source === "BTU_CALCULATOR" ||
    input.source === "SOLAR_CALCULATOR"
  )
    score += 15;
  return Math.min(100, score);
}

export async function createLead(input: CreateLeadInput) {
  const score = computeLeadScore(input);
  const lead = await db.lead.create({
    data: {
      source: input.source,
      firstName: input.firstName ?? undefined,
      lastName: input.lastName ?? undefined,
      email: input.email ?? undefined,
      phone: input.phone ?? undefined,
      city: input.city ?? undefined,
      subject: input.subject ?? undefined,
      message: input.message ?? undefined,
      budget: input.budget ?? undefined,
      utmSource: input.utm?.source,
      utmMedium: input.utm?.medium,
      utmCampaign: input.utm?.campaign,
      utmTerm: input.utm?.term,
      utmContent: input.utm?.content,
      referrer: input.referrer ?? undefined,
      landingPage: input.landingPage ?? undefined,
      ip: input.ip ?? undefined,
      userAgent: input.userAgent ?? undefined,
      score,
    },
  });

  // Fire-and-forget side-effects (never block the user response)
  notifySalesTeam(lead.id).catch((e) => console.error("notify failed", e));

  pushToSheet({
    tab: "Leads",
    payload: {
      id: lead.id,
      createdAt: lead.createdAt.toISOString(),
      source: lead.source,
      score: lead.score,
      firstName: lead.firstName ?? undefined,
      lastName: lead.lastName ?? undefined,
      phone: lead.phone ?? undefined,
      email: lead.email ?? undefined,
      city: lead.city ?? undefined,
      subject: lead.subject ?? undefined,
      message: lead.message ?? undefined,
      budget: lead.budget ?? undefined,
      utmSource: lead.utmSource ?? undefined,
      utmCampaign: lead.utmCampaign ?? undefined,
      landingPage: lead.landingPage ?? undefined,
    },
  }).catch((e) => console.error("sheet push failed", e));

  trackLead({
    leadId: lead.id,
    email: lead.email,
    phone: lead.phone,
    firstName: lead.firstName,
    lastName: lead.lastName,
    city: lead.city,
    clientIp: input.ip ?? null,
    clientUserAgent: input.userAgent ?? null,
    eventSourceUrl: input.landingPage ?? null,
  }).catch((e) => console.error("conversion track failed", e));

  return lead;
}

async function notifySalesTeam(leadId: string) {
  if (!resend) return;
  const lead = await db.lead.findUnique({ where: { id: leadId } });
  if (!lead) return;

  await resend.emails.send({
    from: "RIZAL <leads@rizal.click>",
    to: process.env.SALES_NOTIFY_EMAIL ?? "entrepriserizal@gmail.com",
    subject: `[RIZAL] Nouveau lead - ${lead.source} - score ${lead.score}`,
    html: `
      <h2>Nouveau lead RIZAL</h2>
      <p><strong>Source:</strong> ${lead.source}</p>
      <p><strong>Score:</strong> ${lead.score}/100</p>
      <p><strong>Nom:</strong> ${lead.firstName ?? ""} ${lead.lastName ?? ""}</p>
      <p><strong>Telephone:</strong> ${lead.phone ?? "-"}</p>
      <p><strong>Email:</strong> ${lead.email ?? "-"}</p>
      <p><strong>Ville:</strong> ${lead.city ?? "-"}</p>
      <p><strong>Sujet:</strong> ${lead.subject ?? "-"}</p>
      <p><strong>Message:</strong> ${lead.message ?? "-"}</p>
      <p><strong>UTM:</strong> ${lead.utmSource ?? "-"} / ${lead.utmCampaign ?? "-"}</p>
      <hr/>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/leads/${lead.id}">Voir dans l'admin</a></p>
    `,
  });
}

export function extractClientMeta(headers: Headers) {
  return {
    ip:
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headers.get("x-real-ip") ??
      null,
    userAgent: headers.get("user-agent") ?? null,
    referrer: headers.get("referer") ?? null,
  };
}
