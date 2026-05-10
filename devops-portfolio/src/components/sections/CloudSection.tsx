"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const cloudPlatforms = [
  {
    name: "Amazon Web Services",
    short: "AWS",
    emoji: "☁️",
    color: "#FF9900",
    level: 95,
    years: "5+ years",
    services: ["EKS", "ECS", "Lambda", "RDS", "CloudFront", "Route53", "VPC", "IAM", "S3", "SQS", "SNS", "Kinesis", "Glue", "Athena", "SageMaker"],
    certs: ["Solutions Architect Pro", "DevOps Engineer Pro", "Security Specialty"],
  },
  {
    name: "Google Cloud Platform",
    short: "GCP",
    emoji: "🌐",
    color: "#4285F4",
    level: 80,
    years: "3+ years",
    services: ["GKE", "Cloud Run", "BigQuery", "Cloud SQL", "Pub/Sub", "Dataflow", "Vertex AI", "Cloud Build", "Artifact Registry"],
    certs: ["Professional DevOps Engineer", "Professional Cloud Architect"],
  },
  {
    name: "Microsoft Azure",
    short: "Azure",
    emoji: "🔷",
    color: "#0089D6",
    level: 75,
    years: "2+ years",
    services: ["AKS", "Azure Functions", "CosmosDB", "Azure DevOps", "Key Vault", "App Service", "Event Hub", "Azure AD"],
    certs: ["AZ-900", "AZ-204"],
  },
];

export function CloudSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="cloud"
      badge="// CLOUD PLATFORMS"
      title="Multi-Cloud"
      titleHighlight="Expertise"
      subtitle="Deep expertise across AWS, GCP, and Azure — designing for resilience and cost efficiency"
    >
      <div ref={ref} className="space-y-6">
        {cloudPlatforms.map((platform, i) => (
          <motion.div
            key={platform.name}
            className="glass rounded-2xl p-6 lg:p-8 border border-white/5 card-hover overflow-hidden relative"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none"
              style={{ background: platform.color }}
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-start gap-6">
                {/* Platform info */}
                <div className="flex items-center gap-4 min-w-48">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: `${platform.color}15`,
                      border: `1px solid ${platform.color}30`,
                    }}
                  >
                    {platform.emoji}
                  </div>
                  <div>
                    <h3
                      className="font-display font-bold text-white"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {platform.name}
                    </h3>
                    <div className="font-mono text-xs text-white/40 mt-0.5">
                      {platform.years}
                    </div>
                  </div>
                </div>

                {/* Proficiency bar */}
                <div className="flex-1 min-w-48">
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-xs text-white/40">Proficiency</span>
                    <span className="font-mono text-xs" style={{ color: platform.color }}>
                      {platform.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${platform.color}, ${platform.color}80)` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${platform.level}%` } : {}}
                      transition={{ delay: 0.3 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {platform.certs.map((cert) => (
                      <span
                        key={cert}
                        className="px-2 py-0.5 rounded font-mono text-[10px]"
                        style={{
                          background: `${platform.color}10`,
                          color: platform.color,
                          border: `1px solid ${platform.color}20`,
                        }}
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="w-full lg:w-auto">
                  <div className="font-mono text-[10px] text-white/30 mb-2 tracking-wider">
                    KEY SERVICES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {platform.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 rounded-md font-mono text-[10px] bg-white/5 text-white/50 border border-white/8 hover:border-white/20 transition-colors cursor-default"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
