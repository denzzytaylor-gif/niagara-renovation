/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true, // avoids errors if using Next.js Image component
  },
};

module.exports = nextConfig;
