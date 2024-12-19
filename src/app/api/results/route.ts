import { getServerSession } from "next-auth";
import { query } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  const username = session?.user?.name;

  const elections = await query({
    query: `SELECT * 
    FROM elections 
    WHERE election_id IN 
      (SELECT election_id 
      FROM voted 
      WHERE voter_id = 
        (SELECT voter_id 
        FROM voter 
        WHERE username='${username}'))`,
    // values: [username],
  });

  // Fetch the candidates list for each election individually
  for (let i = 0; i < elections.length; i++) {
    const election = elections[i];
    const candidates = await query({
      query: `SELECT c.candidate_id, c.name AS candidate_name, p.party_name 
        FROM Candidates AS c  
        JOIN Parties AS p ON c.party_id = p.party_id  
        JOIN Candidates AS ec ON c.candidate_id = ec.candidate_id  
        WHERE ec.election_id = ${election.election_id}`,
    });
    // Add candidates list to the corresponding election object
    election.candidates = candidates;
  }

  return NextResponse.json({ elections });
}
