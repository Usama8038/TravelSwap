'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, ShieldCheck, Zap, Activity, Clock, ArrowRight, Shield, Award } from 'lucide-react';
import TicketCard from '@/components/tickets/TicketCard';
import GlassPanel from '@/components/ui/GlassPanel';
import { demoTickets } from '@/data';

function ActivityTicker() {
  return (
    <div className="w-full border-y border-white/5 bg-black/80 backdrop-blur-md py-4 overflow-hidden flex whitespace-nowrap relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      <motion.div 
        animate={{ x: [0, -1000] }} 
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex gap-16 text-xs font-bold uppercase tracking-widest text-[var(--muted)]"
      >
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="flex items-center gap-3"><Activity className="w-4 h-4 text-[var(--accent)]" /> Hyderabad → Bangalore <span className="text-[var(--success)]">Sold in 4 mins</span></span>
            <span className="flex items-center gap-3"><Activity className="w-4 h-4 text-[var(--accent)]" /> Mumbai → Pune <span className="text-[var(--success)]">Verified Transfer</span></span>
            <span className="flex items-center gap-3"><Activity className="w-4 h-4 text-[var(--accent)]" /> Delhi → Jaipur <span className="text-[var(--success)]">Sold in 12 mins</span></span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const [searchSource, setSearchSource] = useState('');
  const [searchDest, setSearchDest] = useState('');

  return (
    <div className="bg-black min-h-screen">
      {/* SECTION 1 — Cinematic Hero */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-12">
        {/* Cinematic Deep Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[70vw] h-[70vw] rounded-full opacity-30 mix-blend-screen filter blur-[120px] bg-[var(--accent)]/10 animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] rounded-full opacity-20 mix-blend-screen filter blur-[120px] bg-[var(--success)]/10" style={{ animationDelay: '3s' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-10" />
          {/* Subtle noise/grid texture */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Hero Copy (Staggered Animation) */}
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-[var(--accent)] text-[10px] font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
                  <Zap className="w-3.5 h-3.5" /> First-Class Mobility Exchange
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl lg:text-8xl font-display font-medium text-white leading-[1.05] tracking-tight mb-8">
                Trade Premium <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--success)]">Travel Assets</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl text-[var(--muted)] max-w-xl font-medium leading-relaxed mb-12">
                The exclusive marketplace for luxury bus tickets. Escrow-protected, AI-verified, and transferred with absolute discretion.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Escrow Protected</span>
                </div>
                <div className="flex -space-x-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border border-[var(--accent)]/30 bg-[#0B0B0B] flex items-center justify-center text-[10px] font-bold text-white/50 shadow-lg">
                      U{i+1}
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 flex items-center justify-center text-xs font-bold text-[var(--accent)] backdrop-blur-md shadow-lg">
                    +8k
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Premium Search Panel */}
            <motion.div initial={{ opacity: 0, scale: 0.98, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5">
              <GlassPanel className="p-8 border-t border-[var(--accent)]/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <h3 className="text-xl font-display font-medium text-white tracking-wide">Route Intelligence</h3>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--success)]">
                    <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--success)]"></span></span>
                    Live Feed
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" />
                    <input value={searchSource} onChange={e => setSearchSource(e.target.value)} placeholder="Departure Terminal"
                      className="w-full bg-[#050505] border border-white/10 rounded-2xl py-5 pl-14 pr-5 text-white font-medium placeholder-[var(--muted)] focus:border-[var(--accent)] transition-all focus:ring-1 focus:ring-[var(--accent)] outline-none shadow-inner" />
                  </div>
                  <div className="relative group">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" />
                    <input value={searchDest} onChange={e => setSearchDest(e.target.value)} placeholder="Arrival Terminal"
                      className="w-full bg-[#050505] border border-white/10 rounded-2xl py-5 pl-14 pr-5 text-white font-medium placeholder-[var(--muted)] focus:border-[var(--accent)] transition-all focus:ring-1 focus:ring-[var(--accent)] outline-none shadow-inner" />
                  </div>
                  
                  {/* Predictive UI hint */}
                  {(searchSource || searchDest) && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="py-2 px-2 text-[10px] text-[var(--accent)] font-bold uppercase tracking-widest flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5" /> High Demand Detected • Avg Return: 28%
                    </motion.div>
                  )}

                  <Link href={`/search?source=${searchSource}&destination=${searchDest}`} className="w-full block mt-4 no-underline">
                    <div className="w-full py-5 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gray-200 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      Explore Market <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </GlassPanel>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* SECTION 2 — Real-Time Market Activity */}
      <ActivityTicker />

      {/* Scarcity Engine / Live Listings */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-display font-medium text-white mb-3">Live Exchange</h2>
            <p className="text-[var(--muted)] text-sm font-medium">Premium assets currently available for acquisition.</p>
          </div>
          <Link href="/search" className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] hover:text-white transition-colors flex items-center gap-2 no-underline">
            Open Terminal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoTickets.slice(0, 3).map((ticket, i) => (
            <TicketCard key={ticket._id} ticket={ticket} index={i} />
          ))}
        </div>
      </section>

      {/* SECTION 3 & 4 — Trust Architecture & AI Pricing */}
      <section className="py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-[var(--accent)]/5 blur-[150px] rounded-[100%]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            
            {/* How Trust Works */}
            <div>
              <div className="inline-flex items-center gap-3 text-[var(--accent)] text-[10px] font-bold tracking-widest uppercase mb-6">
                <Shield className="w-4 h-4" /> Military Grade Trust Architecture
              </div>
              <h2 className="text-5xl font-display font-medium text-white mb-8">Zero Anxiety Execution.</h2>
              <p className="text-[var(--muted)] text-lg mb-16 leading-relaxed font-light">
                We handle the transfer logistics directly with premium operators. Your capital never leaves escrow until the asset is secured in your name.
              </p>

              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-[var(--accent)] before:via-white/10 before:to-transparent">
                {[
                  { step: '01', title: 'Asset Verification', desc: 'PNR is verified instantly against elite operator databases.' },
                  { step: '02', title: 'Risk Assessment', desc: 'AI performs multi-layer fraud checks and assigns a confidence score.' },
                  { step: '03', title: 'Escrow Settlement', desc: 'Capital locked. Transfer executed. Funds released.' }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start gap-8">
                    <div className="w-12 h-12 rounded-full bg-black border border-[var(--accent)]/50 flex items-center justify-center font-display font-bold text-[var(--accent)] text-xs z-10 shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xl font-display font-medium text-white mb-2">{item.title}</h4>
                      <p className="text-[var(--muted)] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Visualization Mockup */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <GlassPanel className="p-10 border-white/5">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-display font-medium text-white text-xl">Intelligence Engine</h3>
                  <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
                </div>
                
                {/* Mock Graph */}
                <div className="h-56 border-b border-l border-white/10 relative mb-8">
                  {/* Abstract line graph */}
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,80 Q20,70 40,40 T80,20 L100,10 L100,100 L0,100 Z" fill="rgba(212,175,55,0.05)" />
                    <path d="M0,80 Q20,70 40,40 T80,20 L100,10" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                  </svg>
                  {/* Tooltip mockup */}
                  <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-full mb-3 bg-[#111] border border-white/10 text-white px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold shadow-xl">
                    Optimum Window
                  </div>
                  <div className="absolute top-[20%] left-[80%] w-3 h-3 bg-[var(--accent)] rounded-full -translate-x-1/2 -translate-y-1/2 ring-4 ring-[var(--accent)]/20 shadow-[0_0_10px_var(--accent)]" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-black/50 rounded-xl p-5 border border-white/5 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold mb-2">Predicted Value</p>
                    <p className="text-2xl font-display font-medium text-white">₹1,850 <span className="block mt-2 text-[10px] uppercase tracking-widest text-[var(--success)] font-bold">High Confidence</span></p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-5 border border-white/5 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold mb-2">Market Velocity</p>
                    <p className="text-2xl font-display font-medium text-white">92% <span className="block mt-2 text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold">Within 4 Hours</span></p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — Premium Operators */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-display font-medium text-white mb-6">Elite Partners</h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto font-light leading-relaxed">Direct API integrations with the world's most luxurious ground transit networks ensures instant, invisible name transfers.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Obsidian Premium', 'Emirates Road', 'Royal Transit', 'Gold Class'].map((op, i) => (
            <GlassPanel key={i} className="p-8 flex flex-col items-center justify-center text-center group transition-all hover:border-[var(--accent)]/30 border-white/5">
              <Award className="w-10 h-10 text-white/10 group-hover:text-[var(--accent)] transition-colors mb-6" />
              <h4 className="font-bold text-white text-xs uppercase tracking-widest">{op}</h4>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-[var(--success)] font-bold bg-[var(--success)]/10 border border-[var(--success)]/20 px-3 py-1 rounded-sm uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" /> Integrated
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold">© {new Date().getFullYear()} TravelSwap Mobility Exchange</p>
      </footer>
    </div>
  );
}
