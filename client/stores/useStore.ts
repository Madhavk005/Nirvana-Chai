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
  weight: string;
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

// Recently viewed store interface
interface RecentlyViewedStore {
  items: number[];
  addItem: (productId: number) => void;
  clearRecentlyViewed: () => void;
}

// Comparison store interface
interface ComparisonStore {
  items: number[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  isInComparison: (productId: number) => boolean;
  clearComparison: () => void;
  getComparisonProducts: () => Product[];
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

// Recently viewed store implementation
export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: number) => {
        const items = get().items;
        const filteredItems = items.filter((id) => id !== productId);
        const newItems = [productId, ...filteredItems].slice(0, 10); // Keep only last 10 viewed
        set({ items: newItems });
      },

      clearRecentlyViewed: () => {
        set({ items: [] });
      },
    }),
    {
      name: "nirvana-recently-viewed",
      version: 1,
    },
  ),
);

// Comparison store implementation
export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: number) => {
        const items = get().items;
        if (!items.includes(productId) && items.length < 4) {
          set({ items: [...items, productId] });
          useUIStore
            .getState()
            .addNotification("success", "Added to comparison!");
        } else if (items.length >= 4) {
          useUIStore
            .getState()
            .addNotification("warning", "Maximum 4 products can be compared");
        }
      },

      removeItem: (productId: number) => {
        set({
          items: get().items.filter((id) => id !== productId),
        });
        useUIStore.getState().addNotification("info", "Removed from comparison");
      },

      isInComparison: (productId: number) => {
        return get().items.includes(productId);
      },

      clearComparison: () => {
        set({ items: [] });
        useUIStore.getState().addNotification("info", "Comparison cleared");
      },

      getComparisonProducts: () => {
        // This will be implemented when we have access to TEA_PRODUCTS
        return [];
      },
    }),
    {
      name: "nirvana-comparison",
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
export const useIsInComparison = (productId: number) =>
  useComparisonStore((state) => state.isInComparison(productId));
export const useRecentlyViewedCount = () =>
  useRecentlyViewedStore((state) => state.items.length);
export const useComparisonCount = () =>
  useComparisonStore((state) => state.items.length);

// Auth store interface
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// User types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  avatar?: string;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
  };
  createdAt: string;
  lastLogin?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Reviews store interface
interface ReviewsStore {
  reviews: ProductReview[];
  userReviews: ProductReview[];
  isLoading: boolean;
  addReview: (review: Omit<ProductReview, 'id' | 'createdAt' | 'helpful'>) => Promise<void>;
  updateReview: (reviewId: string, updates: Partial<ProductReview>) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  markHelpful: (reviewId: string) => Promise<void>;
  getProductReviews: (productId: number) => ProductReview[];
  getAverageRating: (productId: number) => number;
}

export interface ProductReview {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Orders store interface
interface OrdersStore {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<Order | null>;
  createOrder: (orderData: OrderData) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  status: OrderStatus;
  trackingNumber?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  id: string;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weight: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
}

export interface OrderData {
  shippingInfo: ShippingInfo;
  cartItems: CartItem[];
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Subscription store interface
interface SubscriptionStore {
  subscriptions: Subscription[];
  isLoading: boolean;
  createSubscription: (subscriptionData: SubscriptionData) => Promise<Subscription>;
  updateSubscription: (subscriptionId: string, updates: Partial<Subscription>) => Promise<void>;
  cancelSubscription: (subscriptionId: string) => Promise<void>;
  pauseSubscription: (subscriptionId: string) => Promise<void>;
  resumeSubscription: (subscriptionId: string) => Promise<void>;
}

export interface Subscription {
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  price: number;
  currency: string;
  status: 'active' | 'paused' | 'cancelled';
  nextDelivery: string;
  items: SubscriptionItem[];
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionItem {
  productId: number;
  name: string;
  quantity: number;
  weight: string;
}

export interface SubscriptionData {
  name: string;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  items: SubscriptionItem[];
}

// Auth store implementation
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // In real app, this would call an API
          // For now, simulate login
          const mockUser: User = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email,
            preferences: {
              language: 'en',
              currency: 'USD',
              notifications: true,
            },
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });

          useUIStore.getState().addNotification('success', 'Login successful!');
        } catch (error) {
          set({ isLoading: false });
          useUIStore.getState().addNotification('error', 'Login failed');
          throw error;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        try {
          // In real app, this would call an API
          const mockUser: User = {
            id: Date.now().toString(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            preferences: {
              language: 'en',
              currency: 'USD',
              notifications: true,
            },
            createdAt: new Date().toISOString(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });

          useUIStore.getState().addNotification('success', 'Registration successful!');
        } catch (error) {
          set({ isLoading: false });
          useUIStore.getState().addNotification('error', 'Registration failed');
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        useUIStore.getState().addNotification('info', 'Logged out successfully');
      },

      updateProfile: async (userData: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) throw new Error('No user logged in');

        try {
          // In real app, this would call an API
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
          useUIStore.getState().addNotification('success', 'Profile updated successfully!');
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to update profile');
          throw error;
        }
      },
    }),
    {
      name: 'nirvana-auth',
      version: 1,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// Reviews store implementation
export const useReviewsStore = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      reviews: [],
      userReviews: [],
      isLoading: false,

      addReview: async (reviewData) => {
        set({ isLoading: true });
        try {
          const newReview: ProductReview = {
            ...reviewData,
            id: Date.now().toString(),
            helpful: 0,
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            reviews: [...state.reviews, newReview],
            userReviews: [...state.userReviews, newReview],
            isLoading: false,
          }));

          useUIStore.getState().addNotification('success', 'Review added successfully!');
        } catch (error) {
          set({ isLoading: false });
          useUIStore.getState().addNotification('error', 'Failed to add review');
          throw error;
        }
      },

      updateReview: async (reviewId, updates) => {
        try {
          set((state) => ({
            reviews: state.reviews.map(review =>
              review.id === reviewId ? { ...review, ...updates, updatedAt: new Date().toISOString() } : review
            ),
            userReviews: state.userReviews.map(review =>
              review.id === reviewId ? { ...review, ...updates, updatedAt: new Date().toISOString() } : review
            ),
          }));

          useUIStore.getState().addNotification('success', 'Review updated successfully!');
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to update review');
          throw error;
        }
      },

      deleteReview: async (reviewId) => {
        try {
          set((state) => ({
            reviews: state.reviews.filter(review => review.id !== reviewId),
            userReviews: state.userReviews.filter(review => review.id !== reviewId),
          }));

          useUIStore.getState().addNotification('success', 'Review deleted successfully!');
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to delete review');
          throw error;
        }
      },

      markHelpful: async (reviewId) => {
        try {
          set((state) => ({
            reviews: state.reviews.map(review =>
              review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
            ),
          }));
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to mark review as helpful');
          throw error;
        }
      },

      getProductReviews: (productId) => {
        return get().reviews.filter(review => review.productId === productId);
      },

      getAverageRating: (productId) => {
        const productReviews = get().getProductReviews(productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / productReviews.length;
      },
    }),
    {
      name: 'nirvana-reviews',
      version: 1,
    },
  ),
);

// Orders store implementation
export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      isLoading: false,

      fetchOrders: async () => {
        set({ isLoading: true });
        try {
          // In real app, this would call an API
          // For now, return mock data
          const mockOrders: Order[] = [
            {
              id: '12345',
              userId: '1',
              items: [],
              shippingInfo: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                address: '123 Main St',
                city: 'Almaty',
                country: 'Kazakhstan',
              },
              paymentMethod: 'card',
              status: 'delivered',
              subtotal: 89.97,
              shipping: 5.99,
              tax: 8.99,
              total: 104.95,
              createdAt: '2025-01-10T10:00:00Z',
              updatedAt: '2025-01-15T14:00:00Z',
            },
          ];

          set({ orders: mockOrders, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          useUIStore.getState().addNotification('error', 'Failed to fetch orders');
          throw error;
        }
      },

      fetchOrderById: async (orderId) => {
        try {
          const order = get().orders.find(o => o.id === orderId);
          set({ currentOrder: order || null });
          return order || null;
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to fetch order');
          throw error;
        }
      },

      createOrder: async (orderData) => {
        set({ isLoading: true });
        try {
          const newOrder: Order = {
            id: Date.now().toString(),
            userId: '1', // In real app, get from auth store
            items: orderData.cartItems.map(item => ({
              id: item.id.toString(),
              productId: item.id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
              weight: item.weight,
            })),
            shippingInfo: orderData.shippingInfo,
            paymentMethod: orderData.paymentMethod,
            status: 'pending',
            subtotal: orderData.subtotal,
            shipping: orderData.shipping,
            tax: orderData.tax,
            total: orderData.subtotal + orderData.shipping + orderData.tax,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            orders: [newOrder, ...state.orders],
            currentOrder: newOrder,
            isLoading: false,
          }));

          useUIStore.getState().addNotification('success', 'Order created successfully!');
          return newOrder;
        } catch (error) {
          set({ isLoading: false });
          useUIStore.getState().addNotification('error', 'Failed to create order');
          throw error;
        }
      },

      updateOrderStatus: async (orderId, status) => {
        try {
          set((state) => ({
            orders: state.orders.map(order =>
              order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order
            ),
            currentOrder: state.currentOrder?.id === orderId
              ? { ...state.currentOrder, status, updatedAt: new Date().toISOString() }
              : state.currentOrder,
          }));

          useUIStore.getState().addNotification('success', 'Order status updated!');
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to update order status');
          throw error;
        }
      },

      cancelOrder: async (orderId) => {
        try {
          await get().updateOrderStatus(orderId, 'cancelled');
          useUIStore.getState().addNotification('success', 'Order cancelled successfully!');
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to cancel order');
          throw error;
        }
      },
    }),
    {
      name: 'nirvana-orders',
      version: 1,
    },
  ),
);

// Subscription store implementation
export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      subscriptions: [],
      isLoading: false,

      createSubscription: async (subscriptionData) => {
        set({ isLoading: true });
        try {
          const newSubscription: Subscription = {
            id: Date.now().toString(),
            userId: '1', // In real app, get from auth store
            name: subscriptionData.name,
            description: `${subscriptionData.frequency} tea subscription`,
            frequency: subscriptionData.frequency,
            price: subscriptionData.items.reduce((sum, item) => sum + (25.99 * item.quantity), 0), // Mock price
            currency: 'USD',
            status: 'active',
            nextDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
            items: subscriptionData.items,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            subscriptions: [...state.subscriptions, newSubscription],
            isLoading: false,
          }));

          useUIStore.getState().addNotification('success', 'Subscription created successfully!');
          return newSubscription;
        } catch (error) {
          set({ isLoading: false });
          useUIStore.getState().addNotification('error', 'Failed to create subscription');
          throw error;
        }
      },

      updateSubscription: async (subscriptionId, updates) => {
        try {
          set((state) => ({
            subscriptions: state.subscriptions.map(sub =>
              sub.id === subscriptionId ? { ...sub, ...updates, updatedAt: new Date().toISOString() } : sub
            ),
          }));

          useUIStore.getState().addNotification('success', 'Subscription updated successfully!');
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to update subscription');
          throw error;
        }
      },

      cancelSubscription: async (subscriptionId) => {
        try {
          await get().updateSubscription(subscriptionId, { status: 'cancelled' });
          useUIStore.getState().addNotification('success', 'Subscription cancelled successfully!');
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to cancel subscription');
          throw error;
        }
      },

      pauseSubscription: async (subscriptionId) => {
        try {
          await get().updateSubscription(subscriptionId, { status: 'paused' });
          useUIStore.getState().addNotification('success', 'Subscription paused successfully!');
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to pause subscription');
          throw error;
        }
      },

      resumeSubscription: async (subscriptionId) => {
        try {
          await get().updateSubscription(subscriptionId, { status: 'active' });
          useUIStore.getState().addNotification('success', 'Subscription resumed successfully!');
        } catch (error) {
          useUIStore.getState().addNotification('error', 'Failed to resume subscription');
          throw error;
        }
      },
    }),
    {
      name: 'nirvana-subscriptions',
      version: 1,
    },
  ),
);

// Computed selectors for new stores
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useCurrentUser = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useUserOrders = () => useOrdersStore((state) => state.orders);
export const useUserSubscriptions = () => useSubscriptionStore((state) => state.subscriptions);
export const useProductReviews = (productId: number) => useReviewsStore((state) => state.getProductReviews(productId));
export const useProductAverageRating = (productId: number) => useReviewsStore((state) => state.getAverageRating(productId));
