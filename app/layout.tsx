import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.niagararenovationcompany.com"),
  title: { default: "Niagara Renovation Company | Licensed Contractors in Niagara Region, ON", template: "%s | Niagara Renovation Company" },
  description: "Niagara Region's most trusted home renovation contractors. Kitchen, bathroom, basement, roofing & more. Free estimates. Licensed & insured. Call (647) 797-9471.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/images/logo-180.png", sizes: "180x180" }],
  },
  openGraph: { type: "website", locale: "en_CA", siteName: "Niagara Renovation Company" },
  twitter: {
    card: "summary_large_image",
    site: "@NiagaraRenovCo",
    creator: "@NiagaraRenovCo",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Niagara Renovation Company",
  "alternateName": "A Taylor and Co Company",
  "url": "https://www.niagararenovationcompany.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.niagararenovationcompany.com/images/logo-512.png",
    "width": 512,
    "height": 512,
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-647-797-9471",
    "contactType": "customer service",
    "areaServed": "CA-ON",
    "availableLanguage": "English",
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Niagara Region",
    "addressRegion": "ON",
    "addressCountry": "CA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
