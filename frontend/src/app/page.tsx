"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import LandingPageSections from "@/components/sections/LandingPageSections";
import { useEffect, useState } from "react";
import { LIVE_DONATIONS } from "@/lib/mockData";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

const STATUS_COLORS: Record<string, string> = {
  Available: "bg-primary/20 text-primary",
  Claimed: "bg-blue-500/20 text-blue-400",
  "In Transit": "bg-yellow-500/20 text-yellow-400",
  Completed: "bg-gray-500/20 text-gray-400",
  Expired: "bg-red-500/20 text-red-400",
};

export default function Home() {
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTickerIndex(i => (i + 1) % LIVE_DONATIONS.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const current = LIVE_DONATIONS[tickerIndex];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-35">
          <HeroScene />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "linear-gradient(rgba(46,255,139,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(46,255,139,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-sm font-medium tracking-wider">Zero Waste. Zero Hunger.</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="text-6xl md:text-8xl font-heading font-bold mb-6 tracking-tight text-balance leading-none">
            Bridging <span className="text-gradient">Surplus</span><br className="hidden md:block" /> & Need
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-textGray text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            An intelligent food redistribution platform transforming excess into impact. We are not just a platform — we are a movement.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/donate" className="px-8 py-4 rounded-full bg-primary text-black font-bold hover:bg-emerald transition-all shadow-[0_0_25px_rgba(46,255,139,0.3)] hover:shadow-[0_0_40px_rgba(46,255,139,0.5)]">
              Donate Food
            </Link>
            <Link href="/register?role=NGO" className="px-8 py-4 rounded-full glass-panel font-semibold hover:bg-white/10 transition-colors border border-white/15">
              Join as NGO
            </Link>
            <Link href="/register?role=Volunteer" className="px-8 py-4 rounded-full border border-white/20 font-semibold hover:border-primary/50 transition-colors">
              Become Volunteer
            </Link>
          </motion.div>

          {/* Live Feed Ticker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-panel border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 max-w-lg w-full">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-xs font-bold uppercase tracking-wider">Live</span>
            </div>
            <motion.div key={tickerIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
              <span className="text-sm text-white truncate flex-1">{current.donor} — {current.qty} available</span>
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_COLORS[current.status]}`}>{current.status}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-textGray uppercase tracking-widest">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* All other sections */}
      <LandingPageSections />
    </div>
  );
}
