import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const timestamp = () => integer({ mode: "timestamp_ms" }).notNull();

export const otpCodes = sqliteTable("otp_codes", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  code: text("code").notNull(),
  purpose: text("purpose", { enum: ["sponsor_login", "resident_login"] }).notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  usedAt: integer("used_at", { mode: "timestamp_ms" }),
  createdAt: timestamp(),
});
