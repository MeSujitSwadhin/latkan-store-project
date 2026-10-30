export type VerificationStatus = "verified" | "unverified" | "sample";

export type AssetStatus = "brand-approved" | "stock-illustrative" | "placeholder";

export interface Asset {
  id: string;
  path: string;
  unsplashId?: string;
  /** Unsplash CDN original, used when the local file is missing. */
  remote?: string;
  photographer: string;
  sourceUrl?: string;
  description: string;
  alt: string;
  usage: string;
  status: AssetStatus;
  licence: string;
  orientation: "portrait" | "landscape" | "square";
}

export interface Collection {
  slug: string;
  number: string;
  name: string;
  /** Word rendered in italic within the display title. */
  italic: string;
  tagline: string;
  description: string;
  image: string; // asset id
  detailImage: string; // asset id
  status: VerificationStatus;
}

export interface ProductVariant {
  id: string;
  label: string;
  /** Hex swatch, optional. */
  swatch?: string;
}

export interface Product {
  slug: string;
  name: string;
  collection: string; // collection slug
  /** INR price in rupees. null = not verified → "Price on request". */
  price: number | null;
  shortDescription: string;
  description: string;
  /** Only filled when confirmed by the business. */
  materials: string | null;
  colours: ProductVariant[];
  sizes: ProductVariant[];
  availability: "in-stock" | "made-to-order" | "unknown";
  images: string[]; // asset ids, first = primary, second = hover
  status: VerificationStatus;
  featured?: boolean;
}

export interface GalleryItem {
  image: string; // asset id
  caption: string;
  layout: "tall" | "wide" | "square" | "hero";
}
