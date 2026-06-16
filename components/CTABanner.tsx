"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PHONE } from "@/lib/data";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
}

export default function CTABanner({
  title = "Ready to Transform Your Home?",
  subtitle = "Get a free, no-obligation quote from Niagara's most trusted renovation team. We respond within 2 hours.",
}: CTABannerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-20">
      {/* Diagonal stripe pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(220,38,38,1) 0px,
            rgba(220,38,38,1) 2px,
            transparent 2px,
            transparent 20px
          )`,
        }}
      />

      {/* Decorative red blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* Red gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          ref={ref}
          className={mounted ? (visible ? "reveal-visible" : "reveal-pending") : ""}
        >
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm font-semibold">Limited Availability — Book Your Consultation Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black py-4 px-8 rounded-2xl text-lg transition-all amber-glow shadow-xl"
              >
                Get My Free Quote Today
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.a
              href="tel:6477979471"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-red-500 text-white hover:text-red-400 font-bold py-4 px-8 rounded-2xl text-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {PHONE}
            </motion.a>
          </div>

          {/* Trust badges row */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {[
              { label: "No Obligation" },
              { label: "Response Within 2 Hours" },
              { label: "Licensed & Insured" },
              { label: "5-Year Warranty" },
            ].map((badge, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Red gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
    </section>
  );
}
