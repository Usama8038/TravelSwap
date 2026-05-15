'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Users, Target, Award, Plane } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--background)' }}>
      {/* Hero */}
      <section className="py-20 text-center" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">About <span className="gradient-text">TravelSwap</span></h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We&apos;re on a mission to eliminate travel ticket cancellation losses for millions of travelers across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-extrabold mb-4" style={{ color: 'var(--foreground)' }}>Our Mission</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                Every year, travelers lose crores of rupees in ticket cancellation charges. TravelSwap was born from a simple idea: what if you could sell your unused ticket to someone who needs it, instead of losing money to cancellation fees?
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                Our AI-powered platform makes this possible with secure transfers, verified tickets, and fair pricing — creating a win-win for both sellers and buyers.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, label: 'Founded', value: '2024' },
                { icon: Users, label: 'Users', value: '8,200+' },
                { icon: Award, label: 'Success Rate', value: '98%' },
                { icon: Heart, label: 'Money Saved', value: '₹25L+' },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl text-center" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }}>
                  <item.icon className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                  <p className="text-xl font-extrabold" style={{ color: 'var(--foreground)' }}>{item.value}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: 'var(--muted-bg)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-12" style={{ color: 'var(--foreground)' }}>Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Trust & Safety', desc: 'Every ticket is verified. Every payment is secured through escrow. Every user is accountable.', color: '#6366f1' },
              { icon: Zap, title: 'Speed & Simplicity', desc: 'List in 2 minutes. Buy in 1 click. Transfer instantly. We make resale effortless.', color: '#06b6d4' },
              { icon: Heart, title: 'Community First', desc: 'We build for travelers. Fair pricing, transparent fees, and responsive support.', color: '#10b981' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl text-center card-hover" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }}>
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-12" style={{ color: 'var(--foreground)' }}>Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Arjun Mehta', role: 'CEO & Founder', initials: 'AM' },
              { name: 'Kavya Nair', role: 'CTO', initials: 'KN' },
              { name: 'Rohan Das', role: 'Head of Product', initials: 'RD' },
              { name: 'Aisha Khan', role: 'Head of Operations', initials: 'AK' },
            ].map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl card-hover" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">{member.initials}</div>
                <h4 className="font-bold" style={{ color: 'var(--foreground)' }}>{member.name}</h4>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
