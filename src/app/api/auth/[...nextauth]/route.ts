import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/database/db";
import bcrypt, { compare, compareSync } from "bcrypt";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt", // Use database-backed sessions
    // maxAge: 30 * 24 * 60 * 60,
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
        // alert("Wrong password or username");
        // console.log(`SELECT * FROM voter WHERE name="${credentials?.name}" AND age=${credentials?.age}`);
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

        // const ageCorrect = await compare(providedAge, userAge);
        const ageCorrect = providedAge === userAge;
        // const ageCorrect = compareSync(providedAge, userAge);
        console.log({ ageCorrect });

        // if (credentials?.age.toString() === user.age.toString() && user) {
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
      // console.log("USER");
      // console.log(user);
      // console.log("PRINTING TOKEN");
      // console.log(token);
      return token;
    },
    async session({ session, user, token }): Promise<Session> {
      // async session(session: Session, token: JWT) {
        
        console.log(user);
      // session.user = token; // Assuming `user` is the key to store user data in the session
      session.user = user;
      // console.log("PRINTING SESSION ");
      // console.log(session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
