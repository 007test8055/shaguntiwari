import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassButton, GlassPanel } from "@/components/ui/Glass";
import { siteConfig } from "@/content";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Linkedin, Medium } from "@/components/ui/Icons";
import { sendEmail } from "@/app/actions/contact";
import { toast } from "sonner";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const result = await sendEmail(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        // Reset success state after 5 seconds to show form again if needed
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-40 bg-black relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent-secondary mb-8 block">
              Collaborate
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-10 leading-tight">
              Let's build something <span className="text-accent-secondary italic">meaningful</span>.
            </h2>
            <p className="text-xl font-body text-accent-secondary mb-12 leading-relaxed">
              I'm always open to discussing product strategy, internship opportunities, or interesting projects. Reach out via the form, or through my socials.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href={`mailto:${siteConfig.socials.email}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm text-white/70"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.socials.email}
              </a>
              <a 
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm text-white/70"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href={siteConfig.socials.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm text-white/70"
              >
                <Medium className="w-4 h-4" />
                Medium
              </a>
            </div>
          </motion.div>

          {/* Right Side: Form */}
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
                    <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-accent-secondary">Thanks for reaching out, Shagun will get back to you shortly.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-white/50 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-secondary/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-white/50 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-secondary/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-white/50 ml-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Hello, I'd like to talk about..."
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-secondary/50 transition-colors resize-none"
                      />
                    </div>

                    <GlassButton 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 text-lg flex items-center justify-center gap-3 bg-white text-black hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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

        <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-mono text-white/30 tracking-widest uppercase text-center md:text-left">
            {siteConfig.name} - &copy; {new Date().getFullYear()} - Designed with Intent
          </p>
          <div className="flex gap-10">
            <a href="#work" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Work</a>
            <a href="#about" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">About</a>
            <a href="#experience" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Experience</a>
            <a href={siteConfig.socials.medium} target="_blank" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Medium</a>
            <a href={siteConfig.socials.resume} target="_blank" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Resume</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
