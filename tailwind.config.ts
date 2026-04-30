import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        "dm-sans": ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brown-gradient": "linear-gradient(135deg, #A0522D 0%, #C17B3F 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
