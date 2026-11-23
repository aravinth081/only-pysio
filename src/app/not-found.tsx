import Link from "next/link";
import { ArrowLeft, Compass, HeartPulse } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-soft flex flex-col items-center justify-center p-6 text-center">
      {/* Background soft ambiance */}
      <div className="absolute w-96 h-96 bg-primary-mint/40 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        {/* Visual Icon */}
        <div className="w-20 h-20 rounded-3xl bg-white border border-emerald-100 shadow-soft-md flex items-center justify-center text-primary mb-6">
          <HeartPulse className="w-10 h-10 animate-pulse" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading mb-2">
          404 • PAGE NOT FOUND
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-3">
          Let&apos;s Get You Back on Track
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
          The page you are looking for may have moved or no longer exists. Return to the OnlyPhysio home page or schedule a physiotherapy session.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-soft-sm hover:bg-primary-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/#booking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-100 transition-colors"
          >
            <Compass className="w-4 h-4 text-primary" />
            <span>Book Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
