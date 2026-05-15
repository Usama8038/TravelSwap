'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Bus, X, MapPin, Calendar, TrendingUp, AlertCircle, Activity } from 'lucide-react';
import TicketCard from '@/components/tickets/TicketCard';
import GlassPanel from '@/components/ui/GlassPanel';
import { demoTickets, cities } from '@/data';

function SearchContent() {
  const searchParams = useSearchParams();
  const [source, setSource] = useState(searchParams.get('source') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [date, setDate] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filtered, setFiltered] = useState(demoTickets);

  useEffect(() => {
    let results = [...demoTickets];
    if (source) results = results.filter(t => t.source.toLowerCase().includes(source.toLowerCase()));
    if (destination) results = results.filter(t => t.destination.toLowerCase().includes(destination.toLowerCase()));
    if (type) results = results.filter(t => t.type === type);
    if (maxPrice) results = results.filter(t => t.sellingPrice <= Number(maxPrice));
    if (sort === 'price_asc') results.sort((a, b) => a.sellingPrice - b.sellingPrice);
    if (sort === 'price_desc') results.sort((a, b) => b.sellingPrice - a.sellingPrice);
    if (sort === 'date_asc') results.sort((a, b) => new Date(a.travelDate).getTime() - new Date(b.travelDate).getTime());
    setFiltered(results);
  }, [source, destination, type, date, maxPrice, sort]);

  const clearFilters = () => { setSource(''); setDestination(''); setType(''); setDate(''); setMaxPrice(''); setSort(''); };

  // Route Intelligence Mock Data
  const showIntelligence = source && destination && filtered.length > 0;
  const avgSaving = showIntelligence ? Math.round(filtered.reduce((acc, t) => acc + (t.originalPrice - t.sellingPrice), 0) / filtered.length) : 0;

  const FiltersContent = () => (
    <div className="space-y-8">
      <div>
        <label className="text-[10px] font-bold text-[var(--muted)] mb-3 block uppercase tracking-widest">Route Setup</label>
        <div className="space-y-4">
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" />
            <input value={source} onChange={e => setSource(e.target.value)} placeholder="Origin Terminal" list="cities-from"
              className="w-full pl-12 pr-4 py-4 rounded-xl text-sm bg-[#050505] text-white placeholder-[var(--muted)] border border-white/10 focus:border-[var(--accent)] outline-none transition-all focus:ring-1 focus:ring-[var(--accent)]" />
            <datalist id="cities-from">{cities.map(c => <option key={c} value={c} />)}</datalist>
          </div>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" />
            <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Arrival Terminal" list="cities-to"
              className="w-full pl-12 pr-4 py-4 rounded-xl text-sm bg-[#050505] text-white placeholder-[var(--muted)] border border-white/10 focus:border-[var(--accent)] outline-none transition-all focus:ring-1 focus:ring-[var(--accent)]" />
            <datalist id="cities-to">{cities.map(c => <option key={c} value={c} />)}</datalist>
          </div>
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-[var(--muted)] mb-3 block uppercase tracking-widest">Departure Date</label>
        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors" />
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl text-sm bg-[#050505] text-white border border-white/10 focus:border-[var(--accent)] outline-none transition-all focus:ring-1 focus:ring-[var(--accent)]" style={{ colorScheme: 'dark' }} />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-[var(--muted)] mb-3 block uppercase tracking-widest">Asset Class</label>
        <div className="flex gap-3">
          <button onClick={() => setType(type === 'bus' ? '' : 'bus')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${type === 'bus' ? 'bg-[var(--accent)] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#050505] text-white border border-white/10 hover:border-[var(--accent)]/50'}`}>
            <Bus className="w-4 h-4" /> Premium Bus
          </button>
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-[var(--muted)] mb-3 block uppercase tracking-widest">Max Acquisition Price</label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-sm font-bold group-focus-within:text-[var(--accent)] transition-colors">₹</span>
          <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g. 5000"
            className="w-full pl-10 pr-4 py-4 rounded-xl text-sm bg-[#050505] text-white border border-white/10 placeholder-[var(--muted)] focus:border-[var(--accent)] outline-none transition-all focus:ring-1 focus:ring-[var(--accent)]" />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-[var(--muted)] mb-3 block uppercase tracking-widest">Market Ordering</label>
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="w-full px-4 py-4 rounded-xl text-sm font-bold uppercase tracking-widest bg-[#050505] text-[var(--muted)] border border-white/10 focus:border-[var(--accent)] focus:text-white outline-none transition-all appearance-none cursor-pointer">
          <option value="">AI Recommended</option>
          <option value="price_asc">Price: Ascending</option>
          <option value="price_desc">Price: Descending</option>
          <option value="date_asc">Time: Earliest Departure</option>
        </select>
      </div>
      
      {(source || destination || type || maxPrice || date || sort) && (
        <button onClick={clearFilters} className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-4 rounded-xl transition-all bg-white/5 text-[var(--muted)] hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20">
          <X className="w-3.5 h-3.5" /> Purge Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-10 flex justify-between items-center">
          <h1 className="text-3xl font-display font-medium text-white">Live Exchange</h1>
          <button onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)} className="flex items-center gap-2 bg-[#111] border border-white/10 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-white">
            <SlidersHorizontal className="w-4 h-4 text-[var(--accent)]" /> Configure
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <GlassPanel className="p-8 sticky top-32 border-t border-[var(--accent)]/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20">
                  <SlidersHorizontal className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <h2 className="text-lg font-display font-medium text-white tracking-wide">Terminal Filters</h2>
              </div>
              <FiltersContent />
            </GlassPanel>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header (Desktop) */}
            <div className="hidden lg:flex items-center justify-between mb-12">
              <div>
                <h1 className="text-5xl font-display font-medium text-white mb-2">Live Exchange</h1>
                <p className="text-[var(--muted)] text-sm font-medium uppercase tracking-widest">Premium Transit Trading Floor</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-[var(--success)]/10 border border-[var(--success)]/20 px-4 py-2 rounded-full text-[var(--success)]">
                <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--success)]"></span></span>
                Market Open
              </div>
            </div>

            {/* Route Intelligence Banner */}
            <AnimatePresence>
              {showIntelligence && (
                <motion.div initial={{ opacity: 0, height: 0, marginBottom: 0 }} animate={{ opacity: 1, height: 'auto', marginBottom: 48 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }}>
                  <GlassPanel glow className="p-6 border border-[var(--accent)]/30 bg-[var(--accent)]/5 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-black border border-[var(--accent)]/30 rounded-xl flex items-center justify-center text-[var(--accent)] shadow-inner">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-display font-medium text-lg tracking-wide">{source} <span className="text-[var(--muted)] mx-1">→</span> {destination}</h4>
                          <p className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5" /> High Acquisition Demand
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div className="text-right">
                          <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-1 font-bold">Market Velocity</p>
                          <p className="text-white font-bold text-sm uppercase tracking-widest">Accelerated</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-right">
                          <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mb-1 font-bold">Avg Discount</p>
                          <p className="text-[var(--accent)] font-display font-bold text-xl leading-none">₹{avgSaving}</p>
                        </div>
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Grid */}
            <div className="mb-8 flex justify-between items-end border-b border-white/5 pb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                Showing <span className="text-white mx-1">{filtered.length}</span> Verified Assets
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {filtered.map((ticket, i) => (
                  <TicketCard key={ticket._id} ticket={ticket} index={i} />
                ))}
              </div>
            ) : (
              <GlassPanel className="p-16 text-center flex flex-col items-center justify-center border-white/5">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <AlertCircle className="w-6 h-6 text-white/50" />
                </div>
                <h3 className="text-2xl font-display font-medium text-white mb-4">No Market Activity</h3>
                <p className="text-[var(--muted)] text-sm mb-8 max-w-sm leading-relaxed">
                  We couldn&apos;t locate any active listings on the trading floor matching your parameters.
                </p>
                <button onClick={clearFilters} className="px-8 py-4 rounded-xl bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Reset Terminal Filters
                </button>
              </GlassPanel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-t-[var(--accent)] border-r-transparent border-b-[var(--accent)] border-l-transparent animate-spin mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
        <p className="text-[var(--accent)] text-[10px] font-bold tracking-widest uppercase animate-pulse">Syncing Market Data...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
