"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { siteContent } from "@/data/content";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

export const CtaBanner: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const bannerRef = useRef<HTMLElement>(null);
  const isInView = useInView(bannerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={bannerRef}
      className="relative py-20 sm:py-24 bg-primary-deep text-white overflow-hidden"
    >
      {/* Background Parallax Wave & Glowing Radial Blobs */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-glow/15 rounded-full filter blur-3xl animate-pulse-subtle" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-primary/25 rounded-full filter blur-3xl animate-float-slow" />

        {/* Subtle Geometric Medical Cross Pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(#FFFFFF 1px, transparent 1px), radial-gradient(#34D399 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold uppercase tracking-widest mb-6 font-heading shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-glow" />
            <span>{siteContent.ctaBanner.eyebrow}</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight leading-[1.2] mb-6"
          >
            {siteContent.ctaBanner.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mb-10 font-normal"
          >
            {siteContent.ctaBanner.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto"
          >
            {/* Primary Action with Button Shine Sweep */}
            <Link
              href="/book"
              prefetch={true}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-primary-deep font-bold text-base shadow-2xl hover:bg-emerald-50 transition-all duration-300 active:scale-95 overflow-hidden"
            >
              {/* Shine Sweep Animation */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent w-full" />
              <Calendar className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
              <span>{siteContent.ctaBanner.primaryBtn}</span>
            </Link>

            {/* Secondary Action */}
            <button
              onClick={() => scrollTo("#about-us")}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-900/60 border border-emerald-600/50 text-white font-semibold text-base hover:bg-emerald-800 transition-all duration-300 active:scale-95 group"
            >
              <span>{siteContent.ctaBanner.secondaryBtn}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Trust Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex items-center gap-2 text-xs font-medium text-emerald-300"
          >
            <ShieldCheck className="w-4 h-4 text-primary-glow" />
            <span>{siteContent.ctaBanner.badge}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
