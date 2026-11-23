"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Award, HeartHandshake, ShieldCheck } from "lucide-react";
import { siteContent } from "@/data/content";

export const AboutOnlyPhysio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const data = siteContent.aboutOnlyPhysio;

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Background Soft Blobs */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-100/40 rounded-full filter blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary-mint/30 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols): Multi-layer Image Collage + Rotating Circular Badge */}
          <div className="lg:col-span-5 relative">
            {/* Primary Main Collage Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src="/images/therapist-team.jpg"
                alt="Licensed senior physiotherapist examining patient mobility"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom In-Image Clinical Credential */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-white/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 font-heading">
                    Registered & Verified Clinicians
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    BPT & MPT certified physiotherapy specialists
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Secondary Floating Parallax Layer Card: Sports Rehab (Bottom-Right Offset) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="hidden sm:block absolute -bottom-8 -right-8 w-48 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white"
            >
              <Image
                src="/images/sports-recovery.jpg"
                alt="Sports physiotherapy and mobility training"
                fill
                sizes="192px"
                className="object-cover"
              />
            </motion.div>

            {/* Rotating Circular Text Ring Badge: 10+ Years of Experience */}
            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 z-20">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
                {/* Rotating Circular SVG Text */}
                <motion.svg
                  viewBox="0 0 140 140"
                  className="w-full h-full animate-spin-slow select-none pointer-events-none"
                >
                  <defs>
                    <path
                      id="textCircle"
                      d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                    />
                  </defs>
                  <text className="text-[10px] font-extrabold uppercase tracking-[0.22em] fill-slate-800">
                    <textPath href="#textCircle" startOffset="0%">
                      ★ 10+ YEARS EXPERIENCE ★ ONLYPHYSIO CARE
                    </textPath>
                  </text>
                </motion.svg>

                {/* Central Solid Circular Badge */}
                <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-deep text-white flex flex-col items-center justify-center shadow-lg border-2 border-primary-mint">
                  <span className="text-sm sm:text-base font-extrabold font-heading leading-none">
                    10+
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-300">
                    Years
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Content & 6 Checklist Points */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-primary-deep text-xs font-bold uppercase tracking-widest mb-4 font-heading"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              {data.eyebrow}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight mb-3"
            >
              {data.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base sm:text-lg font-semibold text-primary mb-6"
            >
              {data.subtitle}
            </motion.p>

            {/* Narrative Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-normal"
            >
              <p>{data.description1}</p>
              <p>{data.description2}</p>
            </motion.div>

            {/* 6 Animated Checklist Points (2-Column Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4 border-t border-slate-100">
              {data.checkpoints.map((pt, idx) => (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-2xl hover:bg-soft transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary-mint text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      {pt.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOnlyPhysio;
