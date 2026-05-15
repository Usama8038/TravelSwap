'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Package, DollarSign, TrendingUp, Eye, Bus, Calendar, MapPin, Edit, Trash2, X, Wallet, Clock, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { demoTickets, cities } from '@/data';
import toast from 'react-hot-toast';
import Link from 'next/link';
import GlassPanel from '@/components/ui/GlassPanel';

export default function SellerDashboard() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'bus', source: '', destination: '', travelDate: '', travelTime: '', operator: '', seatNumber: '', pnr: '', originalPrice: '', sellingPrice: '', description: '' });
  const myTickets = demoTickets.slice(0, 4);
  const stats = [
    { label: 'Active Assets', value: '4', icon: Package, color: 'var(--accent)' },
    { label: 'Settled Trades', value: '12', icon: TrendingUp, color: 'var(--success)' },
    { label: 'Total Capital Yield', value: '₹15,000', icon: DollarSign, color: 'var(--accent)' },
    { label: 'Market Views', value: '142', icon: Eye, color: 'var(--muted)' },
  ];

  if (!user) return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-24 pb-12">
      <GlassPanel className="p-12 text-center border-white/5">
        <ShieldCheck className="w-12 h-12 text-[var(--accent)] mx-auto mb-6 opacity-50" />
        <h2 className="text-2xl font-display font-medium text-white mb-4">Secure Terminal Access Required</h2>
        <Link href="/login" className="inline-block px-8 py-3 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-[10px] no-underline hover:bg-gray-200 transition-colors">Authenticate</Link>
      </GlassPanel>
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Asset deployed to market successfully! Pending Escrow verification.');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[50vw] h-[50vw] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-6">
          <div>
            <h1 className="text-4xl font-display font-medium text-white mb-2">Seller Terminal</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Welcome back, {user.name}</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Plus className="w-4 h-4" /> Deploy Asset
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <GlassPanel className="p-8 border-white/5 shadow-inner h-full flex flex-col justify-between">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-6 bg-black border border-white/10" style={{ color: s.color }}>
                  <s.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-3xl font-display font-medium text-white mb-1">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)]">{s.label}</p>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Wallet */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
          <GlassPanel className="p-8 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-[var(--accent)]/10 shadow-[0_0_30px_rgba(212,175,55,0.05)] bg-[var(--accent)]/[0.02]">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#050505] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shadow-inner">
                <Wallet className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] mb-1">Escrow Balance</p>
                <p className="text-4xl font-display font-medium text-white">₹{(user.wallet?.balance || 15000).toLocaleString()}</p>
              </div>
            </div>
            <button className="px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-transparent text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent)] hover:text-black transition-colors"
              onClick={() => toast.success('Withdrawal initiated to connected account!')}>Initiate Transfer</button>
          </GlassPanel>
        </motion.div>

        {/* Listings */}
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-6">Market Deployed Assets</h2>
        <div className="space-y-6">
          {myTickets.map((ticket, i) => {
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.5, duration: 0.6 }}>
                <GlassPanel glow className="p-8 border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-white/50 shadow-inner shrink-0">
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-display font-medium text-xl text-white mb-1 tracking-wide">{ticket.source} <span className="text-[var(--muted)] mx-2">→</span> {ticket.destination}</p>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-[var(--accent)]" />{new Date(ticket.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-[var(--accent)]" />{ticket.travelTime}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1.5"><Eye className="w-3 h-3 text-[var(--accent)]" />{ticket.views} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-1">Trading Price</p>
                      <p className="text-2xl font-display font-medium text-white">₹{ticket.sellingPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm border ${ticket.status === 'approved' ? 'border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]' : ticket.status === 'pending' ? 'border-amber-500/30 bg-amber-500/10 text-amber-500' : 'border-white/20 bg-white/5 text-white/70'}`}>
                        {ticket.status}
                      </span>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--muted)] hover:text-white hover:bg-white/10 transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--muted)] hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-colors" onClick={() => toast.success('Asset purged from market')}><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        {/* List Ticket Modal */}
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <GlassPanel className="p-8 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-2xl font-display font-medium text-white mb-1">Asset Deployment</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Enter secure asset details</p>
                    </div>
                    <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--muted)] hover:text-white hover:bg-white/10 transition-colors"><X className="w-4 h-4" /></button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Origin Terminal</label>
                        <input required list="src-cities" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} placeholder="City"
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder-[var(--muted)]" />
                        <datalist id="src-cities">{cities.map(c => <option key={c} value={c} />)}</datalist>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Arrival Terminal</label>
                        <input required list="dst-cities" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} placeholder="City"
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder-[var(--muted)]" />
                        <datalist id="dst-cities">{cities.map(c => <option key={c} value={c} />)}</datalist>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Departure Date</label>
                        <input required type="date" value={form.travelDate} onChange={e => setForm({ ...form, travelDate: e.target.value })} style={{ colorScheme: 'dark' }}
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Departure Time</label>
                        <input required type="time" value={form.travelTime} onChange={e => setForm({ ...form, travelTime: e.target.value })} style={{ colorScheme: 'dark' }}
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Verification (PNR)</label>
                        <input required value={form.pnr} onChange={e => setForm({ ...form, pnr: e.target.value })} placeholder="Reference No."
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder-[var(--muted)]" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Seat Allocation</label>
                        <input value={form.seatNumber} onChange={e => setForm({ ...form, seatNumber: e.target.value })} placeholder="e.g. 12A"
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder-[var(--muted)]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Original Acquisition Price</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] font-bold">₹</span>
                          <input required type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} placeholder="0"
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder-[var(--muted)]" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-2 block">Market Ask Price</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent)] font-bold">₹</span>
                          <input required type="number" value={form.sellingPrice} onChange={e => setForm({ ...form, sellingPrice: e.target.value })} placeholder="0"
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-[#050505] text-[var(--accent)] font-bold border border-[var(--accent)]/30 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder-[var(--muted)]" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Asset Notes</label>
                      <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Additional details..."
                        className="w-full px-4 py-3 rounded-xl text-sm h-24 resize-none bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder-[var(--muted)]" />
                    </div>

                    <button type="submit" className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] mt-4">Deploy to Trading Floor</button>
                  </form>
                </GlassPanel>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
