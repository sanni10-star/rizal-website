import { z } from "zod";

export const ContactSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().max(80).optional(),
  subject: z.string().max(80).optional(),
  message: z.string().max(2000).optional(),
  budget: z.string().max(40).optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
  referrer: z.string().max(500).optional(),
  landingPage: z.string().max(500).optional(),
});
export type ContactInput = z.infer<typeof ContactSchema>;

export const NewsletterSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(80).optional(),
  city: z.string().max(80).optional(),
  source: z.string().max(80).optional(),
});
export type NewsletterInput = z.infer<typeof NewsletterSchema>;

export const QuoteSchema = z.object({
  firstName: z.string().max(80).optional(),
  lastName: z.string().max(80).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().max(80).optional(),
  source: z.string().max(80).optional(),
  utm: z.record(z.string()).optional(),
  lines: z
    .array(
      z.object({
        itemId: z.string().min(1),
        name: z.string().min(1),
        brand: z.string().optional(),
        gammeLabel: z.string().optional(),
        qty: z.number().int().min(1).max(99),
      }),
    )
    .min(1),
});
export type QuoteInput = z.infer<typeof QuoteSchema>;

export const LeadMagnetSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(80).optional(),
  city: z.string().max(80).optional(),
  magnet: z.enum([
    "guide-climatisation",
    "guide-solaire-villa",
    "checklist-renovation",
    "guide-piscine",
  ]),
});
export type LeadMagnetInput = z.infer<typeof LeadMagnetSchema>;

export const CalculatorSchema = z.object({
  type: z.enum(["btu", "solar"]),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(20).optional(),
  result: z.record(z.union([z.string(), z.number()])),
});
export type CalculatorInput = z.infer<typeof CalculatorSchema>;

export const AppointmentSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(1).max(80),
  address: z.string().max(500).optional(),
  scheduledAt: z.string().datetime(),
  type: z.enum([
    "visite_villa",
    "metre_climatisation",
    "etude_solaire",
    "etude_piscine",
  ]),
  notes: z.string().max(1000).optional(),
});
export type AppointmentInput = z.infer<typeof AppointmentSchema>;
