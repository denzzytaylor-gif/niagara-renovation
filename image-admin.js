/**
 * Niagara Renovation Company — Image Admin Dashboard
 * Run: node image-admin.js
 * Then open: http://localhost:3001
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const IMAGES_PATH = path.join(__dirname, "lib", "images.json");
const PROJECT_DIR = __dirname;
const PORT = 3001;

const SECTION_LABELS = {
  services: "Service Page Images",
  home: "Home Page",
  about: "About Page",
  blog: "Blog",
  contact: "Contact Page",
  services_page: "Services Page",
  city_pages: "City Pages",
};

const KEY_LABELS = {
  // services
  "services.kitchen-renovations": "Kitchen Renovations",
  "services.bathroom-renovations": "Bathroom Renovations",
  "services.basement-finishing": "Basement Finishing",
  "services.home-additions": "Home Additions",
  "services.roofing": "Roofing",
  "services.flooring": "Flooring",
  "services.painting": "Painting",
  "services.windows-and-doors": "Windows & Doors",
  "services.general-contracting": "General Contracting",
  "services.additions-adu": "Additions & ADU",
  "services.decks-outdoor": "Decks & Outdoor Living",
  "services.commercial-renovations": "Commercial Renovations",
  // home
  "home.hero": "Hero Background",
  "home.about_main": "About Section — Main Photo",
  "home.about_small": "About Section — Small Floating Photo",
  "home.services_section": "Services Section Heading",
  "home.why_us_section": "Why Choose Us Section Heading",
  "home.cities_section": "Cities Section Heading",
  "home.testimonials_section": "Testimonials Section Heading",
  "home.gallery_section": "Gallery Section Heading",
  "home.faq_section": "FAQ Section Heading",
  "home.portfolio_kitchen": "Portfolio — Kitchen Renovation",
  "home.portfolio_bathroom": "Portfolio — Bathroom Remodel",
  "home.portfolio_basement": "Portfolio — Basement Finish",
  "home.portfolio_addition": "Portfolio — Home Addition",
  "home.portfolio_roofing": "Portfolio — Roofing",
  "home.portfolio_flooring": "Portfolio — Flooring",
  // about
  "about.hero": "About Page Hero",
  "about.our_story": "Our Story Section",
  "about.why_local": "Why Local Section",
  "about.credentials": "Credentials Section",
  "about.core_values": "Core Values Section",
  "about.service_area": "Service Area Section",
  "about.contact_cta": "Contact CTA Section",
  // blog
  "blog.page_header": "Blog Page Header",
  "blog.post_choose_contractor": "Post: How to Choose a Contractor",
  "blog.post_permits": "Post: Renovation Permits Guide",
  "blog.post_resale_value": "Post: Best Renovations for Resale Value",
  "blog.post_kitchen_timeline": "Post: Kitchen Renovation Timeline",
  "blog.post_energy_efficient": "Post: Energy-Efficient Renovations",
  "blog.post_bathroom_checklist": "Post: Bathroom Renovation Checklist",
  "blog.post_kitchen_cost": "Post: Kitchen Renovation Cost 2024",
  "blog.post_bathroom_trends": "Post: Bathroom Renovation Trends 2024",
  "blog.post_basement_guide": "Post: Basement Finishing Guide",
  // contact
  "contact.hero": "Contact Page Hero",
  "contact.get_in_touch": "Get In Touch Section",
  "contact.map_background": "Map Background",
  // services_page
  "services_page.hero": "Services Page Hero",
  "services_page.all_services": "All Services Section",
  "services_page.how_it_works": "Service Detail — How It Works Section",
  // city_pages
  "city_pages.why_choose": "City Pages — Why Choose Section",
  "city_pages.cta": "City Pages — CTA Section",
};

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Image Dashboard — Niagara Renovation Company</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --red: #dc2626; --red-dark: #b91c1c; }
    body { background: #0a0a0a; color: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; min-height: 100vh; }

    /* Header */
    .header {
      position: sticky; top: 0; z-index: 100;
      background: #111; border-bottom: 2px solid #222;
      padding: 1rem 2rem;
      display: flex; align-items: center; gap: 1rem;
    }
    .header-title { flex: 1; }
    .header-title small { display: block; font-size: 0.7rem; color: #555; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.2rem; }
    .header-title h1 { font-size: 1.25rem; font-weight: 900; }

    /* Buttons */
    .btn {
      padding: 0.6rem 1.4rem; border-radius: 8px;
      font-weight: 700; font-size: 0.875rem;
      cursor: pointer; border: none; transition: all 0.15s;
      white-space: nowrap;
    }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .btn-save { background: var(--red); color: #fff; }
    .btn-save:hover:not(:disabled) { background: var(--red-dark); }
    .btn-deploy { background: #1a1a1a; color: #fff; border: 1px solid #444; }
    .btn-deploy:hover:not(:disabled) { border-color: #666; background: #222; }

    /* Status */
    .status {
      padding: 0.45rem 0.9rem; border-radius: 6px;
      font-size: 0.8rem; font-weight: 600;
      transition: all 0.2s;
    }
    .status:empty { display: none; }
    .status.loading { background: #1c1c1c; color: #aaa; }
    .status.success { background: #052e16; color: #4ade80; border: 1px solid #166534; }
    .status.error { background: #450a0a; color: #f87171; border: 1px solid #7f1d1d; }

    /* Main */
    main { max-width: 1400px; margin: 0 auto; padding: 2rem; }

    /* Section */
    .section { margin-bottom: 3rem; }
    .section-title {
      font-size: 1.1rem; font-weight: 900; color: #fff;
      margin-bottom: 1.25rem;
      display: flex; align-items: center; gap: 0.75rem;
    }
    .section-title::before {
      content: ''; display: block;
      width: 4px; height: 1.25rem; background: var(--red); border-radius: 2px;
    }
    .section-count {
      font-size: 0.7rem; font-weight: 600; color: #555;
      background: #1a1a1a; border-radius: 4px; padding: 0.15rem 0.5rem;
    }

    /* Grid */
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 1rem; }

    /* Card */
    .card { background: #111; border: 1px solid #1f1f1f; border-radius: 12px; overflow: hidden; transition: border-color 0.15s; }
    .card:hover { border-color: #333; }
    .card-preview-wrap { position: relative; width: 100%; height: 170px; background: #1a1a1a; overflow: hidden; }
    .card-preview { width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity 0.2s; }
    .card-preview.loading { opacity: 0.4; }
    .card-preview-error { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #444; font-size: 0.75rem; }
    .card-body { padding: 0.875rem; }
    .card-section { font-size: 0.65rem; font-weight: 700; color: var(--red); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
    .card-name { font-size: 0.85rem; font-weight: 700; color: #e5e5e5; margin-bottom: 0.65rem; line-height: 1.3; }
    .card-input {
      width: 100%; background: #0a0a0a; border: 1px solid #2a2a2a; color: #ccc;
      padding: 0.5rem 0.6rem; border-radius: 6px; font-size: 0.72rem;
      font-family: "Courier New", monospace;
      transition: border-color 0.15s; resize: none;
    }
    .card-input:focus { outline: none; border-color: var(--red); color: #fff; }
    .card-input.changed { border-color: #ca8a04; }
    .card-actions { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
    .btn-upload {
      flex: 1; padding: 0.4rem 0.6rem; border-radius: 6px;
      background: #1a1a1a; border: 1px dashed #444; color: #aaa;
      font-size: 0.72rem; font-weight: 600; cursor: pointer;
      text-align: center; transition: all 0.15s;
    }
    .btn-upload:hover { border-color: var(--red); color: #fff; background: #1f1111; }
    .btn-upload input[type=file] { display: none; }

    /* Deploy output modal */
    .modal-overlay {
      display: none; position: fixed; inset: 0;
      background: rgba(0,0,0,0.85); z-index: 200;
      align-items: center; justify-content: center;
    }
    .modal-overlay.open { display: flex; }
    .modal { background: #111; border: 1px solid #333; border-radius: 12px; width: 700px; max-width: 90vw; max-height: 80vh; overflow: hidden; display: flex; flex-direction: column; }
    .modal-header { padding: 1rem 1.25rem; border-bottom: 1px solid #222; display: flex; align-items: center; justify-content: space-between; }
    .modal-header h2 { font-size: 1rem; font-weight: 700; }
    .modal-close { background: none; border: none; color: #666; font-size: 1.25rem; cursor: pointer; padding: 0.25rem; }
    .modal-close:hover { color: #fff; }
    .modal-body { padding: 1rem 1.25rem; overflow-y: auto; flex: 1; }
    .modal-output { font-family: "Courier New", monospace; font-size: 0.75rem; color: #4ade80; white-space: pre-wrap; line-height: 1.6; }
    .modal-output.error { color: #f87171; }
  </style>
</head>
<body>

<div class="header">
  <div class="header-title">
    <small>Niagara Renovation Company</small>
    <h1>Image Dashboard</h1>
  </div>
  <div id="status" class="status"></div>
  <button class="btn btn-save" id="btn-save" onclick="saveAll()">Save All Changes</button>
  <button class="btn btn-deploy" id="btn-deploy" onclick="deploy()">Deploy to Vercel</button>
</div>

<main id="app">
  <div style="text-align:center;padding:4rem;color:#444;">Loading images...</div>
</main>

<div class="modal-overlay" id="modal">
  <div class="modal">
    <div class="modal-header">
      <h2 id="modal-title">Deploy Output</h2>
      <button class="modal-close" onclick="closeModal()">&#x2715;</button>
    </div>
    <div class="modal-body">
      <pre class="modal-output" id="modal-output"></pre>
    </div>
  </div>
</div>

<script>
  const KEY_LABELS = ${JSON.stringify(KEY_LABELS, null, 2)};
  const SECTION_LABELS = ${JSON.stringify(SECTION_LABELS, null, 2)};

  let imagesData = {};
  let changedKeys = new Set();

  async function loadImages() {
    try {
      const res = await fetch("/api/images");
      imagesData = await res.json();
      renderApp();
    } catch (e) {
      document.getElementById("app").innerHTML =
        '<div style="text-align:center;padding:4rem;color:#f87171;">Failed to load images. Is the server running?</div>';
    }
  }

  function renderApp() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    for (const [sectionKey, sectionImages] of Object.entries(imagesData)) {
      const section = document.createElement("div");
      section.className = "section";

      const keys = Object.keys(sectionImages);
      section.innerHTML =
        '<div class="section-title">' +
        (SECTION_LABELS[sectionKey] || sectionKey) +
        '<span class="section-count">' + keys.length + ' images</span>' +
        "</div>";

      const grid = document.createElement("div");
      grid.className = "grid";

      for (const [imgKey, imgUrl] of Object.entries(sectionImages)) {
        const fullKey = sectionKey + "." + imgKey;
        const label = KEY_LABELS[fullKey] || imgKey.replace(/_/g, " ");
        const cardId = "card-" + fullKey.replace(/[^a-z0-9]/gi, "_");
        const previewId = "preview-" + fullKey.replace(/[^a-z0-9]/gi, "_");
        const inputId = "input-" + fullKey.replace(/[^a-z0-9]/gi, "_");

        const card = document.createElement("div");
        card.className = "card";
        card.id = cardId;
        card.innerHTML =
          '<div class="card-preview-wrap">' +
          '<img class="card-preview" id="' + previewId + '" src="' + imgUrl + '" alt="" />' +
          '<div class="card-preview-error" style="display:none">No preview</div>' +
          "</div>" +
          '<div class="card-body">' +
          '<div class="card-section">' + sectionKey + "</div>" +
          '<div class="card-name">' + label + "</div>" +
          '<textarea class="card-input" id="' + inputId + '" rows="2" ' +
          'data-section="' + sectionKey + '" data-key="' + imgKey + '" ' +
          'data-original="' + imgUrl.replace(/"/g, "&quot;") + '">' +
          imgUrl + "</textarea>" +
          '<div class="card-actions">' +
          '<label class="btn-upload">' +
          '&#8679; Upload Image' +
          '<input type="file" accept="image/*" ' +
          'data-section="' + sectionKey + '" data-key="' + imgKey + '" ' +
          'onchange="uploadImage(this)" />' +
          "</label>" +
          "</div>" +
          "</div>";

        grid.appendChild(card);
      }

      section.appendChild(grid);
      app.appendChild(section);
    }

    // Attach events after render
    document.querySelectorAll(".card-input").forEach(input => {
      let timer;
      input.addEventListener("input", function () {
        const fullKey = this.dataset.section + "." + this.dataset.key;
        const previewId = "preview-" + fullKey.replace(/[^a-z0-9]/gi, "_");
        const isChanged = this.value.trim() !== this.dataset.original;
        this.classList.toggle("changed", isChanged);
        if (isChanged) changedKeys.add(fullKey);
        else changedKeys.delete(fullKey);

        imagesData[this.dataset.section][this.dataset.key] = this.value.trim();

        clearTimeout(timer);
        timer = setTimeout(() => {
          const preview = document.getElementById(previewId);
          if (preview && this.value.trim()) {
            preview.classList.add("loading");
            const newSrc = this.value.trim();
            const tempImg = new Image();
            tempImg.onload = () => {
              preview.src = newSrc;
              preview.classList.remove("loading");
            };
            tempImg.onerror = () => {
              preview.classList.remove("loading");
            };
            tempImg.src = newSrc;
          }
        }, 700);
      });
    });
  }

  function uploadImage(input) {
    const file = input.files[0];
    if (!file) return;
    const sectionKey = input.dataset.section;
    const imgKey = input.dataset.key;
    const fullKey = sectionKey + "." + imgKey;
    const inputId = "input-" + fullKey.replace(/[^a-z0-9]/gi, "_");
    const previewId = "preview-" + fullKey.replace(/[^a-z0-9]/gi, "_");

    setStatus("Uploading " + file.name + "...", "loading");

    const reader = new FileReader();
    reader.onload = async function(e) {
      const base64 = e.target.result.split(",")[1];
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: fullKey, filename: file.name, data: base64 }),
        });
        const data = await res.json();
        if (data.success) {
          imagesData[sectionKey][imgKey] = data.url;
          const inputEl = document.getElementById(inputId);
          const previewEl = document.getElementById(previewId);
          if (inputEl) { inputEl.value = data.url; inputEl.classList.add("changed"); }
          if (previewEl) { previewEl.src = data.url + "?t=" + Date.now(); }
          setStatus("Uploaded! Click Save All to apply.", "success");
        } else {
          setStatus("Upload failed: " + data.error, "error");
        }
      } catch (e) {
        setStatus("Upload failed: " + e.message, "error");
      }
    };
    reader.readAsDataURL(file);
  }

  function setStatus(msg, type) {
    const el = document.getElementById("status");
    el.textContent = msg;
    el.className = "status " + (type || "loading");
    if (type === "success") setTimeout(() => { el.textContent = ""; el.className = "status"; }, 4000);
  }

  async function saveAll() {
    const btn = document.getElementById("btn-save");
    btn.disabled = true;
    setStatus("Saving...", "loading");
    try {
      const res = await fetch("/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imagesData, null, 2),
      });
      const data = await res.json();
      if (data.success) {
        changedKeys.clear();
        document.querySelectorAll(".card-input").forEach(el => {
          el.classList.remove("changed");
          el.dataset.original = el.value.trim();
        });
        setStatus("Saved!", "success");
      } else {
        setStatus("Save failed: " + data.error, "error");
      }
    } catch (e) {
      setStatus("Save failed: " + e.message, "error");
    }
    btn.disabled = false;
  }

  async function deploy() {
    if (!confirm("Deploy to Vercel now?\\n\\nMake sure you have saved your changes first.")) return;
    const btn = document.getElementById("btn-deploy");
    btn.disabled = true;
    setStatus("Deploying... (2-5 min)", "loading");

    document.getElementById("modal-title").textContent = "Deploying to Vercel...";
    document.getElementById("modal-output").textContent = "Running: vercel --prod\\n\\nPlease wait...";
    document.getElementById("modal-output").className = "modal-output";
    document.getElementById("modal").classList.add("open");

    try {
      const res = await fetch("/api/deploy", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setStatus("Deployed!", "success");
        document.getElementById("modal-title").textContent = "Deploy Successful";
        document.getElementById("modal-output").textContent = data.output;
      } else {
        setStatus("Deploy failed", "error");
        document.getElementById("modal-title").textContent = "Deploy Failed";
        document.getElementById("modal-output").textContent = data.output;
        document.getElementById("modal-output").className = "modal-output error";
      }
    } catch (e) {
      setStatus("Deploy error: " + e.message, "error");
      document.getElementById("modal-output").textContent = e.message;
      document.getElementById("modal-output").className = "modal-output error";
    }
    btn.disabled = false;
  }

  function closeModal() {
    document.getElementById("modal").classList.remove("open");
  }

  loadImages();
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(HTML);
    return;
  }

  if (req.method === "GET" && req.url === "/api/images") {
    try {
      const data = fs.readFileSync(IMAGES_PATH, "utf-8");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } catch (e) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  if (req.method === "POST" && req.url === "/api/images") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync(IMAGES_PATH, JSON.stringify(parsed, null, 2));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/upload") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { filename, data } = JSON.parse(body);
        const imagesDir = path.join(PROJECT_DIR, "public", "images");
        if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
        const safeFilename = Date.now() + "_" + filename.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filepath = path.join(imagesDir, safeFilename);
        fs.writeFileSync(filepath, Buffer.from(data, "base64"));
        const url = "/images/" + safeFilename;
        console.log("Uploaded:", url);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, url }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/deploy") {
    res.writeHead(200, { "Content-Type": "application/json" });
    console.log("Starting Vercel deploy...");
    exec("vercel --prod", { cwd: PROJECT_DIR, timeout: 300000 }, (err, stdout, stderr) => {
      if (err) {
        console.error("Deploy failed:", stderr || err.message);
        res.end(JSON.stringify({ success: false, output: stderr || err.message }));
      } else {
        console.log("Deploy successful.");
        res.end(JSON.stringify({ success: true, output: stdout }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log("");
  console.log("  Niagara Renovation Company — Image Admin Dashboard");
  console.log("  ====================================================");
  console.log("  Open: http://localhost:" + PORT);
  console.log("");
  console.log("  Requirements: vercel CLI must be installed globally");
  console.log("  Install: npm i -g vercel");
  console.log("");
});
