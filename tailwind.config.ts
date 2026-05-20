import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // RIZAL brand navy (from logo) - used as the primary "ink" tone
        ink: {
          DEFAULT: "#1A2845",
          50: "#F4F1EC",
          900: "#0B0F1C",
        },
        // RIZAL brand orange (from logo) - primary accent color
        brand: {
          DEFAULT: "#F47B20",
          50: "#FFF4EA",
          100: "#FFE4CC",
          200: "#FFC999",
          300: "#FFAD66",
          400: "#FB9143",
          500: "#F47B20",
          600: "#D5640D",
          700: "#A14C0A",
          800: "#6E3306",
          900: "#3F1D03",
        },
        // Luxury sand kept as secondary accent (CTAs, labels)
        sand: {
          DEFAULT: "#C9A96E",
          50: "#FBF7EE",
          100: "#F1E6CC",
          200: "#E2CB99",
          300: "#D4B583",
          400: "#C9A96E",
          500: "#B68F4E",
          600: "#977139",
          700: "#74552A",
          800: "#523B1D",
          900: "#312411",
        },
        bone: "#F4F1EC",
        wa: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        logo: ["var(--font-logo)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Cairo", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
        brand: "0.35em",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "shine": "shine 2.4s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #C9A96E 0%, #E2CB99 50%, #C9A96E 100%)",
        "gradient-brand": "linear-gradient(135deg, #F47B20 0%, #FB9143 50%, #F47B20 100%)",
        "gradient-ink": "linear-gradient(180deg, rgba(26,40,69,0) 0%, rgba(26,40,69,0.85) 70%, #1A2845 100%)",
        /** Copper / gold leaf wordmark — deep luxury orange family */
        "gradient-luxe-hero":
          "linear-gradient(115deg, #D35400 0%, #E67E22 28%, #EB984E 48%, #D68910 72%, #C9A96E 100%)",
        "gradient-luxe-nav":
          "linear-gradient(115deg, #9B3A00 0%, #D35400 32%, #E67E22 58%, #C9A96E 92%)",
        "gradient-luxe-deep":
          "linear-gradient(120deg, #7E2E00 0%, #D35400 40%, #E67E22 85%)",
      },
    },
  },
  plugins: [],
};

export default config;
