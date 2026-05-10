"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const bootLines = [
  "Initializing cloud systems...",
  "Loading Kubernetes clusters...",
  "Connecting to AWS us-east-1...",
  "Mounting Terraform state...",
  "Configuring ArgoCD pipelines...",
  "Starting observability stack...",
  "Systems operational.",
];

export function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(true);
  const [linesShown, setLinesShown] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;
        return Math.min(next, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const timer = setTimeout(() => {
        setLinesShown((prev) => [...prev, bootLines[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      }, 300 * (currentLine + 1));
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 600);
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#020408" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Center content */}
          <div className="relative z-10 w-full max-w-md px-8">
            {/* Logo / Name */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse" />
                <span className="font-mono text-[#00d4ff] text-sm tracking-[4px] uppercase">
                  System Boot
                </span>
                <div className="w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse" />
              </div>
              <h1
                className="font-display text-3xl font-bold aurora-text"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                ALEX.CHEN
              </h1>
              <p className="font-mono text-white/30 text-xs mt-1 tracking-widest">
                CLOUD & DEVOPS ENGINEER
              </p>
            </motion.div>

            {/* Terminal output */}
            <div className="terminal rounded-lg p-4 mb-6 h-40 overflow-hidden relative">
              <div className="absolute top-2 left-3 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="mt-4 space-y-1">
                {linesShown.map((line, i) => (
                  <motion.div
                    key={i}
                    className="font-mono text-xs flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-[#00d4ff]">›</span>
                    <span
                      className={
                        i === linesShown.length - 1 && i === bootLines.length - 1
                          ? "text-green-400"
                          : "text-white/60"
                      }
                    >
                      {line}
                    </span>
                    {i === linesShown.length - 1 && i < bootLines.length - 1 && (
                      <span className="typing-cursor" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-white/40">LOADING</span>
                <span className="text-[#00d4ff]">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full loading-bar rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="mt-8 flex justify-center gap-4">
              {["AWS", "K8S", "TF", "CD"].map((label, i) => (
                <motion.div
                  key={label}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: progress > i * 25 ? 1 : 0.2, scale: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.4 }}
                >
                  <span className="font-mono text-[10px] text-[#00d4ff]">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-white/20">
            v2.0.26
          </div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-white/20">
            SYS::BOOT
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/20">
            alexchen.dev
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#00d4ff]/40 animate-pulse">
            ● LIVE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
