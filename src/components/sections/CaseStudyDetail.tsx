"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { GlassPanel } from "@/components/ui/Glass";
import { X, ArrowRight } from "lucide-react";

interface CaseStudyDetailProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyDetail({ project, onClose }: CaseStudyDetailProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-end p-4 md:p-8 pointer-events-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        />

        {/* Detail Panel */}
        <motion.div
          layoutId={`card-${project.id}`}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl h-full glass-panel rounded-3xl overflow-y-auto pointer-events-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex justify-between items-center px-8 py-6 glass-panel border-none border-b border-white/5 backdrop-blur-2xl">
            <h2 className="text-2xl font-display font-bold text-white leading-tight">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close case study details"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="px-8 py-10 space-y-12">
            <section>
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent-secondary mb-4 block">Problem</span>
              <p className="text-xl font-body text-white/90 leading-relaxed font-light">
                {project.content.problem}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
              <section>
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent-secondary mb-4 block">Context</span>
                <p className="text-sm font-body text-accent-secondary leading-loose">
                  {project.content.context}
                </p>
              </section>
              <section>
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent-secondary mb-4 block">Solution</span>
                <p className="text-sm font-body text-accent-secondary leading-loose">
                  {project.content.solution}
                </p>
              </section>
            </div>

            <section className="bg-white/3 p-8 rounded-2xl border border-white/5">
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent-secondary mb-4 block">Impact</span>
              <p className="text-lg font-display font-medium text-white/90">
                {project.content.outcome}
              </p>
              {project.stats && (
                <div className="grid grid-cols-2 gap-8 mt-10">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <span className="text-[10px] uppercase tracking-widest text-accent-secondary block mb-1">
                        {stat.label}
                      </span>
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Footer CTA */}
          <div className="p-8 mt-12 mb-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-10 py-5 bg-white text-black font-display font-bold rounded-full text-lg hover:bg-white/90 transition-all shadow-xl"
            >
              View artifacts
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
