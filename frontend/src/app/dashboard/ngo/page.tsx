"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LIVE_DONATIONS } from "@/lib/mockData";
import { CheckCircle, Clock, Truck, MapPin, Bell, RefreshCcw } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Available: "text-primary bg-primary/10 border-primary/30",
  Claimed: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  "In Transit": "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  Completed: "text-gray-400 bg-gray-400/10 border-gray-400/30",
};

export default function NGODashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [donations, setDonations] = useState(LIVE_DONATIONS);
  const [claimed, setClaimed] = useState<string[]>([]);
  const [newAlert, setNewAlert] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const timer = setInterval(() => {
      setNewAlert(true);
      setTimeout(() => setNewAlert(false), 4000);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  if (!user) { router.push("/login"); return null; }

  const handleClaim = (id: string) => {
    setClaimed(c => [...c, id]);
    setDonations(d => d.map(item => item.id === id ? { ...item, status: "Claimed" } : item));
  };

  const filtered = filter === "All" ? donations : donations.filter(d => d.status === filter);

  return (
    <div className="min-h-screen bg-background pt-6 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">NGO <span className="text-gradient">Operations Hub</span></h1>
            <p className="text-textGray mt-1">Welcome, {user.name} · Manage incoming donation requests</p>
          </div>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {newAlert && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-primary text-sm">
                  <Bell size={14} className="animate-bounce" /> New donation nearby!
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => setDonations([...LIVE_DONATIONS])} className="flex items-center gap-2 px-4 py-2 glass-panel rounded-xl text-textGray hover:text-white text-sm transition-colors">
              <RefreshCcw size={14} /> Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Bell, label: "Available Now", value: donations.filter(d => d.status === "Available").length.toString(), color: "bg-primary" },
            { icon: CheckCircle, label: "Claimed Today", value: claimed.length.toString(), color: "bg-blue-400" },
            { icon: Truck, label: "In Transit", value: donations.filter(d => d.status === "In Transit").length.toString(), color: "bg-yellow-400" },
            { icon: CheckCircle, label: "Completed", value: donations.filter(d => d.status === "Completed").length.toString(), color: "bg-gray-400" },
          ].map(s => (
            <div key={s.label} className="glass-panel p-6 hover-glow">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon size={18} className="text-black" />
              </div>
              <div className="text-2xl font-heading font-bold text-white mb-1">{s.value}</div>
              <div className="text-textGray text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["All", "Available", "Claimed", "In Transit", "Completed"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all border ${filter === f ? "bg-primary/20 border-primary text-primary" : "border-white/10 text-textGray hover:border-white/30"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Donation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass-panel p-6 hover-glow border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-semibold text-sm leading-tight pr-2">{d.donor}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border flex-shrink-0 ${STATUS_COLORS[d.status] || "text-gray-400 bg-gray-400/10 border-gray-400/30"}`}>{d.status}</span>
              </div>
              <p className="text-primary font-medium mb-1">{d.food}</p>
              <p className="text-textGray text-sm mb-1">{d.qty}</p>
              <div className="flex items-center gap-1 text-textGray text-xs mb-4">
                <MapPin size={11} /> <span>Mumbai Central</span>
                <Clock size={11} className="ml-2" /> <span>{d.time}</span>
              </div>

              {/* Time-Sensitivity Score */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-textGray">Time-Sensitivity Score</span>
                  <span className="text-primary font-medium">{Math.floor(70 + Math.random() * 25)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-emerald rounded-full" style={{ width: `${70 + Math.random() * 25}%` }} />
                </div>
              </div>

              {d.status === "Available" && !claimed.includes(d.id) ? (
                <button onClick={() => handleClaim(d.id)}
                  className="w-full py-2.5 rounded-xl bg-primary text-black font-bold text-sm hover:bg-emerald transition-all">
                  Claim Donation
                </button>
              ) : (
                <div className="w-full py-2.5 rounded-xl bg-white/5 text-textGray text-sm text-center">
                  {claimed.includes(d.id) ? "✓ Claimed by you" : d.status}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
