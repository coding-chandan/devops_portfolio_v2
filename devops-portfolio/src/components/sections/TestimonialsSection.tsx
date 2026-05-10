"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/data/portfolio";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="testimonials"
      badge="// TESTIMONIALS"
      title="What People"
      titleHighlight="Say"
      subtitle="From the engineers and leaders who've worked with me directly"
    >
      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {portfolioData.testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="glass rounded-2xl p-7 border border-white/5 card-hover flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15 }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, si) => (
                <Star key={si} size={14} className="text-[#f59e0b] fill-[#f59e0b]" />
              ))}
            </div>

            {/* Quote mark */}
            <div
              className="text-5xl font-display font-bold leading-none mb-2 opacity-30"
              style={{ color: t.color, fontFamily: "Syne, sans-serif" }}
            >
              "
            </div>

            {/* Content */}
            <p className="text-white/60 text-sm leading-relaxed flex-1 mb-6">
              {t.content}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm"
                style={{
                  background: `${t.color}20`,
                  border: `1px solid ${t.color}40`,
                  color: t.color,
                  fontFamily: "Syne, sans-serif",
                }}
              >
                {t.avatar}
              </div>
              <div>
                <div className="font-mono text-xs text-white font-medium">
                  {t.name}
                </div>
                <div className="font-mono text-[10px] text-white/40 mt-0.5">
                  {t.role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
