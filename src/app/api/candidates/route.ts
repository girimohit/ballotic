// export default function handler(req:any, res:any) {
//   if (req.method === "GET") {
//     res.status(200).json({
//       name: "Javascript",
//     });
//   }
// }

const votersss = [
  {
    voter_id: 8,
    username: "kane_smith",
    password: "smith456",
    email: "kanesmith@gmail.com",
    role: "voter",
    ward_number: 2,
    district_id: 3,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 9,
    username: "sam_jackson",
    password: "sam123",
    email: "sam.jackson@example.com",
    role: "voter",
    ward_number: 1,
    district_id: 3,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 10,
    username: "sara_williams",
    password: "sara456",
    email: "sara.williams@example.com",
    role: "voter",
    ward_number: 2,
    district_id: 3,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 11,
    username: "michael",
    password: "michael123",
    email: "michael@gmailj.com",
    role: "voter",
    ward_number: 3,
    district_id: 3,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 12,
    username: "mohit",
    password: "mohit",
    email: "mohit@gmail.com",
    role: "voter",
    ward_number: 1,
    district_id: 3,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 14,
    username: "ketan",
    password: "ketan",
    email: "ketan@gmail.com",
    role: "voter",
    ward_number: 1,
    district_id: 3,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 15,
    username: "nimish",
    password: "nimish",
    email: "nimish@gmail.com",
    role: "voter",
    ward_number: 2,
    district_id: 3,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 19,
    username: "user2",
    password: "user2",
    email: "user2@gmail.com",
    role: "voter",
    ward_number: 2,
    district_id: 3,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 20,
    username: "user3",
    password: "user3",
    email: "user3@gmail.com",
    role: "voter",
    ward_number: 2,
    district_id: 1,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 21,
    username: "user4",
    password: "",
    email: "user4@gmail.com",
    role: "voter",
    ward_number: 2,
    district_id: 2,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 22,
    username: "user5",
    password: "user5",
    email: "user5@gmail.com",
    role: "voter",
    ward_number: 2,
    district_id: 1,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 23,
    username: "user6",
    password: "user6",
    email: "user6@gmail.com",
    role: "voter",
    ward_number: 2,
    district_id: 1,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 24,
    username: "user7",
    password: "user7",
    email: "user7@gmail.lcom",
    role: "voter",
    ward_number: 3,
    district_id: 1,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 25,
    username: "user8",
    password: "user8",
    email: "user89@gmail.com",
    role: "voter",
    ward_number: 2,
    district_id: 1,
    dob: "1999-12-31T18:30:00.000Z",
  },
  {
    voter_id: 31,
    username: "abc",
    password: "abc",
    email: "abc@gmiai.com",
    role: "voter",
    ward_number: 4,
    district_id: 5,
    dob: "1999-12-31T18:30:00.000Z",
  },
];

import { query } from "@/database/db";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  try {
    const votersResult = await sql`SELECT * FROM voter`;
    const voters = votersResult.rows;

    return NextResponse.json({ voters });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
