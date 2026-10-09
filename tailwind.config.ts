import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      colors: {
        // Brand navy, sampled from the SAZ Vida logo and deck
        ink: {
          50: "#f3f5fb",
          100: "#e6eaf6",
          200: "#c9d1ec",
          300: "#a0aedc",
          400: "#7083c4",
          500: "#4b5eab",
          600: "#3a4a92",
          700: "#2e3a78",
          800: "#232c5e",
          900: "#1b2149",
          950: "#10142e",
        },
        sky: { 300: "#9fd3fb", 400: "#6cbcf5" },
        app: {
          hr: "#7c4ddb",
          audit: "#3c8d5b",
          quality: "#cc7a2b",
          compliance: "#c43c34",
          feedback: "#3b8ba3",
          licensify: "#2f6dbd",
          console: "#1f2433",
        },
        band: { critical: "#d0443c", warning: "#e07b2c", upcoming: "#e6b43a", later: "#5b8def" },
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,20,46,.04), 0 8px 24px -8px rgba(16,20,46,.10)",
        float: "0 30px 80px -20px rgba(16,20,46,.45)",
      },
      keyframes: {
        marquee: { from: { transform: "translateY(0)" }, to: { transform: "translateY(-50%)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
