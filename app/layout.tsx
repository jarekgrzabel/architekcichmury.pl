import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Architekci Chmury | Doradztwo AWS",
  description:
    "Strategia, architektura, DevOps, FinOps i agentic AI na AWS. Doradztwo oparte na ponad 20 latach doświadczenia w IT.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
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
      <body>{children}</body>
    </html>
  );
}
