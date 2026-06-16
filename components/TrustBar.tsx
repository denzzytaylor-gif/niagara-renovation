"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  stat: string;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    stat: "100", suffix: "%", label: "Licensed & Insured", sublabel: "Fully certified Ontario contractor"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat: "0", suffix: "$", label: "Free Estimates", sublabel: "No obligation consultations"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    stat: "4.9", suffix: "/5", label: "5-Star Rated", sublabel: "87+ verified reviews"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    stat: "500", suffix: "+", label: "Projects Completed", sublabel: "Across all of Niagara Region"
  },
];

function CountUp({ target, suffix, started }: { target: string; suffix: string; started: boolean }) {
  const [display, setDisplay] = useState("0");
  const numericTarget = parseFloat(target);
  const isDecimal = target.includes(".");

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numericTarget);
      if (isDecimal) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(Math.floor(current).toString());
      }
      if (step >= steps) {
        clearInterval(timer);
        setDisplay(target);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, numericTarget, target, isDecimal]);

  return (
    <span>
      {suffix === "$" ? `${suffix}${display}` : `${display}${suffix}`}
    </span>
  );
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="bg-black border-y border-white/10 py-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, rgba(220,38,38,0.4) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y-2 divide-x-0 md:divide-y-0 md:divide-x md:divide-red-900/40">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-4 py-4 md:py-2 first:border-t-0 md:first:border-l-0"
            >
              <div className="text-red-500 mb-2">
                {item.icon}
              </div>
              <div className="text-3xl font-black text-white mb-0.5 tabular-nums">
                <CountUp target={item.stat} suffix={item.suffix} started={isInView} />
              </div>
              <div className="text-red-400 font-bold text-sm mb-0.5">{item.label}</div>
              <div className="text-gray-400 text-xs">{item.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
