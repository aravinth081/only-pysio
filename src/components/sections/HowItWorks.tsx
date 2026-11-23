"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import { siteContent } from "@/data/content";

export const HowItWorks: React.FC = () => {
  const { subtitle, steps } = siteContent.howItWorks;

  return (
    <section
      id="how-it-works"
      className="relative pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-14 bg-[#FFFFFF] overflow-hidden"
    >
      {/* Subtle background ambient soft green glow (confined to white+green palette) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F0FDF4] rounded-full filter blur-3xl pointer-events-none -z-10 opacity-70"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* ====================================================================
            2. SECTION INTRODUCTION
            ==================================================================== */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24 lg:mb-28">
          {/* Main Heading: Styled in Image 1 Model (OUR SERVICES style) */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase font-heading mb-3"
          >
            HOW IT{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
              WORKS
            </span>
          </motion.h2>

          {/* 3-Pill Accent Divider matching Image 1 Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-1 w-8 rounded-full bg-emerald-200" />
            <div className="h-1.5 w-14 rounded-full bg-emerald-600 shadow-sm shadow-emerald-500/30" />
            <div className="h-1 w-8 rounded-full bg-emerald-200" />
          </motion.div>

          {/* Supporting Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-[#475569] font-medium leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle || siteContent.howItWorks.description}
          </motion.p>
        </div>

        {/* ====================================================================
            3. MAIN LAYOUT – FOUR-STEP VERTICAL STORYTELLING
            ==================================================================== */}
        <div className="relative">
          {/* Continuous Desktop Central Timeline Line */}
          <div
            className="hidden lg:block absolute left-1/2 top-10 bottom-24 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#16A34A]/20 via-[#16A34A] to-[#16A34A]/20 pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="space-y-16 sm:space-y-24 lg:space-y-28">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0; // idx 0 = Step 1 (Image Left), idx 1 = Step 2 (Image Right), etc.
              const isLast = idx === steps.length - 1;

              return (
                <div key={step.number} className="relative">
                  {/* DESKTOP LAYOUT (3 columns: Left [5 cols] | Timeline Center [2 cols] | Right [5 cols]) */}
                  <div className="hidden lg:grid lg:grid-cols-[1fr_80px_1fr] items-center gap-6 xl:gap-12 relative z-10">
                    {/* LEFT COLUMN */}
                    <div className="w-full">
                      {isEven ? (
                        /* STEP 01, 03: Image LEFT */
                        <StepImageCard
                          step={step}
                          idx={idx}
                          align="left"
                        />
                      ) : (
                        /* STEP 02, 04: Content LEFT */
                        <StepContentCard
                          step={step}
                          idx={idx}
                          align="right"
                        />
                      )}
                    </div>

                    {/* CENTER COLUMN: Circular Step Indicator & Timeline Node */}
                    <div className="flex flex-col items-center justify-center relative self-stretch">
                      {/* Central Circular Step Badge */}
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative z-20 my-auto group"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-lg shadow-[#16A34A]/25 ring-4 ring-[#FFFFFF] border-2 border-[#DCFCE7] group-hover:scale-110 group-hover:bg-[#15803D] transition-all duration-300">
                          <span className="text-xl font-extrabold font-heading tracking-tight">
                            {step.number}
                          </span>
                        </div>
                      </motion.div>

                      {/* Directional Downward Arrow between steps */}
                      {!isLast && (
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-10 hidden lg:flex items-center justify-center">
                          <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-emerald-500 via-primary to-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 ring-4 ring-white border-2 border-emerald-300">
                            <ArrowDown className="w-7 h-7 animate-bounce text-white stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full">
                      {isEven ? (
                        /* STEP 01, 03: Content RIGHT */
                        <StepContentCard
                          step={step}
                          idx={idx}
                          align="left"
                        />
                      ) : (
                        /* STEP 02, 04: Image RIGHT */
                        <StepImageCard
                          step={step}
                          idx={idx}
                          align="right"
                        />
                      )}
                    </div>
                  </div>

                  {/* MOBILE & TABLET LAYOUT (Stacked: Image First -> Number & Content Below) */}
                  <div className="block lg:hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5 }}
                      className="bg-[#FFFFFF] rounded-3xl p-5 sm:p-7 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Step Header Badge on Mobile */}
                      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E2E8F0]/70">
                        <div className="flex items-center gap-2.5">
                          <span className="w-10 h-10 rounded-xl bg-[#16A34A] text-white text-base font-extrabold font-heading flex items-center justify-center shadow-sm">
                            {step.number}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#14532D] font-heading">
                            Step {step.number}
                          </span>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
                          {step.highlight}
                        </span>
                      </div>

                      {/* 1. Mobile Image (Always First) */}
                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md mb-6">
                        <Image
                          src={step.image || `/images/how-it-works/step-${idx + 1}.jpg`}
                          alt={`${step.title} - OnlyPhysio`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* 2. Step Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14532D] font-heading tracking-tight mb-3">
                        {step.title}
                      </h3>

                      {/* 3. Description */}
                      <p className="text-sm sm:text-base text-[#334155] leading-relaxed mb-6 font-normal">
                        {step.description}
                      </p>

                      {/* 4. Three Key Points with Green Checkmarks */}
                      <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                        {step.details.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                            <span className="text-sm text-[#475569] font-medium leading-snug">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Mobile Downward Arrow Connector between steps (High-Impact, Prominent & Beautiful) */}
                    {!isLast && (
                      <div className="flex flex-col items-center justify-center my-10 sm:my-14 relative">
                        {/* Upper connecting gradient line with glow */}
                        <div className="w-2 h-14 sm:h-18 rounded-full bg-gradient-to-b from-emerald-500/10 via-emerald-500/60 to-emerald-600 shadow-[0_0_12px_rgba(22,163,74,0.4)]" />

                        {/* Prominent High-Visibility Arrow Badge */}
                        <div className="relative z-10 my-2 flex items-center justify-center">
                          {/* Outer subtle radar ping */}
                          <span className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-500/20 animate-ping opacity-60 pointer-events-none" />

                          {/* Ambient soft glow ring */}
                          <div className="absolute w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-emerald-500/35 blur-xl pointer-events-none" />

                          {/* Main Large Arrow Circle (80px x 80px on mobile, 96px x 96px on sm) */}
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-400 via-[#16A34A] to-[#14532D] text-white flex items-center justify-center shadow-[0_14px_32px_rgba(22,163,74,0.45)] ring-4 ring-white border-2 border-emerald-300 transition-transform duration-300 active:scale-95">
                            <ArrowDown className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[3.5] animate-bounce" />
                          </div>
                        </div>

                        {/* Lower connecting gradient line with glow */}
                        <div className="w-2 h-14 sm:h-18 rounded-full bg-gradient-to-b from-emerald-600 via-emerald-500/60 to-emerald-500/10 shadow-[0_0_12px_rgba(22,163,74,0.4)]" />

                        {/* Step progression pill */}
                        <div className="mt-3.5 inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-950 font-heading bg-gradient-to-r from-emerald-100/90 via-emerald-50 to-emerald-100/90 px-4 sm:px-5 py-1.5 rounded-full border border-emerald-300 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                          <span>Step {step.number}</span>
                          <span className="text-emerald-600 font-bold">➔</span>
                          <span>Next: Step {String(Number(step.number) + 1).padStart(2, "0")}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* End of four steps */}
      </div>
    </section>
  );
};

/* ==========================================================================
   DESKTOP STEP IMAGE CARD
   - 4:3 Aspect Ratio
   - Smooth Hover Transitions & Soft Rounded Corners
   - Elegant Shadow
   ========================================================================== */
interface StepCardProps {
  step: (typeof siteContent.howItWorks.steps)[0];
  idx: number;
  align: "left" | "right";
}

const StepImageCard: React.FC<StepCardProps> = ({ step, idx, align }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -35 : 35 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative"
    >
      <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-md hover:shadow-2xl transition-all duration-500 bg-[#F0FDF4]">
        <Image
          src={step.image || `/images/how-it-works/step-${idx + 1}.jpg`}
          alt={`${step.title} - OnlyPhysio`}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Step pill on top corner of image */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#14532D] text-xs font-bold font-heading shadow-sm border border-white/80">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            Step {step.number}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   DESKTOP STEP CONTENT CARD
   - Clear Step Number
   - Professional Heading
   - Highlight Subtitle
   - Descriptive Paragraph
   - Three Key Points with Green Checkmarks
   ========================================================================== */
const StepContentCard: React.FC<StepCardProps> = ({ step, idx, align }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -35 : 35 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col justify-center ${
        align === "right" ? "lg:pr-4" : "lg:pl-4"
      }`}
    >
      {/* Top Meta: Step Number & Highlight Label */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-extrabold text-[#16A34A] tracking-wider uppercase font-heading">
          STEP {step.number}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]/40" />
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
          {step.highlight}
        </span>
      </div>

      {/* Professional Heading */}
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14532D] font-heading tracking-tight leading-snug mb-4">
        {step.title}
      </h3>

      {/* Descriptive Paragraph */}
      <p className="text-base sm:text-lg text-[#334155] leading-relaxed mb-6 font-normal">
        {step.description}
      </p>

      {/* Three Key Points with Green Check Icons */}
      <div className="space-y-3.5 pt-4 border-t border-[#E2E8F0]">
        {step.details.map((point, pIdx) => (
          <div key={pIdx} className="flex items-start gap-3 group/item">
            <div className="w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#16A34A] group-hover/item:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] group-hover/item:text-white transition-colors" />
            </div>
            <span className="text-sm sm:text-base text-[#475569] font-medium leading-snug">
              {point}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HowItWorks;
