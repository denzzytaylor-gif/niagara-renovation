// Generates the optimized, responsive image variants served by the site from the
// original source files in public/images. Re-run after adding or replacing a source image:
//   node scripts/optimize-images.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "..", "public", "images");
const GALLERY_OUT = path.join(SRC, "gallery");
const APP_DIR = path.join(__dirname, "..", "app");

// Homepage "Our Recent Projects" gallery: card is ~400px wide on desktop, ~50vw on mobile.
const GALLERY = {
  "bathroom remodeling services.png": "bathroom-remodeling-services",
  "bathroom remodeling.png": "bathroom-remodeling",
  "contractor-update.png": "contractor-update",
  "contractors.png": "contractors",
  "general contractor.png": "general-contractor",
  "general contractors.png": "general-contractors",
  "house-remodel.png": "house-remodel",
  "laundry room remodeling.png": "laundry-room-remodeling",
  "living room remodeling.png": "living-room-remodeling",
  "tv room contracting.png": "tv-room-contracting",
};
const GALLERY_WIDTHS = [480, 960];

async function main() {
  fs.mkdirSync(GALLERY_OUT, { recursive: true });
  for (const [file, slug] of Object.entries(GALLERY)) {
    const { width: srcWidth } = await sharp(path.join(SRC, file)).metadata();
    for (const w of GALLERY_WIDTHS) {
      if (w > srcWidth) continue; // never upscale; HomePageClient lists only the widths that exist
      const out = path.join(GALLERY_OUT, `${slug}-${w}.webp`);
      // WebP keeps the alpha channel for transparent sources (contractor-update.png).
      await sharp(path.join(SRC, file)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78, alphaQuality: 90, effort: 6 }).toFile(out);
    }
  }

  // Logo: displayed at 40px tall in the header; square, opaque (white background).
  const logo = path.join(SRC, "Niagara Renovation Company.png");
  for (const size of [80, 120]) {
    await sharp(logo).resize(size, size).webp({ quality: 90, effort: 6 }).toFile(path.join(SRC, `logo-${size}.webp`));
  }
  // PNG variants for icons and the Organization schema logo (Google requires raster >= 112px).
  await sharp(logo).resize(512, 512).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(path.join(SRC, "logo-512.png"));
  await sharp(logo).resize(180, 180).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(path.join(SRC, "logo-180.png"));
  await sharp(logo).resize(192, 192).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(path.join(APP_DIR, "icon.png"));

  for (const f of fs.readdirSync(GALLERY_OUT).sort()) console.log(`gallery/${f}`, fs.statSync(path.join(GALLERY_OUT, f)).size);
  for (const f of ["logo-80.webp", "logo-120.webp", "logo-512.png", "logo-180.png"]) console.log(f, fs.statSync(path.join(SRC, f)).size);
  console.log("app/icon.png", fs.statSync(path.join(APP_DIR, "icon.png")).size);
}

main().catch((e) => { console.error(e); process.exit(1); });
