import { db } from "@/db";
import { votes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { calculateVoteHash, anchorVoteOnChain } from "@/lib/web3";
import { NextResponse } from "next/server";

const GENESIS_HASH = "0000000000000000000000000000000000000000000000000000000000000000";

export async function POST(request: Request) {
  try {
    const { candidate_id, election_id, voter_id } = await request.json();

    // 1. Fetch the last vote to get the previous hash
    const lastVotes = await db.select()
      .from(votes)
      .orderBy(desc(votes.voteId))
      .limit(1);

    const previousHash = lastVotes.length > 0 ? (lastVotes[0].hash || GENESIS_HASH) : GENESIS_HASH;
    
    // 2. Generate a timestamp and calculate the vote hash
    const timestampStr = new Date().toISOString();
    const hash = calculateVoteHash(
      voter_id,
      candidate_id,
      election_id,
      timestampStr,
      previousHash
    );

    // 3. Persist the vote in the Postgres ledger
    const newVote = await db.insert(votes).values({
      voterId: voter_id,
      candidateId: candidate_id,
      hash: hash,
      previousHash: previousHash,
    }).returning();

    // 4. Anchor the vote on-chain
    const web3Receipt = await anchorVoteOnChain(hash, election_id);

    return NextResponse.json({
      success: true,
      vote: newVote[0],
      receipt: web3Receipt,
    });
  } catch (error: any) {
    console.error("Voting error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/* --- OLD CODE COMMENTED OUT ---
import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { candidate_id, election_id, voter_id } = await request.json();
  const response = await query({
    query: `INSERT INTO votes (voter_id, candidate_id, election_id) VALUES (${voter_id}, ${candidate_id}, ${election_id})`,
  });
  return NextResponse.json(response);
}
*/