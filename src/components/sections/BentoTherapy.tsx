"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserCheck,
  ShieldAlert,
  Activity,
  HeartPulse,
  Stethoscope,
  Compass,
  Sparkles,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { siteContent, BentoItem } from "@/data/content";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  UserCheck,
  ShieldAlert,
  Activity,
  HeartPulse,
  Stethoscope,
  Compass,
  Sparkles,
};

interface BentoCardProps {
  item: BentoItem;
  index: number;
  onBook: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ item, index, onBook }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const IconComponent = iconMap[item.icon] || Activity;

  // Dynamic Mouse Spotlight & 3D Tilt calculation
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    // Subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setMousePosition({ x: -200, y: -200 });
  };

  // Card grid span configurations
  const getColSpan = () => {
    if (item.size === "large") return "col-span-1 md:col-span-2 lg:col-span-2";
    if (item.size === "medium") return "col-span-1 md:col-span-1 lg:col-span-1";
    return "col-span-1 md:col-span-1 lg:col-span-1";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-soft-sm hover:shadow-soft-lg ${getColSpan()}`}
    >
      {/* 1. Dynamic Cursor Spotlight Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(52, 211, 153, 0.16), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Spotlight Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-primary/30"
        style={{
          maskImage: `radial-gradient(220px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(220px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Card Content Top */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          {/* Animated Mint Circle Icon Bubble */}
          <div className="w-14 h-14 rounded-2xl bg-primary-mint/80 text-primary-deep flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white">
            <IconComponent className="w-7 h-7 transition-colors" />
          </div>

          {/* Clinical Badge */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/80 font-heading">
            {item.badge}
          </span>
        </div>

        {/* Card Title & Description */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-primary transition-colors font-heading mb-2.5 tracking-tight">
          {item.title}
        </h3>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      {/* Card Content Bottom: Interactive Micro CTA */}
      <div className="relative z-10 mt-6 pt-5 border-t border-slate-100/90 flex items-center justify-between">
        <button
          onClick={onBook}
          className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors flex items-center gap-1.5 focus:outline-none"
        >
          <span>Schedule Therapy</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <span className="text-[11px] font-bold text-slate-300 group-hover:text-primary/40 font-heading">
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
};

export const BentoTherapy: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about-therapy"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-soft overflow-hidden"
    >
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-mint/30 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-100/40 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-primary-deep text-xs font-bold uppercase tracking-widest mb-4 font-heading"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {siteContent.bentoTherapy.eyebrow}
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight mb-5"
          >
            {siteContent.bentoTherapy.title}
          </motion.h2>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            {siteContent.bentoTherapy.description}
          </motion.p>
        </div>

        {/* 7 Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.bentoTherapy.cards.map((card, idx) => (
            <BentoCard
              key={card.id}
              item={card}
              index={idx}
              onBook={() => scrollTo("#booking")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoTherapy;
