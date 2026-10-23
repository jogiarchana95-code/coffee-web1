import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [], // [{ id, name, price, emoji, qty }]
      activeOrder: null,
      addItem: (coffee, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === coffee.id);
          if (existing) {
            return { items: s.items.map((i) =>
              i.id === coffee.id ? { ...i, qty: i.qty + qty } : i) };
          }
          const { id, name, price, emoji, image } = coffee;
          return { items: [...s.items, { id, name, price, emoji, image, qty }] };
        }),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0
            ? s.items.filter((i) => i.id !== id)
            : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      placeOrder: (address = "Jl. Kpg Sutoyo") =>
        set((s) => {
          if (s.items.length === 0) return s;
          const items = s.items.map((item) => ({ ...item }));
          const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
          return {
            items: [],
            activeOrder: {
              id: Date.now(),
              items,
              total,
              address: "Jl. Kpg Sutoyo",
              placedAt: Date.now(),
            },
          };
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "cart" }
  )
);

export const selectCount = (s) => s.items.reduce((n, i) => n + i.qty, 0);
export const selectTotal = (s) => s.items.reduce((t, i) => t + i.price * i.qty, 0);