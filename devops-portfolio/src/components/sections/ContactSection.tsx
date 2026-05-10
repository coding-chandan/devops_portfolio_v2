"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Send, Mail, Github, Linkedin, Twitter, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    toast.success("Message sent! I'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const socials = [
    { icon: Mail, label: "Email", value: "alex@alexchen.dev", href: "mailto:alex@alexchen.dev", color: "#00d4ff" },
    { icon: Github, label: "GitHub", value: "alexchen-dev", href: "https://github.com/alexchen-dev", color: "#b347ff" },
    { icon: Linkedin, label: "LinkedIn", value: "alexchen-devops", href: "https://linkedin.com/in/alexchen-devops", color: "#0A66C2" },
    { icon: Twitter, label: "Twitter", value: "@alexchen_dev", href: "https://twitter.com/alexchen_dev", color: "#1DA1F2" },
  ];

  return (
    <SectionWrapper
      id="contact"
      badge="// CONTACT"
      title="Let's Build"
      titleHighlight="Together"
      subtitle="Open to senior DevOps, platform engineering, and SRE roles. Also available for consulting."
    >
      <div ref={ref} className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Left - info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-green-400 tracking-wider">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Looking for a senior platform engineer or DevOps consultant who can hit the ground running? I&apos;d love to hear about your infrastructure challenges.
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 glass rounded-xl p-4 border border-white/5">
            <MapPin size={16} className="text-[#00d4ff]" />
            <div>
              <div className="font-mono text-xs text-white">San Francisco, CA</div>
              <div className="font-mono text-[10px] text-white/40 mt-0.5">
                Open to remote worldwide
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="space-y-3">
            {socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5 card-hover group"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${social.color}15`,
                    border: `1px solid ${social.color}30`,
                  }}
                >
                  <social.icon size={16} style={{ color: social.color }} />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[10px] text-white/30">
                    {social.label}
                  </div>
                  <div className="font-mono text-sm text-white group-hover:text-[#00d4ff] transition-colors">
                    {social.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Response time */}
          <div className="glass rounded-xl p-4 border border-white/5">
            <div className="font-mono text-xs text-white/40 mb-1">
              TYPICAL RESPONSE TIME
            </div>
            <div className="font-display text-2xl font-bold text-[#00d4ff]" style={{ fontFamily: "Syne, sans-serif" }}>
              &lt; 24 hours
            </div>
          </div>
        </motion.div>

        {/* Right - form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass rounded-2xl p-8 border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-xs text-white/30">
                new-message.sh
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Your Name", placeholder: "John Smith" },
                  { key: "email", label: "Email Address", placeholder: "john@company.com", type: "email" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block font-mono text-[10px] text-white/40 mb-2 tracking-wider uppercase">
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-mono text-[10px] text-white/40 mb-2 tracking-wider uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Senior DevOps Engineer Opportunity"
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-white/40 mb-2 tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or role..."
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-[#00d4ff]/40 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-mono text-sm transition-all duration-300 disabled:opacity-70"
                style={{
                  background: sent ? "#10b981" : "#00d4ff",
                  color: "#000",
                }}
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
