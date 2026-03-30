import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "system-ui", "sans-serif"],
        dm: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        raleway: ["var(--font-raleway)", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#03040a",
        violet: "#6f42d4",
        cyan: "#00c9e8",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        grain: "grain 0.4s steps(1) infinite",
        glow: "glow-pulse 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(2%,1%)" },
          "40%": { transform: "translate(2%,-2%)" },
          "60%": { transform: "translate(2%,3%)" },
          "80%": { transform: "translate(1%,2%)" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "0.08" },
          "50%": { opacity: "0.18" },
        },
        "scroll-bounce": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
