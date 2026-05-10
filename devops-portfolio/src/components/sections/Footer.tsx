"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Terminal, Heart } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/alexchen-dev" },
  { icon: Linkedin, href: "https://linkedin.com/in/alexchen-devops" },
  { icon: Twitter, href: "https://twitter.com/alexchen_dev" },
  { icon: Mail, href: "mailto:alex@alexchen.dev" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 glass-blue rounded flex items-center justify-center border border-[#00d4ff]/30">
              <Terminal size={14} className="text-[#00d4ff]" />
            </div>
            <span
              className="font-display font-bold text-white tracking-wide"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              ALEX<span className="text-[#00d4ff]">.</span>CHEN
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6 justify-center">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-white/40 hover:text-[#00d4ff] transition-colors tracking-wider uppercase"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="w-9 h-9 glass rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-white/25 flex items-center gap-1.5">
            Built with
            <Heart size={10} className="text-red-400 fill-red-400" />
            using Next.js 15, Three.js & Framer Motion
          </p>
          <p className="font-mono text-[11px] text-white/25">
            © 2026 Alex Chen. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-[11px] text-green-400/70">
              All systems operational
            </span>
          </div>
        </div>

        {/* Terminal signature */}
        <div className="mt-6 text-center">
          <span className="font-mono text-[10px] text-white/15">
            $ echo "Thanks for visiting — let&apos;s build something great together" | cowsay
          </span>
        </div>
      </div>
    </footer>
  );
}
