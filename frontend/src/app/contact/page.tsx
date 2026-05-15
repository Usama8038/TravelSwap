'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ background: 'var(--background)' }}>
      <section className="py-20 text-center" style={{ background: 'var(--gradient-hero)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-300">We&apos;d love to hear from you. Reach out anytime.</p>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Mail, title: 'Email Us', value: 'support@travelswap.com', sub: 'We reply within 24 hours' },
                { icon: Phone, title: 'Call Us', value: '+91 98765 43210', sub: 'Mon-Sat, 9am-6pm IST' },
                { icon: MapPin, title: 'Visit Us', value: 'HSR Layout, Bangalore', sub: 'Karnataka, India 560102' },
                { icon: Clock, title: 'Business Hours', value: 'Mon - Sat', sub: '9:00 AM - 6:00 PM IST' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                  <div className="p-2.5 rounded-xl" style={{ background: 'rgba(99,102,241,0.1)' }}>
                    <item.icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{item.title}</h4>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.value}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-2 p-8 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow-lg)' }}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                <MessageCircle className="w-5 h-5" style={{ color: 'var(--color-primary)' }} /> Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--foreground)' }}>Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--foreground)' }}>Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--foreground)' }}>Subject</label>
                  <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--foreground)' }}>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required placeholder="Tell us more..."
                    className="w-full px-4 py-3 rounded-xl text-sm h-32 resize-none" style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--foreground)' }} />
                </div>
                <button type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold gradient-bg btn-press">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
