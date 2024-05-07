import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Get all elections
export async function GET() {
  try {
    const electionListResult = await sql`
      SELECT e.*, 
        COALESCE(w.ward_name, 'null') AS ward_name, 
        COALESCE(d.district_name, 'null') AS district_name 
      FROM elections AS e 
      LEFT JOIN wards AS w ON w.ward_number = e.ward_number 
      LEFT JOIN districts AS d ON d.district_id = e.district_id
    `;

    const electionList = electionListResult.rows;

    return NextResponse.json({ electionList }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Election
export async function PUT(request: NextRequest) {
  try {
    const { election_id, election_name, current_status } = await request.json();

    const updateElectionResult = await sql`
      UPDATE elections 
      SET election_name = ${election_name}, current_status = ${current_status} 
      WHERE election_id = ${election_id}
    `;

    return NextResponse.json({ updateElectionResult });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Election
export async function DELETE(request: NextRequest) {
  try {
    const { election_id } = await request.json();

    const deleteResult = await sql`DELETE FROM elections WHERE election_id = ${election_id}`;

    return NextResponse.json({ deleteResult });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create Election
export async function POST(request: NextRequest) {
  try {
    const { election_name, end_date, ward_num, district_id } = await request.json();

    const insertResult = await sql`
      INSERT INTO elections (election_name, end_date, ward_number, district_id) 
      VALUES (${election_name}, ${end_date}, ${ward_num}, ${district_id})
    `;

    return NextResponse.redirect("http://localhost:3000/auth/login");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
