"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { useSmoothScroll } from "./SmoothScrollProvider";

export const FloatingActions: React.FC = () => {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const [whatsAppGlow, setWhatsAppGlow] = useState(false);
  const [callGlow, setCallGlow] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setShowTopBtn(window.scrollY > 400);
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Never render floating WhatsApp or Call buttons in the Admin portal
  if (pathname === "/admin" || pathname?.startsWith("/admin")) {
    return null;
  }

  // Direct WhatsApp link to 9042718811 with pre-filled clinical message
  const prefilledMessage = encodeURIComponent(
    "Hello OnlyPhysio! I would like to consult with a senior physiotherapist for homecare treatment in Chennai. Guide me."
  );
  const whatsappLink = `https://wa.me/919042718811?text=${prefilledMessage}`;

  const handleWhatsAppClick = () => {
    setWhatsAppGlow(true);
    setTimeout(() => setWhatsAppGlow(false), 800);
  };

  const handleCallClick = () => {
    setCallGlow(true);
    setTimeout(() => setCallGlow(false), 800);
  };

  return (
    <>
      {/* ========================================================
          1. BOTTOM-LEFT: Floating WhatsApp Button (Direct 1-Click to WhatsApp)
         ======================================================== */}
      <aside
        aria-label="Direct WhatsApp Contact"
        className="fixed bottom-6 sm:bottom-8 left-4 sm:left-7 z-50 select-none"
      >
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          aria-label="Chat directly on WhatsApp with OnlyPhysio (9042718811)"
          className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white transition-all duration-300 active:scale-90 ${
            whatsAppGlow
              ? "shadow-[0_0_35px_#25D366,0_0_70px_rgba(37,211,102,0.85)] scale-110 ring-4 ring-[#25D366]/40"
              : "shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_0_30px_rgba(37,211,102,0.85)] hover:scale-110"
          }`}
        >
          {/* Continuous Ambient Breathing Halo Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

          {/* Click Neon Flash Ripple Wave */}
          <AnimatePresence>
            {whatsAppGlow && (
              <motion.span
                initial={{ scale: 0.85, opacity: 1 }}
                animate={{ scale: 2.4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-[#25D366] bg-[#25D366]/40 pointer-events-none shadow-[0_0_30px_#25D366]"
              />
            )}
          </AnimatePresence>

          {/* WhatsApp Icon */}
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10 drop-shadow" />
        </a>
      </aside>

      {/* ========================================================
          2. BOTTOM-RIGHT: Floating Helpline Call Button (Direct 1-Click to Dialer)
         ======================================================== */}
      <aside
        aria-label="Helpline Call Contact"
        className="fixed bottom-6 sm:bottom-8 right-4 sm:right-7 z-50 select-none"
      >
        <a
          href="tel:+919042718811"
          onClick={handleCallClick}
          aria-label="Call OnlyPhysio Helpline directly (+91 90427 18811)"
          className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white transition-all duration-300 active:scale-90 ${
            callGlow
              ? "shadow-[0_0_35px_#2563EB,0_0_70px_rgba(37,99,235,0.85)] scale-110 ring-4 ring-blue-400/40"
              : "shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:shadow-[0_0_30px_rgba(37,99,235,0.85)] hover:scale-110"
          }`}
        >
          {/* Continuous Ambient Breathing Halo Ring */}
          <span className="absolute inset-0 rounded-full bg-blue-500 opacity-40 animate-ping pointer-events-none" />

          {/* Click Neon Flash Ripple Wave */}
          <AnimatePresence>
            {callGlow && (
              <motion.span
                initial={{ scale: 0.85, opacity: 1 }}
                animate={{ scale: 2.4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-blue-400 bg-blue-500/40 pointer-events-none shadow-[0_0_30px_#2563EB]"
              />
            )}
          </AnimatePresence>

          {/* Phone Icon with gentle ringing bounce on hover */}
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current relative z-10 drop-shadow group-hover:rotate-12 transition-transform duration-200" />
        </a>
      </aside>

      {/* ========================================================
          3. FLOATING TOP BUTTON: Super fast scroll to top
         ======================================================== */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.aside
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to top"
            className="fixed bottom-22 sm:bottom-26 right-4 sm:right-7 z-50 select-none"
          >
            <button
              onClick={() => {
                scrollTo(0, { duration: 0.35 });
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              title="Scroll back to top"
              aria-label="Back to top"
              className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-heading font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 shadow-[0_4px_16px_rgba(5,150,105,0.45)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]"
            >
              <span>TOP</span>
              <ArrowUp className="w-4 h-4 stroke-[3]" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActions;
