import type { Product, ProductVariant } from "@/types";

/**
 * SAMPLE CATALOGUE — status: "sample".
 * ---------------------------------------------------------------
 * These listings exist to demonstrate the shopping experience. They are NOT
 * real inventory: names are descriptive placeholders, prices are null
 * ("Price on request"), materials are null (unconfirmed), and every photo is a
 * licensed stock image used for illustration only.
 *
 * To add real products: copy an entry, set status: "verified", fill price /
 * materials / availability from the business, and point `images` at
 * brand-approved asset ids in src/data/assets.json.
 */

const c = (id: string, label: string, swatch: string): ProductVariant => ({ id, label, swatch });

const PALETTE = {
  gold: c("gold", "Antique Gold", "#C5A478"),
  wine: c("wine", "Royal Wine", "#5A1829"),
  rose: c("rose", "Dusty Rose", "#D9B7B5"),
  ivory: c("ivory", "Pearl Ivory", "#EFE6D6"),
  emerald: c("emerald", "Emerald", "#2F5D50"),
  violet: c("violet", "Violet", "#5B3A6B"),
  multi: c("multi", "Multicolour", "conic-gradient(#C5A478,#5A1829,#D9B7B5,#2F5D50,#C5A478)"),
};

const size = (id: string, label: string): ProductVariant => ({ id, label });
const PAIR_SIZES = [size("pair", "Pair"), size("set-4", "Set of 4")];

export const products: Product[] = [
  {
    slug: "sample-gilded-drop-latkan",
    name: "The Gilded Drop",
    collection: "bridal-latkans",
    price: null,
    shortDescription: "A bridal statement drop in gold and violet tones.",
    description:
      "A sculpted head and long, fluid strands — the kind of statement latkan that finishes a bridal dupatta or lehenga dori. Listing shown as a sample: final design, sizes and materials to be confirmed by The Latkan Store.",
    materials: null,
    colours: [PALETTE.gold, PALETTE.violet, PALETTE.wine],
    sizes: PAIR_SIZES,
    availability: "unknown",
    images: ["p-gold-violet", "p-golden"],
    status: "sample",
    featured: true,
  },
  {
    slug: "sample-corded-heirloom-tassel",
    name: "The Heirloom Cord",
    collection: "bridal-latkans",
    price: null,
    shortDescription: "Twisted cord with a weighted, layered tassel.",
    description:
      "Twisted cord leading into a full, weighted tassel — a classic silhouette with a sense of ceremony. Sample listing for demonstration.",
    materials: null,
    colours: [PALETTE.gold, PALETTE.ivory],
    sizes: PAIR_SIZES,
    availability: "unknown",
    images: ["p-tieback", "tx-satin"],
    status: "sample",
    featured: true,
  },
  {
    slug: "sample-blush-swing-latkan",
    name: "The Blush Swing",
    collection: "blouse-latkans",
    price: null,
    shortDescription: "Soft blush tassels for a blouse dori.",
    description:
      "Light, soft tassels in blush tones made for the back of a blouse — the detail that moves when you do. Sample listing for demonstration.",
    materials: null,
    colours: [PALETTE.rose, PALETTE.ivory, PALETTE.wine],
    sizes: PAIR_SIZES,
    availability: "unknown",
    images: ["p-pink", "tx-pink"],
    status: "sample",
    featured: true,
  },
  {
    slug: "sample-golden-finial",
    name: "The Golden Finial",
    collection: "blouse-latkans",
    price: null,
    shortDescription: "A single golden tassel, compact and polished.",
    description:
      "A compact golden tassel with a tidy finial — understated enough for everyday kurtas, polished enough for occasion wear. Sample listing.",
    materials: null,
    colours: [PALETTE.gold, PALETTE.wine],
    sizes: [size("single", "Single"), ...PAIR_SIZES],
    availability: "unknown",
    images: ["p-golden", "tx-red"],
    status: "sample",
  },
  {
    slug: "sample-beaded-cascade",
    name: "The Beaded Cascade",
    collection: "lehenga-accents",
    price: null,
    shortDescription: "Beaded strands with gold and teal accents.",
    description:
      "Strands of beads falling in a cascade, finished with gold accents — designed to echo embroidery on a lehenga. Sample listing.",
    materials: null,
    colours: [PALETTE.emerald, PALETTE.gold],
    sizes: PAIR_SIZES,
    availability: "unknown",
    images: ["p-beaded", "p-beads"],
    status: "sample",
    featured: true,
  },
  {
    slug: "sample-petal-chain",
    name: "The Petal Chain",
    collection: "lehenga-accents",
    price: null,
    shortDescription: "Chain-like strands for a light, airy hem accent.",
    description:
      "Delicate chain-like strands with a floral rhythm — a lighter accent for lehenga drawstrings. Sample listing.",
    materials: null,
    colours: [PALETTE.rose, PALETTE.gold],
    sizes: PAIR_SIZES,
    availability: "unknown",
    images: ["p-chain", "tx-silk"],
    status: "sample",
  },
  {
    slug: "sample-mela-colour-tassels",
    name: "The Mela Set",
    collection: "festive-details",
    price: null,
    shortDescription: "A playful, multicolour festive set.",
    description:
      "A cheerful multicolour set for festive dressing — mix across outfits or wear the whole palette at once. Sample listing.",
    materials: null,
    colours: [PALETTE.multi],
    sizes: [size("set-4", "Set of 4"), size("set-6", "Set of 6")],
    availability: "unknown",
    images: ["p-colour", "p-bead-box"],
    status: "sample",
    featured: true,
  },
  {
    slug: "sample-bead-studio-edit",
    name: "The Studio Edit",
    collection: "custom-creations",
    price: null,
    shortDescription: "Bead palette for a custom-matched piece.",
    description:
      "An illustration of a custom brief: beads, threads and colours selected around one outfit. Customization is not yet confirmed by the business. Sample listing.",
    materials: null,
    colours: [PALETTE.multi, PALETTE.gold],
    sizes: [size("bespoke", "Bespoke")],
    availability: "unknown",
    images: ["p-bead-box", "cr-gold-thread"],
    status: "sample",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (collection: string) => products.filter((p) => p.collection === collection);
export const featuredProducts = () => products.filter((p) => p.featured);
export const relatedProducts = (p: Product, n = 3) =>
  [...products.filter((x) => x.slug !== p.slug && x.collection === p.collection), ...products.filter((x) => x.collection !== p.collection)].slice(0, n);
