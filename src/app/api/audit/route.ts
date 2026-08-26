import { verifyLedgerChain } from "@/lib/web3";
import { NextResponse } from "next/server";

export async function GET() {
  const auditResult = await verifyLedgerChain();
  return NextResponse.json(auditResult);
}
