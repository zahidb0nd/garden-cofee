// Root layout — fonts, metadata, Navbar, Footer, GA4
import type { Metadata } from "next";
import { Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Garden Coffee and Tea Centre | Premium Coffee & Tea Powders",
    template: "%s | Garden Coffee and Tea Centre",
  },
  description:
    "Discover premium artisanal coffee and tea powders at Garden Coffee and Tea Centre — rooted in tradition, brewed with love. Visit our store today.",
  metadataBase: new URL("https://gardenteacentre.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Garden Coffee and Tea Centre",
    title: "Garden Coffee and Tea Centre | Premium Coffee & Tea Powders",
    description:
      "Discover premium artisanal coffee and tea powders at Garden Coffee and Tea Centre — rooted in tradition, brewed with love.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${lato.variable} ${cormorantGaramond.variable}`}
    >
      <body className="font-body antialiased">
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="pt-[60px] lg:pt-[72px]">
          {children}
        </main>

        <Footer />

        <GoogleAnalytics />
      </body>
    </html>
  );
}
