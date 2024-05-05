import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/database/db";
import bcrypt, { compare, compareSync } from "bcrypt";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import NodemailerTransporter from "../../send-otp/emailTransporter";

// import NextAuth from "next-auth/next";
// import { authOptions } from "./options";

interface User {
  id: number;
  name: string;
  email: string;
  ward_num: number;
  district_id: number;
  role: string;
}

const handler = NextAuth({
  session: {
    strategy: "jwt", // Use database-backed sessions
    maxAge: 2 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {},
        password: {},
        email: {},
        otp: {},
      },
      async authorize(credentials, req) {
        // NodemailerTransporter(credentials?.email || "");
        const response = await query({
          query: `SELECT * FROM voter WHERE username="${credentials?.name}"`,
          values: [],
        });
        const checkOTP = await query({
          query: `SELECT o.otp
          FROM ballotic.otps AS o
          JOIN ballotic.voter AS v ON o.user_id = v.voter_id
          WHERE v.username = '${credentials?.name}'
          ORDER BY o.created_at DESC
          LIMIT 1`,
        });
        const user = response[0];
        // console.log(response);
        const providedPassword = credentials?.password?.toString().trim() || "";
        const storedPassword = user.password.toString().trim();
        // const isPasswordCorrect = await compare(providedPassword, password);
        const isPasswordCorrect = providedPassword === storedPassword;
        const isOTPCorrect = credentials?.otp?.toString().trim() === checkOTP[0].otp;
        console.log(checkOTP[0].otp);
        console.log(isPasswordCorrect);
        console.log(isOTPCorrect);
        if (isPasswordCorrect && isOTPCorrect) {
          return {
            id: user.id,
            name: user.username,
            email: user.email,
            ward_num: user.ward_num,
            district_id: user.district_id,
            role: user.role,
          };
        }
        console.log("NUlll returned");
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }): Promise<JWT> {
      // console.log(user);
      token.guy = "abc";
      if (user?.name) {
        token.name = user.name;
        token.age = user.name;
      }
      if (user?.email) {
        token.age = user.email;
      }
      // console.log("this is the token : ");
      // console.log(token);
      return token;
    },
    async session({ session, user, token }): Promise<Session> {
      // async session(session: Session, token: JWT) {
      // console.log(user);
      // session.user = token; // Assuming `user` is the key to store user data in the session
      session.user = user;
      // console.log("PRINTING SESSION ");
      // console.log(session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST };
