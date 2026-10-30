/**
 * CENTRAL SITE CONFIGURATION
 * ---------------------------------------------------------------
 * Every business fact lives here. Anything not confirmed by The Latkan Store
 * is `null` or flagged `verified: false` — the UI hides or labels it.
 *
 * Research log (30 Oct 2026):
 *  - instagram.com/thelatkanstore could not be accessed (login wall / blocked
 *    from the build environment). No posts, bio, phone or location were read.
 *  - Web searches for "The Latkan Store" / "thelatkanstore" returned no
 *    official website, marketplace listing or directory entry.
 *  - Therefore all content below follows the brief's design assumption:
 *    an Indian fashion-accessory label for latkans, tassels and embellishments.
 */

// NEXT_PUBLIC_* values must be read with literal property access so Next.js
// can inline them into client bundles.
const ENV = {
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_COMMERCE_MODE: process.env.NEXT_PUBLIC_COMMERCE_MODE,
  NEXT_PUBLIC_PREVIEW_MODE: process.env.NEXT_PUBLIC_PREVIEW_MODE,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};
const env = (key: keyof typeof ENV) => (ENV[key] ?? "").trim();

const whatsappDigits = env("NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/\D/g, "");

export const site = {
  name: "The Latkan Store",
  wordmark: "THE LATKAN STORE",
  concept: "The Latkan Atelier — Every Detail, a Story.",
  description:
    "Latkans, tassels and finishing details for Indian couture — an expression of tradition, detail and personal style.",
  url: env("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000",

  /** Verified by the brief itself. */
  instagram: {
    handle: "@thelatkanstore",
    url: "https://www.instagram.com/thelatkanstore/",
    verified: true,
  },

  /** Must be a real, business-confirmed number. Empty → all WhatsApp CTAs hidden. */
  whatsapp: whatsappDigits.length >= 10 ? whatsappDigits : null,

  /** Unverified — fill only with confirmed details. */
  email: null as string | null,
  phone: null as string | null,
  location: null as string | null,

  /** "whatsapp" = Mode A catalogue + enquiry (default). "checkout" = Mode B. */
  commerceMode: (env("NEXT_PUBLIC_COMMERCE_MODE") === "checkout" ? "checkout" : "whatsapp") as
    | "whatsapp"
    | "checkout",

  /** Mode B requires a real payment provider. Remains false until integrated. */
  paymentProviderConfigured: false,

  /** Shows unverified sections (sample catalogue, custom studio) with a visible notice. */
  previewMode: env("NEXT_PUBLIC_PREVIEW_MODE") !== "false",

  facts: {
    offersCustomization: null as boolean | null,
    handmade: null as boolean | null,
    sellsWholesale: null as boolean | null,
    shipsInternationally: null as boolean | null,
    shippingPolicy: null as string | null,
    returnsPolicy: null as string | null,
  },
} as const;

export const features = {
  /** Custom studio is visible only when the business confirms customization, or in preview. */
  customOrders: site.facts.offersCustomization === true || site.previewMode,
  /** Sample catalogue is visible only in preview mode until real products are added. */
  catalogue: site.previewMode,
  cart: site.commerceMode === "checkout" && site.paymentProviderConfigured,
  enquiryList: true,
};

export const nav = [
  { href: "/collections", label: "Collections", n: "01" },
  { href: "/our-story", label: "Our Story", n: "02" },
  { href: "/custom-orders", label: "Custom Studio", n: "03", feature: "customOrders" as const },
  { href: "/gallery", label: "Gallery", n: "04" },
  { href: "/contact", label: "Contact", n: "05" },
];
