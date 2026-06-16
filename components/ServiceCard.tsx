"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  slug: string;
  name: string;
  icon: string;
  shortDesc: string;
  cityPrefix?: string;
}

const serviceIcons: Record<string, React.ReactNode> = {
  kitchen: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  bathroom: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  basement: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  addition: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
    </svg>
  ),
  roofing: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9.5L12 3l9 6.5V21H3V9.5z" />
    </svg>
  ),
  flooring: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  painting: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  windows: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
};

export default function ServiceCard({ slug, name, icon, shortDesc, cityPrefix }: ServiceCardProps) {
  const href = cityPrefix ? `/${cityPrefix}/${slug}` : `/services/${slug}`;
  const iconEl = serviceIcons[icon] ?? serviceIcons.kitchen;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href} className="group block h-full">
        <div className="relative bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-lg overflow-hidden
                        group-hover:border-red-500 group-hover:shadow-red-500/20 group-hover:shadow-2xl transition-all duration-300">
          {/* Red top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

          {/* Background decorative circle */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-red-50 rounded-full transition-all duration-300 group-hover:bg-red-100" />

          <div className="text-red-600 mb-4 relative">{iconEl}</div>
          <h3 className="text-gray-900 font-black text-xl mb-2 group-hover:text-red-600 transition-colors duration-200">{name}</h3>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">{shortDesc}</p>

<div className="flex items-center gap-1.5 text-red-600 font-bold text-sm mt-auto">
            <span>Get Free Quote</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              &rarr;
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
