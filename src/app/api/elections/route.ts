import { query } from "@/database/db";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET() {
  const elections = await query({
    query: "SELECT * FROM elections",
    values: [],
  });

  // Fetch the candidates list for each election individually
  for (let i = 0; i < elections.length; i++) {
    const election = elections[i];
    const candidates = await query({
      query:
        "SELECT c.candidate_id, c.name AS candidate_name, p.party_name " +
        "FROM Candidates c " +
        "JOIN Parties p ON c.party_id = p.party_id " +
        "JOIN Candidates ec ON c.candidate_id = ec.candidate_id " +
        "WHERE ec.election_id = ?",
      values: [election.election_id],
    });
    // Add candidates list to the corresponding election object
    election.candidates = candidates;
  }

  return NextResponse.json({
    elections,
  });
}
