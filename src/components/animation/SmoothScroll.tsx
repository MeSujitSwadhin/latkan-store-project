"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Optional smooth scrolling. Enabled only for fine-pointer devices when the
 * visitor has not requested reduced motion. Native scrolling everywhere else.
 * Lenis is driven by the GSAP ticker so there is a single animation loop.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.__lenis?.scrollTo(0, { immediate: true });
    const { ScrollTrigger } = getGsap();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
