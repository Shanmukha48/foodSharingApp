"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LIVE_DONATIONS, USERS } from "@/lib/mockData";
import { Users, Package, CheckCircle, TrendingUp, Shield, Trash2 } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Available: "text-primary bg-primary/10",
  Claimed: "text-blue-400 bg-blue-400/10",
  "In Transit": "text-yellow-400 bg-yellow-400/10",
  Completed: "text-gray-400 bg-gray-400/10",
  Verified: "text-primary bg-primary/10",
  Active: "text-blue-400 bg-blue-400/10",
};

const tabs = ["Overview", "Users", "Donations", "Analytics"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-background pt-6 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Admin <span className="text-gradient">Control Panel</span></h1>
            <p className="text-textGray mt-1">Full platform oversight and management</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <Shield size={14} /> Admin Access
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 glass-panel rounded-xl w-fit mb-8">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t ? "bg-primary text-black" : "text-textGray hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Users, label: "Total Users", value: "12,840", delta: "+234 this week", color: "bg-primary" },
                { icon: Package, label: "Active Donations", value: "347", delta: "+18 today", color: "bg-blue-400" },
                { icon: CheckCircle, label: "Meals Redistributed", value: "850K+", delta: "+1,240 today", color: "bg-emerald" },
                { icon: TrendingUp, label: "Platform Score", value: "98.2%", delta: "Uptime 30d", color: "bg-yellow-400" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-panel p-6 hover-glow">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                    <s.icon size={18} className="text-black" />
                  </div>
                  <div className="text-2xl font-heading font-bold text-white mb-1">{s.value}</div>
                  <div className="text-textGray text-sm">{s.label}</div>
                  <div className="text-primary text-xs mt-2">{s.delta}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="glass-panel border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-heading font-semibold text-white">Live Activity Feed</h2>
              </div>
              <div className="divide-y divide-white/5">
                {LIVE_DONATIONS.map((d, i) => (
                  <motion.div key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{d.donor}</p>
                      <p className="text-textGray text-xs">{d.food} · {d.qty}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_COLORS[d.status]}`}>{d.status}</span>
                    <span className="text-textGray text-xs">{d.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Users" && (
          <div className="glass-panel border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-white">User Management</h2>
              <span className="text-xs text-textGray">{USERS.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["ID", "Name", "Email", "Role", "Donations", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-textGray font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {USERS.map((u, i) => (
                    <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-6 py-4 text-textGray font-mono text-xs">{u.id}</td>
                      <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                      <td className="px-6 py-4 text-textGray">{u.email}</td>
                      <td className="px-6 py-4"><span className="text-primary text-xs border border-primary/30 px-2 py-0.5 rounded-full">{u.role}</span></td>
                      <td className="px-6 py-4 text-textGray">{u.donations}</td>
                      <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[u.status]}`}>{u.status}</span></td>
                      <td className="px-6 py-4">
                        <button className="text-red-400 hover:text-red-300 transition-colors p-1 rounded hover:bg-red-500/10">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Donations" && (
          <div className="glass-panel border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-heading font-semibold text-white">All Donations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["ID", "Donor", "Food", "Quantity", "Time", "Status"].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-textGray font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LIVE_DONATIONS.map((d, i) => (
                    <motion.tr key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-6 py-4 text-textGray font-mono text-xs">{d.id}</td>
                      <td className="px-6 py-4 text-white font-medium">{d.donor}</td>
                      <td className="px-6 py-4 text-textGray">{d.food}</td>
                      <td className="px-6 py-4 text-textGray">{d.qty}</td>
                      <td className="px-6 py-4 text-textGray">{d.time}</td>
                      <td className="px-6 py-4"><span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_COLORS[d.status]}`}>{d.status}</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Analytics" && (
          <div className="space-y-6">
            <div className="glass-panel p-8 border border-white/10">
              <h2 className="text-lg font-heading font-semibold text-white mb-6">Platform Analytics</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { label: "Donor Retention Rate", value: 84 },
                  { label: "NGO Satisfaction Score", value: 91 },
                  { label: "Successful Match Rate", value: 94 },
                  { label: "On-Time Delivery Rate", value: 78 },
                ].map(bar => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-textGray">{bar.label}</span>
                      <span className="text-white font-medium">{bar.value}%</span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-primary to-emerald rounded-full" initial={{ width: 0 }} animate={{ width: `${bar.value}%` }} transition={{ duration: 1.2, ease: "easeOut" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
