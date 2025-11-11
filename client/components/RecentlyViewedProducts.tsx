import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRecentlyViewedStore } from "../stores/useStore";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { TEA_PRODUCTS } from "../data/teaProducts";
import { CurrencyUtility } from "../utils/currency";
import { OptimizedImage } from "./OptimizedImage";

export function RecentlyViewedProducts() {
  const { items } = useRecentlyViewedStore();
  const { currentCurrency, currentLanguage } = useLanguageCurrency();

  const getLocalizedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      "recently-viewed": {
        en: "Recently Viewed",
        ru: "Недавно просмотренные",
        kz: "Жақында қаралған",
      },
      "view-all": {
        en: "View All",
        ru: "Посмотреть все",
        kz: "Барлығын қарау",
      },
      "no-recent": {
        en: "No recently viewed products",
        ru: "Нет недавно просмотренных товаров",
        kz: "Жақында қаралған тауарлар жоқ",
      },
    };

    return translations[key]?.[currentLanguage.code] || key;
  };

  const recentlyViewedProducts = items
    .map((id) => TEA_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 6); // Show max 6 products

  if (recentlyViewedProducts.length === 0) return null;

  const util = new CurrencyUtility(currentCurrency.code);

  return (
    <section className="py-6 sm:py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-sage-600" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              {getLocalizedText("recently-viewed")}
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sage-600 hover:text-sage-700 font-medium flex items-center gap-1 text-sm sm:text-base"
          >
            {getLocalizedText("view-all")}
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {recentlyViewedProducts.map((product, index) => {
            if (!product) return null;

            const priceCurrent = util.convert(product.prices.RUB.current, "RUB");

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square">
                    <OptimizedImage
                      src={product.image}
                      alt={product.nameEn}
                      aspectRatio="square"
                      className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 sm:p-3 md:p-4">
                    <h3 className="font-medium text-gray-900 text-xs sm:text-sm md:text-base line-clamp-2 mb-1 leading-tight">
                      {currentLanguage.code === "ru" && product.nameRu
                        ? product.nameRu
                        : product.nameEn}
                    </h3>
                    <div className="text-sage-700 font-semibold text-xs sm:text-sm md:text-base">
                      {util.format(priceCurrent)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
