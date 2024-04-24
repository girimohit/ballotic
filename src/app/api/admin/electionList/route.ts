import { query } from "@/database/db";
import { Console } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const electionList = await query({
    // query: "SELECT v.*, d.district_name FROM voter AS v JOIN districts AS d ON v.district_id = d.district_id;",
    query:
      "SELECT e.*, " +
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

// Update Election
export async function PUT(request: NextRequest) {
  const { election_id, election_name, current_status } = await request.json();
  console.log(election_id, election_name, current_status);
  const updateElection = await query({
    query:
      `UPDATE elections ` +
      `SET election_name='${election_name}', current_status=${current_status} ` +
      `WHERE election_id = ${election_id}`,
  });
  return NextResponse.json({
    updateElection,
  });
}

export async function DELETE(request: NextRequest) {
  const { election_id } = await request.json();
  const response = await query({
    query: `DELETE FROM elections WHERE election_id = ${election_id}`,
  });
  return NextResponse.json({
    response,
  });
}

export async function POST(request: Request) {
  try {
    const { election_name, start_date, end_date, ward_num, district_id } = await request.json();
    console.log(election_name, start_date, end_date, ward_num, district_id);
    const response = await query({
      query: `INSERT INTO elections (election_name, end_date, ward_number, district_id) VALUES ('${election_name}', '${end_date}', ${ward_num}, ${district_id})`,
    });
    return NextResponse.redirect("http://localhost:3000/auth/login");
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Success" });
}
