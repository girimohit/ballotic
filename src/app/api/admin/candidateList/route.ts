import { query } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  const candidateList = await query({
    // query: "SELECT v.*, d.district_name FROM voter AS v JOIN districts AS d ON v.district_id = d.district_id;",
    query:
      "SELECT c.*, p.party_name, e.election_name " +
      "FROM candidates AS c " +
      "JOIN parties AS p ON p.party_id = c.party_id " +
      "JOIN elections AS e ON e.election_id = c.election_id",
    // values: [],
  });
  return NextResponse.json({
    candidateList,
  });
}
