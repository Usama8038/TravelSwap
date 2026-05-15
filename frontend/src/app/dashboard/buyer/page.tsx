'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle, Star, Bus, Calendar, Download, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { demoTickets } from '@/data';
import Link from 'next/link';
import toast from 'react-hot-toast';
import GlassPanel from '@/components/ui/GlassPanel';

export default function BuyerDashboard() {
  const { user } = useAuth();

  if (!user) return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-24 pb-12">
      <GlassPanel className="p-12 text-center border-white/5">
        <ShieldCheck className="w-12 h-12 text-[var(--accent)] mx-auto mb-6 opacity-50" />
        <h2 className="text-2xl font-display font-medium text-white mb-4">Secure Terminal Access Required</h2>
        <Link href="/login" className="inline-block px-8 py-3 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-[10px] no-underline hover:bg-gray-200 transition-colors">Authenticate</Link>
      </GlassPanel>
    </div>
  );

  const purchases = [
    { ticket: demoTickets[0], status: 'Escrow Released', date: '2024-12-15', amount: 4200 },
    { ticket: demoTickets[1], status: 'Transfer Verified', date: '2024-12-18', amount: 900 },
  ];

  const stats = [
    { label: 'Total Acquisitions', value: '2', icon: ShoppingBag, color: 'var(--accent)' },
    { label: 'Active Escrows', value: '1', icon: Clock, color: 'var(--muted)' },
    { label: 'Settled Trades', value: '1', icon: CheckCircle, color: 'var(--success)' },
    { label: 'Capital Saved', value: '₹1,600', icon: Star, color: 'var(--accent)' },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-display font-medium text-white mb-2">Acquisition Portfolio</h1>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold">Track your secured travel assets</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-[var(--success)]/10 border border-[var(--success)]/20 px-4 py-2 rounded-full text-[var(--success)]">
            Account Verified
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <GlassPanel className="p-8 border-white/5 shadow-inner">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-6 bg-black border border-white/10" style={{ color: s.color }}>
                  <s.icon className="w-4 h-4" />
                </div>
                <p className="text-3xl font-display font-medium text-white mb-1">{s.value}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)]">{s.label}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-6">Recent Transactions</h2>
        <div className="space-y-6">
          {purchases.map((order, i) => {
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}>
                <GlassPanel glow className="p-8 border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-[#050505] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shadow-inner">
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-display font-medium text-xl text-white mb-1 tracking-wide">{order.ticket.source} <span className="text-[var(--muted)] mx-2">→</span> {order.ticket.destination}</p>
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                        <span>{order.ticket.operator}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1.5 text-[var(--accent)]"><Calendar className="w-3 h-3" />{new Date(order.ticket.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-1">Acquisition Cost</p>
                      <p className="text-2xl font-display font-medium text-white">₹{order.amount.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm border border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]">
                        {order.status}
                      </span>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--muted)] hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => toast.success('Asset downloaded to local vault.')}><Download className="w-3.5 h-3.5" /></button>
                        <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--muted)] hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => toast('Concierge notified.')}><MessageSquare className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>

                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link href="/search" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] no-underline">
            Access Trading Floor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
