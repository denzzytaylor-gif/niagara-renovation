"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CITIES } from "@/lib/data";

interface CityGridProps {
  serviceSlug?: string;
}

export default function CityGrid({ serviceSlug }: CityGridProps) {
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
      { rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {CITIES.map((city, i) => {
        const href = serviceSlug ? `/${city.slug}/${serviceSlug}` : `/${city.slug}`;
        return (
          <div
            key={city.slug}
            className={mounted ? (visible ? "reveal-visible" : "reveal-pending") : ""}
            style={mounted ? { transitionDelay: `${i * 0.05}s` } : undefined}
          >
            <Link
              href={href}
              className="group flex flex-col items-center justify-center gap-2 bg-white rounded-xl border border-gray-200 hover:border-red-500 hover:bg-red-50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-200 p-4 text-center"
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-red-600 flex items-center justify-center transition-all duration-200">
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div className="text-gray-900 font-semibold text-sm group-hover:text-red-600 transition-colors duration-200 leading-tight">
                {city.name}
              </div>
              <div className="text-xs text-gray-400 group-hover:text-red-500/70 transition-colors font-medium">
                View Services &rarr;
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
