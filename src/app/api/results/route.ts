import { getServerSession } from "next-auth";
import { query } from "@/database/db";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const session = await getServerSession();
  const username = session?.user?.name;

  const elections = await sql`SELECT * 
    FROM elections 
    WHERE election_id IN 
      (SELECT election_id 
      FROM voted 
      WHERE voter_id = 
        (SELECT voter_id 
        FROM voter 
        WHERE username='${username}'))`;

  // Fetch the candidates list for each election individually
  for (let i = 0; i < elections.rows.length; i++) {
    const electionData = elections.rows[i];
    const candidates = await sql`SELECT c.candidate_id, c.name AS candidate_name, p.party_name 
        FROM Candidates AS c  
        JOIN Parties AS p ON c.party_id = p.party_id  
        JOIN Candidates AS ec ON c.candidate_id = ec.candidate_id  
        WHERE ec.election_id = ${electionData.election_id}`;
    // Add candidates list to the corresponding election object
    electionData.candidates = candidates.rows;
  }

  return NextResponse.json({ elections: elections.rows });
}
