"use client";

import React from "react";
import { motion } from "framer-motion";

interface SpineSvgProps {
  className?: string;
  activeStep?: number; // 0: Booking, 1: Assessment, 2: Treatment Plan, 3: Recovery
}

/**
 * Physio Signature Visual #1: Spine Line-Art
 * A vertical vertebral column illustration divided into clinical regions:
 * Cervical (C1-C7) -> Thoracic (T1-T12) -> Lumbar (L1-L5) -> Sacrum/Coccyx.
 * As the user scrolls through the 4 steps of "How It Works", each segment
 * illuminates with an emerald green healing glow and pulsing neural pathways.
 */
export const SpineSvg: React.FC<SpineSvgProps> = ({
  className = "",
  activeStep = 0,
}) => {
  // Vertebrae definitions mapped to the 4 recovery steps
  const spineSegments = [
    {
      region: "Cervical",
      label: "C1 - C7 (Mobility & Alignment)",
      step: 0,
      vertebrae: [
        { cy: 45, rx: 16, ry: 6 },
        { cy: 60, rx: 18, ry: 7 },
        { cy: 76, rx: 19, ry: 7 },
        { cy: 93, rx: 21, ry: 8 },
      ],
    },
    {
      region: "Thoracic",
      label: "T1 - T12 (Posture & Thoracic Cage)",
      step: 1,
      vertebrae: [
        { cy: 115, rx: 23, ry: 8 },
        { cy: 135, rx: 25, ry: 9 },
        { cy: 156, rx: 27, ry: 9 },
        { cy: 178, rx: 29, ry: 10 },
        { cy: 200, rx: 30, ry: 10 },
      ],
    },
    {
      region: "Lumbar",
      label: "L1 - L5 (Core Load & Decompression)",
      step: 2,
      vertebrae: [
        { cy: 228, rx: 32, ry: 11 },
        { cy: 254, rx: 34, ry: 12 },
        { cy: 280, rx: 35, ry: 12 },
        { cy: 308, rx: 36, ry: 13 },
      ],
    },
    {
      region: "Sacrum",
      label: "S1 - S5 & Coccyx (Pelvic Foundation)",
      step: 3,
      vertebrae: [
        { cy: 338, rx: 32, ry: 12 },
        { cy: 362, rx: 24, ry: 11 },
        { cy: 382, rx: 16, ry: 9 },
        { cy: 398, rx: 8, ry: 6 },
      ],
    },
  ];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* SVG Container */}
      <svg
        viewBox="0 0 160 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[520px] drop-shadow-sm"
        aria-label="Interactive anatomical spine illustration showing healing progress"
      >
        <defs>
          {/* Active Emerald Glow Filter */}
          <filter id="emeraldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Healing Energy Gradients */}
          <linearGradient id="activeSpineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>

          <linearGradient id="inactiveSpineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        {/* Central Spinal Cord Canal Background */}
        <line
          x1="80"
          y1="25"
          x2="80"
          y2="405"
          stroke="#E2E8F0"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Illuminated Spinal Cord Channel (dynamic height based on activeStep) */}
        <motion.line
          x1="80"
          y1="25"
          x2="80"
          animate={{ y2: 25 + ((activeStep + 1) / 4) * 380 }}
          stroke="url(#activeSpineGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#softGlow)"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Render Vertebrae Segments */}
        {spineSegments.map((segment) => {
          const isSegmentActive = activeStep >= segment.step;
          const isCurrentHighlight = activeStep === segment.step;

          return (
            <g key={segment.region} className="transition-all duration-500">
              {/* Nerve Roots emerging laterally from this spinal section */}
              {segment.vertebrae.map((v, idx) => (
                <g key={`nerve-${idx}`}>
                  {/* Left nerve path */}
                  <motion.path
                    d={`M${80 - v.rx},${v.cy} C${55},${v.cy - 3} ${45},${v.cy + 6} ${32},${v.cy + 4}`}
                    stroke={isSegmentActive ? "#34D399" : "#E2E8F0"}
                    strokeWidth={isCurrentHighlight ? "1.8" : "1"}
                    strokeLinecap="round"
                    strokeOpacity={isSegmentActive ? 0.9 : 0.4}
                    fill="none"
                    transition={{ duration: 0.4 }}
                  />
                  {/* Right nerve path */}
                  <motion.path
                    d={`M${80 + v.rx},${v.cy} C${105},${v.cy - 3} ${115},${v.cy + 6} ${128},${v.cy + 4}`}
                    stroke={isSegmentActive ? "#34D399" : "#E2E8F0"}
                    strokeWidth={isCurrentHighlight ? "1.8" : "1"}
                    strokeLinecap="round"
                    strokeOpacity={isSegmentActive ? 0.9 : 0.4}
                    fill="none"
                    transition={{ duration: 0.4 }}
                  />
                  {/* Nerve root node dot */}
                  {isSegmentActive && (
                    <>
                      <circle cx="32" cy={v.cy + 4} r="2" fill="#16A34A" />
                      <circle cx="128" cy={v.cy + 4} r="2" fill="#16A34A" />
                    </>
                  )}
                </g>
              ))}

              {/* Individual Vertebral Bones */}
              {segment.vertebrae.map((v, idx) => (
                <motion.g
                  key={`vert-${segment.region}-${idx}`}
                  animate={{
                    scale: isCurrentHighlight ? [1, 1.04, 1] : 1,
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: isCurrentHighlight ? Infinity : 0,
                    ease: "easeInOut",
                    delay: idx * 0.1,
                  }}
                  style={{ transformOrigin: `80px ${v.cy}px` }}
                >
                  {/* Intervertebral Disc */}
                  <ellipse
                    cx="80"
                    cy={v.cy - v.ry + 1}
                    rx={v.rx * 0.75}
                    ry={2.5}
                    fill={isSegmentActive ? "#15803D" : "#CBD5E1"}
                    opacity={isSegmentActive ? 0.8 : 0.5}
                  />

                  {/* Vertebra Body */}
                  <ellipse
                    cx="80"
                    cy={v.cy}
                    rx={v.rx}
                    ry={v.ry}
                    fill={isSegmentActive ? (isCurrentHighlight ? "#DCFCE7" : "#F4FAF6") : "#F8FAFC"}
                    stroke={isSegmentActive ? (isCurrentHighlight ? "#16A34A" : "#34D399") : "#CBD5E1"}
                    strokeWidth={isCurrentHighlight ? "2.5" : "1.5"}
                    filter={isCurrentHighlight ? "url(#emeraldGlow)" : undefined}
                  />

                  {/* Spinous process (central anterior line) */}
                  <circle
                    cx="80"
                    cy={v.cy}
                    r={isCurrentHighlight ? "3.5" : "2.5"}
                    fill={isSegmentActive ? "#16A34A" : "#94A3B8"}
                  />
                </motion.g>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Region Status Indicator Badge */}
      <div className="mt-4 px-3 py-1.5 rounded-full bg-white/90 border border-emerald-100 shadow-soft-sm text-center">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-primary">
          Step {activeStep + 1} of 4 • {spineSegments[activeStep]?.region} Spine
        </span>
        <span className="block text-xs font-semibold text-slate-700">
          {spineSegments[activeStep]?.label}
        </span>
      </div>
    </div>
  );
};

export default SpineSvg;
