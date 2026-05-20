"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  itemId: string;
  qty: number;
  addedAt: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  add: (itemId: string, qty?: number) => void;
  remove: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      add: (itemId, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.itemId === itemId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.itemId === itemId ? { ...l, qty: l.qty + qty } : l,
              ),
              isOpen: true,
            };
          }
          return {
            lines: [
              ...state.lines,
              { itemId, qty, addedAt: Date.now() },
            ],
            isOpen: true,
          };
        }),
      remove: (itemId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.itemId !== itemId),
        })),
      setQty: (itemId, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((l) => l.itemId !== itemId)
              : state.lines.map((l) =>
                  l.itemId === itemId ? { ...l, qty } : l,
                ),
        })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      count: () => get().lines.reduce((acc, l) => acc + l.qty, 0),
    }),
    { name: "rizal-cart" },
  ),
);
