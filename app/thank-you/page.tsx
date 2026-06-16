import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, EMAIL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Thank You | Niagara Renovation Company",
  description: "Thank you for contacting Niagara Renovation Company. We'll be in touch within 24 hours.",
  alternates: { canonical: "https://www.niagararenovationcompany.com/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-black flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-red-800/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">

        {/* Check icon */}
        <div className="w-24 h-24 bg-red-600/15 border-2 border-red-600/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-1.5 mb-5">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 text-sm font-semibold">Message Received</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          Thank You for Reaching Out!
        </h1>

        <p className="text-gray-300 text-xl mb-2 leading-relaxed">
          We&apos;ll be in touch within{" "}
          <span className="text-white font-black">24 hours</span>{" "}
          to discuss your project.
        </p>
        <p className="text-gray-500 text-base mb-10">
          Check your inbox — we may follow up by email too.
        </p>

        {/* Phone card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 mb-8 text-left">
          <p className="text-gray-400 text-sm mb-4 text-center">Need to speak with someone right now?</p>

          <a
            href="tel:6477979471"
            className="flex items-center gap-4 group justify-center mb-6"
          >
            <div className="w-14 h-14 bg-red-600 group-hover:bg-red-700 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div className="text-3xl font-black text-white group-hover:text-red-400 transition-colors">{PHONE}</div>
              <div className="text-gray-500 text-sm">Mon–Fri 8am–6pm &nbsp;&middot;&nbsp; Sat 9am–4pm</div>
            </div>
          </a>

          <div className="border-t border-white/5 pt-5 text-center">
            <p className="text-gray-500 text-sm mb-1">Prefer email?</p>
            <a href={`mailto:${EMAIL}`} className="text-red-400 font-semibold hover:underline text-sm">
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-500 mb-10">
          {[
            "Licensed & Insured",
            "5-Year Workmanship Warranty",
            "Free, No-Obligation Estimates",
            "Serving All of Niagara Region",
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </span>
          ))}
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black py-4 px-8 rounded-2xl text-lg transition-all shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
