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
import { Contact } from "@/components/sections/Contact";

import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
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
    </SmoothScrollProvider>
  );
}