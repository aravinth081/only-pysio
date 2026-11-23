"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    /* Top 3px Green Gradient Progress Bar Only */
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-primary-glow z-50 origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
