import { NextResponse } from "next/server";
const data = [
  {
    id: 1,
    name: "Anthony",
  },
  {
    id: 2,
    name: "Anthony",
  },
  {
    id: 3,
    name: "Mohit",
  },
  {
    id: 4,
    name: "Ben",
  },
  {
    id: 5,
    name: "Kate",
  },
  {
    id: 6,
    name: "Amenda",
  },
  {
    id: 7,
    name: "Bill",
  },
  {
    id: 8,
    name: "Steve",
  },
  {
    id: 9,
    name: "Mia",
  },
  {
    id: 12,
    name: "Mohit",
  },
  {
    id: 23,
    name: "Ketiya",
  },
];

export async function GET(request: Request, context: any) {
  const { params } = context;
  const user = data.filter((x) => params.userId === x.id.toString());
  return NextResponse.json({
    user,
  });
}
