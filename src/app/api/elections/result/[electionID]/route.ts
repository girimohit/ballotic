import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const { id } = params;
  const electionRes = await query({
    // query: `SELECT * FROM elections WHERE election_id=${params.electionID}`,
    query: `SELECT * FROM (
        SELECT election_id AS ElectionID, candidate_id AS CandidateID, COUNT(*) AS vote_count
        FROM votes
        GROUP BY election_id, candidate_id
        ORDER BY ElectionID) AS resTable
        WHERE ElectionID = ${params.electionID}`,
    // values: [],
  });
  return NextResponse.json({
    electionRes,
  });
}

// export async function GET({ params }) {}
