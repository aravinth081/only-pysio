"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, AlertCircle, Calendar } from "lucide-react";
import { siteContent } from "@/data/content";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

interface ConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCondition?: (conditionName: string) => void;
}

export const ConditionModal: React.FC<ConditionModalProps> = ({
  isOpen,
  onClose,
  onSelectCondition,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { scrollTo } = useSmoothScroll();

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    siteContent.conditions.allConditions.forEach((item) => set.add(item.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Filtered list
  const filteredConditions = useMemo(() => {
    return siteContent.conditions.allConditions.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle condition selection: scroll to booking form and set condition
  const handlePickCondition = (conditionName: string) => {
    if (onSelectCondition) {
      onSelectCondition(conditionName);
    }
    onClose();
    scrollTo("#booking");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="condition-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key="condition-modal-card"
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-soft via-white to-soft border-b border-slate-100 flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-mint text-primary-deep text-xs font-bold uppercase tracking-wider mb-2 font-heading">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Clinical Directory
                </div>
                <h3
                  id="modal-title"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight"
                >
                  All Conditions We Treat at Home
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Search through 20+ specialized clinical rehabilitation protocols or filter by anatomical category.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shrink-0 ml-4"
                aria-label="Close condition directory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input & Category Filter Chips */}
            <div className="p-6 border-b border-slate-100 bg-white space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search condition (e.g. Back pain, Stroke, Knee, Frozen shoulder)..."
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-white shadow-soft-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Results Grid */}
            <div className="p-6 overflow-y-auto flex-1 space-y-3 bg-slate-50/50">
              {filteredConditions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredConditions.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => handlePickCondition(item.name)}
                      className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/50 shadow-sm hover:shadow-soft-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded-md bg-primary-mint/50">
                            {item.category}
                          </span>
                          {item.urgency === "High" && (
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Urgent Care
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors font-heading">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-primary">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          Book for this condition
                        </span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">No conditions found</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Try searching with another keyword or browse all categories.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="p-4 px-6 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Don&apos;t see your specific diagnosis? Our senior physiotherapists conduct customized home evaluations for all movement issues.
              </span>
              <button
                onClick={() => handlePickCondition("General Consultation / Other")}
                className="font-bold text-primary hover:underline whitespace-nowrap"
              >
                Book General Assessment →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConditionModal;
