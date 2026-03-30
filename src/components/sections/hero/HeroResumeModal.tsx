"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, X } from "lucide-react";
import { siteConfig } from "../../../content";

interface HeroResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeroResumeModal({ isOpen, onClose }: HeroResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-md"
          style={{ cursor: "auto" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl h-[85vh] bg-bg border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ cursor: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-white/60" />
                <span className="font-dm text-sm font-medium text-white/90">
                  Resume - {siteConfig.name}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                style={{ cursor: "pointer" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 w-full bg-white/5">
              <iframe
                src={siteConfig.socials.resume}
                className="w-full h-full border-0"
                style={{ cursor: "auto" }}
                title="Resume"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
