"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny persistent stores (localStorage) for the wishlist and the bag.
 * In Mode A the bag is an "enquiry list" sent via WhatsApp — no orders are
 * created and nothing is charged.
 */

export interface BagItem {
  key: string;
  slug: string;
  colour?: string;
  size?: string;
  quantity: number;
}

function createStore<T>(storageKey: string, initial: T) {
  let state: T = initial;
  let hydrated = false;
  const listeners = new Set<() => void>();

  const read = () => {
    if (hydrated || typeof window === "undefined") return;
    hydrated = true;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) state = JSON.parse(raw) as T;
    } catch {
      /* storage unavailable — keep in memory */
    }
  };

  const write = () => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key !== storageKey) return;
      try {
        state = e.newValue ? (JSON.parse(e.newValue) as T) : initial;
      } catch {
        state = initial;
      }
      listeners.forEach((l) => l());
    });
  }

  return {
    get: () => {
      read();
      return state;
    },
    set: (next: T | ((prev: T) => T)) => {
      read();
      state = typeof next === "function" ? (next as (p: T) => T)(state) : next;
      write();
      listeners.forEach((l) => l());
    },
    subscribe: (l: () => void) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    serverSnapshot: initial,
  };
}

const EMPTY_LIST: string[] = [];
const EMPTY_BAG: BagItem[] = [];

export const wishlistStore = createStore<string[]>("tls.wishlist.v1", EMPTY_LIST);
export const bagStore = createStore<BagItem[]>("tls.bag.v1", EMPTY_BAG);

export function useWishlist() {
  const items = useSyncExternalStore(wishlistStore.subscribe, wishlistStore.get, () => EMPTY_LIST);
  return {
    items,
    has: (slug: string) => items.includes(slug),
    toggle: (slug: string) =>
      wishlistStore.set((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
    remove: (slug: string) => wishlistStore.set((prev) => prev.filter((s) => s !== slug)),
  };
}

export function useBag() {
  const items = useSyncExternalStore(bagStore.subscribe, bagStore.get, () => EMPTY_BAG);
  return {
    items,
    count: items.reduce((n, i) => n + i.quantity, 0),
    add: (item: Omit<BagItem, "key">) =>
      bagStore.set((prev) => {
        const key = [item.slug, item.colour ?? "", item.size ?? ""].join("|");
        const existing = prev.find((i) => i.key === key);
        if (existing)
          return prev.map((i) => (i.key === key ? { ...i, quantity: Math.min(99, i.quantity + item.quantity) } : i));
        return [...prev, { ...item, key }];
      }),
    update: (key: string, quantity: number) =>
      bagStore.set((prev) =>
        prev.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, Math.min(99, quantity)) } : i)),
      ),
    remove: (key: string) => bagStore.set((prev) => prev.filter((i) => i.key !== key)),
    clear: () => bagStore.set([]),
  };
}
