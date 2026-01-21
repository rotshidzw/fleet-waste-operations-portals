import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          900: "#0A1E3F",
          800: "#123062",
          700: "#1B4485",
          600: "#2459A8",
          500: "#2E6ECC"
        },
        green: {
          700: "#0E7A4F",
          600: "#12915F",
          500: "#16A66D"
        },
        orange: {
          500: "#F28C28"
        }
      }
    }
  },
  plugins: []
};

export default config;
