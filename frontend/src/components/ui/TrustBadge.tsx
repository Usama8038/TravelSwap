import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, Info, Lock } from 'lucide-react';

type TrustLevel = 'high' | 'medium' | 'low';

interface TrustBadgeProps {
  type: 'pnr' | 'fraud' | 'seller' | 'kyc' | 'escrow';
  level?: TrustLevel;
  value?: string | number;
}

export default function TrustBadge({ type, level = 'high', value }: TrustBadgeProps) {
  const configs = {
    pnr: {
      icon: ShieldCheck,
      label: 'Verified Asset',
      colorClass: 'text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/20',
    },
    fraud: {
      icon: level === 'high' ? CheckCircle : AlertTriangle,
      label: `Risk Index: ${value}/10`,
      colorClass: level === 'high' 
        ? 'text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/20'
        : 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20',
    },
    seller: {
      icon: Info,
      label: `Counterparty: ${value}%`,
      colorClass: 'text-white bg-white/5 border-white/10',
    },
    kyc: {
      icon: ShieldCheck,
      label: 'KYC Cleared',
      colorClass: 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20',
    },
    escrow: {
      icon: Lock,
      label: 'Escrow Secured',
      colorClass: 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20',
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm ${config.colorClass}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </div>
  );
}
