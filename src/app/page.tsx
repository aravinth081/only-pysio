import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import ConditionsWeTreat from "@/components/sections/ConditionsWeTreat";
import HowItWorks from "@/components/sections/HowItWorks";
import BookingSection from "@/components/sections/BookingSection";
import PhysioTubes from "@/components/sections/PhysioTubes";
import QuickContact from "@/components/sections/QuickContact";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      {/* 1. Header (Utility bar, blur shrink, scroll hide/reveal, mobile drawer) */}
      <Header />

      {/* 2. Hero (Headline reveal, rotating text, magnetic CTAs, glass cards, pulse-line) */}
      <Hero />

      {/* 3. About Us (Banner, Who We Are, Why The Physio, Mission & Vision) */}
      <AboutUs />

      {/* 4. Conditions We Treat (Horizontal pinned strip + 20+ conditions modal) */}
      <ConditionsWeTreat />

      {/* 5. How It Works (4 pinned scroll-scrubbed steps + interactive Spine SVG) */}
      <HowItWorks />

      {/* 6. Booking Section (react-hook-form + zod validation + confetti) */}
      <BookingSection />

      {/* 7. PhysioTubes Section (3x3 Clinical Video Reel & Channel Library) */}
      <PhysioTubes />

      {/* 11. Quick Links + Quick Contact (Neighbourhood hub, details & embedded map) */}
      <QuickContact />

      {/* 12. Footer (Deep green, logo badge, social links, progress ring back-to-top) */}
      <Footer />
    </>
  );
}
