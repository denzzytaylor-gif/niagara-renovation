"use client";
import { SERVICES, CITIES } from "@/lib/data";

const FORMSPREE_URL = "https://formspree.io/f/maqpllkj";
const THANK_YOU_URL = "https://www.niagararenovationcompany.com/thank-you";

interface LeadFormProps {
  defaultCity?: string;
  defaultService?: string;
}

export default function LeadForm({ defaultCity, defaultService }: LeadFormProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-6 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-5">
        <h3 className="text-2xl font-black text-white mb-1">Get Your FREE Quote</h3>
        <p className="text-red-400 text-sm font-semibold">Response within 24 hours &middot; No obligation</p>
      </div>

      <form
        action={FORMSPREE_URL}
        method="POST"
        className="space-y-3"
      >
        {/* Formspree redirect + subject */}
        <input type="hidden" name="_subject" value="New Lead - Niagara Renovation Company" />
        <input type="hidden" name="_next" value={THANK_YOU_URL} />

        {/* Name */}
        <input
          type="text"
          name="name"
          required
          placeholder="Your Full Name *"
          className="w-full bg-white/5 border border-white/10 focus:border-red-500 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm transition-colors"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          required
          placeholder="Email Address *"
          className="w-full bg-white/5 border border-white/10 focus:border-red-500 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm transition-colors"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          required
          placeholder="Phone Number *"
          className="w-full bg-white/5 border border-white/10 focus:border-red-500 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm transition-colors"
        />

        {/* Service */}
        <select
          name="service"
          defaultValue={defaultService || ""}
          className="w-full bg-gray-900 border border-white/10 focus:border-red-500 focus:outline-none rounded-xl px-4 py-3 text-sm transition-colors text-gray-300"
        >
          <option value="">Select a Service</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
        </select>

        {/* City */}
        <select
          name="city"
          defaultValue={defaultCity || ""}
          className="w-full bg-gray-900 border border-white/10 focus:border-red-500 focus:outline-none rounded-xl px-4 py-3 text-sm transition-colors text-gray-300"
        >
          <option value="">Select Your City</option>
          {CITIES.map((c) => (
            <option key={c.slug} value={c.name}>{c.name}</option>
          ))}
        </select>

        {/* Message */}
        <textarea
          name="message"
          required
          placeholder="Tell us about your project *"
          rows={3}
          className="w-full bg-white/5 border border-white/10 focus:border-red-500 focus:outline-none rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm transition-colors resize-none"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black py-4 px-6 rounded-2xl transition-all text-base flex items-center justify-center gap-2 shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Request My Free Quote
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      {/* Or call us */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-xs mb-2">Or call us directly</p>
        <a href="tel:6477979471" className="inline-flex items-center gap-2 text-red-400 font-black text-lg hover:text-red-300 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          (647) 797-9471
        </a>
      </div>

      {/* Trust badges */}
      <div className="mt-4 grid grid-cols-2 gap-1.5 text-xs text-gray-400">
        {["Licensed & Insured", "Free Estimates", "Local Family Business", "5-Year Warranty"].map((badge, i) => (
          <span key={i} className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
