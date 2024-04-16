import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const voterList = await query({
    query:
      "SELECT v.*, d.district_name FROM voter AS v JOIN districts AS d ON v.district_id = d.district_id;",
  });
  return NextResponse.json({
    voterList,
  });
}

export async function DELETE(request: NextRequest) {
  const { voter_id } = await request.json();
  const response = await query({
    query: `DELETE FROM voterd WHERE voter_id = ${voter_id}`,
  });
  return NextResponse.json({
    response,
  });
}
