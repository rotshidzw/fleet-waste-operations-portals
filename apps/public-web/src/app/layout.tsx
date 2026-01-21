import type { Metadata } from "next";
import "./globals.css";
import { PrimaryNav } from "@/components/PrimaryNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieNotice } from "@/components/CookieNotice";

export const metadata: Metadata = {
  title: "Njilo Consulting & Logistics",
  description: "Enterprise fleet management, logistics, and waste operations services.",
  openGraph: {
    title: "Njilo Consulting & Logistics",
    description: "Enterprise fleet management, logistics, and waste operations services.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PrimaryNav />
        <main>{children}</main>
        <SiteFooter />
        <CookieNotice />
      </body>
    </html>
  );
}
