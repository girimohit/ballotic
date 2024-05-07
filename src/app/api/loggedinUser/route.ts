import { query } from "@/database/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const session = await getServerSession();
    const name = session?.user?.name;

    const loggedInUserResult = await sql`SELECT * FROM voter WHERE username = ${name}`;

    const loggedInUser = loggedInUserResult.rows;

    return NextResponse.json({ loggedInUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
