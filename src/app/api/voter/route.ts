import { query } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  const elections = await query({
    query: "SELECT * FROM voter WHERE name='John' AND age=32",
    values: [],
  });
  return NextResponse.json({
    elections,
  });
}
