'use client';
import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { RealTimeProvider } from '@/context/RealTimeContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChatbot from '@/components/ai/AIChatbot';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RealTimeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <AIChatbot />
          <Toaster position="top-right" toastOptions={{
            duration: 4000,
            style: { background: 'var(--card-bg)', color: 'var(--foreground)', border: '1px solid var(--card-border)', fontFamily: 'Inter, sans-serif' },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } }
          }} />
        </RealTimeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
