"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/Glass";

const SKILLS = [
  { name: "Product Strategy", group: "Discovery" },
  { name: "User Research", group: "Discovery" },
  { name: "Roadmapping", group: "Strategy" },
  { name: "Prioritization", group: "Strategy" },
  { name: "Agile Execution", group: "Execution" },
  { name: "Stakeholder MGMT", group: "Execution" },
  { name: "Growth Analytics", group: "Data" },
  { name: "Experimentation", group: "Data" },
];

export function Skills() {
  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent-secondary mb-4 block">
              Core Strengths
            </span>
            <h2 className="text-4xl font-display font-medium text-white mb-6">
              Expertise and Skillset
            </h2>
            <p className="text-accent-secondary font-body leading-relaxed">
              A multidisciplinary approach blending quantitative analysis with qualitative empathy to deliver
              high-impact product outcomes.
            </p>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassPanel className="p-5 h-full flex flex-col justify-center items-center text-center hover:bg-white/6 transition-all group">
                  <span className="text-[9px] uppercase tracking-widest text-accent-secondary mb-2 group-hover:text-white transition-colors">
                    {skill.group}
                  </span>
                  <span className="text-sm font-display font-semibold text-white/90">
                    {skill.name}
                  </span>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
