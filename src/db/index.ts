import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Initialize Neon serverless SQL connection using the environment variable
const sql = neon(process.env.DATABASE_URL!);

// Initialize Drizzle client mapped to the pg-core schemas
export const db = drizzle(sql, { schema });
