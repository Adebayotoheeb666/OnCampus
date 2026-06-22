import { z } from "zod";

export const maintenanceRequestSchema = z.object({
  tenantId: z.string().min(1),
  category: z.enum(["plumbing", "electrical", "structural", "other"]),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  photoBase64: z.string().optional(),
});

export const laundromatBookingSchema = z.object({
  tenantId: z.string().min(1),
  machineId: z.string().min(1),
  slotStart: z.string().datetime("Valid ISO date required"),
}).refine(
  (data) => new Date(data.slotStart) > new Date(),
  { message: "Booking must be in the future", path: ["slotStart"] },
);

export const visitorRegistrationSchema = z.object({
  tenantId: z.string().min(1),
  visitorName: z.string().min(2, "Visitor name required").max(100),
  visitorPhone: z.string().regex(/^\+?[\d\s\-()]{10,}$/, "Valid phone number required").optional(),
  expectedArrival: z.string().datetime("Valid ISO date required"),
}).refine(
  (data) => new Date(data.expectedArrival) > new Date(),
  { message: "Expected arrival must be in the future", path: ["expectedArrival"] },
);

export const maintenanceUpdateSchema = z.object({
  requestId: z.string().min(1),
  status: z.enum(["assigned", "in_progress", "resolved"]),
  assignedTo: z.string().optional(),
});

export type MaintenanceRequestInput = z.infer<typeof maintenanceRequestSchema>;
export type LaundromatBookingInput = z.infer<typeof laundromatBookingSchema>;
export type VisitorRegistrationInput = z.infer<typeof visitorRegistrationSchema>;
export type MaintenanceUpdateInput = z.infer<typeof maintenanceUpdateSchema>;
