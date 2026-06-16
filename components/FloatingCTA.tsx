"use client";
import { motion } from "framer-motion";
import { PHONE } from "@/lib/data";

export default function FloatingCTA() {
  return (
    <motion.div
      className="md:hidden fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.4, type: "spring", stiffness: 200 }}
    >
      {/* Pulsing red rings */}
      <motion.div
        className="absolute inset-0 rounded-full bg-red-600/40"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-red-600/20"
        animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      <motion.a
        href="tel:6477979471"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex items-center gap-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3.5 px-5 rounded-full shadow-2xl amber-glow text-sm"
        aria-label={`Call us at ${PHONE}`}
      >
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span>{PHONE}</span>
      </motion.a>
    </motion.div>
  );
}
