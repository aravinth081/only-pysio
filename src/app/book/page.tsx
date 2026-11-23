"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Activity, 
  CheckCircle2, 
  ArrowLeft, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Send,
  Home,
  Building,
  FileText,
  Check,
  PhoneCall,
  ChevronRight,
  Lock,
  Download,
  Share2
} from "lucide-react";
import confetti from "canvas-confetti";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ComboboxInput from "@/components/ui/ComboboxInput";
import { createAppointment, AppointmentData } from "@/lib/firebase";
import { downloadSlipAsImage, shareSlipOnWhatsApp, SlipData } from "@/lib/generateSlip";

export default function BookAppointmentPage() {
  const getLocalDateString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayStr = getLocalDateString(0);
  const tomorrowStr = getLocalDateString(1);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleOpenCalendar = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        try {
          dateInputRef.current.showPicker();
          return;
        } catch {
          // fallback to focus
        }
      }
      dateInputRef.current.focus();
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    gender: "",
    condition: "",
    serviceMode: "Home Visit (Chennai)" as AppointmentData["serviceMode"],
    preferredDate: getLocalDateString(0),
    preferredTimeSlot: "",
    address: "",
    medicalHistory: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  // Preload logo and official seal for instantaneous 0ms display on bill generation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sealImg = new window.Image();
      sealImg.src = "/images/official-seal.png";
      const logoImg = new window.Image();
      logoImg.src = "/images/logo.jpg";
    }
  }, []);

  const chennaiLocalities = [
    "Anna Nagar",
    "T. Nagar",
    "Adyar",
    "Velachery",
    "Mylapore",
    "Alwarpet",
    "Besant Nagar",
    "OMR / Thoraipakkam / Sholinganallur",
    "Nungambakkam",
    "Kilpauk",
    "Porur",
    "Tambaram / Chromepet",
    "Guindy",
    "Kodambakkam",
    "Other Location in Chennai",
  ];

  const conditionsList = [
    "Back & Spine Pain / Sciatica / Disc Bulge",
    "Knee Pain / Osteoarthritis / ACL Rehab",
    "Post-Surgical Orthopedic Rehab (TKR, THR, Fracture)",
    "Stroke & Neurological Rehabilitation",
    "Neck, Cervical Spondylosis & Shoulder Pain",
    "Frozen Shoulder (Adhesive Capsulitis)",
    "Elderly Mobility, Balance & Fall Prevention",
    "Sports Injury Recovery & Conditioning",
    "Post-Stroke Paralysis Recovery",
    "General Physiotherapy & Pain Relief Consultation",
  ];

  const timeSlots = [
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 02:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM",
    "07:00 PM - 09:00 PM",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert("Please provide your full name and 10-digit mobile number.");
      return;
    }

    setLoading(true);

    const fullAddress = [selectedArea, streetAddress].filter(Boolean).join(", ") || formData.address || "Chennai";

    try {
      const result = await createAppointment({
        fullName: formData.fullName,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        condition: formData.condition,
        serviceMode: formData.serviceMode,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        address: fullAddress,
        medicalHistory: formData.medicalHistory,
      });

      const generatedId = result.id;
      setBookingId(generatedId);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#16A34A", "#10B981", "#34D399", "#0c2e1b", "#FBBF24"],
        });
      } catch (err) {}

    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to save appointment. Please call or WhatsApp 9042718811 directly.");
    } finally {
      setLoading(false);
    }
  };

  const getSlipData = (): SlipData => {
    const fullAddress = [selectedArea, streetAddress].filter(Boolean).join(", ") || formData.address || "Chennai";
    return {
      type: "appointment",
      refId: bookingId,
      fullName: formData.fullName,
      phone: formData.phone,
      age: formData.age,
      gender: formData.gender,
      serviceMode: formData.serviceMode,
      condition: formData.condition,
      preferredDate: formData.preferredDate,
      preferredTimeSlot: formData.preferredTimeSlot,
      address: fullAddress,
      medicalHistory: formData.medicalHistory,
    };
  };

  const handleDownloadSlip = () => {
    downloadSlipAsImage(getSlipData());
  };

  const handleShareSlip = () => {
    const fullAddress = [selectedArea, streetAddress].filter(Boolean).join(", ") || formData.address || "Chennai";
    const msg = [
      "*ONLYPHYSIO CHENNAI - APPOINTMENT RECEIPT*",
      "------------------------------------",
      `Booking Ref: ${bookingId}`,
      `Patient: ${formData.fullName}`,
      `Phone: ${formData.phone}`,
      `Mode: ${formData.serviceMode}`,
      `Condition: ${formData.condition}`,
      `Scheduled: ${formData.preferredDate} (${formData.preferredTimeSlot})`,
      `Location: ${fullAddress}`,
      "------------------------------------",
      "Status: Confirmed with OnlyPhysio Chennai. Coordinator: +91 90427 18811"
    ].join("\n");

    shareSlipOnWhatsApp(getSlipData(), msg);
  };

  const getWhatsappUrl = () => {
    const fullAddress = [selectedArea, streetAddress].filter(Boolean).join(", ") || formData.address || "Chennai";
    const confirmationMsg = [
      "*ONLYPHYSIO CHENNAI - APPOINTMENT CONFIRMATION*",
      "Booking ID: " + bookingId,
      "Patient: " + formData.fullName,
      "Phone: " + formData.phone,
      "Service: " + formData.serviceMode,
      "Condition: " + formData.condition,
      "Scheduled: " + formData.preferredDate + " (" + formData.preferredTimeSlot + ")",
      "Location: " + fullAddress,
      "Your appointment is booked with OnlyPhysio."
    ].join("\n");

    return "https://wa.me/919042718811?text=" + encodeURIComponent(confirmationMsg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/25 to-slate-50 text-slate-900 font-sans flex flex-col justify-between relative">
      {/* 1. Main Website Header */}
      <Header />

      {/* 2. Page Content with Top Spacing for Sticky Header */}
      <main className="pt-24 sm:pt-28 pb-20 flex-grow relative">
        {/* Subtle Ambient Background Accents */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Main Centered Booking Form Section */}
        <section className="container mx-auto px-2 min-[380px]:px-3 sm:px-6 max-w-3xl">
          {!submitted ? (
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.05)]">
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Step 1: Select Service Mode */}
                <div>
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">1</span>
                    <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-slate-950">Select Consultation Mode</span>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-full ml-auto uppercase tracking-wide">Required</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { 
                        mode: "Home Visit (Chennai)", 
                        icon: Home, 
                        desc: "Physiotherapist visits your home",
                        badge: "Popular"
                      },
                      { 
                        mode: "Clinic Visit", 
                        icon: Building, 
                        desc: "Visit our rehabilitation centre",
                        badge: "In-Clinic"
                      },
                    ].map((item) => {
                      const isSelected = formData.serviceMode === item.mode;
                      const IconComp = item.icon;
                      return (
                        <button
                          type="button"
                          key={item.mode}
                          onClick={() => setFormData({ ...formData, serviceMode: item.mode as any })}
                          className={`p-3 sm:py-3.5 sm:px-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 cursor-pointer relative ${
                            isSelected
                              ? "bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/15 shadow-xs"
                              : "bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-xs transition-colors ${
                            isSelected ? "bg-emerald-600 text-white" : "bg-white border border-slate-200 text-slate-700"
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-black text-slate-950 font-heading truncate">
                                {item.mode}
                              </span>
                              <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                isSelected ? "bg-emerald-200/90 text-emerald-950" : "bg-slate-200 text-slate-600"
                              }`}>
                                {item.badge}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Patient Information */}
                <div>
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">2</span>
                    <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-slate-950">Patient Details</span>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-full ml-auto uppercase tracking-wide">Required</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-2 font-heading flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Patient Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S. Karthik Raja"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 placeholder:font-normal text-sm outline-none transition-all duration-200 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-2 font-heading flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp / Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number (e.g. 9840123456)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 placeholder:font-normal text-sm outline-none transition-all duration-200 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div className="col-span-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-2 font-heading">Age</label>
                      <input
                        type="number"
                        placeholder="e.g. 52"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 placeholder:font-normal text-sm outline-none transition-all duration-200 shadow-xs"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-2 font-heading">Gender</label>
                      <ComboboxInput
                        value={formData.gender}
                        onChange={(val) => setFormData({ ...formData, gender: val })}
                        options={["Male", "Female", "Other"]}
                        placeholder="Select or type..."
                        required
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-2 font-heading flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Condition / Issue *</span>
                        </span>
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold normal-case">Dropdown / Type</span>
                      </label>
                      <ComboboxInput
                        value={formData.condition}
                        onChange={(val) => setFormData({ ...formData, condition: val })}
                        options={conditionsList}
                        placeholder="Select condition or type custom here..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Date & Time Schedule */}
                <div>
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">3</span>
                    <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-slate-950">Schedule Date & Time</span>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-full ml-auto uppercase tracking-wide">Required</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-2 font-heading flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Preferred Date *</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, preferredDate: todayStr })}
                            className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                              formData.preferredDate === todayStr
                                ? "bg-emerald-600 text-white shadow-2xs"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                            }`}
                          >
                            Today
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, preferredDate: tomorrowStr })}
                            className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                              formData.preferredDate === tomorrowStr
                                ? "bg-emerald-600 text-white shadow-2xs"
                                : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            Tomorrow
                          </button>
                        </div>
                      </label>
                      <div className="relative flex items-center">
                        <input
                          ref={dateInputRef}
                          type="date"
                          required
                          min={todayStr}
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-4 py-3.5 pr-14 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold text-sm outline-none transition-all duration-200 shadow-xs cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-10 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-20"
                        />
                        <button
                          type="button"
                          onClick={handleOpenCalendar}
                          className="absolute right-2.5 p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-900 border border-emerald-200 transition-all cursor-pointer shadow-2xs z-10 flex items-center justify-center group"
                          title="Click to open calendar"
                        >
                          <Calendar className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-2 font-heading flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Preferred Time Slot *</span>
                        </span>
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold normal-case">Numbers only / Dropdown</span>
                      </label>
                      <ComboboxInput
                        value={formData.preferredTimeSlot}
                        onChange={(val) => setFormData({ ...formData, preferredTimeSlot: val })}
                        options={timeSlots}
                        placeholder="Select slot or enter time in numbers (e.g. 10:30)..."
                        timeOnly
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Step 4: Chennai Locality & Street Address */}
                <div>
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">4</span>
                    <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-slate-950">Chennai Location & Address</span>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-full ml-auto uppercase tracking-wide">Required</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-2 font-heading">
                        Area / Locality *
                      </label>
                      <ComboboxInput
                        value={selectedArea}
                        onChange={(val) => setSelectedArea(val)}
                        options={chennaiLocalities}
                        placeholder="Select or type area..."
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-2 font-heading">
                        Street Address / Apartment *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Door No, Street Name, Apartment / Landmark, Chennai"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 placeholder:font-normal text-sm outline-none transition-all duration-200 shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 5: Medical Notes (Optional) */}
                <div>
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center text-xs font-black shadow-xs">5</span>
                    <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-slate-950">Medical History & Symptoms</span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full ml-auto uppercase tracking-wide">Optional</span>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="e.g. Knee pain after walking, had surgery 3 weeks ago, doctor prescribed home physio..."
                    value={formData.medicalHistory}
                    onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 placeholder:font-normal text-sm outline-none resize-none transition-all duration-200 shadow-xs"
                  />
                </div>

                {/* Luxury CTA Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-primary to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-heading font-black text-sm uppercase tracking-wider shadow-[0_8px_25px_rgba(22,163,74,0.35)] hover:shadow-[0_10px_30px_rgba(22,163,74,0.45)] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 relative overflow-hidden group"
                  >
                    {/* Animated Shine Sweep on Hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                    {loading ? (
                      <span className="inline-flex items-center gap-2.5">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Confirming Your Booking...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm & Book Appointment</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-600 font-medium mt-3.5 text-center">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant confirmation dispatched to coordinator WhatsApp <strong className="font-black text-slate-950">9042718811</strong> and your phone.</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Expansive Medical Bill / Clinical Appointment Receipt Slip - Wider Breadth, Compact Length, Clean Tabular Alignment */
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

                  {/* Booking Reference Pill */}
                  <div className="bg-emerald-950/85 border border-emerald-400/60 rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:p-3 text-right shrink-0 shadow-inner">
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">
                      BOOKING REF ID
                    </span>
                    <span className="text-base sm:text-2xl font-black font-mono text-amber-400 tracking-wider">
                      #{bookingId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Alert Bar */}
              <div className="bg-emerald-50 border-b border-emerald-200 px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-950 truncate">
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
                  
                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Patient Name</span>
                    <span className="font-black text-slate-950 text-right sm:text-left truncate">{formData.fullName}</span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Primary Contact</span>
                    <span className="font-mono font-bold text-slate-900 text-right sm:text-left">{formData.phone}</span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Age & Gender</span>
                    <span className="font-bold text-slate-900 text-right sm:text-left truncate">
                      {formData.age ? `${formData.age} Yrs` : "Age N/A"} • {formData.gender || "Patient"}
                    </span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Mode</span>
                    <span className="font-bold text-emerald-800 text-right sm:text-left truncate">{formData.serviceMode}</span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Health Concern</span>
                    <span className="font-black text-slate-950 text-right sm:text-left truncate">{formData.condition}</span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Date & Slot</span>
                    <span className="font-bold text-slate-900 text-right sm:text-left truncate">
                      📅 {formData.preferredDate} ({formData.preferredTimeSlot || "Flexible"})
                    </span>
                  </div>

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center bg-slate-50/70 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Location</span>
                    <span className="font-bold text-slate-900 text-right sm:text-left truncate">
                      📍 {[selectedArea, streetAddress].filter(Boolean).join(", ") || formData.address || "Chennai"}
                    </span>
                  </div>

                  {formData.medicalHistory && (
                    <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                      <span className="font-bold text-slate-500 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Notes</span>
                      <span className="font-medium text-slate-700 italic text-right sm:text-left truncate">{formData.medicalHistory}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-[115px_1fr] min-[390px]:grid-cols-[135px_1fr] sm:grid-cols-[180px_1fr] items-center bg-emerald-50/60 px-3 py-2 sm:px-4 sm:py-2.5 gap-2">
                    <span className="font-bold text-emerald-900 uppercase text-[10px] min-[380px]:text-[11px] tracking-wide shrink-0">Doctor Hotline</span>
                    <span className="font-black text-emerald-800 font-mono text-right sm:text-left">+91 90427 18811</span>
                  </div>
                </div>

                {/* Coordinator Notice & Verification Stamp - Aligned Side by Side */}
                <div className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white shrink-0 flex items-center justify-center shadow-xs">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-slate-950 text-[11px] sm:text-xs truncate">Clinical Dispatch Confirmed</div>
                      <div className="text-slate-600 text-[10px] sm:text-[11px] mt-0.5 leading-tight">
                        Dispatched to senior coordinator line <strong className="text-slate-900 font-bold whitespace-nowrap">+91 90427 18811</strong>
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

                {/* Navigation Secondary Links */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setBookingId("");
                      setFormData({
                        fullName: "",
                        phone: "",
                        age: "",
                        gender: "",
                        condition: "",
                        serviceMode: "Home Visit (Chennai)",
                        preferredDate: todayStr,
                        preferredTimeSlot: "",
                        address: "",
                        medicalHistory: "",
                      });
                      setSelectedArea("");
                      setStreetAddress("");
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Book Another Appointment
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
