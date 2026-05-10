"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/data/portfolio";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

const categories = ["all", "kubernetes", "cicd", "iac", "monitoring", "gitops", "aws"];

export function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper
      id="projects"
      badge="// PROJECTS"
      title="Featured"
      titleHighlight="Work"
      subtitle="Production-grade infrastructure projects that solved real engineering challenges"
    >
      <div ref={ref}>
        {/* Category filter */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full font-mono text-xs transition-all duration-300"
              style={{
                background:
                  activeCategory === cat
                    ? "#00d4ff"
                    : "rgba(255,255,255,0.03)",
                color: activeCategory === cat ? "#000" : "rgba(255,255,255,0.5)",
                border: `1px solid ${activeCategory === cat ? "#00d4ff" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {cat === "all" ? "All Projects" : cat.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              className="glass rounded-2xl overflow-hidden border border-white/5 card-hover flex flex-col"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Project image/preview area */}
              <div
                className="h-40 relative overflow-hidden flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
                  borderBottom: `1px solid ${project.color}20`,
                }}
              >
                {/* Animated grid overlay */}
                <div className="absolute inset-0 grid-bg opacity-30" />

                {/* Category icon */}
                <div
                  className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${project.color}20`,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  <span className="text-2xl">
                    {project.category === "kubernetes" && "⎈"}
                    {project.category === "cicd" && "⚡"}
                    {project.category === "iac" && "◈"}
                    {project.category === "monitoring" && "📊"}
                    {project.category === "gitops" && "◎"}
                    {project.category === "aws" && "☁"}
                  </span>
                </div>

                {/* Featured badge */}
                {project.featured && (
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-md font-mono text-[10px]"
                    style={{
                      background: `${project.color}20`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    FEATURED
                  </div>
                )}

                {/* Metrics bar */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex gap-3 bg-black/30 backdrop-blur-sm">
                  {Object.entries(project.metrics).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: project.color }}
                      >
                        {val}
                      </span>
                      <span className="font-mono text-[9px] text-white/40 capitalize">
                        {key}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="font-display text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded font-mono text-[10px] bg-white/5 text-white/50 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass border border-white/10 text-white/60 font-mono text-xs hover:text-white hover:border-white/30 transition-all"
                  >
                    <Github size={12} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs transition-all flex-1 justify-center"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    <ExternalLink size={12} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a
            href="https://github.com/alexchen-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-white/60 font-mono text-sm hover:text-white hover:border-white/30 transition-all duration-300 group"
          >
            View All Projects on GitHub
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
