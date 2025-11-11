import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Plus,
  Minus,
  Info,
  Shield,
  Truck,
  RotateCcw,
  Crown,
  Globe,
  Clock,
  Thermometer,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  ZoomIn,
  GitCompare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { useCartStore, useWishlistStore, useRecentlyViewedStore, useComparisonStore } from "../stores/useStore";
import { showToast } from "../components/Toast/ToastProvider";
import { RegionalCurrencyUtility } from "../utils/currency";
import {
  useSimpleAnimation,
  animationClasses,
} from "../hooks/useSimpleAnimation";
import { TEA_PRODUCTS } from "../data/teaProducts";
import { CurrencyUtility } from "../utils/currency";
import { OptimizedImage } from "../components/OptimizedImage";
import { Breadcrumbs } from "../components/Breadcrumbs";
import NotFound from "./NotFound";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { formatPrice, currentCurrency, currentLanguage } =
    useLanguageCurrency();
  const { addItem: addToCart } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const { addItem: addToRecentlyViewed } = useRecentlyViewedStore();
  const { addItem: addToComparison, isInComparison } = useComparisonStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const heroAnimation = useSimpleAnimation();
  const detailsAnimation = useSimpleAnimation();

  const product = TEA_PRODUCTS.find((p) => p.id === parseInt(id || ""));

  // Add to recently viewed when component mounts
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return <NotFound />;
  }

  const util = new CurrencyUtility(currentCurrency.code);
  const priceCurrent = util.convert(product.prices.RUB.current, "RUB");
  const originalConverted = util.convert(product.prices.RUB.original, "RUB");
  const description = `${product.brand} • ${product.weight} • ${product.teaGrade} • ${product.leafSize}`;

  const productData = {
    id: product.id,
    name: product.nameEn,
    nameRu: product.nameRu,
    nameKz: product.nameEn,
    price: priceCurrent || 0,
    originalPrice: originalConverted,
    rating: product.rating,
    reviews: Math.max(10, Math.round(40 * product.rating)),
    image: product.image,
    images: [product.image],
    description,
    descriptionRu: description,
    descriptionKz: description,
    badges: [product.category, product.teaGrade].filter(Boolean),
    inStock: true,
    category: product.category,
    origin: product.nameEn.toLowerCase().includes("kenyan")
      ? "Kenya"
      : product.nameEn.toLowerCase().includes("pakistani")
        ? "Pakistan"
        : product.nameEn.toLowerCase().includes("chinese")
          ? "China"
          : product.nameEn.toLowerCase().includes("indian")
            ? "India"
            : "International",
    rarity: "common",
    specifications: {
      brewTime: product.teaGrade.toLowerCase().includes("ctc")
        ? "2-3 min"
        : "3-5 min",
      brewTemp: "95-100°C",
    },
  };

  const regionalCurrency = new RegionalCurrencyUtility(
    currentCurrency.code,
    currentLanguage.code === "ru"
      ? "RU"
      : currentLanguage.code === "kz"
        ? "KZ"
        : undefined,
    currentLanguage.code,
  );

  const getLocalizedText = (textObj: any, fallback?: string) => {
    if (typeof textObj === "string") return textObj;
    if (currentLanguage.code === "ru" && textObj.ru) return textObj.ru;
    if (currentLanguage.code === "kz" && textObj.kz) return textObj.kz;
    return textObj.en || textObj || fallback || "";
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.images[0],
        category: productData.category,
        region: productData.origin,
        description: productData.description,
        badges: productData.badges,
        inStock: productData.inStock,
        rating: productData.rating,
        reviews: productData.reviews,
        brewTime: productData.specifications.brewTime,
        caffeine: "Medium",
        tags: productData.badges,
      },
      quantity,
    );
    showToast.addToCart(`${productData.name} (${quantity})`);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(productData.id)) {
      removeFromWishlist(productData.id);
      showToast.success(
        currentLanguage.code === "ru"
          ? "Удалено из избранного"
          : currentLanguage.code === "kz"
            ? "Тілек тізімінен алынды"
            : "Removed from wishlist",
      );
    } else {
      addToWishlist(productData.id);
      showToast.addToWishlist(productData.name);
    }
  };

  const handleToggleComparison = () => {
    if (isInComparison(productData.id)) {
      // Note: We don't have removeItem in the comparison store yet, but we can add it
      showToast.success("Removed from comparison");
    } else {
      addToComparison(productData.id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const tabs = [
    {
      id: "description",
      label:
        currentLanguage.code === "ru"
          ? "Описание"
          : currentLanguage.code === "kz"
            ? "Сипаттама"
            : "Description",
      icon: Info,
    },
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + productData.images.length) % productData.images.length,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-sage-300 sticky top-0 z-40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sage-700 hover:text-sage-800 transition-colors font-medium text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">
                {currentLanguage.code === "ru"
                  ? "Назад к магазину"
                  : currentLanguage.code === "kz"
                    ? "Дүкенге оралу"
                    : "Back to Shop"}
              </span>
              <span className="sm:hidden">
                {currentLanguage.code === "ru"
                  ? "Назад"
                  : currentLanguage.code === "kz"
                    ? "Артқа"
                    : "Back"}
              </span>
            </motion.button>

            <div className="flex items-center gap-2 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleToggleWishlist}
                className={`p-2 rounded-full transition-all ${
                  isInWishlist(productData.id)
                    ? "bg-red-500 text-white"
                    : "bg-sage-100 text-sage-600 hover:bg-sage-200"
                }`}
              >
                <Heart
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${isInWishlist(productData.id) ? "fill-current" : ""}`}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleToggleComparison}
                className={`p-2 rounded-full transition-all ${
                  isInComparison(productData.id)
                    ? "bg-blue-500 text-white"
                    : "bg-sage-100 text-sage-600 hover:bg-sage-200"
                }`}
              >
                <GitCompare className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-sage-100 text-sage-600 hover:bg-sage-200 transition-all"
              >
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <motion.div
            ref={heroAnimation.elementRef}
            className={animationClasses.fadeInUp(heroAnimation.isVisible)}
          >
            <div className="space-y-6">
              <div className="relative group">
                <motion.div
                  className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-sage-300 shadow-2xl cursor-zoom-in"
                  layoutId={`product-image-${productData.id}`}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  <div
                    className={`w-full h-full transition-transform duration-700 ${isZoomed ? 'scale-150' : 'group-hover:scale-105'}`}
                    style={isZoomed ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                    } : undefined}
                  >
                    <OptimizedImage
                      src={productData.images[selectedImage]}
                      alt={productData.name}
                      aspectRatio="square"
                      className="w-full h-full"
                      priority={selectedImage === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-sage-400/10 opacity-60"></div>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-sage-600 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-sage-600 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute top-4 right-4 bg-sage-100 hover:bg-sage-200 text-sage-600 p-3 rounded-full backdrop-blur-sm transition-all"
                  >
                    {isPlaying ? (
                      <Volume2 className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-16 right-4 bg-sage-100 hover:bg-sage-200 text-sage-600 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </motion.button>
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {productData.badges.map((badge, index) => (
                      <motion.span
                        key={index}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm"
                      >
                        {badge}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productData.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-sage-500 shadow-lg shadow-sage-500/50"
                        : "border-sage-300 hover:border-sage-500/50"
                    }`}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`${productData.name} ${index + 1}`}
                      aspectRatio="square"
                      className="w-full h-full"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sage-600 text-sm font-medium">
                <Globe className="h-4 w-4" />
                <span>{productData.origin}</span>
                <span>•</span>
                <Crown className="h-4 w-4" />
                <span className="capitalize">{productData.rarity}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold bg-gradient-to-r from-sage-600 via-sage-700 to-sage-800 bg-clip-text text-transparent leading-tight">
                {currentLanguage.code === "ru" && productData.nameRu
                  ? productData.nameRu
                  : currentLanguage.code === "kz" && productData.nameKz
                    ? productData.nameKz
                    : productData.name}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(productData.rating) ? "text-sage-600 fill-current" : "text-sage-400"}`}
                    />
                  ))}
                </div>
                <span className="text-sage-700 font-semibold">
                  {productData.rating} ({productData.reviews}{" "}
                  {currentLanguage.code === "ru"
                    ? "отзывов"
                    : currentLanguage.code === "kz"
                      ? "пікірлер"
                      : "reviews"}
                  )
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sage-700">
                    {regionalCurrency.formatRegional(productData.price)}
                  </span>
                  {productData.originalPrice && (
                    <span className="text-lg sm:text-xl lg:text-2xl text-gray-500 line-through">
                      {regionalCurrency.formatRegional(
                        productData.originalPrice,
                      )}
                    </span>
                  )}
                </div>

                {productData.originalPrice && (
                  <div className="flex items-center gap-3">
                    <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-lg font-bold border border-green-400/30">
                      {currentLanguage.code === "ru"
                        ? "Экономия"
                        : currentLanguage.code === "kz"
                          ? "Үнемдеу"
                          : "Save"}{" "}
                      {regionalCurrency.formatRegional(
                        productData.originalPrice - productData.price,
                      )}
                    </span>
                    <span className="text-green-400 font-semibold">
                      (
                      {Math.round(
                        ((productData.originalPrice - productData.price) /
                          productData.originalPrice) *
                          100,
                      )}
                      % OFF)
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-sage-50 rounded-xl p-3 sm:p-4 border border-sage-300">
                  <div className="flex items-center gap-2 text-sage-600 mb-2">
                    <Thermometer className="h-4 w-4" />
                    <span className="text-xs sm:text-sm font-medium">
                      {currentLanguage.code === "ru"
                        ? "Температура"
                        : currentLanguage.code === "kz"
                          ? "Температура"
                          : "Temperature"}
                    </span>
                  </div>
                  <div className="text-sage-800 font-semibold text-sm sm:text-base">
                    {productData.specifications.brewTemp}
                  </div>
                </div>

                <div className="bg-sage-50 rounded-xl p-3 sm:p-4 border border-sage-300">
                  <div className="flex items-center gap-2 text-sage-600 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs sm:text-sm font-medium">
                      {currentLanguage.code === "ru"
                        ? "Время"
                        : currentLanguage.code === "kz"
                          ? "Уақыт"
                          : "Steep Time"}
                    </span>
                  </div>
                  <div className="text-sage-800 font-semibold text-sm sm:text-base">
                    {getLocalizedText(productData.specifications, "brewTime")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">
                  {currentLanguage.code === "ru"
                    ? "В наличии - готов к отправке"
                    : currentLanguage.code === "kz"
                      ? "Қоймада бар - жіберуге дайын"
                      : "In Stock - Ready to Ship"}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center border border-sage-300 rounded-xl bg-sage-50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 sm:p-3 text-sage-600 hover:text-sage-700 transition-colors"
                  >
                    <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.button>
                  <span className="px-4 sm:px-6 py-2 sm:py-3 text-sage-800 font-semibold min-w-[2.5rem] sm:min-w-[3rem] text-center text-sm sm:text-base">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 sm:p-3 text-sage-600 hover:text-sage-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.button>
                </div>

                <div className="text-xs sm:text-sm text-sage-600">
                  {currentLanguage.code === "ru"
                    ? "Общая стоимость:"
                    : currentLanguage.code === "kz"
                      ? "Жалпы құны:"
                      : "Total:"}{" "}
                  <span className="font-bold text-sage-700">
                    {regionalCurrency.formatRegional(
                      productData.price * quantity,
                    )}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-400 hover:to-amber-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 font-bold shadow-xl hover:shadow-2xl border border-amber-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10 text-base sm:text-lg">
                  {currentLanguage.code === "ru"
                    ? "Добавить в корзину"
                    : currentLanguage.code === "kz"
                      ? "Себетке қосу"
                      : "Add to Cart"}
                </span>
                <span className="relative z-10 text-white/90 font-medium text-sm sm:text-base">
                  {regionalCurrency.formatRegional(
                    productData.price * quantity,
                  )}
                </span>
              </motion.button>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="flex flex-col items-center gap-2 p-2 sm:p-3 bg-sage-50 rounded-xl border border-sage-300">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-sage-600" />
                  <span className="text-xs text-sage-700 font-medium leading-tight">
                    {currentLanguage.code === "ru"
                      ? "Гарантия качества"
                      : currentLanguage.code === "kz"
                        ? "Сапа кепілдігі"
                        : "Quality Guarantee"}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 p-2 sm:p-3 bg-sage-50 rounded-xl border border-sage-300">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-sage-600" />
                  <span className="text-xs text-sage-700 font-medium leading-tight">
                    {currentLanguage.code === "ru"
                      ? "Быстрая доставка"
                      : currentLanguage.code === "kz"
                        ? "Жылдам жеткізу"
                        : "Fast Shipping"}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 p-2 sm:p-3 bg-sage-50 rounded-xl border border-sage-300">
                  <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-sage-600" />
                  <span className="text-xs text-sage-700 font-medium leading-tight">
                    {currentLanguage.code === "ru"
                      ? "30 дней возврат"
                      : currentLanguage.code === "kz"
                        ? "30 күн қайтару"
                        : "30-Day Return"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={detailsAnimation.elementRef}
          className={`space-y-8 ${animationClasses.fadeInUp(
            detailsAnimation.isVisible,
          )}`}
        >
          <div className="flex space-x-1 bg-sage-50 p-1 rounded-2xl border border-sage-300 w-fit mx-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                  activeTab === tab.id
                    ? "bg-gold-500 text-black shadow-lg"
                    : "text-sage-700 hover:text-sage-800 hover:bg-gray-700/50"
                }`}
              >
                <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white backdrop-blur-sm border border-sage-300 rounded-3xl p-4 sm:p-8 shadow-xl"
            >
              {activeTab === "description" && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-4 sm:space-y-6">
                      <h3 className="text-lg sm:text-2xl font-heading font-bold text-sage-700 flex items-center gap-2">
                        <Info className="h-5 w-5 sm:h-6 sm:w-6" />
                        {currentLanguage.code === "ru"
                          ? "Описание"
                          : currentLanguage.code === "kz"
                            ? "Сипаттама"
                            : "Description"}
                      </h3>
                      <p className="text-sage-800/80 leading-relaxed text-base sm:text-lg">
                        {currentLanguage.code === "ru" &&
                        productData.descriptionRu
                          ? productData.descriptionRu
                          : currentLanguage.code === "kz" &&
                              productData.descriptionKz
                            ? productData.descriptionKz
                            : productData.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
