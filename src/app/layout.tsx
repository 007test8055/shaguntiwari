import type { Metadata } from "next";
import { Syne, DM_Sans, Raleway } from "next/font/google";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";
import { siteConfig } from "@/content";

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
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: siteConfig.bio,
  keywords: `${siteConfig.name}, Portfolio, Product Manager, Product Strategy, Growth, B2B SaaS, FinTech, Marketplace, CloudHire, Dice, EnKash, NoBroker, Krishiyog`,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url || "https://shaguntiwari.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.bio,
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/banner.png",
        width: 1200,
        height: 600,
        alt: `${siteConfig.name} - Product Manager Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.bio,
    images: ["/assets/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.role,
  sameAs: [
    siteConfig.socials.linkedin,
    siteConfig.socials.medium,
  ]
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="Drp5Ac3eLY3TX2qwtR9C-2QktDefHkbe8EBLzy883SY" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${raleway.variable} antialiased bg-bg text-[#f0eff7] overflow-x-hidden`}
      >
        <Toaster position="top-right" theme="dark" richColors closeButton />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}