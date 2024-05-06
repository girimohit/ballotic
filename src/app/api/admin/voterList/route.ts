import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

// Get all voters
export async function GET() {
  const voterList = await query({
    query: `SELECT v.*, d.district_name, w.ward_name,
    CONCAT(
        FLOOR(DATEDIFF(CURRENT_DATE(), dob) / 365), 
        'y ', 
        FLOOR((DATEDIFF(CURRENT_DATE(), dob) % 365) / 30), 
        'm'
    ) AS age_years_months
      FROM voter AS v 
      JOIN districts AS d  
      ON v.district_id = d.district_id 
      JOIN wards AS w 
      ON v.ward_number = w.ward_number`,
  });
  return NextResponse.json({
    voterList,
  });
}

// Update Voter
export async function PUT(request: NextRequest) {
  const { voter_id, username, email } = await request.json();
  const updateVoter = await query({
    query:
      `UPDATE voter ` + `SET username='${username}', email ='${email}' ` + `WHERE voter_id = '${voter_id}'`,
  });
  return NextResponse.json({
    updateVoter,
  });
}

// Delete Voter
export async function DELETE(request: NextRequest) {
  const { voter_id } = await request.json();
  const response = await query({
    query: `DELETE FROM voter WHERE voter_id = ${voter_id}`,
  });
  return NextResponse.json({
    response,
  });
}

export async function POST(request: Request) {
  try {
    const { name, password, email, role, ward_num, district_id } = await request.json();
    const response = await query({
      query: `INSERT INTO voter (username, password, email, role, ward_number, district_id) VALUES ('${name}', '${password}', '${email}', '${role}', ${ward_num}, ${district_id})`,
    });
    return NextResponse.redirect("http://localhost:3000/auth/login");
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Success" });
}
