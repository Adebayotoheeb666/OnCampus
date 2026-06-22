import { z } from "zod";

export const sponsorDetailsSchema = z.object({
  type: z.enum(["individual", "organization"]),
  fullName: z.string().min(2, "Name is required"),
  organizationName: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required").optional().or(z.literal("")),
  isDiaspora: z.boolean().default(false),
});

export const pledgeCheckoutSchema = sponsorDetailsSchema.extend({
  bedId: z.string().min(1),
  tier: z.enum(["full_bed", "partial", "maintenance_sub"]),
  recurring: z.boolean().default(false),
});

export type SponsorDetailsInput = z.infer<typeof sponsorDetailsSchema>;
export type PledgeCheckoutInput = z.infer<typeof pledgeCheckoutSchema>;
