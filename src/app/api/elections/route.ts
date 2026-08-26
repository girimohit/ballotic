import { db } from "@/db";
import { elections as electionsTable, voters } from "@/db/schema";
import { eq, or, isNull } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();
    const username = session?.user?.name;

    let electionsList = [];

    if (username) {
      // 1. Fetch user's districtId
      const userRows = await db.select().from(voters).where(eq(voters.username, username)).limit(1);
      const userDistrictId = userRows[0]?.districtId;

      // 2. Query elections for user's district or null
      electionsList = await db.select({
        election_id: electionsTable.electionId,
        election_name: electionsTable.electionName,
        start_date: electionsTable.startDate,
        end_date: electionsTable.endDate,
        ward_number: electionsTable.wardNumber,
        district_id: electionsTable.districtId,
        current_status: electionsTable.currentStatus,
      })
      .from(electionsTable)
      .where(
        or(
          eq(electionsTable.districtId, userDistrictId),
          isNull(electionsTable.districtId)
        )
      );
    } else {
      // Guest/Anonymous user - select all elections to view
      electionsList = await db.select({
        election_id: electionsTable.electionId,
        election_name: electionsTable.electionName,
        start_date: electionsTable.startDate,
        end_date: electionsTable.endDate,
        ward_number: electionsTable.wardNumber,
        district_id: electionsTable.districtId,
        current_status: electionsTable.currentStatus,
      })
      .from(electionsTable);
    }

    // Fetch the candidates list for each election individually
    const { candidates, parties } = await import("@/db/schema");
    
    const electionsWithCandidates = [];
    for (let i = 0; i < electionsList.length; i++) {
      const election = electionsList[i];
      const candidateList = await db.select({
        candidate_id: candidates.candidateId,
        candidate_name: candidates.name,
        party_name: parties.partyName,
      })
      .from(candidates)
      .leftJoin(parties, eq(candidates.partyId, parties.partyId))
      .where(eq(candidates.electionId, election.election_id));

      electionsWithCandidates.push({
        ...election,
        candidates: candidateList,
      });
    }

    return NextResponse.json({
      elections: electionsWithCandidates,
    });
  } catch (error: any) {
    console.error("elections GET error:", error);
    return NextResponse.json({ elections: [] });
  }
}

/* --- OLD CODE COMMENTED OUT ---
import { getServerSession } from "next-auth";
import { query } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  const username = session?.user?.name;

  let elections;
  if (username) {
    elections = await query({
      query:
        "SELECT * FROM elections WHERE (district_id) IN (SELECT district_id FROM voter WHERE username=?) OR district_id IS NULL",
      values: [username],
    });
  } else {
    // Guest/Anonymous user - select all elections to view
    elections = await query({
      query: "SELECT * FROM elections",
      values: [],
    });
  }

  // Fetch the candidates list for each election individually
  for (let i = 0; i < elections.length; i++) {
    const election = elections[i];
    const candidates = await query({
      query:
        "SELECT c.candidate_id, c.name AS candidate_name, p.party_name FROM Candidates AS c  JOIN Parties AS p ON c.party_id = p.party_id  JOIN Candidates AS ec ON c.candidate_id = ec.candidate_id  WHERE ec.election_id = ?",
      values: [election.election_id],
    });
    // Add candidates list to the corresponding election object
    election.candidates = candidates;
  }

  return NextResponse.json({
    elections,
  });
}
*/
