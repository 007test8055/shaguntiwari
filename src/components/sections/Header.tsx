"use client";

import { siteConfig } from "@/content";
import { GlassButton } from "@/components/ui/Glass";
import { motion } from "framer-motion";
import { Briefcase, User, Layers, Mail } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center p-6 pointer-events-none">
        <nav className="flex items-center justify-between w-full max-w-2xl px-6 py-3 rounded-full glass-panel pointer-events-auto">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hover:opacity-70 transition-opacity cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src="/assets/logo.svg"
              alt={siteConfig.name}
              width={120}
              height={120}
              className="h-8 w-auto invert"
              priority
            />
          </motion.div>

          {/* Nav Links */}
          <div className="flex items-center gap-8 text-sm font-medium text-accent-secondary">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassButton className="px-5 py-2">
              Contact
            </GlassButton>
          </motion.div>
        </nav>
      </header>

      {/* ================= MOBILE TOP BAR ================= */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 py-1 glass-panel">
        <div
          className="cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image
            src="/assets/logo.svg"
            alt={siteConfig.name}
            width={96}
            height={24}
            className="h-6 w-auto invert"
            priority
          />
        </div>

        <GlassButton className="px-4 py-1 text-sm">
          Contact
        </GlassButton>
      </header>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-[70%] max-w-xs px-4 py-2 rounded-full glass-panel flex justify-between items-center">

        <a href="#work" className="flex flex-col items-center text-xs text-accent-secondary hover:text-white">
          <Briefcase size={16} />
          Work
        </a>

        <a href="#about" className="flex flex-col items-center text-xs text-accent-secondary hover:text-white">
          <User size={16} />
          About
        </a>

        <a href="#experience" className="flex flex-col items-center text-xs text-accent-secondary hover:text-white">
          <Layers size={16} />
          Exp
        </a>
      </nav>
    </>
  );
}