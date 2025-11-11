import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Plus,
  Minus,
  ExternalLink,
} from "lucide-react";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { useCartStore, useWishlistStore } from "../stores/useStore";
import { showToast } from "./Toast/ToastProvider";
import { CurrencyUtility } from "../utils/currency";
import { OptimizedImage } from "./OptimizedImage";

interface Product {
  id: number;
  name: string;
  nameRu: string;
  nameKz: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  descriptionRu: string;
  descriptionKz: string;
  badges: string[];
  inStock: boolean;
  featured: boolean;
  brewTime: string;
  caffeine: string;
  tags: string[];
  origin: string;
  altitude: string;
  weight: string;
}

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
}: ProductQuickViewModalProps) {
  const navigate = useNavigate();
  const { formatPrice, currentCurrency, currentLanguage } =
    useLanguageCurrency();
  const { addItem: addToCart } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        region: product.origin,
        description: product.description,
        badges: product.badges,
        inStock: product.inStock,
        rating: product.rating,
        reviews: product.reviews,
        brewTime: product.brewTime,
        caffeine: product.caffeine,
        tags: product.tags,
        weight: product.weight,
      },
      quantity,
    );
    showToast.addToCart(product.name);
    onClose();
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast.success("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      showToast.addToWishlist(product.name);
    }
  };

  const getLocalizedName = () => {
    if (currentLanguage.code === "ru" && product.nameRu) return product.nameRu;
    if (currentLanguage.code === "kz" && product.nameKz) return product.nameKz;
    return product.name;
  };

  const getLocalizedDescription = () => {
    if (currentLanguage.code === "ru" && product.descriptionRu)
      return product.descriptionRu;
    if (currentLanguage.code === "kz" && product.descriptionKz)
      return product.descriptionKz;
    return product.description;
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
    onClose();
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] md:max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row h-full max-h-full">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Product Image */}
              <div className="lg:w-1/2 relative bg-gray-50 flex-shrink-0">
                <div className="aspect-square lg:aspect-auto lg:h-full min-h-[300px] lg:min-h-0">
                  <OptimizedImage
                    src={product.image}
                    alt={getLocalizedName()}
                    aspectRatio="square"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badges.slice(0, 2).map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full shadow-lg"
                    >
                      {badge}
                    </span>
                  ))}
                  {product.featured && (
                    <span className="px-3 py-1 text-xs font-medium bg-gold-500 text-white rounded-full shadow-lg">
                      {currentLanguage.code === "ru"
                        ? "Рекомендуемый"
                        : currentLanguage.code === "kz"
                          ? "Ұсынылатын"
                          : "Featured"}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
                <div className="space-y-4 sm:space-y-6">
                  {/* Header */}
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                      {getLocalizedName()}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600">{product.origin}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews}{" "}
                      {currentLanguage.code === "ru"
                        ? "отзывов"
                        : currentLanguage.code === "kz"
                          ? "пікірлер"
                          : "reviews"}
                      )
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {new CurrencyUtility(currentCurrency.code).format(
                        product.price,
                      )}
                    </span>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="text-xl text-gray-500 line-through">
                          {new CurrencyUtility(currentCurrency.code).format(
                            product.originalPrice,
                          )}
                        </span>
                      )}
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {getLocalizedDescription()}
                    </p>
                  </div>

                  {/* Product Details */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 py-3 sm:py-4 border-y border-gray-200">
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">
                        {currentLanguage.code === "ru"
                          ? "Время заваривания"
                          : currentLanguage.code === "kz"
                            ? "Қайнату уақыты"
                            : "Brew Time"}
                      </span>
                      <p className="text-sm text-gray-900 font-medium">{product.brewTime}</p>
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">
                        {currentLanguage.code === "ru"
                          ? "Кофеин"
                          : currentLanguage.code === "kz"
                            ? "Кофеин"
                            : "Caffeine"}
                      </span>
                      <p className="text-sm text-gray-900 font-medium">{product.caffeine}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">
                      {currentLanguage.code === "ru"
                        ? "Теги"
                        : currentLanguage.code === "kz"
                          ? "Тегтер"
                          : "Tags"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-sm font-medium text-gray-700 min-w-fit">
                      {currentLanguage.code === "ru"
                        ? "Количество"
                        : currentLanguage.code === "kz"
                          ? "Саны"
                          : "Quantity"}
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 sm:p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 sm:px-4 py-2 text-center font-medium min-w-[3rem] text-sm sm:text-base">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 sm:p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <motion.button
                      onClick={handleAddToCart}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium min-h-[48px] text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                      {currentLanguage.code === "ru"
                        ? "Добавить в корзину"
                        : currentLanguage.code === "kz"
                          ? "Себетке қосу"
                          : "Add to Cart"}
                    </motion.button>

                    <motion.button
                      onClick={handleToggleWishlist}
                      className={`px-3 sm:px-4 py-3 border rounded-lg transition-colors flex items-center justify-center min-h-[48px] min-w-[48px] ${
                        isInWishlist(product.id)
                          ? "border-red-300 bg-red-50 text-red-600"
                          : "border-gray-300 hover:bg-gray-50 text-gray-700"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Heart
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          isInWishlist(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </motion.button>

                    <motion.button
                      onClick={handleViewDetails}
                      className="px-3 sm:px-4 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center min-h-[48px] min-w-[48px]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
