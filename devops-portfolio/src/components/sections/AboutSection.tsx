"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Terminal, MapPin, Mail, Coffee, Cpu, Globe } from "lucide-react";

const terminalLines = [
  { prompt: "whoami", output: "alex-chen" },
  { prompt: "cat role.txt", output: "Senior Cloud & DevOps Engineer" },
  { prompt: "echo $LOCATION", output: "San Francisco, CA" },
  { prompt: "ls certifications/", output: "aws/ cka/ ckad/ terraform/ gcp/ ..." },
  { prompt: "cat philosophy.txt", output: "Automate everything. Monitor everything. Break nothing." },
];

export function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <SectionWrapper
      id="about"
      badge="// ABOUT ME"
      title="Engineering"
      titleHighlight="Excellence"
      subtitle="I build infrastructure that scales from zero to millions without breaking a sweat."
    >
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left - Terminal */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="terminal rounded-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="font-mono text-xs text-white/30">
                alex@devops:~
              </span>
              <div className="w-16" />
            </div>

            {/* Terminal content */}
            <div className="p-6 space-y-4">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#00d4ff] font-mono text-sm">$</span>
                    <span className="font-mono text-sm text-white/70">
                      {line.prompt}
                    </span>
                  </div>
                  <div className="font-mono text-sm text-green-400/80 mt-1 pl-4">
                    {line.output}
                  </div>
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <div className="flex items-center gap-2">
                <span className="text-[#00d4ff] font-mono text-sm">$</span>
                <span className="typing-cursor" />
              </div>
            </div>
          </div>

          {/* Decorative metrics below terminal */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { label: "Projects", value: "50+", icon: Cpu },
              { label: "Countries", value: "12", icon: Globe },
              { label: "Coffee/day", value: "∞", icon: Coffee },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="glass rounded-xl p-4 text-center border border-white/5"
              >
                <Icon size={16} className="text-[#00d4ff] mx-auto mb-2" />
                <div className="font-display text-xl font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                  {value}
                </div>
                <div className="font-mono text-[10px] text-white/40 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right - Bio */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <p className="text-white/70 text-lg leading-relaxed">
              I&apos;m a{" "}
              <span className="text-[#00d4ff]">
                Senior Cloud & DevOps Engineer
              </span>{" "}
              with 6+ years of experience designing and operating cloud-native
              infrastructure at scale. My work sits at the intersection of
              software engineering, systems thinking, and operational excellence.
            </p>
            <p className="text-white/60 leading-relaxed">
              I specialize in building platforms that enable developers to ship
              fast and confidently — from zero-downtime Kubernetes migrations to
              fully automated CI/CD pipelines that catch bugs before they reach
              production.
            </p>
            <p className="text-white/60 leading-relaxed">
              When I&apos;m not architecting infrastructure, I&apos;m writing
              open-source Terraform modules, contributing to CNCF projects, or
              mentoring the next generation of platform engineers.
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            {[
              {
                icon: Terminal,
                text: "Reduced deployment time from 45 minutes to under 4",
                color: "#00d4ff",
              },
              {
                icon: Terminal,
                text: "Managed infrastructure for 10M+ user platforms",
                color: "#b347ff",
              },
              {
                icon: Terminal,
                text: "12 professional cloud certifications across AWS, GCP, CNCF",
                color: "#00ffff",
              },
              {
                icon: MapPin,
                text: "San Francisco, CA — Open to remote worldwide",
                color: "#f59e0b",
              },
              {
                icon: Mail,
                text: "alex@alexchen.dev",
                color: "#10b981",
              },
            ].map(({ icon: Icon, text, color }, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div
                  className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                >
                  <Icon size={12} style={{ color }} />
                </div>
                <span className="text-white/60 text-sm">{text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-4 pt-4">
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-xl bg-[#00d4ff] text-black font-medium text-sm hover:bg-white transition-all duration-300"
            >
              Download Resume
            </a>
            <button
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 rounded-xl glass border border-white/10 text-white/70 font-medium text-sm hover:text-white hover:border-white/30 transition-all duration-300"
            >
              View Projects
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
