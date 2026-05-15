'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, AlertTriangle, DollarSign, TrendingUp, CheckCircle, XCircle, Eye, Shield, BarChart3, Clock, Bus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { demoTickets } from '@/data';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--muted-bg)' }}><div className="text-center"><h2 className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Please Login as Admin</h2><Link href="/login" className="px-6 py-3 rounded-xl text-white font-semibold gradient-bg no-underline">Login</Link></div></div>;

  const stats = [
    { label: 'Total Users', value: '8,247', icon: Users, color: '#6366f1', change: '+12%' },
    { label: 'Active Listings', value: '1,024', icon: Package, color: '#06b6d4', change: '+8%' },
    { label: 'Revenue', value: '₹2.5L', icon: DollarSign, color: '#10b981', change: '+25%' },
    { label: 'Open Disputes', value: '3', icon: AlertTriangle, color: '#ef4444', change: '-15%' },
  ];

  const pendingTickets = demoTickets.slice(-2);
  const recentUsers = [
    { name: 'Rahul Sharma', email: 'rahul@example.com', role: 'user', status: 'active', joined: '2024-12-10' },
    { name: 'Priya Patel', email: 'priya@example.com', role: 'user', status: 'active', joined: '2024-12-12' },
    { name: 'Amit Kumar', email: 'amit@example.com', role: 'user', status: 'active', joined: '2024-12-14' },
    { name: 'Sneha Reddy', email: 'sneha@example.com', role: 'user', status: 'active', joined: '2024-12-15' },
  ];

  const disputes = [
    { id: 'D001', buyer: 'Demo User', seller: 'Rahul Sharma', reason: 'Invalid ticket details', status: 'open', date: '2024-12-16' },
    { id: 'D002', buyer: 'Priya Patel', seller: 'Amit Kumar', reason: 'Wrong seat number', status: 'investigating', date: '2024-12-14' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'tickets', label: 'Tickets', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'disputes', label: 'Disputes', icon: AlertTriangle },
  ];



  return (
    <div className="min-h-screen" style={{ background: 'var(--muted-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: 'var(--foreground)' }}>Admin Panel</h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Platform management & analytics</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
            <Shield className="w-4 h-4" /><span className="text-xs font-bold">ADMIN</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all`}
              style={activeTab === tab.id ? { background: 'var(--gradient-primary)', color: 'white' } : { color: 'var(--muted)' }}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: `${s.color}15`, color: s.color }}><s.icon className="w-5 h-5" /></div>
                <span className={`text-xs font-bold ${s.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{s.change}</span>
              </div>
              <p className="text-2xl font-extrabold" style={{ color: 'var(--foreground)' }}>{s.value}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Chart Placeholder */}
            <div className="p-6 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--foreground)' }}>Revenue Trend (30 Days)</h3>
              <div className="flex items-end gap-1 h-48">
                {[35, 50, 45, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 92, 78, 85, 90, 95, 88, 92, 96, 100, 95, 88, 92, 96, 100, 95, 98, 102].map((v, i) => (
                  <div key={i} className="flex-1 rounded-t transition-all hover:opacity-80" style={{ height: `${v}%`, background: `linear-gradient(to top, #6366f1, #818cf8)` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--muted)' }}>
                <span>30 days ago</span><span>Today</span>
              </div>
            </div>

            {/* Type Breakdown */}
            <div className="p-6 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--foreground)' }}>Sales by Type</h3>
              <div className="space-y-4">
                {[{ type: 'Luxury Class', pct: 55, count: 685, color: '#D4AF37' }, { type: 'Premium Sleeper', pct: 30, count: 372, color: '#6366f1' }, { type: 'Standard AC', pct: 15, count: 186, color: '#10b981' }].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium" style={{ color: 'var(--foreground)' }}>{item.type}</span>
                      <span style={{ color: 'var(--muted)' }}>{item.count} tickets ({item.pct}%)</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--muted-bg)' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 1, delay: i * 0.2 }}
                        className="h-full rounded-full" style={{ background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <div className="p-4 font-bold text-sm" style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--foreground)' }}>Pending Verification</div>
            {pendingTickets.map((ticket, i) => {
              return (
                <div key={i} className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                      <Bus className="w-4 h-4" style={{ color: '#D4AF37' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{ticket.source} → {ticket.destination}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>PNR: {ticket.pnr} · ₹{ticket.sellingPrice}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toast.success('Ticket approved!')} className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => toast.error('Ticket rejected')} className="px-4 py-2 rounded-lg text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition-all flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                    <th className="text-left p-4 font-semibold" style={{ color: 'var(--muted)' }}>User</th>
                    <th className="text-left p-4 font-semibold" style={{ color: 'var(--muted)' }}>Role</th>
                    <th className="text-left p-4 font-semibold" style={{ color: 'var(--muted)' }}>Status</th>
                    <th className="text-left p-4 font-semibold" style={{ color: 'var(--muted)' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((u, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--card-border)' }} className="hover:bg-[var(--muted-bg)] transition-all">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">{u.name.charAt(0)}</div>
                          <div>
                            <p className="font-medium" style={{ color: 'var(--foreground)' }}>{u.name}</p>
                            <p className="text-xs" style={{ color: 'var(--muted)' }}>{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 capitalize" style={{ color: 'var(--foreground)' }}>{u.role}</td>
                      <td className="p-4"><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{u.status}</span></td>
                      <td className="p-4" style={{ color: 'var(--muted)' }}>{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'disputes' && (
          <div className="space-y-4">
            {disputes.map((d, i) => (
              <div key={i} className="p-5 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>{d.id}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${d.status === 'open' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{d.status}</span>
                </div>
                <p className="font-bold mb-1" style={{ color: 'var(--foreground)' }}>{d.reason}</p>
                <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>Buyer: {d.buyer} · Seller: {d.seller} · {d.date}</p>
                <div className="flex gap-2">
                  <button onClick={() => toast.success('Dispute resolved!')} className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 transition-all">Resolve</button>
                  <button className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: 'var(--muted-bg)', color: 'var(--muted)' }}>Investigate</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
