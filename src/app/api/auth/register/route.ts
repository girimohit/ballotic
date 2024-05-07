import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  try {
    const { name, password, email, role, ward_num, district_id } = await request.json();

    await sql`
      INSERT INTO voter (username, password, email, role, ward_number, district_id) 
      VALUES (${name}, ${password}, ${email}, ${role}, ${ward_num}, ${district_id})`;

    return NextResponse.redirect("http://localhost:3000/auth/login");
  } catch (error: any) {
    console.error("Error inserting user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
