"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/data/portfolio";
import { MapPin, Calendar, CheckCircle } from "lucide-react";

export function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="experience"
      badge="// EXPERIENCE"
      title="Work"
      titleHighlight="Timeline"
      subtitle="Building production infrastructure across startups and enterprises"
    >
      <div ref={ref} className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px">
          <motion.div
            className="timeline-line w-full h-full"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        <div className="space-y-12">
          {portfolioData.experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              className={`relative flex gap-8 lg:gap-0 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2 }}
            >
              {/* Timeline node */}
              <div className="absolute left-4 lg:left-1/2 top-8 w-4 h-4 rounded-full border-2 -translate-x-1/2 z-10"
                style={{
                  borderColor: exp.color,
                  background: exp.color,
                  boxShadow: `0 0 12px ${exp.color}60`,
                }}
              />

              {/* Card */}
              <div className={`ml-12 lg:ml-0 lg:w-[calc(50%-2rem)] ${i % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}>
                <div
                  className="glass rounded-2xl p-6 border card-hover"
                  style={{ borderColor: `${exp.color}20` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
                    <div>
                      <h3
                        className="font-display text-lg font-bold text-white"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {exp.role}
                      </h3>
                      <div
                        className="font-mono text-sm mt-1"
                        style={{ color: exp.color }}
                      >
                        {exp.company}
                      </div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full font-mono text-[11px]"
                      style={{
                        background: `${exp.color}15`,
                        color: exp.color,
                        border: `1px solid ${exp.color}30`,
                      }}
                    >
                      {exp.type}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-white/30" />
                      <span className="font-mono text-xs text-white/40">
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-white/30" />
                      <span className="font-mono text-xs text-white/40">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, ai) => (
                      <div key={ai} className="flex items-start gap-2">
                        <CheckCircle
                          size={12}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: exp.color }}
                        />
                        <span className="text-xs text-white/50 leading-relaxed">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md font-mono text-[10px]"
                        style={{
                          background: `${exp.color}10`,
                          color: exp.color,
                          border: `1px solid ${exp.color}20`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for opposite side on desktop */}
              <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
