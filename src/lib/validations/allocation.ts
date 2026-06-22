import { z } from "zod";

export const needAssessmentSchema = z.object({
  incomeBracket: z.enum(["below_50k", "50k_100k", "100k_200k", "above_200k"]),
  distanceCategory: z.enum(["onsite", "nearby", "far"]),
  guardianStatus: z.enum(["orphan", "single_parent", "both_parents"]),
});

export const applicationSchema = z
  .object({
    fullName: z.string().min(2),
    matricOrJambNo: z.string().min(5),
    level: z.string().min(2),
    gender: z.enum(["male", "female"]),
    phone: z.string().min(10),
    email: z.string().email(),
    stateOfOrigin: z.string().optional(),
    applicationType: z.enum(["free_bed", "paid_bed"]),
    needAssessment: needAssessmentSchema.optional(),
  })
  .refine(
    (data) => data.applicationType !== "free_bed" || data.level === "100L",
    { message: "Free bed sponsorship is only available for 100L students", path: ["level"] },
  )
  .refine(
    (data) => data.applicationType !== "free_bed" || data.needAssessment !== undefined,
    { message: "Need assessment is required for free bed applications", path: ["needAssessment"] },
  );

export const applicationLookupSchema = z.object({
  reference: z.string().optional(),
  email: z.string().email().optional(),
  matricOrJambNo: z.string().optional(),
}).refine(
  (data) => data.reference || (data.email && data.matricOrJambNo),
  { message: "Provide a reference number or email + JAMB/matric number" },
);

export const tenantLookupSchema = z.object({
  email: z.string().email(),
  matricOrJambNo: z.string().min(5),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
export type NeedAssessment = z.infer<typeof needAssessmentSchema>;
