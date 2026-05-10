"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CheckCircle, Clock, ArrowRight, GitBranch, Package, Shield, Rocket, Activity } from "lucide-react";

const pipelineStages = [
  {
    name: "Code Push",
    icon: GitBranch,
    status: "success",
    duration: "0s",
    color: "#10b981",
    steps: ["git push origin main", "Webhook triggered", "Pipeline initiated"],
  },
  {
    name: "Build & Test",
    icon: Package,
    status: "success",
    duration: "1m 23s",
    color: "#00d4ff",
    steps: ["Docker build", "Unit tests (98%)", "Integration tests"],
  },
  {
    name: "Security Scan",
    icon: Shield,
    status: "success",
    duration: "45s",
    color: "#b347ff",
    steps: ["SAST analysis", "Container scan", "Secrets detection"],
  },
  {
    name: "Deploy Staging",
    icon: Rocket,
    status: "success",
    duration: "38s",
    color: "#f59e0b",
    steps: ["Helm upgrade", "Health checks", "Smoke tests"],
  },
  {
    name: "Promote Prod",
    icon: Activity,
    status: "running",
    duration: "12s",
    color: "#00ffff",
    steps: ["Canary 10%", "Metrics check", "Full rollout"],
  },
];

const metrics = [
  { label: "Avg Build Time", value: "3m 48s", delta: "-67%", positive: true },
  { label: "Deployment Freq", value: "12/day", delta: "+400%", positive: true },
  { label: "MTTR", value: "4 min", delta: "-89%", positive: true },
  { label: "Change Fail Rate", value: "0.2%", delta: "-95%", positive: true },
];

export function CICDSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="cicd"
      badge="// CI/CD PIPELINES"
      title="Automated"
      titleHighlight="Delivery"
      subtitle="From code push to production in under 4 minutes — with full security scanning"
    >
      <div ref={ref} className="space-y-12">
        {/* Pipeline visualization */}
        <div className="glass rounded-2xl p-8 border border-white/5 overflow-hidden relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="font-mono text-xs text-white/40 mb-1">
                PIPELINE RUN #4821
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-sm text-white/70">
                  k8s-platform / main → production
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30">
              <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse" />
              <span className="font-mono text-xs text-[#00d4ff]">
                RUNNING — 3m 46s
              </span>
            </div>
          </div>

          {/* Pipeline stages */}
          <div className="flex items-center gap-0 overflow-x-auto pb-4">
            {pipelineStages.map((stage, i) => (
              <div key={stage.name} className="flex items-center flex-shrink-0">
                <motion.div
                  className="w-48 glass rounded-xl p-4 border"
                  style={{ borderColor: `${stage.color}30` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                >
                  {/* Stage header */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${stage.color}20`,
                        border: `1px solid ${stage.color}40`,
                      }}
                    >
                      <stage.icon size={14} style={{ color: stage.color }} />
                    </div>
                    {stage.status === "success" ? (
                      <CheckCircle size={14} className="text-green-400" />
                    ) : (
                      <div className="w-3.5 h-3.5 border-2 border-[#00d4ff] rounded-full border-t-transparent animate-spin" />
                    )}
                  </div>

                  <div className="font-mono text-xs font-medium text-white mb-1">
                    {stage.name}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Clock size={10} className="text-white/30" />
                    <span className="font-mono text-[10px] text-white/40">
                      {stage.duration}
                    </span>
                  </div>

                  {/* Steps */}
                  <div className="space-y-1">
                    {stage.steps.map((step, si) => (
                      <motion.div
                        key={si}
                        className="flex items-center gap-1.5"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3 + i * 0.15 + si * 0.05 }}
                      >
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ background: stage.color }}
                        />
                        <span className="font-mono text-[10px] text-white/40">
                          {step}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Connector */}
                {i < pipelineStages.length - 1 && (
                  <motion.div
                    className="flex items-center px-1 flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    <div className="w-6 h-px bg-gradient-to-r from-white/20 to-white/20" />
                    <ArrowRight size={12} className="text-white/20" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DORA Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="glass rounded-xl p-5 border border-white/5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="font-mono text-[10px] text-white/40 mb-2 tracking-wider">
                {metric.label}
              </div>
              <div
                className="font-display text-2xl font-bold mb-1"
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: "#00d4ff",
                }}
              >
                {metric.value}
              </div>
              <div
                className="font-mono text-xs"
                style={{ color: metric.positive ? "#10b981" : "#ef4444" }}
              >
                {metric.delta} vs before
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools used */}
        <motion.div
          className="glass rounded-xl p-6 border border-white/5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          <div className="font-mono text-xs text-white/40 mb-4 tracking-wider">
            PIPELINE TOOLS
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "GitHub Actions",
              "ArgoCD",
              "Snyk",
              "Trivy",
              "Cosign",
              "HashiCorp Vault",
              "Helm",
              "OPA Gatekeeper",
              "Argo Rollouts",
              "Slack",
              "PagerDuty",
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded-lg font-mono text-xs bg-white/5 text-white/60 border border-white/10 hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
