"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/content";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-display font-medium text-white mb-2">{siteConfig.name}</h3>
            <p className="text-sm text-white/50">{siteConfig.role}</p>
          </div>

          {/* Navigation Links (Internal/External) */}
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            <a href="#work" className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Work</a>
            <a href="#about" className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">About</a>
            <a href="#experience" className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Experience</a>
            <a 
              href={siteConfig.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href={siteConfig.socials.medium} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
            >
              Medium
            </a>
            <a 
              href={siteConfig.socials.resume} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
            >
              Resume
            </a>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
            &copy; {currentYear} — Designed with Intent
          </p>
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
              Open to new opportunities
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
