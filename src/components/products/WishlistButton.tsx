"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/store";
import { cx } from "@/lib/format";

export function WishlistButton({ slug, name, className, tone = "ink" }: { slug: string; name: string; className?: string; tone?: "ink" | "ivory" }) {
  const { has, toggle } = useWishlist();
  const on = has(slug);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={cx(
        "grid h-11 w-11 place-items-center rounded-full transition-colors duration-500",
        tone === "ink" ? "bg-ivory/85 text-wine backdrop-blur-sm hover:bg-ivory" : "text-ivory",
        className,
      )}
    >
      <Heart size={17} strokeWidth={1.3} className={cx("transition-transform duration-500", on && "scale-110")} fill={on ? "currentColor" : "none"} />
    </button>
  );
}
