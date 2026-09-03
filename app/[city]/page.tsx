import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import CTABanner from "@/components/CTABanner";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";
import { CITIES, SERVICES, TESTIMONIALS, PHONE } from "@/lib/data";
import IMAGES from "@/lib/images.json";

type CityData = typeof CITIES[number];

export const dynamic = "force-static";
export const revalidate = false;

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return CITIES.map(c => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = CITIES.find(c => c.slug === citySlug);
  if (!city) return { title: "City Not Found" };

  return {
    title: `Home Renovations in ${city.name}, Ontario`,
    description: `Expert home renovations in ${city.name}, Ontario. Kitchen, bathroom, basement & more. Licensed & insured local contractors. Free estimates. Call (647) 797-9471.`,
    alternates: { canonical: `https://www.niagararenovationcompany.com/${city.slug}` },
    openGraph: {
      title: `Home Renovations in ${city.name}, Ontario | Niagara Renovation Company`,
      description: `Trusted renovation contractors serving ${city.name}. Kitchens, bathrooms, basements, roofing & more. Free estimates.`,
      url: `https://www.niagararenovationcompany.com/${city.slug}`,
      images: [{ url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format", width: 1200, height: 630, alt: `Home Renovations in ${city.name}, Ontario` }],
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const city = CITIES.find(c => c.slug === citySlug);
  if (!city) return notFound();

  const testimonial = TESTIMONIALS.find(t => t.city === city.name) || TESTIMONIALS[0];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Niagara Renovation Company – ${city.name}`,
    "description": `Home renovation contractors serving ${city.name}, Ontario. Kitchen, bathroom, basement, roofing and more.`,
    "url": `https://www.niagararenovationcompany.com/${city.slug}`,
    "telephone": "+16477979471",
    "email": "info@niagararenovationcompany.com",
    "areaServed": { "@type": "City", "name": city.name, "addressRegion": "ON", "addressCountry": "CA" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": `How do I get a renovation quote in ${city.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `Contact Niagara Renovation Company for a free, no-obligation estimate in ${city.name}. Call (647) 797-9471, fill out our online form, or email info@niagararenovationcompany.com. We respond within 2 business hours.` } },
      { "@type": "Question", "name": `Are you licensed to renovate in ${city.name}, Ontario?`, "acceptedAnswer": { "@type": "Answer", "text": `Yes, Niagara Renovation Company is fully licensed and insured to operate throughout ${city.name} and all of Niagara Region. We carry comprehensive liability insurance and WSIB coverage.` } },
      { "@type": "Question", "name": `How quickly can you start a renovation in ${city.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `We typically begin new projects in ${city.name} within 2–6 weeks of signing the contract, depending on our current schedule. We offer free consultations and same-week estimates.` } },
      { "@type": "Question", "name": `Do you handle permits in ${city.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `Yes, we handle all permit applications and inspections for renovation projects in ${city.name}. We are familiar with local building codes and requirements.` } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="bg-gradient-to-br from-black to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <p className="text-red-500 font-semibold text-sm uppercase tracking-widest mb-3">Niagara Renovation Company</p>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                Home Renovations in {city.name}, Ontario
              </h1>
              <p className="text-gray-300 text-xl mb-6">
                Trusted local renovation contractors {city.landmark}. We bring premium craftsmanship and exceptional service to every {city.name} home we work in.
              </p>
              <ul className="space-y-2 mb-6">
                {["Licensed & Insured Contractors", "Free Estimates – No Obligation", "Local Niagara Region Team", "5-Year Workmanship Warranty"].map((item, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="tel:6477979471" className="inline-flex items-center gap-2 text-white hover:text-red-400 font-bold text-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PHONE}
              </a>
            </div>
            <div>
              <LeadForm defaultCity={city.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL INTRO */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-5">Your Trusted Renovation Contractor in {city.name}</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Niagara Renovation Company has been proudly serving homeowners in {city.name}, {city.landmark}. Our team understands the unique character of homes in this community, from heritage properties that require special care and attention to modern builds that demand precision and contemporary design sensibility.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {(city as CityData).cityDesc}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether you&apos;re planning a complete kitchen transformation, a luxurious bathroom upgrade, a finished basement, or a major home addition, our experienced {city.name}-area renovation team delivers results that exceed expectations — on schedule and within budget. We&apos;re not just contractors; we&apos;re neighbours who take pride in making {city.name} homes more beautiful and functional, one project at a time.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Renovation Services in ${city.name}`}
            subtitle={`Full-service home renovation for ${city.name} homeowners. Click any service to learn more.`}
            image={IMAGES.city_pages.why_choose}
            imageAlt={`Home renovation services in ${city.name}`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <ServiceCard key={s.slug} {...s} cityPrefix={city.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* NEIGHBOURHOODS */}
      {(city as CityData).neighbourhoods && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Neighbourhoods We Serve in {city.name}</h2>
            <p className="text-gray-600 mb-6">
              Our renovation crews are active across {city.name}&apos;s neighbourhoods — familiar with local property types, permit offices, and neighbourhood character.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {((city as CityData).neighbourhoods ?? []).map((n) => (
                <span key={n} className="bg-white border border-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg text-sm shadow-sm">
                  {n}
                </span>
              ))}
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              No matter which part of {city.name} you call home, our team has the experience and local knowledge to handle your renovation with professionalism and care. We are familiar with the specific building permit requirements, inspection protocols, and typical construction challenges found across {city.name}&apos;s varied housing stock — saving you time, reducing surprises, and ensuring your project is completed to the highest standard.
            </p>
          </div>
        </section>
      )}

      {/* WHY WE LOVE WORKING IN CITY */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-5">Why Niagara Renovation Company in {city.name}?</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {city.name} is one of the most wonderful communities in Niagara Region to work in. The homeowners here take tremendous pride in their properties, and we share that pride in every project we undertake. {city.landmark.charAt(0).toUpperCase() + city.landmark.slice(1)}, {city.name} offers a unique mix of architectural styles and neighbourhood characters that keep our work interesting and deeply rewarding.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            From established mature neighbourhoods with character-filled older homes to newer subdivisions with modern open-concept layouts, we have the expertise to handle the full range of renovation challenges that {city.name} homes present. Our familiarity with local suppliers, building departments, and permit processes means your {city.name} renovation will proceed as smoothly as possible — with fewer surprises and more predictable outcomes.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We are fully licensed general contractors operating throughout {city.name} and all of Niagara Region. Every project we take on is covered by comprehensive commercial general liability insurance, WSIB coverage for all workers on your property, and our industry-leading 5-year workmanship warranty. You should never have to wonder whether your contractor has the credentials, coverage, and commitment to stand behind their work — with us, you will never have to.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our approach to every {city.name} renovation project begins with listening. We take the time to understand your vision, your priorities, your lifestyle, and your budget before we ever put pen to paper on a quote. The result is a renovation experience that is collaborative, transparent, and focused on delivering an outcome that you will love for years to come. Contact us today to start the conversation about your {city.name} renovation project.
          </p>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-14 bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-white mb-6">What {city.name} Homeowners Say</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-center gap-0.5 mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-gray-700 italic mb-4">&ldquo;{testimonial.text}&rdquo;</blockquote>
            <p className="font-bold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.city} &middot; {testimonial.service}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Renovation FAQs for ${city.name} Homeowners`}
            subtitle="Common questions from homeowners in this area."
            image={IMAGES.city_pages.cta}
            imageAlt={`Renovation FAQs for ${city.name}`}
          />
          <div className="space-y-4">
            {[
              { q: `How do I get a renovation quote in ${city.name}?`, a: `Contact us for a free, no-obligation estimate in ${city.name}. Call (647) 797-9471, fill out our online form, or email info@niagararenovationcompany.com. We respond within 2 business hours and provide a detailed written estimate.` },
              { q: `Are you licensed to renovate in ${city.name}, Ontario?`, a: `Yes, Niagara Renovation Company is fully licensed and insured to operate throughout ${city.name} and all of Niagara Region. We carry comprehensive liability insurance and WSIB coverage.` },
              { q: `How quickly can you start a renovation in ${city.name}?`, a: `We typically begin new projects in ${city.name} within 2–6 weeks of signing the contract. We offer free consultations and same-week estimates.` },
              { q: `Do you handle permits in ${city.name}?`, a: `Yes, we handle all permit applications and inspections for renovation projects in ${city.name}. We are familiar with all local building codes and requirements.` },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 group">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:text-red-600 transition-colors list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-red-600 text-xl">+</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            <Link href="/service-area" className="text-red-600 hover:underline">&larr; Back to All Service Areas</Link>
            {" · "}
            <Link href="/contact" className="text-red-600 hover:underline">Contact Us &rarr;</Link>
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
