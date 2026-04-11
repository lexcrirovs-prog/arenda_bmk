import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        industrial: {
          50: "#edf3f8",
          100: "#d2e0ed",
          200: "#b2c8dd",
          300: "#7b9bb9",
          400: "#4e7396",
          500: "#2d4d6c",
          600: "#1f3851",
          700: "#1A2B3C",
          800: "#122030",
          900: "#0c1722",
        },
        alert: {
          DEFAULT: "#F39C12",
          soft: "#ffcf7c",
          dark: "#9c6205",
        },
        slate: {
          50: "#f7f9fb",
          100: "#eef2f6",
          200: "#d9e1ea",
          300: "#9aaab9",
          400: "#6f7f8f",
          500: "#475666",
          600: "#344454",
          700: "#243140",
          800: "#16222e",
          900: "#0d141d",
        },
      },
      boxShadow: {
        panel: "0 24px 80px rgba(9, 18, 29, 0.16)",
        glow: "0 0 0 1px rgba(243, 156, 18, 0.18), 0 20px 60px rgba(12, 23, 34, 0.35)",
      },
      backgroundImage: {
        "industrial-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
