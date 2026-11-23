"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  ArrowUpRight, 
  Calendar, 
  ChevronRight,
  Home,
  HeartHandshake,
  Activity,
  Workflow,
  Youtube,
  PhoneCall
} from "lucide-react";
import { siteContent } from "@/data/content";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { formatPhoneForTel } from "@/lib/utils";

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [topBarIndex, setTopBarIndex] = useState(0);
  const isNavigatingRef = useRef(false);
  const navTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollTo } = useSmoothScroll();

  const topBarItems = [
    {
      id: "email",
      icon: Mail,
      label: siteContent.contact.email,
      href: `mailto:${siteContent.contact.email}`,
      isExternal: true,
    },
    {
      id: "phone",
      icon: Phone,
      label: siteContent.contact.phoneDisplay,
      href: `tel:${formatPhoneForTel(siteContent.contact.phone)}`,
      isExternal: true,
    },
    {
      id: "hours",
      icon: Clock,
      label: siteContent.contact.hours,
      href: "#contact",
      isExternal: false,
    },
  ];

  // Rotate top utility bar items one by one every 3.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setTopBarIndex((prev) => (prev + 1) % topBarItems.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [topBarItems.length]);

  const navItems = [
    { id: "hero", label: "HOME", href: "#hero", isPage: false },
    { id: "about", label: "ABOUT US", href: "#about", isPage: false },
    { id: "conditions", label: "SERVICES", href: "#conditions", isPage: false },
    { id: "how-it-works", label: "HOW IT WORKS", href: "#how-it-works", isPage: false },
    { id: "booking", label: "BOOKING", href: "#booking", isPage: false },
    { id: "physiotubes", label: "PHYSIOTUBES", href: "#physiotubes", isPage: false },
    { id: "contact", label: "CONTACTS", href: "#contact", isPage: false },
  ];

  // Helper to accurately determine active item across all routes
  const getIsActive = (id: string) => {
    if (pathname === "/callback" || pathname?.startsWith("/callback")) {
      return id === "callback";
    }
    if (pathname === "/book" || pathname?.startsWith("/book")) {
      return id === "booking";
    }
    if (pathname !== "/") {
      return false;
    }
    return activeSection === id;
  };

  // Prefetch booking and callback routes for instantaneous page transitions
  useEffect(() => {
    router.prefetch("/book");
    router.prefetch("/callback");
  }, [router]);

  // Check stored section or hash on route change to homepage
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      const stored = sessionStorage.getItem("onlyphysio_target_section");
      const hash = window.location.hash ? window.location.hash.replace("#", "") : "";
      const targetId = stored || hash;

      if (targetId) {
        sessionStorage.removeItem("onlyphysio_target_section");
        isNavigatingRef.current = true;
        setActiveSection(targetId);

        const timer = setTimeout(() => {
          scrollTo("#" + targetId, { offset: -85 });
          setTimeout(() => {
            isNavigatingRef.current = false;
          }, 1200);
        }, 300);

        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  // Robust, continuous ScrollSpy: Glides line indicator straight across every section in order
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Only perform scrollSpy section tracking on the homepage when not in an active transition
      if (pathname === "/" && !isNavigatingRef.current) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // 1. Top of page -> HOME
        if (scrollY < 160) {
          setActiveSection("hero");
          return;
        }

        // 2. End of page -> CONTACT
        if (scrollY + windowHeight >= documentHeight - 120) {
          setActiveSection("contact");
          return;
        }

        // 3. Inspect sections in reverse order (bottom to top)
        const triggerPoint = 220; // Trigger line offset from viewport top
        const trackedSections = [
          { id: "contact", el: document.getElementById("contact") },
          { id: "physiotubes", el: document.getElementById("physiotubes") },
          { id: "booking", el: document.getElementById("booking") },
          { id: "how-it-works", el: document.getElementById("how-it-works") },
          { id: "conditions", el: document.getElementById("conditions") },
          { id: "about", el: document.getElementById("about") },
        ];

        for (const sec of trackedSections) {
          if (sec.el) {
            const rect = sec.el.getBoundingClientRect();
            if (rect.top <= triggerPoint) {
              setActiveSection(sec.id);
              return;
            }
          }
        }

        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Lock body scroll and support Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Unified navigation click handler that guarantees smooth, accurate transitions
  const handleNavClick = (item: { id: string; href: string; isPage?: boolean; isExternal?: boolean }) => {
    setMobileMenuOpen(false);

    if (item.isExternal) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.isPage) {
      router.push(item.href);
      return;
    }

    // Hash link to homepage section
    if (pathname !== "/") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("onlyphysio_target_section", item.id);
      }
      router.push("/" + item.href);
      return;
    }

    // Already on homepage: lock scrollspy, update active indicator immediately, and scroll smoothly
    isNavigatingRef.current = true;
    setActiveSection(item.id);
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1200);

    scrollTo(item.href, { offset: -85 });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 select-none">
      {/* 1. Top Utility Bar (Premium Deep Forest Clinical Bar with Smooth One-by-One Sliding Motion) */}
      <div
        className={`bg-[#0c2e1b] text-white/95 text-[11px] sm:text-xs transition-all duration-300 border-b border-emerald-900/60 overflow-hidden ${
          isScrolled ? "h-0 opacity-0 py-0" : "py-1.5 opacity-100"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 relative flex items-center justify-center">
          <div className="relative h-6 w-full max-w-xl flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {(() => {
                const currentItem = topBarItems[topBarIndex];
                const IconComponent = currentItem.icon;
                return (
                  <motion.div
                    key={currentItem.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.36, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <a
                      href={currentItem.href}
                      onClick={(e) => {
                        if (!currentItem.isExternal && currentItem.href.startsWith("#")) {
                          e.preventDefault();
                          handleNavClick({
                            id: currentItem.href.replace("#", ""),
                            href: currentItem.href,
                          });
                        }
                      }}
                      className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-emerald-100 hover:text-white hover:bg-emerald-900/60 transition-colors font-medium cursor-pointer"
                    >
                      <IconComponent className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold tracking-wide truncate">{currentItem.label}</span>
                    </a>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Permanent Sticky Header across the whole site) */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-2 sm:py-2.5"
            : "bg-white/85 backdrop-blur-sm shadow-xs border-b border-slate-100/60 py-2.5 sm:py-3"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo with Navy #202530 Badge (Compact & Refined) */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                handleNavClick({ id: "hero", href: "#hero", isPage: false });
              }
            }}
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="OnlyPhysio - Home"
          >
            {/* Brand Logo with Executive Circular Gold Bezel Ring */}
            <div className="relative group/logo shrink-0">
              {/* Refined Ambient Warm Backlight */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/20 via-slate-200/30 to-amber-400/20 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Smooth Circulating Luxury Champagne-Gold Metallic Bezel */}
              <div className="relative p-[2.5px] rounded-full overflow-hidden shadow-md ring-1 ring-slate-900/10">
                <div
                  className="absolute inset-[-120%] animate-[spin_9s_linear_infinite]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #d97706 0%, #fef08a 25%, #92400e 50%, #fde68a 75%, #d97706 100%)",
                  }}
                />

                {/* Inner Circular Logo Housing */}
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-[#181f2a] flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-105 shadow-inner">
                  <img
                    src="/images/logo.jpg"
                    alt="OnlyPhysio Brand Logo"
                    className="w-full h-full object-cover scale-[1.38] rounded-full"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-950 font-heading leading-tight group-hover:text-primary transition-colors">
                ONLY PHYSIO
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary">
                Expert Homecare
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Dynamic ScrollSpy with Spring Gliding Indicator) */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-xs xl:text-[13px] font-black uppercase tracking-wider">
            {navItems.map((item) => {
              const isActive = getIsActive(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`relative py-1.5 px-0.5 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive ? "text-primary font-bold" : "text-slate-950 hover:text-primary"
                  }`}
                >
                  <span>{item.label}</span>

                  {/* Active Smooth Gliding Indicator with Neon Shadow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-primary shadow-[0_0_10px_#16A34A]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Desktop Book Appointment CTA Button - Glides directly to Booking Section */}
            <button
              onClick={() => {
                if (pathname === "/") {
                  scrollTo("#booking", { duration: 0.45, offset: -85 });
                } else {
                  router.push("/#booking");
                }
              }}
              className="group relative hidden sm:inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-primary to-emerald-500 hover:from-primary-hover hover:via-emerald-600 hover:to-emerald-700 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(22,163,74,0.35)] hover:shadow-[0_6px_24px_rgba(22,163,74,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Animated Sheen Sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

              {/* Icon Badge */}
              <div className="w-5 h-5 rounded-full bg-emerald-800/60 border border-white/20 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                <Calendar className="w-3 h-3 text-white" />
              </div>

              {/* Button Text */}
              <span className="relative z-10 tracking-wider">BOOK APPOINTMENT</span>
            </button>

            {/* Mobile Click-to-Call Always Visible Icon */}
            <a
              href={`tel:${formatPhoneForTel(siteContent.contact.phone)}`}
              className="sm:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-primary-mint text-primary-deep shadow-sm active:scale-95"
              aria-label="Call OnlyPhysio immediately"
            >
              <Phone className="w-5 h-5 text-primary" />
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Animated Full-Height Slide-in Drawer with Cascading Open Effects */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 lg:hidden bg-slate-950/70 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%", opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="absolute right-0 top-0 bottom-0 w-[88vw] max-w-sm bg-white shadow-2xl p-4 sm:p-6 flex flex-col justify-between overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-3.5">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    {/* Brand Logo with Executive Circular Gold Bezel Ring */}
                    <div className="relative shrink-0">
                      {/* Refined Ambient Warm Backlight */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/20 via-slate-200/30 to-amber-400/20 blur-sm opacity-60" />

                      {/* Smooth Circulating Luxury Champagne-Gold Metallic Bezel */}
                      <div className="relative p-[2px] rounded-full overflow-hidden shadow-md ring-1 ring-slate-900/10">
                        <div
                          className="absolute inset-[-120%] animate-[spin_9s_linear_infinite]"
                          style={{
                            background:
                              "conic-gradient(from 0deg, #d97706 0%, #fef08a 25%, #92400e 50%, #fde68a 75%, #d97706 100%)",
                          }}
                        />
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#181f2a] flex items-center justify-center border border-white/20 shadow-inner">
                          <img
                            src="/images/logo.jpg"
                            alt="OnlyPhysio Logo"
                            className="w-full h-full object-cover scale-[1.38] rounded-full"
                            loading="eager"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="block font-black uppercase tracking-wider text-slate-950 font-heading text-sm sm:text-base leading-tight">
                        ONLY PHYSIO
                      </span>
                      <span className="block text-[9px] uppercase font-bold tracking-widest text-primary">
                        Expert Homecare
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9, rotate: 90 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Navigation Links: Clean, Minimal, Professional */}
                <nav className="flex flex-col gap-2 pt-1">
                  {[
                    { id: "hero", label: "HOME", icon: Home, href: "#hero" },
                    { id: "about", label: "ABOUT US", icon: HeartHandshake, href: "#about" },
                    { id: "conditions", label: "SERVICES", icon: Activity, href: "#conditions" },
                    { id: "how-it-works", label: "HOW IT WORKS", icon: Workflow, href: "#how-it-works" },
                    { id: "booking", label: "BOOKING", icon: Calendar, href: "#booking" },
                    { id: "physiotubes", label: "PHYSIOTUBES", icon: Youtube, href: "#physiotubes" },
                    { id: "contact", label: "CONTACTS", icon: PhoneCall, href: "#contact" },
                  ].map((item, idx) => {
                    const isActive = getIsActive(item.id);
                    const IconComp = item.icon;

                    return (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + idx * 0.03, duration: 0.22, ease: "easeOut" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleNavClick(item)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                          isActive
                            ? "bg-emerald-50 text-emerald-950 font-extrabold border border-emerald-300/80 shadow-xs"
                            : "bg-slate-50/70 hover:bg-slate-100 text-slate-800 font-bold border border-slate-200/60"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-white text-emerald-700 border border-slate-200/80 shadow-2xs"
                            }`}
                          >
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span className="text-[13px] font-black tracking-wider uppercase font-heading truncate">
                            {item.label}
                          </span>
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse ml-0.5" />
                          )}
                        </div>

                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isActive ? "text-emerald-700 translate-x-0.5" : "text-slate-400"
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Quick Contact CTAs */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 mt-auto">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (pathname === "/") {
                      scrollTo("#booking", { duration: 0.45, offset: -85 });
                    } else {
                      router.push("/#booking");
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-primary to-emerald-500 text-white font-black uppercase tracking-wider text-xs shadow-[0_4px_14px_rgba(22,163,74,0.35)] active:scale-95 cursor-pointer hover:shadow-lg transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>BOOK APPOINTMENT</span>
                </button>

                <a
                  href={`tel:${formatPhoneForTel(siteContent.contact.phone)}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-800 font-bold uppercase tracking-wider text-xs hover:bg-slate-50 active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>CALL {siteContent.contact.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
