'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null, loading: true, login: async () => {}, register: async () => {}, logout: async () => {}, isAdmin: false
});

export const useAuth = () => useContext(AuthContext);

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial load: check if user has a valid secure session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/auth/me`, { credentials: 'include' });
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        // Session invalid or expired
        console.error('Session validation failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setUser(data.user);
    } catch (err: any) { 
      throw new Error(err.message || 'Login failed'); 
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setUser(data.user);
    } catch (err: any) { 
      throw new Error(err.message || 'Registration failed'); 
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API}/auth/logout`, { credentials: 'include' });
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
      // Force local logout anyway
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}
