"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Calendar,
  X,
  UserCheck,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: "all" | "clinical" | "fitness" | "specialized";
  categoryLabel: string;
  image: string;
  therapistRole: string;
  therapistGender: "Male Specialist" | "Female Specialist";
  description: string;
  benefits: string[];
  fullOverview: string;
}

export const clinicServices: ServiceItem[] = [
  {
    id: "physio-therapy",
    number: "01",
    title: "Physio Therapy",
    category: "clinical",
    categoryLabel: "General Physio",
    image: "/images/services/physio-therapy.jpg",
    therapistRole: "Senior Clinical Physiotherapist",
    therapistGender: "Male Specialist",
    description:
      "Evidence-based manual therapy, joint articulation, and personalized physical rehabilitation to relieve acute and chronic musculoskeletal pain.",
    benefits: [
      "Rapid pain relief & inflammation reduction",
      "Manual joint mobilization & soft tissue release",
      "Personalized clinical recovery roadmap",
    ],
    fullOverview:
      "Our core physiotherapy service combines comprehensive clinical diagnosis with hands-on manual therapy, therapeutic modalities, and targeted corrective exercises to restore joint mobility, alleviate chronic pain, and rebuild strength.",
  },
  {
    id: "pilates-rehab",
    number: "02",
    title: "Pilates Rehab & Fitness",
    category: "fitness",
    categoryLabel: "Core & Posture",
    image: "/images/services/pilates-rehab.jpg",
    therapistRole: "Clinical Pilates Specialist",
    therapistGender: "Female Specialist",
    description:
      "State-of-the-art reformer Pilates combined with clinical physiotherapy to strengthen deep core muscles, restore spinal posture, and boost mobility.",
    benefits: [
      "Deep core & pelvic floor stabilization",
      "Low-impact spinal decompression & flexibility",
      "Postural realignment under expert guidance",
    ],
    fullOverview:
      "Clinical Pilates utilizes specialized spring-loaded reformer machines to provide low-impact, highly controlled resistance training. Perfect for spinal alignment, back rehabilitation, postural correction, and athletic flexibility.",
  },
  {
    id: "sports-massage",
    number: "03",
    title: "Sports Massage",
    category: "fitness",
    categoryLabel: "Athletic Recovery",
    image: "/images/services/sports-massage.jpg",
    therapistRole: "Sports Physiotherapy Specialist",
    therapistGender: "Male Specialist",
    description:
      "Intensive targeted deep-tissue massage designed to release stubborn myofascial adhesions, accelerate lactic flushing, and prevent athletic injuries.",
    benefits: [
      "Deep muscle recovery & trigger point release",
      "Accelerated circulation & lymphatic drainage",
      "Pre-competition prep & post-event recovery",
    ],
    fullOverview:
      "Targeted sports massage therapies work deep into muscle bellies and tendon junctions to eliminate knots, alleviate muscle soreness (DOMS), increase range of motion, and shorten turnaround times between demanding physical activities.",
  },
  {
    id: "rehab-training",
    number: "04",
    title: "Rehab Training",
    category: "fitness",
    categoryLabel: "Strength & Agility",
    image: "/images/services/rehab-training.jpg",
    therapistRole: "Performance Rehabilitation Coach",
    therapistGender: "Female Specialist",
    description:
      "Structured progressive functional training bridging the gap from pain relief to full biomechanical strength, endurance, and athletic performance.",
    benefits: [
      "Dynamic resistance & functional movement drills",
      "Biomechanical re-education & injury proofing",
      "Safe return-to-sport physical conditioning",
    ],
    fullOverview:
      "Our Rehab Training programs move beyond symptom management into high-performance kinetic conditioning. We prepare your muscles, tendons, and joints to withstand real-world loads, preventing re-injury and elevating athletic capability.",
  },
  {
    id: "fms",
    number: "05",
    title: "Functional Movement Screening",
    category: "fitness",
    categoryLabel: "Biomechanical Assessment",
    image: "/images/services/functional-movement-screening.jpg",
    therapistRole: "Biomechanics & FMS Clinician",
    therapistGender: "Male Specialist",
    description:
      "Standardized clinical movement screening to detect hidden joint restrictions, muscular imbalances, and asymmetry before injuries can develop.",
    benefits: [
      "7-point standardized movement competency test",
      "Early identification of injury risk factors",
      "Customized corrective exercise prescription",
    ],
    fullOverview:
      "Functional Movement Screening (FMS) is the international gold standard for assessing fundamental movement patterns. By identifying compensatory mechanics and bilateral imbalances, we create precision corrective protocols to bulletproof your movement.",
  },
  {
    id: "group-exercises",
    number: "06",
    title: "Physio Rehab Group Exercises",
    category: "fitness",
    categoryLabel: "Group Wellness",
    image: "/images/services/group-exercises.jpg",
    therapistRole: "Group Rehabilitation Instructor",
    therapistGender: "Female Specialist",
    description:
      "Energetic, small-group corrective exercise sessions focusing on spinal stability, balance coordination, and full-body posture conditioning.",
    benefits: [
      "Guided Swiss ball & posture correction classes",
      "Supportive, motivating community atmosphere",
      "Cost-effective ongoing physical maintenance",
    ],
    fullOverview:
      "Small-group rehabilitation combines the professional supervision of an expert physiotherapist with the camaraderie and energy of group fitness. Ideal for maintenance rehab, balance conditioning, and posture maintenance.",
  },
  {
    id: "spinal-decompression",
    number: "07",
    title: "Spinal Decompression Therapy",
    category: "clinical",
    categoryLabel: "Advanced Spine Care",
    image: "/images/services/spinal-decompression.jpg",
    therapistRole: "Spine & Decompression Clinician",
    therapistGender: "Male Specialist",
    description:
      "Computerized, non-surgical motorized traction table therapy that gently elongates the spine to relieve herniated, bulging discs and sciatica.",
    benefits: [
      "Non-invasive negative disc pressure relief",
      "Clinically targeted cervical & lumbar traction",
      "Immediate alleviation of radiating nerve pain",
    ],
    fullOverview:
      "Spinal Decompression Therapy creates negative intra-discal pressure inside the vertebral column, allowing bulging and herniated disc material to retract while infusing injured discs with oxygen, fluid, and healing nutrients.",
  },
  {
    id: "antenatal-postnatal",
    number: "08",
    title: "Antenatal and Postnatal Rehab",
    category: "specialized",
    categoryLabel: "Women's Health",
    image: "/images/services/antenatal-postnatal-rehab.jpg",
    therapistRole: "Women's Health Physiotherapist",
    therapistGender: "Female Specialist",
    description:
      "Compassionate specialized physiotherapy for mothers to manage pregnancy back pain, pelvic girdle instability, and post-delivery core recovery.",
    benefits: [
      "Safe prenatal pelvic girdle & lumbar relief",
      "Diastasis recti healing & core re-education",
      "Pelvic floor conditioning & posture support",
    ],
    fullOverview:
      "Tailored specifically for expectant and new mothers. Our evidence-based protocols safely alleviate pelvic girdle pain (PGP), sacroiliac joint discomfort, and pregnancy sciatica, while facilitating postpartum pelvic floor and abdominal wall recovery.",
  },
  {
    id: "neuro-rehab",
    number: "09",
    title: "Neuro Rehab",
    category: "specialized",
    categoryLabel: "Neurological Care",
    image: "/images/services/neuro-rehab.jpg",
    therapistRole: "Neurological Rehabilitation Specialist",
    therapistGender: "Male Specialist",
    description:
      "Specialized neuromuscular rehabilitation for stroke, Parkinson's disease, nerve injuries, and balance deficits to re-educate gait and coordination.",
    benefits: [
      "Neuromuscular re-education & step coordination",
      "Balance training & fall risk reduction",
      "Parallel-bar functional mobility restoration",
    ],
    fullOverview:
      "Leveraging neuroplasticity to rebuild neural pathways after stroke, spinal cord injury, or neurodegenerative conditions. Our dedicated therapists guide patients through progressive balance, gait, and fine motor coordination retraining.",
  },
  {
    id: "paediatric-rehab",
    number: "10",
    title: "Paediatric Rehab",
    category: "specialized",
    categoryLabel: "Child Health",
    image: "/images/services/paediatric-rehab.jpg",
    therapistRole: "Paediatric Physiotherapy Specialist",
    therapistGender: "Female Specialist",
    description:
      "Warm, play-based physical therapy tailored for infants, children, and teens with developmental mobility delays, posture issues, or sports injuries.",
    benefits: [
      "Child-friendly sensory & motor development",
      "Posture, scoliosis & growing pains care",
      "Gentle milestone progression & confidence building",
    ],
    fullOverview:
      "We create a warm, engaging, and supportive clinical environment where children and adolescents overcome motor delays, postural deviations, torticollis, or sports injuries through gentle, evidence-based pediatric therapy.",
  },
  {
    id: "geriatric-rehab",
    number: "11",
    title: "Geriatric Rehab",
    category: "specialized",
    categoryLabel: "Senior Wellness",
    image: "/images/services/geriatric-rehab.jpg",
    therapistRole: "Senior Mobility & Geriatric Specialist",
    therapistGender: "Male Specialist",
    description:
      "Gentle, patient-centered therapy dedicated to seniors to improve joint flexibility, enhance walking stability, manage arthritis, and stay active.",
    benefits: [
      "Safe fall-prevention & gait stabilization",
      "Osteoarthritis, osteoporosis & joint ease",
      "Preserving everyday independence & vitality",
    ],
    fullOverview:
      "Designed specifically for older adults seeking to stay active, mobile, and confident. We focus on gentle joint mobilization, fall prevention protocols, post-joint replacement recovery, and muscle maintenance for lifelong independence.",
  },
];

export const ConditionsWeTreat: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isArrowPaused, setIsArrowPaused] = useState(false);
  const [detailModalService, setDetailModalService] = useState<ServiceItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollTo } = useSmoothScroll();

  // Determine if motion should be paused:
  // Pauses when user clicked a card, hovers, or clicked manual left/right arrow buttons
  const isAutoScrollPaused = Boolean(
    selectedCardId || isHoverPaused || isManualPaused || isArrowPaused
  );

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (manualTimeoutRef.current) {
        clearTimeout(manualTimeoutRef.current);
      }
    };
  }, []);

  // Smooth continuous slow auto-scrolling loop
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Slow, relaxing speed: ~0.55px per animation frame
    const speed = 0.55;

    const step = () => {
      if (el && !isAutoScrollPaused) {
        el.scrollLeft += speed;

        // Check bidirectional seamless wrapping
        const maxScroll = el.scrollWidth / 2;
        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft -= maxScroll;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += maxScroll;
        }
      }
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoScrollPaused]);

  // Card click / unclick toggle handler
  const handleCardClick = (serviceId: string) => {
    setSelectedCardId((prev) => (prev === serviceId ? null : serviceId));
  };

  // Manual arrow navigation with smooth card-by-card stepping and bidirectional infinite loop
  const scrollByAmount = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    // 1. Briefly pause the background auto-scroll loop only for the duration of the smooth scroll easing
    setIsArrowPaused(true);
    if (manualTimeoutRef.current) {
      clearTimeout(manualTimeoutRef.current);
    }
    manualTimeoutRef.current = setTimeout(() => {
      setIsArrowPaused(false);
    }, 480);

    // 2. Measure actual card width + gap dynamically
    const firstCard = el.querySelector(".group") as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth || 340;
    const gap = 24;
    const stepDistance = cardWidth + gap;

    const maxScroll = el.scrollWidth / 2;

    if (direction === "left") {
      // If we are at or near the start (<= 20px), jump seamlessly to the duplicate second half first
      if (el.scrollLeft <= 20) {
        el.scrollLeft = maxScroll + el.scrollLeft;
      }
      el.scrollBy({ left: -stepDistance, behavior: "smooth" });
    } else {
      // If we are at or near the halfway mark, jump back seamlessly to the first half
      if (el.scrollLeft >= maxScroll - 20) {
        el.scrollLeft = el.scrollLeft - maxScroll;
      }
      el.scrollBy({ left: stepDistance, behavior: "smooth" });
    }
  };

  const handleBookService = (service: ServiceItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("onlyphysio_selected_service", service.title);
    }
    scrollTo("#booking");
  };

  const handleOpenDetailModal = (service: ServiceItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDetailModalService(service);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative pt-10 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 bg-gradient-to-b from-white via-slate-50/70 to-white overflow-hidden scroll-mt-20"
      aria-label="Our Clinical Services"
    >
      {/* Target for backward compatibility with existing links */}
      <span id="conditions" className="absolute -top-20 left-0 pointer-events-none" />

      {/* Ambient Decorative Blurs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-emerald-100/40 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-200/25 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Centered "OUR SERVICES" Heading in Image 1 Model */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center max-w-2xl px-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase font-heading mb-3">
              OUR{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                SERVICES
              </span>
            </h2>

            {/* 3-Pill Accent Divider matching Image 1 Model */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-1 w-8 rounded-full bg-emerald-200" />
              <div className="h-1.5 w-14 rounded-full bg-emerald-600 shadow-sm shadow-emerald-500/30" />
              <div className="h-1 w-8 rounded-full bg-emerald-200" />
            </div>


            <p className="font-heading font-medium text-[15px] sm:text-base lg:text-[17px] text-slate-600 leading-relaxed max-w-2xl tracking-normal">
              Specialized <span className="font-bold text-slate-900">1-on-1 clinical physiotherapy</span> delivered by experienced specialists to <span className="font-bold text-emerald-700">relieve pain</span>, restore strength, and accelerate natural recovery.
            </p>
          </motion.div>
        </div>


        {/* Selected Card Status Indicator / Helper Pill (Centered) */}
        <AnimatePresence>
          {selectedCardId && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-semibold font-heading shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>
                  Selected: <strong>{clinicServices.find((s) => s.id === selectedCardId)?.title}</strong> (Auto-Glide Paused)
                </span>
                <button
                  onClick={() => {
                    const s = clinicServices.find((s) => s.id === selectedCardId);
                    if (s) setDetailModalService(s);
                  }}
                  className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  View Full Details
                </button>
                <button
                  onClick={() => setSelectedCardId(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline underline-offset-2"
                >
                  Resume Auto-Glide
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            CONTINUOUS AUTO-SCROLL SHOWCASE
            Slow gliding marquee strictly styled like Image 1 with Image 2 badges
            ========================================================================= */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHoverPaused(true)}
          onMouseLeave={() => setIsHoverPaused(false)}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 cursor-pointer"
        >
          {/* Render duplicated list for seamless continuous infinite loop */}
          {[...clinicServices, ...clinicServices].map((service, idx) => {
            const isSelected = selectedCardId === service.id;

            return (
              <div
                key={`${service.id}-${idx}`}
                onClick={() => handleCardClick(service.id)}
                className={`group relative flex flex-col rounded-3xl bg-white border transition-all duration-500 w-[315px] xs:w-[330px] sm:w-[350px] lg:w-[370px] shrink-0 overflow-hidden cursor-pointer select-none ${
                  isSelected
                    ? "border-emerald-500 ring-4 ring-emerald-400/40 shadow-2xl scale-[1.02]"
                    : "border-slate-200/90 hover:border-emerald-400/80 shadow-soft-sm hover:shadow-soft-xl hover:-translate-y-1.5"
                }`}
              >
                {/* -------------------------------------------------------------
                    PHOTO CARD: Title at top, specialist tag at bottom, no numbers
                    Mobile: aspect-[4/3] (taller & larger images for high impact)
                    Desktop: aspect-[16/11] (balanced wide format)
                    ------------------------------------------------------------- */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={`${service.title} - ${service.therapistRole}`}
                    fill
                    loading={idx < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 330px, (max-width: 1024px) 350px, 370px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gentle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

                  {/* Top-Left Title Badge (Replaced category text with service title, no numbers) */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/70 text-slate-950 text-xs sm:text-[12.5px] font-black uppercase tracking-wider font-heading shadow-md truncate max-w-full">
                      {service.title}
                    </span>
                  </div>


                  {/* Bottom-Right Male/Female Specialist Tag */}
                  <div className="absolute bottom-3.5 right-3.5 text-white text-xs z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-emerald-300 font-heading shadow-sm">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {service.therapistGender}
                    </span>
                  </div>

                </div>

              </div>

            );
          })}
        </div>

        {/* =========================================================================
            NAVIGATION CONTROLS: Left & Right Move Buttons Positioned on Right Side End
            ========================================================================= */}
        <div className="flex items-center justify-end gap-3 mt-3 sm:mt-4 mb-2">
          <button
            onClick={() => scrollByAmount("left")}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 active:scale-90 flex items-center justify-center transition-all shadow-md hover:shadow-lg cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scrollByAmount("right")}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-700 active:scale-90 flex items-center justify-center transition-all shadow-md hover:shadow-lg cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>


        {/* =========================================================================
            CLINICAL TRIAGE GUIDANCE BANNER
            Luxury high-end medical banner with trust badges & dynamic CTA
            ========================================================================= */}
        <div className="mt-10 relative rounded-3xl bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70 border border-emerald-200/90 shadow-[0_8px_30px_rgba(16,185,129,0.07)] p-6 sm:p-8 overflow-hidden">
          {/* Ambient Lighting Accents */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left Content Area: Icon + Eyebrow + Title + Subtitle + Micro-Tags */}
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Clinical Stethoscope Doctor Avatar */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 shrink-0 mt-0.5 border border-emerald-500/30">
                <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.2} />
              </div>


              <div>
                {/* Primary Title */}
                <h3 className="text-lg sm:text-xl font-black text-slate-950 font-heading tracking-tight leading-tight">
                  Not sure which service fits your condition?
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 font-medium max-w-xl">
                  Our senior clinicians provide detailed initial triage and diagnostic mobility assessment to map your exact recovery plan.
                </p>

                {/* Micro-Features / Trust Badges */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[11px] sm:text-xs font-bold text-slate-700 font-heading">
                  <span className="inline-flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Male & Female Senior Clinicians</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Chennai-Wide Homecare Visits</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Evidence-Based Modalities</span>
                  </span>
                </div>

              </div>

            </div>


            {/* Right Action CTA Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
              <button
                onClick={() => scrollTo("#booking")}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-primary to-emerald-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-primary text-white text-xs sm:text-sm font-black uppercase tracking-wider font-heading shadow-[0_4px_18px_rgba(22,163,74,0.35)] hover:shadow-[0_6px_24px_rgba(22,163,74,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                <span>Consult Our Physio Team</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          SERVICE DETAIL POPUP MODAL
          ========================================================================= */}
      <AnimatePresence>
        {detailModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailModalService(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col max-h-[90vh]"
            >
              {/* Modal Image Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Image
                  src={detailModalService.image}
                  alt={detailModalService.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <button
                  onClick={() => setDetailModalService(null)}
                  className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 active:scale-95 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 font-heading">
                    {detailModalService.categoryLabel} • {detailModalService.therapistGender}
                  </span>
                  <h3 className="text-2xl font-black font-heading mt-0.5">
                    {detailModalService.title}
                  </h3>
                </div>

              </div>


              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed font-heading">
                  {detailModalService.fullOverview}
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-900 font-heading uppercase tracking-wide">
                    Key Clinical Highlights:
                  </h4>
                  {detailModalService.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>

                  ))}
                </div>


                <div className="pt-2">
                  <button
                    onClick={() => {
                      const s = detailModalService;
                      setDetailModalService(null);
                      handleBookService(s);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-black font-heading uppercase tracking-wide hover:shadow-lg transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Book {detailModalService.title}
                  </button>
                </div>

              </div>

            </motion.div>
          </div>

        )}
      </AnimatePresence>
    </section>
  );
};

export default ConditionsWeTreat;
