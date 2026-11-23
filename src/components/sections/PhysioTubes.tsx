"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  X,
  Youtube,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calendar,
  Maximize2,
  Volume2,
  RotateCcw,
} from "lucide-react";
import { physioTubeVideos, PhysioTubeVideo } from "@/data/physiotubes";
import { siteContent } from "@/data/content";

export const PhysioTubes: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "lectures" | "shorts">("all");
  const [playingInlineId, setPlayingInlineId] = useState<string | null>(null);
  const [modalVideo, setModalVideo] = useState<PhysioTubeVideo | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalVideo(null);
      }
    };
    if (modalVideo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalVideo]);

  // Preload all thumbnails immediately on mount for zero-latency instant tab switching
  useEffect(() => {
    physioTubeVideos.forEach((video) => {
      const img = new window.Image();
      img.src = video.thumbnail;
    });
  }, []);


  const handleOpenFullView = (video: PhysioTubeVideo) => {
    // If inline video was playing, pause it by setting inline null
    setPlayingInlineId(null);
    setModalVideo(video);
  };

  return (
    <section
      id="physiotubes"
      className="relative py-24 sm:py-28 bg-[#F8FAF8] text-slate-900 overflow-hidden border-t border-slate-200/80"
    >
      {/* Subtle Ambient Decorative Lighting */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-teal-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#14532D] tracking-tight leading-tight mb-4">
            Visual Anatomy &amp; Therapy Guides
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Curated clinical demonstrations, joint biomechanics, and rehabilitation techniques directly from our YouTube channel{" "}
            <a
              href="https://www.youtube.com/@onlyphysio5993"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#16A34A] font-bold hover:underline inline-flex items-center gap-0.5"
            >
              Only Physio
              <ExternalLink className="w-3.5 h-3.5 inline ml-0.5" />
            </a>
            . Tap any video to play instantly with sound, or click Full View to watch in large theatre mode on the website.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 flex-wrap">
            <button
              onClick={() => {
                setActiveFilter("all");
                setPlayingInlineId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-heading transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[#14532D] text-white shadow-sm scale-102"
                  : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-100"
              }`}
            >
              All Videos ({physioTubeVideos.length})
            </button>

            <button
              onClick={() => {
                setActiveFilter("lectures");
                setPlayingInlineId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-heading transition-all cursor-pointer ${
                activeFilter === "lectures"
                  ? "bg-[#14532D] text-white shadow-sm scale-102"
                  : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-100"
              }`}
            >
              Clinical Lectures (5)
            </button>

            <button
              onClick={() => {
                setActiveFilter("shorts");
                setPlayingInlineId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-heading transition-all cursor-pointer ${
                activeFilter === "shorts"
                  ? "bg-[#14532D] text-white shadow-sm scale-102"
                  : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-100"
              }`}
            >
              ⚡ Anatomy Shorts (5)
            </button>
          </div>
        </div>

        {/* 3x3 Responsive Video Grid (All videos rendered in DOM for 0ms instant tab switching) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {physioTubeVideos.map((video) => {
            const isPlayingInline = playingInlineId === video.id;
            const isVisible =
              activeFilter === "all" ||
              (activeFilter === "lectures" && !video.isShort) ||
              (activeFilter === "shorts" && video.isShort);

            return (
              <article
                key={video.id}
                className={`group relative rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/50 shadow-xs hover:shadow-[0_16px_36px_rgba(20,83,45,0.09)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex-col ${
                  isVisible ? "flex" : "hidden"
                }`}
              >
                {/* Video Container (16:9 aspect ratio) */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  {isPlayingInline ? (
                    /* Inline Interactive Player with Sound */
                    <div className="relative w-full h-full bg-black">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />

                      {/* Floating Top Controls Overlay while playing */}
                      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-2 pointer-events-auto">
                        {/* Full View Button */}
                        <button
                          onClick={() => handleOpenFullView(video)}
                          className="px-2.5 py-1.5 rounded-lg bg-black/85 hover:bg-emerald-600 text-white font-heading font-black text-[11px] backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
                          title="Open in Website Full View Mode"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-white" />
                          <span>Full View</span>
                        </button>

                        {/* Close / Return to Thumbnail */}
                        <button
                          onClick={() => setPlayingInlineId(null)}
                          className="p-1.5 rounded-lg bg-black/85 hover:bg-red-600 text-white backdrop-blur-md transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
                          title="Close inline video"
                        >
                          <X className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>

                      {/* Sound Playing Indicator */}
                      <div className="absolute bottom-2.5 left-2.5 z-20 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-emerald-400 font-heading font-bold text-[10px] uppercase tracking-wider border border-emerald-500/30">
                          <Volume2 className="w-3 h-3 text-emerald-400" />
                          <span>Audio Live</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Poster Thumbnail with Touch/Click to Play & Full View Icon */
                    <div
                      onClick={() => setPlayingInlineId(video.id)}
                      className="relative w-full h-full cursor-pointer group/thumb"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPlayingInlineId(video.id);
                        }
                      }}
                      aria-label={`Play ${video.title} inline`}
                    >
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        loading="lazy"
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Gradient Overlay for Depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/25 pointer-events-none" />

                      {/* Category Badge on Top-Left */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[#14532D] font-heading font-black text-[10px] uppercase tracking-wider shadow-sm pointer-events-none">
                        {video.category}
                      </span>

                      {/* Full View Icon Button on Top-Right */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenFullView(video);
                        }}
                        className="absolute top-3 right-3 z-20 px-2.5 py-1.5 rounded-xl bg-black/75 hover:bg-emerald-600 text-white backdrop-blur-md flex items-center gap-1.5 transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer border border-white/20 group/fv"
                        title="Watch Full View on Website"
                        aria-label="Open Full View on Website"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-white" />
                        <span className="text-[11px] font-bold font-heading pr-0.5">Full View</span>
                      </button>

                      {/* Duration / Shorts Badge on Bottom-Right */}
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-white font-sans font-bold text-[11px] flex items-center gap-1 pointer-events-none">
                        {video.isShort ? (
                          <>
                            <span className="text-yellow-400">⚡</span>
                            <span>Short</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-slate-300" />
                            <span>{video.duration}</span>
                          </>
                        )}
                      </span>

                      {/* YouTube Red Play Button (Centered with Pulse Glow on Hover) */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-13 h-13 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(255,0,0,0.5)] transition-all duration-300 group-hover:scale-115 group-hover:shadow-[0_0_35px_rgba(255,0,0,0.7)]">
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        </div>
                      </div>

                      {/* Tap to Play hint overlay on bottom-left */}
                      <div className="absolute bottom-3 left-3 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[10px] font-bold font-heading border border-emerald-500/30">
                          <Play className="w-2.5 h-2.5 fill-emerald-300" />
                          <span>Tap to Play</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => {
                        if (!isPlayingInline) {
                          setPlayingInlineId(video.id);
                        }
                      }}
                      className="font-heading font-black text-slate-900 text-sm sm:text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2 cursor-pointer"
                      title={video.title}
                    >
                      {video.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2 mb-4">
                      {video.description}
                    </p>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500 font-semibold shrink-0">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">
                        OP
                      </span>
                      <span className="text-[11px] font-bold text-slate-700">Only Physio</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Play / Tap Action */}
                      <button
                        onClick={() => {
                          if (isPlayingInline) {
                            setPlayingInlineId(null);
                          } else {
                            setPlayingInlineId(video.id);
                          }
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-heading font-bold transition-all cursor-pointer ${
                          isPlayingInline
                            ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {isPlayingInline ? (
                          <>
                            <RotateCcw className="w-3 h-3 text-slate-600" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-emerald-700 text-emerald-700" />
                            <span>Play</span>
                          </>
                        )}
                      </button>

                      {/* Full View Icon Button */}
                      <button
                        onClick={() => handleOpenFullView(video)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14532D] hover:bg-[#166534] text-white font-heading font-bold text-[11px] uppercase tracking-wider transition-all duration-200 hover:scale-103 active:scale-95 shadow-xs cursor-pointer"
                        title="Open Full View on Website"
                      >
                        <Maximize2 className="w-3 h-3 text-emerald-300" />
                        <span>Full View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Channel Banner Callout - Fully Responsive & Perfectly Aligned */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14532D] via-[#166534] to-[#0F3E22] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 border border-emerald-500/25">
          {/* Brand Info & Channel Identity */}
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5 text-center md:text-left w-full md:w-auto">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-lg p-1.5 bg-white flex items-center justify-center hover:scale-105 transition-transform duration-200">
              <div className="relative w-full h-full">
                <Image
                  src="/images/youtube-badge.webp"
                  alt="Official YouTube Channel"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>

            <div className="max-w-xl">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-emerald-300 font-heading block">
                Official YouTube Channel
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight leading-tight mt-1">
                Subscribe to Only Physio on YouTube
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
                Get new physiotherapy exercises, joint mobilization tutorials, and posture rehabilitation routines updated weekly.
              </p>
            </div>
          </div>

          {/* Action Buttons (Stacked & Full-Width on Mobile, Horizontal on Desktop) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0 justify-center">
            <a
              href="https://www.youtube.com/@onlyphysio5993?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-xl hover:scale-103 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FFFFFF"/>
                <polygon points="9.545,15.568 15.818,12 9.545,8.432" fill="#FF0000"/>
              </svg>
              <span>Subscribe Now</span>
            </a>

            <Link
              href="/book"
              prefetch={true}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-[#14532D] font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-103 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-emerald-100"
            >
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Website Full View Lightbox Modal Player */}
      {modalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalVideo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-emerald-500/30 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950 border border-emerald-700/60 px-2.5 py-0.5 rounded-full shrink-0">
                  {modalVideo.category}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span>HD Video &amp; Audio</span>
                </span>
                <h4 className="font-heading font-black text-sm text-white truncate max-w-md">
                  {modalVideo.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setModalVideo(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
                  title="Close Full View (Esc)"
                  aria-label="Close Full View"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 16:9 Large Video Player Container with Autoplay and Sound */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${modalVideo.id}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`}
                title={modalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Bottom Detail & Actions Bar */}
            <div className="p-4 sm:p-5 bg-slate-950/95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
              <div className="min-w-0">
                <h3 className="text-white font-heading font-black text-sm sm:text-base leading-snug mb-1 truncate">
                  {modalVideo.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans line-clamp-2 max-w-2xl">
                  {modalVideo.description}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto flex-wrap">
                <a
                  href={modalVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Open on YouTube</span>
                </a>

                <Link
                  href="/book"
                  onClick={() => setModalVideo(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhysioTubes;
