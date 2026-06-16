import Link from "next/link";
import { SERVICES, CITIES, PHONE, EMAIL, ADDRESS } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-lg">N</div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">Niagara Renovation Company</div>
                <div className="text-red-500 text-xs font-semibold">A Taylor and Co Company</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Niagara Region&apos;s most trusted home renovation contractors. Licensed, insured, and dedicated to exceptional craftsmanship.
            </p>
            <div className="flex gap-3">
              <a href="tel:6477979471" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors" aria-label="Call us">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </a>
              <a href="mailto:info@niagararenovationcompany.com" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors" aria-label="Email us">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
            <p className="text-gray-600 text-xs mt-4">Serving All of Niagara Region</p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-red-500 font-bold text-sm uppercase tracking-wider mb-4">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Cities */}
          <div>
            <h3 className="text-red-500 font-bold text-sm uppercase tracking-wider mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {CITIES.map(c => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-red-500 font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a href="tel:6477979471" className="text-white font-bold hover:text-red-400 transition-colors">{PHONE}</a>
                  <p className="text-gray-500 text-xs">Mon–Fri 8am–6pm, Sat 9am–4pm</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${EMAIL}`} className="text-gray-400 hover:text-red-400 text-sm transition-colors break-all">{EMAIL}</a>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <address className="not-italic text-gray-400 text-sm">{ADDRESS}</address>
              </div>
              <div className="pt-2">
                <Link href="/contact" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Niagara Renovation Company. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <Link href="/about" className="hover:text-red-400 transition-colors">About</Link>
            <Link href="/service-area" className="hover:text-red-400 transition-colors">Service Area</Link>
            <Link href="/blog" className="hover:text-red-400 transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-red-400 transition-colors">Contact</Link>
            <Link href="/contact" className="hover:text-red-400 transition-colors">Get a Quote</Link>
            <Link href="/privacy-policy" className="hover:text-red-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-red-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
