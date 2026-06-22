import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

try {
  const result = await client.execute("SELECT 1 as test");
  console.log("✅ Connection successful!");
  console.log("Result:", result);
} catch (error) {
  console.error("❌ Connection failed:");
  console.error("Error code:", error.code);
  console.error("Error message:", error.message);
  console.error("Full error:", error);
}
