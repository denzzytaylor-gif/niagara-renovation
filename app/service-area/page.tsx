import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, SERVICES } from "@/lib/data";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Our Service Area – Niagara Region, Ontario",
  description: "Niagara Renovation Company serves all 12 municipalities in Niagara Region, Ontario. View our complete service area including St. Catharines, Niagara Falls, Welland, Grimsby & more.",
  alternates: { canonical: "https://www.niagararenovationcompany.com/service-area" },
  openGraph: {
    title: "Our Service Area – Niagara Region, Ontario | Niagara Renovation Company",
    description: "We serve all 12 municipalities in Niagara Region. St. Catharines, Niagara Falls, Welland, Grimsby, Fort Erie and more. Free estimates across the entire region.",
    url: "https://www.niagararenovationcompany.com/service-area",
    images: [{ url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format", width: 1200, height: 630, alt: "Niagara Renovation Company service area map" }],
  },
};

export default function ServiceAreaPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-navy to-navy-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Our Service Area – Niagara Region, Ontario</h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            We serve all municipalities in the Niagara Region. Wherever you call home in Niagara, we&apos;re your local renovation experts.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            Niagara Renovation Company proudly serves every home and homeowner across the Niagara Region. From the shores of Lake Erie to the Niagara Escarpment, from the waterfront communities along the Niagara River to the rural municipalities of the agricultural heartland — we bring the same level of quality and care to every corner of this beautiful region.
          </p>
        </div>
      </section>

      {/* CITY CARDS */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-navy mb-8 text-center">Communities We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES.map(city => (
              <div key={city.slug} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-amber hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <Link href={`/${city.slug}`} className="text-navy font-bold text-xl hover:text-amber transition-colors">
                      {city.name}
                    </Link>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">Serving homeowners {city.landmark}.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {SERVICES.map(s => (
                    <Link key={s.slug} href={`/${city.slug}/${s.slug}`} className="text-xs bg-gray-100 hover:bg-amber hover:text-white text-gray-600 px-3 py-1 rounded-full transition-colors">
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES BY AREA */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-navy mb-4 text-center">Services Available Across Niagara Region</h2>
          <p className="text-center text-gray-600 mb-8">All of our renovation services are available in every community we serve.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="bg-gray-50 hover:bg-amber hover:text-white rounded-xl p-4 text-center border border-gray-200 hover:border-amber transition-all group">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-navy group-hover:text-white font-semibold text-sm">{s.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-navy mb-4">We Serve All Municipalities in the Niagara Region</h2>
          <p className="text-gray-600 leading-relaxed">
            Niagara Renovation Company is headquartered in St. Catharines and operates throughout the Regional Municipality of Niagara. This includes the cities of St. Catharines, Niagara Falls, and Welland; the towns of Fort Erie, Grimsby, Lincoln, Niagara-on-the-Lake, Pelham, Thorold, and Wainfleet; and the townships of Port Colborne and West Lincoln. No matter where you live in this region, we&apos;re your local renovation experts — just a phone call away.
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
