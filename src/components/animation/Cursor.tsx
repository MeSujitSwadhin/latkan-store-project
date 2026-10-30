"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only cursor accent. Native cursor stays visible (accessibility);
 * the dot follows with gentle lag and expands to a "View" disc over
 * elements marked data-cursor="view".
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduce || !el) return;

    el.style.display = "block";
    let x = -100,
      y = -100,
      tx = -100,
      ty = -100,
      raf = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      el.classList.toggle("is-view", !!target);
      const label = el.querySelector(".cursor-label");
      if (label && target) label.textContent = target.dataset.cursor ?? "View";
    };
    const leave = () => {
      tx = ty = -100;
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-dot" style={{ display: "none" }} aria-hidden="true">
      <span className="cursor-label">View</span>
    </div>
  );
}
