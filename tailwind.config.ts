import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0f0f0f", light: "#1a1a1a", dark: "#000000" },
        green: { DEFAULT: "#B91C1C", light: "#DC2626", dark: "#991B1B" },
        amber: { DEFAULT: "#DC2626", light: "#EF4444", dark: "#B91C1C" },
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
