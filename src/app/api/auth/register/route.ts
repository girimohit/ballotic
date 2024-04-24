import { query } from "@/database/db";
import { NextResponse } from "next/server";

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
