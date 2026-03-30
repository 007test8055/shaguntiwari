"use client";

import { siteConfig } from "@/content";
import { GlassButton } from "@/components/ui/Glass";
import { motion } from "framer-motion";
import { Briefcase, User, Layers } from "lucide-react";
import Image from "next/image";
import { useSmoothScroll } from "@/components/ui/SmoothScrollProvider";

export function Header() {
  const { lenis } = useSmoothScroll();

  const scrollTo = (target: string | number) => {
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      const top = typeof target === "number" ? target : document.querySelector(target)?.getBoundingClientRect().top || 0;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

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
            onClick={() => scrollTo(0)}
          >
            <Image
              src="/assets/logo.svg"
              alt={siteConfig.name}
              width={120}
              height={120}
              className="h-8 w-auto invert"
            />
          </motion.div>

          {/* Nav Links */}
          <div className="flex items-center gap-8 text-sm font-medium text-accent-secondary">
            <button onClick={() => scrollTo("#work")} className="hover:text-white transition-colors">Work</button>
            <button onClick={() => scrollTo("#about")} className="hover:text-white transition-colors">About</button>
            <button onClick={() => scrollTo("#experience")} className="hover:text-white transition-colors">Experience</button>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassButton className="px-5 py-2" onClick={() => scrollTo("#contact")}>
              Contact
            </GlassButton>
          </motion.div>
        </nav>
      </header>

      {/* ================= MOBILE TOP BAR ================= */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 mt-1">
        <div
          className="cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => scrollTo(0)}
        >
          <Image
            src="/assets/logo.svg"
            alt={siteConfig.name}
            width={192}
            height={48}
            className="h-16 w-auto invert"
          />
        </div>

        <GlassButton className="px-4 py-1 text-sm" onClick={() => scrollTo("#contact")}>
          Contact
        </GlassButton>
      </header>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-[70%] max-w-xs px-4 py-2 rounded-full glass-panel flex justify-between items-center text-accent-secondary">

        <button onClick={() => scrollTo("#work")} className="flex flex-col items-center text-xs hover:text-white transition-colors">
          <Briefcase size={16} />
          Work
        </button>

        <button onClick={() => scrollTo("#about")} className="flex flex-col items-center text-xs hover:text-white transition-colors">
          <User size={16} />
          About
        </button>

        <button onClick={() => scrollTo("#experience")} className="flex flex-col items-center text-xs hover:text-white transition-colors">
          <Layers size={16} />
          Exp
        </button>
      </nav>
    </>
  );
}