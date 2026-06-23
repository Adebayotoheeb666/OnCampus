import { nanoid } from "nanoid";
import { db } from "@/db";
import { users } from "@/db/schema";

async function seed() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@oncampus.ng";

  const [existingAdmin] = await db
    .select()
    .from(users)
    .where((user) => user.email === adminEmail)
    .limit(1)
    .catch(() => []);

  if (!existingAdmin) {
    await db.insert(users).values({
      id: `user_${nanoid(12)}`,
      email: adminEmail,
      fullName: "Administrator",
      role: "super_admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
