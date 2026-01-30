import { create } from "zustand";
import { Pickle } from "@/data/pickles";

export interface CartItem {
  pickle: Pickle;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (pickle: Pickle, quantity?: number) => void;
  removeItem: (pickleId: string) => void;
  updateQuantity: (pickleId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (pickle, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.pickle.id === pickle.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.pickle.id === pickle.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, { pickle, quantity }] };
    });
  },

  removeItem: (pickleId) => {
    set((state) => ({
      items: state.items.filter((item) => item.pickle.id !== pickleId),
    }));
  },

  updateQuantity: (pickleId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(pickleId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.pickle.id === pickleId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.pickle.price * item.quantity, 0),
}));
