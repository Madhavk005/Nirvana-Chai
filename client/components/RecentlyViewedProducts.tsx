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
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-sage-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {getLocalizedText("recently-viewed")}
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sage-600 hover:text-sage-700 font-medium flex items-center gap-1 text-sm sm:text-base"
          >
            {getLocalizedText("view-all")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
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
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                      {currentLanguage.code === "ru" && product.nameRu
                        ? product.nameRu
                        : product.nameEn}
                    </h3>
                    <div className="text-sage-700 font-semibold text-sm">
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
