"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Home,
  Building2,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Download,
  Share2,
  MessageSquare,
} from "lucide-react";
import { siteContent } from "@/data/content";
import ComboboxInput from "@/components/ui/ComboboxInput";
import { downloadSlipAsImage, shareSlipOnWhatsApp, SlipData } from "@/lib/generateSlip";
import { generateSequentialId } from "@/lib/firebase";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number")
    .regex(/^[0-9+\s-]{10,16}$/, "Invalid phone number format"),
  email: z.string().email("Please enter a valid email address"),
  condition: z.string().min(1, "Please select your primary condition or concern"),
  preferredDate: z.string().min(1, "Please select an appointment date"),
  preferredTime: z.string().min(1, "Please select a preferred time slot"),
  serviceType: z.enum(["home-visit", "clinic"]),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Preload logo and seal for instantaneous 0ms display on bill generation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sealImg = new window.Image();
      sealImg.src = "/images/official-seal.png";
      const logoImg = new window.Image();
      logoImg.src = "/images/logo.jpg";
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: "home-visit",
      condition: "",
      preferredTime: siteContent.bookingOptions.timeSlots[0],
      preferredDate: new Date().toISOString().split("T")[0],
    },
  });

  const selectedServiceType = watch("serviceType");

  const dateInputRef = useRef<HTMLInputElement>(null);
  const { ref: dateRegisterRef, ...dateRegisterRest } = register("preferredDate");

  const handleOpenCalendar = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        try {
          dateInputRef.current.showPicker();
          return;
        } catch {
          // fallback
        }
      }
      dateInputRef.current.focus();
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to schedule appointment.");
      }

      setSubmittedData(data);
      const generatedSeq = generateSequentialId("booking");
      const assignedId = result.bookingId || generatedSeq;
      setSubmitSuccess(assignedId);

      // Instant local persistence for Admin Dashboard
      if (typeof window !== "undefined") {
        try {
          const existing = JSON.parse(localStorage.getItem("onlyphysio_appointments") || "[]");
          const newItem = {
            id: assignedId,
            fullName: data.fullName,
            phone: data.phone,
            condition: data.condition,
            serviceMode: data.serviceType === "home-visit" ? "Home Visit (Chennai)" : "Clinic Visit",
            preferredDate: data.preferredDate,
            preferredTimeSlot: data.preferredTime,
            address: data.address || "Chennai",
            medicalHistory: data.notes || "",
            status: "Pending",
            createdAt: new Date().toISOString(),
          };
          const filtered = existing.filter((item: any) => item.id !== assignedId);
          filtered.unshift(newItem);
          localStorage.setItem("onlyphysio_appointments", JSON.stringify(filtered));
        } catch (e) {
          console.warn("Storage write error:", e);
        }
      }

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#16A34A", "#34D399", "#14532D", "#DCFCE7", "#FBBF24"],
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not loaded
      }

      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong. Please call our helpline directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSlipData = (): SlipData => {
    return {
      type: "appointment",
      refId: submitSuccess || `OP-B${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: submittedData?.fullName || "Patient",
      phone: submittedData?.phone || "",
      serviceMode: submittedData?.serviceType === "home-visit" ? "Home Visit Consultation" : "Clinic Consultation",
      condition: submittedData?.condition || "General Physiotherapy",
      preferredDate: submittedData?.preferredDate || new Date().toISOString().split("T")[0],
      preferredTimeSlot: submittedData?.preferredTime || "Morning",
      address: "Chennai",
      medicalHistory: submittedData?.notes,
      createdAt: new Date().toISOString(),
    };
  };

  const handleDownloadSlip = () => {
    downloadSlipAsImage(getSlipData());
  };

  const handleShareSlip = () => {
    const msg = [
      "*ONLYPHYSIO CHENNAI - APPOINTMENT RECEIPT*",
      "------------------------------------",
      `Booking Ref: #${submitSuccess}`,
      `Patient: ${submittedData?.fullName}`,
      `Phone: ${submittedData?.phone}`,
      `Mode: ${submittedData?.serviceType === "home-visit" ? "Home Visit Consultation" : "Clinic Consultation"}`,
      `Condition: ${submittedData?.condition}`,
      `Scheduled: ${submittedData?.preferredDate} (${submittedData?.preferredTime})`,
      "------------------------------------",
      "Status: Confirmed with OnlyPhysio Chennai. Coordinator: +91 90427 18811"
    ].join("\n");

    shareSlipOnWhatsApp(getSlipData(), msg);
  };

  return (
    <section
      id="booking"
      className="relative pt-8 sm:pt-12 pb-20 sm:pb-28 bg-white overflow-hidden scroll-mt-28"
    >
      {/* Background soft ambiance */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-mint/50 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-100/40 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DCFCE7] border border-[#16A34A]/20 text-[#15803D] text-xs font-bold uppercase tracking-widest mb-4 font-heading shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>INSTANT CONSULTATION BOOKING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14532D] font-heading tracking-tight leading-tight mb-4">
            Schedule Your Physiotherapy Session
          </h2>

          {/* Small Green Decorative Accent */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-10 sm:w-12 rounded-full bg-[#16A34A]" />
            <span className="h-1.5 w-3 rounded-full bg-[#15803D]" />
            <span className="h-1 w-10 sm:w-12 rounded-full bg-[#16A34A]" />
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-[#475569] font-medium leading-relaxed max-w-2xl mx-auto">
            Select your preferred slot. A certified senior physiotherapist will arrive at your residence fully equipped with treatment modalities.
          </p>
        </div>

        {/* Booking Form Container */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-xl p-5 sm:p-8 md:p-10 relative">
            <AnimatePresence mode="wait">
              {submitSuccess && submittedData ? (
                /* Expansive Medical Bill / Clinical Appointment Receipt Slip (Exact Call Back Format) */
                <motion.div
                  key="booking-slip"
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-emerald-500/80 overflow-hidden text-slate-900 transition-all -mx-2 sm:-m-4"
                >
                  {/* Slip Header Banner (Deep Forest Green with OnlyPhysio Logo & Gold Accent) */}
                  <div className="bg-[#0c2e1b] text-white p-3.5 sm:p-6 relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                      {/* Left: Brand Identity */}
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
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-lg sm:text-2xl font-black font-heading tracking-tight text-white uppercase whitespace-nowrap">
                              ONLY PHYSIO
                            </h2>
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[10px] sm:text-xs font-black uppercase tracking-widest">
                              Chennai
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-emerald-300/80 font-medium tracking-wide mt-0.5 whitespace-nowrap">
                            Expert Homecare Physiotherapy
                          </p>
                        </div>
                      </div>

                      {/* Right / Below on Mobile: Booking Reference Pill */}
                      <div className="bg-emerald-950/90 border border-emerald-400/60 rounded-xl sm:rounded-2xl px-3 py-2 sm:p-3 shadow-inner flex items-center justify-between sm:block sm:text-right shrink-0">
                        <span className="text-[10px] sm:text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">
                          BOOKING REF ID
                        </span>
                        <span className="text-sm sm:text-xl lg:text-2xl font-black font-mono text-amber-400 tracking-wider">
                          #{submitSuccess}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Alert Bar */}
                  <div className="bg-emerald-50 border-b border-emerald-200 px-3.5 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                      <span className="text-[10.5px] min-[380px]:text-xs font-black uppercase tracking-wider text-emerald-950">
                        STATUS: APPOINTMENT CONFIRMED & SCHEDULED
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 shrink-0">
                      {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  {/* Patient Details & Clinical Bill Table - Clean 2-Column Key-Value Alignment */}
                  <div className="p-3.5 min-[380px]:p-4 sm:p-7 space-y-3 sm:space-y-4">
                    <div className="border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100 text-xs sm:text-sm">
                      <div className="grid grid-cols-[105px_1fr] min-[390px]:grid-cols-[130px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                        <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Patient Name</span>
                        <span className="font-black text-slate-950 text-right sm:text-left break-words">{submittedData.fullName}</span>
                      </div>

                      <div className="grid grid-cols-[105px_1fr] min-[390px]:grid-cols-[130px_1fr] sm:grid-cols-[180px_1fr] items-center px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                        <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Primary Contact</span>
                        <span className="font-mono font-bold text-slate-900 text-right sm:text-left">{submittedData.phone}</span>
                      </div>

                      <div className="grid grid-cols-[105px_1fr] min-[390px]:grid-cols-[130px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                        <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Email Address</span>
                        <span className="font-bold text-slate-900 text-right sm:text-left break-all text-[11px] min-[380px]:text-xs sm:text-sm">{submittedData.email}</span>
                      </div>

                      <div className="grid grid-cols-[105px_1fr] min-[390px]:grid-cols-[130px_1fr] sm:grid-cols-[180px_1fr] items-center px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                        <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Mode</span>
                        <span className="font-bold text-emerald-800 text-right sm:text-left">
                          {submittedData.serviceType === "home-visit" ? "Home Visit Consultation" : "Clinic Consultation"}
                        </span>
                      </div>

                      <div className="grid grid-cols-[105px_1fr] min-[390px]:grid-cols-[130px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                        <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Health Concern</span>
                        <span className="font-black text-slate-950 text-right sm:text-left">{submittedData.condition}</span>
                      </div>

                      <div className="grid grid-cols-[105px_1fr] min-[390px]:grid-cols-[130px_1fr] sm:grid-cols-[180px_1fr] items-center px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                        <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Date & Slot</span>
                        <span className="font-bold text-slate-900 text-right sm:text-left">
                          📅 {submittedData.preferredDate} ({submittedData.preferredTime})
                        </span>
                      </div>

                      {submittedData.notes && (
                        <div className="grid grid-cols-[105px_1fr] min-[390px]:grid-cols-[130px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                          <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Notes</span>
                          <span className="font-medium text-slate-700 italic text-right sm:text-left break-words">{submittedData.notes}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-[105px_1fr] min-[390px]:grid-cols-[130px_1fr] sm:grid-cols-[180px_1fr] items-center bg-emerald-50/60 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                        <span className="font-bold text-emerald-900 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Doctor Hotline</span>
                        <span className="font-black text-emerald-800 font-mono text-right sm:text-left">+91 90427 18811</span>
                      </div>
                    </div>

                    {/* Coordinator Notice & Verification Stamp - Aligned Side by Side */}
                    <div className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white shrink-0 flex items-center justify-center shadow-xs">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-slate-950 text-[11px] sm:text-xs truncate">Clinical Dispatch Confirmed</div>
                          <div className="text-slate-600 text-[10px] sm:text-[11px] mt-0.5 leading-tight">
                            Dispatched to coordinator line <strong className="text-slate-900 font-bold whitespace-nowrap">+91 90427 18811</strong>
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
                        <span>Share Receipt on WhatsApp</span>
                      </button>
                    </div>

                    {/* Book Another Consultation Button */}
                    <div className="pt-3 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitSuccess(null);
                          setSubmittedData(null);
                        }}
                        className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                      >
                        Book Another Consultation
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Main Interactive Form */
                <form
                  key="booking-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  noValidate
                >
                  {/* Service Type Toggle (Home Visit vs Clinic) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14532D] mb-3 font-heading">
                      Select Consultation Mode *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {siteContent.bookingOptions.serviceTypes.map((type) => {
                        const isSelected = selectedServiceType === type.id;
                        const Icon = type.id === "home-visit" ? Home : Building2;

                        return (
                          <div
                            key={type.id}
                            onClick={() =>
                              setValue("serviceType", type.id as "home-visit" | "clinic")
                            }
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                              isSelected
                                ? "border-[#16A34A] bg-[#F0FDF4] shadow-sm"
                                : "border-[#E2E8F0] hover:border-slate-300 bg-slate-50/50"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "bg-[#16A34A] text-white"
                                  : "bg-slate-200/80 text-slate-600"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1">
                              <span className={`block text-sm font-bold leading-tight font-heading ${
                                isSelected ? "text-[#14532D]" : "text-slate-900"
                              }`}>
                                {type.label}
                              </span>
                              <span className="block text-xs text-[#64748B] mt-0.5">
                                {type.desc}
                              </span>
                            </div>

                            <input
                              type="radio"
                              value={type.id}
                              {...register("serviceType")}
                              className="sr-only"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Phone (2 columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14532D] mb-2 font-heading">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        {...register("fullName")}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                          errors.fullName
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200 focus:border-primary"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.fullName.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14532D] mb-2 font-heading">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        {...register("phone")}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                          errors.phone
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200 focus:border-primary"
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Condition Selection (2 columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14532D] mb-2 font-heading">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. ramesh@example.com"
                        {...register("email")}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                          errors.email
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200 focus:border-primary"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14532D] mb-2 font-heading">
                        Primary Concern / Condition *
                      </label>
                      <ComboboxInput
                        value={watch("condition") || ""}
                        onChange={(val) => setValue("condition", val, { shouldValidate: true })}
                        options={siteContent.bookingOptions.conditions}
                        placeholder="Select condition or type manual custom here..."
                        className={`w-full px-4 py-3.5 pr-16 rounded-2xl bg-slate-50 border text-sm text-slate-900 focus:outline-none focus:bg-white transition-all ${
                          errors.condition
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                        }`}
                      />
                      {errors.condition && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.condition.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Date & Preferred Time (2 columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14532D] mb-2 font-heading flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#16A34A]" />
                          <span>Preferred Date *</span>
                        </span>
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold normal-case">Today auto-selected</span>
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="date"
                          {...dateRegisterRest}
                          ref={(e) => {
                            dateRegisterRef(e);
                            // @ts-expect-error ref assignment
                            dateInputRef.current = e;
                          }}
                          min={new Date().toISOString().split("T")[0]}
                          className={`w-full px-4 py-3.5 pr-14 rounded-2xl bg-slate-50 border text-sm text-slate-900 focus:outline-none focus:bg-white transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-10 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-20 ${
                            errors.preferredDate
                              ? "border-rose-400 focus:border-rose-500"
                              : "border-slate-200 focus:border-primary"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={handleOpenCalendar}
                          className="absolute right-2.5 p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-900 border border-emerald-200 transition-all cursor-pointer shadow-2xs z-10 flex items-center justify-center group"
                          title="Click to open calendar"
                        >
                          <Calendar className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                      {errors.preferredDate && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.preferredDate.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14532D] mb-2 font-heading">
                        Preferred Time Slot *
                      </label>
                      <ComboboxInput
                        value={watch("preferredTime") || ""}
                        onChange={(val) => setValue("preferredTime", val, { shouldValidate: true })}
                        options={siteContent.bookingOptions.timeSlots}
                        timeOnly={true}
                        placeholder="Select slot or enter time in numbers..."
                        className={`w-full px-4 py-3.5 pr-16 rounded-2xl bg-slate-50 border text-sm text-slate-900 focus:outline-none focus:bg-white transition-all ${
                          errors.preferredTime
                            ? "border-rose-400 focus:border-rose-500"
                            : "border-slate-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Additional Notes (Textarea) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14532D] mb-2 font-heading">
                      Notes / Relevant Medical History (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Recent knee surgery, doctor advised home CPM, experiencing morning back stiffness..."
                      {...register("notes")}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Submission Error Banner */}
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-primary text-white font-bold text-base shadow-soft-md hover:bg-primary-hover hover:shadow-glow transition-all duration-300 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Confirming Clinical Slot...</span>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent w-full" />
                        <Calendar className="w-5 h-5" />
                        <span>Confirm Appointment Request</span>
                      </>
                    )}
                  </button>

                  {/* Trust Footer */}
                  <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      100% Confidential & Medical Standard
                    </span>
                    <span>No advance booking fees</span>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
