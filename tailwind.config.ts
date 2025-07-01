import type { Config } from "tailwindcss";
import colors from "./colors";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Adjust this glob pattern to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        bg: "var(--bg)",
        "bg-dark": "var(--bg-dark)",
        "bg-light": "var(--bg-light)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        highlight: "var(--highlight)",
        border: "var(--border)",
        "border-muted": "var(--border-muted)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        danger: "var(--danger)",
        warning: "var(--warning)",
        success: "var(--success)",
        info: "var(--info)",
        "bg-transparent": "var(--bg-transparent)",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        shake: "shake 0.5s infinite  ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
