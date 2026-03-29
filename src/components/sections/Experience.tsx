"use client";

import { experience } from "@/content";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/Glass";

export function Experience() {
  return (
    <section id="experience" className="py-32 bg-black relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent-secondary mb-4 block">
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white">
            Professional Experience
          </h2>
        </motion.div>

        <div className="relative space-y-12">
          {/* Vertical line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-[16.5px] md:left-1/2 md:-translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10" />

              {/* Offset for mobile */}
              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                <GlassPanel className="p-6 hover:border-white/20 transition-colors">
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="text-xs font-medium text-accent-secondary uppercase tracking-widest">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white">
                      {exp.role} @ {exp.company}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="text-sm font-body text-accent-secondary leading-relaxed flex gap-2">
                        <span className="opacity-50 text-white">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/[0.05] border border-white/[0.1] text-accent-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </div>

              {/* Spacer for other side on desktop */}
              <div className="hidden md:block w-1/2 px-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
