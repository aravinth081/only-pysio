"use client";

import React from "react";
import Link from "next/link";
import { 
  FileCheck2, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Scale, 
  AlertCircle, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  ShieldAlert,
  CreditCard,
  RotateCcw,
  Home,
  UserCheck,
  Copyright,
  ExternalLink,
  HelpCircle
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsAndConditionsPage() {
  const servicesList = [
    "Physiotherapy and Rehabilitation",
    "Pilates Rehab & Fitness",
    "Sports Massage",
    "Rehab Training",
    "Functional Movement Screening",
    "Physio Rehab Group Exercises",
    "Spinal Decompression Therapy",
    "Antenatal and Postnatal Rehabilitation",
    "Neuro Rehabilitation",
    "Paediatric Rehabilitation",
    "Geriatric Rehabilitation",
    "Home Care Services"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50 text-slate-900 font-sans flex flex-col justify-between relative selection:bg-emerald-500 selection:text-white">
      {/* 1. Website Header */}
      <Header />

      {/* 2. Main Terms Content */}
      <main className="pt-24 sm:pt-28 pb-20 flex-grow relative">
        {/* Ambient Glow */}
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
              <span className="text-emerald-700 font-bold">Terms & Conditions</span>
            </div>
          </div>

          {/* Hero Header Card (Clean Solid White & High-Contrast Typography) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-lg mb-8 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-black uppercase tracking-wider mb-4 font-heading">
              <Scale className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Patient &amp; Service Agreement</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 font-heading tracking-tight mb-3">
              Terms &amp; Conditions – <span className="text-emerald-700">ONLY PHYSIO</span>
            </h1>

            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              These terms govern your access to our clinical services, homecare physiotherapy treatments, and website booking facilities. Please review them carefully.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-semibold pt-4 border-t border-slate-100">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Effective Date: 23 November 2026
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Legally Binding Clinical Terms
              </span>
            </div>
          </div>

          {/* 15 Terms & Conditions Sections */}
          <div className="space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
            {/* Section 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">1</span>
                <span>Introduction</span>
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Welcome to <strong className="text-slate-950">ONLY PHYSIO</strong>. These Terms & Conditions govern your access to and use of our website, physiotherapy services, rehabilitation treatments and appointment booking facilities.
              </p>
              <p className="text-slate-700 leading-relaxed">
                By accessing or using our website, you agree to comply with these Terms & Conditions.
              </p>
            </div>

            {/* Section 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">2</span>
                <span>Our Services</span>
              </h2>
              <p className="text-slate-700">
                <strong className="text-slate-950">ONLY PHYSIO</strong> provides physiotherapy and rehabilitation services, including:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {servicesList.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{service}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 italic pt-1">
                Services are subject to availability and professional clinical assessment.
              </p>
            </div>

            {/* Section 3 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">3</span>
                <span>Appointment Bookings</span>
              </h2>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Appointments can be requested through our website or by contacting us directly.",
                  "Booking requests are subject to confirmation and therapist availability.",
                  "Customers must provide accurate booking and contact information.",
                  "Please inform us in advance if you need to cancel or reschedule an appointment.",
                  "ONLY PHYSIO reserves the right to reschedule appointments when necessary."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 border border-amber-200/80 shadow-soft-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg sm:text-xl font-black font-heading">
                  4. Medical Disclaimer
                </h2>
              </div>
              <p className="text-slate-800 text-sm font-medium">
                Physiotherapy and rehabilitation treatments are provided based on individual patient requirements and professional assessment.
              </p>
              <ul className="space-y-2 pt-1 text-slate-700 text-sm">
                {[
                  "Treatment results may vary from person to person.",
                  "We do not guarantee specific recovery timelines or medical outcomes.",
                  "Patients should provide accurate information about their medical history and existing conditions.",
                  "Patients must inform their therapist about any discomfort or changes in their health during treatment.",
                  "Website content is for general informational purposes and does not replace professional medical consultation."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300/80 text-amber-950 font-bold text-xs sm:text-sm mt-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>In case of a medical emergency, seek immediate medical assistance.</span>
              </div>
            </div>

            {/* Section 5 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">5</span>
                <span>Payments and Fees</span>
              </h2>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Applicable service charges will be communicated before treatment.",
                  "Payments must be completed through the payment methods accepted by ONLY PHYSIO.",
                  "Additional charges, if applicable, will be communicated in advance.",
                  "Any applicable taxes will be handled according to relevant regulations.",
                  "Payment confirmation does not guarantee appointment availability unless the booking is confirmed."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 6 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">6</span>
                <span>Cancellation and Refund Policy</span>
              </h2>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Appointment cancellations and rescheduling requests should be communicated in advance.",
                  "Refund eligibility depends on the service booked and applicable cancellation conditions.",
                  "Approved refunds will be processed through the applicable payment method within a reasonable period.",
                  "Any non-refundable charges will be communicated before payment."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 pt-1">
                Nothing in this section limits rights available to consumers under applicable law.
              </p>
            </div>

            {/* Section 7 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">7</span>
                <span>Home Care Services</span>
              </h2>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Home physiotherapy services are subject to therapist availability and service-area coverage.",
                  "Customers must provide accurate address and contact details.",
                  "Patients should ensure a safe and suitable environment for treatment.",
                  "Applicable home visit charges will be communicated before confirmation."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 8 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">8</span>
                <span>User Responsibilities</span>
              </h2>
              <p className="text-slate-700">By using our website and services, you agree to:</p>
              <ul className="space-y-2.5 pt-1">
                {[
                  "Provide accurate and complete information.",
                  "Use our website for lawful purposes.",
                  "Avoid submitting false or misleading information.",
                  "Respect our staff, therapists and other patients.",
                  "Follow instructions provided by physiotherapy professionals.",
                  "Avoid activities that may affect website security or functionality."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 9 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">9</span>
                <span>Website Content and Intellectual Property</span>
              </h2>
              <p className="text-slate-700">
                All website content, including logos, text, graphics, images, designs and branding, belongs to <strong className="text-slate-950">ONLY PHYSIO</strong> or its respective content owners unless otherwise stated.
              </p>
              <p className="text-slate-700">
                You may not reproduce, distribute, modify or commercially use our website content without prior written permission.
              </p>
            </div>

            {/* Section 10 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">10</span>
                <span>Third-Party Links</span>
              </h2>
              <p className="text-slate-700">
                Our website may include links to external platforms such as Instagram, YouTube, WhatsApp, Facebook and Google Reviews.
              </p>
              <p className="text-slate-700">
                These platforms operate independently and are governed by their own terms and privacy policies.
              </p>
            </div>

            {/* Section 11 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">11</span>
                <span>Limitation of Liability</span>
              </h2>
              <p className="text-slate-700">
                <strong className="text-slate-950">ONLY PHYSIO</strong> makes reasonable efforts to provide reliable services and accurate website information.
              </p>
              <p className="text-slate-700">
                To the extent permitted by applicable law, we are not responsible for:
              </p>
              <ul className="space-y-2 pt-1 text-slate-700 text-sm">
                {[
                  "Temporary website interruptions or technical issues.",
                  "Incorrect information submitted by users.",
                  "Service delays caused by circumstances beyond our reasonable control.",
                  "Failure to follow professional instructions.",
                  "Third-party website content or services."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 pt-1">
                Nothing in these Terms excludes liability that cannot legally be excluded under applicable law.
              </p>
            </div>

            {/* Section 12 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">12</span>
                <span>Privacy and Personal Information</span>
              </h2>
              <p className="text-slate-700">
                Your personal information is handled in accordance with our{" "}
                <Link href="/privacy-policy" className="text-emerald-700 hover:text-emerald-800 font-bold underline underline-offset-4">
                  Privacy Policy
                </Link>{" "}
                and applicable data protection laws.
              </p>
            </div>

            {/* Section 13 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">13</span>
                <span>Changes to Terms & Conditions</span>
              </h2>
              <p className="text-slate-700">
                <strong className="text-slate-950">ONLY PHYSIO</strong> reserves the right to update or modify these Terms & Conditions when necessary.
              </p>
              <p className="text-slate-700">
                Updated terms will be published on this page with a revised effective date.
              </p>
            </div>

            {/* Section 14 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">14</span>
                <span>Governing Law and Jurisdiction</span>
              </h2>
              <p className="text-slate-700">
                These Terms & Conditions are governed by the applicable laws of India.
              </p>
              <p className="text-slate-700">
                Any disputes arising in connection with these terms will be subject to the jurisdiction of competent courts in Chennai, Tamil Nadu, subject to applicable law.
              </p>
            </div>

            {/* Section 15 & Contact Information */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft-sm space-y-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 font-heading">
                  Section 15
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading tracking-tight mt-1">
                  Contact Information – ONLY PHYSIO
                </h2>
                <p className="text-emerald-700 font-semibold text-sm mt-1">
                  ONLY PHYSIO – Your Recovery. Our Priority.
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
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500 font-heading">Email</span>
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
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500 font-heading">Phone</span>
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

              <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
                © 2026 ONLY PHYSIO. All Rights Reserved.
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
