import type { Metadata } from "next";
import { Syne, DM_Sans, Raleway } from "next/font/google";
import "./globals.css";

/** Display font — geometric, architectural, unforgettable */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

/** Body font — refined, legible, pairs perfectly with Syne */
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Shagun Tiwari | Product Manager",
  description: "Product Manager shaping user-centered decisions into shipped outcomes with clarity and impact.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} ${raleway.variable} antialiased bg-bg text-[#f0eff7] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}