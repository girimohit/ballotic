// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { query } from "@/database/db";
// import { JWT } from "next-auth/jwt";
// import { Session } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "Enter username" },
//         email: { label: "email", type: "text", placeholder: "Email" },
//         password: { label: "password", type: "password", placeholder: "Password" },
//       },

//       async authorize(credentials: any): Promise<any> {
//         try {
//           const user = await query({
//             query: `SELECT * FROM voter WHERE username="${credentials.username}" OR email="${credentials.email}"`,
//           });

//           if (!user) {
//             throw new Error("No User found with this username or email");
//           }

//           if (!user.isVerified) {
//             throw new Error("Please verify your account first!");
//           }

//           const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
//           if (isPasswordCorrect) {
//             return user;
//           } else {
//             throw new Error("Invalid password");
//           }
//         } catch (err: any) {
//           throw new Error(err);
//         }
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/sign-in",
//   },

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user._id?.toString();
//         token.isVerified = user.isVerified;
//         token.isAcceptingMessages = user.isAcceptingMessages;
//         token.username = user.username;
//         token.role = user.role;
//         token.district = user.district_id?.toString();
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.username = token.username;
//         session.user.role = token.role;
//         // session.user.district_id = token.district || "";
//         session.user._id = token._id || "";
//         session.user.isVerified = token.isVerified;
//         session.user.isAcceptingMessages = token.isAcceptingMessages;
//       }
//       return session;
//     },
//   },
// };
