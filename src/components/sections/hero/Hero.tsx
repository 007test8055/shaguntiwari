"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FileText } from "lucide-react";

import HeroCanvas from "../../canvas/HeroCanvas";
import { HeroGlowBlobs, HeroVerticalLabel } from "./HeroDecorations";
import { HeroPortraitDesktop, HeroPortraitMobile } from "./HeroPortrait";
import { HeroSplitWords } from "./HeroSplitWords";
import { HeroStatItem } from "./HeroStatItem";
import { HeroMarqueeStrip } from "./HeroMarqueeStrip";
import { HeroResumeModal } from "./HeroResumeModal";
import { STATS, SOCIALS } from "./hero.constants";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  /* ── GSAP entrance & parallax ─────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-badge", { opacity: 0, scale: 0.85, y: -10 });
      gsap.set(".word", { opacity: 0, y: 55 });
      gsap.set(".hero-sub", { opacity: 0, y: 28 });
      gsap.set([".cta-primary", ".cta-secondary"], { opacity: 0, y: 18, scale: 0.96 });
      gsap.set(".stat-item", { opacity: 0, y: 20 });
      gsap.set(".social-btn", { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "power4.out" } });
      tl
        .to(".hero-badge", { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "back.out(1.8)" }, "-=0.4")
        .to(".word", { opacity: 1, y: 0, stagger: 0.055, duration: 0.72 }, "-=0.35")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(".cta-primary", { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.45")
        .to(".cta-secondary", { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.45")
        .to(".stat-item", { opacity: 1, y: 0, stagger: 0.07, duration: 0.6 }, "-=0.3")
        .to(".social-btn", { opacity: 1, scale: 1, stagger: 0.06, duration: 0.5, ease: "back.out(2)" }, "-=0.35");

      gsap.to(contentRef.current, {
        y: -90, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });

      gsap.to(sectionRef.current, {
        opacity: 0.4, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "60% top", end: "bottom top", scrub: 1 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Mouse-follow badge glow ───────────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const badgeGlowX = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), { stiffness: 100, damping: 30 });
  const badgeGlowY = useSpring(useTransform(mouseY, [0, 1], [-10, 10]), { stiffness: 100, damping: 30 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex flex-col bg-bg overflow-hidden"
    >
      {/* Background */}
      <HeroCanvas />
      <div className="absolute inset-0 z-10 pointer-events-none grain animate-grain" style={{ opacity: 0.038 }} />
      <HeroGlowBlobs />
      <HeroVerticalLabel />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-20 flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-14 lg:px-16 pb-4 pt-28 sm:pt-32 lg:pt-0"
      >
        <HeroPortraitDesktop />
        <HeroPortraitMobile />

        {/* Availability badge */}
        <motion.div className="hero-badge mb-6 sm:mb-8 w-fit max-w-full" style={{ x: badgeGlowX, y: badgeGlowY }}>
          <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-white/10 bg-white/4 backdrop-blur-md overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-violet/0 via-violet/5 to-cyan/0 animate-pulse" />
            <span className="relative flex h-[8px] w-[8px] shrink-0">
              <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex translate-x-0.5 translate-y-0.5 rounded-full h-[4px] w-[4px] bg-emerald-700" />
            </span>
            <span className="font-dm text-[10px] sm:text-[11px] font-medium text-white/60 tracking-wide whitespace-nowrap">
              Available for new opportunities
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-raleway font-extrabold tracking-[-0.035em] leading-[0.9] pt-0 md:pt-8 lg:mt-0"
          style={{ fontSize: "clamp(2.5rem, 9.5vw, 7.5rem)" }}
        >
          <span className="block">
            <HeroSplitWords text="I Build&nbsp;" className="text-white/90" />
            <HeroSplitWords text="Products" gradient />
          </span>
          <span className="block">
            <HeroSplitWords text="That Move" />
          </span>
          <span className="block">
            <HeroSplitWords text="Markets." gradient />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub font-dm text-white/42 text-base md:text-[17px] leading-relaxed max-w-[380px] mb-4">
          Product Manager with 3+ years turning complex, messy problems into
          elegant products that millions of people love and businesses rely on.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <motion.a
            href="#work"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="cta-primary group flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#f0eff7] text-black font-raleway font-semibold text-sm hover:bg-white transition-colors duration-200 shadow-[0_0_30px_rgba(111,66,212,0.25)]"
            data-cursor="View"
          >
            View My Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>

          <motion.button
            onClick={() => setIsResumeModalOpen(true)}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="cta-secondary group flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/12 bg-white/4 backdrop-blur-sm text-white/65 hover:text-white hover:border-white/25 font-dm text-sm font-medium transition-all duration-200"
            data-cursor="PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            View Resume
          </motion.button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-x-10 gap-y-5">
          {STATS.map(({ value, label }) => (
            <HeroStatItem key={value} value={value} label={label} />
          ))}
        </div>
      </div>

      {/* Bottom bar — socials */}
      <div className="relative z-20 flex items-center justify-between px-4 md:px-16 pb-4">
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="social-btn w-9 h-9 rounded-full border border-white/8 bg-white/3 backdrop-blur-sm flex items-center justify-center text-white/35 hover:text-white hover:border-white/20 transition-all duration-100"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>

      <HeroMarqueeStrip />

      <HeroResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </section>
  );
}
