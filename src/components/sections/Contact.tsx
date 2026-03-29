"use client";

import { motion } from "framer-motion";
import { GlassButton, GlassPanel } from "@/components/ui/Glass";
import { siteConfig } from "@/content";
import { Mail } from "lucide-react";
import { Linkedin } from "@/components/ui/Icons";

export function Contact() {
  return (
    <section id="contact" className="py-40 bg-black relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent-secondary mb-8 block">
            Collaborate
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-10">
            Let's build something <span className="text-accent-secondary italic">meaningful</span>.
          </h2>
          <p className="text-xl font-body text-accent-secondary mb-16 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing product strategy, internship opportunities, or interesting projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <GlassButton className="px-10 py-5 text-lg bg-white text-black hover:bg-white/90 w-full sm:w-auto flex items-center gap-3">
              <Mail className="w-5 h-5" />
              Email Shagun
            </GlassButton>
            <GlassButton className="px-10 py-5 text-lg w-full sm:w-auto flex items-center gap-3">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </GlassButton>
          </div>
        </motion.div>

        <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-mono text-white/30 tracking-widest uppercase">
            © 2024 Shagun Tiwari • Designed with Intent
          </p>
          <div className="flex gap-10">
            <a href="#work" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Work</a>
            <a href="#about" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">About</a>
            <a href={siteConfig.socials.resume} className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Resume</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
