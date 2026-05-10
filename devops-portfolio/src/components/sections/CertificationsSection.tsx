"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/data/portfolio";
import { ShieldCheck } from "lucide-react";

const emojiMap: Record<string, string> = {
  aws: "☁️",
  k8s: "⎈",
  terraform: "◈",
  gcp: "🌐",
  azure: "🔷",
};

export function CertificationsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="certifications"
      badge="// CERTIFICATIONS"
      title="Professional"
      titleHighlight="Credentials"
      subtitle="12 industry certifications validating expertise across cloud platforms and DevOps tooling"
    >
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {portfolioData.certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            className="glass rounded-2xl p-6 border cert-shimmer relative overflow-hidden card-hover"
            style={{ borderColor: `${cert.color}20` }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            {/* Background accent */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-5"
              style={{ background: cert.color }}
            />

            <div className="relative z-10">
              {/* Icon + verified */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}30`,
                  }}
                >
                  {emojiMap[cert.icon] || "🏆"}
                </div>
                {cert.verified && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                    <ShieldCheck size={10} className="text-green-400" />
                    <span className="font-mono text-[10px] text-green-400">
                      VERIFIED
                    </span>
                  </div>
                )}
              </div>

              {/* Name */}
              <h3
                className="font-display font-bold text-white text-base leading-tight mb-2"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {cert.name}
              </h3>

              {/* Issuer + date */}
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs"
                  style={{ color: cert.color }}
                >
                  {cert.issuer}
                </span>
                <span className="font-mono text-xs text-white/30">
                  {cert.date}
                </span>
              </div>

              {/* Bottom accent bar */}
              <div
                className="mt-4 h-0.5 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${cert.color}60, transparent)`,
                }}
              />
            </div>
          </motion.div>
        ))}

        {/* "More" card */}
        <motion.div
          className="glass rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center card-hover"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="text-4xl mb-3">🎯</div>
          <div
            className="font-display font-bold text-white text-xl mb-1"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            +6 More
          </div>
          <p className="font-mono text-xs text-white/40">
            Additional certifications in security, networking, and cloud-native
            technologies
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
