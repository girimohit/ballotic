import { db } from "@/db";
import { elections, wards, districts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Get all elections
export async function GET() {
  try {
    const electionList = await db.select({
      election_id: elections.electionId,
      election_name: elections.electionName,
      start_date: elections.startDate,
      end_date: elections.endDate,
      ward_number: elections.wardNumber,
      district_id: elections.districtId,
      current_status: elections.currentStatus,
      ward_name: wards.wardName,
      district_name: districts.districtName,
    })
    .from(elections)
    .leftJoin(wards, eq(elections.wardNumber, wards.wardNumber))
    .leftJoin(districts, eq(elections.districtId, districts.districtId));

    return NextResponse.json({
      electionList,
    });
  } catch (error: any) {
    console.error("electionList GET error:", error);
    return NextResponse.json({ electionList: [] });
  }
}

// Update Election
export async function PUT(request: NextRequest) {
  try {
    const { election_id, election_name, current_status } = await request.json();
    const updateElection = await db.update(elections)
      .set({ 
        electionName: election_name, 
        currentStatus: typeof current_status === 'boolean' ? current_status : current_status === 1 || current_status === '1' || current_status === 'true'
      })
      .where(eq(elections.electionId, election_id));

    return NextResponse.json({
      updateElection,
    });
  } catch (error: any) {
    console.error("electionList PUT error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete Election
export async function DELETE(request: NextRequest) {
  try {
    const { election_id } = await request.json();
    const response = await db.delete(elections)
      .where(eq(elections.electionId, election_id));

    return NextResponse.json({
      response,
    });
  } catch (error: any) {
    console.error("electionList DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add Election
export async function POST(request: Request) {
  try {
    const { election_name, start_date, end_date, ward_num, district_id } = await request.json();
    const response = await db.insert(elections).values({
      electionName: election_name,
      endDate: end_date,
      wardNumber: ward_num ? parseInt(ward_num) : null,
      districtId: district_id ? parseInt(district_id) : null,
      currentStatus: true,
    });

    return NextResponse.json({ message: "Success", response });
  } catch (error: any) {
    console.error("electionList POST error:", error);
    return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
  }
}

/* --- OLD CODE COMMENTED OUT ---
import { query } from "@/database/db";
import { Console } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const electionList = await query({
    query:
      "SELECT e.*, " +
      "IFNULL(w.ward_name, 'null') AS ward_name, " +
      "IFNULL(d.district_name, 'null') AS district_name " +
      "FROM elections AS e " +
      "LEFT JOIN wards AS w ON w.ward_number = e.ward_number " +
      "LEFT JOIN districts AS d ON d.district_id = e.district_id",
  });
  return NextResponse.json({
    electionList,
  });
}

// Update Election
export async function PUT(request: NextRequest) {
  const { election_id, election_name, current_status } = await request.json();
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
    const response = await query({
      query: `INSERT INTO elections (election_name, end_date, ward_number, district_id) VALUES ('${election_name}', '${end_date}', ${ward_num}, ${district_id})`,
    });
    return NextResponse.redirect("http://localhost:3000/auth/login");
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Success" });
}
*/