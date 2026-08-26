"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Vote, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Zap 
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

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-950/20 via-background to-background pt-24 px-4 md:px-8 flex flex-col justify-between w-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-12 mb-16 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6 backdrop-blur-sm"
        >
          <Zap size={14} className="animate-pulse" />
          Hybrid Web3 Vote Auditing Enabled
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight max-w-4xl"
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
          className="glass-panel rounded-2xl p-6 mb-16 border-primary/20 max-w-3xl mx-auto w-full relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-3 text-xs text-primary/40 font-mono">
            BLOCKCHAIN_VERIFY_LOG
          </div>
          <div className="flex gap-4 items-start">
            <div className={`p-3 rounded-xl ${auditResult.isValid ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">
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
        <div className="glass-panel rounded-2xl p-6 mb-16 max-w-3xl mx-auto w-full flex items-center justify-center gap-3">
          <Activity className="animate-spin text-primary" size={20} />
          <span className="font-mono text-sm tracking-wide text-muted-foreground">Crawling block registry, verifying cryptographic hashes...</span>
        </div>
      )}

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-7xl mx-auto w-full">
        <div className="glass-panel rounded-2xl p-6 glass-card-hover">
          <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
            <Cpu size={24} />
          </div>
          <h3 className="font-bold text-xl mb-2">Cryptographic Chaining</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Every cast vote is cryptographically linked to the previous vote hash, creating a mathematical seal that makes backend database alteration impossible to hide.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 glass-card-hover">
          <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold text-xl mb-2">Hybrid Ledger Auditing</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            State audit trails are periodically logged onto L2 blockchain blocks, establishing permanent public receipts that guarantee voting logs are true.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 glass-card-hover">
          <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
            <Activity size={24} />
          </div>
          <h3 className="font-bold text-xl mb-2">Drizzle & Pool Performance</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Rebuilt backend powered by Drizzle ORM ensures low-latency operations and resilient connection scaling during high voter turnout periods.
          </p>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className="border-t border-border/50 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground max-w-7xl mx-auto w-full">
        <div>© 2026 Ballotic Voting Systems. Secure Standalone Edition.</div>
        <div className="flex gap-6 mt-4 md:mt-0 font-medium">
          <Link href="/faqs" className="hover:text-primary transition">FAQ & Security</Link>
          <a href="#" className="hover:text-primary transition">Audits</a>
          <a href="#" className="hover:text-primary transition">Docs</a>
        </div>
      </footer>
    </main>
  );
}
