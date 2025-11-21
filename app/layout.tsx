import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spider Tanks Guide - Cores of Chaos | Launch December 8th, 2025",
  description: "Your complete guide to Spider Tanks: Cores of Chaos. Build custom tanks, explore 12 battle maps, learn strategies, and earn IMX Diamonds. Launching December 8th on Epic Games & Immutable X!",
  keywords: ["Spider Tanks", "Cores of Chaos", "GAMEDIA", "Immutable X", "Web3 Gaming", "Tank Builder", "PvP Brawler", "Epic Games"],
  authors: [{ name: "Spider Tanks Community Guide" }],
  openGraph: {
    title: "Spider Tanks: Cores of Chaos - Launch December 8th!",
    description: "Build custom tanks, battle in 3v3 arenas, and earn IMX Diamonds! Free-to-play on Epic Games.",
    url: "https://spidertanks.xyz",
    siteName: "Spider Tanks Guide",
    images: [
      {
        url: "/images/weapons/bouncer-gun.png",
        width: 512,
        height: 512,
        alt: "Spider Tanks: Cores of Chaos",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spider Tanks: Cores of Chaos - Launch December 8th!",
    description: "Build custom tanks, battle in 3v3 arenas, and earn IMX Diamonds!",
    images: ["/images/weapons/bouncer-gun.png"],
  },
  icons: {
    icon: "/images/weapons/bouncer-gun.png",
    apple: "/images/weapons/bouncer-gun.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
