import type { Collection } from "@/types";

/**
 * PROPOSED collections (status: "unverified").
 * These names come from the creative brief, not from the business. Replace
 * or remove them once The Latkan Store confirms its real categories.
 */
export const collections: Collection[] = [
  {
    slug: "bridal-latkans",
    number: "01",
    name: "Bridal Latkans",
    italic: "Bridal",
    tagline: "For the day every detail is remembered.",
    description:
      "Statement drops imagined for bridal lehengas and dupattas — weight, sheen and movement composed to be seen from across a room.",
    image: "col-bridal",
    detailImage: "hero-detail",
    status: "unverified",
  },
  {
    slug: "blouse-latkans",
    number: "02",
    name: "Blouse Latkans",
    italic: "Blouse",
    tagline: "The quiet signature at the back of a blouse.",
    description:
      "Finishing pieces for blouse ties and dori — a small swing of colour that turns a fastening into a flourish.",
    image: "col-blouse",
    detailImage: "p-golden",
    status: "unverified",
  },
  {
    slug: "lehenga-accents",
    number: "03",
    name: "Lehenga Accents",
    italic: "Accents",
    tagline: "Movement, measured in threads.",
    description:
      "Accents for lehenga drawstrings and hems, chosen to echo embroidery, borders and the palette of the whole look.",
    image: "col-lehenga",
    detailImage: "p-beads",
    status: "unverified",
  },
  {
    slug: "festive-details",
    number: "04",
    name: "Festive Details",
    italic: "Festive",
    tagline: "Colour for every celebration.",
    description:
      "Lighter, brighter pieces for festive dressing — playful, easy to pair, and made to catch the light.",
    image: "col-festive",
    detailImage: "p-colour",
    status: "unverified",
  },
  {
    slug: "custom-creations",
    number: "05",
    name: "Custom Creations",
    italic: "Custom",
    tagline: "Composed around your outfit.",
    description:
      "A conversation-led service for matching a latkan to a specific garment. Shown in preview only until the business confirms it offers customization.",
    image: "col-custom",
    detailImage: "cr-gold-thread",
    status: "unverified",
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
