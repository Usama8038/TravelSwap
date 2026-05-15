'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bus, MapPin, Clock } from 'lucide-react';
import { Ticket } from '@/types';
import TrustBadge from '../ui/TrustBadge';
import GlassPanel from '../ui/GlassPanel';

export default function TicketCard({ ticket, index = 0 }: { ticket: Ticket; index?: number }) {
  const saving = ticket.originalPrice - ticket.sellingPrice;
  const savingPct = Math.round((saving / ticket.originalPrice) * 100);
  
  const travelDate = new Date(ticket.travelDate);
  const dateStr = travelDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  const fraudLevel = ticket.fraudScore < 3 ? 'high' : ticket.fraudScore < 7 ? 'medium' : 'low';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link href={`/ticket/${ticket._id}`} className="block h-full no-underline">
        <GlassPanel glow className="card-hover h-full flex flex-col p-6 cursor-pointer">
          
          {/* TOP: Operator & Trust */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--accent)]/5 border border-[var(--accent)]/20 text-[var(--accent)]">
                <Bus className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-white m-0 leading-tight">
                  {ticket.operator || 'Premium Transit'}
                </h4>
                <p className="text-[10px] text-[var(--muted)] m-0 mt-0.5 uppercase tracking-widest">
                  Luxury Sleeper
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <TrustBadge type="pnr" />
            </div>
          </div>

          {/* CENTER: Route Timeline */}
          <div className="my-auto py-6 relative">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-3xl font-display font-bold text-white leading-none m-0">{ticket.travelTime}</p>
                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest m-0 mt-2">{ticket.source}</p>
              </div>
              
              <div className="flex-1 px-6 relative flex items-center">
                <div className="neon-route-line w-full h-[1px]" />
                <div className="absolute left-1/2 -translate-x-1/2 -top-3 px-3 bg-[#0B0B0B] border border-[var(--accent)]/10 rounded-full text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">
                  {dateStr}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-3xl font-display font-bold text-white leading-none m-0">--:--</p>
                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest m-0 mt-2">{ticket.destination}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 mt-8 text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest justify-center border-t border-white/5 pt-4">
              <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-[var(--accent)]" /> {ticket.type === 'bus' ? '12h 30m' : 'Express'}</span>
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[var(--accent)]" /> {ticket.seatNumber ? `Seat ${ticket.seatNumber}` : 'Unassigned'}</span>
            </div>
          </div>

          {/* BOTTOM: Pricing */}
          <div className="mt-4 pt-5 border-t border-white/5 flex justify-between items-end">
            <div>
              <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-1 font-bold">Trading At</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-display font-bold text-white m-0 leading-none">
                  ₹{ticket.sellingPrice.toLocaleString()}
                </p>
                <p className="text-xs line-through text-[var(--muted)] m-0 font-bold">
                  ₹{ticket.originalPrice.toLocaleString()}
                </p>
              </div>
            </div>
            
            {saving > 0 && (
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1.5 rounded-sm bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] font-bold text-[10px] uppercase tracking-widest">
                  Save {savingPct}%
                </div>
              </div>
            )}
          </div>
          
        </GlassPanel>
      </Link>
    </motion.div>
  );
}
