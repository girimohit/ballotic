import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //   const voterRes = await fetch("http://localhost:3000/api/loggedinUser");
  // const voterRes = await fetch("http://localhost:3000/api/elections");
  // const voterData = voterRes.json();
  // //   const voterID = voterData.loggedInUser[0].voter_id;
  // console.log("Voter data : ");
  // console.log(voterData);

  const { candidate_id, election_id, voter_id } = await request.json();
  console.log({ candidate_id, election_id, voter_id });

  console.log(
    `INSERT INTO votes (voter_id, candidate_id, election_id) VALUES (${voter_id}, ${candidate_id}, ${election_id})`
  );
  const response = await query({
    // query: `SELECT * FROM elections WHERE election_id=${election_id}`,
    query: `INSERT INTO votes (voter_id, candidate_id, election_id) VALUES (${voter_id}, ${candidate_id}, ${election_id})`,
    // query: `SELECT * FROM votes WHERE election_id=${election_id}`,
  });
  console.log("Vote clicking response : ");
  console.log(response);
  return NextResponse.json(response);
}