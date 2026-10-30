/**
 * Approved Instagram posts to feature in "Seen on Instagram".
 * Add entries ONLY with images the business has supplied/approved
 * (save them under /public/images/editorial and register them in assets.json).
 * There is no live Instagram sync — this list is curated by hand.
 */
export interface InstagramPost {
  image: string; // asset id
  url: string; // link to the post on instagram.com
  caption: string;
}

export const instagramPosts: InstagramPost[] = [];
