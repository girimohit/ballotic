import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { query } from "@/database/db";
import { sql } from "@vercel/postgres";

export default async function NodemailerTransporter(email: string, id: number) {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "giri94557@gmail.com",
      pass: "mxiv nhfk wmmp vclk",
    },
  });

  // Email content
  const mailOptions = {
    from: "giri94557@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  };
  console.log("nodemailer: ");
  console.log(id);
  console.log(otp);
  await sql`insert into otps(user_id, otp) values (${id}, ${otp});`;
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      return NextResponse.json({ error: error });
    } else {
      console.log("Email sent:", info);
      return NextResponse.json({ msg: "OTP sent successfully" });
    }
  });
}
