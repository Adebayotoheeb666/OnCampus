import { db } from "@/db";

async function seed() {
  // Seed script is intentionally empty.
  // All data should be created through the application's API and interfaces,
  // not through database seeds. Mock data has been removed.
  console.log("Seed complete: No mock data is seeded.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
