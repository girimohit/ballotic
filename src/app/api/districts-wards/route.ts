export const dynamic = 'force-dynamic';
import { db } from "@/db";
import { districts, wards } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allDistricts = await db.select().from(districts);
    const allWards = await db.select().from(wards);
    return NextResponse.json({ districts: allDistricts, wards: allWards });
  } catch (error: any) {
    console.error("Error fetching districts and wards:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
