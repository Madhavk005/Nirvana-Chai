import { Toaster, toast } from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  ShoppingCart,
  Heart,
  User,
  Settings,
} from "lucide-react";

// Custom toast configurations
const toastConfig = {
  duration: 4000,
  position: "top-right" as const,
  style: {
    background: "#ffffff",
    color: "#374151",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "16px",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    maxWidth: "400px",
  },
  success: {
    iconTheme: {
      primary: "#10B981",
      secondary: "#ffffff",
    },
    style: {
      border: "1px solid #d1fae5",
    },
  },
  error: {
    iconTheme: {
      primary: "#ef4444",
      secondary: "#ffffff",
    },
    style: {
      border: "1px solid #fecaca",
    },
  },
  loading: {
    iconTheme: {
      primary: "#6b7280",
      secondary: "#ffffff",
    },
  },
};

// Enhanced toast functions
export const showToast = {
  // Success toasts
  success: (message: string, options?: any) => {
    toast.success(message, {
      ...toastConfig,
      ...toastConfig.success,
      ...options,
    });
  },

  // Error toasts
  error: (message: string, options?: any) => {
    toast.error(message, {
      ...toastConfig,
      ...toastConfig.error,
      ...options,
    });
  },

  // Info toasts
  info: (message: string, options?: any) => {
    toast(message, {
      ...toastConfig,
      icon: <Info className="h-5 w-5 text-teal-500" />,
      style: {
        ...toastConfig.style,
        border: "1px solid #B1C9C3",
      },
      ...options,
    });
  },

  // Warning toasts
  warning: (message: string, options?: any) => {
    toast(message, {
      ...toastConfig,
      icon: <AlertCircle className="h-5 w-5 text-forest-500" />,
      style: {
        ...toastConfig.style,
        border: "1px solid #D3E1D7",
      },
      ...options,
    });
  },

  // Custom toasts with actions
  addToCart: (productName: string, onViewCart?: () => void) => {
    toast.custom(
      (t) => (
        <div
          className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
      `}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <ShoppingCart className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Added to cart!
                </p>
                <p className="mt-1 text-sm text-gray-500">{productName}</p>
              </div>
            </div>
          </div>
          {onViewCart && (
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => {
                  onViewCart();
                  toast.dismiss(t.id);
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-sage-600 hover:text-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500"
              >
                View Cart
              </button>
            </div>
          )}
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              ×
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      },
    );
  },

  addToWishlist: (productName: string, onViewWishlist?: () => void) => {
    toast.custom(
      (t) => (
        <div
          className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
      `}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Heart className="h-6 w-6 text-red-400 fill-current" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Added to wishlist!
                </p>
                <p className="mt-1 text-sm text-gray-500">{productName}</p>
              </div>
            </div>
          </div>
          {onViewWishlist && (
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => {
                  onViewWishlist();
                  toast.dismiss(t.id);
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-sage-600 hover:text-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500"
              >
                View
              </button>
            </div>
          )}
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              ×
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
      },
    );
  },

  // Loading toast with promise
  promise: <T,>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
  ) => {
    return toast.promise(promise, msgs, toastConfig);
  },

  // Custom toast for checkout
  checkout: (itemCount: number, total: string) => {
    toast.custom(
      (t) => (
        <div
          className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        max-w-md w-full bg-gradient-to-r from-sage-500 to-forest-600 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
      `}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  Order placed successfully!
                </p>
                <p className="mt-1 text-sm text-sage-100">
                  {itemCount} items • {total}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: 8000,
      },
    );
  },

  // Newsletter subscription
  newsletter: (email: string) => {
    toast.custom(
      (t) => (
        <div
          className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
      `}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Welcome to our tea journey!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {email} subscribed successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: 6000,
      },
    );
  },
};

// Enhanced Toaster component
export function ToastProvider() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={toastConfig}
        containerStyle={{
          top: 20,
          right: 20,
        }}
      />

      {/* Custom styles for animations */}
      <style>{`
        @keyframes enter {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes leave {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animate-enter {
          animation: enter 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
        }
        
        .animate-leave {
          animation: leave 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;
        }
      `}</style>
    </>
  );
}

// Hook for easy access to toast functions
export function useToast() {
  return showToast;
}
