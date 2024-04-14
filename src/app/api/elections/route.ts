import { query } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  const elections = await query({
    query: "SELECT * FROM election",
    values: [],
  });
  return NextResponse.json({
    elections,
  });
}


