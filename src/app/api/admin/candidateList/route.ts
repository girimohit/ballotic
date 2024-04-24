import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

// GEt all candidates
export async function GET() {
  const candidateList = await query({
    // query: "SELECT v.*, d.district_name FROM voter AS v JOIN districts AS d ON v.district_id = d.district_id;",
    query:
      "SELECT c.*, p.party_name, e.election_name " +
      "FROM candidates AS c " +
      "JOIN parties AS p ON p.party_id = c.party_id " +
      "JOIN elections AS e ON e.election_id = c.election_id",
    // values: [],
  });
  return NextResponse.json({
    candidateList,
  });
}

// Update Candidate
export async function PUT(request: NextRequest) {
  const { candidate_id, name, email } = await request.json();
  const updateVoter = await query({
    query:
      `UPDATE candidates ` +
      `SET name='${name}', email ='${email}' ` +
      `WHERE candidate_id = '${candidate_id}'`,
  });
  return NextResponse.json({
    updateVoter,
  });
}

// Delete candidate
export async function DELETE(request: NextRequest) {
  const { candidate_id } = await request.json();
  const response = await query({
    query: `DELETE FROM candidates WHERE candidate_id = ${candidate_id}`,
  });
  return NextResponse.json({
    response,
  });
}

export async function POST(request: Request) {
  try {
    const { candidate_name, party_id, election_id, candidate_email } = await request.json();
    console.log(candidate_name, party_id, election_id, candidate_email);
    const response = await query({
      query: `INSERT INTO candidates (name, party_id, election_id, email) VALUES ('${candidate_name}', ${party_id}, ${election_id}, '${candidate_email}')`,
    });
    return NextResponse.redirect("/");
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Success" });
}
