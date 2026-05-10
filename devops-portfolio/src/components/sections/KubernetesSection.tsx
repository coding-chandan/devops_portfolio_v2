"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const clusterNodes = [
  { type: "Control Plane", count: 3, status: "healthy", color: "#00d4ff" },
  { type: "Worker Nodes", count: 12, status: "healthy", color: "#b347ff" },
  { type: "Pods Running", count: 847, status: "running", color: "#00ffff" },
  { type: "Namespaces", count: 18, status: "active", color: "#f59e0b" },
];

const k8sFeatures = [
  {
    title: "Multi-Cluster GitOps",
    desc: "ArgoCD managing 5 EKS clusters across regions with automated drift detection and self-healing",
    icon: "◎",
    color: "#00d4ff",
  },
  {
    title: "Service Mesh",
    desc: "Istio mTLS between all services, traffic management, and distributed tracing with Jaeger",
    icon: "🕸️",
    color: "#b347ff",
  },
  {
    title: "Progressive Delivery",
    desc: "Canary deployments with automated metric analysis using Argo Rollouts and Prometheus",
    icon: "🚀",
    color: "#00ffff",
  },
  {
    title: "Security Hardening",
    desc: "Pod security policies, network policies, OPA Gatekeeper admission controllers, and Falco runtime security",
    icon: "🔐",
    color: "#f59e0b",
  },
  {
    title: "Auto Scaling",
    desc: "HPA, VPA, and KEDA for custom metrics-based scaling — handling 10x traffic spikes automatically",
    icon: "📈",
    color: "#10b981",
  },
  {
    title: "Observability",
    desc: "Full-stack observability with Prometheus, Grafana, Loki, and Tempo — zero blind spots",
    icon: "👁️",
    color: "#7c3aed",
  },
];

export function KubernetesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="kubernetes"
      badge="// KUBERNETES"
      title="Container"
      titleHighlight="Orchestration"
      subtitle="Running production Kubernetes workloads at scale since 2019"
    >
      <div ref={ref} className="space-y-10">
        {/* Cluster status dashboard */}
        <motion.div
          className="glass rounded-2xl p-6 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <div className="font-mono text-xs text-white/40 mb-1">
                PRODUCTION CLUSTER — us-east-1
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-mono text-sm text-green-400">
                  ALL SYSTEMS OPERATIONAL
                </span>
              </div>
            </div>
            <div className="font-mono text-xs text-white/30">
              Kubernetes v1.29 · EKS Managed
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {clusterNodes.map((node, i) => (
              <motion.div
                key={node.type}
                className="rounded-xl p-4 text-center"
                style={{
                  background: `${node.color}08`,
                  border: `1px solid ${node.color}20`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <div
                  className="font-display text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    color: node.color,
                  }}
                >
                  {node.count}
                </div>
                <div className="font-mono text-xs text-white/50 mb-2">
                  {node.type}
                </div>
                <div
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                  style={{
                    background: `${node.color}15`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: node.color }}
                  />
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: node.color }}
                  >
                    {node.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {k8sFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass rounded-xl p-5 border border-white/5 card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{
                    background: `${feature.color}15`,
                    border: `1px solid ${feature.color}30`,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="font-display font-bold text-white text-sm"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {feature.title}
                </h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications bar */}
        <motion.div
          className="glass rounded-xl p-5 border border-[#326CE5]/20 flex flex-wrap gap-4 items-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <span className="font-mono text-xs text-white/40">CERTIFIED:</span>
          {["CKA", "CKAD", "CKS"].map((cert) => (
            <span
              key={cert}
              className="px-3 py-1.5 rounded-lg font-mono text-xs font-medium"
              style={{
                background: "rgba(50,108,229,0.15)",
                color: "#326CE5",
                border: "1px solid rgba(50,108,229,0.3)",
              }}
            >
              ⎈ {cert}
            </span>
          ))}
          <span className="font-mono text-xs text-white/30 ml-auto">
            5+ years production Kubernetes experience
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
