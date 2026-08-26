export const dynamic = 'force-dynamic';
import { db } from "@/db";
import { voters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();
    const name = session?.user?.name;
    
    if (!name) {
      return NextResponse.json({ loggedInUser: [] }, { status: 401 });
    }

    const loggedInUser = await db.select({
      voter_id: voters.voterId,
      username: voters.username,
      email: voters.email,
      role: voters.role,
      ward_number: voters.wardNumber,
      district_id: voters.districtId,
    })
    .from(voters)
    .where(eq(voters.username, name))
    .limit(1);

    return NextResponse.json({
      loggedInUser,
    });
  } catch (error: any) {
    console.error("loggedinUser GET error:", error);
    return NextResponse.json({ loggedInUser: [] });
  }
}

/* --- OLD CODE COMMENTED OUT ---
import { query } from "@/database/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  const name = session?.user?.name;
  const loggedInUser = await query({
    query: `SELECT * FROM voter WHERE username="${name}"`,
    values: [],
  });
  return NextResponse.json({
    loggedInUser,
  });
}
*/