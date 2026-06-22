import { db } from "./src/db/index.ts";
import { applicants } from "./src/db/schema/index.ts";

try {
  const result = await db.select().from(applicants).limit(1);
  console.log("[v0] Database query successful, got results:", result.length);
} catch (err) {
  console.error("[v0] Database error:", err.message);
}
