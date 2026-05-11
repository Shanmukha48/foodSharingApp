"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const foodCategories = ["Cooked Meals", "Packaged Food", "Fresh Produce", "Dairy", "Baked Goods", "Beverages"];

export default function DonatePage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    category: "", foodType: "", quantity: "", expiry: "", location: "", notes: "", phone: "",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-primary" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-white mb-3">Donation Posted!</h1>
        <p className="text-textGray mb-6">Your surplus food is now live. Nearby NGOs and volunteers have been alerted in real time.</p>
        <div className="glass-panel p-5 rounded-2xl mb-8 text-left space-y-2">
          <div className="flex justify-between text-sm"><span className="text-textGray">Food</span><span className="text-white">{form.foodType || form.category}</span></div>
          <div className="flex justify-between text-sm"><span className="text-textGray">Quantity</span><span className="text-white">{form.quantity}</span></div>
          <div className="flex justify-between text-sm"><span className="text-textGray">Location</span><span className="text-white">{form.location}</span></div>
          <div className="flex justify-between text-sm"><span className="text-textGray">Status</span><span className="text-primary font-medium">● Active</span></div>
        </div>
        <div className="flex gap-3">
          <Link href={user ? "/dashboard/donor" : "/"} className="flex-1 py-3 rounded-xl bg-primary text-black font-bold text-center hover:bg-emerald transition-all">Go to Dashboard</Link>
          <button onClick={() => { setSubmitted(false); setStep(1); setForm({ category: "", foodType: "", quantity: "", expiry: "", location: "", notes: "", phone: "" }); }}
            className="flex-1 py-3 rounded-xl glass-panel border border-white/10 text-textGray hover:text-white transition-colors text-sm">
            Donate Again
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="inline-block mb-3 px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider">Donate Surplus Food</span>
          <h1 className="text-4xl font-heading font-bold text-white mb-3">Every Byte <span className="text-gradient">Counts</span></h1>
          <p className="text-textGray">Post your surplus food in under 2 minutes. Our smart system handles the rest.</p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-10">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-primary text-black" : "bg-white/10 text-textGray"}`}>{s}</div>
              <div className={`flex-1 h-0.5 transition-all ${step > s ? "bg-primary" : "bg-white/10"}`} />
            </div>
          ))}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-primary text-black" : "bg-white/10 text-textGray"}`}>✓</div>
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel border border-white/10 p-8">
          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-5">
              <h2 className="text-xl font-heading font-semibold text-white mb-2">Food Details</h2>
              <div>
                <label className="text-sm text-textGray block mb-2">Food Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {foodCategories.map(cat => (
                    <button key={cat} type="button" onClick={() => setForm({ ...form, category: cat })}
                      className={`py-2 px-3 rounded-xl text-xs font-medium transition-all border ${form.category === cat ? "border-primary bg-primary/20 text-primary" : "border-white/10 text-textGray hover:border-white/30"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-textGray block mb-2">Specific Food Item</label>
                <input value={form.foodType} onChange={e => setForm({ ...form, foodType: e.target.value })} placeholder="e.g. Chicken Biryani, White Bread, Mixed Fruit" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-textGray block mb-2">Quantity</label>
                  <input required value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="e.g. 50 meals" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-sm text-textGray block mb-2">Expiry Window</label>
                  <select required value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary">
                    <option value="">Select...</option>
                    <option value="1h">Within 1 hour</option>
                    <option value="2h">Within 2 hours</option>
                    <option value="4h">Within 4 hours</option>
                    <option value="6h">Within 6 hours</option>
                    <option value="1d">Within 1 day</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-primary text-black font-bold hover:bg-emerald transition-all">Continue →</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-heading font-semibold text-white mb-2">Pickup Details</h2>
              <div>
                <label className="text-sm text-textGray block mb-2">Pickup Address</label>
                <input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Full address for pickup" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm text-textGray block mb-2">Contact Number</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm text-textGray block mb-2">Additional Notes</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Allergens, packaging info, access instructions..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary resize-none" />
              </div>

              {!user && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-sm text-textGray">You&apos;re donating as a guest. <Link href="/register?role=Donor" className="text-primary underline">Create an account</Link> to track your impact.</p>
                </div>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-white/10 text-textGray hover:border-white/30 transition-colors text-sm">← Back</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-primary text-black font-bold hover:bg-emerald transition-all">Post Donation</button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
