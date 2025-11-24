import React from 'react';
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'common' | 'rare' | 'legendary' | 'neon';
  className?: string;
}

export const Badge = ({ children, variant = 'common', className }: BadgeProps) => {
  const variants = {
    common: "bg-slate-800 text-slate-400 border-slate-700",
    rare: "bg-blue-900/30 text-blue-400 border-blue-800",
    legendary: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
    neon: "bg-neon/10 text-neon border-neon/50",
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
