'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Camera, CheckCircle, Upload, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import toast from 'react-hot-toast';
import GlassPanel from '@/components/ui/GlassPanel';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  if (!user) return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-24 pb-12">
      <GlassPanel className="p-12 text-center border-white/5">
        <ShieldCheck className="w-12 h-12 text-[var(--accent)] mx-auto mb-6 opacity-50" />
        <h2 className="text-2xl font-display font-medium text-white mb-4">Secure Terminal Access Required</h2>
        <Link href="/login" className="inline-block px-8 py-3 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-[10px] no-underline hover:bg-gray-200 transition-colors">Authenticate</Link>
      </GlassPanel>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[40vw] h-[40vw] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-display font-medium text-white mb-2">Identity Vault</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Manage your secure portfolio profile</p>
        </div>

        {/* Avatar & Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <GlassPanel className="p-8 mb-8 border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#050505] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] text-3xl font-display font-medium shadow-inner">{user.name.charAt(0)}</div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  <Camera className="w-4 h-4 text-black" />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-display font-medium text-white mb-1">{user.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-3">{user.email}</p>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm border inline-block ${user.kyc?.status === 'verified' ? 'border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]' : 'border-amber-500/30 bg-amber-500/10 text-amber-500'}`}>
                  KYC: {user.kyc?.status || 'Pending'}
                </span>
              </div>
            </div>

            <form onSubmit={e => { e.preventDefault(); toast.success('Identity profile synchronized!'); }} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Full Legal Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input value={name} onChange={e => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Primary Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input value={user.email} disabled
                      className="w-full pl-12 pr-4 py-3 rounded-xl text-sm bg-[#050505] text-white/50 border border-white/5 outline-none cursor-not-allowed" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-2 block">Secure Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder-[var(--muted)]" />
                </div>
              </div>
              <div className="pt-4 text-right">
                <button type="submit" className="px-8 py-3.5 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] inline-block">Sync Identity Profile</button>
              </div>
            </form>
          </GlassPanel>
        </motion.div>

        {/* KYC */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <GlassPanel className="p-8 border-white/5">
            <h3 className="text-xl font-display font-medium text-white mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5 text-[var(--accent)]" /> Clearance Verification (KYC)
            </h3>
            {user.kyc?.status === 'verified' ? (
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--success)]/5 border border-[var(--success)]/20 shadow-inner">
                <div className="w-10 h-10 rounded-full bg-[var(--success)]/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                </div>
                <div>
                  <p className="font-bold text-white tracking-wide mb-1">Identity Verified</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--success)]">Full trading clearance granted</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs text-[var(--muted)] mb-6 leading-relaxed">Submit government-issued clearance documentation to unlock Tier-1 trading limits and escrow services.</p>
                <div className="space-y-4">
                  <select className="w-full px-4 py-3 rounded-xl text-sm bg-[#050505] text-[var(--muted)] border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all">
                    <option>Select Document Class</option>
                    <option>Aadhaar Card (Tier-1)</option>
                    <option>PAN Card (Financial)</option>
                    <option>Passport (Global)</option>
                    <option>Driving License</option>
                  </select>
                  <input placeholder="Document Identification Number" className="w-full px-4 py-3 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder-[var(--muted)]" />
                  <div className="p-10 rounded-2xl text-center cursor-pointer hover:bg-white/5 transition-all border border-dashed border-white/20 hover:border-[var(--accent)]/50 group">
                    <Upload className="w-8 h-8 mx-auto mb-3 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] group-hover:text-white transition-colors">Upload Secured Scan</p>
                  </div>
                  <div className="pt-4 text-right">
                    <button className="px-8 py-3.5 rounded-xl bg-transparent border border-[var(--accent)]/30 text-[var(--accent)] font-bold uppercase tracking-widest text-[10px] hover:bg-[var(--accent)] hover:text-black transition-colors inline-block" onClick={() => toast.success('Clearance documentation submitted to secure vault.')}>
                      Submit for Clearance
                    </button>
                  </div>
                </div>
              </div>
            )}
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}
