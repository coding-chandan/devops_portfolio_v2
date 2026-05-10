export const portfolioData = {
  personal: {
    name: "Alex Chen",
    title: "Cloud & DevOps Engineer",
    tagline: "Building Scalable Infrastructure for the Future",
    bio: "I architect and automate cloud infrastructure at scale, transforming complex systems into elegant, reliable pipelines. With 6+ years of experience across AWS, GCP, and Azure, I specialize in Kubernetes orchestration, GitOps workflows, and zero-downtime deployments.",
    email: "alex@alexchen.dev",
    github: "https://github.com/alexchen-dev",
    linkedin: "https://linkedin.com/in/alexchen-devops",
    twitter: "https://twitter.com/alexchen_dev",
    location: "San Francisco, CA",
    available: true,
  },

  stats: [
    { value: 6, label: "Years Experience", suffix: "+" },
    { value: 50, label: "Projects Deployed", suffix: "+" },
    { value: 99.9, label: "Uptime Achieved", suffix: "%" },
    { value: 12, label: "Certifications", suffix: "" },
    { value: 80, label: "Cost Reduction", suffix: "%" },
    { value: 300, label: "Microservices Managed", suffix: "+" },
  ],

  skills: [
    {
      category: "Cloud Platforms",
      icon: "☁️",
      color: "#00d4ff",
      items: [
        { name: "AWS", level: 95 },
        { name: "GCP", level: 80 },
        { name: "Azure", level: 75 },
        { name: "Cloudflare", level: 85 },
      ],
    },
    {
      category: "Containers & Orchestration",
      icon: "🐳",
      color: "#b347ff",
      items: [
        { name: "Kubernetes", level: 90 },
        { name: "Docker", level: 95 },
        { name: "Helm", level: 88 },
        { name: "ArgoCD", level: 85 },
      ],
    },
    {
      category: "CI/CD",
      icon: "⚡",
      color: "#00ffff",
      items: [
        { name: "GitHub Actions", level: 95 },
        { name: "Jenkins", level: 85 },
        { name: "GitLab CI", level: 80 },
        { name: "CircleCI", level: 75 },
      ],
    },
    {
      category: "Infrastructure as Code",
      icon: "🏗️",
      color: "#7c3aed",
      items: [
        { name: "Terraform", level: 92 },
        { name: "Ansible", level: 85 },
        { name: "Pulumi", level: 70 },
        { name: "CloudFormation", level: 80 },
      ],
    },
    {
      category: "Monitoring & Observability",
      icon: "📊",
      color: "#f59e0b",
      items: [
        { name: "Prometheus", level: 90 },
        { name: "Grafana", level: 92 },
        { name: "ELK Stack", level: 85 },
        { name: "Datadog", level: 80 },
      ],
    },
    {
      category: "Scripting & Dev",
      icon: "💻",
      color: "#10b981",
      items: [
        { name: "Python", level: 85 },
        { name: "Bash/Shell", level: 90 },
        { name: "Go", level: 65 },
        { name: "TypeScript", level: 75 },
      ],
    },
  ],

  techStack: [
    { name: "AWS", category: "cloud", icon: "aws" },
    { name: "GCP", category: "cloud", icon: "gcp" },
    { name: "Azure", category: "cloud", icon: "azure" },
    { name: "Kubernetes", category: "containers", icon: "k8s" },
    { name: "Docker", category: "containers", icon: "docker" },
    { name: "Helm", category: "containers", icon: "helm" },
    { name: "ArgoCD", category: "gitops", icon: "argocd" },
    { name: "Terraform", category: "iac", icon: "terraform" },
    { name: "Ansible", category: "iac", icon: "ansible" },
    { name: "GitHub Actions", category: "cicd", icon: "github" },
    { name: "Jenkins", category: "cicd", icon: "jenkins" },
    { name: "Prometheus", category: "monitoring", icon: "prometheus" },
    { name: "Grafana", category: "monitoring", icon: "grafana" },
    { name: "ELK Stack", category: "monitoring", icon: "elastic" },
    { name: "Python", category: "scripting", icon: "python" },
    { name: "Bash", category: "scripting", icon: "bash" },
    { name: "Linux", category: "os", icon: "linux" },
    { name: "Nginx", category: "networking", icon: "nginx" },
    { name: "Vault", category: "security", icon: "vault" },
    { name: "Git", category: "vcs", icon: "git" },
  ],

  experience: [
    {
      company: "Nebula Systems",
      role: "Senior DevOps Engineer",
      period: "2022 — Present",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "Lead cloud infrastructure for a Series B startup serving 10M+ users. Architected multi-region EKS clusters, implemented GitOps with ArgoCD, and reduced infrastructure costs by 40%.",
      achievements: [
        "Reduced deployment time from 45 min to 3 min with optimized CI/CD pipelines",
        "Architected disaster recovery achieving RTO < 5 minutes",
        "Led migration of 200+ microservices from EC2 to EKS",
        "Implemented zero-trust security model across all environments",
      ],
      tech: ["AWS", "EKS", "Terraform", "ArgoCD", "Prometheus", "Python"],
      color: "#00d4ff",
    },
    {
      company: "CloudForge Inc.",
      role: "DevOps Engineer",
      period: "2020 — 2022",
      location: "Austin, TX",
      type: "Full-time",
      description:
        "Built and maintained cloud infrastructure for enterprise SaaS platform. Championed infrastructure-as-code adoption and automated security scanning in CI pipelines.",
      achievements: [
        "Implemented Terraform modules used across 15 product teams",
        "Reduced infrastructure provisioning time from weeks to hours",
        "Built centralized logging platform processing 1TB/day",
        "Achieved SOC 2 Type II compliance through automation",
      ],
      tech: ["AWS", "Terraform", "Jenkins", "Docker", "ELK", "Ansible"],
      color: "#b347ff",
    },
    {
      company: "DataStream Labs",
      role: "Cloud Infrastructure Engineer",
      period: "2018 — 2020",
      location: "Seattle, WA",
      type: "Full-time",
      description:
        "Managed multi-cloud infrastructure for a data analytics platform. Focused on cost optimization, auto-scaling strategies, and hybrid cloud connectivity.",
      achievements: [
        "Designed auto-scaling architecture handling 10x traffic spikes",
        "Reduced AWS monthly bill by $80K through Reserved Instances & Spot",
        "Migrated on-premise workloads to GCP with zero downtime",
        "Built custom monitoring dashboards for 50+ business KPIs",
      ],
      tech: ["GCP", "AWS", "Kubernetes", "Terraform", "Grafana", "Python"],
      color: "#00ffff",
    },
  ],

  projects: [
    {
      title: "Kubernetes Multi-Cluster Platform",
      description:
        "Production-grade multi-cluster Kubernetes platform with automated provisioning, GitOps workflows, and centralized observability across 5 AWS regions.",
      longDescription:
        "Designed and deployed a multi-cluster EKS platform serving 300+ microservices. Features automated cluster provisioning via Terraform, GitOps with ArgoCD, service mesh with Istio, and comprehensive observability with Prometheus + Grafana.",
      tech: ["EKS", "Terraform", "ArgoCD", "Istio", "Prometheus", "Grafana"],
      github: "https://github.com/alexchen-dev/k8s-platform",
      demo: "#",
      image: "/projects/k8s-platform.png",
      metrics: { uptime: "99.99%", services: "300+", regions: "5" },
      category: "kubernetes",
      featured: true,
      color: "#00d4ff",
    },
    {
      title: "Zero-Trust CI/CD Pipeline",
      description:
        "Enterprise CI/CD system with SAST/DAST scanning, container signing, secret management, and automated compliance checks — all in under 4 minutes.",
      longDescription:
        "Built a security-first CI/CD pipeline with GitHub Actions, integrating Snyk for dependency scanning, Trivy for container scanning, Cosign for image signing, and HashiCorp Vault for secrets.",
      tech: ["GitHub Actions", "Snyk", "Trivy", "Cosign", "Vault", "OPA"],
      github: "https://github.com/alexchen-dev/secure-cicd",
      demo: "#",
      image: "/projects/cicd.png",
      metrics: { buildTime: "3.8 min", coverage: "98%", vulnerabilities: "0" },
      category: "cicd",
      featured: true,
      color: "#b347ff",
    },
    {
      title: "Terraform AWS Landing Zone",
      description:
        "Production-ready AWS Landing Zone with 100+ Terraform modules, multi-account strategy, and automated compliance guardrails.",
      longDescription:
        "Complete AWS Organization setup with Control Tower, automated account vending machine, Service Control Policies, and reusable Terraform modules for VPC, ECS, RDS, and more.",
      tech: ["Terraform", "AWS Organizations", "Control Tower", "Python", "SCP"],
      github: "https://github.com/alexchen-dev/aws-landing-zone",
      demo: "#",
      image: "/projects/terraform.png",
      metrics: { modules: "100+", accounts: "20+", compliance: "100%" },
      category: "iac",
      featured: true,
      color: "#00ffff",
    },
    {
      title: "Observability Stack",
      description:
        "Full observability platform with Prometheus, Grafana, Loki, and Tempo — deployed on Kubernetes with automated alerting and incident response.",
      longDescription:
        "Implemented the LGTM stack (Loki, Grafana, Tempo, Mimir) on EKS with 200+ custom dashboards, PagerDuty integration, and automated runbook execution via Rundeck.",
      tech: ["Prometheus", "Grafana", "Loki", "Tempo", "PagerDuty", "Kubernetes"],
      github: "https://github.com/alexchen-dev/observability-stack",
      demo: "#",
      image: "/projects/monitoring.png",
      metrics: { dashboards: "200+", metrics: "10K+", alertRules: "150+" },
      category: "monitoring",
      featured: false,
      color: "#f59e0b",
    },
    {
      title: "GitOps Platform with ArgoCD",
      description:
        "Self-service GitOps platform enabling 50+ developers to deploy independently with full audit trail, rollback capability, and progressive delivery.",
      longDescription:
        "Built a developer-self-service platform using ArgoCD ApplicationSets, enabling teams to deploy with PR-based workflows, automated canary analysis with Argo Rollouts, and Slack notifications.",
      tech: ["ArgoCD", "Argo Rollouts", "Helm", "GitHub Actions", "Slack API"],
      github: "https://github.com/alexchen-dev/gitops-platform",
      demo: "#",
      image: "/projects/gitops.png",
      metrics: { developers: "50+", deployments: "500/day", rollbackTime: "30s" },
      category: "gitops",
      featured: false,
      color: "#10b981",
    },
    {
      title: "Serverless Data Pipeline",
      description:
        "Event-driven serverless data pipeline on AWS processing 100M+ events/day with Lambda, Kinesis, and automated ETL workflows.",
      longDescription:
        "Designed a cost-optimized serverless pipeline using Lambda, Kinesis Data Streams, S3, and Glue for processing and transforming IoT data at scale.",
      tech: ["Lambda", "Kinesis", "S3", "Glue", "Athena", "CDK"],
      github: "https://github.com/alexchen-dev/serverless-pipeline",
      demo: "#",
      image: "/projects/serverless.png",
      metrics: { events: "100M+/day", cost: "$0.02/M events", latency: "<100ms" },
      category: "aws",
      featured: false,
      color: "#7c3aed",
    },
  ],

  certifications: [
    {
      name: "AWS Solutions Architect Professional",
      issuer: "Amazon Web Services",
      date: "2024",
      icon: "aws",
      color: "#FF9900",
      verified: true,
    },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "CNCF",
      date: "2023",
      icon: "k8s",
      color: "#326CE5",
      verified: true,
    },
    {
      name: "HashiCorp Terraform Associate",
      issuer: "HashiCorp",
      date: "2023",
      icon: "terraform",
      color: "#7B42BC",
      verified: true,
    },
    {
      name: "Google Cloud Professional DevOps",
      issuer: "Google Cloud",
      date: "2022",
      icon: "gcp",
      color: "#4285F4",
      verified: true,
    },
    {
      name: "AWS DevOps Engineer Professional",
      issuer: "Amazon Web Services",
      date: "2022",
      icon: "aws",
      color: "#FF9900",
      verified: true,
    },
    {
      name: "Certified Kubernetes Security Specialist",
      issuer: "CNCF",
      date: "2024",
      icon: "k8s",
      color: "#326CE5",
      verified: true,
    },
  ],

  testimonials: [
    {
      name: "Sarah Mitchell",
      role: "CTO at Nebula Systems",
      avatar: "SM",
      content:
        "Alex transformed our infrastructure from a fragile monolith to a resilient, auto-scaling platform. The Kubernetes migration was executed flawlessly — zero downtime, zero drama. Our deployment frequency went from weekly to multiple times per day.",
      rating: 5,
      color: "#00d4ff",
    },
    {
      name: "David Park",
      role: "VP Engineering at CloudForge",
      avatar: "DP",
      content:
        "Exceptional engineer with a rare combination of deep technical skills and business acumen. Alex's Terraform modules became the foundation for our entire platform team. He doesn't just solve problems — he eliminates entire categories of problems.",
      rating: 5,
      color: "#b347ff",
    },
    {
      name: "Priya Sharma",
      role: "Engineering Manager at DataStream",
      avatar: "PS",
      content:
        "Working with Alex on our GCP migration was a masterclass in cloud architecture. He anticipated every edge case, automated everything automatable, and delivered under budget. The cost savings alone paid for 3 years of his salary.",
      rating: 5,
      color: "#00ffff",
    },
  ],

  blog: [
    {
      title: "Zero-Downtime Kubernetes Migrations at Scale",
      excerpt:
        "How we migrated 200+ microservices to EKS without a single minute of downtime, using progressive delivery and automated rollback strategies.",
      date: "Jan 15, 2026",
      readTime: "12 min",
      tags: ["Kubernetes", "Migration", "EKS"],
      color: "#00d4ff",
      slug: "zero-downtime-k8s-migration",
    },
    {
      title: "Building a GitOps Platform That Developers Actually Love",
      excerpt:
        "The principles and patterns behind a self-service deployment platform that reduced deploy times by 90% while improving security posture.",
      date: "Dec 28, 2025",
      readTime: "8 min",
      tags: ["GitOps", "ArgoCD", "Developer Experience"],
      color: "#b347ff",
      slug: "gitops-platform-devex",
    },
    {
      title: "Terraform at Scale: Managing 100+ Modules Across 20 AWS Accounts",
      excerpt:
        "Lessons learned from building and maintaining a large-scale Terraform codebase, including module versioning, state management, and CI/CD integration.",
      date: "Dec 10, 2025",
      readTime: "15 min",
      tags: ["Terraform", "AWS", "IaC"],
      color: "#00ffff",
      slug: "terraform-at-scale",
    },
  ],
};
