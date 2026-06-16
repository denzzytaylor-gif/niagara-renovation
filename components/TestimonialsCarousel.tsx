"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = TESTIMONIALS.length;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent(index);
    },
    []
  );

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total, -1);
  }, [current, total, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % total, 1);
  }, [current, total, goTo]);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const getVisibleIndices = () => {
    const p = (current - 1 + total) % total;
    const n = (current + 1) % total;
    return [p, current, n];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div className="w-full">
      {/* Mobile: single card with slide */}
      <div className="block md:hidden">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) next();
                else if (info.offset.x > 50) prev();
              }}
            >
              <TestimonialCard testimonial={TESTIMONIALS[current]} isActive />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop: 3 cards */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {visibleIndices.map((idx, position) => (
          <motion.div
            key={idx}
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: position * 0.08 }}
            className={`transition-all duration-300 ${position === 1 ? "scale-105" : "scale-100 opacity-80"}`}
          >
            <TestimonialCard testimonial={TESTIMONIALS[idx]} isActive={position === 1} />
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/20 hover:border-red-500 hover:bg-red-500/10 text-white hover:text-red-400 transition-all flex items-center justify-center"
          aria-label="Previous testimonial"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-3 bg-red-600"
                  : "w-3 h-3 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-white/20 hover:border-red-500 hover:bg-red-500/10 text-white hover:text-red-400 transition-all flex items-center justify-center"
          aria-label="Next testimonial"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface Testimonial {
  name: string;
  city: string;
  service: string;
  text: string;
  rating: number;
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border-l-4 border-red-600 shadow-xl relative overflow-hidden h-full flex flex-col ${
        isActive ? "shadow-red-600/15" : ""
      }`}
    >
      {/* Large decorative quote */}
      <div className="text-red-600 text-7xl font-black leading-none absolute -top-2 -left-1 opacity-10 select-none pointer-events-none">
        &ldquo;
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3 relative z-10">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-red-500 fill-red-500" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <blockquote className="text-gray-700 text-sm leading-relaxed mb-5 relative z-10 flex-1 italic">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Reviewer info */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 relative z-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-black text-gray-900 text-sm">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.city} &middot; {testimonial.service}</p>
        </div>
      </div>
    </div>
  );
}
