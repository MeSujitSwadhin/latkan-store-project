#!/usr/bin/env node
/**
 * Downloads the licensed stock photographs listed in src/data/assets.json
 * from Unsplash (Unsplash License) and stores optimized WebP files in /public/images.
 *
 *   npm run images          → download any missing image
 *   npm run images -- --force → re-download everything
 *   npm run images:check    → only report which images exist / are missing
 *
 * Brand-approved photos (status "brand-approved", no unsplashId) are never touched.
 */
import { readFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "src/data/assets.json"), "utf8"));
const args = new Set(process.argv.slice(2));
const CHECK = args.has("--check");
const FORCE = args.has("--force");
const MAX_EDGE = 2000;

const exists = async (p) => {
  try {
    return (await stat(p)).size > 0;
  } catch {
    return false;
  }
};

let sharp = null;
if (!CHECK) {
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("! sharp is not installed — images will be saved unoptimized. Run `npm install` first.");
  }
}

async function download(id, remote) {
  const urls = [
    remote && `${remote}?fm=jpg&q=85&w=${MAX_EDGE}`,
    `https://unsplash.com/photos/${id}/download?force=true`,
  ].filter(Boolean);
  let lastErr;
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": "TheLatkanStore-asset-fetch/1.0 (+site build script)" },
      });
      const type = res.headers.get("content-type") || "";
      if (!res.ok || !type.startsWith("image/")) {
        lastErr = new Error(`HTTP ${res.status} (${type || "no content-type"})`);
        continue;
      }
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error("unknown error");
}

let ok = 0;
let missing = 0;
let failed = 0;
const queue = manifest.assets.filter((a) => a.path);

async function worker() {
  while (queue.length) {
    const asset = queue.shift();
    const out = path.join(root, "public", asset.path);
    const has = await exists(out);
    if (CHECK) {
      if (has) ok++;
      else {
        missing++;
        console.log(`  missing  ${asset.path}`);
      }
      continue;
    }
    if (has && !FORCE) {
      ok++;
      continue;
    }
    if (!asset.unsplashId && !asset.remote) {
      missing++;
      console.log(`  skip     ${asset.path} (no download source — supply this file manually)`);
      continue;
    }
    try {
      const raw = await download(asset.unsplashId, asset.remote);
      await mkdir(path.dirname(out), { recursive: true });
      const data = sharp
        ? await sharp(raw)
            .rotate()
            .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
            .webp({ quality: 78, effort: 5 })
            .toBuffer()
        : raw;
      await writeFile(out, data);
      ok++;
      console.log(`  ✓ saved  ${asset.path}  (${Math.round(data.length / 1024)} KB, © ${asset.photographer} / Unsplash)`);
    } catch (e) {
      failed++;
      console.log(`  ✗ failed ${asset.path}: ${e.message}`);
    }
  }
}

console.log(CHECK ? "Checking images…" : "Fetching licensed images (Unsplash License)…");
await Promise.all(Array.from({ length: 4 }, worker));
// Register which assets now exist locally, so the site serves them instead of the CDN fallback.
const present = [];
for (const a of manifest.assets) if (a.path && (await exists(path.join(root, "public", a.path)))) present.push(a.id);
await writeFile(path.join(root, "src/data/local-images.json"), JSON.stringify(present, null, 2) + "\n");

console.log(`\nDone. ${ok} ready, ${missing} missing, ${failed} failed.`);
if (failed) {
  console.log("Failed images fall back to the Unsplash CDN originals in the site. Re-run `npm run images` later.");
}
