import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const polySansFont = localFont({
  src: [
    { path: "../fonts/polysanstrial-neutral.otf", weight: "400", style: "normal" },
    { path: "../fonts/polysanstrial-median.otf", weight: "600", style: "normal" },
    { path: "../fonts/polysanstrial-bulky.otf", weight: "700", style: "normal" }
  ],
  variable: "--font-secondary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hirloye Career & Learning Portal",
  description: "Build Your Career. Learn Digital Marketing. Grow With Hirloye. Join our internship programs, apply for job openings, and learn industry-focused digital marketing skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${polySansFont.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
