import crypto from "crypto";
import { db } from "@/db";
import { votes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const GENESIS_HASH = "0000000000000000000000000000000000000000000000000000000000000000";

/**
 * Calculates a SHA-256 hash for a vote to create a secure, linked ledger.
 */
export function calculateVoteHash(
  voterId: number,
  candidateId: number,
  electionId: number,
  timestamp: string,
  previousHash: string
): string {
  const data = `${voterId}-${candidateId}-${electionId}-${timestamp}-${previousHash}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Simulates anchoring a Merkle Root / vote hash to a public/private blockchain network.
 * Returns a simulated transaction hash and block number.
 */
export async function anchorVoteOnChain(voteHash: string, electionId: number) {
  // Simulate Web3 RPC transaction delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Generate a mock Ethereum-like tx hash and block number
  const txHash = "0x" + crypto.createHash("sha256").update(voteHash + Date.now()).digest("hex");
  const blockNumber = 12000000 + Math.floor(Math.random() * 500000);

  return {
    txHash,
    blockNumber,
    network: "Arbitrum One (Secured)",
  };
}

/**
 * Audit tool to crawl and verify that no database records have been tampered with.
 * Ensures the cryptographic hashes still match and form a continuous chain.
 */
export async function verifyLedgerChain(): Promise<{
  isValid: boolean;
  tamperedIndex?: number;
  message: string;
}> {
  try {
    const allVotes = await db.select().from(votes).orderBy(votes.voteId);

    let expectedPrevHash = GENESIS_HASH;

    for (let i = 0; i < allVotes.length; i++) {
      const vote = allVotes[i];
      const recalculatedHash = calculateVoteHash(
        vote.voterId || 0,
        vote.candidateId || 0,
        // we use a fixed or fallback electionId for chain continuity
        1, 
        vote.timestamp ? vote.timestamp.toISOString() : "",
        expectedPrevHash
      );

      if (vote.hash !== recalculatedHash) {
        return {
          isValid: false,
          tamperedIndex: vote.voteId,
          message: `Tampering detected at vote ID: ${vote.voteId}. Record hash does not match mathematical chain.`,
        };
      }

      expectedPrevHash = vote.hash || "";
    }

    return {
      isValid: true,
      message: "Cryptographic ledger is 100% verified. No tampering detected.",
    };
  } catch (error: any) {
    return {
      isValid: false,
      message: `Audit failed to run: ${error.message}`,
    };
  }
}
