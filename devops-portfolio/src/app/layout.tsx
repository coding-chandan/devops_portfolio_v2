import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Alex Chen — Cloud & DevOps Engineer",
  description:
    "Senior Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, and CI/CD automation. Building scalable infrastructure for the future.",
  keywords: [
    "DevOps Engineer",
    "Cloud Engineer",
    "AWS",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "Platform Engineer",
    "SRE",
    "Infrastructure",
    "Docker",
    "GitHub Actions",
  ],
  authors: [{ name: "Alex Chen" }],
  creator: "Alex Chen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexchen.dev",
    title: "Alex Chen — Cloud & DevOps Engineer",
    description:
      "Senior Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, and CI/CD automation.",
    siteName: "Alex Chen Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alex Chen — Cloud & DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen — Cloud & DevOps Engineer",
    description: "Building scalable infrastructure for the future.",
    creator: "@alexchen_dev",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#020408",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <CustomCursor />
          <Navigation />
          <main className="relative">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(10,15,26,0.95)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "#e2e8f0",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
