import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sql } from "@vercel/postgres";
import otpGenerator from "otp-generator";
import NodemailerTransporter from "./emailTransporter";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, username } = await req.json();
    console.log("This is the email: ", email);
    console.log("This is the username: ", username);

    // Fetch voter_id for the given username
    const userIdResult = await sql`SELECT voter_id FROM voter WHERE username = ${username}`;
    const userId = userIdResult.rows[0]?.voter_id;
    console.log("User Id: ", userId);
    // Check if voter_id exists
    if (!userId) {
      return NextResponse.json("User not found", { status: 404 });
    }

    // Send email with OTP
    await NodemailerTransporter(email, userId);

    return NextResponse.json(`Message sent to: ${email}`, { status: 200 });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
