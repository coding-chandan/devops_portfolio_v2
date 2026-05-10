"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const terraformCode = `# AWS EKS Cluster Module
module "eks_cluster" {
  source  = "git::github.com/alexchen/tf-modules//eks?ref=v3.2.0"
  
  cluster_name    = var.cluster_name
  cluster_version = "1.29"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  node_groups = {
    general = {
      instance_types = ["m6i.xlarge"]
      min_size       = 2
      max_size       = 20
      desired_size   = 4
    }
    spot = {
      instance_types = ["m6i.large", "m5.large"]
      capacity_type  = "SPOT"
      min_size       = 0
      max_size       = 50
    }
  }

  enable_irsa         = true
  enable_cluster_logs = ["api", "audit"]
  
  tags = local.common_tags
}`;

const moduleStats = [
  { label: "Modules Written", value: "100+", color: "#7B42BC" },
  { label: "AWS Accounts Managed", value: "20+", color: "#00d4ff" },
  { label: "Resources Provisioned", value: "5000+", color: "#b347ff" },
  { label: "State Files", value: "150+", color: "#00ffff" },
];

export function TerraformSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="terraform"
      badge="// INFRASTRUCTURE AS CODE"
      title="Terraform"
      titleHighlight="at Scale"
      subtitle="100+ reusable modules, multi-account AWS strategy, zero manual provisioning"
    >
      <div ref={ref} className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Code display */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="terminal rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-xs text-white/30">
                eks-cluster/main.tf
              </span>
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{
                  background: "rgba(123,66,188,0.2)",
                  color: "#7B42BC",
                }}
              >
                HCL
              </span>
            </div>
            <div className="p-5 overflow-auto">
              <pre className="font-mono text-xs leading-relaxed">
                {terraformCode.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 text-right text-white/20 mr-4 flex-shrink-0 select-none">
                      {i + 1}
                    </span>
                    <span
                      className={
                        line.includes("#")
                          ? "text-white/30"
                          : line.includes("module") || line.includes("resource")
                          ? "text-[#7B42BC]"
                          : line.includes("=")
                          ? "text-white/70"
                          : line.includes('"')
                          ? "text-[#00d4ff]"
                          : "text-white/50"
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </div>

          {/* Plan output */}
          <div className="terminal rounded-xl mt-4 p-4">
            <div className="font-mono text-xs space-y-1">
              <div className="text-white/40">$ terraform plan</div>
              <div className="text-green-400">
                + aws_eks_cluster.this (7 to add)
              </div>
              <div className="text-green-400">
                + aws_eks_node_group.general (3 to add)
              </div>
              <div className="text-green-400">
                + aws_iam_role.cluster (4 to add)
              </div>
              <div className="text-white/30 mt-2">
                Plan: 14 to add, 0 to change, 0 to destroy.
              </div>
              <div className="text-[#00d4ff] mt-1">
                ✓ No drift detected from desired state
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats + features */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {moduleStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass rounded-xl p-4 text-center border border-white/5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div
                  className="font-display text-2xl font-bold mb-1"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-white/40">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Capabilities */}
          <div className="space-y-4">
            {[
              {
                title: "Module Library",
                desc: "100+ battle-tested Terraform modules covering VPC, EKS, RDS, Lambda, and more — versioned and published to private registry",
                color: "#7B42BC",
              },
              {
                title: "Multi-Account Strategy",
                desc: "AWS Organizations with Control Tower, automated account vending machine, SCPs, and centralized logging",
                color: "#00d4ff",
              },
              {
                title: "Remote State Management",
                desc: "S3 + DynamoDB state locking with Terragrunt for DRY configurations across 20+ accounts",
                color: "#b347ff",
              },
              {
                title: "Policy as Code",
                desc: "OPA/Conftest policies enforced in CI to catch misconfigurations before apply — compliance guardrails built-in",
                color: "#00ffff",
              },
            ].map((cap, i) => (
              <motion.div
                key={cap.title}
                className="flex gap-4 p-4 glass rounded-xl border border-white/5 card-hover"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div
                  className="w-1 rounded-full flex-shrink-0"
                  style={{ background: cap.color }}
                />
                <div>
                  <div
                    className="font-mono text-xs font-medium mb-1"
                    style={{ color: cap.color }}
                  >
                    {cap.title}
                  </div>
                  <div className="text-white/50 text-sm leading-relaxed">
                    {cap.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
