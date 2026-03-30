"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../../../content";

/** Desktop: absolutely positioned portrait to the right of the headline. */
export function HeroPortraitDesktop() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
      className="hidden lg:block absolute right-16 xl:right-24 top-1/2 -translate-y-[55%] z-10"
    >
      <div className="relative group">
        <div className="absolute -inset-3 rounded-2xl bg-linear-to-br from-violet/25 via-cyan/10 to-violet/15 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
        <div className="absolute -inset-3 rounded-[44px] bg-linear-to-br from-violet/25 via-cyan/10 to-violet/15 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
        <div className="relative p-[2px] rounded-[44px] bg-linear-to-br from-white/20 via-violet/30 to-cyan/20">
          <div className="rounded-[40px] overflow-hidden bg-bg">
            <Image
              src="/assets/og-image.png"
              alt={siteConfig.name}
              width={280}
              height={280}
              className="w-56 h-56 xl:w-64 xl:h-64 object-cover rounded-[40px] opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
              priority
            />
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-linear-to-br from-violet to-cyan opacity-60" />
      </div>
    </motion.div>
  );
}

/** Mobile: inline portrait above the headline. */
export function HeroPortraitMobile() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      className="lg:hidden mb-6"
    >
      <div className="relative group inline-block">
        <div className="absolute -inset-2 rounded-[28px] bg-linear-to-br from-violet/30 via-cyan/15 to-violet/20 blur-lg opacity-70" />
        <div className="relative p-[2px] rounded-[28px] bg-linear-to-br from-white/20 via-violet/30 to-cyan/20">
          <div className="rounded-[24px] overflow-hidden bg-bg">
            <Image
              src="/assets/og-image.png"
              alt={siteConfig.name}
              width={160}
              height={160}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-[24px] opacity-90"
              priority
            />
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-linear-to-br from-violet to-cyan opacity-60" />
      </div>
    </motion.div>
  );
}
