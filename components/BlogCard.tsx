import Link from "next/link";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category?: string;
  image?: string;
}

export default function BlogCard({ title, slug, excerpt, date, category, image }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-red-500/40 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-900">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <svg className="w-12 h-12 text-red-600/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          {category && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{category}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <p className="text-red-500 text-xs font-bold uppercase tracking-wider mb-2">{date}</p>
          <h3 className="text-gray-900 font-black text-lg mb-3 group-hover:text-red-600 transition-colors leading-snug flex-1">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
          <span className="inline-flex items-center gap-1 text-red-600 font-bold text-sm group-hover:gap-2 transition-all">
            Read Article
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
