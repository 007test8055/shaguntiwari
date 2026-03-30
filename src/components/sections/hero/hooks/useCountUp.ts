"use client";

import { useEffect, useState } from "react";

/**
 * Animates a numeric portion of a formatted string from 0 → target.
 * e.g. "₹10Cr+" → counts 0…10 while keeping prefix "₹" and suffix "Cr+".
 * Starts after `delay` ms to sync with page entrance animations.
 */
export function useCountUp(raw: string, duration = 1200, delay = 1900) {
  const match = raw.match(/^([^\d]*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    const timeout = setTimeout(() => {
      let raf: number;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return `${prefix}${count}${suffix}`;
}
