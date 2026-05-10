"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const technologies = [
  { name: "AWS", emoji: "☁️", color: "#FF9900", category: "cloud" },
  { name: "GCP", emoji: "🌐", color: "#4285F4", category: "cloud" },
  { name: "Azure", emoji: "🔷", color: "#0089D6", category: "cloud" },
  { name: "Kubernetes", emoji: "⎈", color: "#326CE5", category: "containers" },
  { name: "Docker", emoji: "🐳", color: "#2496ED", category: "containers" },
  { name: "Helm", emoji: "⚓", color: "#0F1689", category: "containers" },
  { name: "ArgoCD", emoji: "◎", color: "#ef5350", category: "gitops" },
  { name: "Terraform", emoji: "◈", color: "#7B42BC", category: "iac" },
  { name: "Ansible", emoji: "⚙️", color: "#EE0000", category: "iac" },
  { name: "GitHub Actions", emoji: "⚡", color: "#2088FF", category: "cicd" },
  { name: "Jenkins", emoji: "🔧", color: "#D33833", category: "cicd" },
  { name: "Prometheus", emoji: "🔥", color: "#E6522C", category: "monitoring" },
  { name: "Grafana", emoji: "📊", color: "#F46800", category: "monitoring" },
  { name: "ELK Stack", emoji: "🐘", color: "#00BFB3", category: "monitoring" },
  { name: "Python", emoji: "🐍", color: "#3776AB", category: "scripting" },
  { name: "Bash", emoji: "💻", color: "#4EAA25", category: "scripting" },
  { name: "Linux", emoji: "🐧", color: "#FCC624", category: "os" },
  { name: "Nginx", emoji: "⚡", color: "#009639", category: "networking" },
  { name: "Vault", emoji: "🔐", color: "#FFCD00", category: "security" },
  { name: "Git", emoji: "📝", color: "#F05032", category: "vcs" },
  { name: "Istio", emoji: "🕸️", color: "#466BB0", category: "service-mesh" },
  { name: "Datadog", emoji: "🐕", color: "#632CA6", category: "monitoring" },
];

const categories = [...new Set(technologies.map((t) => t.category))];

export function TechStackSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="techstack"
      badge="// TECH STACK"
      title="Tools &"
      titleHighlight="Technologies"
      subtitle="The full arsenal — from cloud platforms to scripting languages"
    >
      <div ref={ref}>
        {/* Icon grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="group flex flex-col items-center gap-2 p-3 rounded-xl glass border border-white/5 cursor-default"
              style={{
                transition: "all 0.3s ease",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              whileHover={{
                y: -4,
                borderColor: `${tech.color}40`,
                backgroundColor: `${tech.color}08`,
              }}
            >
              <span className="text-2xl">{tech.emoji}</span>
              <span className="font-mono text-[9px] text-white/40 group-hover:text-white/70 transition-colors text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Category legend */}
        <motion.div
          className="mt-12 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[
            { label: "Cloud", color: "#00d4ff" },
            { label: "Containers", color: "#326CE5" },
            { label: "CI/CD", color: "#2088FF" },
            { label: "IaC", color: "#7B42BC" },
            { label: "Monitoring", color: "#F46800" },
            { label: "Security", color: "#FFCD00" },
            { label: "Networking", color: "#009639" },
            { label: "Scripting", color: "#3776AB" },
          ].map(({ label, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}30`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: color }}
              />
              <span className="font-mono text-[11px]" style={{ color }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
