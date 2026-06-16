/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.niagararenovationcompany.com',
  generateRobotsTxt: false, // We have a custom robots.txt in /public
  exclude: ['/thank-you', '/icon.png'],
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'monthly';
    if (path === '/') { priority = 1.0; changefreq = 'weekly'; }
    else if (path === '/services') { priority = 0.9; changefreq = 'weekly'; }
    else if (path.startsWith('/services/') && path.split('/').length === 3) { priority = 0.9; }
    else if (path === '/about' || path === '/blog' || path === '/service-area' || path === '/contact') { priority = 0.8; }
    else if (path === '/terms' || path === '/privacy-policy') { priority = 0.3; changefreq = 'yearly'; }
    else if (path.match(/^\/[^/]+\/[^/]+$/) && !path.startsWith('/services') && !path.startsWith('/blog')) { priority = 0.7; } // city/service pages
    else if (path.match(/^\/[^/]+$/) && !path.startsWith('/services') && !path.startsWith('/blog') && !path.startsWith('/about') && !path.startsWith('/contact') && !path.startsWith('/service-area') && !path.startsWith('/privacy') && !path.startsWith('/terms')) { priority = 0.8; changefreq = 'monthly'; } // city pages
    else if (path.startsWith('/blog/')) { priority = 0.6; }
    return { loc: path, changefreq, priority, lastmod: new Date().toISOString() };
  },
};
