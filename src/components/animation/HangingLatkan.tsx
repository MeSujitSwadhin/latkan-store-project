"use client";

import { useEffect, useId, useRef } from "react";
import { cx } from "@/lib/format";

/**
 * Signature detail: a decorative latkan motif suspended on a fine thread.
 * It is an abstract SVG drawing — deliberately NOT a depiction of a specific
 * product. Motion is a damped double pendulum driven by pointer velocity and
 * scroll velocity, clamped to a few degrees so it never competes with content.
 */
export function HangingLatkan({
  className,
  threadLength = 220,
  tone = "wine",
}: {
  className?: string;
  threadLength?: number;
  tone?: "wine" | "ivory";
}) {
  const bodyRef = useRef<SVGGElement>(null);
  const skirtRef = useRef<SVGGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const gold = `lt-gold-${uid}`;
  const bead = `lt-bead-${uid}`;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const body = bodyRef.current;
    const skirt = skirtRef.current;
    const wrap = wrapRef.current;
    if (!body || !skirt || !wrap) return;

    let a = 0, // main angle (deg)
      v = 0,
      b = 0, // skirt secondary angle
      w = 0,
      lastX: number | null = null,
      lastScroll = window.scrollY,
      raf = 0,
      visible = true,
      idle = 0;

    const K = 0.022; // stiffness
    const C = 0.045; // damping
    const K2 = 0.06;
    const C2 = 0.09;
    const MAX = 9;

    const onPointer = (e: PointerEvent) => {
      if (lastX !== null) {
        const rect = wrap.getBoundingClientRect();
        const near = Math.abs(e.clientX - (rect.left + rect.width / 2)) < 420 && e.clientY < rect.bottom + 200;
        const dx = e.clientX - lastX;
        v += dx * (near ? 0.018 : 0.004);
      }
      lastX = e.clientX;
      idle = 0;
    };
    const step = () => {
      const s = window.scrollY;
      const ds = s - lastScroll;
      lastScroll = s;
      v += Math.max(-1.2, Math.min(1.2, ds * 0.012));
      // gentle breeze so it never looks frozen
      idle += 1;
      v += Math.sin(idle / 140) * 0.0025;

      v += -K * a - C * v;
      a = Math.max(-MAX, Math.min(MAX, a + v));
      w += -K2 * (b + a * 0.6) - C2 * w;
      b = Math.max(-MAX, Math.min(MAX, b + w));

      body.setAttribute("transform", `rotate(${a.toFixed(3)} 60 0)`);
      skirt.setAttribute("transform", `rotate(${(b * 0.9).toFixed(3)} 60 ${threadLength + 58})`);
      if (visible) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      }
    });
    io.observe(wrap);
    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [threadLength]);

  const L = threadLength;
  const ink = tone === "wine" ? "#5A1829" : "#F5F0E8";
  const strands = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div ref={wrapRef} className={cx("pointer-events-none select-none", className)} aria-hidden="true">
      <svg viewBox={`0 0 120 ${L + 200}`} width="120" height={L + 200} className="h-full w-auto overflow-visible">
        <defs>
          <linearGradient id={gold} x1="0" x2="1">
            <stop offset="0" stopColor="#A9875A" />
            <stop offset="0.45" stopColor="#E6CFA4" />
            <stop offset="1" stopColor="#A9875A" />
          </linearGradient>
          <radialGradient id={bead} cx="0.35" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#8A2E45" />
            <stop offset="1" stopColor={tone === "wine" ? "#3D0F1B" : "#5A1829"} />
          </radialGradient>
        </defs>
        <g ref={bodyRef}>
          {/* thread */}
          <line x1="60" y1="0" x2="60" y2={L} stroke="#C5A478" strokeWidth="0.8" />
          {/* small spacer beads on the thread */}
          <circle cx="60" cy={L * 0.62} r="2.2" fill={`url(#${gold})`} />
          <circle cx="60" cy={L * 0.72} r="1.6" fill={`url(#${gold})`} />
          {/* cap */}
          <path d={`M48 ${L + 6} Q60 ${L - 8} 72 ${L + 6} L69 ${L + 14} L51 ${L + 14} Z`} fill={`url(#${gold})`} />
          {/* main bead */}
          <ellipse cx="60" cy={L + 30} rx="15" ry="18" fill={`url(#${bead})`} />
          <ellipse cx="55" cy={L + 24} rx="4" ry="6" fill="#fff" opacity="0.18" />
          {/* collar */}
          <rect x="47" y={L + 48} width="26" height="5" rx="2" fill={`url(#${gold})`} />
          <rect x="49" y={L + 54} width="22" height="3" rx="1.5" fill={ink} opacity="0.8" />
          {/* skirt */}
          <g ref={skirtRef}>
            {strands.map((i) => {
              const x = 50 + i * (20 / 14);
              const len = 92 + Math.sin(i * 1.7) * 8;
              const spread = (i - 7) * 1.6;
              return (
                <path
                  key={i}
                  d={`M${x} ${L + 58} C ${x} ${L + 100}, ${x + spread * 0.6} ${L + 120}, ${x + spread} ${L + 58 + len}`}
                  stroke={i % 3 === 0 ? "#C5A478" : tone === "wine" ? "#5A1829" : "#D9B7B5"}
                  strokeWidth={i % 3 === 0 ? 0.9 : 1.15}
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx="60" cy={L + 160} r="0" />
          </g>
        </g>
      </svg>
    </div>
  );
}
