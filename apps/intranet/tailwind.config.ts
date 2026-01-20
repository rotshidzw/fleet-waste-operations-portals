import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "njilo-blue": "#0B2B5C",
        "njilo-green": "#1D7A5E",
        "njilo-orange": "#F28C2B"
      }
    }
  },
  plugins: []
};

export default config;
