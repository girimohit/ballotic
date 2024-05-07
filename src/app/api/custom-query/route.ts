import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  try {
    const { que } = await request.json();

    const result = await sql`${que}`;

    // Log the result to the console
    console.log("Custom Query Result: ", result);

    return NextResponse.json({ result: result.rows }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
