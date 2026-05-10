"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/data/portfolio";
import { ArrowRight, Clock, Tag } from "lucide-react";

export function BlogSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper
      id="blog"
      badge="// BLOG"
      title="Technical"
      titleHighlight="Writing"
      subtitle="Deep dives into cloud architecture, DevOps practices, and lessons learned in production"
    >
      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {portfolioData.blog.map((post, i) => (
          <motion.a
            key={post.title}
            href={`/blog/${post.slug}`}
            className="glass rounded-2xl p-6 border border-white/5 card-hover flex flex-col group"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px]"
                  style={{
                    background: `${post.color}10`,
                    color: post.color,
                    border: `1px solid ${post.color}20`,
                  }}
                >
                  <Tag size={8} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3
              className="font-display font-bold text-white text-lg leading-snug mb-3 group-hover:text-[#00d4ff] transition-colors flex-1"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              {post.excerpt}
            </p>

            {/* Meta + CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-white/30">
                  {post.date}
                </span>
                <div className="flex items-center gap-1 text-white/30">
                  <Clock size={10} />
                  <span className="font-mono text-[10px]">{post.readTime}</span>
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-white/30 group-hover:text-[#00d4ff] group-hover:translate-x-1 transition-all"
              />
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <a
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-white/60 font-mono text-sm hover:text-white hover:border-white/30 transition-all group"
        >
          Read All Articles
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
