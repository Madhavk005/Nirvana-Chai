import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  Grid,
  List,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ArrowUpDown,
  SlidersHorizontal,
  X,
  Filter,
  GitCompare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { useCartStore, useWishlistStore, useComparisonStore, useIsInComparison } from "../stores/useStore";
import { showToast } from "../components/Toast/ToastProvider";
import { CurrencyUtility } from "../utils/currency";
import { TEA_PRODUCTS } from "../data/teaProducts";
import { ProductGridSkeleton } from "../components/SkeletonLoader";
import { OptimizedImage } from "../components/OptimizedImage";
import { ProductQuickViewModal } from "../components/ProductQuickViewModal";
import { RecentlyViewedProducts } from "../components/RecentlyViewedProducts";

export default function Shop() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { formatPrice, currentCurrency, currentLanguage } =
    useLanguageCurrency();
  const { addItem: addToCart } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const { addItem: addToComparison } = useComparisonStore();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Initialize search term from URL params
  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  // Simplified categories
  const categories = [
    { id: "all", name: "All Teas", nameRu: "Все чаи", nameKz: "Барлық шайлар" },
    { id: "economy", name: "Economy", nameRu: "Эконом", nameKz: "Эконом" },
    {
      id: "standard",
      name: "Standard",
      nameRu: "Стандарт",
      nameKz: "Стандарт",
    },
    { id: "premium", name: "Premium", nameRu: "Премиум", nameKz: "Премиум" },
    { id: "luxury", name: "Luxury", nameRu: "Люкс", nameKz: "Люкс" },
  ];

  // Build products from TEA_PRODUCTS dataset with memoization
  const products = useMemo(() => {
    const util = new CurrencyUtility(currentCurrency.code);
    const mapTierToCategoryId: Record<string, string> = {
      Economy: "economy",
      Standard: "standard",
      Premium: "premium",
      Luxury: "luxury",
    };

    return TEA_PRODUCTS.map((p) => {
      const priceCurrent = util.convert(p.prices.RUB.current, "RUB");
      const originalConverted = util.convert(p.prices.RUB.original, "RUB");
      const description = `${p.brand} • ${p.weight} • ${p.teaGrade} • ${p.leafSize}`;

      return {
        id: p.id,
        name: p.nameEn,
        nameRu: p.nameRu,
        nameKz: p.nameEn,
        category: mapTierToCategoryId[p.category],
        price: priceCurrent || 0,
        originalPrice: originalConverted,
        rating: p.rating,
        reviews: Math.max(10, Math.round(40 * p.rating)),
        image: p.image,

        description,
        descriptionRu: description,
        descriptionKz: description,
        badges: [p.category, p.teaGrade].filter(Boolean),
        inStock: true,
        featured: p.category === "Luxury" || p.category === "Premium",
        brewTime: p.teaGrade.toLowerCase().includes("ctc")
          ? "2-3 min"
          : "3-5 min",
        caffeine: "Medium",
        tags: [p.teaGrade, p.leafSize, p.weight].filter(Boolean),
        weight: p.weight,
        origin: p.nameEn.toLowerCase().includes("kenyan")
          ? "Kenya"
          : p.nameEn.toLowerCase().includes("pakistani")
            ? "Pakistan"
            : p.nameEn.toLowerCase().includes("chinese")
              ? "China"
              : p.nameEn.toLowerCase().includes("indian")
                ? "India"
                : "International",
        altitude: p.weight,
      };
    });
  }, [currentCurrency.code]);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const searchableText = [
      product.name,
      product.nameRu || "",
      product.nameKz || "",
      product.description,
      ...product.tags,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchTerm === "" || searchableText.includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const handleAddToCart = (product: any) => {
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
      1,
    );
    showToast.addToCart(product.name);
  };

  const handleToggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast.success("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      showToast.addToWishlist(product.name);
    }
  };

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const getLocalizedName = (item: any) => {
    if (currentLanguage.code === "ru" && item.nameRu) return item.nameRu;
    if (currentLanguage.code === "kz" && item.nameKz) return item.nameKz;
    return item.name;
  };

  const getLocalizedDescription = (product: any) => {
    if (currentLanguage.code === "ru" && product.descriptionRu)
      return product.descriptionRu;
    if (currentLanguage.code === "kz" && product.descriptionKz)
      return product.descriptionKz;
    return product.description;
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "all";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {currentLanguage.code === "ru"
              ? "Наш Магазин Чая"
              : currentLanguage.code === "kz"
                ? "Біздің Шай Дүкені"
                : "Our Tea Shop"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {currentLanguage.code === "ru"
              ? "Откройте для себя нашу тщательно подобранную коллекцию премиум чая"
              : currentLanguage.code === "kz"
                ? "Біздің мұқият таңдалған премиум шай коллекциясын ашыңыз"
                : "Discover our carefully curated collection of premium teas"}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 xl:w-72">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 sm:p-4 flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="font-medium">
                    {currentLanguage.code === "ru"
                      ? "Фильтры"
                      : currentLanguage.code === "kz"
                        ? "Сүзгілер"
                        : "Filters"}
                  </span>
                  {hasActiveFilters && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {currentLanguage.code === "ru"
                        ? "Активны"
                        : currentLanguage.code === "kz"
                          ? "Белсенді"
                          : "Active"}
                    </span>
                  )}
                </div>
                <Filter className="h-5 w-5" />
              </button>
            </div>

            <div
              className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
            >
              {/* Search */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {currentLanguage.code === "ru"
                    ? "Поиск"
                    : currentLanguage.code === "kz"
                      ? "Іздеу"
                      : "Search"}
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={
                      currentLanguage.code === "ru"
                        ? "Поиск чая..."
                        : currentLanguage.code === "kz"
                          ? "Шай іздеу..."
                          : "Search teas..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {currentLanguage.code === "ru"
                    ? "Категории"
                    : currentLanguage.code === "kz"
                      ? "Санаттар"
                      : "Categories"}
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">
                        {getLocalizedName(category)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                >
                  {currentLanguage.code === "ru"
                    ? "Очистить фильтры"
                    : currentLanguage.code === "kz"
                      ? "Сүзгілерді тазарту"
                      : "Clear All Filters"}
                </button>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                {/* Results Counter */}
                <div className="text-sm text-gray-600">
                  {sortedProducts.length > 0 ? (
                    <>
                      {currentLanguage.code === "ru"
                        ? "Показано"
                        : currentLanguage.code === "kz"
                          ? "Көрсетілді"
                          : "Showing"}{" "}
                      {sortedProducts.length}{" "}
                      {currentLanguage.code === "ru"
                        ? "товаров"
                        : currentLanguage.code === "kz"
                          ? "тауарлар"
                          : "products"}
                    </>
                  ) : currentLanguage.code === "ru" ? (
                    "Товары не найдены"
                  ) : currentLanguage.code === "kz" ? (
                    "Тауарлар табылмады"
                  ) : (
                    "No products found"
                  )}
                </div>

                {/* Sort and View Controls */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="featured">
                        {currentLanguage.code === "ru"
                          ? "Рекомендуемые"
                          : currentLanguage.code === "kz"
                            ? "Ұсынылатын"
                            : "Featured"}
                      </option>
                      <option value="price-low">
                        {currentLanguage.code === "ru"
                          ? "Цена: по возрастанию"
                          : currentLanguage.code === "kz"
                            ? "Баға: өсу бойынша"
                            : "Price: Low to High"}
                      </option>
                      <option value="price-high">
                        {currentLanguage.code === "ru"
                          ? "Цена: по убыванию"
                          : currentLanguage.code === "kz"
                            ? "Баға: кему бойынша"
                            : "Price: High to Low"}
                      </option>
                      <option value="rating">
                        {currentLanguage.code === "ru"
                          ? "Высокий рейтинг"
                          : currentLanguage.code === "kz"
                            ? "Жоғары рейтинг"
                            : "Highest Rated"}
                      </option>
                      <option value="name">
                        {currentLanguage.code === "ru"
                          ? "По имени"
                          : currentLanguage.code === "kz"
                            ? "Атау бойынша"
                            : "Name"}
                      </option>
                    </select>
                    <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="flex bg-gray-100 rounded-md p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-600"}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-600"}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`grid gap-4 sm:gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    {/* Product Image */}
                    <div
                      className={`relative ${viewMode === "list" ? "w-32 sm:w-40 md:w-48 flex-shrink-0" : "aspect-square"}`}
                    >
                      <OptimizedImage
                        src={product.image}
                        alt={getLocalizedName(product)}
                        aspectRatio="square"
                        className="w-full h-full"
                      />

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                        <motion.button
                          onClick={() => handleQuickView(product)}
                          className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title={
                            currentLanguage.code === "ru"
                              ? "Быстрый просмотр"
                              : currentLanguage.code === "kz"
                                ? "Жылдам қарау"
                                : "Quick View"
                          }
                        >
                          <Eye className="h-4 w-4 text-gray-700" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleToggleWishlist(product)}
                          className={`backdrop-blur-sm p-2 rounded-full transition-colors ${
                            isInWishlist(product.id)
                              ? "bg-red-500 text-white"
                              : "bg-white/90 hover:bg-white text-gray-700"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                          />
                        </motion.button>
                        <motion.button
                          onClick={() => addToComparison(product.id)}
                          className={`backdrop-blur-sm p-2 rounded-full transition-colors ${
                            useIsInComparison(product.id)
                              ? "bg-blue-500 text-white"
                              : "bg-white/90 hover:bg-white text-gray-700"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title={
                            currentLanguage.code === "ru"
                              ? "Добавить к сравнению"
                              : currentLanguage.code === "kz"
                                ? "Салыстыруға қосу"
                                : "Add to Compare"
                          }
                        >
                          <GitCompare className="h-4 w-4" />
                        </motion.button>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.badges.slice(0, 2).map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div
                      className={`p-3 sm:p-4 ${viewMode === "list" ? "flex-1 flex flex-col" : ""}`}
                    >
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                          {getLocalizedName(product)}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                          {product.origin}
                        </p>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                          {getLocalizedDescription(product)}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div
                        className={`flex items-center justify-between ${viewMode === "list" ? "mt-4" : ""}`}
                      >
                        <div>
                          <div className="text-lg font-bold text-gray-900">
                            {new CurrencyUtility(currentCurrency.code).format(
                              product.price,
                            )}
                          </div>
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <div className="text-sm text-gray-500 line-through">
                                {new CurrencyUtility(
                                  currentCurrency.code,
                                ).format(product.originalPrice)}
                              </div>
                            )}
                        </div>

                        <motion.button
                          onClick={() => handleAddToCart(product)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium min-h-[44px]"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span className="hidden sm:inline">
                            {currentLanguage.code === "ru"
                              ? "В корзину"
                              : currentLanguage.code === "kz"
                                ? "Себетке"
                                : "Add to Cart"}
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 sm:py-12"
              >
                <div className="text-4xl sm:text-6xl mb-4">🫖</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {currentLanguage.code === "ru"
                    ? "Товары не найдены"
                    : currentLanguage.code === "kz"
                      ? "Тауарлар табылмады"
                      : "No products found"}
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  {currentLanguage.code === "ru"
                    ? "Попробуйте изменить критерии поиска"
                    : currentLanguage.code === "kz"
                      ? "Іздеу критерийлерін өзгертіп көріңіз"
                      : "Try adjusting your search criteria"}
                </p>
                <motion.button
                  onClick={clearFilters}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base min-h-[44px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage.code === "ru"
                    ? "Очистить фильтры"
                    : currentLanguage.code === "kz"
                      ? "Сүзгілерді тазарту"
                      : "Clear Filters"}
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Recently Viewed Products */}
      <RecentlyViewedProducts />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </div>
  );
}
