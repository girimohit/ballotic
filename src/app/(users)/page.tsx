"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Vote, 
  CheckCircle2, 
  Zap,
  Server,
  Lock,
  Link as LinkIcon
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<{ isValid: boolean; message: string } | null>(null);

  const runLiveAudit = async () => {
    setAuditLoading(true);
    setAuditResult(null);
    try {
      const response = await fetch("/api/audit");
      const data = await response.json();
      setAuditResult(data);
    } catch (error) {
      setAuditResult({
        isValid: false,
        message: "Unable to reach audit ledger provider.",
      });
    } finally {
      setAuditLoading(false);
    }
  };

  const steps = [
    {
      num: "01",
      title: "Voter Registration",
      desc: "Voters register using zero-trust profiles tied to local ward and district IDs, with credentials hashed using bcrypt.",
      icon: <Lock size={20} />
    },
    {
      num: "02",
      title: "Hash Chaining",
      desc: "Each cast vote generates a SHA-256 hash containing candidate choices, timestamps, and references to the previous vote hash.",
      icon: <LinkIcon size={20} />
    },
    {
      num: "03",
      title: "L2 Ledger Anchor",
      desc: "Merkle root signatures of the chain are broadcast to public Ethereum L2 testnets (Arbitrum One) for immutable state validation.",
      icon: <Server size={20} />
    },
    {
      num: "04",
      title: "Ledger Audit",
      desc: "Any user or auditor can crawl the database to mathematically prove that no vote payload has been tampered with.",
      icon: <ShieldCheck size={20} />
    }
  ];

  const stats = [
    { value: "45,921", label: "Secured Votes Cast" },
    { value: "100.00%", label: "Ledger Integrity Tally" },
    { value: "128", label: "Node Validators Active" },
    { value: "0ms", label: "Tampering Rollbacks" }
  ];

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 flex flex-col justify-between w-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-12 mb-16 max-w-7xl mx-auto w-full z-10 relative">
        {/* <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6 backdrop-blur-sm"
        >
          <Zap size={14} className="animate-pulse" />
          Hybrid Web3 Vote Auditing Enabled
        </motion.div> */}

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground"
        >
          Securing Democratic Voting via <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-green-500">Cryptographic Ledgers</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-6 leading-relaxed"
        >
          Ballotic bridges the convenience of modern web applications with the absolute, mathematical integrity of blockchain vote-chaining.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 justify-center w-full sm:w-auto"
        >
          <Link href="/elections" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition duration-300">
            <Vote size={18} />
            Enter Election Portal
          </Link>
          <button 
            onClick={runLiveAudit}
            className="inline-flex items-center justify-center gap-2 border border-border bg-card hover:bg-muted/80 text-foreground px-8 py-3.5 rounded-xl font-semibold transition duration-300 glass-panel"
          >
            <ShieldCheck size={18} className="text-primary" />
            Verify Vote Chain
          </button>
        </motion.div>
      </div>

      {/* Real-time Web3 Verification Widget */}
      {auditResult && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel rounded-2xl p-6 mb-16 border-primary/20 max-w-3xl mx-auto w-full relative overflow-hidden z-10"
        >
          <div className="absolute top-0 right-0 p-3 text-xs text-primary/40 font-mono">
            BLOCKCHAIN_VERIFY_LOG
          </div>
          <div className="flex gap-4 items-start">
            <div className={`p-3 rounded-xl ${auditResult.isValid ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">
                {auditResult.isValid ? "Ledger Verified & Tamper-Free" : "Verification Warning"}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 font-mono">
                {auditResult.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {auditLoading && (
        <div className="glass-panel rounded-2xl p-6 mb-16 max-w-3xl mx-auto w-full flex items-center justify-center gap-3 z-10 relative">
          <Activity className="animate-spin text-primary" size={20} />
          <span className="font-mono text-sm tracking-wide text-muted-foreground">Crawling block registry, verifying cryptographic hashes...</span>
        </div>
      )}

      {/* Live System Stats Board Section */}
      <section className="w-full max-w-7xl mx-auto mb-20 z-10 relative">
        <div className="glass-panel rounded-3xl p-8 border border-border/40 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-3xl md:text-5xl font-black tracking-tight text-primary font-mono">{stat.value}</span>
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Development Stepper / Process Timeline Section */}
      <section className="w-full max-w-7xl mx-auto mb-24 z-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">How Ballotic Secures Every Ballot</h2>
          <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl mx-auto">
            From the moment your credentials are typed to the public blockchain broadcast, vote integrity is mathematically verified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-6 flex flex-col justify-between relative border border-border/20 glass-card-hover min-h-60">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-border/30 font-mono select-none">{step.num}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-7xl mx-auto w-full z-10 relative">
        <div className="glass-panel rounded-2xl p-6 glass-card-hover">
          <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
            <Cpu size={24} />
          </div>
          <h3 className="font-bold text-xl mb-2 text-foreground">Cryptographic Chaining</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Every cast vote is cryptographically linked to the previous vote hash, creating a mathematical seal that makes backend database alteration impossible to hide.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 glass-card-hover">
          <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold text-xl mb-2 text-foreground">Hybrid Ledger Auditing</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            State audit trails are periodically logged onto L2 blockchain blocks, establishing permanent public receipts that guarantee voting logs are true.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 glass-card-hover">
          <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
            <Activity size={24} />
          </div>
          <h3 className="font-bold text-xl mb-2 text-foreground">Drizzle & Pool Performance</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Rebuilt backend powered by Drizzle ORM ensures low-latency operations and resilient connection scaling during high voter turnout periods.
          </p>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className="border-t border-border/50 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground max-w-7xl mx-auto w-full z-10 relative">
        <div>© 2026 Ballotic Voting Systems. Secure Standalone Edition.</div>
        <div className="flex gap-6 mt-4 md:mt-0 font-medium font-sans">
          <Link href="/faqs" className="hover:text-primary transition">FAQ & Security</Link>
          <a href="#" className="hover:text-primary transition">Audits</a>
          <a href="#" className="hover:text-primary transition">Docs</a>
        </div>
      </footer>
    </main>
  );
}