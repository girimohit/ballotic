import { query } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  const electionList = await query({
    // query: "SELECT v.*, d.district_name FROM voter AS v JOIN districts AS d ON v.district_id = d.district_id;",
    query:
      "SELECT e.*, "+ 
      "IFNULL(w.ward_name, 'null') AS ward_name, " +
      "IFNULL(d.district_name, 'null') AS district_name " +
      "FROM elections AS e " +
      "LEFT JOIN wards AS w ON w.ward_number = e.ward_number " +
      "LEFT JOIN districts AS d ON d.district_id = e.district_id",
    // values: [],
  });
  return NextResponse.json({
    electionList,
  });
}
