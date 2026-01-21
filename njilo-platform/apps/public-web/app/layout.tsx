import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { QuoteModalProvider } from "../components/QuoteModalProvider";
import { PageTransition } from "../components/PageTransition";
import { ChatWidget } from "../components/ChatWidget";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Njilo Holdings",
  description: "Enterprise fleet, waste, and compliance operations platform."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QuoteModalProvider>
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <ChatWidget />
          </QuoteModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
