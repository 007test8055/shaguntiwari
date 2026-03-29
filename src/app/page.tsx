"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/sections/Hero";
import CustomCursor from "@/components/ui/CustomCursor";
import { Header } from "@/components/sections/Header";
import { Credibility } from "@/components/sections/Credibility";
import { About } from "@/components/sections/About";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "lucide-react";

// Register GSAP plugins once at module level
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    /* ── Lenis smooth scroll ─────────────────────────────────────────────── */
    const lenis = new Lenis({
      duration: 1.25,
      // Exponential easing for that "butter" feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    /* ── Sync Lenis RAF with GSAP ticker ─────────────────────────────────── */
    // Using GSAP's ticker instead of requestAnimationFrame for perfect sync
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    /* ── Keep ScrollTrigger in sync ──────────────────────────────────────── */
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-bg text-[#f0eff7] overflow-x-hidden">
      {/* Magnetic cursor overlay — positioned fixed, above everything */}
      <CustomCursor />

      {/* Landing hero section */}
      <Header />
      <HeroSection />
      <Credibility />
      <About />
      <SelectedWork />
      <Experience />
      <Skills />
      <Contact />

      {/*
        Add more sections here:
        <AboutSection />
        <WorkSection />
        <ProcessSection />
        <ContactSection />
      */}
    </main>
  );
}