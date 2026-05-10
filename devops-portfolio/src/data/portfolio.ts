export const portfolioData = {
  personal: {
    name: "Chandan Maheshwari",
    title: "Cloud & DevOps Engineer",
    tagline: "Building Scalable Infrastructure for the Future in DevOps",
    bio: "I architect and automate cloud infrastructure at scale, transforming complex systems into elegant, reliable pipelines. With 1+ years of hands-on experience across AWS, GCP, and Azure, I specialize in Kubernetes orchestration, GitOps workflows, and zero-downtime deployments.",
    email: "chandan@cloud.dev",
    github: "https://github.com/coding-chandan",
    linkedin: "https://www.linkedin.com/in/chandan-maheshwari-8103472a4",
    twitter: "https://twitter.com/",
    location: "Ahmedabad, India",
    available: true,
  },

  stats: [
    { value: 1.4, label: "Years Experience", suffix: "+" },
    { value: 8, label: "Projects Deployed", suffix: "+" },
    { value: 99.9, label: "Uptime Achieved", suffix: "%" },
    { value: 3, label: "Certifications", suffix: "" },
    { value: 80, label: "Cost Reduction", suffix: "%" },
    { value: 300, label: "Microservices", suffix: "+" },
  ],

  skills: [
    {
      category: "Cloud Platforms",
      icon: "☁️",
      color: "#00d4ff",
      items: [
        { name: "AWS", level: 95 },
        { name: "GCP", level: 50 },
        { name: "Azure", level: 60 },
      ],
    },
    {
      category: "Containers & Orchestration",
      icon: "🐳",
      color: "#b347ff",
      items: [
        { name: "Kubernetes", level: 80 },
        { name: "Docker", level: 95 },
        { name: "Podman", level: 95 },
        { name: "AWS EKS", level: 80 },
        { name: "AWS ECS & ECR", level: 80 },
        { name: "Helm", level: 88 },
        { name: "ArgoCD", level: 85 },
      ],
    },
    {
      category: "CI/CD",
      icon: "⚡",
      color: "#00ffff",
      items: [
        { name: "GitLab CI/CD", level: 95 },
        { name: "Jenkins", level: 85 },
        { name: "Github Actions", level: 80 },
        { name: "CircleCI", level: 75 },
      ],
    },
    {
      category: "Infrastructure as Code",
      icon: "🏗️",
      color: "#7c3aed",
      items: [
        { name: "Terraform", level: 95 },
        { name: "Ansible", level: 60 },
        { name: "CloudFormation", level: 80 },
      ],
    },
    {
      category: "Monitoring & Observability",
      icon: "📊",
      color: "#f59e0b",
      items: [
        { name: "Prometheus", level: 92 },
        { name: "Grafana", level: 92 },
        { name: "Alert Manager", level: 85 },
        { name: "LOKI", level: 50 },
      ],
    },
    {
      category: "Scripting & Dev",
      icon: "💻",
      color: "#10b981",
      items: [
        { name: "Bash/Shell", level: 90 },
        { name: "YAML", level: 90 },
        { name: "IAC HCL", level: 85 },
        { name: "Python", level: 79 },
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
      company: "Embrill",
      role: "Cloud Engineer",
      period: "2025 — Present",
      location: "Ahmedabad, India",
      type: "Full-time",
      description:
        "Working on cloud infrastructure and DevOps automation. Architecting scalable solutions on AWS, implementing CI/CD pipelines, and managing containerized workloads with Kubernetes.",
      achievements: [
        "Reduced deployment time significantly with optimized CI/CD pipelines",
        "Architected disaster recovery strategies for high availability",
        "Managed containerized microservices with EKS and Docker",
        "Implemented infrastructure as code using Terraform",
      ],
      tech: ["AWS", "EKS", "Terraform", "ArgoCD", "Prometheus", "Python"],
      color: "#00d4ff",
    },
  ],

  projects: [
    {
      title: "Kubernetes Multi-Cluster Platform",
      description:
        "Production-grade multi-cluster Kubernetes platform with automated provisioning, GitOps workflows, and centralized observability across AWS regions.",
      longDescription:
        "Designed and deployed a multi-cluster EKS platform serving multiple microservices. Features automated cluster provisioning via Terraform, GitOps with ArgoCD, and comprehensive observability with Prometheus + Grafana.",
      tech: ["EKS", "Terraform", "ArgoCD", "Istio", "Prometheus", "Grafana"],
      github: "https://github.com/coding-chandan/k8s-platform",
      demo: "#",
      image: "/projects/k8s-platform.png",
      metrics: { uptime: "99.99%", services: "50+", regions: "2" },
      category: "kubernetes",
      featured: true,
      color: "#00d4ff",
    },
    {
      title: "Zero-Trust CI/CD Pipeline",
      description:
        "Enterprise CI/CD system with SAST/DAST scanning, container signing, secret management, and automated compliance checks.",
      longDescription:
        "Built a security-first CI/CD pipeline with GitLab CI, integrating Trivy for container scanning, and HashiCorp Vault for secrets management.",
      tech: ["GitLab CI", "Trivy", "Vault", "Docker", "OPA"],
      github: "https://github.com/coding-chandan/secure-cicd",
      demo: "#",
      image: "/projects/cicd.png",
      metrics: { buildTime: "5 min", coverage: "95%", vulnerabilities: "0" },
      category: "cicd",
      featured: true,
      color: "#b347ff",
    },
    {
      title: "Terraform AWS Infrastructure",
      description:
        "Production-ready AWS infrastructure with Terraform modules, multi-environment strategy, and automated compliance guardrails.",
      longDescription:
        "Complete AWS infrastructure setup with reusable Terraform modules for VPC, ECS, RDS, and more. Automated provisioning across dev, staging, and production environments.",
      tech: ["Terraform", "AWS", "CloudFormation", "Python"],
      github: "https://github.com/coding-chandan/aws-infrastructure",
      demo: "#",
      image: "/projects/terraform.png",
      metrics: { modules: "20+", environments: "3", compliance: "100%" },
      category: "iac",
      featured: true,
      color: "#00ffff",
    },
    {
      title: "Observability Stack",
      description:
        "Full observability platform with Prometheus, Grafana, Loki, and AlertManager — deployed on Kubernetes with automated alerting.",
      longDescription:
        "Implemented the Prometheus + Grafana + Loki stack on Kubernetes with custom dashboards, AlertManager integration, and automated runbooks.",
      tech: ["Prometheus", "Grafana", "Loki", "AlertManager", "Kubernetes"],
      github: "https://github.com/coding-chandan/observability-stack",
      demo: "#",
      image: "/projects/monitoring.png",
      metrics: { dashboards: "30+", metrics: "500+", alertRules: "50+" },
      category: "monitoring",
      featured: false,
      color: "#f59e0b",
    },
    {
      title: "GitOps Platform with ArgoCD",
      description:
        "Self-service GitOps platform enabling developers to deploy independently with full audit trail, rollback capability, and progressive delivery.",
      longDescription:
        "Built a developer-self-service platform using ArgoCD ApplicationSets, enabling teams to deploy with PR-based workflows and automated canary analysis with Argo Rollouts.",
      tech: ["ArgoCD", "Argo Rollouts", "Helm", "GitLab CI", "Slack API"],
      github: "https://github.com/coding-chandan/gitops-platform",
      demo: "#",
      image: "/projects/gitops.png",
      metrics: { developers: "10+", deployments: "50/day", rollbackTime: "30s" },
      category: "gitops",
      featured: false,
      color: "#10b981",
    },
    {
      title: "Serverless Data Pipeline",
      description:
        "Event-driven serverless data pipeline on AWS processing high-volume events with Lambda, Kinesis, and automated ETL workflows.",
      longDescription:
        "Designed a cost-optimized serverless pipeline using Lambda, Kinesis Data Streams, S3, and Glue for processing and transforming data at scale.",
      tech: ["Lambda", "Kinesis", "S3", "Glue", "Athena", "CDK"],
      github: "https://github.com/coding-chandan/serverless-pipeline",
      demo: "#",
      image: "/projects/serverless.png",
      metrics: { events: "1M+/day", cost: "$0.05/M events", latency: "<200ms" },
      category: "aws",
      featured: false,
      color: "#7c3aed",
    },
  ],

  certifications: [
    {
      name: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      date: "2024",
      icon: "aws",
      color: "#FF9900",
      verified: true,
    },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "CNCF",
      date: "2024",
      icon: "k8s",
      color: "#326CE5",
      verified: true,
    },
    {
      name: "HashiCorp Terraform Associate",
      issuer: "HashiCorp",
      date: "2024",
      icon: "terraform",
      color: "#7B42BC",
      verified: true,
    },
  ],

  testimonials: [
    {
      name: "Sarah Mitchell",
      role: "CTO at Embrill",
      avatar: "SM",
      content:
        "Chandan transformed our infrastructure from a fragile setup to a resilient, auto-scaling platform. The Kubernetes migration was executed flawlessly — zero downtime, zero drama. Our deployment frequency improved dramatically.",
      rating: 5,
      color: "#00d4ff",
    },
    {
      name: "David Park",
      role: "Engineering Lead",
      avatar: "DP",
      content:
        "Exceptional engineer with a rare combination of deep technical skills and problem-solving ability. Chandan's Terraform modules became the foundation for our entire infrastructure. He doesn't just solve problems — he eliminates entire categories of problems.",
      rating: 5,
      color: "#b347ff",
    },
    {
      name: "Priya Sharma",
      role: "Senior DevOps Engineer",
      avatar: "PS",
      content:
        "Working with Chandan on our cloud migration was a masterclass in infrastructure design. He anticipated every edge case, automated everything automatable, and delivered on time. A true DevOps professional.",
      rating: 5,
      color: "#00ffff",
    },
  ],

  blog: [
    {
      title: "Zero-Downtime Kubernetes Migrations at Scale",
      excerpt:
        "How to migrate microservices to EKS without a single minute of downtime, using progressive delivery and automated rollback strategies.",
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
      title: "Terraform at Scale: Managing Infrastructure Across Multiple Environments",
      excerpt:
        "Lessons learned from building and maintaining a Terraform codebase, including module versioning, state management, and CI/CD integration.",
      date: "Dec 10, 2025",
      readTime: "10 min",
      tags: ["Terraform", "AWS", "IaC"],
      color: "#00ffff",
      slug: "terraform-at-scale",
    },
  ],
};
