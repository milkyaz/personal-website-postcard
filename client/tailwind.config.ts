// tailwind.config.ts
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        march: {
          primary: "#e86c4a",
          secondary: "#f3e6d8",
          accent: "#7a8f73",
          neutral: "#1f3a2d",
          "base-100": "#2f4f3e",
          "base-200": "#284636",
          "base-300": "#203a2d",
          "base-content": "#f8f5ef",
        },
      },
    ],
  },
} satisfies Config;