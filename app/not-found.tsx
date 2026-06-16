import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { PHONE } from "@/lib/data";

export default function NotFound() {
  return (
    <>
      <section className="bg-gradient-to-br from-black to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white text-center lg:text-left">
              <div className="text-8xl font-black text-red-600 mb-4">404</div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">Page Not Found</h1>
              <p className="text-gray-300 text-xl mb-6">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. But don&apos;t worry — we&apos;re still here to help with your renovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center">
                  &larr; Back to Homepage
                </Link>
                <a href="tel:6477979471" className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 px-6 rounded-lg transition-colors text-center">
                  {PHONE}
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/services/kitchen-renovations" className="text-red-400 hover:underline text-sm">Kitchen Renovations</Link>
                <Link href="/services/bathroom-renovations" className="text-red-400 hover:underline text-sm">Bathroom Renovations</Link>
                <Link href="/services/basement-finishing" className="text-red-400 hover:underline text-sm">Basement Finishing</Link>
                <Link href="/about" className="text-red-400 hover:underline text-sm">About Us</Link>
                <Link href="/contact" className="text-red-400 hover:underline text-sm">Contact</Link>
              </div>
            </div>
            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
