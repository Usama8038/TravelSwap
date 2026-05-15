// frontend/src/context/RealTimeContext.tsx
'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface RealTimeContextType {
  socket: any;
}

const RealTimeContext = createContext<RealTimeContextType>({ socket: null });

export const useRealTime = () => useContext(RealTimeContext);

export function RealTimeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const socket = useSocket(user?.id);

  useEffect(() => {
    if (!socket) return;

    // Listen for market activity
    socket.on('market_activity', (data: any) => {
      toast(`${data.message}`, {
        icon: '🔥',
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid rgba(212,175,55,0.3)',
        },
      });
    });

    // Listen for transaction updates
    socket.on('transaction_update', (data: any) => {
      toast.success(`Transaction ${data.status}: ${data.message}`, {
        duration: 5000,
      });
    });

    // Listen for price drops on watched tickets
    socket.on('price_alert', (data: any) => {
      toast(`Price Drop! ${data.ticketName} is now ${data.newPrice}`, {
        icon: '💰',
      });
    });

    return () => {
      socket.off('market_activity');
      socket.off('transaction_update');
      socket.off('price_alert');
    };
  }, [socket]);

  return (
    <RealTimeContext.Provider value={{ socket }}>
      {children}
    </RealTimeContext.Provider>
  );
}
