"use client";

import { useState } from "react";
import { projects } from "@/content";
import { Project } from "@/types";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { CaseStudyDetail } from "./CaseStudyDetail";
import { motion } from "framer-motion";

export function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent-secondary mb-4 block">
              Case Studies
            </span>
            <h2 className="text-5xl font-display font-medium text-white mb-6">
              Selected Impact
            </h2>
            <p className="text-accent-secondary font-body leading-relaxed">
              Dive into the strategic decisions, research insights, and collaborative processes behind 
              shipped outcomes and business growth.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CaseStudyCard
                project={project}
                onClick={setSelectedProject}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <CaseStudyDetail
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
