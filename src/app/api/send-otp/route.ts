// pages/api/send-otp.ts

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email } = await req.json();
  console.log("Thie is the email : ");
  console.log(email);
  // Generate OTP
  // const otp = otpGenerator.generate(6, { digits: true, specialChars: false, upperCaseAlphabets: false });
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
  return NextResponse.json(`Message sent to : ${email}`);
}
