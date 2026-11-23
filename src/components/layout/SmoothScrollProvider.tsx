"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Check if reduced motion is requested
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Initialize high-performance Lenis smooth scroller
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    // Initial hash scroll check if arriving from another route with #hash
    if (typeof window !== "undefined" && window.location.hash) {
      const initialHash = window.location.hash;
      setTimeout(() => {
        lenis.scrollTo(initialHash, { offset: -85, duration: 0.8 });
      }, 350);
    }

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Connect GSAP ticker to Lenis requestAnimationFrame
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => {
    const isTopTarget =
      target === 0 ||
      target === "0" ||
      target === "#hero" ||
      target === "top" ||
      target === "#top";

    if (lenisInstance) {
      if (isTopTarget) {
        lenisInstance.scrollTo(0, {
          offset: 0,
          duration: options?.duration ?? 0.35, // Semma fast & silky smooth to top
          immediate: options?.immediate ?? false,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        lenisInstance.scrollTo(target as any, {
          offset: options?.offset ?? -80,
          duration: options?.duration ?? 0.75,
        });
      }
    } else {
      if (isTopTarget) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else if (target) {
        (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
