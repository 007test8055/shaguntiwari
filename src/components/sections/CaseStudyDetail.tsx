"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { X, ArrowRight } from "lucide-react";
import { CaseStudy3DElement } from "@/components/canvas/CaseStudy3DElement";

import { useSmoothScroll } from "@/components/ui/SmoothScrollProvider";

interface CaseStudyDetailProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyDetail({ project, onClose }: CaseStudyDetailProps) {
  const { lenis } = useSmoothScroll();

  // Prevent body and Lenis scrolling when case study is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "auto";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "auto";
      lenis?.start();
    };
  }, [project, lenis]);

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

        {/* 3D Interactive Element on Desktop */}
        <motion.div
          initial={{ opacity: 0, x: "-100%", y: -100, rotate: -15, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          exit={{
            opacity: 0,
            x: "180%",
            y: -300,
            rotate: 35,
            scale: 0.4,
            transition: { type: "spring", damping: 12, stiffness: 70, mass: 2 }
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 80,
            mass: 1,
            delay: 0.1
          }}
          className="hidden md:flex absolute inset-y-0 left-0 right-176 items-center justify-center pointer-events-auto"
        >
          <CaseStudy3DElement color={project.themeColor} />
        </motion.div>

        {/* Detail Panel */}
        <motion.div
          layoutId={`card-${project.id}`}
          initial={{ opacity: 0, x: "100%", y: 100, rotate: 10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          exit={{
            opacity: 0,
            x: "-180%",
            y: 300,
            rotate: -20,
            scale: 0.7,
            transition: { type: "spring", damping: 10, stiffness: 60, mass: 1.5 }
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            mass: 1
          }}
          className="relative w-full max-w-2xl h-full glass-panel rounded-3xl overflow-y-auto elegant-scrollbar pointer-events-auto shadow-2xl"
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
                    <div key={stat.label + stat.value}>
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
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-10 py-5 bg-white text-black font-display font-bold rounded-full text-lg hover:bg-white/90 transition-all shadow-xl"
              >
                View artifacts
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
