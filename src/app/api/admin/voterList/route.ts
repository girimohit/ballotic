import { query } from "@/database/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Get all voters
export async function GET() {
  try {
    const session = await getServerSession();
    const name = session?.user?.name;
    const voterListResult = await sql`
    SELECT v.*, d.district_name, w.ward_name,
    CONCAT(
        FLOOR(EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM dob)), 
        'y ', 
        FLOOR(EXTRACT(DAY FROM AGE(CURRENT_DATE, dob)) / 30), 
        'm'
    ) AS age_years_months
    FROM voter AS v 
    JOIN districts AS d ON v.district_id = d.district_id 
    JOIN wards AS w ON v.ward_number = w.ward_number`;

    const voterList = voterListResult.rows;

    return NextResponse.json({ voterList }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Voter
export async function PUT(request: NextRequest) {
  try {
    const { voter_id, username, email } = await request.json();

    await sql`
      UPDATE voter 
      SET username = ${username}, email = ${email} 
      WHERE voter_id = ${voter_id}
    `;

    return NextResponse.json({ message: "Voter updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Voter
export async function DELETE(request: NextRequest) {
  try {
    const { voter_id } = await request.json();
    console.log("voter id passed in delte method  : ")
    console.log(voter_id);
    await sql`
      DELETE FROM voter 
      WHERE voter_id = ${voter_id}
    `;

    return NextResponse.json({ message: "Voter deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Insert Voter
export async function POST(request: NextRequest) {
  try {
    const { name, password, email, role, ward_num, district_id } = await request.json();

    await sql`
      INSERT INTO voter (username, password, email, role, ward_number, district_id) 
      VALUES (${name}, ${password}, ${email}, ${role}, ${ward_num}, ${district_id})
    `;

    return NextResponse.redirect("http://localhost:3000/auth/login");
  } catch (error: any) {
    console.error("Error inserting user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
