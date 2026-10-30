import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  // Preview builds (sample content) are kept out of search engines.
  if (site.previewMode) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/cart", "/wishlist"] }], sitemap: `${site.url}/sitemap.xml` };
}
