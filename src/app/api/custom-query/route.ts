import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { que } = await request.json();
  const custom_query = await query({
    query: `${que}`,
  });
  // console.log("Custom Query: ");
  console.log(custom_query);
  return Response.json(custom_query);
}
