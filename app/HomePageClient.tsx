"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LeadForm from "@/components/LeadForm";
import TrustBar from "@/components/TrustBar";
import ServiceCard from "@/components/ServiceCard";
import CityGrid from "@/components/CityGrid";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import { SERVICES, CITIES, PHONE } from "@/lib/data";
import IMAGES from "@/lib/images.json";

const faqs = [
  { q: "How much does a home renovation cost in Niagara Region?", a: "Renovation costs vary widely by project type and scope. We provide free, detailed written estimates for every project so you know exactly what to expect before any work begins." },
  { q: "Are you licensed and insured in Ontario?", a: "Yes. Niagara Renovation Company is fully licensed in Ontario and carries comprehensive general liability insurance and WSIB coverage. All our tradespeople are fully certified." },
  { q: "How long does a typical renovation take?", a: "Timelines depend on project scope. A standard bathroom renovation takes 2–3 weeks, kitchen 4–6 weeks, basement 6–10 weeks, and home additions 3–6 months. We provide a detailed timeline at the estimate stage." },
  { q: "Do you serve all of Niagara Region?", a: "Yes. We serve all 12 municipalities in Niagara Region including St. Catharines, Niagara Falls, Welland, Grimsby, Fort Erie, Niagara-on-the-Lake, and more." },
  { q: "What warranty do you offer?", a: "We offer a comprehensive 5-year warranty on all workmanship, plus manufacturer warranties on all materials and products installed." },
  { q: "Do I need permits for my renovation?", a: "Many renovations require permits in Ontario. We handle the entire permit process on your behalf, ensuring full code compliance throughout the project." },
  { q: "How do I get a quote?", a: "Simply fill out our online form, call us at (647) 797-9471, or email info@niagararenovationcompany.com. We'll arrange a free in-home consultation and provide a detailed written estimate within 48 hours." },
  { q: "Can you help with design and material selection?", a: "Our team includes experienced designers who can help you select materials, colors, and finishes to match your style and budget. Design consultations are included with every project." },
];

export default function HomePageClient() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-black overflow-hidden py-20 lg:py-32">
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.home.hero}
          alt="Luxury kitchen renovation by Niagara Renovation Company"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay — darker on left so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        {/* Red accent bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm font-semibold">Niagara Region&apos;s Most Trusted Contractors</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
                Niagara&apos;s Most{" "}
                <span className="text-gradient">Trusted</span>
                <br />Renovation
                <br />Contractors
              </h1>

              <p className="text-gray-300 text-xl mb-8 leading-relaxed max-w-lg">
                From dream kitchens to stunning bathrooms — we transform Niagara homes with expert craftsmanship and lasting quality.
              </p>

              <ul className="space-y-3 mb-10">
                {["Licensed & Insured in Ontario", "Free Estimates – No Obligation", "Serving All 12 Niagara Municipalities", "5-Year Workmanship Warranty"].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-gray-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-red-600/20 border border-red-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    data-track="cta-quote"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black py-4 px-8 rounded-2xl text-lg transition-all amber-glow shadow-xl"
                  >
                    Get Your Free Quote &rarr;
                  </Link>
                </motion.div>
                <motion.a
                  href="tel:6477979471"
                  data-track="phone-click"
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-red-500 text-white hover:text-red-400 font-bold py-4 px-8 rounded-2xl text-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {PHONE}
                </motion.a>
              </div>

              {/* Social proof row */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["S", "M", "J", "R", "A"].map((l, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 border-2 border-black flex items-center justify-center text-white text-xs font-black"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-red-400 text-sm font-bold flex items-center gap-1">
                    <svg className="w-4 h-4 fill-red-500" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    Free Estimates
                  </div>
                  <div className="text-gray-400 text-xs">Detailed written quote, no obligation</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <LeadForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar />

      {/* SERVICES */}
      <motion.section
        initial={{ y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What We Do"
            title="Our Renovation Services"
            subtitle="Complete home renovation solutions for Niagara Region homeowners. From kitchens to roofing, we do it all."
            image={IMAGES.home.services_section}
            imageAlt="Professional renovation tools and craftsmanship"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ServiceCard {...s} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SEO CONTENT: ABOUT — split photo layout */}
      <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo column */}
            <motion.div
              initial={{ x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES.home.about_main}
                  alt="Beautiful home renovation interior by Niagara Renovation Company"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating stat badge */}
              <div className="absolute -bottom-6 -right-4 bg-red-600 text-white rounded-2xl px-6 py-4 shadow-xl">
                <div className="text-2xl font-black">Licensed</div>
                <div className="text-sm font-semibold text-red-100">& Insured in Ontario</div>
              </div>
              {/* Second smaller photo */}
              <div className="absolute -top-6 -left-4 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES.home.about_small}
                  alt="Luxury bathroom renovation Niagara"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Text column */}
            <motion.div
              initial={{ x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-red-600 text-sm font-semibold">About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5 leading-tight">Niagara Region&apos;s Most Trusted Renovation Contractor</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-5">
                Niagara Renovation Company is a full-service home renovation contractor serving homeowners across all 12 municipalities in the Niagara Region, Ontario. From the urban neighbourhoods of St. Catharines and Niagara Falls to the wine country estates of Lincoln — we bring premium craftsmanship and genuine care to every project.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                We are a Taylor and Co Company — a name built on integrity, community, and a relentless commitment to quality. Every project starts with a free consultation and a detailed written estimate with no hidden fees. Our 5-year workmanship warranty means our commitment doesn&apos;t end on move-in day.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { num: "Free", label: "No-Obligation Estimates" },
                  { num: "5-Year", label: "Workmanship Warranty" },
                  { num: "12", label: "Niagara Municipalities" },
                  { num: "One", label: "Contractor for Every Trade" },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-2xl font-black text-red-600">{stat.num}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              <a
                href="tel:6477979471"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black py-3 px-7 rounded-xl transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (647) 797-9471
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <motion.section
        initial={{ y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 hero-pattern opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why Us"
            title="Why Choose Niagara Renovation Company?"
            subtitle="We've built our reputation one project at a time — trusted across all of Niagara Region."
            image={IMAGES.home.why_us_section}
            imageAlt="Skilled renovation contractors at work"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Local Expertise", desc: "Born and raised in Niagara, we understand local building codes, climate conditions, and homeowner needs better than anyone.", svg: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
              { title: "Licensed & Insured", desc: "Fully licensed Ontario contractors with comprehensive liability insurance and WSIB coverage for complete peace of mind.", svg: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
              { title: "Free Estimates", desc: "We provide detailed written estimates at no cost or obligation, so you can make informed decisions without pressure.", svg: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { title: "Quality Craftsmanship", desc: "We use only premium materials and employ skilled, experienced tradespeople who take pride in every detail.", svg: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> },
              { title: "On-Time Delivery", desc: "We set realistic timelines and stick to them. Your project will be completed when we say it will.", svg: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { title: "5-Year Warranty", desc: "Our 5-year workmanship warranty means we stand behind every job we complete, long after the tools are put away.", svg: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10 text-white hover:border-red-600/50 transition-all duration-300 group"
              >
                <div className="text-red-500 mb-4">{item.svg}</div>
                <h3 className="font-black text-xl mb-2 group-hover:text-red-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CITIES */}
      <motion.section
        initial={{ y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Service Area"
            title="Serving All of Niagara Region"
            subtitle="We proudly serve homeowners across every municipality in the Niagara Region."
            image={IMAGES.home.cities_section}
            imageAlt="Niagara Region home renovation service area"
          />
          <CityGrid />
          <div className="text-center mt-8">
            <Link href="/service-area" className="inline-flex items-center gap-1.5 text-red-600 font-bold hover:underline text-sm">
              View Our Full Service Area
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        initial={{ y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(220,38,38,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Client Stories"
            title="What Our Clients Say"
            subtitle="Hear from Niagara homeowners who have transformed their homes with us."
            image={IMAGES.home.testimonials_section}
            imageAlt="Beautiful kitchen renovation completed by Niagara Renovation Company"
          />
          <TestimonialsCarousel />
        </div>
      </motion.section>

      {/* GALLERY */}
      <motion.section
        initial={{ y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Work"
            title="Our Recent Projects"
            subtitle="A selection of recent renovations completed across Niagara Region."
            image={IMAGES.home.gallery_section}
            imageAlt="Luxury bathroom renovation project"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              // Optimized WebP variants generated by scripts/optimize-images.js
              { label: "Bathroom Remodeling Services", img: "bathroom-remodeling-services", widths: [480, 960] },
              { label: "Bathroom Remodeling", img: "bathroom-remodeling", widths: [480, 960] },
              { label: "Renovation Project Update", img: "contractor-update", widths: [480] },
              { label: "Professional Contractors", img: "contractors", widths: [480, 960] },
              { label: "General Contractor Work", img: "general-contractor", widths: [480, 960] },
              { label: "General Contracting Services", img: "general-contractors", widths: [480, 960] },
              { label: "House Remodel", img: "house-remodel", widths: [480, 960] },
              { label: "Laundry Room Remodeling", img: "laundry-room-remodeling", widths: [480, 960] },
              { label: "Living Room Remodeling", img: "living-room-remodeling", widths: [480, 960] },
              { label: "TV Room Contracting", img: "tv-room-contracting", widths: [480, 960] },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative rounded-2xl aspect-video overflow-hidden group cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/gallery/${item.img}-480.webp`}
                  srcSet={item.widths.map(w => `/images/gallery/${item.img}-${w}.webp ${w}w`).join(", ")}
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 50vw"
                  alt={item.label}
                  width={600}
                  height={338}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end p-4 z-10">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-red-400 text-xs font-semibold mt-0.5">View Project &rarr;</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial={{ y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about working with Niagara Renovation Company."
            image={IMAGES.home.faq_section}
            imageAlt="Professional renovation consultation"
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 group overflow-hidden hover:border-red-500/40 hover:shadow-md transition-all duration-200"
              >
                <summary className="px-6 py-4 cursor-pointer font-bold text-gray-900 hover:text-red-600 transition-colors list-none flex justify-between items-center gap-4">
                  <span>{faq.q}</span>
                  <span className="text-red-600 text-xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{faq.a}</div>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SEO CONTENT: SERVICES + AREA */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5">Renovation Services for Every Niagara Home</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            Niagara homes are as diverse as the communities they belong to. A heritage Victorian in St. Catharines&apos;s Port Dalhousie neighbourhood has entirely different renovation needs than a mid-century bungalow in Stamford or a contemporary build in Grimsby&apos;s Casablanca district. Our team has the range of skills and the depth of local knowledge to handle every property type with the specific expertise it deserves. From custom millwork that honours historic character to bold, contemporary kitchen designs with waterfall quartz islands — we do it all, and we do it right.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            Our kitchen renovation services transform outdated, inefficient kitchens into the heart of the home that every family deserves — with custom cabinetry, premium countertops, chef-grade appliances, and thoughtful layouts that work for real life. Our bathroom renovations range from simple fixture upgrades to full ensuite transformations with heated floors, walk-in tile showers, freestanding tubs, and custom vanities. Our basement finishing service unlocks the hidden square footage in your home, creating family rooms, home theatres, home offices, and rental suites that pay dividends for years.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            Our new additions and ADU services help Niagara homeowners adapt to life&apos;s changes — whether that means adding a main-floor primary suite, building a detached garden suite for aging parents, or creating a legal rental unit that generates income. Our decks and outdoor living division designs custom outdoor spaces that make the most of Niagara&apos;s exceptional summers. And our general contracting team manages complex, multi-trade renovation projects from first design through final inspection, taking complete responsibility for the outcome so you don&apos;t have to.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Across St. Catharines, Niagara Falls, Welland, Thorold, Grimsby, Fort Erie, Lincoln, Pelham, Niagara-on-the-Lake, Port Colborne, Wainfleet, and West Lincoln — Niagara Renovation Company is the renovation contractor that local homeowners recommend to their neighbours. That word-of-mouth reputation is our most valued credential, and we work hard every single day to deserve it. Contact us today and discover why so many Niagara families trust us with their most important investment.
          </p>
        </div>
      </section>

      {/* CITY × SERVICE LINKS — internal linking for indexing */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">Browse Renovation Services by City</h2>
          <p className="text-gray-500 text-sm text-center mb-10">Find trusted renovation contractors for your Niagara community.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.filter(s => ["basement-finishing","kitchen-renovations","additions-adu","general-contracting"].includes(s.slug)).map(s => (
              <div key={s.slug}>
                <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide border-b-2 border-red-600 pb-2 mb-3">{s.name}</h3>
                <ul className="space-y-2">
                  {CITIES.map(c => (
                    <li key={c.slug}>
                      <Link href={`/${c.slug}/${s.slug}`} className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                        {s.name} in {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/service-area" className="text-sm text-red-600 hover:underline font-semibold">
              View all services across all Niagara cities &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
