// export default function handler(req:any, res:any) {
//   if (req.method === "GET") {
//     res.status(200).json({
//       name: "Javascript",
//     });
//   }
// }
// "use client";
import { query } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  const voters = await query({
    query: "SELECT * FROM voter",
    values: [],
  });

  return NextResponse.json({
    voters,
  });
}
