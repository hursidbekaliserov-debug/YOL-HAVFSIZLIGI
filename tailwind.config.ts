import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        icorp: {
          teal: "#16C79A",
          tealDark: "#0E9F79",
          tealLight: "#E8FAF4",
          tealMuted: "#00B090",
          dark: "#0B0F19",
          charcoal: "#111827",
          cardDark: "#1A2234",
          bgLight: "#F8F9FA",
          textDark: "#1A1D20",
          muted: "#6C757D",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        icorp: "0 4px 20px rgba(0, 0, 0, 0.04)",
        "icorp-lg": "0 10px 30px rgba(0, 0, 0, 0.08)",
        "icorp-teal": "0 10px 25px -5px rgba(22, 199, 154, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;