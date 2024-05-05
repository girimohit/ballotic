// pages/api/send-otp.ts

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { query } from "@/database/db";
import otpGenerator from "otp-generator";
import NodemailerTransporter from "./emailTransporter";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, username } = await req.json();
  console.log("Thie is the email : ");
  console.log(email);
  console.log(username);
  const userId = await query({
    query: `select voter_id from voter where username="${username}"`,
  });
  NodemailerTransporter(email, userId[0].voter_id);
  // Generate OTP
  // const otp = otpGenerator.generate(6, { digits: true, specialChars: false, upperCaseAlphabets: false });

  return NextResponse.json(`Message sent to : ${email}`);
}
