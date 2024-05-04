import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   if (token) {
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.redirect(new URL("/sign-in", request.url));
// }

// export const config = { matcher: ["/dashboard", "/elections", "/admin/:path*", "/sign-in"] };
