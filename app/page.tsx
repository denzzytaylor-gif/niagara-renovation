import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "General Contractor in Niagara Region | Niagara Renovation Company",
  description: "Niagara Renovation Company — licensed general contractor serving all 12 Niagara Region municipalities. Basements, kitchens, ADU builds, additions, and full home renovations. Free estimates.",
  alternates: { canonical: "https://www.niagararenovationcompany.com" },
  openGraph: {
    title: "General Contractor in Niagara Region | Niagara Renovation Company",
    description: "Licensed general contractor in Niagara Region for basements, kitchens, ADU builds, home additions and full renovations. Free estimates. Call (647) 797-9471.",
    url: "https://www.niagararenovationcompany.com",
    images: [{ url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format", width: 1200, height: 630, alt: "Niagara Renovation Company - Licensed Contractors in Niagara Region" }],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
  "name": "Niagara Renovation Company",
  "description": "Niagara Region's most trusted home renovation contractors. Kitchen, bathroom, basement, roofing & more. Licensed & insured. Free estimates.",
  "url": "https://www.niagararenovationcompany.com",
  "telephone": "+16477979471",
  "email": "info@niagararenovationcompany.com",
  "priceRange": "$$",
  "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Niagara Region",
    "addressRegion": "ON",
    "addressCountry": "CA",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.1594,
    "longitude": -79.2469,
  },
  "hasMap": "https://www.google.com/maps/place/Niagara+Region,+ON",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "16:00" },
  ],
  "areaServed": [
    { "@type": "City", "name": "St. Catharines" },
    { "@type": "City", "name": "Niagara Falls" },
    { "@type": "City", "name": "Welland" },
    { "@type": "City", "name": "Grimsby" },
    { "@type": "City", "name": "Fort Erie" },
    { "@type": "City", "name": "Niagara-on-the-Lake" },
    { "@type": "City", "name": "Lincoln" },
    { "@type": "City", "name": "Pelham" },
    { "@type": "City", "name": "Thorold" },
    { "@type": "City", "name": "Port Colborne" },
    { "@type": "City", "name": "Wainfleet" },
    { "@type": "City", "name": "West Lincoln" },
  ],
  "sameAs": [
    "https://www.niagararenovationcompany.com",
  ],
};

const faqItems = [
  { q: "How much does a home renovation cost in Niagara Region?", a: "Renovation costs vary widely by project type and scope. We provide free, detailed written estimates for every project so you know exactly what to expect before any work begins." },
  { q: "Are you licensed and insured in Ontario?", a: "Yes. Niagara Renovation Company is fully licensed in Ontario and carries comprehensive general liability insurance and WSIB coverage. All our tradespeople are fully certified." },
  { q: "How long does a typical renovation take?", a: "Timelines depend on project scope. A standard bathroom renovation takes 2–3 weeks, kitchen 4–6 weeks, basement 6–10 weeks, and home additions 3–6 months. We provide a detailed timeline at the estimate stage." },
  { q: "Do you serve all of Niagara Region?", a: "Yes. We serve all 12 municipalities in Niagara Region including St. Catharines, Niagara Falls, Welland, Grimsby, Fort Erie, Niagara-on-the-Lake, and more." },
  { q: "What warranty do you offer?", a: "We offer a comprehensive 5-year warranty on all workmanship, plus manufacturer warranties on all materials and products installed." },
  { q: "Do I need permits for my renovation?", a: "Many renovations require permits in Ontario. We handle the entire permit process on your behalf, ensuring full code compliance throughout the project." },
  { q: "How do I get a quote?", a: "Simply fill out our online form, call us at (647) 797-9471, or email info@niagararenovationcompany.com. We'll arrange a free in-home consultation and provide a detailed written estimate within 48 hours." },
  { q: "Can you help with design and material selection?", a: "Our team includes experienced designers who can help you select materials, colors, and finishes to match your style and budget. Design consultations are included with every project." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomePageClient />
    </>
  );
}
