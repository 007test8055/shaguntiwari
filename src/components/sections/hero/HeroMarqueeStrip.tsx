"use client";

import { MARQUEE_SKILLS } from "./hero.constants";

export function HeroMarqueeStrip() {
  return (
    <div className="relative z-20 w-full overflow-hidden border-t border-white/8 py-3 bg-bg/20 backdrop-blur-md mask-marquee">
      <div className="flex w-max flex-nowrap">
        {[0, 1].map((idx) => (
          <div
            key={idx}
            className="flex shrink-0 animate-marquee items-center"
            aria-hidden={idx > 0}
          >
            {MARQUEE_SKILLS.map((skill, i) => (
              <span
                key={`${idx}-${i}-${skill}`}
                className="flex items-center gap-3 px-4 text-[10px] font-dm font-medium text-white/20 tracking-[0.2em] uppercase whitespace-nowrap transition-colors hover:text-white/50"
              >
                <span className="w-[4px] h-[4px] rounded-full bg-violet/40 shrink-0" />
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
