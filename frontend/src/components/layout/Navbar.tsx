'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, LayoutDashboard, Search, ChevronDown, Shield, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/60 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-full bg-[#111] border border-[var(--accent)]/30 flex items-center justify-center group-hover:border-[var(--accent)] transition-colors shadow-[0_0_15px_var(--glow-color)]">
              <Sparkles className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <span className="text-2xl font-bold font-display text-white tracking-wide">TravelSwap</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '/search', label: 'Marketplace', icon: Search },
              { href: '/about', label: 'About', icon: null },
              { href: '/contact', label: 'Contact', icon: null },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest no-underline transition-all duration-300 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-white/10 bg-black/40 transition-all hover:border-[var(--accent)]/50 group">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 flex items-center justify-center text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4 text-[var(--muted)] group-hover:text-white transition-colors" />
                </button>
                
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 rounded-2xl overflow-hidden shadow-2xl z-50 bg-[#0A0A0A] border border-[var(--accent)]/20">
                      <div className="p-5 border-b border-white/5 bg-black/40">
                        <p className="text-sm font-bold text-white tracking-wide">{user.name}</p>
                        <p className="text-xs text-[var(--muted)] mt-1">{user.email}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <Link href="/dashboard/seller" onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[var(--muted)] no-underline transition-all hover:bg-white/5 hover:text-white">
                          <LayoutDashboard className="w-4 h-4" /> Seller Dashboard
                        </Link>
                        <Link href="/dashboard/buyer" onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[var(--muted)] no-underline transition-all hover:bg-white/5 hover:text-white">
                          <User className="w-4 h-4" /> Buyer Dashboard
                        </Link>
                        {isAdmin && (
                          <Link href="/admin" onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[var(--accent)] no-underline transition-all hover:bg-[var(--accent)]/10">
                            <Shield className="w-4 h-4" /> Admin Panel
                          </Link>
                        )}
                        <button onClick={() => { logout(); setProfileOpen(false); }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold w-full transition-all hover:bg-red-500/10 text-red-400">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login"
                  className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest no-underline transition-all hover:text-white">
                  Sign In
                </Link>
                <Link href="/signup"
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-black uppercase tracking-widest no-underline gradient-bg btn-press transition-all hover:shadow-[0_0_20px_var(--glow-color)]">
                  Join Exchange
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#0A0A0A] border-t border-white/5">
            <div className="p-6 space-y-4">
              {['/search', '/about', '/contact'].map(href => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className="block text-lg font-display font-bold text-white no-underline tracking-wide">
                  {href.replace('/', '').charAt(0).toUpperCase() + href.slice(2)}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-6" />
              {user ? (
                <div className="space-y-4">
                  <Link href="/dashboard/seller" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--muted)] uppercase tracking-widest">Seller Dashboard</Link>
                  <Link href="/dashboard/buyer" onClick={() => setMobileOpen(false)} className="block text-sm font-bold text-[var(--muted)] uppercase tracking-widest">Buyer Dashboard</Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left text-sm font-bold text-red-400 uppercase tracking-widest">Sign Out</button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="text-center py-3 rounded-xl border border-white/10 text-white font-bold uppercase tracking-widest text-sm">Sign In</Link>
                  <Link href="/signup" onClick={() => setMobileOpen(false)} className="text-center py-3 rounded-xl gradient-bg text-black font-bold uppercase tracking-widest text-sm">Join Exchange</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
