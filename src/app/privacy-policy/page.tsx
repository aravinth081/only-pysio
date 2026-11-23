"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  HeartHandshake
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50 text-slate-900 font-sans flex flex-col justify-between relative selection:bg-emerald-500 selection:text-white">
      {/* 1. Website Header */}
      <Header />

      {/* 2. Main Policy Content */}
      <main className="pt-24 sm:pt-28 pb-20 flex-grow relative">
        {/* Soft Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[340px] bg-emerald-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb & Back Link */}
          <div className="mb-6 flex items-center justify-between text-xs sm:text-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 font-semibold transition-all shadow-soft-xs group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Link href="/" className="hover:text-emerald-700">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-emerald-700 font-bold">Privacy Policy</span>
            </div>
          </div>

          {/* Hero Header Card (Clean Solid White & High-Contrast Typography) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-lg mb-8 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-black uppercase tracking-wider mb-4 font-heading">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Patient Data &amp; Privacy Protection</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 font-heading tracking-tight mb-3">
              Privacy Policy – <span className="text-emerald-700">ONLY PHYSIO</span>
            </h1>

            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              At ONLY PHYSIO, your health, personal confidentiality, and data security are fundamental to our clinical care. This policy outlines how we collect, handle, protect, and use your information.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-semibold pt-4 border-t border-slate-100">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Effective Date: November 2026
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                SSL Encrypted &amp; Clinical Standards Compliant
              </span>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-6">
            {/* 1. Information Collection */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                  1. Information We Collect
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                <strong className="text-slate-950">ONLY PHYSIO</strong> collects personal information such as your name, phone number, email address, appointment details and relevant health information voluntarily provided for physiotherapy services.
              </p>
            </div>

            {/* 2. How We Use This Information */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                  2. How We Use This Information
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                We use this information to:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Manage appointment bookings.",
                  "Provide physiotherapy and rehabilitation services.",
                  "Respond to enquiries.",
                  "Coordinate home care services.",
                  "Improve our website and patient experience.",
                  "Send appointment confirmations and service updates."
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:border-emerald-300 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-800 text-xs sm:text-sm font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Additional Privacy Provisions */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                  3. Security & Privacy Rights
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                All other sections of the Privacy Policy remain applicable, including data security, cookies, third-party links, data retention and privacy rights. We maintain stringent technical safeguards to prevent unauthorized access or disclosure of confidential patient records.
              </p>
            </div>

            {/* 4. Contact Information Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 font-heading">
                  Support & Queries
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight mt-1">
                  Contact Information
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  If you have any questions regarding your data or our privacy practices, please contact us directly:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {/* Email */}
                <a
                  href="mailto:OnlyPhysio21@gmail.com"
                  className="p-4 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-300 transition-all group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500 font-heading">Email Us</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 break-all transition-colors">
                      OnlyPhysio21@gmail.com
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+919042718811"
                  className="p-4 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-300 transition-all group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500 font-heading">Call / WhatsApp</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      +91 9042718811
                    </span>
                  </div>
                </a>

                {/* Address */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500 font-heading">Clinic Address</span>
                    <span className="text-xs text-slate-700 font-medium leading-snug block">
                      No-23, 12, Mariamman Kovil Street, KK Nagar West, Nesapakkam, Chennai, Tamil Nadu – 600078, India.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Website Footer */}
      <Footer />
    </div>
  );
}
