"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  PhoneCall, 
  User, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Send, 
  HelpCircle,
  ChevronRight,
  Lock,
  Check,
  Download,
  Share2
} from "lucide-react";
import confetti from "canvas-confetti";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ComboboxInput from "@/components/ui/ComboboxInput";
import { createCallbackRequest, CallbackData } from "@/lib/firebase";
import { downloadSlipAsImage, shareSlipOnWhatsApp, SlipData } from "@/lib/generateSlip";

export default function RequestCallbackPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    locationArea: "",
    primaryConcern: "",
    preferredTime: "Immediately" as CallbackData["preferredTime"],
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [callbackId, setCallbackId] = useState("");

  // Preload logo and official seal for instantaneous 0ms display on bill generation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sealImg = new window.Image();
      sealImg.src = "/images/official-seal.png";
      const logoImg = new window.Image();
      logoImg.src = "/images/logo.jpg";
    }
  }, []);

  const chennaiAreas = [
    "Anna Nagar, Chennai",
    "T. Nagar, Chennai",
    "Adyar, Chennai",
    "Velachery, Chennai",
    "Mylapore, Chennai",
    "Alwarpet, Chennai",
    "Besant Nagar, Chennai",
    "OMR / Perungudi / Sholinganallur",
    "Nungambakkam, Chennai",
    "Kilpauk, Chennai",
    "Porur, Chennai",
    "Tambaram / Chromepet",
    "Guindy / Ekkattuthangal",
    "Other Locality in Chennai",
  ];

  const concernOptions = [
    "Severe Back & Spine Pain / Sciatica",
    "Knee Rehab / Knee Replacement Post-Op Care",
    "Stroke & Neurological Paralysis Rehab",
    "Post-Surgery Home Physiotherapy Plan",
    "Elderly Bedridden Mobility & Caregiver Support",
    "Frozen Shoulder / Rotator Cuff Rehabilitation",
    "Physiotherapy Equipment Rental (Laser, CPM, TENS)",
    "General Session Pricing & Consultation Query",
  ];

  const timeOptions: CallbackData["preferredTime"][] = [
    "Immediately",
    "Morning (9 AM - 12 PM)",
    "Afternoon (12 PM - 4 PM)",
    "Evening (4 PM - 8 PM)",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert("Please provide your name and phone number.");
      return;
    }

    setLoading(true);

    try {
      const result = await createCallbackRequest({
        fullName: formData.fullName,
        phone: formData.phone,
        locationArea: formData.locationArea,
        primaryConcern: formData.primaryConcern,
        preferredTime: formData.preferredTime,
      });

      const genId = result.id;
      setCallbackId(genId);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#10B981", "#34D399", "#16A34A", "#FBBF24"],
        });
      } catch (err) {}

    } catch (err) {
      console.error(err);
      alert("Could not submit request. Please call 9042718811 directly.");
    } finally {
      setLoading(false);
    }
  };

  const getSlipData = (): SlipData => {
    return {
      type: "callback",
      refId: callbackId,
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.locationArea || "Chennai",
      condition: formData.primaryConcern || "General Physiotherapy Inquiry",
      preferredTimeSlot: formData.preferredTime || "Immediately",
    };
  };

  const handleDownloadSlip = () => {
    downloadSlipAsImage(getSlipData());
  };

  const handleShareSlip = () => {
    const msg = [
      "*ONLYPHYSIO CHENNAI - CALLBACK REQUEST SLIP*",
      "------------------------------------",
      `Request ID: ${callbackId}`,
      `Patient Name: ${formData.fullName}`,
      `Phone: ${formData.phone}`,
      `Area: ${formData.locationArea || "Chennai"}`,
      `Concern: ${formData.primaryConcern}`,
      `Preferred Time: ${formData.preferredTime}`,
      "------------------------------------",
      "Status: Registered with OnlyPhysio Chennai. Coordinator: +91 90427 18811"
    ].join("\n");

    shareSlipOnWhatsApp(getSlipData(), msg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/25 to-slate-50 text-slate-900 font-sans flex flex-col justify-between relative">
      {/* 1. Main Website Header */}
      <Header />

      {/* 2. Page Content */}
      <main className="pt-24 sm:pt-28 pb-20 flex-grow relative">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Main Centered Callback Form Section */}
        <section className="container mx-auto px-4 sm:px-6 max-w-3xl">
          {!submitted ? (
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* STEP 1: Caller & Patient Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center font-heading">1</span>
                      <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 font-heading">
                        Caller & Patient Details
                      </h2>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Required
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S. Meenakshi"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Mobile / WhatsApp Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number (e.g. 9840123456)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 2: Chennai Locality & Concern */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center font-heading">2</span>
                      <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 font-heading">
                        Chennai Locality & Primary Health Concern
                      </h2>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Required
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Chennai Area / Locality *</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold lowercase tracking-normal">(select or type manual)</span>
                    </label>
                    <ComboboxInput
                      value={formData.locationArea}
                      onChange={(val) => setFormData({ ...formData, locationArea: val })}
                      options={chennaiAreas}
                      placeholder="Select Chennai area or type custom location..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>What Can We Help You With? *</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold lowercase tracking-normal">(select or type manual)</span>
                    </label>
                    <ComboboxInput
                      value={formData.primaryConcern}
                      onChange={(val) => setFormData({ ...formData, primaryConcern: val })}
                      options={concernOptions}
                      placeholder="Select health concern or type custom query..."
                      required
                    />
                  </div>
                </div>

                {/* STEP 3: Preferred Callback Window */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center font-heading">3</span>
                      <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 font-heading">
                        Preferred Callback Window
                      </h2>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      Flexible
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeOptions.map((time) => {
                      const isSelected = formData.preferredTime === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setFormData({ ...formData, preferredTime: time })}
                          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex items-center justify-between ${
                            isSelected
                              ? "bg-emerald-50/90 border-emerald-600 text-slate-950 ring-4 ring-emerald-500/10 shadow-sm"
                              : "bg-slate-50/70 border-slate-200/90 hover:border-slate-300 text-slate-800 hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <div className="font-heading font-black text-sm text-slate-950 flex items-center gap-1.5">
                              {time === "Immediately" ? "⚡ Immediately" : time.split(" (")[0]}
                            </div>
                            <div className="text-xs text-slate-600 font-medium mt-0.5">
                              {time === "Immediately" ? "Within 15 minutes response" : "(" + time.split(" (")[1]}
                            </div>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "border-emerald-600 bg-emerald-600 text-white shadow-xs"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 sm:py-4.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-primary to-emerald-700 hover:from-primary-hover hover:via-emerald-600 hover:to-emerald-800 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_6px_22px_rgba(22,163,74,0.35)] hover:shadow-[0_8px_28px_rgba(22,163,74,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 relative overflow-hidden group cursor-pointer disabled:opacity-60"
                  >
                    {/* Animated sheen sweep on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    {loading ? (
                      <span className="inline-flex items-center gap-2 relative z-10 font-bold">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Callback Request...</span>
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center gap-2.5 font-black">
                        <PhoneCall className="w-5 h-5" />
                        <span>Request Callback Now</span>
                      </span>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-3.5 text-center font-medium">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Calls are handled directly by senior clinical coordinator line <strong className="text-slate-900 font-black">+91 90427 18811</strong>.</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Expansive Medical Bill / Clinical Callback Request Slip - Wider Breadth & Compact Height */
            <div className="w-full max-w-2xl mx-auto my-3 sm:my-8 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-emerald-500/80 overflow-hidden text-slate-900 transition-all">
              
              {/* Slip Header Banner (Deep Forest Green with OnlyPhysio Logo & Gold Accent) */}
              <div className="bg-[#0c2e1b] text-white p-4 sm:p-6 relative">
                <div className="flex items-center justify-between gap-2.5 sm:gap-4">
                  <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                    {/* OnlyPhysio Brand Logo (Instant Zero-Delay Paint) */}
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#202530] overflow-hidden p-0 shadow-md border-2 border-amber-400 shrink-0 flex items-center justify-center">
                      <img
                        src="/images/logo.jpg"
                        alt="OnlyPhysio Logo"
                        className="w-full h-full object-cover scale-[1.38]"
                        loading="eager"
                        decoding="sync"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-2xl font-black font-heading tracking-tight text-white uppercase truncate">
                        ONLY PHYSIO
                      </h2>
                      <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[10px] sm:text-xs font-black uppercase tracking-widest">
                        Chennai
                      </span>
                    </div>
                  </div>

                  {/* Request Reference Pill */}
                  <div className="bg-emerald-950/85 border border-emerald-400/60 rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:p-3 text-right shrink-0 shadow-inner">
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">
                      REQUEST REF ID
                    </span>
                    <span className="text-base sm:text-2xl font-black font-mono text-amber-400 tracking-wider">
                      #{callbackId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Alert Bar */}
              <div className="bg-emerald-50 border-b border-emerald-200 px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-950 truncate">
                    STATUS: REGISTERED & ROUTED TO CLINICAL DESK
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 shrink-0">
                  {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>

              {/* Patient Details & Callback Bill Table - Clean 2-Column Key-Value Alignment */}
              <div className="p-3.5 min-[380px]:p-4 sm:p-7 space-y-3 sm:space-y-4">
                <div className="border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100 text-xs sm:text-sm">
                  
                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Patient Name</span>
                    <span className="font-black text-slate-950 text-right sm:text-left truncate">{formData.fullName}</span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Contact Phone</span>
                    <span className="font-mono font-bold text-slate-900 text-right sm:text-left">{formData.phone}</span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Locality</span>
                    <span className="font-bold text-slate-900 text-right sm:text-left truncate">📍 {formData.locationArea || "Chennai"}</span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Health Concern</span>
                    <span className="font-black text-emerald-900 text-right sm:text-left truncate">{formData.primaryConcern}</span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Callback Window</span>
                    <span className="font-bold text-slate-900 text-right sm:text-left truncate">
                      ⏰ {formData.preferredTime === "Immediately" ? "Immediate (within 15 mins)" : formData.preferredTime}
                    </span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center bg-emerald-50/60 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-emerald-900 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Doctor Hotline</span>
                    <span className="font-black text-emerald-800 font-mono text-right sm:text-left">+91 90427 18811</span>
                  </div>
                </div>

                {/* Coordinator Notice & Verification Stamp - Aligned Side by Side */}
                <div className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white shrink-0 flex items-center justify-center shadow-xs">
                      <PhoneCall className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-slate-950 text-[11px] sm:text-xs truncate">Clinical Triage Activated</div>
                      <div className="text-slate-600 text-[10px] sm:text-[11px] mt-0.5 leading-tight">
                        Our senior doctor will call <strong className="text-slate-900 font-bold whitespace-nowrap">{formData.phone}</strong> promptly.
                      </div>
                    </div>
                  </div>

                  {/* Official OnlyPhysio Clinical Verification Seal */}
                  <div className="w-14 h-14 min-[380px]:w-16 min-[380px]:h-16 sm:w-20 sm:h-20 shrink-0 relative drop-shadow-sm flex items-center justify-center">
                    <img
                      src="/images/official-seal.png"
                      alt="OnlyPhysio Official Clinical Seal"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain select-none"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                </div>

                {/* Primary Action Buttons (Download PNG Slip & WhatsApp Share) */}
                <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Download Official Slip / Bill (PNG Image) */}
                  <button
                    type="button"
                    onClick={handleDownloadSlip}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-primary to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-heading font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Slip (PNG Image)</span>
                  </button>

                  {/* Share Slip on WhatsApp */}
                  <button
                    type="button"
                    onClick={handleShareSlip}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Slip on WhatsApp</span>
                  </button>
                </div>

                {/* Navigation Secondary Links */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setCallbackId("");
                      setFormData({
                        fullName: "",
                        phone: "",
                        locationArea: "",
                        primaryConcern: "",
                        preferredTime: "Immediately",
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Request Another Callback
                  </button>

                  <Link
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Homepage</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* 3. Main Website Footer */}
      <Footer />
    </div>
  );
}
