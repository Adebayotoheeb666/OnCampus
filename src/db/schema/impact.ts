import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const impactStories = sqliteTable("impact_stories", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  photoUrl: text("photo_url"),
  sponsorAttribution: text("sponsor_attribution"),
  consentGranted: integer("consent_granted", { mode: "boolean" })
    .notNull()
    .default(false),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }),
});
