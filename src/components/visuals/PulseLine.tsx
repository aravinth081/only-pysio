"use client";

import React from "react";
import { motion } from "framer-motion";

interface PulseLineProps {
  className?: string;
  color?: string;
  height?: number;
  animated?: boolean;
}

/**
 * Animated SVG ECG / Pulse line representing vital healing and rehabilitation.
 * Uses stroke-dashoffset to draw the heartbeat rhythm continuously.
 */
export const PulseLine: React.FC<PulseLineProps> = ({
  className = "",
  color = "#16A34A",
  height = 48,
  animated = true,
}) => {
  // SVG path for medical ECG cardiac pulse: baseline -> P wave -> Q -> R spike -> S dip -> T wave -> baseline
  const pathData =
    "M0,25 L120,25 L135,22 L145,28 L155,25 L170,25 L180,6 L195,44 L205,18 L215,28 L225,25 L245,25 L260,18 L275,30 L285,25 L400,25";

  return (
    <div
      className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 50"
        preserveAspectRatio="none"
        className="w-full h-full"
        fill="none"
      >
        {/* Subtle background guide line */}
        <path
          d="M0,25 L400,25"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.15"
          strokeDasharray="4 4"
        />

        {/* Faded trail ECG line */}
        <path
          d={pathData}
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated glowing active ECG pulse */}
        {animated ? (
          <motion.path
            d={pathData}
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="120 280"
            initial={{ strokeDashoffset: 400, opacity: 0 }}
            animate={{
              strokeDashoffset: [400, 0, -400],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ) : (
          <path
            d={pathData}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
};

export default PulseLine;
