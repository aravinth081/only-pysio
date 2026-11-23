"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, ShoppingBag, Truck, HeartHandshake } from "lucide-react";
import { siteContent, ServiceOffering } from "@/data/content";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

export const OtherServices: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const services = siteContent.otherServices;

  const handleServiceSelect = (serviceTitle: string) => {
    scrollTo("#booking");
  };

  return (
    <section
      id="other-services"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-mint/40 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-primary-deep text-xs font-bold uppercase tracking-widest mb-4 font-heading"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>MORE REHABILITATION SOLUTIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight mb-4"
          >
            Specialized Homecare & Clinical Equipment
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            From doctor-guided home physiotherapy visits to certified medical equipment rental and sales, we empower every facet of your recovery.
          </motion.p>
        </div>

        {/* 3 Large Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group relative flex flex-col rounded-3xl bg-white border border-slate-200 shadow-soft-sm hover:shadow-soft-lg overflow-hidden transition-all duration-300"
            >
              {/* Image Container with Hover Zoom & Gradient Vignette */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-primary-deep backdrop-blur-md shadow-sm font-heading">
                    {service.badge}
                  </span>
                </div>

                {/* Tagline at bottom of image */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-medium text-emerald-200">
                    {service.tagline}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-primary transition-colors font-heading mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Highlight Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                    {service.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button Action */}
                <button
                  onClick={() => handleServiceSelect(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary shadow-sm transition-all duration-300 active:scale-95"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherServices;
