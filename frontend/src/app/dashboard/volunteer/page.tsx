"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LIVE_DONATIONS } from "@/lib/mockData";
import { MapPin, CheckCircle, Navigation, Star, Truck } from "lucide-react";

const assignments = LIVE_DONATIONS.slice(0, 3).map((d, i) => ({
  ...d,
  status: ["Assigned", "Picking Up", "Delivered"][i],
  distance: `${(1.2 + i * 0.8).toFixed(1)} km`,
  reward: 50 + i * 25,
}));

const STEP_COLORS: Record<string, string> = {
  Assigned: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  "Picking Up": "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Delivered: "text-primary bg-primary/10 border-primary/30",
};

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState(assignments);
  const [points, setPoints] = useState(450);

  if (!user) { router.push("/login"); return null; }

  const advance = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      if (t.status === "Assigned") return { ...t, status: "Picking Up" };
      if (t.status === "Picking Up") { setPoints(p => p + t.reward); return { ...t, status: "Delivered" }; }
      return t;
    }));
  };

  const btnLabel: Record<string, string> = { Assigned: "Start Pickup", "Picking Up": "Confirm Delivery", Delivered: "✓ Completed" };

  return (
    <div className="min-h-screen bg-background pt-6 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Volunteer <span className="text-gradient">Hub</span></h1>
            <p className="text-textGray mt-1">Welcome, {user.name} · Your pickups make a difference</p>
          </div>
          <div className="flex items-center gap-2 glass-panel px-5 py-3 rounded-2xl border border-primary/20">
            <Star size={18} className="text-yellow-400" />
            <span className="text-white font-bold">{points} pts</span>
            <span className="text-textGray text-sm">· Level 3 Hero</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Truck, label: "Active Assignments", value: tasks.filter(t => t.status !== "Delivered").length.toString(), color: "bg-primary" },
            { icon: CheckCircle, label: "Completed Today", value: tasks.filter(t => t.status === "Delivered").length.toString(), color: "bg-emerald" },
            { icon: Navigation, label: "Total Distance", value: "12.4 km", color: "bg-blue-400" },
            { icon: Star, label: "Reward Points", value: points.toString(), color: "bg-yellow-400" },
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

        {/* Task Cards */}
        <h2 className="text-xl font-heading font-semibold text-white mb-5">Your Assignments</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tasks.map((task, i) => (
            <motion.div key={task.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 hover-glow border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-semibold text-sm">{task.donor}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border ${STEP_COLORS[task.status]}`}>{task.status}</span>
              </div>
              <p className="text-primary font-medium text-sm mb-1">{task.food}</p>
              <p className="text-textGray text-sm mb-3">{task.qty}</p>
              <div className="flex items-center gap-3 text-xs text-textGray mb-4">
                <span className="flex items-center gap-1"><MapPin size={11} />{task.distance}</span>
                <span className="flex items-center gap-1"><Star size={11} className="text-yellow-400" />+{task.reward} pts</span>
              </div>

              {/* Progress Steps */}
              <div className="flex gap-1 mb-4">
                {["Assigned", "Picking Up", "Delivered"].map((step, idx) => {
                  const stepIdx = ["Assigned", "Picking Up", "Delivered"].indexOf(task.status);
                  return (
                    <div key={step} className={`h-1 flex-1 rounded-full transition-all ${idx <= stepIdx ? "bg-primary" : "bg-white/10"}`} />
                  );
                })}
              </div>

              <button onClick={() => advance(task.id)} disabled={task.status === "Delivered"}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${task.status === "Delivered" ? "bg-white/5 text-textGray cursor-not-allowed" : "bg-primary text-black hover:bg-emerald"}`}>
                {btnLabel[task.status]}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="mt-10 glass-panel border border-yellow-400/10 p-6">
          <h2 className="text-xl font-heading font-semibold text-white mb-5 flex items-center gap-2"><Star size={18} className="text-yellow-400" /> Top Volunteers This Month</h2>
          <div className="space-y-3">
            {[
              { rank: 1, name: "Ananya Krishnan", pts: 1250, deliveries: 42 },
              { rank: 2, name: "Rohit Verma", pts: 980, deliveries: 33 },
              { rank: 3, name: user.name, pts: points, deliveries: 18 },
            ].map(v => (
              <div key={v.rank} className={`flex items-center gap-4 p-3 rounded-xl ${v.rank === 3 ? "bg-primary/5 border border-primary/20" : "hover:bg-white/3"} transition-colors`}>
                <span className={`text-sm font-bold w-6 ${v.rank === 1 ? "text-yellow-400" : v.rank === 2 ? "text-gray-300" : "text-primary"}`}>#{v.rank}</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald flex items-center justify-center text-black text-xs font-bold flex-shrink-0">{v.name[0]}</div>
                <span className="text-white text-sm flex-1">{v.name}{v.rank === 3 && " (You)"}</span>
                <span className="text-textGray text-xs">{v.deliveries} deliveries</span>
                <span className="text-primary font-bold text-sm">{v.pts} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
