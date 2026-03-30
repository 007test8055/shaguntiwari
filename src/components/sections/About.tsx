"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/Glass";

const PHILOSOPHY_POINTS = [
  {
    title: "Strategic Clarity",
    description: "Bridging business goals with user needs through clear, evidence-driven product direction.",
  },
  {
    title: "User Empathy",
    description: "Deep-diving into user pain points to build solutions that feel intuitive and essential.",
  },
  {
    title: "Data-Informed",
    description: "Leveraging analytics and experimentation to validate assumptions and drive growth.",
  },
  {
    title: "Agile Execution",
    description: "Prioritizing with focus and delivering cross-functional outcomes at speed.",
  },
];

export function About() {
  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.3em] text-accent-secondary mb-6 block"
            >
              Philosophy
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight"
            >
              Product management is the art of <span className="text-accent-secondary italic">reducing ambiguity</span> and
              driving alignment.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-body text-accent-secondary leading-relaxed mb-10 max-w-lg"
            >
              I believe in a product-led approach that balances strategic vision with tactical excellence.
              My process is built on clarity, empathy, and a relentless focus on business impact.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PHILOSOPHY_POINTS.map((point, i) => (
              <motion.div
                key={i + point.title + point.description}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassPanel className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-display font-semibold text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm font-body text-accent-secondary leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
