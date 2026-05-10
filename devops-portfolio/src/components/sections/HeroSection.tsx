"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Download,
  Mail,
  ChevronDown,
  Terminal,
  Zap,
  Cloud,
  Box,
} from "lucide-react";

const typingPhrases = [
  "Cloud & DevOps Engineer",
  "Platform Engineer",
  "Kubernetes Architect",
  "Infrastructure Automation Expert",
  "Site Reliability Engineer",
];

const floatingTech = [
  { label: "K8S", icon: "⎈", color: "#326CE5", delay: 0, x: "15%", y: "25%" },
  { label: "AWS", icon: "☁", color: "#FF9900", delay: 1, x: "80%", y: "20%" },
  { label: "TF", icon: "◈", color: "#7B42BC", delay: 2, x: "85%", y: "70%" },
  { label: "GH", icon: "◉", color: "#00d4ff", delay: 0.5, x: "10%", y: "70%" },
  { label: "DOCKER", icon: "🐳", color: "#2496ED", delay: 1.5, x: "50%", y: "15%" },
  { label: "ARGOCD", icon: "◎", color: "#ef5350", delay: 2.5, x: "70%", y: "45%" },
];

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Typing animation
  useEffect(() => {
    const phrase = typingPhrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(
        () => setDisplayed(phrase.slice(0, displayed.length + 1)),
        80
      );
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(phrase.slice(0, displayed.length - 1)),
        40
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Layered background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Aurora glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{
          background: "radial-gradient(circle, #00d4ff, transparent)",
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          transition: "transform 0.3s ease",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{
          background: "radial-gradient(circle, #b347ff, transparent)",
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
          transition: "transform 0.3s ease",
        }}
      />

      {/* Floating tech badges */}
      {floatingTech.map((tech, i) => (
        <motion.div
          key={tech.label}
          className="absolute hidden lg:flex items-center gap-1.5 glass rounded-full px-3 py-1.5 border"
          style={{
            left: tech.x,
            top: tech.y,
            borderColor: `${tech.color}30`,
            background: `${tech.color}08`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { delay: 1 + tech.delay, duration: 0.5 },
            scale: { delay: 1 + tech.delay, duration: 0.5 },
            y: {
              delay: tech.delay,
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <span className="text-sm">{tech.icon}</span>
          <span
            className="font-mono text-[11px] font-medium"
            style={{ color: tech.color }}
          >
            {tech.label}
          </span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-white/60 tracking-widest">
              AVAILABLE FOR HIRE
            </span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-4 leading-none"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <span className="text-white">Chandan</span>
            <br />
            <span className="aurora-text">Maheshwari.</span>
          </h1>
        </motion.div>

        {/* Typing role */}
        <motion.div
          className="h-10 flex items-center justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="font-mono text-xl sm:text-2xl text-[#00d4ff] mr-1">
            {displayed}
          </span>
          <span className="typing-cursor" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="max-w-2xl mx-auto text-white/50 text-lg sm:text-xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Architecting resilient cloud infrastructure, automating deployment
          pipelines, and orchestrating Kubernetes at scale. Building systems
          that{" "}
          <span className="text-[#00d4ff]">deploy faster</span>,{" "}
          <span className="text-[#b347ff]">scale effortlessly</span>, and{" "}
          <span className="text-[#00ffff]">never go down</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00d4ff] text-black font-medium text-sm hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
          >
            <Download size={16} />
            Download Resume
          </a>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass-blue border border-[#00d4ff]/20 text-[#00d4ff] font-medium text-sm hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-105"
          >
            <Mail size={16} />
            Get In Touch
          </button>
          <a
            href="https://github.com/coding-chandan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/10 text-white/70 font-medium text-sm hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="www.linkedin.com/in/chandan-maheshwari-8103472a4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/10 text-white/70 font-medium text-sm hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { icon: Cloud, label: "6+ Years Cloud", color: "#00d4ff" },
            { icon: Box, label: "50+ Projects Shipped", color: "#b347ff" },
            { icon: Zap, label: "99.9% Uptime", color: "#00ffff" },
            { icon: Terminal, label: "12 Certifications", color: "#f59e0b" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={14} style={{ color }} />
              <span className="font-mono text-xs text-white/40">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-mono text-[10px] text-white/30 tracking-widest">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* Side decorations */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#00d4ff]/30 to-transparent" />
        <div className="flex flex-col gap-3">
          {[
            { icon: Github, href: "https://github.com/coding-chandan" },
            { icon: Linkedin, href: "www.linkedin.com/in/chandan-maheshwari-8103472a4" },
            { icon: Mail, href: "#contact" },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              className="text-white/30 hover:text-[#00d4ff] transition-colors duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#00d4ff]/30 to-transparent" />
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#b347ff]/30 to-transparent" />
        <span
          className="font-mono text-[10px] text-white/20 tracking-widest"
          style={{ writingMode: "vertical-rl" }}
        >
          Chandan.Dev
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#b347ff]/30 to-transparent" />
      </div>
    </section>
  );
}
