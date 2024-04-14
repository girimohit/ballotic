import { NodeNextResponse } from "next/dist/server/base-http/node";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    project: "DBMS By Hema Ma'am",
  });
}


export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({
    data,
  });
}
