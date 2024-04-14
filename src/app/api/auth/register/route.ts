import { query } from "@/database/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, age } = await request.json();
    console.log({ name, age });
    // console.log(`INSERT INTO voter (name, age) VALUES (${name}, ${age})`);
    const response = await query({
      query: `INSERT INTO voter (name, age) VALUES ('${name}', ${age})`,
      // values: [name, age],
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "Success" });
}
