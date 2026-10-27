import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#F7F3EA",
          200: "#EFE7D6",
          300: "#E4D7BD",
        },
        forest: {
          700: "#1E4635",
          800: "#143326",
          900: "#0D241B",
          950: "#081711",
        },
        gold: {
          300: "#E3C988",
          400: "#D4B36A",
          500: "#C5A059",
          600: "#A8843E",
          700: "#88682B",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 12px 32px -8px rgba(13, 36, 27, 0.08), 0 4px 12px -4px rgba(13, 36, 27, 0.04)",
        "luxury-hover": "0 20px 40px -12px rgba(13, 36, 27, 0.16), 0 8px 16px -6px rgba(197, 160, 89, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
