"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react";
import { siteContent, FaqItem } from "@/data/content";
import { formatPhoneForTel, formatWhatsAppUrl } from "@/lib/utils";

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const faqs = siteContent.faqs;

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative pt-20 sm:pt-28 pb-8 sm:pb-12 bg-soft overflow-hidden"
    >
      {/* Ambient background blur */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-primary-mint/40 rounded-full filter blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-primary-deep text-xs font-bold uppercase tracking-widest mb-4 font-heading"
          >
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight mb-4"
          >
            Clear Answers to Your Care Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Everything you need to know about our in-home consultations, treatment protocols, medical equipment rentals, and insurance coverage.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-soft-sm overflow-hidden transition-colors"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 font-heading tracking-tight">
                    {faq.question}
                  </span>

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-primary text-white rotate-180"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Collapsible Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Direct Help Bar Under FAQs */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100 shadow-soft-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900 font-heading">
              Have a specific medical or scheduling query?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Our clinical coordinator is available 9:00 AM – 9:00 PM every day to assist you.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={formatWhatsAppUrl(
                siteContent.contact.whatsappNumber,
                "Hi OnlyPhysio, I have a question about physiotherapy at home."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold text-xs hover:bg-emerald-600 transition-colors shadow-sm active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={`tel:${formatPhoneForTel(siteContent.contact.phone)}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors active:scale-95"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
