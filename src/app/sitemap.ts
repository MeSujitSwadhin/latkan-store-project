import type { MetadataRoute } from "next";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { features, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages = ["", "/collections", "/our-story", "/gallery", "/contact", "/privacy", "/terms", "/shipping-returns", "/credits"];
  if (features.customOrders) pages.push("/custom-orders");
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...collections.filter((c) => c.slug !== "custom-creations" || features.customOrders).map((c) => ({ url: `${base}/collections/${c.slug}` })),
    ...(features.catalogue ? products.map((p) => ({ url: `${base}/products/${p.slug}` })) : []),
  ];
}
