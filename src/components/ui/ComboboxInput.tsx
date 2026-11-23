"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";

interface ComboboxInputProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  timeOnly?: boolean;
  numericOnly?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function ComboboxInput({
  value,
  onChange,
  options,
  placeholder,
  required,
  timeOnly,
  numericOnly,
  icon,
  className,
}: ComboboxInputProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (numericOnly || timeOnly) {
      // Allow functional / navigation keys
      const functionalKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ];
      if (functionalKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      // Explicitly block all alphabetic characters
      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        return;
      }

      if (numericOnly) {
        if (!/^[0-9]$/.test(e.key)) {
          e.preventDefault();
        }
      } else if (timeOnly) {
        // Only allow numbers and time punctuation (0-9, :, -, space, .)
        if (!/^[0-9:\-\.\s]$/.test(e.key)) {
          e.preventDefault();
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleanVal = e.target.value;
    if (numericOnly) {
      cleanVal = cleanVal.replace(/[^0-9]/g, "");
    } else if (timeOnly) {
      // Strip any letters and non-time characters
      cleanVal = cleanVal.replace(/[a-zA-Z]/g, "").replace(/[^0-9:\-\.\s]/g, "");
    }
    onChange(cleanVal);
    setOpen(true);
  };

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes((value || "").toLowerCase())
  );
  const displayList = filtered.length > 0 ? filtered : options;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400 z-10">
            {icon}
          </div>
        )}

        <input
          type="text"
          inputMode={numericOnly || timeOnly ? "numeric" : undefined}
          required={required}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className={
            className ||
            `w-full ${
              icon ? "pl-10" : "px-4"
            } py-3.5 pr-16 rounded-xl bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-slate-950 font-semibold placeholder:text-slate-400 placeholder:font-normal text-sm outline-none transition-all duration-200 shadow-xs`
          }
        />

        {value ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              setOpen(true);
            }}
            className="absolute right-8 p-1 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
            title="Clear text"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="absolute right-2.5 p-1.5 text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer"
          title="Toggle dropdown list"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-180 text-emerald-600" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200/90 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] max-h-64 overflow-y-auto z-50 py-1.5 divide-y divide-slate-100">
          <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-50/90 flex items-center justify-between border-b border-slate-100">
            <span>Select Option or Type Manual</span>
            <span className="text-[9px] text-emerald-700 font-bold uppercase">({displayList.length} available)</span>
          </div>

          {value && !options.some((o) => o.toLowerCase() === value.toLowerCase()) && (
            <div className="px-3.5 py-2.5 bg-emerald-50/80 text-xs text-emerald-950 font-bold flex items-center justify-between border-b border-emerald-100">
              <span className="truncate">Custom: &ldquo;{value}&rdquo;</span>
              <span className="text-[9px] bg-white text-emerald-800 px-2 py-0.5 rounded font-black uppercase border border-emerald-300 shrink-0">
                Manual Entry
              </span>
            </div>
          )}

          {displayList.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-950 transition-colors flex items-center justify-between cursor-pointer ${
                value === option ? "bg-emerald-50/90 font-black text-emerald-900" : "text-slate-800"
              }`}
            >
              <span>{option}</span>
              {value === option && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
