import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  try {
    const { candidate_id, election_id, voter_id } = await request.json();

    // Insert vote into the votes table
    const voteResult = await sql`
      INSERT INTO votes (candidate_id, election_id) 
      VALUES (${candidate_id}, ${election_id})
      RETURNING *`;

    // Insert voter's vote into the voted table
    const votedResult = await sql`
      INSERT INTO voted (voter_id, election_id) 
      VALUES (${voter_id}, ${election_id})
      RETURNING *`;

    return NextResponse.json(
      {
        voteResult: voteResult.rows,
        votedResult: votedResult.rows,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
