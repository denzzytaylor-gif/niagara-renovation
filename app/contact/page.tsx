import type { Metadata } from "next";
import IMAGES from "@/lib/images.json";
import LeadForm from "@/components/LeadForm";
import SectionHeading from "@/components/SectionHeading";
import { PHONE, EMAIL, ADDRESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Niagara Renovation Company | Get a Free Quote",
  description: "Contact Niagara Renovation Company for a free estimate on your renovation project. Call (647) 797-9471, email us, or fill out our online form. Fast response guaranteed.",
  alternates: { canonical: "https://www.niagararenovationcompany.com/contact" },
  openGraph: {
    title: "Contact Niagara Renovation Company | Get a Free Quote",
    description: "Get a free, no-obligation renovation estimate. Call (647) 797-9471 or fill out our online form. We respond within 2 business hours.",
    url: "https://www.niagararenovationcompany.com/contact",
    images: [{ url: IMAGES.contact.hero, width: 1200, height: 630, alt: "Contact Niagara Renovation Company" }],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Niagara Renovation Company",
  "description": "Contact page for Niagara Renovation Company. Get a free renovation estimate.",
  "url": "https://www.niagararenovationcompany.com/contact",
  "mainEntity": {
    "@type": "HomeAndConstructionBusiness",
    "name": "Niagara Renovation Company",
    "telephone": "+16477979471",
    "email": "info@niagararenovationcompany.com",
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "16:00" },
    ],
  },
};

export default function ContactPage() {
  const hours = [
    { day: "Monday", hours: "8:00 AM – 6:00 PM" },
    { day: "Tuesday", hours: "8:00 AM – 6:00 PM" },
    { day: "Wednesday", hours: "8:00 AM – 6:00 PM" },
    { day: "Thursday", hours: "8:00 AM – 6:00 PM" },
    { day: "Friday", hours: "8:00 AM – 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.contact.hero}
          alt="Contact Niagara Renovation Company for a free quote"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Contact Niagara Renovation Company</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Ready to start your renovation? Get a free, no-obligation estimate today. We respond within 2 business hours.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Request Your Free Quote</h2>
              <LeadForm />
            </div>

            {/* Right: Contact Info */}
            <div className="space-y-8">
              <div>
                <SectionHeading
                  title="Get in Touch"
                  subtitle="Multiple ways to reach our friendly team."
                  image={IMAGES.contact.get_in_touch}
                  imageAlt="Contact our renovation team"
                />
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Phone</p>
                      <a href="tel:6477979471" className="text-2xl font-black text-red-600 hover:text-red-700 transition-colors">{PHONE}</a>
                      <p className="text-gray-500 text-sm mt-1">Call or text anytime during business hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Email</p>
                      <a href={`mailto:${EMAIL}`} className="text-gray-900 font-semibold hover:text-red-600 transition-colors break-all">{EMAIL}</a>
                      <p className="text-gray-500 text-sm mt-1">We respond to all emails within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Service Area</p>
                      <p className="text-gray-900 font-semibold">Niagara Region, Ontario</p>
                      <p className="text-gray-500 text-sm mt-1">Serving all 12 municipalities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-gray-900 font-black text-lg mb-4">Business Hours</h3>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {hours.map(row => (
                      <tr key={row.day}>
                        <td className="py-2 font-medium text-gray-700">{row.day}</td>
                        <td className={`py-2 text-right font-semibold ${row.hours === "Closed" ? "text-red-500" : "text-gray-900"}`}>
                          {row.hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-gray-500 text-xs mt-3">*After-hours emergency calls available for existing clients.</p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES.contact.map_background}
                  alt="Niagara Region service area"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative text-center text-gray-700">
                  <svg className="w-10 h-10 text-red-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <p className="text-sm font-medium">Niagara Region, ON</p>
                  <p className="text-xs">Serving all of Niagara Region</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
