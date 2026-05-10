"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Github, Star, GitFork, GitCommit } from "lucide-react";

// Generate fake contribution data
function generateContributions() {
  const weeks = 52;
  const days = 7;
  return Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.floor(Math.random() * 5))
  );
}

const contributions = generateContributions();

const colorScale = [
  "bg-white/5",
  "bg-[#00d4ff]/20",
  "bg-[#00d4ff]/40",
  "bg-[#00d4ff]/70",
  "bg-[#00d4ff]",
];

const repos = [
  { name: "k8s-platform", lang: "HCL", stars: 342, forks: 89, desc: "Production Kubernetes platform modules" },
  { name: "aws-landing-zone", lang: "HCL", stars: 218, forks: 67, desc: "AWS multi-account Landing Zone" },
  { name: "gitops-toolkit", lang: "Python", stars: 156, forks: 43, desc: "GitOps automation utilities" },
  { name: "observability-stack", lang: "YAML", stars: 134, forks: 38, desc: "Full LGTM observability stack" },
];

const langColors: Record<string, string> = {
  HCL: "#7B42BC",
  Python: "#3776AB",
  YAML: "#cb171e",
  Go: "#00ADD8",
  Bash: "#4EAA25",
};

export function GitHubSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const totalContributions = contributions.flat().reduce((a, b) => a + b, 0);

  return (
    <SectionWrapper
      id="github"
      badge="// GITHUB ACTIVITY"
      title="Open Source"
      titleHighlight="Contributions"
      subtitle="Building in public — sharing tools the community actually uses"
    >
      <div ref={ref} className="space-y-8">
        {/* GitHub stats bar */}
        <motion.div
          className="flex flex-wrap gap-6 glass rounded-2xl p-6 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          {[
            { icon: GitCommit, label: "Contributions", value: `${totalContributions * 8}+`, color: "#00d4ff" },
            { icon: Star, label: "Total Stars", value: "850+", color: "#f59e0b" },
            { icon: GitFork, label: "Forks", value: "237+", color: "#b347ff" },
            { icon: Github, label: "Repositories", value: "42", color: "#00ffff" },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <div
                  className="font-display font-bold text-xl"
                  style={{ fontFamily: "Syne, sans-serif", color }}
                >
                  {value}
                </div>
                <div className="font-mono text-[10px] text-white/40">{label}</div>
              </div>
            </motion.div>
          ))}
          <a
            href="https://github.com/alexchen-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl glass-blue border border-[#00d4ff]/20 text-[#00d4ff] font-mono text-xs hover:border-[#00d4ff]/50 transition-all self-center"
          >
            <Github size={14} />
            View Profile
          </a>
        </motion.div>

        {/* Contribution heatmap */}
        <motion.div
          className="glass rounded-2xl p-6 border border-white/5 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-xs text-white/40">
              {totalContributions * 8}+ contributions in 2025
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-white/30">
              Less
              {colorScale.map((cls, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
              ))}
              More
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day, di) => (
                    <motion.div
                      key={di}
                      className={`w-3 h-3 rounded-sm ${colorScale[day]} transition-all duration-200 hover:scale-110 cursor-pointer`}
                      title={`${day} contributions`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        delay: Math.random() * 0.5,
                        duration: 0.3,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Month labels */}
          <div className="flex gap-1 mt-2 overflow-x-auto">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
              <div key={m} className="font-mono text-[9px] text-white/20 w-[52px] flex-shrink-0">
                {m}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top repos */}
        <div className="grid md:grid-cols-2 gap-4">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/alexchen-dev/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-5 border border-white/5 card-hover block"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Github size={14} className="text-white/50" />
                  <span className="font-mono text-sm text-[#00d4ff]">
                    {repo.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-[#f59e0b]" />
                    <span className="font-mono text-xs text-white/40">{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={12} className="text-white/30" />
                    <span className="font-mono text-xs text-white/40">{repo.forks}</span>
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-3">{repo.desc}</p>
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: langColors[repo.lang] || "#888" }}
                />
                <span className="font-mono text-xs text-white/40">{repo.lang}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
