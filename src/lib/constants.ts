export const SPONSORSHIP_TIERS = {
  full_bed: {
    label: "Full Bed Sponsorship",
    description: "Fund an entire bed for one academic session for a 100L student.",
    amountKobo: 350_000_00,
  },
  partial: {
    label: "Partial Sponsorship",
    description: "Contribute toward a bed — every amount helps reach the funding goal.",
    amountKobo: 100_000_00,
  },
  maintenance_sub: {
    label: "Maintenance Subscription",
    description: "Annual recurring support for upkeep, utilities, and facilities.",
    amountKobo: 50_000_00,
    recurring: true,
    recurrenceInterval: "annual" as const,
  },
} as const;

export type SponsorshipTier = keyof typeof SPONSORSHIP_TIERS;

export const CAMPAIGN_TARGET_BEDS = 20;

export const SPONSOR_PIPELINE_STAGES = [
  "prospect",
  "contacted",
  "committed",
  "active",
  "lapsed",
] as const;

/** Paid-bed rent per academic session (kobo) */
export const PAID_BED_RENT_KOBO = 180_000_00;
export const PAID_BED_DEPOSIT_KOBO = 50_000_00;

/** Default academic session length in months */
export const SESSION_MONTHS = 9;

export const APPLICANT_STATUSES = [
  "submitted",
  "under_review",
  "allocated",
  "rejected",
  "waitlisted",
] as const;

export const BED_STATUSES = [
  "available",
  "sponsored",
  "occupied",
  "maintenance",
] as const;
