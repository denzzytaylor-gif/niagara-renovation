import type { Metadata } from "next";
import IMAGES from "@/lib/images.json";
import BlogCard from "@/components/BlogCard";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Renovation Tips & Guides for Niagara Homeowners | Blog",
  description: "Expert renovation tips, cost guides, permit advice, and home improvement inspiration for Niagara Region homeowners. Trusted advice from licensed Niagara contractors.",
  alternates: { canonical: "https://www.niagararenovationcompany.com/blog" },
  openGraph: {
    title: "Renovation Tips & Guides for Niagara Homeowners | Niagara Renovation Company Blog",
    description: "Expert renovation advice from Niagara Region's most trusted contractors. Kitchen, bathroom, basement, roofing tips and guides.",
    url: "https://www.niagararenovationcompany.com/blog",
    images: [{ url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format", width: 1200, height: 630, alt: "Niagara Renovation Company blog" }],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Niagara Renovation Company Blog",
  "description": "Expert home renovation tips, guides, and advice for Niagara Region homeowners.",
  "url": "https://www.niagararenovationcompany.com/blog",
  "publisher": {
    "@type": "Organization",
    "name": "Niagara Renovation Company",
    "url": "https://www.niagararenovationcompany.com",
  },
};

const posts = [
  {
    slug: "how-to-choose-a-renovation-contractor-niagara",
    title: "How to Choose the Right Renovation Contractor in Niagara Region",
    excerpt: "Hiring the wrong contractor is the costliest mistake a homeowner can make. Here is a practical, step-by-step guide to finding and vetting a licensed renovation contractor in Niagara Region, Ontario.",
    date: "March 1, 2025",
    category: "Tips & Advice",
    image: IMAGES.blog.post_choose_contractor,
  },
  {
    slug: "home-renovation-permits-niagara-ontario",
    title: "Do You Need a Permit for Your Renovation in Niagara Region, Ontario?",
    excerpt: "Many Niagara homeowners are surprised to learn which renovations require a building permit and which do not. This guide explains Ontario permit requirements so you can renovate with confidence.",
    date: "February 15, 2025",
    category: "Permits & Legal",
    image: IMAGES.blog.post_permits,
  },
  {
    slug: "best-home-renovations-for-resale-value-niagara",
    title: "Top Home Renovations That Add the Most Resale Value in Niagara Region",
    excerpt: "Not all renovations are created equal when it comes to return on investment. Discover which home renovation projects deliver the strongest resale value for Niagara Region homeowners.",
    date: "February 1, 2025",
    category: "ROI & Value",
    image: IMAGES.blog.post_resale_value,
  },
  {
    slug: "kitchen-renovation-timeline-niagara",
    title: "How Long Does a Kitchen Renovation Take in Niagara Region?",
    excerpt: "One of the most common questions homeowners ask before starting a kitchen renovation is how long they will be without a functional kitchen. This guide breaks down realistic timelines for every stage.",
    date: "January 15, 2025",
    category: "Kitchens",
    image: IMAGES.blog.post_kitchen_timeline,
  },
  {
    slug: "energy-efficient-renovations-niagara",
    title: "Energy-Efficient Home Renovations for Niagara Region Homeowners",
    excerpt: "Rising energy costs and Ontario's climate make energy-efficient renovations one of the smartest investments Niagara homeowners can make. Learn which upgrades deliver the best comfort and utility savings.",
    date: "January 1, 2025",
    category: "Energy & Savings",
    image: IMAGES.blog.post_energy_efficient,
  },
  {
    slug: "bathroom-renovation-checklist-niagara",
    title: "Bathroom Renovation Checklist: Everything Niagara Homeowners Need to Know",
    excerpt: "A successful bathroom renovation requires careful planning before a single tile is removed. Use this comprehensive checklist to plan your Niagara bathroom renovation from start to finish.",
    date: "December 15, 2025",
    category: "Bathrooms",
    image: IMAGES.blog.post_bathroom_checklist,
  },
  {
    slug: "kitchen-renovation-cost-niagara-2024",
    title: "How Much Does a Kitchen Renovation Cost in Niagara? (2026 Guide)",
    excerpt: "A comprehensive breakdown of kitchen renovation costs in Niagara Region — from budget refreshes to full high-end transformations. Includes average costs for cabinetry, countertops, and labour.",
    date: "March 15, 2026",
    category: "Kitchens",
    image: IMAGES.blog.post_kitchen_cost,
  },
  {
    slug: "bathroom-renovation-trends-niagara-2024",
    title: "Top 5 Bathroom Renovation Trends in Niagara Region for 2026",
    excerpt: "Discover the hottest bathroom renovation trends Niagara homeowners are embracing — from walk-in tile showers to warm earth tones, freestanding tubs, and heated floors.",
    date: "February 28, 2026",
    category: "Bathrooms",
    image: IMAGES.blog.post_bathroom_trends,
  },
  {
    slug: "basement-finishing-niagara-guide",
    title: "Basement Finishing in Niagara: What You Need to Know Before You Start",
    excerpt: "Everything Niagara homeowners need to know before finishing their basement — permits, moisture management, egress windows, insulation, and how to maximize your investment.",
    date: "January 20, 2026",
    category: "Basements",
    image: IMAGES.blog.post_basement_guide,
  },
];

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.blog.page_header}
          alt="Renovation tips and guides for Niagara homeowners"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 rounded-full px-4 py-1.5 mb-4">
            <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
            </svg>
            <span className="text-red-400 text-sm font-semibold">Expert Renovation Advice</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Renovation Tips &amp; Guides</h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Expert advice, cost guides, permit information, and renovation inspiration — written by Niagara Region&apos;s trusted contractors.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured post */}
          <div className="mb-10">
            <span className="inline-block bg-red-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-4">Latest Article</span>
            <BlogCard {...posts[0]} />
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent mb-10" />

          <h2 className="text-2xl font-black text-gray-900 mb-6">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map(post => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
