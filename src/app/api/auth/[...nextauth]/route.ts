import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { voters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";

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
        if (!credentials?.name) return null;

        try {
          const results = await db.select().from(voters).where(eq(voters.username, credentials.name)).limit(1);
          const user = results[0];

          if (!user) {
            console.log("User not found");
            return null;
          }

          console.log("User Object : ");
          console.log(user);

          const providedPassword = credentials?.password?.toString().trim() || "";
          const userPassword = user.password.toString().trim();

          const passwordCorrect = await bcrypt.compare(providedPassword, userPassword);
          console.log({ passwordCorrect });

          if (passwordCorrect) {
            return {
              id: user.voterId.toString(),
              name: user.username,
              email: user.email,
              role: user.role, // Pass role key
            };
          }
          
          console.log("Wrong password");
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
});

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