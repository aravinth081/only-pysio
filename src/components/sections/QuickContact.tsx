"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  User,
  Sparkles,
  ArrowRight,
  Send,
  Navigation,
  Star,
  Award,
  HeartHandshake,
} from "lucide-react";
import { siteContent } from "@/data/content";
import { formatPhoneForTel } from "@/lib/utils";
import ComboboxInput from "@/components/ui/ComboboxInput";

export const QuickContact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    locality: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [clickedPill, setClickedPill] = useState<string | null>(null);

  const handlePillClick = (type: string) => {
    setClickedPill(type);
    setTimeout(() => {
      setClickedPill(null);
    }, 1500);
  };

  const chennaiAreas = [
    "KK Nagar West / Nesapakkam (Our Hub)",
    "Anna Nagar",
    "T. Nagar",
    "Adyar",
    "Velachery",
    "Mylapore",
    "Alwarpet",
    "Besant Nagar",
    "OMR / Sholinganallur",
    "Porur / Ramapuram",
    "Nungambakkam",
    "Guindy / Ekkatuthangal",
    "Other Chennai Location",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = [
      "Hello OnlyPhysio Chennai,",
      "I would like to request a home physiotherapy consultation.",
      "",
      `*Name:* ${formData.fullName || "Not provided"}`,
      `*Locality:* ${formData.locality || "Chennai"}`,
      `*Phone:* ${formData.phone || "Not provided"}`,
      `*Email:* ${formData.email || "Not provided"}`,
      "",
      "Please connect me with a senior clinical physiotherapist.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/919042718811?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const googleMapsUrl =
    "https://www.google.com/maps/place/Only+Physio+%7C+Home+Care+Physiotherapy,+Chennai/@13.03973,80.191313,15z/data=!4m6!3m5!1s0x3a52673435b449e3:0xa7f6bd8f4d5dd11!8m2!3d13.0397303!4d80.191313!16s%2Fg%2F11rsp9hz8x?hl=en&entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 bg-[#F4FAF6] border-t border-slate-200/80 overflow-hidden"
      aria-label="Contact OnlyPhysio"
    >
      {/* Anchor for backward compatibility */}
      <span id="quick-contact" className="absolute -top-20 left-0 pointer-events-none" />

      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-teal-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Main Combined Consultation Card (Matches Images 2, 3 & 4) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(20,83,45,0.06)] overflow-hidden mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column (5 cols): Doctor Hero Image (Image 4) */}
            <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full bg-slate-900 overflow-hidden flex flex-col justify-end">
              <Image
                src="/images/contact-doctor.jpg"
                alt="Senior Physiotherapist at OnlyPhysio Chennai"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-103"
              />

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Doctor Trust Card Badge on Bottom of Image */}
              <div className="relative z-10 p-5 sm:p-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/40 text-emerald-200 font-heading font-black text-[10px] uppercase tracking-wider mb-2.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Licensed Clinical Physiotherapy</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight leading-tight mb-1">
                  Expert Home Physiotherapists
                </h3>

                <p className="text-xs text-slate-200/90 font-sans leading-relaxed mb-3 max-w-sm">
                  Hospital-grade rehabilitation, stroke recovery, and post-op joint mobilization delivered right to your residence across Chennai.
                </p>


              </div>
            </div>

            {/* Right Column (7 cols): Consultation Content + Trust List + Fast Form */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Eyebrow Label with decorative green bar */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-0.5 bg-[#16A34A] rounded-full" />
                    <span className="text-xs font-black uppercase tracking-widest text-[#16A34A] font-heading">
                      CONTACT US
                    </span>
                  </div>

                  <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Nesapakkam, KK Nagar Hub</span>
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#14532D] font-heading tracking-tight leading-tight mb-3">
                  Get Your Personalized Physio Plan Today
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-8">
                  Fill in your details and our senior clinical coordinator will suggest the best physiotherapy solution for your recovery.
                </p>

                {/* Form & Trust Points Split Sub-Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
                  {/* Left Column (5 cols): Key Benefits with Circular Green Badges */}
                  <div className="md:col-span-5 space-y-4">
                    {[
                      { icon: User, title: "Free Consultation", desc: "No charge for initial triage" },
                      { icon: Clock, title: "15-Min Response", desc: "Fast call from coordinator" },
                      { icon: ShieldCheck, title: "BPT / MPT Licensed", desc: "University-certified experts" },
                      { icon: Award, title: "Certified Equipment", desc: "TENS, Ultrasound, CPM brought" },
                      { icon: HeartHandshake, title: "Zero Prepayment", desc: "Pay only after session" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 group">
                        <div className="w-9 h-9 rounded-full bg-[#F0FDF4] border border-emerald-200 text-[#16A34A] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#16A34A] group-hover:text-white transition-all duration-200 mt-0.5">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs sm:text-sm font-bold text-slate-900 font-heading leading-tight">
                            {item.title}
                          </span>
                          <span className="block text-[11px] text-slate-500 font-sans">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column (7 cols): Fast Form Inputs */}
                  <form onSubmit={handleSubmit} className="md:col-span-7 space-y-3.5">
                    {/* Full Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/90 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold text-xs sm:text-sm outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                      />
                    </div>

                    {/* Chennai Locality / District (Dropdown + Manual Search/Typing) */}
                    <div>
                      <ComboboxInput
                        value={formData.locality}
                        onChange={(val) => setFormData({ ...formData, locality: val })}
                        options={chennaiAreas}
                        placeholder="Select Chennai Area / Locality *"
                        required
                        icon={<MapPin className="w-4 h-4 text-emerald-600" />}
                        className="w-full pl-10 pr-16 py-3 rounded-xl bg-slate-50/90 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold text-xs sm:text-sm outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4 text-emerald-600" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/90 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold text-xs sm:text-sm outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address (Optional)"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50/90 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold text-xs sm:text-sm outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                      />
                    </div>

                    {/* Big Green Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-emerald-600/25 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Get Free Consultation via WhatsApp</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Bottom Quick Connect Row (Matches Image 2 & 3) */}
              <div className="pt-6 border-t border-slate-200/80">
                <span className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3 font-heading">
                  Or Connect Directly With Us:
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  {/* WhatsApp Chat Pill */}
                  <a
                    href="https://wa.me/919042718811?text=Hi%20OnlyPhysio%2C%20I%20would%20like%20to%20know%20more%20about%20your%20home%20physiotherapy%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handlePillClick("whatsapp")}
                    className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border font-heading font-black text-xs transition-all duration-300 cursor-pointer overflow-hidden ${
                      clickedPill === "whatsapp"
                        ? "bg-[#25D366] text-white border-[#25D366] shadow-[0_0_24px_rgba(37,211,102,0.6)] scale-105"
                        : "bg-emerald-50/90 hover:bg-[#25D366] border-emerald-300 hover:border-[#25D366] text-emerald-950 hover:text-white shadow-xs hover:shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:-translate-y-1 active:scale-95"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-700 group-hover:text-white fill-emerald-200 group-hover:fill-white/30 transition-colors" />
                    </div>
                    <span className="tracking-wide">
                      {clickedPill === "whatsapp" ? "Opening WhatsApp..." : "WhatsApp Chat"}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-white animate-pulse" />
                  </a>

                  {/* Direct Phone Call Pill */}
                  <a
                    href={`tel:${formatPhoneForTel(siteContent.contact.phone)}`}
                    onClick={() => handlePillClick("phone")}
                    className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border font-heading font-black text-xs transition-all duration-300 cursor-pointer overflow-hidden ${
                      clickedPill === "phone"
                        ? "bg-[#14532D] text-white border-[#14532D] shadow-[0_0_24px_rgba(20,83,45,0.6)] scale-105"
                        : "bg-slate-100 hover:bg-[#14532D] border-slate-300 hover:border-[#14532D] text-slate-900 hover:text-white shadow-xs hover:shadow-[0_8px_24px_rgba(20,83,45,0.4)] hover:-translate-y-1 active:scale-95"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-slate-200 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                      <Phone className="w-3.5 h-3.5 text-emerald-700 group-hover:text-white group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="tracking-wide font-mono">
                      {clickedPill === "phone" ? "Connecting Call..." : siteContent.contact.phoneDisplay}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 group-hover:text-emerald-200 bg-emerald-100/60 group-hover:bg-white/20 px-1.5 py-0.5 rounded transition-colors">
                      24/7
                    </span>
                  </a>

                  {/* Direct Email Pill */}
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    onClick={() => handlePillClick("email")}
                    className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border font-heading font-black text-xs transition-all duration-300 cursor-pointer overflow-hidden ${
                      clickedPill === "email"
                        ? "bg-[#2563EB] text-white border-[#2563EB] shadow-[0_0_24px_rgba(37,99,235,0.6)] scale-105"
                        : "bg-slate-100 hover:bg-[#2563EB] border-slate-300 hover:border-[#2563EB] text-slate-900 hover:text-white shadow-xs hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:scale-95"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-slate-200 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                      <Mail className="w-3.5 h-3.5 text-slate-600 group-hover:text-white group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <span className="tracking-wide">
                      {clickedPill === "email" ? "Opening Email..." : siteContent.contact.email}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Google Maps Location Embed Section (Matches Image 5) */}
        <div className="rounded-3xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
          <div className="p-4 sm:px-8 sm:py-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 bg-white">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#16A34A] font-heading block">
                  OnlyPhysio Clinic
                </span>
                <h3 className="text-base sm:text-lg font-black font-heading text-slate-900 leading-tight">
                  Nesapakkam, KK Nagar West, Chennai
                </h3>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#14532D] hover:bg-[#166534] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer shrink-0"
            >
              <span>Open In Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Google Map with Floating Pill (Mobile Responsive & Never Cut Off) */}
          <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-100">
            {/* Live Google Map Iframe centered on 13.03973, 80.191313 */}
            <iframe
              src="https://maps.google.com/maps?q=13.03973,80.191313&z=16&output=embed"
              title="OnlyPhysio Location Map - Nesapakkam, KK Nagar West, Chennai"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Floating Navigation Pill Card (Responsively Constrained to Viewport) */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md z-20 bg-[#132A1E] text-white rounded-2xl p-3 sm:p-4 shadow-[0_12px_30px_rgba(0,0,0,0.35)] border border-emerald-500/30 flex items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-300 font-heading truncate">
                    ONLY PHYSIO · CHENNAI
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-300 leading-tight font-sans truncate">
                    No-23, 12, Mariamman Kovil St, KK Nagar West, Nesapakkam, Chennai - 600078
                  </span>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-heading font-black text-xs uppercase tracking-wider shrink-0 inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
