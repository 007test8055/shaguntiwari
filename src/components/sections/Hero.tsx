"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "../canvas/HeroCanvas";
import Image from "next/image";
import {
  ArrowUpRight,
  FileText,
  Mail,
  X,
} from "lucide-react";

// Custom LinkedIn Icon as Lucide removed brand icons
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Medium = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <ellipse cx="7" cy="12" rx="5" ry="5" />
    <ellipse cx="16.5" cy="12" rx="2.5" ry="4.5" />
    <ellipse cx="21.5" cy="12" rx="1" ry="4" />
  </svg>
);
import { siteConfig } from "../../content";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ── Static data ─────────────────────────────────────────────────────────── */
const STATS = [
  { value: "10+", label: "Products Shipped" },
  { value: "1M+", label: "Users Impacted" },
  { value: "3yrs+", label: "Experience" },
  { value: "₹10Cr+", label: "Revenue Generated" },
];

const MARQUEE_SKILLS = [
  "Product Strategy", "Roadmaps", "User Research", "Growth",
  "Agile/Scrum", "Data-Driven", "Cross-Functional Leadership",
  "B2B SaaS", "Go-To-Market", "OKRs", "Stakeholder Management",
  "AI/ML Products", "Zero-to-One", "Platform Strategy",
];

const SOCIALS = [
  { Icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { Icon: Medium, href: siteConfig.socials.medium, label: "Medium" },
  { Icon: Mail, href: `mailto:${siteConfig.socials.email}`, label: "Email" },
];

/* ── Word-split text animation component ─────────────────────────────────── */
/**
 * Wraps each word in overflow:hidden so GSAP can slide words up from below,
 * creating a masked reveal — each word appears to emerge from a slot.
 */
function SplitWords({
  text,
  gradient = false,
  className = "",
}: {
  text: string;
  gradient?: boolean;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i + word + text + gradient + className}
          className="inline-block overflow-hidden py-[0.08em]"
          aria-hidden
        >
          <span
            className={`word inline-block ${gradient ? "gradient-text" : ""}`}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ── Marquee strip ───────────────────────────────────────────────────────── */
function MarqueeStrip() {
  return (
    <div className="relative z-20 w-full overflow-hidden border-t border-white/8 py-3 bg-bg/20 backdrop-blur-md mask-marquee">
      <div className="flex w-max flex-nowrap">
        {[0, 1].map((idx) => (
          <div
            key={idx + MARQUEE_SKILLS.join("")}
            className="flex shrink-0 animate-marquee items-center"
            aria-hidden={idx > 0}
          >
            {MARQUEE_SKILLS.map((skill, i) => (
              <span
                key={`${idx}-${i}` + skill + MARQUEE_SKILLS.join("")}
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


/* ── Ambient glow blobs ──────────────────────────────────────────────────── */
function GlowBlobs() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Left-side violet glow */}
      <div
        className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full animate-glow"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(111,66,212,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Centre-right cyan glow */}
      <div
        className="absolute right-1/4 top-1/3 w-[400px] h-[400px] rounded-full animate-glow"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,201,232,0.07) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-linear-to-t from-bg to-transparent" />
      {/* Top fade */}
      <div className="absolute top-0 inset-x-0 h-20 bg-linear-to-b from-bg to-transparent" />
      {/* Left fade (text legibility over canvas) */}
      <div className="absolute inset-y-0 left-0 w-[55%] bg-linear-to-r from-bg via-bg/80 to-transparent" />
    </div>
  );
}

/* ── Vertical nav label (rotated, right side) ─────────────────────────────── */
function VerticalLabel() {
  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-3">
      <span
        className="text-white/20 text-[9px] font-dm tracking-[0.3em] uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        Product Manager - {new Date().getFullYear()}
      </span>
      <div className="w-px h-16 bg-linear-to-b from-white/20 to-transparent" />
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  /* ── GSAP entrance & parallax ───────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Set all animated elements invisible before the timeline runs */
      gsap.set([".nav-logo", ".nav-link", ".nav-cta"], { opacity: 0, y: -14 });
      gsap.set(".hero-badge", { opacity: 0, scale: 0.85, y: -10 });
      gsap.set(".word", { opacity: 0, y: 55 });
      gsap.set(".hero-sub", { opacity: 0, y: 28 });
      gsap.set([".cta-primary", ".cta-secondary"], { opacity: 0, y: 18, scale: 0.96 });
      gsap.set(".stat-item", { opacity: 0, y: 20 });
      gsap.set(".social-btn", { opacity: 0, scale: 0.8 });

      /* ── Master timeline ── */
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: { ease: "power4.out" },
      });

      tl
        /* Nav fades in first */
        .to(".nav-logo", { opacity: 1, y: 0, duration: 0.7 })
        .to(".nav-link", {
          opacity: 1, y: 0, stagger: 0.07, duration: 0.6,
        }, "-=0.45")
        .to(".nav-cta", { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")

        /* Badge pops in */
        .to(".hero-badge", {
          opacity: 1, scale: 1, y: 0, duration: 0.65,
          ease: "back.out(1.8)",
        }, "-=0.4")

        /* Headline words slide up — stagger for cinematic feel */
        .to(".word", {
          opacity: 1, y: 0, stagger: 0.055, duration: 0.72,
        }, "-=0.35")

        /* Subtitle */
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")

        /* CTA buttons */
        .to(".cta-primary", {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)",
        }, "-=0.45")
        .to(".cta-secondary", {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)",
        }, "-=0.45")

        /* Stats */
        .to(".stat-item", {
          opacity: 1, y: 0, stagger: 0.07, duration: 0.6,
        }, "-=0.3")

        /* Socials */
        .to(".social-btn", {
          opacity: 1, scale: 1, stagger: 0.06, duration: 0.5,
          ease: "back.out(2)",
        }, "-=0.35");



      /* ── Parallax: content drifts up as user scrolls ── */
      gsap.to(contentRef.current, {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      /* ── Fade section out on scroll ── */
      gsap.to(sectionRef.current, {
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Framer Motion mouse-follow for the badge glow ───────────────────── */
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
      {/* ── Three.js canvas background ── */}
      <HeroCanvas />

      {/* ── Grain texture overlay ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none grain animate-grain"
        style={{ opacity: 0.038 }}
      />

      {/* ── Ambient colour blobs + gradient fades ── */}
      <GlowBlobs />

      {/* ── Vertical side label ── */}
      <VerticalLabel />

      {/* ══════════════════════════ HERO CONTENT ══════════════════════════ */}
      <div
        ref={contentRef}
        className="relative z-20 flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-14 lg:px-16 pb-4 pt-28 sm:pt-32 lg:pt-0"
      >
        {/* ── Profile portrait (og-image) — Desktop: absolute right ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
          className="hidden lg:block absolute right-16 xl:right-24 top-1/2 -translate-y-[55%] z-10"
        >
          <div className="relative group">
            {/* Outer glow ring */}
            <div className="absolute -inset-3 rounded-2xl bg-linear-to-br from-violet/25 via-cyan/10 to-violet/15 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
            {/* Gradient border frame */}
            <div className="relative p-[2px] rounded-2xl bg-linear-to-br from-white/20 via-violet/30 to-cyan/20">
              <div className="rounded-[14px] overflow-hidden bg-bg">
                <Image
                  src="/assets/og-image.png"
                  alt={siteConfig.name}
                  width={280}
                  height={280}
                  className="w-56 h-56 xl:w-64 xl:h-64 object-cover rounded-[14px] opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                  priority
                />
              </div>
            </div>
            {/* Decorative accent dot */}
            <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-linear-to-br from-violet to-cyan opacity-60" />
          </div>
        </motion.div>

        {/* ── Profile portrait (og-image) — Mobile: inline circular ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="lg:hidden mb-6"
        >
          <div className="relative group inline-block">
            {/* Outer glow ring */}
            <div className="absolute -inset-2 rounded-full bg-linear-to-br from-violet/30 via-cyan/15 to-violet/20 blur-lg opacity-70" />
            {/* Gradient border frame */}
            <div className="relative p-[2px] rounded-full bg-linear-to-br from-white/20 via-violet/30 to-cyan/20">
              <div className="rounded-full overflow-hidden bg-bg">
                <Image
                  src="/assets/og-image.png"
                  alt={siteConfig.name}
                  width={160}
                  height={160}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full opacity-90"
                  priority
                />
              </div>
            </div>
            {/* Decorative accent dot */}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-linear-to-br from-violet to-cyan opacity-60" />
          </div>
        </motion.div>
        {/* ── Availability badge ── */}
        <motion.div
          className="hero-badge mb-6 sm:mb-8 w-fit max-w-full"
          style={{ x: badgeGlowX, y: badgeGlowY }}
        >
          <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-white/10 bg-white/4drop-blur-md overflow-hidden">
            {/* Animated background shimmer */}
            <div className="absolute inset-0 bg-linear-to-r from-violet/0 via-violet/5 to-cyan/0 animate-pulse" />
            {/* Pulse dot */}
            <span className="relative flex h-[8px] w-[8px] shrink-0">
              <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex translate-x-0.5 translate-y-0.5 rounded-full h-[4px] w-[4px] bg-emerald-700" />
            </span>
            <span className="font-dm text-[10px] sm:text-[11px] font-medium text-white/60 tracking-wide whitespace-nowrap">
              Available for new opportunities
            </span>
          </div>
        </motion.div>

        {/* ── Headline ── */}
        <h1
          className="font-raleway font-extrabold tracking-[-0.035em] leading-[0.9] mb-6 sm:mb-7 mt-4 lg:mt-0"
          style={{ fontSize: "clamp(2.5rem, 9.5vw, 7.5rem)" }}
        >
          {/* Line 1 */}
          <span className="block">
            <SplitWords text="I Build" className="text-white/90" />
          </span>

          {/* Line 2 — gradient */}
          <span className="block mt-1">
            <SplitWords text="Products" gradient />
            <span className="inline-block overflow-hidden py-[0.08em]">
              <span className="word inline-block text-white/90">&nbsp;That</span>
            </span>
          </span>

          {/* Line 3 */}
          <span className="block mt-1">
            <SplitWords text="Move Markets." className="text-white/90" />
          </span>
        </h1>

        {/* ── Subtitle ── */}
        <p className="hero-sub font-dm text-white/42 text-base md:text-[17px] leading-relaxed max-w-[380px] mb-10">
          Product Manager with 3+ years turning complex, messy problems into
          elegant products that millions of people love — and businesses rely on.
        </p>

        {/* ── CTA row ── */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          <motion.a
            href="#work"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="cta-primary group flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#f0eff7] text-black font-raleway font-semibold text-sm hover:bg-white transition-colors duration-200 shadow-[0_0_30px_rgba(111,66,212,0.25)]"
            data-cursor="View"
          >
            View My Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>

          <motion.button
            onClick={() => setIsResumeModalOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="cta-secondary group flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/12 bg-white/4 backdrop-blur-sm text-white/65 hover:text-white hover:border-white/25 font-dm text-sm font-medium transition-all duration-200"
            data-cursor="PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            View Resume
          </motion.button>
        </div>

        {/* ── Stats ── */}
        <div className="flex flex-wrap gap-x-10 gap-y-5">
          {STATS.map(({ value, label }, i) => (
            <div key={i + value + label + STATS.join("")} className="stat-item group">
              <div className="font-raleway font-bold text-2xl md:text-3xl text-white/90 tracking-tight group-hover:gradient-text transition-all duration-300">
                {value}
              </div>
              <div className="font-dm text-[11px] text-white/30 mt-0.5 tracking-wide font-medium">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════ BOTTOM BAR ════════════════════════════ */}
      <div className="relative z-20 flex items-center justify-between px-4 md:px-16 pb-4">
        {/* Social links */}
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ Icon, href, label }) => (
            <motion.a
              key={label + href + Icon.name}
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

      {/* ══════════════════════════ MARQUEE STRIP ═════════════════════════ */}
      <MarqueeStrip />

      {/* ══════════════════════════ RESUME MODAL ══════════════════════════ */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-md"
            style={{ cursor: "auto" }}
            onClick={() => setIsResumeModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-bg border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              style={{ cursor: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-white/60" />
                  <span className="font-dm text-sm font-medium text-white/90">Resume - {siteConfig.name}</span>
                </div>
                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                  style={{ cursor: "pointer" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 w-full bg-white/5">
                <iframe
                  src={siteConfig.socials.resume}
                  className="w-full h-full border-0"
                  style={{ cursor: "auto" }}
                  title="Resume"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
