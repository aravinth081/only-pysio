"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const PageIntro: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Keep intro strictly under 1.2s as specified
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="page-intro"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-white pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: "easeInOut" },
          }}
        >
          {/* Green Wipe Curtain Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-deep via-primary to-emerald-600"
            initial={{ scaleY: 1 }}
            exit={{
              scaleY: 0,
              transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
            }}
            style={{ originY: 0 }}
          />

          {/* Center Brand Badge Reveal */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3 px-6 py-4 rounded-2xl bg-navy-badge shadow-2xl border border-white/10"
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#202530] border-2 border-emerald-500/50 p-0 shadow-lg flex items-center justify-center">
              <img
                src="/images/logo.jpg"
                alt="OnlyPhysio Logo"
                className="w-full h-full object-cover scale-[1.38]"
                loading="eager"
              />
            </div>
            <div className="text-center">
              <span className="block text-base font-bold tracking-tight text-white font-heading">
                OnlyPhysio
              </span>
              <span className="block text-[10px] tracking-widest uppercase font-semibold text-emerald-400">
                Expert Homecare
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageIntro;
