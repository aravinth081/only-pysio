import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "@/styles/globals.css";
import { siteContent } from "@/data/content";
import { generateMedicalBusinessSchema } from "@/lib/seo";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingActions from "@/components/layout/FloatingActions";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onlyphysio.com"),
  title: "Only Physio",
  description: siteContent.brand.description,
  keywords: [
    "Physiotherapy at home",
    "Homecare physiotherapist",
    "OnlyPhysio",
    "Only Physio",
    "Sports injury recovery",
    "Post-surgery rehab",
    "Total knee replacement physiotherapy",
    "Stroke rehabilitation Chennai",
    "Physiotherapy equipment rental",
    "Elderly mobility physio",
  ],
  authors: [{ name: "OnlyPhysio Clinical Team" }],
  creator: "Only Physio",
  publisher: "Only Physio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/logo.jpg", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://onlyphysio.com",
    title: "Only Physio",
    description: siteContent.brand.description,
    siteName: "Only Physio",
    images: [
      {
        url: "/images/hero-physio.jpg",
        width: 1200,
        height: 630,
        alt: "Only Physio - Expert Homecare Physiotherapist Consultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Only Physio",
    description: siteContent.brand.description,
    images: ["/images/hero-physio.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#14532D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateMedicalBusinessSchema();

  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        {/* Preload critical Above-The-Fold Assets for Instantaneous Zero-Lag Image Loading */}
        <link rel="preload" as="image" href="/images/hero-physio-team-mobile.webp" media="(max-width: 639px)" fetchPriority="high" type="image/webp" />
        <link rel="preload" as="image" href="/images/hero-physio-team-full-hd.webp" media="(min-width: 640px)" fetchPriority="high" type="image/webp" />
        <link rel="preload" as="image" href="/images/about/clinic-treatment-banner.webp" type="image/webp" />
        <link rel="preload" as="image" href="/images/logo.jpg" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 min-h-screen relative selection:bg-emerald-100 selection:text-emerald-900">
        <SmoothScrollProvider>
          {/* Reading & Section Navigation Scroll Progress */}
          <ScrollProgress />

          {/* WhatsApp Floating CTA & Mobile Sticky Call Bar */}
          <FloatingActions />

          {/* Main App Content */}
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
