import { db } from "@/db";
import { voters, districts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Get all voters joined with district names
export async function GET() {
  try {
    const voterList = await db.select({
      voter_id: voters.voterId,
      username: voters.username,
      email: voters.email,
      role: voters.role,
      ward_number: voters.wardNumber,
      district_id: voters.districtId,
      district_name: districts.districtName,
    })
    .from(voters)
    .leftJoin(districts, eq(voters.districtId, districts.districtId));

    return NextResponse.json({
      voterList,
    });
  } catch (error: any) {
    console.error("voterList GET error:", error);
    return NextResponse.json({ voterList: [] });
  }
}

// Update Voter
export async function PUT(request: NextRequest) {
  try {
    const { voter_id, username, email } = await request.json();
    const updateVoter = await db.update(voters)
      .set({ username, email })
      .where(eq(voters.voterId, voter_id));

    return NextResponse.json({
      updateVoter,
    });
  } catch (error: any) {
    console.error("voterList PUT error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Voter
export async function DELETE(request: NextRequest) {
  try {
    const { voter_id } = await request.json();
    const response = await db.delete(voters)
      .where(eq(voters.voterId, voter_id));

    return NextResponse.json({
      response,
    });
  } catch (error: any) {
    console.error("voterList DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create Voter (Admin interface)
export async function POST(request: Request) {
  try {
    const { name, password, email, role, ward_num, district_id } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await db.insert(voters).values({
      username: name,
      password: hashedPassword,
      email: email,
      role: role || "voter",
      wardNumber: ward_num ? parseInt(ward_num) : null,
      districtId: district_id ? parseInt(district_id) : 3,
    });

    return NextResponse.json({ message: "Success", response });
  } catch (error: any) {
    console.error("voterList POST error:", error);
    return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
  }
}

/* --- OLD CODE COMMENTED OUT ---
import { query } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";

// Get all voters
export async function GET() {
  const voterList = await query({
    query:
      "SELECT v.*, d.district_name " +
      "FROM voter AS v " +
      "JOIN districts AS d " +
      "ON v.district_id = d.district_id",
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
*/