"use client";

import React from "react";
import { motion } from "framer-motion";

interface BreathingBlobProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  children?: React.ReactNode;
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-40 h-40",
};

/**
 * BreathingBlob - A calm, biological scale-and-glow pulse (4s loop)
 * symbolising diaphragmatic breath, muscle relaxation, and healing rhythm.
 */
export const BreathingBlob: React.FC<BreathingBlobProps> = ({
  className = "",
  size = "md",
  color = "bg-primary-mint/60",
  children,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Expanding breath halo */}
      <motion.div
        className={`absolute rounded-full pointer-events-none filter blur-md ${color} ${sizeClasses[size]}`}
        animate={{
          scale: [1, 1.28, 1],
          opacity: [0.35, 0.75, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Secondary gentle inner resonance */}
      <motion.div
        className={`absolute rounded-full pointer-events-none ${color} ${sizeClasses[size]}`}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
        aria-hidden="true"
      />

      {/* Foreground slotted content (icon or element) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BreathingBlob;
