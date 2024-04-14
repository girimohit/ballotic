import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/database/db";
import bcrypt, { compare, compareSync } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt", // Use database-backed sessions
    maxAge: 30 * 24 * 60 * 60,
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
        age: { type: "text" },
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        // console.log(`SELECT * FROM voter WHERE name="${credentials?.name}" AND age=${credentials?.age}`);
        const response = await query({
          query: `SELECT * FROM voter WHERE name="${credentials?.name}" AND age=${credentials?.age}`,
          // values: [],
        });
        const user = response[0];
        console.log(user);
        console.log(user.id);

        // console.log(user.name.type());
        // console.log(user.name);
        // console.log(user.age.toString());
        // console.log(credentials?.age.toString());

        const providedAge = credentials?.age?.toString().trim() || "";
        const userAge = user.age.toString().trim();

        console.log("Provided Age:", providedAge);
        console.log("User Age:", userAge);
        console.log("Type of Provided Age:", typeof providedAge);
        console.log("Type of User Age:", typeof userAge);
        // const ageCorrect = await compare(providedAge, userAge);
        const ageCorrect = providedAge === userAge;
        // const ageCorrect = compareSync(providedAge, userAge);
        console.log({ ageCorrect });

        // if (credentials?.age.toString() === user.age.toString() && user) {
        if (ageCorrect) {
          return {
            id: user.id,
            name: user.name,
            age: user.age,
          };
        }
        console.log("NUlll returned");
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
