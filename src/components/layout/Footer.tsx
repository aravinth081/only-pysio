"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  ChevronRight,
  ArrowUp,
  MessageCircle,
  Calendar,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { siteContent } from "@/data/content";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { formatPhoneForTel } from "@/lib/utils";

export const Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative bg-gradient-to-b from-[#081F13] via-[#05180E] to-[#030E07] text-white pt-20 pb-10 overflow-hidden">
      {/* Top Luminous Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      {/* Dual Soft Ambient Lighting Spheres */}
      <div className="absolute -top-24 right-1/4 w-[420px] h-[420px] bg-emerald-500/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[360px] h-[360px] bg-teal-500/5 rounded-full filter blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-emerald-900/40">
          {/* Column 1: Brand Info & Socials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Interactive Logo & Brand Identity */}
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#hero");
              }}
              className="inline-flex items-center gap-4 mb-6 group focus:outline-none cursor-pointer"
              aria-label="OnlyPhysio - Scroll to top"
            >
              {/* Premium Circular Emblem Crest */}
              <div className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-full p-[2px] bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.45)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(52,211,153,0.7)] shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#202530] flex items-center justify-center">
                  <Image
                    src="/images/logo.jpg"
                    alt="OnlyPhysio Logo"
                    fill
                    className="object-cover scale-105"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl sm:text-[26px] font-black uppercase tracking-wider font-heading leading-tight text-white group-hover:text-emerald-300 transition-colors">
                    ONLY <span className="text-emerald-400">PHYSIO</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-xs">
                    CHENNAI
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300/90 font-heading">
                    {siteContent.brand.tagline}
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-sm text-slate-300/90 leading-relaxed max-w-sm mb-7 font-sans">
              {siteContent.brand.description}
            </p>

            {/* Social Media Interactive Icon Grid */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-white/90 font-heading">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {/* YouTube */}
                <a
                  href={siteContent.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:-translate-y-1 active:scale-90 transition-all duration-300 cursor-pointer"
                  aria-label="Watch PhysioTute's on YouTube"
                  title="YouTube - PhysioTutes"
                >
                  <Youtube className="w-4.5 h-4.5" />
                </a>

                {/* Instagram */}
                <a
                  href={siteContent.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:shadow-[0_0_20px_rgba(238,42,123,0.4)] hover:-translate-y-1 active:scale-90 transition-all duration-300 cursor-pointer"
                  aria-label="Follow OnlyPhysio on Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>

                {/* Facebook */}
                <a
                  href={siteContent.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] hover:-translate-y-1 active:scale-90 transition-all duration-300 cursor-pointer"
                  aria-label="Follow OnlyPhysio on Facebook"
                  title="Facebook"
                >
                  <Facebook className="w-4.5 h-4.5" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919042718811?text=Hi%20OnlyPhysio%2C%20I%20would%20like%20to%20know%20more%20about%20your%20home%20physiotherapy%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:-translate-y-1 active:scale-90 transition-all duration-300 cursor-pointer"
                  aria-label="Chat on WhatsApp"
                  title="WhatsApp Consultation"
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white font-heading">
                Quick Navigation
              </h4>
            </div>

            <ul className="space-y-2.5 font-heading text-sm">
              <li>
                <button
                  onClick={() => scrollTo("#hero")}
                  className="group flex items-center gap-2 py-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 text-left w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-semibold">
                    Home
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollTo("#about")}
                  className="group flex items-center gap-2 py-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 text-left w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-semibold">
                    About Us
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollTo("#conditions")}
                  className="group flex items-center gap-2 py-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 text-left w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-semibold">
                    Conditions We Treat
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollTo("#how-it-works")}
                  className="group flex items-center gap-2 py-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 text-left w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-semibold">
                    How It Works
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollTo("#physiotubes")}
                  className="group flex items-center gap-2 py-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 text-left w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-semibold">
                    PhysioTubes
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="group flex items-center gap-2 py-1 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 text-left w-full"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-semibold">
                    Contact Us
                  </span>
                </button>
              </li>

              {/* Featured Action: Book Appointment */}
              <li className="pt-2">
                <Link
                  href="/book"
                  prefetch={true}
                  className="p-3 rounded-xl bg-gradient-to-r from-emerald-600/30 to-emerald-500/15 hover:from-emerald-600/40 hover:to-emerald-500/25 border border-emerald-500/35 hover:border-emerald-400/70 text-white font-bold flex items-center justify-between transition-all duration-200 group shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] active:scale-95 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-sm font-black tracking-wide font-heading">Book Appointment</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>

              {/* Quick Action: Request Callback */}
              <li>
                <Link
                  href="/callback"
                  prefetch={true}
                  className="p-3 rounded-xl bg-gradient-to-r from-emerald-600/30 to-emerald-500/15 hover:from-emerald-600/40 hover:to-emerald-500/25 border border-emerald-500/35 hover:border-emerald-400/70 text-white font-bold flex items-center justify-between transition-all duration-200 group shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] active:scale-95 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-black tracking-wide font-heading">Request Fast Callback</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical Helpline & Direct Contact (4 cols) */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white font-heading">
                Clinical Helpline
              </h4>
            </div>

            <div className="space-y-3 font-sans">
              {/* Phone Direct Action */}
              <a
                href={`tel:${formatPhoneForTel(siteContent.contact.phone)}`}
                className="p-3 rounded-2xl bg-white/[0.02] hover:bg-emerald-950/60 active:bg-emerald-900/60 border border-white/10 hover:border-emerald-500/40 active:border-emerald-400 flex items-center justify-between transition-all duration-200 group active:scale-98 cursor-pointer shadow-xs select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/90 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white group-active:bg-emerald-500 group-active:text-white group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300 group-active:text-emerald-300 font-heading">
                      Direct Line · 24/7 Response
                    </span>
                    <span className="font-heading font-black text-sm text-white group-hover:text-white group-active:text-white transition-colors">
                      {siteContent.contact.phoneDisplay}
                    </span>
                  </div>
                </div>
              </a>

              {/* Email Direct Action */}
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="p-3 rounded-2xl bg-white/[0.02] hover:bg-emerald-950/60 active:bg-emerald-900/60 border border-white/10 hover:border-emerald-500/40 active:border-emerald-400 flex items-center justify-between transition-all duration-200 group active:scale-98 cursor-pointer shadow-xs select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/90 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white group-active:bg-emerald-500 group-active:text-white group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300 group-active:text-emerald-300 font-heading">
                      Clinical Inquiries
                    </span>
                    <span className="font-heading font-bold text-xs text-white group-hover:text-white group-active:text-white transition-colors">
                      {siteContent.contact.email}
                    </span>
                  </div>
                </div>
              </a>

              {/* Clinic Location */}
              <a
                href={siteContent.contact.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-white/[0.02] hover:bg-emerald-950/60 active:bg-emerald-900/60 border border-white/10 hover:border-emerald-500/40 active:border-emerald-400 flex items-start gap-3 transition-all duration-200 group active:scale-98 cursor-pointer shadow-xs select-none"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-950/90 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white group-active:bg-emerald-500 group-active:text-white group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-200 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300 group-active:text-emerald-300 font-heading">
                    Chennai Central Clinic
                  </span>
                  <span className="text-xs text-white font-medium group-hover:text-white group-active:text-white leading-relaxed block transition-colors">
                    {siteContent.contact.address.line1},{" "}
                    {siteContent.contact.address.line2},{" "}
                    {siteContent.contact.address.city} - {siteContent.contact.address.postalCode}
                  </span>
                </div>
              </a>

              {/* Operating Hours */}
              <div
                className="p-3 rounded-2xl bg-white/[0.02] hover:bg-emerald-950/60 active:bg-emerald-900/60 border border-white/10 hover:border-emerald-500/40 active:border-emerald-400 flex items-center justify-between text-xs transition-all duration-200 group active:scale-98 cursor-pointer shadow-xs select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/90 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-white group-active:bg-emerald-500 group-active:text-white group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-200">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300 group-active:text-emerald-300 font-heading">
                      Service Hours
                    </span>
                    <span className="text-xs text-white font-bold group-hover:text-white group-active:text-white transition-colors">
                      {siteContent.contact.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Notice, Legal Links & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-center sm:text-left">
            <span>
              © 2021 <strong className="text-slate-200 font-heading">OnlyPhysio</strong>. All Rights Reserved.
            </span>
            <div className="flex items-center gap-3 text-xs">
              <span className="hidden sm:inline text-slate-600">|</span>
              <Link
                href="/privacy-policy"
                className="text-slate-300 hover:text-emerald-400 active:text-emerald-300 font-medium transition-colors hover:underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/terms-and-conditions"
                className="text-slate-300 hover:text-emerald-400 active:text-emerald-300 font-medium transition-colors hover:underline underline-offset-4"
              >
                Terms of Condition
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {/* Back to Top Interactive Button */}
            <button
              onClick={() => {
                scrollTo(0, { duration: 0.35 });
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#059669] hover:bg-[#10b981] active:bg-[#047857] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 group cursor-pointer active:scale-95 shadow-[0_4px_16px_rgba(5,150,105,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.65)] hover:-translate-y-0.5"
              title="Scroll back to top"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-4 h-4 stroke-[3] group-hover:-translate-y-1 transition-transform duration-200 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
