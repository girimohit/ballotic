import { db } from "@/db";
import { voters } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, password, email, role, ward_num, district_id } = await request.json();
    
    await db.insert(voters).values({
      username: name,
      password: password,
      email: email,
      role: role || "voter",
      wardNumber: ward_num ? parseInt(ward_num) : null,
      districtId: district_id ? parseInt(district_id) : 3,
    });
    
    return NextResponse.json({ message: "Success" });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
  }
}
