import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0F172A",
        soft: "#F4FAF6",
        primary: {
          DEFAULT: "#16A34A",
          hover: "#15803D",
          deep: "#14532D",
          mint: "#DCFCE7",
          glow: "#34D399",
        },
        navy: {
          badge: "#202530",
        },
        muted: {
          DEFAULT: "#475569",
          foreground: "#64748B",
        },
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-jakarta)", "sans-serif"],
      },
      borderRadius: {
        "xl": "1rem",     // 16px
        "2xl": "1.25rem", // 20px
        "3xl": "1.5rem",  // 24px
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "shine": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "shine": "shine 2.5s ease-in-out infinite",
      },
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(20, 83, 45, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)",
        "soft-md": "0 8px 24px -4px rgba(20, 83, 45, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 16px 36px -6px rgba(20, 83, 45, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
        "glow": "0 0 30px rgba(52, 211, 153, 0.35)",
        "glow-lg": "0 0 60px rgba(52, 211, 153, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
