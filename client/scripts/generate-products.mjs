// Generates src/data/dummyProducts.ts from scripts/product-catalog.csv.
//
// The source folder only contains ONE real photo per product (the front/back/
// original filenames are byte-identical duplicates). To give each product card
// 4-5 distinct, relevant photos, every product shows its OWN colorway first and
// then its sibling colorways from the same category (a color-switcher gallery).
//
// For each CSV row it:
//   - parses price / sizes
//   - finds the product's own image (descriptive slug
//     <gender>-<type>-<name-slug>.jpg, falling back to image_filename)
//   - builds images = [own colorway, ...sibling colorways in same category] (max 5)
//   - splits the description blob into HIGHLIGHTS / FIT SUGGESTION /
//     MATERIALS AND WASHING DIRECTIONS / DESCRIPTION sections
//
// Re-run after editing the CSV:  node scripts/generate-products.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, "product-catalog.csv");
const IMAGES_DIR = path.join(__dirname, "..", "public", "images");
const OUT_PATH = path.join(__dirname, "..", "src", "data", "dummyProducts.ts");
const MAX_IMAGES = 5;

// --- CSV parsing (handles quoted fields, commas in quotes, "" escapes, BOM) ---
function parseCSV(text) {
  text = text.replace(/^﻿/, "");
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field); field = "";
    } else if (c === "\r") {
      // ignore
    } else if (c === "\n") {
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

// --- helpers ---
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const genderSlug = (g) => (g.trim().toLowerCase() === "women" ? "womens" : "mens");
const typeSlug = (category) => {
  const base = category.replace(/\(.*?\)/g, "").trim().toLowerCase(); // "Shirts (Men)" -> "shirts"
  return base.endsWith("s") ? base.slice(0, -1) : base; // "shirts" -> "shirt"
};
const colorFromName = (name) => (name.includes(" - ") ? name.split(" - ").pop().trim() : name);
const webPath = (filename) => ("/images/" + filename).replace(/ /g, "%20");

function parseDescription(blob) {
  const get = (start, end) => {
    const si = blob.indexOf(start);
    if (si === -1) return undefined;
    const from = si + start.length;
    const ei = end ? blob.indexOf(end, from) : -1;
    const text = (ei === -1 ? blob.slice(from) : blob.slice(from, ei)).trim();
    return text || undefined;
  };
  const out = {
    highlights: get("HIGHLIGHTS", "FIT SUGGESTION"),
    fitSuggestion: get("FIT SUGGESTION", "MATERIALS AND WASHING DIRECTIONS"),
    materials: get("MATERIALS AND WASHING DIRECTIONS", "DESCRIPTION"),
    description: get("DESCRIPTION", null),
  };
  return Object.values(out).some((v) => v) ? out : undefined;
}

// --- main ---
const rows = parseCSV(fs.readFileSync(CSV_PATH, "utf8"));
const header = rows[0].map((h) => h.trim());
const col = (r, name) => r[header.indexOf(name)] ?? "";

const available = new Set(fs.readdirSync(IMAGES_DIR));
const warnings = [];

// Pass 1: one representative photo per product (its own colorway)
const items = rows.slice(1).filter((r) => r.length > 1 && col(r, "id")).map((r) => {
  const id = col(r, "id").trim();
  const name = col(r, "name").trim();
  const category = col(r, "category").trim();
  const gender = col(r, "gender").trim();
  const type = col(r, "type").trim();
  const price = parseFloat(col(r, "price").replace(/[^0-9.]/g, "")) || 0;
  const sizes = col(r, "sizes").split(",").map((s) => s.trim()).filter(Boolean).map((nm) => ({ name: nm }));
  const details = parseDescription(col(r, "description"));
  const color = colorFromName(name);

  const base = `${genderSlug(gender)}-${typeSlug(category)}-${slug(name)}`;
  let file = `${base}.jpg`;
  if (!available.has(file)) {
    const fallback = col(r, "image_filename").trim();
    file = available.has(fallback) ? fallback : file;
    warnings.push(`#${id} "${name}": descriptive image not found (slug "${base}"), using "${file}"`);
  }
  return { id, name, category, gender, type, price, sizes, details, color, image: webPath(file) };
});

// Build category -> [{color, image, id}] gallery pool (catalog order)
const pool = new Map();
for (const it of items) {
  if (!pool.has(it.category)) pool.set(it.category, []);
  pool.get(it.category).push({ color: it.color, image: it.image, id: it.id });
}

// Pass 2: own colorway first, then sibling colorways from the same category
const products = items.map((it) => {
  const siblings = pool.get(it.category) || [];
  const images = [
    { color: it.color, image: it.image },
    ...siblings.filter((s) => s.id !== it.id).map((s) => ({ color: s.color, image: s.image })),
  ].slice(0, MAX_IMAGES);
  return {
    id: it.id,
    productName: it.name,
    price: it.price,
    category: it.category,
    gender: it.gender,
    type: it.type,
    sizes: it.sizes,
    details: it.details,
    images,
  };
});

const banner = "// AUTO-GENERATED from scripts/product-catalog.csv by scripts/generate-products.mjs\n" +
  "// Do not edit by hand — re-run: node scripts/generate-products.mjs\n";
const body = `import Product from "@/Interfaces/Product";\n\nexport const dummyProducts: Product[] = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync(OUT_PATH, banner + body, "utf8");

// report
console.log(`Wrote ${products.length} products -> ${path.relative(process.cwd(), OUT_PATH)}`);
console.log(`Images per product: ${products.map((p) => p.images.length).join(", ")}`);
console.log(`Colors per product: ${products.map((p) => new Set(p.images.map((i) => i.color)).size).join(", ")}`);
console.log(warnings.length ? `Warnings:\n  ${warnings.join("\n  ")}` : "No image warnings — every product matched its descriptive photo.");
