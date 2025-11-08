import { create } from "zustand";
import { persist } from "zustand/middleware";

// Product type
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  region: string;
  description: string;
  badges: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  brewTime: string;
  caffeine: string;
  tags: string[];
}

// Cart item type
export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
}

// Wishlist item type
export interface WishlistItem {
  id: number;
  addedAt: string;
}

// Cart store interface
interface CartStore {
  // Cart state
  items: CartItem[];
  isOpen: boolean;

  // Cart actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;

  // Cart computations
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: number) => number;
}

// Wishlist store interface
interface WishlistStore {
  items: WishlistItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

// UI store interface
interface UIStore {
  // Modal states
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  isFilterOpen: boolean;

  // Loading states
  isLoading: boolean;
  loadingMessage: string;

  // Toast notifications
  notifications: Array<{
    id: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
    timestamp: number;
  }>;

  // Actions
  toggleSearch: () => void;
  toggleMenu: () => void;
  toggleFilter: () => void;
  setLoading: (loading: boolean, message?: string) => void;
  addNotification: (
    type: "success" | "error" | "info" | "warning",
    message: string,
  ) => void;
  removeNotification: (id: string) => void;
}

// Cart store implementation
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity }],
          });
        }

        // Add success notification
        useUIStore
          .getState()
          .addNotification("success", `${product.name} added to cart!`);
      },

      removeItem: (productId: number) => {
        const items = get().items;
        const item = items.find((item) => item.id === productId);

        set({
          items: items.filter((item) => item.id !== productId),
        });

        if (item) {
          useUIStore
            .getState()
            .addNotification("info", `${item.name} removed from cart`);
        }
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
        useUIStore.getState().addNotification("info", "Cart cleared");
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getItemQuantity: (productId: number) => {
        const item = get().items.find((item) => item.id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "nirvana-cart",
      version: 1,
    },
  ),
);

// Wishlist store implementation
export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: number) => {
        const items = get().items;
        const exists = items.find((item) => item.id === productId);

        if (!exists) {
          set({
            items: [
              ...items,
              { id: productId, addedAt: new Date().toISOString() },
            ],
          });
          useUIStore
            .getState()
            .addNotification("success", "Added to wishlist!");
        }
      },

      removeItem: (productId: number) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
        useUIStore.getState().addNotification("info", "Removed from wishlist");
      },

      isInWishlist: (productId: number) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
        useUIStore.getState().addNotification("info", "Wishlist cleared");
      },
    }),
    {
      name: "nirvana-wishlist",
      version: 1,
    },
  ),
);

// UI store implementation
export const useUIStore = create<UIStore>((set, get) => ({
  isSearchOpen: false,
  isMenuOpen: false,
  isFilterOpen: false,
  isLoading: false,
  loadingMessage: "",
  notifications: [],

  toggleSearch: () => {
    set({ isSearchOpen: !get().isSearchOpen });
  },

  toggleMenu: () => {
    set({ isMenuOpen: !get().isMenuOpen });
  },

  toggleFilter: () => {
    set({ isFilterOpen: !get().isFilterOpen });
  },

  setLoading: (loading: boolean, message = "") => {
    set({ isLoading: loading, loadingMessage: message });
  },

  addNotification: (type, message) => {
    const id = Date.now().toString();
    const notification = {
      id,
      type,
      message,
      timestamp: Date.now(),
    };

    set({
      notifications: [...get().notifications, notification],
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },

  removeNotification: (id: string) => {
    set({
      notifications: get().notifications.filter((n) => n.id !== id),
    });
  },
}));

// Computed selectors for better performance
export const useCartItemCount = () =>
  useCartStore((state) => state.getTotalItems());
export const useCartTotal = () =>
  useCartStore((state) => state.getTotalPrice());
export const useIsInCart = (productId: number) =>
  useCartStore((state) => state.getItemQuantity(productId) > 0);
export const useIsInWishlist = (productId: number) =>
  useWishlistStore((state) => state.isInWishlist(productId));
