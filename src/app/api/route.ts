import { NodeNextResponse } from "next/dist/server/base-http/node";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({
    data,
  });
}

export async function GET(request: NextRequest) {
  try {
    const result = await sql`select * from voter`;
    return NextResponse.json({ result: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
