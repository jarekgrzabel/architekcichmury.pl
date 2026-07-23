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
  title: "Architekci Chmury | Doradztwo AWS",
  description:
    "Strategia, architektura, DevOps, FinOps i agentic AI na AWS. Doradztwo oparte na ponad 20 latach doświadczenia w IT.",
  keywords: [
    "AWS consulting",
    "doradztwo AWS",
    "architektura chmury",
    "DevOps",
    "FinOps",
    "agentic AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
