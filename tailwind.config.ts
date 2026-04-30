import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: "#A0522D",
          light: "#C17B3F",
        },
        cream: {
          DEFAULT: "#FAF7F2",
          dark: "#EDE8E0",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#2D2D2D",
        },
        gold: "#C9A96E",
      },
      fontFamily: {
        display: ["var(--font-cormorant)"],
        body: ["var(--font-dm-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;

