#!/usr/bin/env node
/**
 * Postbuild: writes out/sitemap.xml + out/sitemap-0.xml from the exported HTML,
 * and fails the build on SEO regressions.
 *
 * Replaces next-sitemap, which ran after `next build` and wrote into public/,
 * so every deploy shipped the stale sitemap committed in public/ (lastmod stuck
 * at 2026-06-24).
 *
 * Inclusion: only exported HTML pages that are indexable (no noindex) and carry a
 * single self-referencing canonical. Assets, redirects, and noindex pages never
 * appear because only out/**\/index.html files are considered.
 *
 * lastmod: each page's meaningful content (title, meta description, canonical,
 * robots, and the text + links + image alts inside <main>) is fingerprinted and
 * stored with the date it last changed in sitemap-lastmod.json (committed).
 *   - Local build: a changed/new fingerprint records today's date (America/Toronto)
 *     and updates the manifest. Commit the manifest with the change.
 *   - CI/Vercel build: the manifest is read-only. If a page's fingerprint doesn't
 *     match (manifest not committed), its lastmod is OMITTED rather than guessed.
 * Unchanged pages keep their recorded date no matter how often the site deploys.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SITE = "https://www.niagararenovationcompany.com";
const BRAND = "Niagara Renovation Company";
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "out");
const MANIFEST = path.join(ROOT, "sitemap-lastmod.json");
const IS_CI = Boolean(process.env.VERCEL || process.env.CI);

const errors = [];
const warnings = [];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next" || entry.name === "images" || entry.name === "404") continue;
      files.push(...walk(full));
    } else if (entry.name === "index.html") {
      files.push(full);
    }
  }
  return files;
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function fingerprint(html, head) {
  const mainMatch = html.match(/<main[^>]*>([\s\S]*)<\/main>/);
  const main = (mainMatch ? mainMatch[1] : html)
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const links = [...main.matchAll(/<a [^>]*href="([^"]*)"/g)].map((m) => m[1]).join("|");
  const alts = [...main.matchAll(/<img [^>]*alt="([^"]*)"/g)].map((m) => m[1]).join("|");
  const text = decode(main.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return crypto
    .createHash("sha256")
    .update(JSON.stringify({ ...head, text, links, alts }))
    .digest("hex")
    .slice(0, 16);
}

function today() {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto" }).format(new Date());
}

function main() {
  if (!fs.existsSync(OUT)) throw new Error("out/ not found — run next build first");
  const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
  const nextManifest = {};
  const entries = [];

  for (const file of walk(OUT).sort()) {
    const rel = path.relative(OUT, path.dirname(file)).split(path.sep).join("/");
    const urlPath = rel ? `/${rel}/` : "/";
    const html = fs.readFileSync(file, "utf8");

    const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
    const description = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
    const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "";
    const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);

    if (/noindex/i.test(robots)) continue; // e.g. /thank-you/ — intentionally not in the sitemap

    const expected = SITE + urlPath;
    if (canonicals.length !== 1) errors.push(`${urlPath}: expected 1 canonical, found ${canonicals.length}`);
    else if (canonicals[0] !== expected) errors.push(`${urlPath}: canonical ${canonicals[0]} is not self-referencing (${expected})`);
    if (!title) errors.push(`${urlPath}: missing <title>`);
    if (title.split(BRAND).length - 1 > 1) errors.push(`${urlPath}: brand appears more than once in title "${title}"`);
    if (!description) warnings.push(`${urlPath}: missing meta description`);
    else if (description.length > 170) warnings.push(`${urlPath}: meta description is ${description.length} chars`);

    const hash = fingerprint(html, { title, description, canonical: canonicals[0], robots });
    const known = manifest[urlPath];
    let lastmod;
    if (known && known.hash === hash) {
      lastmod = known.lastmod;
      nextManifest[urlPath] = known;
    } else if (IS_CI) {
      warnings.push(`${urlPath}: content changed but sitemap-lastmod.json was not updated — lastmod omitted`);
      if (known) nextManifest[urlPath] = known;
    } else {
      lastmod = today();
      nextManifest[urlPath] = { hash, lastmod };
    }
    entries.push({ loc: expected, lastmod });
  }

  if (entries.length === 0) errors.push("no indexable pages found in out/ — refusing to write an empty sitemap");

  const urlset =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.map((e) => `<url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`).join("\n") +
    "\n</urlset>\n";
  const index =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `<sitemap><loc>${SITE}/sitemap-0.xml</loc></sitemap>\n` +
    "</sitemapindex>\n";
  fs.writeFileSync(path.join(OUT, "sitemap-0.xml"), urlset);
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), index);

  if (!IS_CI) {
    const sorted = Object.fromEntries(Object.keys(nextManifest).sort().map((k) => [k, nextManifest[k]]));
    fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
  }

  for (const w of warnings) console.warn("sitemap warning: " + w);
  console.log(`sitemap: ${entries.length} URLs written to out/sitemap-0.xml`);
  if (errors.length) {
    for (const e of errors) console.error("SEO check failed: " + e);
    process.exit(1);
  }
}

main();
