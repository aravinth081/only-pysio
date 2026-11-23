"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  UserCheck2,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import { siteContent, StatItem, TestimonialItem } from "@/data/content";
import RomArc from "@/components/visuals/RomArc";
import MarqueeStrip from "@/components/visuals/MarqueeStrip";

// Single Counter Component that counts up on scroll into view
const CounterItem: React.FC<{ stat: StatItem; index: number }> = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2200; // ms
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * stat.value);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(stat.value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-soft-sm flex flex-col justify-between"
    >
      <div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight">
            {count.toLocaleString()}
          </span>
          <span className="text-3xl font-extrabold text-primary font-heading">
            {stat.suffix}
          </span>
        </div>

        <h4 className="text-base font-bold text-slate-800 leading-tight mb-1">
          {stat.label}
        </h4>
      </div>

      <p className="text-xs text-slate-500 font-medium pt-3 border-t border-slate-100">
        {stat.sublabel}
      </p>
    </motion.div>
  );
};

export const StatsTestimonials: React.FC = () => {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = siteContent.testimonials;
  const currentReview = testimonials[activeReviewIdx];

  // Auto-advance reviews every 6 seconds unless paused
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  return (
    <section id="stats" className="relative pt-20 pb-28 bg-[#DCFCE7]/40 overflow-hidden">
      {/* 1. Keyword Marquee Strip Across Section Header */}
      <MarqueeStrip className="mb-20" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Headline */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-primary-deep text-xs font-bold uppercase tracking-widest mb-4 font-heading shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>MEASURED OUTCOMES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
            {siteContent.stats.headline}
          </h2>
        </div>

        {/* Top Half: Counter Stats + Range of Motion Arc */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 items-stretch">
          {siteContent.stats.items.slice(0, 3).map((stat, idx) => (
            <CounterItem key={stat.label} stat={stat} index={idx} />
          ))}

          {/* Goniometer Range of Motion Arc Visual Widget */}
          <RomArc targetAngle={120} />
        </div>

        {/* Bottom Half: Patient Recovery Stories / Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading">
              REAL RECOVERY EXPERIENCES
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight mt-1">
              Voices of Regained Independence
            </h3>
          </div>

          <div
            className="relative p-8 sm:p-12 rounded-3xl bg-white shadow-soft-lg border border-emerald-100"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Top Quote Icon & 5 Star Rating */}
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary-mint text-primary flex items-center justify-center">
                <Quote className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote Text with Slide Animation */}
            <div className="min-h-[140px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-lg sm:text-xl text-slate-700 italic leading-relaxed font-sans"
                >
                  &ldquo;{currentReview.quote}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Reviewer Information & Carousel Controls */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                  {currentReview.name}, {currentReview.age} yrs
                </h4>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                  <span className="font-semibold text-primary">
                    {currentReview.condition}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {currentReview.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {currentReview.duration}
                  </span>
                </div>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveReviewIdx(
                      (prev) => (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() =>
                    setActiveReviewIdx((prev) => (prev + 1) % testimonials.length)
                  }
                  className="w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeReviewIdx === idx ? "w-8 bg-primary" : "w-2 bg-slate-200"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsTestimonials;
