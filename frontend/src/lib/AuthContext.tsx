"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Role } from "@/lib/mockData";

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string, role: Role) => boolean;
  register: (name: string, email: string, password: string, role: Role) => boolean;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("sharebyte_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string, role: Role): boolean => {
    if (!email || !password) return false;
    const u: User = { id: "U" + Date.now(), name: email.split("@")[0], email, role };
    setUser(u);
    localStorage.setItem("sharebyte_user", JSON.stringify(u));
    return true;
  };

  const register = (name: string, email: string, password: string, role: Role): boolean => {
    if (!name || !email || !password) return false;
    const u: User = { id: "U" + Date.now(), name, email, role };
    setUser(u);
    localStorage.setItem("sharebyte_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sharebyte_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
