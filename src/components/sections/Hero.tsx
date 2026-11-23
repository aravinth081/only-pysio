"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { siteContent } from "@/data/content";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

export const Hero: React.FC = () => {
  const router = useRouter();
  const { scrollTo } = useSmoothScroll();
  const [headlineIndex, setHeadlineIndex] = useState(0);

  // Prefetch appointment booking and callback pages so clicks transition in 0ms
  useEffect(() => {
    router.prefetch("/callback");
    router.prefetch("/book");
  }, [router]);

  const handleBookClick = () => {
    scrollTo("#booking", { duration: 0.45, offset: -85 });
  };

  const handleCallbackClick = () => {
    router.push("/callback");
  };

  const headlineEndings = [
    "Pain Relief",
    "Restoring Strength",
    "Functional Mobility",
    "Everyday Freedom",
  ];

  // Rotate dynamic headline phrase gently every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlineEndings.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [headlineEndings.length]);

  return (
    <section id="hero" className="relative flex flex-col justify-between overflow-hidden">
      {/* 1. Main Hero Stage */}
      <div className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[94vh] pt-20 pb-8 sm:pt-28 sm:pb-12 flex items-center justify-center overflow-hidden">
        {/* Full Clinical Physiotherapy Team Rehabilitation Image */}
        <div className="absolute inset-0 z-0">
          <picture className="w-full h-full block">
            {/* Desktop & Tablet: Wide Panoramic 16:9 Team Image */}
            <source
              media="(min-width: 640px)"
              srcSet="/images/hero-physio-team-full-hd.webp"
            />
            {/* Mobile: Full Uncropped Team Portrait Image with smooth contrast fade */}
            <img
              src="/images/hero-physio-team-mobile.webp"
              alt="Full clinical team providing comprehensive physiotherapy rehabilitation and recovery"
              className="w-full h-full object-cover object-[center_24%] sm:object-[center_36%]"
              loading="eager"
              fetchPriority="high"
            />
          </picture>

          {/* Crisp, Balanced Contrast Overlay */}
          <div className="absolute inset-0 bg-slate-950/15 sm:bg-slate-950/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-slate-950/25 pointer-events-none" />

          {/* Lush Clinical Emerald Green Atmosphere & Glow beneath the 3 Words (Replacing Black with Green) */}
          <div className="absolute inset-x-0 bottom-0 h-80 sm:h-96 bg-gradient-to-t from-emerald-800 via-emerald-700/85 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-emerald-600/40 via-primary/25 to-transparent pointer-events-none" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[220px] bg-emerald-400/35 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </div>

        {/* Central Hero Showcase */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center my-auto pt-6 sm:pt-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Top Clinical Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-emerald-950/90 via-[#0c2e1b]/95 to-emerald-950/90 backdrop-blur-xl border border-emerald-400/40 hover:border-emerald-300/60 shadow-[0_6px_24px_rgba(6,78,59,0.35)] mb-3 sm:mb-4 transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_10px_#34D399]" />
              </span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-300">
                EXPERT HOMECARE PHYSIOTHERAPY
              </span>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white shadow-xs">
                CHENNAI
              </span>
            </div>

            {/* High-Impact Cinematic Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-heading drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] leading-[1.12] mb-2 sm:mb-3">
              PRECISION PHYSIO RECOVERY
            </h1>

            {/* Dynamic Rotating Clinical Goal with Glowing Accent Lines */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3.5 sm:mb-4">
              <div className="h-[2px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-emerald-400" />
              <div className="h-7 sm:h-8 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={headlineIndex}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-base sm:text-xl lg:text-2xl font-black uppercase tracking-wider text-emerald-400 drop-shadow-[0_0_14px_rgba(52,211,153,0.7)] inline-block"
                  >
                    — {headlineEndings[headlineIndex]} —
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="h-[2px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-emerald-400" />
            </div>

            {/* Subheadline */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-100 font-medium max-w-xl leading-relaxed mb-6 sm:mb-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Clinically guided care for pain relief, functional mobility, and rapid recovery — delivered with hospital-grade equipment at your home.
            </p>

            {/* Dual High-Craft Action Buttons - Full-width stacked on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* Primary: Emerald Luxury Pill */}
              <motion.button
                onClick={handleBookClick}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.96 }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-primary to-emerald-500 hover:from-primary-hover hover:via-emerald-600 hover:to-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_6px_22px_rgba(22,163,74,0.45)] hover:shadow-[0_12px_32px_rgba(22,163,74,0.65)] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-200 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 pointer-events-none" />

                <div className="relative z-10 w-5 h-5 rounded-full bg-emerald-800/80 border border-white/20 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-115">
                  <Calendar className="w-3 h-3 text-white" />
                </div>

                <span className="relative z-10 select-none">BOOK APPOINTMENT</span>

                <div className="relative z-10 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5">
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </motion.button>

              {/* Secondary: Crisp Snow White Luxury Pill */}
              <motion.button
                onClick={handleCallbackClick}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.96 }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_6px_24px_rgba(0,0,0,0.28)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.38)] border border-white/90 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-200 ease-out bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent -skew-x-12 pointer-events-none" />

                <div className="relative z-10 w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300/80 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-115">
                  <Phone className="w-3 h-3 text-emerald-700" />
                </div>

                <span className="relative z-10 select-none">REQUEST CALLBACK</span>

                <div className="relative z-10 w-4 h-4 rounded-full bg-slate-950 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5">
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </motion.button>
            </div>

            {/* Trust Proof Micro-Badge Strip */}
            <div className="mt-6 sm:mt-7 inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 px-5 py-3 sm:px-7 sm:py-3 rounded-2xl sm:rounded-full bg-gradient-to-r from-emerald-600 via-primary to-emerald-600 shadow-[0_8px_30px_rgba(22,163,74,0.5)] border-2 border-emerald-300/80 text-[11px] sm:text-xs text-white font-black uppercase tracking-wider max-w-full transition-all duration-300">
              <span className="inline-flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-white drop-shadow-md" />
                <span className="drop-shadow-xs">Home Visit</span>
              </span>
              <div className="hidden sm:block w-px h-4 bg-white/40" />
              <span className="inline-flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-white drop-shadow-md" />
                <span className="drop-shadow-xs">Certified Senior Physios</span>
              </span>
              <div className="hidden sm:block w-px h-4 bg-white/40" />
              <span className="inline-flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-white drop-shadow-md" />
                <span className="drop-shadow-xs">Sterile Equipment</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
