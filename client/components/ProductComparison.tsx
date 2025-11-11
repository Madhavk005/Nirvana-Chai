import { useState } from "react";
import { Link } from "react-router-dom";
import { X, GitCompare, Star, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useComparisonStore, useCartStore } from "../stores/useStore";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { TEA_PRODUCTS } from "../data/teaProducts";
import { CurrencyUtility } from "../utils/currency";
import { OptimizedImage } from "./OptimizedImage";
import { showToast } from "./Toast/ToastProvider";

export function ProductComparison() {
  const { items, removeItem, clearComparison } = useComparisonStore();
  const { addItem: addToCart } = useCartStore();
  const { currentCurrency, currentLanguage } = useLanguageCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const getLocalizedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      compare: {
        en: "Compare Products",
        ru: "Сравнить товары",
        kz: "Өнімдерді салыстыру",
      },
      "clear-all": {
        en: "Clear All",
        ru: "Очистить все",
        kz: "Барлығын тазарту",
      },
      "add-to-cart": {
        en: "Add to Cart",
        ru: "В корзину",
        kz: "Себетке қосу",
      },
      "view-details": {
        en: "View Details",
        ru: "Подробнее",
        kz: "Толығырақ",
      },
      "no-products": {
        en: "No products to compare",
        ru: "Нет товаров для сравнения",
        kz: "Салыстыру үшін тауарлар жоқ",
      },
      "add-products": {
        en: "Add products to start comparing",
        ru: "Добавьте товары для сравнения",
        kz: "Салыстыру үшін тауарлар қосыңыз",
      },
      category: {
        en: "Category",
        ru: "Категория",
        kz: "Санат",
      },
      rating: {
        en: "Rating",
        ru: "Рейтинг",
        kz: "Рейтинг",
      },
      price: {
        en: "Price",
        ru: "Цена",
        kz: "Баға",
      },
      origin: {
        en: "Origin",
        ru: "Происхождение",
        kz: "Шығу тегі",
      },
      weight: {
        en: "Weight",
        ru: "Вес",
        kz: "Салмақ",
      },
    };

    return translations[key]?.[currentLanguage.code] || key;
  };

  const comparisonProducts = items
    .map((id) => TEA_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  const util = new CurrencyUtility(currentCurrency.code);

  const handleAddToCart = (product: any) => {
    const priceCurrent = util.convert(product.prices.RUB.current, "RUB");
    addToCart(
      {
        id: product.id,
        name: product.nameEn,
        price: priceCurrent,
        image: product.image,
        category: product.category,
        region: product.nameEn.toLowerCase().includes("kenyan")
          ? "Kenya"
          : "International",
        description: `${product.brand} • ${product.weight} • ${product.teaGrade}`,
        badges: [product.category],
        inStock: true,
        rating: product.rating,
        reviews: Math.round(40 * product.rating),
        brewTime: "3-5 min",
        caffeine: "Medium",
        tags: [product.teaGrade, product.leafSize],
        weight: product.weight,
      },
      1,
    );
    showToast.addToCart(product.nameEn);
  };

  if (comparisonProducts.length === 0) return null;

  return (
    <>
      {/* Floating Compare Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-sage-600 hover:bg-sage-700 text-white p-3 sm:p-4 rounded-full shadow-lg z-30 flex items-center gap-2 min-h-[56px] min-w-[56px]"
      >
        <GitCompare className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="bg-sage-500 text-white text-xs px-2 py-1 rounded-full font-bold">
          {items.length}
        </span>
      </motion.button>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <GitCompare className="h-5 w-5 sm:h-6 sm:w-6 text-sage-600" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {getLocalizedText("compare")}
                  </h2>
                  <span className="bg-sage-100 text-sage-700 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium">
                    {comparisonProducts.length} products
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearComparison}
                    className="text-gray-500 hover:text-red-500 transition-colors text-sm font-medium px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-red-50 min-h-[44px]"
                  >
                    {getLocalizedText("clear-all")}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-4 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {comparisonProducts.map((product, index) => {
                    if (!product) return null;

                    const priceCurrent = util.convert(
                      product.prices.RUB.current,
                      "RUB",
                    );
                    const originalPrice = util.convert(
                      product.prices.RUB.original,
                      "RUB",
                    );

                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-3 sm:p-4 relative group"
                      >
                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(product.id)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity min-h-[32px] min-w-[32px] flex items-center justify-center z-10"
                        >
                          <X className="h-3 w-3" />
                        </button>

                        {/* Product Image */}
                        <div className="aspect-square mb-3 sm:mb-4">
                          <OptimizedImage
                            src={product.image}
                            alt={product.nameEn}
                            aspectRatio="square"
                            className="w-full h-full rounded-lg"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2 sm:space-y-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight">
                              {currentLanguage.code === "ru" && product.nameRu
                                ? product.nameRu
                                : product.nameEn}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {product.brand}
                            </p>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">
                              {product.rating}
                            </span>
                          </div>

                          {/* Price */}
                          <div className="space-y-1">
                            <div className="font-bold text-sage-700 text-sm sm:text-base">
                              {util.format(priceCurrent)}
                            </div>
                            {originalPrice > priceCurrent && (
                              <div className="text-xs text-gray-500 line-through">
                                {util.format(originalPrice)}
                              </div>
                            )}
                          </div>

                          {/* Specs */}
                          <div className="space-y-1 sm:space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                {getLocalizedText("category")}:
                              </span>
                              <span className="font-medium">
                                {product.category}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                {getLocalizedText("weight")}:
                              </span>
                              <span className="font-medium">
                                {product.weight}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                {getLocalizedText("origin")}:
                              </span>
                              <span className="font-medium">
                                {product.nameEn.toLowerCase().includes("kenyan")
                                  ? "Kenya"
                                  : "International"}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-2 pt-2">
                            <Link
                              to={`/product/${product.id}`}
                              onClick={() => setIsOpen(false)}
                              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 min-h-[36px]"
                            >
                              {getLocalizedText("view-details")}
                            </Link>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-sage-600 hover:bg-sage-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 min-h-[36px]"
                            >
                              <ShoppingCart className="h-3 w-3" />
                              {getLocalizedText("add-to-cart")}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
