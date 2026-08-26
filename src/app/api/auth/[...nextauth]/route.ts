import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { voters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { JWT } from "next-auth/jwt";

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

          const passwordCorrect = providedPassword === userPassword;
          console.log({ passwordCorrect });

          if (passwordCorrect) {
            return {
              id: user.voterId.toString(),
              name: user.username,
              email: user.email,
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
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST };
