"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FORMSPREE_URL = "https://formspree.io/f/maqpllkj";
const THANK_YOU_URL = "https://www.niagararenovationcompany.com/thank-you";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("exitPopupShown");
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("exitPopupShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);


  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red gradient header */}
            <div className="relative bg-gradient-to-r from-red-700 to-red-600 px-6 py-5">
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "repeating-linear-gradient(-45deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 2px, transparent 2px, transparent 16px)" }}
              />
              <button
                className="absolute top-3 right-4 text-white/80 hover:text-white text-2xl leading-none transition-colors"
                onClick={() => setShow(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="relative text-center">
                <svg className="w-10 h-10 text-white/90 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <h3 className="text-xl font-black text-white leading-tight">
                  Wait! Don&apos;t Leave Without<br />Your Free Quote
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-300 text-sm text-center mb-5 leading-relaxed">
                Leave your details and we&apos;ll get back to you within 24 hours with a no-obligation estimate.
              </p>
              <form action={FORMSPREE_URL} method="POST" className="space-y-3">
                <input type="hidden" name="_subject" value="New Lead - Niagara Renovation Company" />
                <input type="hidden" name="_next" value={THANK_YOU_URL} />
                <input type="hidden" name="source" value="exit-intent-popup" />

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Full Name *"
                  className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/60 text-white text-sm placeholder-gray-500 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address *"
                  className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/60 text-white text-sm placeholder-gray-500 transition-all"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number *"
                  className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/60 text-white text-sm placeholder-gray-500 transition-all"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Tell us about your project *"
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/60 text-white text-sm placeholder-gray-500 transition-all resize-none"
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-black py-3.5 px-6 rounded-2xl transition-all amber-glow shadow-xl text-sm"
                >
                  Yes, Get My Free Quote!
                </motion.button>
              </form>
              <p className="text-center text-xs text-gray-500 mt-3">No spam. No obligation. Just a friendly call.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
