import { db } from "@/db";
import { votes, candidates } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const electionId = parseInt(params.electionID);

  try {
    // Count votes in Postgres group by candidate_id for the given election_id
    const electionRes = await db.select({
      ElectionID: candidates.electionId,
      CandidateID: votes.candidateId,
      vote_count: sql<number>`count(${votes.voteId})`
    })
    .from(votes)
    .innerJoin(candidates, eq(votes.candidateId, candidates.candidateId))
    .where(eq(candidates.electionId, electionId))
    .groupBy(candidates.electionId, votes.candidateId);

    return NextResponse.json({
      electionRes,
    });
  } catch (error: any) {
    console.error("Result fetch error:", error);
    return NextResponse.json({ electionRes: [] });
  }
}

/* --- OLD CODE COMMENTED OUT ---
import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const electionRes = await query({
    query: `SELECT * FROM (
        SELECT election_id AS ElectionID, candidate_id AS CandidateID, COUNT(*) AS vote_count
        FROM votes
        GROUP BY election_id, candidate_id
        ORDER BY ElectionID) AS resTable
        WHERE ElectionID = ${params.electionID}`,
  });
  return NextResponse.json({
    electionRes,
  });
}
*/