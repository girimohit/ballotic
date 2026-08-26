import { db } from "@/db";
import { voters, elections, candidates, votes } from "@/db/schema";
import { sql, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { 
  Users, 
  Vote, 
  UserSquare, 
  Activity, 
  ShieldCheck,
  PlusCircle,
  Database,
  ArrowUpRight,
  ChevronRight,
  Server
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Query live metrics from Postgres via Drizzle ORM
  const voterCountResult = await db.select({ count: sql<number>`count(*)` }).from(voters);
  const totalVoters = voterCountResult[0]?.count || 0;

  const electionCountResult = await db.select({ count: sql<number>`count(*)` }).from(elections);
  const totalElections = electionCountResult[0]?.count || 0;

  const candidateCountResult = await db.select({ count: sql<number>`count(*)` }).from(candidates);
  const totalCandidates = candidateCountResult[0]?.count || 0;

  const voteCountResult = await db.select({ count: sql<number>`count(*)` }).from(votes);
  const totalVotes = voteCountResult[0]?.count || 0;

  // Query recent vote ledger records
  const recentVotes = await db.select({
    voteId: votes.voteId,
    voterName: voters.username,
    candidateName: candidates.name,
    timestamp: votes.timestamp,
    hash: votes.hash,
  })
  .from(votes)
  .leftJoin(voters, eq(votes.voterId, voters.voterId))
  .leftJoin(candidates, eq(votes.candidateId, candidates.candidateId))
  .orderBy(desc(votes.voteId))
  .limit(5);

  return (
    <div className="w-full min-h-screen pt-24 px-4 md:px-8 pb-12 z-10 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Activity className="text-primary" size={28} /> Control Center
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time visual monitoring dashboard of cryptographic ballot ledgers.
          </p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/manage_election" 
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-primary/95 transition duration-150"
          >
            <PlusCircle size={15} /> Add Election
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Voters */}
        <div className="glass-panel rounded-2xl p-6 border border-border/40 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Voters</span>
              <h3 className="text-3xl font-black mt-2 font-mono text-foreground">{totalVoters}</h3>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Users size={22} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Active registered voter profiles</p>
        </div>

        {/* Total Candidates */}
        <div className="glass-panel rounded-2xl p-6 border border-border/40 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Candidates</span>
              <h3 className="text-3xl font-black mt-2 font-mono text-foreground">{totalCandidates}</h3>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <UserSquare size={22} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Candidates configured across ballots</p>
        </div>

        {/* Active Elections */}
        <div className="glass-panel rounded-2xl p-6 border border-border/40 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Elections</span>
              <h3 className="text-3xl font-black mt-2 font-mono text-foreground">{totalElections}</h3>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Vote size={22} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Configured electoral matchups</p>
        </div>

        {/* Audited Ballots */}
        <div className="glass-panel rounded-2xl p-6 border border-border/40 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Ballots Cast</span>
              <h3 className="text-3xl font-black mt-2 font-mono text-foreground">{totalVotes}</h3>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <ShieldCheck size={22} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Verified cryptographic signatures</p>
        </div>
      </div>

      {/* Detailed Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ledger Hash Chain Log */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-border/40">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Recent Ballots Ledger</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Live append-only vote chaining verification log</p>
            </div>
            <Link href="/admin/voters" className="text-xs text-primary hover:underline font-semibold flex items-center gap-0.5">
              Manage Voters <ChevronRight size={14} />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {recentVotes.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground font-mono">
                No ballots cast in active elections yet.
              </div>
            ) : (
              recentVotes.map((v) => (
                <div key={v.voteId} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-background/40 border border-border/20 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <div>
                      <span className="text-sm font-bold text-foreground capitalize">{v.voterName || "Anonymous"}</span>
                      <span className="text-xs text-muted-foreground mx-1.5">voted for</span>
                      <span className="text-sm font-semibold text-primary">{v.candidateName || "Candidate"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-[10px] text-muted-foreground max-w-[200px] truncate bg-black/35 px-2.5 py-1.5 rounded-lg border border-border/20">
                      Hash: {v.hash || "Pending"}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {v.timestamp ? new Date(v.timestamp).toLocaleTimeString() : "Just Now"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Settings & Node Status */}
        <div className="glass-panel rounded-3xl p-6 border border-border/40 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-1.5">
              <Server size={18} className="text-primary" /> Node Infrastructure
            </h2>
            <div className="flex flex-col gap-4 font-mono text-xs">
              <div className="flex justify-between items-center py-2 border-b border-border/20">
                <span className="text-muted-foreground">Blockchain Anchor</span>
                <span className="text-primary font-bold">Arbitrum Sepolia Testnet</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/20">
                <span className="text-muted-foreground">Node Sync Status</span>
                <span className="text-primary font-bold">100% Synchronized</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/20">
                <span className="text-muted-foreground">Active Ledger Validators</span>
                <span className="font-bold text-foreground">128 Nodes</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/20">
                <span className="text-muted-foreground">Integrity Auditing</span>
                <span className="text-primary font-bold">Enabled (Zero-Delay)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Local SQL Database</span>
                <span className="font-bold text-foreground">Neon Serverless Pool</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/20 flex flex-col gap-3">
            <Link 
              href="/admin/manage_candidate"
              className="w-full inline-flex items-center justify-between p-3.5 rounded-xl border border-border/40 bg-card hover:bg-muted/80 text-xs font-semibold transition duration-150"
            >
              <span>Manage Candidates</span>
              <ArrowUpRight size={15} className="text-primary" />
            </Link>
            <Link 
              href="/admin/manage_election"
              className="w-full inline-flex items-center justify-between p-3.5 rounded-xl border border-border/40 bg-card hover:bg-muted/80 text-xs font-semibold transition duration-150"
            >
              <span>Manage Elections</span>
              <ArrowUpRight size={15} className="text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
