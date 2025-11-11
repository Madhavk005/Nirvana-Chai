import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Globe,
  Award,
  Heart,
  Recycle,
  Package,
  MapPin,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import {
  useSimpleAnimation,
  animationClasses,
  useHoverAnimation,
} from "../hooks/useSimpleAnimation";
import { useTranslation } from "react-i18next";
import { CompactTrustIndicators } from "../components/TrustIndicators";
import { TEA_PRODUCTS } from "../data/teaProducts";
import { CurrencyUtility } from "../utils/currency";

// Features array - moved before hooks to prevent reference error
const features = [
  {
    key: "expertise",
    icon: <Award className="h-12 w-12 text-sage-600" />,
    title: "Three generations of mastery",
    description:
      "Traditional wisdom passed down through generations of tea artisans",
  },
  {
    key: "global",
    icon: <Globe className="h-12 w-12 text-sage-600" />,
    title: "Ethically sourced worldwide",
    description: "Premium teas from the world's most celebrated tea gardens",
  },
  {
    key: "curated",
    icon: <Leaf className="h-12 w-12 text-sage-600" />,
    title: "Mindfully crafted blends",
    description:
      "Each blend tells a story of flavor, aroma, and cultural heritage",
  },
  {
    key: "pure",
    icon: <Heart className="h-12 w-12 text-sage-600" />,
    title: "Pure, natural ingredients",
    description: "No artificial additives — just the pure essence of tea",
  },
  {
    key: "sustainable",
    icon: <Recycle className="h-12 w-12 text-sage-600" />,
    title: "Sustainably cultivated",
    description: "Supporting communities and preserving tea traditions",
  },
  {
    key: "fresh",
    icon: <Package className="h-12 w-12 text-sage-600" />,
    title: "Peak freshness guaranteed",
    description: "From garden to cup in days, not months",
  },
];

// Regions data for Global Sourcing section
const regions = [
  {
    name: "Darjeeling",
    country: "India",
    description: "Elegant, floral teas from the Himalayan foothills",
    image: "🌄",
    color: "from-amber-50 to-amber-100",
  },
  {
    name: "Assam",
    country: "India",
    description: "Bold, malty black teas with deep character",
    image: "🏔️",
    color: "from-emerald-50 to-forest-50",
  },
  {
    name: "Kenya",
    country: "Kenya",
    description: "Bright, brisk flavors ideal for rich blends",
    image: "🌿",
    color: "from-sky-50 to-sky-100",
  },
  {
    name: "Sri Lanka (Ceylon)",
    country: "Sri Lanka",
    description: "Crisp, citrusy profiles from high-grown estates",
    image: "🌴",
    color: "from-orange-50 to-orange-100",
  },
  {
    name: "China",
    country: "China",
    description:
      "Ancient tea traditions and refined green, white, and oolong varieties",
    image: "🏮",
    color: "from-red-50 to-red-100",
  },
  {
    name: "Vietnam",
    country: "Vietnam",
    description: "Smooth, delicate teas with unique regional character",
    image: "🌾",
    color: "from-purple-50 to-purple-100",
  },
];

export default function Index() {
  const {
    t: tLegacy,
    formatPrice,
    currentCurrency,
    detectedLocation,
    shippingInfo,
    isLocationDetected,
  } = useLanguageCurrency();
  const { t } = useTranslation();

  // Animation hooks used by various sections
  const heroAnimation = useSimpleAnimation({ delay: 100 });
  const featuresAnimation = useSimpleAnimation({ delay: 150 });
  const newsletterAnimation = useSimpleAnimation({ delay: 200 });

  return (
    <>
      <Helmet>
        <title>Nirvana Chai - Premium World Teas & Ethical Sourcing</title>
        <meta
          name="description"
          content="Discover premium teas from global gardens. Ethically sourced, artisan blends for mindful moments. Free shipping on orders over $50."
        />
        <meta
          property="og:title"
          content="Nirvana Chai - Premium World Teas & Ethical Sourcing"
        />
        <meta
          property="og:description"
          content="Discover premium teas from global gardens. Ethically sourced, artisan blends for mindful moments. Free shipping on orders over $50."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://nirvanachai.kz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Nirvana Chai - Premium World Teas & Ethical Sourcing"
        />
        <meta
          name="twitter:description"
          content="Discover premium teas from global gardens. Ethically sourced, artisan blends for mindful moments."
        />
        <meta
          name="keywords"
          content="premium tea, ethical sourcing, artisan blends, world teas, nirvana chai"
        />
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section - Minimal Design with Subtle Background */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <video
              src="/vid/44575-439924989.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-12 sm:py-16">
            <div
              ref={heroAnimation.elementRef}
              className={`grid grid-cols-1 gap-8 sm:gap-12 lg:gap-16 items-center ${animationClasses.fadeInUp(heroAnimation.isVisible)}`}
            >
              {/* Left Content */}
              <div className="space-y-6 sm:space-y-8 text-white">
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    {t("hero.title1", "Discover Your")}
                    <br />
                    <span className="text-emerald-400">
                      {t("hero.title2", "Perfect Cup")}
                    </span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-lg">
                  {t(
                    "hero.subtitle",
                    "Experience the finest teas from around the world, carefully selected for quality and taste.",
                  )}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/shop"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    {t("hero.cta_primary", "Shop Now")}
                  </Link>

                  <Link
                    to="/about"
                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-center text-sm sm:text-base"
                  >
                    {t("hero.cta_secondary", "Learn More")}
                  </Link>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* Why Choose Nirvanachai Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-background"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-sage-800 mb-4 sm:mb-6">
                {t("why_choose.title", "Why Tea Lovers Choose Nirvanachai")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-sage-600 max-w-4xl mx-auto leading-relaxed">
                {t(
                  "why_choose.subtitle",
                  "Discover the difference that three generations of passion, premium sourcing, and mindful curation make in every sip.",
                )}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {features.map((feature, index) => {
                const hoverAnimation = useHoverAnimation();

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                    className={`
                    bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 text-center group cursor-pointer flex flex-col h-full
                    hover:scale-105 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                  `}
                    {...hoverAnimation.hoverProps}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-center mb-4 sm:mb-6"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-heading font-semibold text-sage-800 mb-3 sm:mb-4 group-hover:text-sage-900 transition-colors">
                      {t(`why_choose.${feature.key}`, feature.title)}
                    </h3>
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-sage-600 leading-relaxed text-xs sm:text-sm lg:text-base group-hover:text-sage-700 transition-colors w-full">
                        {t(
                          `why_choose.${feature.key}_desc`,
                          feature.description,
                        )}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Global Sourcing Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 sm:py-16 lg:py-20 bg-sage-50"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-sage-800 mb-3 sm:mb-4">
                {t("global_sourcing.title", "Global Sourcing, Local Soul")}
              </h2>
              <p className="text-base sm:text-lg text-sage-600 max-w-3xl mx-auto leading-relaxed">
                {t(
                  "global_sourcing.subtitle",
                  "While proudly rooted in India's rich tea heritage, Nirvanachai goes beyond borders to source handpicked, high-grade teas from some of the most celebrated tea-growing regions in the world:",
                )}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 items-stretch">
              {regions.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-br ${region.color} border border-border rounded-2xl p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] cursor-pointer`}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4 flex justify-center"
                  >
                    {region.image}
                  </motion.div>
                  <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-heading font-semibold text-sage-800 mb-1 sm:mb-2 text-center leading-tight">
                    {region.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-sage-600 mb-1 sm:mb-2 lg:mb-3 text-center">
                    {region.country}
                  </div>
                  <div className="flex-grow flex items-center">
                    <p className="text-sage-700 leading-relaxed text-xs sm:text-sm lg:text-base w-full text-center">
                      {region.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="text-center mt-12 lg:mt-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  Learn Our Story
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Products Preview */}
        <section className="py-12 sm:py-16 lg:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-sage-800 mb-3 sm:mb-4">
                {t("featured.title", "Featured Blends")}
              </h2>
              <p className="text-base sm:text-lg text-sage-600 max-w-2xl mx-auto">
                {t(
                  "featured.subtitle",
                  "Discover our most beloved tea collections, carefully crafted to bring you moments of tranquility and joy.",
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {(() => {
                // Select 3 premium/luxury products with highest ratings
                const premiumProducts = TEA_PRODUCTS.filter(
                  (p) => p.category === "Premium" || p.category === "Luxury",
                )
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3);

                const util = new CurrencyUtility(currentCurrency.code);

                return premiumProducts.map((product, index) => {
                  const price = util.convert(product.prices.RUB.current, "RUB");
                  const originalPrice =
                    product.prices.RUB.original !== product.prices.RUB.current
                      ? util.convert(product.prices.RUB.original, "RUB")
                      : undefined;

                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-sage-300 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                    >
                      <div className="aspect-square bg-gradient-to-br from-sage-50 to-forest-50 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.nameEn}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 sm:p-6 flex flex-col flex-grow">
                        <h3 className="text-lg sm:text-xl font-heading font-semibold text-sage-800 mb-2 text-center">
                          {product.nameEn}
                        </h3>
                        <p className="text-sage-600 mb-3 sm:mb-4 flex-grow text-center text-sm sm:text-base">
                          {product.brand} • {product.weight} •{" "}
                          {product.teaGrade}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-auto">
                          <div className="flex flex-col text-center sm:text-left">
                            <span className="text-xl sm:text-2xl font-semibold text-sage-800">
                              {formatPrice(price)}
                            </span>
                            {originalPrice && (
                              <span className="text-sm text-sage-400 line-through">
                                {formatPrice(originalPrice)}
                              </span>
                            )}
                          </div>
                          <button className="bg-sage-600 hover:bg-sage-700 text-white px-4 sm:px-6 py-2 rounded-full transition-colors text-sm sm:text-base w-full sm:w-auto">
                            {t("featured.add_to_cart", "Add to Cart")}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="inline-flex items-center border-2 border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 group"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Signup - Enhanced with FOMO and value props */}
        <section className="py-12 sm:py-16 lg:py-20 bg-sage-800 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div
              className={
                'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.2"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-50'
              }
            ></div>
          </div>

          <div
            ref={newsletterAnimation.elementRef}
            className={`relative max-w-5xl mx-auto px-3 sm:px-4 text-center ${animationClasses.fadeInUp(newsletterAnimation.isVisible)}`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold mb-3 sm:mb-4">
              {t("newsletter.title", "Join 10,000+ Tea Enthusiasts")}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-sage-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
              {t(
                "newsletter.subtitle",
                "Get exclusive access to new blends, brewing secrets, and special offers before anyone else.",
              )}
            </p>

            {/* Value propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center text-sage-200 text-sm sm:text-base">
                {t("newsletter.benefit1", "🎁 20% off your first order")}
              </div>
              <div className="flex items-center justify-center text-sage-200 text-sm sm:text-base">
                {t("newsletter.benefit2", "🍃 Early access to new blends")}
              </div>
              <div className="flex items-center justify-center text-sage-200 text-sm sm:text-base">
                {t("newsletter.benefit3", "📚 Free brewing guides")}
              </div>
            </div>

            {/* Enhanced signup form */}
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                <input
                  type="email"
                  placeholder={t(
                    "newsletter.email_placeholder",
                    "Enter your email address",
                  )}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full text-sage-800 focus:outline-none focus:ring-2 focus:ring-forest-400 transition-all duration-300 text-sm sm:text-base"
                />
                <button className="bg-forest-500 hover:bg-forest-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  {t("newsletter.subscribe", "Get Exclusive Access")}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-sage-300">
                {t(
                  "newsletter.no_spam",
                  "Premium content only. Unsubscribe anytime.",
                )}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
