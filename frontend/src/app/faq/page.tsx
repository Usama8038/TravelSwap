'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqData } from '@/data';

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
      <button onClick={toggle} className="w-full flex items-center justify-between p-5 text-left">
        <span className="text-sm font-semibold pr-4" style={{ color: 'var(--foreground)' }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--muted)' }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="px-5 pb-5">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div style={{ background: 'var(--background)' }}>
      <section className="py-20 text-center" style={{ background: 'var(--gradient-hero)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-300">Everything you need to know about TravelSwap</p>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          {faqData.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <FAQItem q={item.q} a={item.a} open={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? null : i)} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
