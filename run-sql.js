import "dotenv/config";
import fs from "fs";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const sql = fs.readFileSync(
  "./drizzle/0000_special_sabra.sql",
  "utf8"
);

await client.executeMultiple(sql);

console.log("Migration applied!");