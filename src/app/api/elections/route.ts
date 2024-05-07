import { getServerSession } from "next-auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();
    const username = session?.user?.name;

    const elections = await sql`
      SELECT * 
      FROM elections 
      WHERE 
        ((district_id) IN 
           (SELECT district_id 
            FROM voter 
            where username = ${username}) 
        OR district_id IS NULL)
        AND election_id NOT IN 
          (SELECT election_id 
          FROM voted 
          WHERE voter_id = 
            (SELECT voter_id 
             FROM voter 
             WHERE username = ${username}))
        AND current_status = 1
        AND end_date > current_date()`;

    // Fetch the candidates list for each election individually
    for (let i = 0; i < elections.rows.length; i++) {
      const election = elections.rows[i];
      const candidates = await sql`
        SELECT c.candidate_id, c.name AS candidate_name, p.party_name 
        FROM Candidates AS c  
        JOIN Parties AS p ON c.party_id = p.party_id  
        JOIN Candidates AS ec ON c.candidate_id = ec.candidate_id  
        WHERE ec.election_id = ${election.election_id}`;

      // Add candidates list to the corresponding election object
      election.candidates = candidates.rows;
    }

    return NextResponse.json({ elections: elections.rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
