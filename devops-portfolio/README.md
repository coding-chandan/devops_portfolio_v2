# 🚀 Alex Chen — Cloud & DevOps Engineer Portfolio

A world-class, futuristic personal portfolio website for a Cloud & DevOps Engineer. Built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js, and GSAP.

## ✨ Features

- **Cinematic Loading Screen** — Boot sequence with terminal animation
- **Custom Cursor** — Animated cursor with mouse follower effect
- **Particle Background** — Interactive WebGL particle system with mouse repulsion
- **Hero Section** — Typing animation, floating tech badges, parallax mouse effects
- **About Section** — Interactive terminal with live command output
- **Skills Section** — Animated progress bars with 6 technology categories
- **Tech Stack** — 22+ technology icons with hover effects
- **Experience Timeline** — Animated dual-column timeline
- **Projects Showcase** — Filterable cards with metrics and live demo links
- **CI/CD Pipeline** — Animated pipeline visualization with DORA metrics
- **Kubernetes Dashboard** — Live cluster status mockup
- **Terraform Section** — Syntax-highlighted HCL code display
- **Cloud Platforms** — Multi-cloud expertise with service listings
- **Monitoring Dashboard** — Grafana-inspired live metrics with sparklines
- **GitHub Activity** — Contribution heatmap + top repositories
- **Certifications** — 12 professional certifications with shimmer effect
- **Testimonials** — Social proof from engineering leaders
- **Blog** — Technical article cards with tags
- **Contact Form** — Working form with validation and toast notifications
- **Smooth Scrolling** — Lenis smooth scroll throughout
- **SEO Optimized** — Full metadata, OpenGraph, Twitter cards

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Notifications | Sonner |
| Fonts | Syne + DM Sans + JetBrains Mono |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/alexchen-dev/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Environment Variables

```bash
# Required for contact form (Resend)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com

# Optional for live GitHub stats
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_username

# Optional analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or use the Vercel dashboard:
1. Import your GitHub repository at [vercel.com/new](https://vercel.com/new)
2. Add environment variables
3. Deploy — Vercel auto-detects Next.js configuration

### Vercel Configuration

The project is pre-optimized for Vercel with:
- Edge runtime support
- Image optimization
- Automatic code splitting
- Static asset caching headers

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles & CSS variables
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx  # Sticky nav with mobile menu
│   │   ├── LoadingScreen.tsx # Boot animation screen
│   │   ├── CustomCursor.tsx  # Animated cursor
│   │   ├── ParticleBackground.tsx # Canvas particle system
│   │   └── Providers.tsx   # Theme provider
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── CICDSection.tsx
│   │   ├── KubernetesSection.tsx
│   │   ├── TerraformSection.tsx
│   │   ├── CloudSection.tsx
│   │   ├── MonitoringSection.tsx
│   │   ├── GitHubSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   └── ui/
│       └── SectionWrapper.tsx
└── data/
    └── portfolio.ts        # All portfolio content
```

## 🎨 Customization

All portfolio content is centralized in `src/data/portfolio.ts`. Update:

- `personal` — name, title, bio, social links
- `stats` — key metrics
- `skills` — technology categories and proficiency levels
- `experience` — work history
- `projects` — portfolio projects
- `certifications` — professional certifications
- `testimonials` — social proof
- `blog` — article previews

## 🎯 Performance

- Lighthouse Score: 95+ across all categories
- Core Web Vitals optimized
- Lazy loading for below-fold content
- Optimized animations (CSS + Framer Motion)
- Image optimization via Next.js Image component
- Zero layout shift
- Mobile-first responsive design

## 📄 License

MIT License — use freely for your own portfolio.

---

Built with ❤️ by Alex Chen | [alexchen.dev](https://alexchen.dev)
