"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
}

export function SectionWrapper({
  children,
  id,
  className = "",
  badge,
  title,
  titleHighlight,
  subtitle,
}: SectionWrapperProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id={id} className={`relative py-24 lg:py-32 ${className}`} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {(badge || title || subtitle) && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {badge && (
              <div className="inline-block badge-glow mb-4">{badge}</div>
            )}
            {title && (
              <h2
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {title}
                {titleHighlight && (
                  <>
                    {" "}
                    <span className="aurora-text">{titleHighlight}</span>
                  </>
                )}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-2xl mx-auto text-white/50 text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
