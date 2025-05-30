import type { Config } from "tailwindcss";
import colors from "./colors";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Adjust this glob pattern to match your project structure
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};

export default config;
