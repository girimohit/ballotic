import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Get all candidates
export async function GET() {
  try {
    const candidateListResult = await sql`
      SELECT c.*, p.party_name, e.election_name 
      FROM candidates AS c 
      JOIN parties AS p ON p.party_id = c.party_id 
      JOIN elections AS e ON e.election_id = c.election_id
    `;

    const candidateList = candidateListResult.rows;

    return NextResponse.json({ candidateList }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Candidate
export async function PUT(request: NextRequest) {
  try {
    const { candidate_id, name, email } = await request.json();

    const updateCandidateResult = await sql`
      UPDATE candidates 
      SET name = ${name}, email = ${email} 
      WHERE candidate_id = ${candidate_id}
    `;

    return NextResponse.json({ updateCandidateResult });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Candidate
export async function DELETE(request: NextRequest) {
  try {
    const { candidate_id } = await request.json();

    const deleteResult = await sql`DELETE FROM candidates WHERE candidate_id = $1`;

    return NextResponse.json({ deleteResult });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create Candidate
export async function POST(request: NextRequest) {
  try {
    const { candidate_name, party_id, election_id, candidate_email } = await request.json();

    const insertResult = await sql`
      INSERT INTO candidates (name, party_id, election_id, email) 
      VALUES ($1, $2, $3, $4)
    `;

    return NextResponse.redirect("/");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
