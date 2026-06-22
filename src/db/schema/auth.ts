import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const timestamp = () => integer({ mode: "timestamp_ms" }).notNull();

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  fullName: text("full_name").notNull(),
  passwordHash: text("password_hash"),
  role: text("role", {
    enum: [
      "super_admin",
      "allocation_officer",
      "finance_officer",
      "facilities_staff",
      "security_staff",
      "sponsor",
      "resident",
    ],
  }).notNull(),
  sponsorId: text("sponsor_id"),
  tenantId: text("tenant_id"),
  createdAt: timestamp(),
  updatedAt: timestamp(),
});

export const auditLog = sqliteTable("audit_log", {
  id: text("id").primaryKey(),
  actorId: text("actor_id"),
  action: text("action").notNull(),
  targetEntity: text("target_entity").notNull(),
  targetId: text("target_id"),
  metadata: text("metadata"),
  createdAt: timestamp(),
});
