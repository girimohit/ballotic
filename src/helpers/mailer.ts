import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

// import nodemailer from "nodemailer";
// import bcryptjs from "bcryptjs";

// export const sendEmail = async ({
//   email,
//   emailType,
//   userID,
// }: {
//   email: string;
//   emailType: string;
//   userID: string;
// }) => {
//   try {
//     const hashedToken = await bcryptjs.hash(userID.toString(), 2);
//   } catch (e: any) {
//     throw new Error(e.message);
//   }
// };
