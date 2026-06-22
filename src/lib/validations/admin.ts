import { z } from "zod";

// Allocation actions
export const allocateManuallySchema = z.object({
  applicantId: z.string().min(1),
  bedId: z.string().min(1),
  notes: z.string().max(500).optional(),
  performedBy: z.string().default("admin"),
});

export const rejectApplicantSchema = z.object({
  applicantId: z.string().min(1),
  reason: z.string().min(10, "Rejection reason required").max(500),
  performedBy: z.string().default("admin"),
});

export const updateApplicantStatusSchema = z.object({
  applicantId: z.string().min(1),
  status: z.enum(["under_review", "rejected", "waitlisted"]),
  notes: z.string().max(500),
  performedBy: z.string().default("admin"),
});

// Sponsor CRM
export const updateSponsorPipelineSchema = z.object({
  sponsorId: z.string().min(1),
  status: z.enum(["prospect", "contacted", "committed", "active", "lapsed"]),
});

// Maintenance admin
export const updateMaintenanceStatusSchema = z.object({
  requestId: z.string().min(1),
  status: z.enum(["assigned", "in_progress", "resolved"]),
  assignedTo: z.string().min(1, "Assignee required"),
});

// Finance
export const addOpexEntrySchema = z.object({
  category: z.string().min(1, "Category required"),
  description: z.string().max(500).optional(),
  amount: z.number().positive("Amount must be positive"),
  incurredDate: z.string().date("Valid date required"),
  reference: z.string().optional(),
});

// Bed inventory
export const updateBedStatusSchema = z.object({
  bedId: z.string().min(1),
  status: z.enum(["available", "sponsored", "occupied", "maintenance"]),
});

export type AllocateManuallyInput = z.infer<typeof allocateManuallySchema>;
export type RejectApplicantInput = z.infer<typeof rejectApplicantSchema>;
export type UpdateApplicantStatusInput = z.infer<typeof updateApplicantStatusSchema>;
export type UpdateSponsorPipelineInput = z.infer<typeof updateSponsorPipelineSchema>;
export type UpdateMaintenanceStatusInput = z.infer<typeof updateMaintenanceStatusSchema>;
export type AddOpexEntryInput = z.infer<typeof addOpexEntrySchema>;
export type UpdateBedStatusInput = z.infer<typeof updateBedStatusSchema>;
