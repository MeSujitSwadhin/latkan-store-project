# THE LATKAN STORE — Digital Flagship

*The Latkan Atelier — every detail, a story.*

A Next.js (App Router) + TypeScript + Tailwind CSS v4 storefront with GSAP/ScrollTrigger motion and optional Lenis smooth scrolling.

---

## 1. Run it locally

Requires **Node.js 18.18+** (Node 20 or 22 LTS recommended).

```bash
cd C:\latkan-store
npm install          # install dependencies
npm run images       # download the licensed demo photographs (≈30 files, one time)
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Optional configuration: copy `.env.example` to `.env.local` and fill **only verified** values.

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Verified business WhatsApp number, digits only (e.g. `919xxxxxxxxx`). Empty → every WhatsApp button is hidden. | *(empty)* |
| `NEXT_PUBLIC_COMMERCE_MODE` | `whatsapp` (Mode A catalogue + enquiry) or `checkout` (Mode B). | `whatsapp` |
| `NEXT_PUBLIC_PREVIEW_MODE` | `true` shows unverified sections (sample catalogue, custom studio) with visible notices and keeps search engines out. Set `false` for launch. | `true` |
| `NEXT_PUBLIC_SITE_URL` | Public URL for metadata and sitemap. | `http://localhost:3000` |

Restart `npm run dev` after editing `.env.local`.

---

## 2. Verified vs placeholder content

Research on 30 Oct 2026: the Instagram profile could not be read (login wall / blocked from the build environment) and web searches found no official site, marketplace listing or directory entry. So:

| Item | Status | Where to change |
| --- | --- | --- |
| Brand name, Instagram URL/handle | **Verified** (from the brief) | `src/data/site.ts` |
| Product categories / collections | **Proposed** — labelled “Proposed” on tiles | `src/data/collections.ts` |
| Products | **Sample listings** — labelled “Sample listing”; no prices, no materials | `src/data/products.ts` |
| Prices | **Not shown** (“Price on request”) until verified | `price` field per product |
| Materials, handmade claims | **Not stated** | `materials`, `site.facts.handmade` |
| Customization offered | **Unconfirmed** — studio shown only in preview mode with a notice | `site.facts.offersCustomization` |
| WhatsApp / phone / email / location | **Not configured** — hidden everywhere | `.env.local`, `src/data/site.ts` |
| Shipping & returns policy | **Not published** — pages say so | `site.facts.shippingPolicy / returnsPolicy` |
| Instagram gallery | **No approved posts** — tiles say “Post awaiting approval” | `src/data/instagram.ts` |
| Photography | **Licensed stock (Unsplash License)** for illustration; credited on `/credits` | `src/data/assets.json` |
| Reviews / testimonials | **None** (none were invented) | — |

No fake phone numbers, prices, reviews, or order/payment confirmations exist anywhere in the code.

---

## 3. Replacing placeholder photos with real product photos

All imagery is driven by one manifest: **`src/data/assets.json`**.

1. Put the photo in the right folder, e.g. `public/images/products/gilded-drop-front.webp`
   (WebP or AVIF, ~2000px on the long edge is plenty — Next.js serves responsive sizes automatically).
2. Edit (or add) its entry in `assets.json`:
   ```json
   { "id": "p-gilded-front", "path": "/images/products/gilded-drop-front.webp",
     "photographer": "The Latkan Store", "description": "Gilded drop latkan, front",
     "alt": "Gold latkan with violet strands", "usage": "Product page",
     "status": "brand-approved", "licence": "Owned by The Latkan Store", "orientation": "portrait" }
   ```
   Remove `unsplashId` so the download script never overwrites it.
3. Reference the `id` from a product (`images: ["p-gilded-front", ...]`), collection or gallery entry.

Brand-approved images automatically drop the “Illustrative image” label. Any missing file renders as a clearly labelled placeholder instead of a broken image. `npm run images:check` lists missing files.

### Going live with real products
In `src/data/products.ts`: set `status: "verified"`, fill `price` (₹, number), `materials`, `availability`, and real image ids. When every listing is real, set `NEXT_PUBLIC_PREVIEW_MODE=false`.

---

## 4. Commerce modes

- **Mode A — WhatsApp catalogue (default).** Product pages offer “Enquire on WhatsApp” (only with a verified number) and an *Enquiry list* (`/cart`) that sends the whole list as one WhatsApp message. Nothing is ordered or charged online.
- **Mode B — Full checkout.** Set `NEXT_PUBLIC_COMMERCE_MODE=checkout` **and** integrate a payment provider (e.g. Razorpay/Stripe) server-side, then set `paymentProviderConfigured: true` in `site.ts`. Until then the site keeps behaving as Mode A — it never simulates a successful payment.

`POST /api/enquiry` validates and sanitizes input server-side, rate-limits per IP (5 / 10 min, in-memory), uses a honeypot field, and returns a WhatsApp deep link — or `503` when no number is configured. File uploads are deliberately not accepted (no storage backend); customers attach reference photos in the WhatsApp chat.

---

## 5. Architecture

```
src/
  app/                 routes (/, /collections, /collections/[slug], /products/[slug], /our-story,
                       /custom-orders, /gallery, /contact, /cart, /wishlist, /privacy, /terms,
                       /shipping-returns, /credits, api/enquiry)
  components/
    animation/         Preloader, HangingLatkan, Lines, RevealObserver, SmoothScroll, Cursor
    editorial/         Hero, Manifesto, Showroom, CraftStory, CampaignGallery, Lightbox, Photo …
    collections/       CollectionIndex, CollectionTile
    products/          ProductCard, QuickView, ProductGallery, ProductPurchase, ProductBrowser …
    forms/             CustomStudio, ContactForm, useEnquiry
    layout/ navigation/
  data/                site.ts (config), collections.ts, products.ts, gallery.ts, instagram.ts, assets.json
  hooks/ lib/ styles/ types/
public/images/{hero,collections,products,craft,editorial}
scripts/fetch-images.mjs
```

**Design tokens** live in `src/styles/globals.css` (`@theme`): Pearl Ivory `#F5F0E8`, Royal Wine `#5A1829`, Antique Gold `#C5A478`, Ink Brown `#29211F`, Dusty Rose `#D9B7B5`; Cormorant Garamond (display), Bodoni Moda (wordmark/numerals), Manrope (body); a fluid type scale `--step--1 … --step-6`.

**Motion system**
- One IntersectionObserver drives every `[data-reveal]` (fade-rise, image-mask, line-by-line headings, thread drawing).
- GSAP ScrollTrigger handles scrubbed parallax, the manifesto text reveal and the Couture Showroom timeline (sticky section driven by native scroll — no scroll-jacking, with a “skip to the featured piece” link).
- Lenis runs only on fine-pointer devices, driven by the GSAP ticker (single loop).
- The hanging latkan is an abstract SVG with a damped double-pendulum (pointer + scroll velocity, ±9° clamp, paused off-screen).
- `prefers-reduced-motion`: motion classes are never enabled, the preloader is skipped, Lenis/GSAP effects don’t initialise, and the showroom renders as stacked frames. Content is fully visible without JavaScript.

---

## 6. Image credits
All demo photographs are from Unsplash under the Unsplash License; photographer names and source links are in `src/data/assets.json` and on `/credits`.
