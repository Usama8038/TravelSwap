'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bus, MapPin, Calendar, Clock, Star, Eye, ShieldCheck, Zap, ArrowRight, ArrowLeft, Shield, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react';
import { demoTickets } from '@/data';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import GlassPanel from '@/components/ui/GlassPanel';
import TicketCard from '@/components/tickets/TicketCard';

export default function TicketDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [buying, setBuying] = useState(false);

  const ticket = demoTickets.find(t => t._id === id);
  
  if (!ticket) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <GlassPanel className="p-16 text-center border-white/5">
        <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-white/20" />
        <h2 className="text-3xl font-display font-medium text-white mb-3">Asset Not Found</h2>
        <Link href="/search" className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] hover:text-white transition-colors">← Return to Exchange</Link>
      </GlassPanel>
    </div>
  );

  const seller = typeof ticket.seller === 'object' ? ticket.seller : null;
  const saving = ticket.originalPrice - ticket.sellingPrice;
  const savingPct = Math.round((saving / ticket.originalPrice) * 100);
  const travelDate = new Date(ticket.travelDate);
  const aiSuggested = ticket.aiSuggestedPrice || ticket.sellingPrice;
  const confidenceScore = ticket.sellingPrice <= aiSuggested ? 'High' : 'Moderate';
  
  // Market intel mocked metrics
  const selloutProbability = ticket.isUrgent ? '94%' : '78%';

  const handleBuy = async () => {
    if (!user) { toast.error('Authentication required to execute trade'); router.push('/login'); return; }
    setBuying(true);
    await new Promise(r => setTimeout(r, 2000));
    toast.success('Trade executed. Asset secured in Escrow.');
    setBuying(false);
    router.push('/dashboard/buyer');
  };

  const similar = demoTickets.filter(t => t._id !== ticket._id && (t.source === ticket.source || t.destination === ticket.destination)).slice(0, 2);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vh] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/search" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-8 no-underline">
          <ArrowLeft className="w-4 h-4" /> Return to Terminal
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Primary Asset Card */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <GlassPanel className="p-10 border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                {/* Header */}
                <div className="flex items-start justify-between mb-10 pb-8 border-b border-white/10">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-[#050505] rounded-full flex items-center justify-center border border-white/10 shadow-inner">
                      <Bus className="w-6 h-6 text-[var(--accent)]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xl font-display font-medium text-white tracking-wide">{ticket.operator}</span>
                        {ticket.isUrgent && <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-500 uppercase tracking-widest"><Zap className="w-3 h-3" /> Priority</span>}
                      </div>
                      <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Premium Fleet • {ticket.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-full text-[var(--success)] text-[10px] uppercase tracking-widest font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" /> PNR Verified
                    </div>
                  </div>
                </div>

                {/* Route Visualization */}
                <div className="flex items-center justify-between gap-6 mb-12 px-2">
                  <div className="flex-1">
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-2 font-bold">Origin Terminal</p>
                    <p className="text-4xl font-display font-medium text-white">{ticket.source}</p>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                    <div className="w-full h-[1px] bg-white/10 absolute top-1/2 -translate-y-1/2" />
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent absolute top-1/2 -translate-y-1/2 opacity-70 shadow-[0_0_15px_var(--accent)]" />
                    <div className="relative z-10 w-10 h-10 rounded-full bg-[#050505] border border-[var(--accent)]/50 flex items-center justify-center text-[var(--accent)] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mt-4 font-bold">{ticket.travelTime}</p>
                  </div>

                  <div className="flex-1 text-right">
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-2 font-bold">Arrival Terminal</p>
                    <p className="text-4xl font-display font-medium text-white">{ticket.destination}</p>
                  </div>
                </div>

                {/* Micro Details Grid */}
                <div className="grid grid-cols-4 gap-4 p-5 bg-[#050505] rounded-2xl border border-white/5">
                  <div className="text-center">
                    <Calendar className="w-4 h-4 mx-auto mb-2 text-[var(--accent)]" />
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Date</p>
                    <p className="text-sm font-bold text-white mt-1">{travelDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <Clock className="w-4 h-4 mx-auto mb-2 text-[var(--accent)]" />
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Time</p>
                    <p className="text-sm font-bold text-white mt-1">{ticket.travelTime}</p>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <MapPin className="w-4 h-4 mx-auto mb-2 text-[var(--accent)]" />
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Seat</p>
                    <p className="text-sm font-bold text-white mt-1">{ticket.seatNumber || 'Unassigned'}</p>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <Eye className="w-4 h-4 mx-auto mb-2 text-[var(--accent)]" />
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Views</p>
                    <p className="text-sm font-bold text-white mt-1">{ticket.views}</p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>

            {/* AI Market Intelligence Engine */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <GlassPanel glow className="p-10 border-[var(--accent)]/10 shadow-[0_0_40px_rgba(212,175,55,0.03)] bg-[var(--accent)]/[0.02]">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-[var(--accent)]" />
                    <h3 className="text-xl font-display font-medium text-white tracking-wide">Intelligence Engine</h3>
                  </div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[var(--accent)] border border-[var(--accent)]/30 px-3 py-1.5 rounded-full bg-[var(--accent)]/5">
                    Live Data
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Price comparison */}
                  <div className="md:col-span-2 grid grid-cols-2 gap-6">
                    <div className="p-6 bg-[#050505] rounded-2xl border border-white/5 shadow-inner">
                      <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-2 font-bold">Operator Price</p>
                      <p className="text-2xl font-medium font-display text-white/50 line-through decoration-white/20">₹{ticket.originalPrice.toLocaleString()}</p>
                    </div>
                    <div className="p-6 bg-[var(--success)]/5 rounded-2xl border border-[var(--success)]/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 bg-[var(--success)]/10 rounded-bl-xl border-b border-l border-[var(--success)]/20">
                        <TrendingUp className="w-4 h-4 text-[var(--success)]" />
                      </div>
                      <p className="text-[10px] text-[var(--success)] uppercase tracking-widest mb-2 font-bold">Trading At</p>
                      <p className="text-3xl font-medium font-display text-[var(--success)]">₹{ticket.sellingPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Sellout forecast */}
                  <div className="p-6 bg-[#050505] rounded-2xl border border-white/5 flex flex-col justify-center shadow-inner">
                    <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-3 font-bold">Market Velocity</p>
                    <div className="flex items-end gap-2">
                      <p className="text-4xl font-display font-medium text-white leading-none">{selloutProbability}</p>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent)]" style={{ width: selloutProbability }} />
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-5 border border-[var(--accent)]/20 bg-[var(--accent)]/5 rounded-2xl flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-bold tracking-wide">Strong Buy Indicator</p>
                    <p className="text-xs text-[var(--muted)] mt-1.5 leading-relaxed">
                      This asset is priced below the AI predicted market value of ₹{aiSuggested.toLocaleString()}. 
                      Confidence score is <span className="text-[var(--accent)] font-bold">{confidenceScore}</span> due to imminent departure.
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>

            {/* Similar Tickets */}
            {similar.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-8 border-b border-white/10 pb-4">Related Assets</h3>
                <div className="grid sm:grid-cols-2 gap-8">
                  {similar.map((t, i) => (
                    <TicketCard key={t._id} ticket={t} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Sidebar (Right Column) */}
          <div className="space-y-8">
            
            {/* Purchase Terminal */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="sticky top-32">
              <GlassPanel className="p-10 border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                <div className="mb-10 pb-8 border-b border-white/10">
                  <div className="flex items-end justify-between mb-3">
                    <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">Total Value</p>
                    <div className="text-right">
                      <p className="text-4xl font-display font-medium text-white leading-none">₹{ticket.sellingPrice.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--success)] font-bold text-right">Yield: ₹{saving.toLocaleString()} ({savingPct}%)</p>
                </div>

                <button onClick={handleBuy} disabled={buying}
                  className="w-full py-5 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  {buying ? 'Executing Trade...' : 'Execute Acquisition'}
                </button>

                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-5 h-5 text-white/50 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-white uppercase tracking-widest">Escrow Protected</p>
                      <p className="text-xs text-[var(--muted)] mt-1">Capital secured until transfer is verified</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap className="w-5 h-5 text-[var(--accent)] shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest">Instant API Transfer</p>
                      <p className="text-xs text-[var(--muted)] mt-1">Automated execution via operator API</p>
                    </div>
                  </div>
                </div>
              </GlassPanel>

              {/* Seller Trust Module */}
              {seller && (
                <GlassPanel className="p-8 mt-8 border-white/5">
                  <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mb-6">Counterparty Profile</p>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-white font-display text-xl shadow-inner">
                      {seller.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-base font-medium font-display text-white flex items-center gap-2 mb-1">{seller.name} <CheckCircle className="w-3.5 h-3.5 text-[var(--success)]" /></p>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-[var(--accent)] fill-[var(--accent)]" />
                        <span className="text-xs font-bold text-white">{seller.ratings.average}</span>
                        <span className="text-[10px] text-[var(--muted)] uppercase tracking-widest">({seller.ratings.count} Reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#050505] rounded-xl border border-white/5 text-center shadow-inner">
                      <p className="text-xl font-display font-medium text-white mb-1">{seller.totalSales}</p>
                      <p className="text-[10px] uppercase text-[var(--muted)] font-bold tracking-widest">Trades</p>
                    </div>
                    <div className="p-4 bg-[#050505] rounded-xl border border-white/5 text-center shadow-inner">
                      <p className="text-sm font-bold text-[var(--success)] flex items-center justify-center gap-1 mb-1.5">
                        <ShieldCheck className="w-4 h-4" /> Pass
                      </p>
                      <p className="text-[10px] uppercase text-[var(--muted)] font-bold tracking-widest">KYC Clear</p>
                    </div>
                  </div>
                </GlassPanel>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
