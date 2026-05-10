"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/data/portfolio";

export function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="skills"
      badge="// SKILLS"
      title="Technical"
      titleHighlight="Expertise"
      subtitle="6+ years of hands-on experience across the entire cloud-native stack"
    >
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.skills.map((category, ci) => (
          <motion.div
            key={category.category}
            className="glass rounded-2xl p-6 border border-white/5 card-hover"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: ci * 0.1, duration: 0.6 }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: `${category.color}15`,
                  border: `1px solid ${category.color}30`,
                }}
              >
                {category.icon}
              </div>
              <div>
                <h3
                  className="font-display font-bold text-white text-sm"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {category.category}
                </h3>
                <div className="font-mono text-[10px] text-white/30 mt-0.5">
                  {category.items.length} technologies
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              {category.items.map((skill, si) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono text-xs text-white/70">
                      {skill.name}
                    </span>
                    <span
                      className="font-mono text-xs"
                      style={{ color: category.color }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full skill-bar"
                      style={{
                        background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{
                        delay: 0.3 + ci * 0.1 + si * 0.05,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
