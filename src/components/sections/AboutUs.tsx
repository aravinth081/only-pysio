"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles, Compass, HeartPulse } from "lucide-react";

export const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const whyPhysioRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  const isIntroInView = useInView(introRef, { once: true, margin: "-60px" });
  const isWhoInView = useInView(whoWeAreRef, { once: true, margin: "-80px" });
  const isWhyInView = useInView(whyPhysioRef, { once: true, margin: "-80px" });
  const isMissionInView = useInView(missionRef, { once: true, margin: "-80px" });

  const galleryImages = [
    {
      src: "/images/about/discover-1.jpg",
      alt: "Physiotherapist guiding patient arm mobility exercise with dumbbell",
      caption: "Mobility & Strength Training",
      position: "object-center",
    },
    {
      src: "/images/about/discover-2.jpg",
      alt: "Physiotherapist performing specialized spine and shoulder stretch",
      caption: "Spine & Shoulder Rehab",
      position: "object-center",
    },
    {
      src: "/images/about/discover-3.jpg",
      alt: "Clinical assessment and manual physical therapy on plinth couch",
      caption: "Clinical Manual Therapy",
      position: "object-center",
    },
    {
      src: "/images/about/discover-4.jpg",
      alt: "Senior therapist guiding active upper body range of motion exercise",
      caption: "Range-of-Motion Restoration",
      position: "object-center",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden scroll-mt-20 bg-white"
      aria-label="About Us"
    >
      {/* Anchor targets to preserve backward compatibility */}
      <span id="about-therapy" className="absolute -top-24 left-0 pointer-events-none" />
      <span id="about-us" className="absolute -top-24 left-0 pointer-events-none" />

      {/* =========================================================================
          INTRO HEADER: "ABOUT US"
          Generous, beautifully proportioned spacing above the banner image
          with clinical-premium typography and glowing emerald accent
          ========================================================================= */}
      <div
        ref={introRef}
        className="w-full pt-12 sm:pt-20 lg:pt-24 pb-8 sm:pb-14 lg:pb-16 bg-gradient-to-b from-slate-50/80 via-white to-white relative"
      >
        {/* Soft Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] bg-emerald-100/35 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Main "ABOUT US" Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight font-heading leading-tight mb-4"
          >
            <span className="text-slate-900">ABOUT </span>
            <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
              US
            </span>
          </motion.h2>

          {/* Elegant Clinical Accent Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isIntroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-5"
          >
            <div className="h-1 w-8 rounded-full bg-emerald-200" />
            <div className="h-1.5 w-16 rounded-full bg-emerald-600 shadow-sm shadow-emerald-500/30" />
            <div className="h-1 w-8 rounded-full bg-emerald-200" />
          </motion.div>

          {/* Descriptive Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Restoring natural movement, eliminating chronic pain, and empowering your physical
            potential through evidence-backed clinical physiotherapy.
          </motion.p>
        </div>
      </div>

      {/* =========================================================================
          PART 1: CLINICAL TREATMENT BANNER
          "We are committed to delivering lasting results that make a difference for LIFE"
          Spacious, bold & high-impact on both mobile and desktop
          ========================================================================= */}
      <div className="relative w-full min-h-[300px] xs:min-h-[340px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[480px] flex items-center justify-center overflow-hidden bg-slate-950 border-y border-slate-900/10">
        {/* Modern Clinic Treatment Panoramic Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/about/clinic-treatment-banner.webp"
            alt="Comprehensive physiotherapy clinical care and active recovery at The Physio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full scale-100"
          />
          {/* Subtle Overall Ambient Darkness for Depth */}
          <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />

          {/* Vertical Edge Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Focused Central Radial Vignette for Clean Text Contrast */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 85% at 50% 50%, rgba(15, 23, 42, 0.60) 0%, rgba(15, 23, 42, 0.25) 60%, rgba(15, 23, 42, 0.05) 100%)",
            }}
          />
        </div>

        {/* Centered Bold Banner Text with Responsive Typography */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16 text-center flex flex-col items-center justify-center h-full"
        >
          <h2
            className="text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[40px] font-black uppercase tracking-[0.04em] sm:tracking-[0.08em] lg:tracking-[0.10em] leading-snug sm:leading-[1.35] font-heading"
            style={{
              textShadow:
                "0 2px 14px rgba(0,0,0,0.98), 0 1px 4px rgba(0,0,0,1), 0 0 24px rgba(0,0,0,0.95)",
            }}
          >
            <span className="block text-white/95">
              WE DELIVER LASTING RESULTS
            </span>
            <span className="block mt-1 sm:mt-3 text-white">
              THAT MAKE A DIFFERENCE{" "}
              <span className="inline-block">
                FOR{" "}
                <span className="text-[#38e062] font-black drop-shadow-[0_0_24px_rgba(56,224,98,0.85)]">
                  LIFE.
                </span>
              </span>
            </span>
          </h2>

          {/* Minimalist Clinical Pulse Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-6"
          >
            <div className="h-[2px] w-8 sm:w-20 bg-gradient-to-r from-transparent to-[#38e062]/80 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-[#38e062] shadow-[0_0_10px_#38e062]" />
            <div className="h-[2px] w-8 sm:w-20 bg-gradient-to-l from-transparent to-[#38e062]/80 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* =========================================================================
          PART 2: "WHO WE ARE" (Image 4)
          Red Heading + 2 Detailed Paragraphs + 4-Photo Gallery Grid
          ========================================================================= */}
      <div ref={whoWeAreRef} className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isWhoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase font-heading">
              <span className="text-[#0e2a52]">DISCOVER </span>
              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                US
              </span>
            </h2>
          </motion.div>

          {/* Description Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isWhoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4 sm:space-y-5 text-slate-700 text-sm sm:text-base lg:text-[16.5px] leading-relaxed max-w-5xl"
          >
            <p>
              At <strong className="font-semibold text-slate-900">OnlyPhysio</strong>, your health and recovery come first. With over <span className="font-semibold text-emerald-800">10 years of experience</span> and <span className="font-semibold text-emerald-800">10,000+ happy patients</span>, our skilled therapists specialize in injury recovery, chronic pain management, post-surgical rehabilitation, and mobility improvement.
            </p>

            <p>
              Our patient-focused approach combines advanced physiotherapy techniques, personalized treatment plans, and expert guidance to help you recover faster, restore movement, and return to your everyday activities with confidence.
            </p>

            <div className="pt-2 sm:pt-3">
              <p className="text-base sm:text-lg lg:text-xl font-extrabold tracking-tight font-heading">
                <span className="text-[#0e2a52]">Your Recovery. </span>
                <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                  Our Priority.
                </span>
              </p>
            </div>
          </motion.div>

          {/* 4 Photo Gallery Row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isWhoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 mt-10 sm:mt-12"
          >
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/90 bg-slate-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                  className={`object-cover ${img.position || "object-center"} group-hover:scale-105 transition-transform duration-500 ease-out`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide drop-shadow-md font-heading">
                    {img.caption}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          PART 3: "WHY THE PHYSIO"
          Deep Clinical Forest Green Container + High-Res Doctor Photo on Left
          ========================================================================= */}
      <div
        ref={whyPhysioRef}
        className="relative w-full bg-[#0a3525] overflow-hidden min-h-[400px] lg:min-h-[440px] flex items-center"
      >
        {/* Full Section Background Photo on Left (High-Res Doctor with Clipboard & Spine Model) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full lg:w-[48%] h-full opacity-75 lg:opacity-95">
            <Image
              src="/images/about/why-the-physio-doctor.jpg"
              alt="Expert senior physiotherapist in clinic holding consultation clipboard"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_15%] lg:object-[35%_15%]"
            />
          </div>
          {/* Subtle Gradient to ease into the Deep Green background on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a3525]/75 to-[#0a3525] lg:hidden" />
        </div>

        {/* Diagonal Slanted Deep Forest Green Container (Desktop & Tablet) */}
        <div
          className="hidden lg:block absolute inset-y-0 right-0 w-[66%] bg-gradient-to-br from-[#0c3e2c] via-[#0f4935] to-[#07271c] pointer-events-none shadow-2xl border-l border-emerald-500/20"
          style={{
            clipPath: "polygon(100px 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isWhyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[58%] lg:pl-10 text-white"
          >
            {/* Heading with Clean Green Accent Line */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase font-heading text-white whitespace-nowrap">
                WHY THE PHYSIO
              </h2>
              <div className="h-[3px] w-14 sm:w-20 bg-gradient-to-r from-[#38e062] to-emerald-400 rounded-full" />
            </div>

            {/* Content Text: Clean, Prestigious, Highly Readable Medical Typography */}
            <div className="space-y-5 text-white/95 text-[15px] sm:text-base lg:text-[16.5px] leading-[1.8] font-heading font-normal">
              <p>
                At <span className="font-semibold text-white">THE PHYSIO</span>, we realize every individual&apos;s problem is different which requires individualized attention. We make this thought our priority and assess every individual in detail, following which a one-on-one custom-made treatment plan is made.
              </p>

              <p>
                At <span className="font-semibold text-white">THE PHYSIO</span>, we provide all high-end facilities from therapeutic modalities to high-end fitness equipment, all under the same roof. The therapy and specialised training are supervised by expert physiotherapists for efficient, lasting results.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          PART 4: OUR PURPOSE & DIRECTION (Vision & Mission)
          Fresh Clinical Editorial Layout with High-Impact Imagery & 3-Step Journey
          ========================================================================= */}
      <div
        ref={missionRef}
        className="relative w-full pt-16 sm:pt-20 pb-10 sm:pb-14 bg-gradient-to-b from-[#f8fafc] via-[#f0fdf4]/35 to-white overflow-hidden border-t border-slate-200/80"
      >
        {/* Soft Ambient Radial Mesh Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-100/40 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase font-heading mb-3"
            >
              OUR PURPOSE &{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                DIRECTION
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isMissionInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="h-1 w-8 rounded-full bg-emerald-200" />
              <div className="h-1.5 w-14 rounded-full bg-emerald-600 shadow-sm shadow-emerald-500/30" />
              <div className="h-1 w-8 rounded-full bg-emerald-200" />
            </motion.div>
          </div>

          {/* Integrated Editorial Composition (No Generic Box Model) */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* LEFT COLUMN: Vision & Mission Narrative Flow */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full lg:w-[50%] space-y-6 sm:space-y-7"
            >
              {/* 1. VISION SECTION */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-sm">
                    <Compass className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight uppercase">
                    OUR <span className="text-[#16a34a]">VISION</span>
                  </h3>
                </div>

                <p className="text-slate-700 text-[15px] sm:text-base lg:text-[16.5px] leading-relaxed font-heading font-medium">
                  Our vision is to help every individual achieve their full physical potential by{" "}
                  <strong className="font-semibold text-slate-900">restoring mobility</strong>,{" "}
                  <strong className="font-semibold text-slate-900">improving strength</strong>, and promoting a{" "}
                  <strong className="font-semibold text-emerald-700">healthier lifestyle</strong> through personalized physiotherapy and rehabilitation care.
                </p>
              </div>

              {/* Elegant Gradient Divider */}
              <div className="h-px w-full bg-gradient-to-r from-emerald-500/30 via-slate-200 to-transparent" />

              {/* 2. MISSION SECTION & 3-PHASE JOURNEY */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-sm">
                    <HeartPulse className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight uppercase">
                    OUR <span className="text-[#16a34a]">MISSION</span>
                  </h3>
                </div>

                <p className="text-slate-700 text-[15px] sm:text-base font-heading font-medium">
                  Our mission is to help every individual through our dedicated recovery roadmap:
                </p>

                {/* 3-Phase Milestone Roadmap (GET WELL. STAY WELL. LIVE WELL.) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 pb-2">
                  {/* Step 1 */}
                  <div className="relative p-3.5 rounded-2xl bg-white border border-emerald-200/90 shadow-soft-xs hover:border-emerald-400 hover:shadow-soft-sm transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-heading">
                        Stage 01
                      </span>
                      <span className="text-emerald-400 font-bold text-xs">→</span>
                    </div>
                    <p className="text-sm sm:text-[15px] font-black text-slate-900 font-heading tracking-wide">
                      GET WELL
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      Relieve pain & restore early movement
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative p-3.5 rounded-2xl bg-white border border-emerald-200/90 shadow-soft-xs hover:border-emerald-400 hover:shadow-soft-sm transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-heading">
                        Stage 02
                      </span>
                      <span className="text-emerald-400 font-bold text-xs">→</span>
                    </div>
                    <p className="text-sm sm:text-[15px] font-black text-slate-900 font-heading tracking-wide">
                      STAY WELL
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      Build strength & prevent recurrence
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-green-600 text-white shadow-md hover:shadow-lg transition-all border border-emerald-500">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-100 bg-emerald-800/60 px-2 py-0.5 rounded-md font-heading">
                        Stage 03
                      </span>
                      <span className="text-emerald-200 font-bold text-xs">✓</span>
                    </div>
                    <p className="text-sm sm:text-[15px] font-black text-white font-heading tracking-wide">
                      LIVE WELL
                    </p>
                    <p className="text-xs text-emerald-100 mt-1 leading-snug">
                      Lifelong vitality & active daily freedom
                    </p>
                  </div>
                </div>

                <p className="text-slate-700 text-[15px] sm:text-base lg:text-[16.5px] leading-relaxed font-heading font-medium pt-1">
                  We are committed to delivering <strong className="font-semibold text-slate-900">personalized treatment</strong>,{" "}
                  <strong className="font-semibold text-slate-900">expert guidance</strong>, and{" "}
                  <strong className="font-semibold text-emerald-700">lasting results</strong> that improve overall health and well-being.
                </p>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Full Natural Ratio Clinical Visual Anchor (Height Balanced Top & Bottom) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full lg:w-[50%] flex justify-center"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3.15] xl:aspect-[4/3.2] rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
                <Image
                  src="/images/about/purpose-direction-visual.jpg"
                  alt="Senior physiotherapist providing personalized clinical care to patient"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
