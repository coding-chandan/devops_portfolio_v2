"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useState, useEffect } from "react";

// Fake sparkline data generator
function generateSparkline(points: number, base: number, variance: number) {
  return Array.from({ length: points }, () =>
    Math.max(0, base + (Math.random() - 0.5) * variance * 2)
  );
}

const metrics = [
  { label: "CPU Usage", value: "34%", trend: "+2%", color: "#00d4ff", data: generateSparkline(20, 34, 15) },
  { label: "Memory", value: "68%", trend: "-1%", color: "#b347ff", data: generateSparkline(20, 68, 10) },
  { label: "Request Rate", value: "12.4k/s", trend: "+8%", color: "#00ffff", data: generateSparkline(20, 70, 25) },
  { label: "Error Rate", value: "0.02%", trend: "-0.01%", color: "#10b981", data: generateSparkline(20, 10, 5) },
  { label: "P99 Latency", value: "48ms", trend: "-12ms", color: "#f59e0b", data: generateSparkline(20, 48, 20) },
  { label: "Active Pods", value: "847", trend: "+23", color: "#7c3aed", data: generateSparkline(20, 80, 10) },
];

const alerts = [
  { type: "info", message: "Deployment nebula-api:v2.4.1 completed successfully", time: "2m ago", color: "#00d4ff" },
  { type: "warning", message: "Memory usage on node-3 approaching 85% threshold", time: "8m ago", color: "#f59e0b" },
  { type: "success", message: "Auto-scaling triggered: +2 nodes added to worker pool", time: "15m ago", color: "#10b981" },
  { type: "info", message: "Certificate renewal completed for *.nebula.io", time: "1h ago", color: "#00d4ff" },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 30;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MonitoringSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [tick, setTick] = useState(0);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper
      id="monitoring"
      badge="// MONITORING & OBSERVABILITY"
      title="Full-Stack"
      titleHighlight="Observability"
      subtitle="Zero blind spots — metrics, logs, traces, and alerts for every service"
    >
      <div ref={ref} className="space-y-6">
        {/* Dashboard header */}
        <motion.div
          className="glass rounded-2xl p-5 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F46800]/20 border border-[#F46800]/30 flex items-center justify-center text-sm">
                📊
              </div>
              <div>
                <div className="font-mono text-sm text-white">Production Overview</div>
                <div className="font-mono text-[10px] text-white/30">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-green-400">LIVE</span>
              </div>
              <span className="font-mono text-xs text-white/30 px-3 py-1 glass rounded-lg border border-white/5">
                Last 1h
              </span>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="rounded-xl p-3 text-center"
                style={{
                  background: `${metric.color}08`,
                  border: `1px solid ${metric.color}20`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <div className="font-mono text-[10px] text-white/40 mb-2">
                  {metric.label}
                </div>
                <div
                  className="font-display text-lg font-bold mb-1"
                  style={{ fontFamily: "Syne, sans-serif", color: metric.color }}
                >
                  {metric.value}
                </div>
                <div className="flex justify-center mb-2">
                  <MiniSparkline data={metric.data} color={metric.color} />
                </div>
                <div
                  className="font-mono text-[10px]"
                  style={{ color: metric.trend.startsWith("-") && metric.label !== "Error Rate" && metric.label !== "P99 Latency" ? "#ef4444" : "#10b981" }}
                >
                  {metric.trend}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alert feed + Stack info */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Alert feed */}
          <motion.div
            className="glass rounded-2xl p-5 border border-white/5"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="font-mono text-xs text-white/40 mb-4 tracking-wider">
              ALERT FEED
            </div>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: `${alert.color}08`, border: `1px solid ${alert.color}15` }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: alert.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-white/60 leading-relaxed">
                      {alert.message}
                    </p>
                    <span className="font-mono text-[10px] text-white/30 mt-1 block">
                      {alert.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Observability stack */}
          <motion.div
            className="glass rounded-2xl p-5 border border-white/5"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="font-mono text-xs text-white/40 mb-4 tracking-wider">
              OBSERVABILITY STACK (LGTM)
            </div>
            <div className="space-y-4">
              {[
                { name: "Loki", role: "Log Aggregation", emoji: "📋", color: "#F46800", desc: "10TB+ logs/month, 30-day retention, LogQL queries" },
                { name: "Grafana", role: "Visualization", emoji: "📊", color: "#F46800", desc: "200+ dashboards, custom alerts, on-call integration" },
                { name: "Tempo", role: "Distributed Tracing", emoji: "🔍", color: "#F46800", desc: "Full trace context across 300+ microservices" },
                { name: "Mimir", role: "Long-term Metrics", emoji: "📈", color: "#F46800", desc: "10M+ active series, 1-year retention, global view" },
              ].map((tool, i) => (
                <motion.div
                  key={tool.name}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#F46800]/15 border border-[#F46800]/30 flex items-center justify-center text-base flex-shrink-0">
                    {tool.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-medium text-white">{tool.name}</span>
                      <span className="font-mono text-[10px] text-[#F46800]">{tool.role}</span>
                    </div>
                    <p className="font-mono text-[10px] text-white/40 mt-0.5 truncate">{tool.desc}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
