import { db } from "@/db";
import { candidates, parties, elections } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Get all candidates
export async function GET() {
  try {
    const candidateList = await db.select({
      candidate_id: candidates.candidateId,
      name: candidates.name,
      email: candidates.email,
      party_id: candidates.partyId,
      election_id: candidates.electionId,
      party_name: parties.partyName,
      election_name: elections.electionName,
    })
    .from(candidates)
    .leftJoin(parties, eq(candidates.partyId, parties.partyId))
    .leftJoin(elections, eq(candidates.electionId, elections.electionId));

    return NextResponse.json({
      candidateList,
    });
  } catch (error: any) {
    console.error("candidateList GET error:", error);
    return NextResponse.json({ candidateList: [] });
  }
}

// Update Candidate
export async function PUT(request: NextRequest) {
  try {
    const { candidate_id, name, email } = await request.json();
    const updateVoter = await db.update(candidates)
      .set({ name, email })
      .where(eq(candidates.candidateId, candidate_id));

    return NextResponse.json({
      updateVoter,
    });
  } catch (error: any) {
    console.error("candidateList PUT error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Candidate
export async function DELETE(request: NextRequest) {
  try {
    const { candidate_id } = await request.json();
    const response = await db.delete(candidates)
      .where(eq(candidates.candidateId, candidate_id));

    return NextResponse.json({
      response,
    });
  } catch (error: any) {
    console.error("candidateList DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add Candidate
export async function POST(request: Request) {
  try {
    const { candidate_name, party_id, election_id, candidate_email } = await request.json();
    const response = await db.insert(candidates).values({
      name: candidate_name,
      partyId: party_id ? parseInt(party_id) : null,
      electionId: election_id ? parseInt(election_id) : null,
      email: candidate_email,
    });

    return NextResponse.json({ message: "Success", response });
  } catch (error: any) {
    console.error("candidateList POST error:", error);
    return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
  }
}

/* --- OLD CODE COMMENTED OUT ---
import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

// GEt all candidates
export async function GET() {
  const candidateList = await query({
    query:
      "SELECT c.*, p.party_name, e.election_name " +
      "FROM candidates AS c " +
      "JOIN parties AS p ON p.party_id = c.party_id " +
      "JOIN elections AS e ON e.election_id = c.election_id",
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
*/