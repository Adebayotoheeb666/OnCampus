import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { beds } from "./inventory";

const timestamp = () => integer({ mode: "timestamp_ms" }).notNull();

export const applicants = sqliteTable("applicants", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  matricOrJambNo: text("matric_or_jamb_no").notNull(),
  level: text("level").notNull(),
  gender: text("gender").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  stateOfOrigin: text("state_of_origin"),
  needScore: integer("need_score"),
  needAssessmentJson: text("need_assessment_json"),
  applicationType: text("application_type", {
    enum: ["free_bed", "paid_bed"],
  }).notNull(),
  status: text("status", {
    enum: ["submitted", "under_review", "allocated", "rejected", "waitlisted"],
  }).default("submitted"),
  createdAt: timestamp(),
});

export const tenants = sqliteTable("tenants", {
  id: text("id").primaryKey(),
  applicantId: text("applicant_id")
    .notNull()
    .references(() => applicants.id),
  bedId: text("bed_id")
    .notNull()
    .references(() => beds.id),
  sessionStart: integer("session_start", { mode: "timestamp_ms" }).notNull(),
  sessionEnd: integer("session_end", { mode: "timestamp_ms" }).notNull(),
  tenantType: text("tenant_type", { enum: ["sponsored", "paid"] }).notNull(),
  status: text("status", {
    enum: ["active", "checked_out", "defaulted"],
  }).default("active"),
  createdAt: timestamp(),
});

export const allocationAuditLog = sqliteTable("allocation_audit_log", {
  id: text("id").primaryKey(),
  applicantId: text("applicant_id")
    .notNull()
    .references(() => applicants.id),
  bedId: text("bed_id").references(() => beds.id),
  action: text("action", {
    enum: ["scored", "allocated", "rejected", "waitlisted"],
  }).notNull(),
  performedBy: text("performed_by"),
  notes: text("notes"),
  createdAt: timestamp(),
});
