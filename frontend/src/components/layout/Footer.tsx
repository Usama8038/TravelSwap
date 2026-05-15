'use client';
import React from 'react';
import Link from 'next/link';
import { Bus, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 no-underline group mb-6">
              <div className="w-10 h-10 rounded-full bg-[#111] border border-[var(--accent)]/30 flex items-center justify-center group-hover:border-[var(--accent)] transition-colors shadow-[0_0_15px_var(--glow-color)]">
                <Sparkles className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-wide">TravelSwap</span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
              The premier luxury mobility exchange. Trade premium travel assets with military-grade trust and market intelligence.
            </p>
            <div className="flex space-x-4">
              {[Bus].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--muted)] hover:bg-[var(--accent)] hover:text-black transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Marketplace</h3>
            <ul className="space-y-4">
              {['Search Assets', 'Sell Assets', 'Market Intelligence', 'Premium Routes'].map((item) => (
                <li key={item}><Link href="#" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors no-underline">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Ecosystem</h3>
            <ul className="space-y-4">
              {['About TravelSwap', 'Trust & Escrow', 'Careers', 'Contact Concierge'].map((item) => (
                <li key={item}><Link href="#" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors no-underline">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Legal</h3>
            <ul className="space-y-4">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                <li key={item}><Link href="#" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors no-underline">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--muted)]">
            &copy; {new Date().getFullYear()} TravelSwap Mobility Technologies. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-[var(--muted)]">
            <span>Powered by Escrow</span>
            <span>Military Grade Trust</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
