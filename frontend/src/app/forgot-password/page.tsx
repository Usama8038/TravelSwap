'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Plane, ArrowRight, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    toast.success('OTP sent to your email!');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: 'var(--muted-bg)' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 no-underline mb-6">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"><Plane className="w-5 h-5 text-white" /></div>
            <span className="text-2xl font-bold gradient-text">TravelSwap</span>
          </Link>
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--foreground)' }}>Forgot Password?</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Enter your email and we&apos;ll send you a reset OTP</p>
        </div>

        <div className="p-8 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-lg)' }}>
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>Check Your Email</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>We&apos;ve sent a 6-digit OTP to <strong>{email}</strong></p>
              <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold gradient-bg no-underline btn-press">
                Back to Login <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--foreground)' }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl text-white font-semibold gradient-bg btn-press disabled:opacity-60">
                {loading ? 'Sending OTP...' : 'Send Reset OTP'}
              </button>
            </form>
          )}
        </div>
        <p className="text-center text-sm mt-6" style={{ color: 'var(--muted)' }}>
          Remember your password? <Link href="/login" className="font-semibold no-underline" style={{ color: 'var(--color-primary)' }}>Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
