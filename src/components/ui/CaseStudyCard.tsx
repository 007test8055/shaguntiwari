"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { GlassPanel } from "@/components/ui/Glass";
import { ArrowUpRight } from "lucide-react";

interface CaseStudyCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function CaseStudyCard({ project, onClick }: CaseStudyCardProps) {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => onClick(project)}
      className="cursor-pointer group h-full"
    >
      <GlassPanel className="h-full flex flex-col p-0 overflow-hidden hover:border-white/30 transition-colors">
        {/* Card Image / Placeholder */}
        <div className="aspect-video w-full bg-linear-to-br from-white/5 to-white/10 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/10 font-display font-bold text-6xl select-none">
              {project.title.charAt(0)}
            </span>
          </div>
          
          <div className="absolute top-4 right-4 p-2 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[9px] uppercase tracking-wider text-accent-secondary">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-sm font-body text-accent-secondary leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
            <span className="text-xs font-medium text-white/50">{project.role}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/90">Read Case Study</span>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
