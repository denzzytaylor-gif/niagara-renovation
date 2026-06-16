import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import IMAGES from "@/lib/images.json";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Home Renovation Services in Niagara Region, Ontario | Free Estimates",
  description: "Complete home renovation services in Niagara Region. Kitchen, bathroom, basement, roofing, flooring, painting, windows & doors, and home additions. Free estimates. Licensed & insured.",
  alternates: { canonical: "https://www.niagararenovationcompany.com/services" },
  openGraph: {
    title: "Home Renovation Services in Niagara Region, Ontario | Free Estimates",
    description: "Complete home renovation services in Niagara Region. Kitchen, bathroom, basement, roofing, flooring, painting, windows & doors, and home additions. Free estimates. Licensed & insured.",
    url: "https://www.niagararenovationcompany.com/services",
    images: [{ url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80&auto=format", width: 1200, height: 630, alt: "Professional renovation services in Niagara Region" }],
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.services_page.hero}
          alt="Professional renovation services in Niagara Region"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Our Renovation Services</h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Full-service home renovation throughout Niagara Region. From kitchens to roofing — we do it all.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="All Services"
            title="What We Build For You"
            subtitle="Every service backed by our 5-year workmanship warranty and free estimates."
            image={IMAGES.services_page.all_services}
            imageAlt="Renovation work in progress across Niagara Region"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group block">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 h-full border border-gray-100 hover:border-red-500">
                  <h2 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-red-600 transition-colors">{s.name}</h2>
                  <p className="text-gray-600 text-sm mb-3">{s.shortDesc}</p>
<div className="mt-4 text-red-600 text-sm font-semibold group-hover:underline">Learn More &rarr;</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
