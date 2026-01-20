import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Njilo Intranet",
  description: "Njilo Consulting & Logistics intranet portal"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
