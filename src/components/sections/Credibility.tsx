"use client";

import { motion } from "framer-motion";

const CREDENTIALS = [
  { label: "Product", value: "CloudHire" },
  { label: "Growth", value: "Ex-Dice" },
  { label: "Impact", value: "Ex-NoBroker" },
  { label: "Experience", value: "4+ Years" },
];

export function Credibility() {
  return (
    <section className="py-20 border-y border-white/[0.05] bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {CREDENTIALS.map((cred, i) => (
            <motion.div
              key={cred.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center md:items-start"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-secondary mb-2">
                {cred.label}
              </span>
              <span className="text-2xl md:text-3xl font-display font-medium text-white/90">
                {cred.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
