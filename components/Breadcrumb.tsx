import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://www.niagararenovationcompany.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && <span className="text-gray-300">/</span>}
              {index === items.length - 1 ? (
                <span className="text-gray-700 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-amber hover:underline">{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
