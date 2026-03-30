"use client";

import HeroSection from "@/components/sections/Hero";
import { Header } from "@/components/sections/Header";
import { Credibility } from "@/components/sections/Credibility";
import { About } from "@/components/sections/About";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <main className="relative bg-bg text-[#f0eff7] overflow-x-hidden">
        <Header />
        <HeroSection />
        <Credibility />
        <About />
        <SelectedWork />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}