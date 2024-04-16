import { query } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  const voterList = await query({
    query: "SELECT v.*, d.district_name FROM voter AS v JOIN districts AS d ON v.district_id = d.district_id;",
  });
  return NextResponse.json({
    voterList,
  });
}
