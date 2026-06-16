interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
}

export default function SectionHeading({ label, title, subtitle, image, imageAlt = "Renovation project" }: SectionHeadingProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-12">
      {/* Background renovation photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Dark overlay with red accent at bottom */}
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {/* Content */}
      <div className="relative text-center py-16 px-8">
        {label && (
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">{label}</span>
          </div>
        )}
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
