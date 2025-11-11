import { Link } from "react-router-dom";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../stores/useStore";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { CurrencyUtility } from "../utils/currency";
import { OptimizedImage } from "./OptimizedImage";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const {
    items,
    getTotalItems,
    getTotalPrice,
    updateQuantity,
    removeItem,
  } = useCartStore();
  const { currentCurrency, currentLanguage } = useLanguageCurrency();

  const util = new CurrencyUtility(currentCurrency.code);
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const getLocalizedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      cart: {
        en: "Cart",
        ru: "Корзина",
        kz: "Себет",
      },
      "view-cart": {
        en: "View Cart",
        ru: "Просмотр корзины",
        kz: "Себетті қарау",
      },
      checkout: {
        en: "Checkout",
        ru: "Оформить заказ",
        kz: "Тапсырыс беру",
      },
      empty: {
        en: "Your cart is empty",
        ru: "Ваша корзина пуста",
        kz: "Сіздің себетіңіз бос",
      },
      "add-items": {
        en: "Add some items to get started",
        ru: "Добавьте товары, чтобы начать",
        kz: "Бастау үшін тауарлар қосыңыз",
      },
      total: {
        en: "Total",
        ru: "Итого",
        kz: "Барлығы",
      },
      items: {
        en: "items",
        ru: "товаров",
        kz: "тауарлар",
      },
    };

    return translations[key]?.[currentLanguage.code] || key;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Mini Cart */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-sage-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {getLocalizedText("cart")}
                </h2>
                {totalItems > 0 && (
                  <span className="bg-sage-100 text-sage-700 text-xs px-2 py-1 rounded-full font-medium">
                    {totalItems} {getLocalizedText("items")}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {getLocalizedText("empty")}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {getLocalizedText("add-items")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-16 h-16 flex-shrink-0">
                        <OptimizedImage
                          src={item.image}
                          alt={item.name}
                          aspectRatio="square"
                          className="w-full h-full rounded-md"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {item.region}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {util.format(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-gray-500">
                            {util.format(item.price)} each
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>{getLocalizedText("total")}</span>
                  <span className="text-sage-700">
                    {util.format(totalPrice)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {getLocalizedText("view-cart")}
                  </Link>
                  <button className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    {getLocalizedText("checkout")}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
