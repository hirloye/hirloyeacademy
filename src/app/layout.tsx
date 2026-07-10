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
  title: "Hirloye | Digital Marketing Academy in Ayanavaram",
  description: "Join the top digital marketing academy in Ayanavaram. Build your career with our AI-powered digital marketing course and advanced training programs. Learn industry-focused skills and grow with Hirloye.",
  keywords: "AI-powered digital marketing course in Ayanavaram, digital marketing academy in Ayanavaram, Advanced digital marketing course in Ayanavaram",
};

import Script from "next/script";

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EL9SVHCTQW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EL9SVHCTQW');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
