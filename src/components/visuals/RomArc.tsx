"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

interface RomArcProps {
  className?: string;
  targetAngle?: number; // default 120 degrees
}

/**
 * Physio Signature Visual #3: Range-of-Motion (ROM) Goniometer Arc
 * Simulates a clinical orthopedic goniometer measuring joint angles.
 * Smoothly animates from 0° to 120° (restoring functional joint mobility).
 */
export const RomArc: React.FC<RomArcProps> = ({
  className = "",
  targetAngle = 120,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });
  const [currentAngle, setCurrentAngle] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const angle = Math.round(eased * targetAngle);
      setCurrentAngle(angle);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [isInView, targetAngle]);

  // Radius and circumference for SVG circle/arc
  const radius = 64;
  const strokeWidth = 10;
  // Arc covers 180 degrees (half circle)
  const arcLength = Math.PI * radius; // ~201
  const strokeDashoffset = arcLength - (currentAngle / 180) * arcLength;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-emerald-100 shadow-soft-sm select-none ${className}`}
    >
      {/* Top Header Label */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-heading flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-primary" />
          Range of Motion (ROM)
        </span>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          Goniometer Dial
        </span>
      </div>

      {/* Goniometer Dial SVG */}
      <div className="relative w-44 h-28 flex items-end justify-center overflow-visible">
        <svg
          viewBox="0 0 160 90"
          className="w-full h-full overflow-visible"
          fill="none"
        >
          <defs>
            <linearGradient id="romGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          {/* Background Arc (180 degrees) */}
          <path
            d="M 16,80 A 64,64 0 0,1 144,80"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Calibrated Angle Degree Ticks */}
          {[0, 30, 60, 90, 120, 150, 180].map((deg) => {
            const rad = ((180 - deg) * Math.PI) / 180;
            const x1 = 80 + 52 * Math.cos(rad);
            const y1 = 80 - 52 * Math.sin(rad);
            const x2 = 80 + 44 * Math.cos(rad);
            const y2 = 80 - 44 * Math.sin(rad);
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Active Animated Range of Motion Arc */}
          <path
            d="M 16,80 A 64,64 0 0,1 144,80"
            stroke="url(#romGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />

          {/* Rotating Goniometer Needle Arm */}
          <g
            style={{
              transform: `rotate(${currentAngle - 180}deg)`,
              transformOrigin: "80px 80px",
              transition: "transform 0.1s linear",
            }}
          >
            <line
              x1="80"
              y1="80"
              x2="136"
              y2="80"
              stroke="#14532D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="136" cy="80" r="3.5" fill="#16A34A" />
          </g>

          {/* Center Pivot Point */}
          <circle cx="80" cy="80" r="7" fill="#14532D" />
          <circle cx="80" cy="80" r="3" fill="#FFFFFF" />
        </svg>

        {/* Dynamic Digital Counter overlay in center of arc */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className="block text-3xl font-extrabold text-slate-900 font-heading tracking-tight leading-none">
            {currentAngle}°
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            Flexion Regained
          </span>
        </div>
      </div>

      {/* Target Milestone Explanation */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-center w-full">
        <p className="text-xs text-slate-600 font-medium flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
          Average joint restoration achieved for knee & shoulder post-op patients
        </p>
      </div>
    </div>
  );
};

export default RomArc;
