"use client";

import { useCountUp } from "./hooks/useCountUp";

interface StatItemProps {
  value: string;
  label: string;
}

export function HeroStatItem({ value, label }: StatItemProps) {
  const display = useCountUp(value);
  return (
    <div className="stat-item group">
      <div className="font-raleway font-bold text-2xl md:text-3xl text-white/90 tracking-tight group-hover:gradient-text transition-all duration-300">
        {display}
      </div>
      <div className="font-dm text-[11px] text-white/30 mt-0.5 tracking-wide font-medium">
        {label}
      </div>
    </div>
  );
}
