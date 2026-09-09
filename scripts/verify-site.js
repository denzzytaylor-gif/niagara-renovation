#!/usr/bin/env node
/**
 * Post-deploy smoke test for niagararenovationcompany.com.
 *
 * Guards the failure that broke the site once already: the apex domain served
 * pages directly instead of redirecting to www, so every RSC payload fetch
 * (`/<path>/index.txt`) cross-origin redirected to www, failed CORS, and Next
 * hard-navigated the browser to the raw .txt payload — a page of plain words.
 *
 * Checks:
 *   1. Every apex URL shape (with AND without a trailing slash, pages and
 *      assets) returns a 3xx to the www host. No 200s on the apex.
 *   2. Every internal link in the sitemap returns 200 text/html on www.
 *   3. Every page ships the stylesheet link.
 *   4. RSC payloads are same-origin reachable on www.
 *
 * Usage: node scripts/verify-site.js [origin]
 */

const APEX = 'https://niagararenovationcompany.com';
const WWW = process.argv[2] || 'https://www.niagararenovationcompany.com';

let failures = 0;
const fail = (msg) => { failures++; console.error('  FAIL  ' + msg); };
const pass = (msg) => console.log('  ok    ' + msg);

async function head(url) {
  const res = await fetch(url, { redirect: 'manual' });
  return { status: res.status, location: res.headers.get('location'), type: res.headers.get('content-type') || '' };
}

async function checkApexRedirects() {
  console.log('\n[1] apex must redirect every path shape to www');
  const paths = [
    '/', '/about/', '/about', '/services/', '/services/kitchen-renovations/',
    '/st-catharines/', '/st-catharines/kitchen-renovations/', '/blog/',
    '/about/index.txt', '/about/index.txt?_rsc=test',
    '/_next/static/css/app.css', '/images/logo.png',
  ];
  for (const p of paths) {
    const { status, location } = await head(APEX + p);
    if (status < 300 || status >= 400) {
      fail(`apex ${p} returned ${status}, expected a redirect to www`);
    } else if (!location || !location.startsWith(WWW + '/')) {
      fail(`apex ${p} redirected to ${location}, expected ${WWW}`);
    } else {
      pass(`apex ${p} -> ${status} ${location}`);
    }
  }
}

async function sitemapUrls() {
  const xml = await (await fetch(WWW + '/sitemap-0.xml')).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function checkPages() {
  console.log('\n[2/3] every page: 200, text/html, stylesheet present');
  const urls = await sitemapUrls();
  if (!urls.length) return fail('sitemap-0.xml listed no URLs');
  console.log(`  (${urls.length} URLs from sitemap)`);
  let bad = 0;
  for (const url of urls) {
    const res = await fetch(url);
    const type = res.headers.get('content-type') || '';
    if (res.status !== 200) { fail(`${url} -> HTTP ${res.status}`); bad++; continue; }
    if (!type.includes('text/html')) { fail(`${url} -> content-type ${type}, expected text/html`); bad++; continue; }
    const html = await res.text();
    if (!/rel="stylesheet"/.test(html)) { fail(`${url} -> no stylesheet link (page would render as plain text)`); bad++; }
  }
  if (!bad) pass(`all ${urls.length} pages return styled HTML`);
}

async function checkRsc() {
  console.log('\n[4] RSC payloads reachable same-origin on www');
  for (const p of ['/index.txt', '/about/index.txt', '/services/kitchen-renovations/index.txt']) {
    const { status, location } = await head(WWW + p);
    if (status !== 200) fail(`${WWW}${p} -> ${status} ${location || ''} (client navigation will break)`);
    else pass(`${WWW}${p} -> 200`);
  }
}

(async () => {
  console.log('Verifying ' + WWW);
  await checkApexRedirects();
  await checkPages();
  await checkRsc();
  console.log(failures ? `\n${failures} check(s) FAILED\n` : '\nAll checks passed\n');
  process.exit(failures ? 1 : 0);
})();
