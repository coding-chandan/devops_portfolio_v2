"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Terminal } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-white/5 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-7 h-7 glass-blue rounded flex items-center justify-center border border-[#00d4ff]/30">
                <Terminal size={14} className="text-[#00d4ff]" />
              </div>
              <span
                className="font-display font-bold text-white tracking-wide"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                CHANDAN<span className="text-[#00d4ff]">.</span>DEV
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="relative font-mono text-xs text-white/50 hover:text-[#00d4ff] transition-colors duration-200 tracking-wider uppercase group"
                >
                  <span>{link.label}</span>
                  <span className="absolute -bottom-1 left-0 h-px bg-[#00d4ff] w-0 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg glass-blue border border-[#00d4ff]/20 text-[#00d4ff] font-mono text-xs hover:glow-blue transition-all duration-300 hover:border-[#00d4ff]/50"
              >
                <Download size={12} />
                Resume
              </a>
              <button
                onClick={() => scrollTo("#contact")}
                className="px-4 py-2 rounded-lg bg-[#00d4ff] text-black font-mono text-xs font-medium hover:bg-white transition-all duration-300"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 glass border-l border-white/10 p-8 pt-20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-left font-mono text-sm text-white/60 hover:text-[#00d4ff] transition-colors tracking-wider uppercase"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="text-[#00d4ff] mr-2">{String(i + 1).padStart(2, "0")}.</span>
                    {link.label}
                  </motion.button>
                ))}
                <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-3 rounded-lg glass-blue border border-[#00d4ff]/20 text-[#00d4ff] font-mono text-xs"
                  >
                    <Download size={14} />
                    Download Resume
                  </a>
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="px-4 py-3 rounded-lg bg-[#00d4ff] text-black font-mono text-xs font-medium"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
