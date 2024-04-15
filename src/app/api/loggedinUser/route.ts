import { query } from "@/database/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  const name = session?.user?.name;
  const loggedInUser = await query({
    query: `SELECT * FROM voter WHERE username="${name}"`,
    // query: `SELECT * FROM voter WHERE name="John"`,
    values: [],
  });
  return NextResponse.json({
    loggedInUser,
  });
}
