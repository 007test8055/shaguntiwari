"use client";

import { useState, useEffect, useCallback, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassButton, GlassPanel } from "@/components/ui/Glass";
import { siteConfig } from "@/content";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Linkedin, Medium } from "@/components/ui/Icons";
import { sendEmail } from "@/app/actions/contact";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  message: "",
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validateForm = useCallback(() => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return false;
    }

    return true;
  }, [formData]);

  /* ---------------- HANDLERS ---------------- */
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => {
        // prevent unnecessary re-renders
        if (prev[name as keyof FormData] === value) return prev;
        return { ...prev, [name]: value };
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (isSubmitting) return;
      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        const result = await sendEmail(formData);

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        toast.success(result?.success || "Message sent!");
        setIsSuccess(true);
        setFormData(INITIAL_FORM);
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, isSubmitting, validateForm]
  );

  /* ---------------- SUCCESS RESET (SAFE) ---------------- */
  useEffect(() => {
    if (!isSuccess) return;

    const timer = setTimeout(() => setIsSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  /* ---------------- UI ---------------- */
  return (
    <section id="contact" className="py-40 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent-secondary mb-8 block">
              Collaborate
            </span>

            <h2 className="text-5xl md:text-7xl font-display text-white mb-10 leading-tight">
              Let&apos;s build something{" "}
              <span className="text-accent-secondary italic">meaningful</span>
            </h2>

            <p className="text-xl text-accent-secondary mb-12">
              I&apos;m always open to discussing product strategy, internships, or interesting projects.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${siteConfig.socials.email}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-sm text-white/70"
              >
                <Mail className="w-4 h-4" />
                Mail
              </a>

              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-sm text-white/70"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>

              <a
                href={siteConfig.socials.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-sm text-white/70"
              >
                <Medium className="w-4 h-4" />
                Medium
              </a>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassPanel className="p-4 md:p-6 border-white/10">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>

                    <h3 className="text-2xl text-white mb-2">Message Sent!</h3>
                    <p className="text-accent-secondary">
                      Thanks for reaching out! I will get back to you shortly.
                    </p>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 text-xs uppercase tracking-widest text-white/50 hover:text-white"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />

                    <Textarea
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hello, I'd like to talk about..."
                    />

                    <GlassButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 text-lg flex items-center justify-center gap-3 bg-white text-black disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </GlassButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- REUSABLE INPUT COMPONENTS ---------------- */
const Input = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase tracking-widest text-white/50 ml-1">{label}</label>
    <input
      {...props}
      required
      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 
                 focus:outline-none focus:border-accent-secondary/50 transition-colors"
    />
  </div>
);

const Textarea = ({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase tracking-widest text-white/50 ml-1">{label}</label>
    <textarea
      {...props}
      required
      rows={5}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 
                 focus:outline-none focus:border-accent-secondary/50 transition-colors resize-none"
    />
  </div>
);