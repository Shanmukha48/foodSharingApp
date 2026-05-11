"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { ROLES, Role } from "@/lib/mockData";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>((params.get("role") as Role) || "Donor");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 1000));
    if (password.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
    const ok = register(name, email, password, role);
    if (ok) {
      setSuccess(true);
      await new Promise(r => setTimeout(r, 1500));
      const routes: Record<Role, string> = { Donor: "/dashboard/donor", NGO: "/dashboard/ngo", Volunteer: "/dashboard/volunteer" };
      router.push(routes[role]);
    } else {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const roleInfo: Record<Role, { desc: string; icon: string }> = {
    Donor: { desc: "Hotels, hospitals, restaurants, and individuals with surplus food.", icon: "🏨" },
    NGO: { desc: "Verified non-profits and charitable organizations distributing food.", icon: "🤝" },
    Volunteer: { desc: "Individuals helping with pickups and last-mile delivery.", icon: "🏃" },
  };

  if (success) return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <CheckCircle size={64} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Account Created!</h2>
        <p className="text-textGray">Redirecting to your dashboard...</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-emerald/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald/8 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="glass-panel border border-white/10 p-8 md:p-10 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-black font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-heading font-bold text-gradient">ShareByte</span>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-white">Join the movement</h1>
          <p className="text-textGray text-sm mt-2">Create your free account today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-textGray mb-2">I want to join as</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {ROLES.map(r => (
                <button key={r} type="button" onClick={() => setRole(r)}
                  className={`py-2 rounded-xl text-sm font-medium transition-all border ${role === r ? "bg-primary/20 border-primary text-primary" : "border-white/10 text-textGray hover:border-white/30"}`}>
                  {roleInfo[r].icon} {r}
                </button>
              ))}
            </div>
            <p className="text-xs text-textGray bg-white/5 rounded-lg px-3 py-2">{roleInfo[role].desc}</p>
          </div>

          <div>
            <label className="block text-sm text-textGray mb-2">Full Name / Organization</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Taj Hotel Mumbai" required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600" />
          </div>

          <div>
            <label className="block text-sm text-textGray mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600" />
          </div>

          <div>
            <label className="block text-sm text-textGray mb-2">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600 pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-textGray hover:text-white">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-black font-bold text-sm hover:bg-emerald transition-all shadow-[0_0_15px_rgba(46,255,139,0.2)] disabled:opacity-70">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-textGray text-sm mt-6">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return <Suspense><RegisterForm /></Suspense>;
}
