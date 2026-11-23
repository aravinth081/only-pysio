import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PhysioTubes from "@/components/sections/PhysioTubes";
import Link from "next/link";
import { ArrowLeft, Youtube, ExternalLink, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "PhysioTubes · Clinical Video Demonstrations & Anatomy Guides | OnlyPhysio",
  description:
    "Watch high-definition physiotherapy tutorials, joint biomechanics, and rehabilitation techniques directly from OnlyPhysio YouTube channel @onlyphysio5993.",
};

export default function PhysioTubesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8FAF8] pt-28">
        {/* Breadcrumb & Quick Hero Banner */}
        <div className="bg-white border-b border-slate-200/80 py-6">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs font-heading transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </Link>

              <span className="text-slate-300">/</span>

              <span className="font-heading font-black text-xs uppercase tracking-wider text-emerald-800">
                PhysioTubes Reel
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@onlyphysio5993?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white font-heading font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow hover:scale-103 active:scale-95"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FFFFFF"/>
                  <polygon points="9.545,15.568 15.818,12 9.545,8.432" fill="#FF0000"/>
                </svg>
                <span>Subscribe Now</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#14532D] hover:bg-[#166534] text-white font-bold text-xs font-heading transition-colors shadow-2xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Physio</span>
              </Link>
            </div>
          </div>
        </div>

        {/* PhysioTubes 3x3 Video Grid & Interactive Player */}
        <PhysioTubes />
      </main>

      <Footer />
    </>
  );
}
