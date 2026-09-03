import type { Metadata } from "next";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import { PHONE, EMAIL, ADDRESS, CITIES, SERVICES } from "@/lib/data";
import IMAGES from "@/lib/images.json";

export const metadata: Metadata = {
  title: "About Niagara Renovation Company | Niagara Region Renovation Experts",
  description: "Learn about Niagara Renovation Company — Niagara Region's most trusted renovation contractor. Licensed, insured, and committed to exceptional craftsmanship across all 12 Niagara municipalities.",
  alternates: { canonical: "https://www.niagararenovationcompany.com/about" },
  openGraph: {
    title: "About Niagara Renovation Company | Niagara Region Renovation Experts",
    description: "Niagara Region's most trusted home renovation contractor. Licensed and insured, serving Niagara Falls, St. Catharines, Grimsby, and all 12 municipalities.",
    url: "https://www.niagararenovationcompany.com/about",
    images: [{ url: IMAGES.about.hero, width: 1200, height: 630, alt: "Niagara Renovation Company team at work" }],
  },
};

export default function AboutPage() {
  const values = [
    { title: "Integrity", desc: "We're honest, transparent, and do what we say we'll do — every time." },
    { title: "Excellence", desc: "We hold ourselves to the highest standards of craftsmanship in everything we build." },
    { title: "Community", desc: "We're proud Niagara Region locals who invest in the communities we serve." },
    { title: "Innovation", desc: "We stay current with the latest materials, techniques, and design trends." },
    { title: "Accountability", desc: "We take responsibility for our work and stand behind every project we complete." },
    { title: "Passion", desc: "We genuinely love what we do and it shows in the quality of our work." },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.about.hero}
          alt="Niagara Renovation Company team at work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-4">About Niagara Renovation Company</h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Niagara Region&apos;s trusted home renovation contractor. Built on quality, trust, and a genuine passion for transforming homes.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Story"
            subtitle="How Niagara Renovation Company became the region's most trusted contractor."
            image={IMAGES.about.our_story}
            imageAlt="Renovation work in progress"
          />
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Niagara Renovation Company was founded by a third-generation tradesman with deep roots in the Niagara Region. What started as a small carpentry and general contracting operation has grown into one of the most respected full-service renovation companies in the region, with a team of skilled professionals completing renovation projects across every corner of Niagara.
            </p>
            <p>
              From the very beginning, our philosophy has been simple: treat every client&apos;s home as if it were our own. That means using the best materials, employing the most skilled tradespeople, communicating openly and honestly, and never cutting corners — even when it might be easier or more profitable to do so. This philosophy has earned us a reputation for excellence that no advertising budget could buy.
            </p>
            <p>
              Today, Niagara Renovation Company serves homeowners across all 12 municipalities in the Niagara Region under the Taylor and Co Company umbrella — offering a comprehensive range of renovation services from kitchen and bathroom remodels to complete home additions, accessory dwelling units, decks and outdoor living spaces, commercial renovations, and everything in between. We are a true full-service contractor: one company, one point of responsibility, one standard of quality for every trade and every project.
            </p>
            <p>
              Our growth has always been intentional and measured. We have never sacrificed quality for volume. Every project we take on receives the same level of management attention, the same quality of materials, and the same experienced tradespeople — whether it is a bathroom update or a complete whole-home transformation. That consistency is the foundation of our reputation, and it is the reason that so many of our new clients come directly from referrals by past clients who trusted us with their homes.
            </p>
          </div>
        </div>
      </section>

      {/* WHY LOCAL */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose a Local Niagara Contractor?"
            subtitle="The advantages of working with a contractor who has deep roots in this community."
            image={IMAGES.about.why_local}
            imageAlt="Local Niagara renovation expertise"
          />
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              When you invite a contractor into your home, you are placing enormous trust in that company and its people. A local contractor has more at stake than an out-of-region firm — our reputation lives and dies in this community. Every neighbour, every real estate agent, every friend who asks &quot;who did your renovation?&quot; is an opportunity for us to earn new business or lose it. That accountability drives everything we do.
            </p>
            <p>
              Our local expertise means we know Niagara Region building departments — the permit processes in St. Catharines, Niagara Falls, Welland, and the other municipalities — and we have established working relationships with local inspectors. We know which suppliers in the region stock the materials we need, which specialty trades are most reliable for each type of work, and which approaches work best in Niagara&apos;s specific climate conditions. This knowledge translates directly into smoother projects and better outcomes for our clients.
            </p>
            <p>
              We also understand Niagara homes at a deep level. We know the construction characteristics common in homes built in different decades across the region — from the plaster walls and knob-and-tube wiring found in older St. Catharines properties to the particular insulation challenges in waterfront homes along Lake Erie and the heritage preservation requirements applicable in Niagara-on-the-Lake&apos;s Old Town. That local knowledge helps us plan accurately, price honestly, and execute efficiently on projects that a contractor unfamiliar with the region might misquote or mismanage.
            </p>
            <p>
              Ultimately, choosing Niagara Renovation Company means choosing a contractor who will be here tomorrow — to honour our warranty, to answer your questions, and to be available if something ever needs attention after the project closes. We are invested in this community because we live here. That is not something you can put a price on.
            </p>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Credentials & Associations"
            subtitle="Fully licensed, insured, and industry-certified for your peace of mind."
            image={IMAGES.about.credentials}
            imageAlt="Professional renovation credentials and licensing"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-bold mb-2">Ontario Contractor License</h3>
              <p className="text-gray-600 text-sm">Fully licensed general contractor in the Province of Ontario. Proudly serving all of Niagara Region.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-bold mb-2">Liability Insurance & WSIB</h3>
              <p className="text-gray-600 text-sm">$5 million in commercial general liability coverage and full WSIB coverage for all workers.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-bold mb-2">Industry Associations</h3>
              <p className="text-gray-600 text-sm">Members of the Canadian Home Builders&apos; Association (CHBA) and the Niagara Home Builders&apos; Association.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide every project we take on."
            image={IMAGES.about.core_values}
            imageAlt="Beautifully renovated home interior"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-red-200 transition-colors">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Service Area"
            subtitle="We proudly serve homeowners across all municipalities in the Niagara Region, Ontario."
            image={IMAGES.about.service_area}
            imageAlt="Niagara Region service coverage map"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {CITIES.map(city => (
              <Link key={city.slug} href={`/${city.slug}`} className="bg-gray-50 hover:bg-red-600 hover:text-white text-gray-900 font-medium py-2 px-4 rounded-lg text-sm border border-gray-200 hover:border-red-600 transition-colors">
                {city.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">Also offering: {SERVICES.map(s => s.name).join(" · ")}</p>
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Get in Touch"
            subtitle="Ready to start your renovation project? Contact us today."
            image={IMAGES.about.contact_cta}
            imageAlt="Contact Niagara Renovation Company"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="tel:6477979471" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-600 transition-colors">
                <svg className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-gray-900 font-bold">{PHONE}</p>
              <p className="text-gray-500 text-xs">Mon–Sat</p>
            </a>
            <a href={`mailto:${EMAIL}`} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-600 transition-colors">
                <svg className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-900 font-bold text-sm">{EMAIL}</p>
              <p className="text-gray-500 text-xs">24/7 inbox</p>
            </a>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center group">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <p className="text-gray-900 font-bold text-sm">{ADDRESS}</p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
