export const theme = {
  colors: {
    blue: {
      900: "#0A1E3F",
      800: "#123062",
      700: "#1B4485",
      600: "#2459A8",
      500: "#2E6ECC",
    },
    green: {
      700: "#0E7A4F",
      600: "#12915F",
      500: "#16A66D",
    },
    orange: {
      500: "#F28C28",
    },
    slate: {
      900: "#0F172A",
      700: "#334155",
      500: "#64748B",
      200: "#E2E8F0",
      100: "#F1F5F9",
    },
    white: "#FFFFFF",
  },
  spacing: {
    section: "80px",
    gutter: "24px",
  },
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, sans-serif",
    },
    scale: {
      display: "56px",
      h1: "40px",
      h2: "32px",
      h3: "24px",
      body: "16px",
      small: "14px",
    },
  },
} as const;
