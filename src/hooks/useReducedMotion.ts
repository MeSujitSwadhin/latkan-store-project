"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** true when the visitor prefers reduced motion (server: true → safe default). */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  );
}

const FINE = "(hover: hover) and (pointer: fine)";
function subscribeFine(cb: () => void) {
  const mq = window.matchMedia(FINE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
export function useFinePointer() {
  return useSyncExternalStore(
    subscribeFine,
    () => window.matchMedia(FINE).matches,
    () => false,
  );
}
