import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/* --- OLD CODE COMMENTED OUT ---
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/database/db";
import bcrypt, { compare, compareSync } from "bcrypt";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt",
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
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        console.log("Wrong password or username");
        const response = await query({
          query: `SELECT * FROM voter WHERE username="${credentials?.name}"`,
          values: [],
        });
        const user = response[0];
        console.log("User Object : ");
        console.log(user);
        console.log(user.id);
        const providedAge = credentials?.password?.toString().trim() || "";
        const userAge = user.password.toString().trim();

        const ageCorrect = providedAge === userAge;
        console.log({ ageCorrect });

        if (ageCorrect) {
          return {
            id: user.id,
            name: user.username,
            email: user.email,
          };
        }
        console.log("NUlll returned");

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }): Promise<JWT> {
      console.log(user);
      token.guy = "abc";
      if (user?.name) {
        token.name = user.name;
        token.age = user.name;
      }
      if (user?.email) {
        token.age = user.email;
      }
      return token;
    },
    async session({ session, user, token }): Promise<Session> {
      console.log(user);
      session.user = user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
*/
