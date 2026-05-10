"use client";

import { useEffect } from "react";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ParticleBackground } from "@/components/layout/ParticleBackground";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CICDSection } from "@/components/sections/CICDSection";
import { KubernetesSection } from "@/components/sections/KubernetesSection";
import { TerraformSection } from "@/components/sections/TerraformSection";
import { MonitoringSection } from "@/components/sections/MonitoringSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { CloudSection } from "@/components/sections/CloudSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize smooth scroll with Lenis
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    initLenis();
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div
        className={`transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <ParticleBackground />
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
        <CICDSection />
        <KubernetesSection />
        <TerraformSection />
        <CloudSection />
        <MonitoringSection />
        <GitHubSection />
        <CertificationsSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </div>
    </>
  );
}
