"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LIVE_DONATIONS, NOTIFICATIONS } from "@/lib/mockData";
import { Plus, Package, CheckCircle, Clock, Truck, Bell, TrendingUp, Leaf } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Available: "text-primary bg-primary/10",
  Claimed: "text-blue-400 bg-blue-400/10",
  "In Transit": "text-yellow-400 bg-yellow-400/10",
  Completed: "text-gray-400 bg-gray-400/10",
};

const myDonations = LIVE_DONATIONS.slice(0, 4);

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="glass-panel p-6 hover-glow">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon size={20} className="text-black" />
      </div>
      <div className="text-2xl font-heading font-bold text-white mb-1">{value}</div>
      <div className="text-textGray text-sm">{label}</div>
    </div>
  );
}

export default function DonorDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ foodType: "", quantity: "", expiry: "", location: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!user) { router.push("/login"); return null; }

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ foodType: "", quantity: "", expiry: "", location: "" }); }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-6 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Welcome back, <span className="text-gradient">{user.name}</span></h1>
            <p className="text-textGray mt-1">Donor Dashboard · Your surplus is someone's sustenance.</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-bold hover:bg-emerald transition-all shadow-[0_0_15px_rgba(46,255,139,0.2)]">
            <Plus size={18} /> Post Donation
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={Package} label="Total Donations" value="47" color="bg-primary" />
          <StatCard icon={CheckCircle} label="Completed" value="41" color="bg-emerald" />
          <StatCard icon={Clock} label="Pending" value="3" color="bg-yellow-400" />
          <StatCard icon={Leaf} label="CO₂ Offset (kg)" value="128" color="bg-blue-400" />
        </div>

        {/* Donations Table */}
        <div className="glass-panel border border-white/10 overflow-hidden mb-8">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-white">My Donations</h2>
            <span className="text-xs text-textGray">{myDonations.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-textGray font-medium">Food Type</th>
                  <th className="text-left px-6 py-4 text-textGray font-medium">Quantity</th>
                  <th className="text-left px-6 py-4 text-textGray font-medium">Posted</th>
                  <th className="text-left px-6 py-4 text-textGray font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {myDonations.map((d, i) => (
                  <motion.tr key={d.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{d.food}</td>
                    <td className="px-6 py-4 text-textGray">{d.qty}</td>
                    <td className="px-6 py-4 text-textGray">{d.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[d.status] || "text-gray-400 bg-gray-400/10"}`}>{d.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ESG Impact Card */}
        <div className="glass-panel border border-primary/20 p-8">
          <h2 className="text-xl font-heading font-semibold text-white mb-6 flex items-center gap-2"><TrendingUp size={20} className="text-primary" /> Your ESG Impact Report</h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div><div className="text-3xl font-bold text-gradient mb-1">2,350</div><div className="text-textGray text-sm">Meals Provided</div></div>
            <div><div className="text-3xl font-bold text-gradient mb-1">128 kg</div><div className="text-textGray text-sm">CO₂ Saved</div></div>
            <div><div className="text-3xl font-bold text-gradient mb-1">8,400 L</div><div className="text-textGray text-sm">Water Conserved</div></div>
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel border border-white/10 p-8 w-full max-w-md">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={56} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Donation Posted!</h3>
                <p className="text-textGray">Nearby NGOs are being alerted now.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-heading font-bold text-white mb-6">Post a Donation</h3>
                <form onSubmit={handleDonate} className="space-y-4">
                  <div>
                    <label className="text-sm text-textGray block mb-2">Food Type</label>
                    <input required value={form.foodType} onChange={e => setForm({ ...form, foodType: e.target.value })} placeholder="e.g. Biryani, Bread, Fruits" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-textGray block mb-2">Quantity</label>
                    <input required value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 50 meals, 20 kg" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-textGray block mb-2">Expiry Window</label>
                    <select required value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary">
                      <option value="" className="bg-background">Select window</option>
                      <option value="2h" className="bg-background">Within 2 hours</option>
                      <option value="4h" className="bg-background">Within 4 hours</option>
                      <option value="6h" className="bg-background">Within 6 hours</option>
                      <option value="1d" className="bg-background">Within 1 day</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-textGray block mb-2">Pickup Location</label>
                    <input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. 123 Main St, Mumbai" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-textGray hover:border-white/30 transition-colors text-sm">Cancel</button>
                    <button type="submit" className="flex-1 py-3 rounded-xl bg-primary text-black font-bold text-sm hover:bg-emerald transition-all">Post Donation</button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
