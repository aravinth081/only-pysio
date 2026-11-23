"use client";

import React, { useEffect, useState } from "react";
import { siteContent } from "@/data/content";

interface MarqueeStripProps {
  className?: string;
}

/**
 * Infinite Marquee Strip of Physiotherapy Keywords:
 * (Rehabilitation · Mobility · Strength · Recovery · Balance · Wellness · Pain Relief)
 * Smoothly tracks scroll direction to create an alive, responsive tactile feel.
 */
export const MarqueeStrip: React.FC<MarqueeStripProps> = ({ className = "" }) => {
  const [scrollDirection, setScrollDirection] = useState<"forward" | "reverse">("forward");
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY + 5) {
        setScrollDirection("forward");
      } else if (currentY < lastY - 5) {
        setScrollDirection("reverse");
      }
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const items = siteContent.marqueeKeywords;
  // Repeat items for seamless 200% width looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 bg-primary-deep text-white border-y border-emerald-800/60 select-none shadow-inner ${className}`}
      aria-hidden="true"
    >
      {/* Side gradient masks for smooth fade edge */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-primary-deep to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-primary-deep to-transparent z-10 pointer-events-none" />

      <div
        className={`flex items-center gap-8 whitespace-nowrap will-change-transform ${
          scrollDirection === "forward" ? "animate-marquee" : "animate-marquee-reverse"
        }`}
      >
        {repeatedItems.map((word, idx) => (
          <div key={`${word}-${idx}`} className="flex items-center gap-8">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-emerald-200/90 font-heading uppercase hover:text-white transition-colors">
              {word}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-glow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
