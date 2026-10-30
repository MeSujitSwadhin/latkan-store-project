"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { features, nav, site } from "@/data/site";
import { cx } from "@/lib/format";
import { useBag, useWishlist } from "@/lib/store";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  const { items: wish } = useWishlist();
  const { count } = useBag();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 320 && y > last.current + 4);
        if (y < last.current - 4) setHidden(false);
        last.current = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  const close = useCallback(() => setOpen(false), []);

  const links = nav.filter((l) => !l.feature || features[l.feature]);
  const bagLabel = site.commerceMode === "checkout" ? "Bag" : "Enquiry list";

  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-[80] -translate-y-24 bg-wine px-4 py-3 text-xs uppercase tracking-[0.2em] text-ivory focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-[var(--ease-silk)]",
          scrolled && !open ? "border-b border-ink/10 bg-ivory/88 backdrop-blur-md" : "border-b border-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            className={cx("group relative z-[61] flex h-11 items-center gap-3", open ? "text-ivory" : "text-ink")}
          >
            <span className="relative block h-3 w-7" aria-hidden="true">
              <span
                className={cx(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cx(
                  "absolute bottom-0 left-0 h-px bg-current transition-all duration-500",
                  open ? "w-full -translate-y-1 -rotate-45" : "w-4 group-hover:w-full",
                )}
              />
            </span>
            <span className="label hidden sm:inline">{open ? "Close" : "Menu"}</span>
          </button>

          <Link
            href="/"
            className={cx(
              "absolute left-1/2 z-[61] -translate-x-1/2 text-center leading-none transition-colors",
              open ? "text-ivory" : "text-wine",
            )}
            aria-label="The Latkan Store — home"
          >
            <span className="block font-[family-name:var(--font-didone)] text-[1.05rem] tracking-[0.32em] sm:text-[1.25rem]">
              THE LATKAN
            </span>
            <span className="label mt-1 block text-[0.52rem] tracking-[0.62em] opacity-80">Store</span>
          </Link>

          <div className={cx("relative z-[61] flex items-center gap-1", open ? "text-ivory" : "text-ink")}>
            <Link
              href="/collections"
              className="label mr-4 hidden link-thread lg:inline-block"
              aria-current={pathname.startsWith("/collections") ? "page" : undefined}
            >
              Shop
            </Link>
            <Link href="/wishlist" className="relative grid h-11 w-11 place-items-center" aria-label={`Wishlist, ${wish.length} items`}>
              <Heart size={18} strokeWidth={1.25} />
              {wish.length > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-wine px-1 text-[0.55rem] text-ivory">
                  {wish.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative grid h-11 w-11 place-items-center" aria-label={`${bagLabel}, ${count} items`}>
              <ShoppingBag size={18} strokeWidth={1.25} />
              {count > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.55rem] text-ink">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <MenuOverlay open={open} onClose={close} links={links} />
    </>
  );
}
