"use client";

import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Bell, ChevronDown, LogOut } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "Donor") return "/dashboard/donor";
    if (user.role === "NGO") return "/dashboard/ngo";
    if (user.role === "Volunteer") return "/dashboard/volunteer";
    return "/dashboard/admin";
  };

  return (
    <nav className={`fixed w-full top-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg" : "bg-transparent"}`}>
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-black font-bold text-sm">S</span>
        </div>
        <span className="text-xl font-heading font-bold text-gradient">ShareByte</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/#about" className="text-sm text-textGray hover:text-white transition-colors">About</Link>
        <Link href="/#impact" className="text-sm text-textGray hover:text-white transition-colors">Impact</Link>
        <Link href="/#platform" className="text-sm text-textGray hover:text-white transition-colors">Platform</Link>
        <Link href="/#flow" className="text-sm text-textGray hover:text-white transition-colors">How It Works</Link>
        <Link href="/donate" className="text-sm text-textGray hover:text-white transition-colors">Donate</Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => { setShowNotifs(!showNotifs); setShowUserMenu(false); }} className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                <Bell size={18} className="text-textGray" />
                {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />}
              </button>
              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 glass-panel border border-white/10 p-2 shadow-2xl"
                  >
                    <p className="text-xs text-textGray font-medium px-2 py-1 uppercase tracking-wider">Notifications</p>
                    {NOTIFICATIONS.map(n => (
                      <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer ${!n.read ? "bg-primary/5" : ""}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? "bg-primary" : "bg-gray-600"}`} />
                        <div>
                          <p className="text-sm text-white">{n.message}</p>
                          <p className="text-xs text-textGray mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User menu */}
            <div className="relative">
              <button onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifs(false); }} className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel hover:bg-white/10 transition-colors">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-emerald flex items-center justify-center">
                  <span className="text-black text-xs font-bold">{user.name[0].toUpperCase()}</span>
                </div>
                <span className="text-sm text-white">{user.name.split(" ")[0]}</span>
                <ChevronDown size={14} className="text-textGray" />
              </button>
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 glass-panel border border-white/10 p-2 shadow-2xl"
                  >
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-primary">{user.role}</p>
                    </div>
                    <Link href={getDashboardLink()} onClick={() => setShowUserMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-textGray hover:text-white hover:bg-white/5 transition-colors">
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); setShowUserMenu(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors">
                      <LogOut size={14} /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-textGray hover:text-white transition-colors">Log in</Link>
            <Link href="/register" className="px-5 py-2 rounded-full bg-primary text-black font-semibold text-sm hover:bg-emerald transition-colors shadow-[0_0_15px_rgba(46,255,139,0.3)]">
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col gap-4 md:hidden"
          >
            <Link href="/#about" onClick={() => setMenuOpen(false)} className="text-textGray hover:text-white py-2">About</Link>
            <Link href="/#impact" onClick={() => setMenuOpen(false)} className="text-textGray hover:text-white py-2">Impact</Link>
            <Link href="/#platform" onClick={() => setMenuOpen(false)} className="text-textGray hover:text-white py-2">Platform</Link>
            <Link href="/donate" onClick={() => setMenuOpen(false)} className="text-textGray hover:text-white py-2">Donate</Link>
            {user ? (
              <>
                <Link href={getDashboardLink()} onClick={() => setMenuOpen(false)} className="text-primary py-2">Dashboard</Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="text-red-400 text-left py-2">Sign out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-textGray hover:text-white py-2">Log in</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="px-5 py-2 rounded-full bg-primary text-black font-semibold text-sm text-center">Get Started</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
