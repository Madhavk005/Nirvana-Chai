import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Globe,
  User,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { useCartStore } from "../stores/useStore";
import { FloatingActions } from "./FloatingActions";
import { AnnouncementBar } from "./AnnouncementBar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentLanguage,
    languages,
    setLanguage,
    currentCurrency,
    currencies,
    setCurrency,
    t,
  } = useLanguageCurrency();
  const { getTotalItems, toggleCart } = useCartStore();

  const languageRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        setIsCurrencyOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigation = [
    { name: t("nav.home", "Home"), href: "/" },
    { name: t("nav.shop", "Shop"), href: "/shop" },
    { name: t("nav.about", "About"), href: "/about" },
    { name: t("nav.contact", "Contact"), href: "/contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 border-b border-sage-300/50 transition-all duration-500 shadow-luxury">
        {/* Top Bar */}
        <div className="bg-sage-50/80 py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm border-b border-sage-300/30">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3 sm:space-x-6 text-sage-700">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">+7 702 201 0652</span>
                <span className="sm:hidden">Call</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>support@nirvanachai.kz</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-1 text-sage-700 hover:text-sage-800 transition-all duration-300 group cursor-pointer"
                >
                  <Globe className="h-3 w-3" />
                  <span className="font-medium">
                    {currentLanguage.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-300 ${isLanguageOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white/95 border border-sage-300 rounded-xl shadow-luxury-lg z-50 py-1 backdrop-blur-sm">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full px-4 py-2 text-left hover:bg-sage-50/80 flex items-center space-x-3 transition-all duration-200 cursor-pointer ${
                          currentLanguage.code === lang.code
                            ? "bg-sage-100 text-sage-900"
                            : "text-sage-700"
                        }`}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div className="flex flex-col">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-xs text-sage-600">
                            {lang.nativeName}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Currency Selector */}
              <div className="relative" ref={currencyRef}>
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="flex items-center space-x-1 text-sage-700 hover:text-sage-800 transition-all duration-300 cursor-pointer"
                >
                  <span className="font-bold">{currentCurrency.code}</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-300 ${isCurrencyOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isCurrencyOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white/95 border border-sage-300 rounded-xl shadow-luxury-lg z-50 py-1 backdrop-blur-sm">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        className={`w-full px-4 py-2 text-left hover:bg-sage-50/80 flex items-center justify-between transition-all duration-200 cursor-pointer ${
                          currentCurrency.code === currency.code
                            ? "bg-sage-100 text-sage-900"
                            : "text-sage-700"
                        }`}
                        onClick={() => {
                          setCurrency(currency);
                          setIsCurrencyOpen(false);
                        }}
                      >
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-sage-600">{currency.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-1 sm:space-x-2 group cursor-pointer"
            >
              <div className="text-xl sm:text-2xl font-heading font-semibold bg-gradient-to-r from-sage-600 to-sage-800 bg-clip-text text-transparent group-hover:from-sage-700 group-hover:to-sage-900 transition-all duration-500">
                <span className="hidden sm:inline">Nirvana Chai</span>
                <span className="sm:hidden">Nirvana</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-semibold transition-all duration-300 hover:text-sage-800 relative group cursor-pointer py-2 px-3 rounded-md ${
                    location.pathname === item.href
                      ? "text-sage-700 bg-sage-50 shadow-inner"
                      : "text-sage-600 hover:bg-sage-50/50"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 transform origin-left transition-all duration-300 ${
                      location.pathname === item.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:bg-sage-50/80 rounded-lg transition-all duration-300 hover:scale-105 shadow-sm text-sage-700 cursor-pointer backdrop-blur-sm sm:p-2.5"
                >
                  <Search className="h-4 w-4 lg:h-5 lg:w-5" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/95 border border-sage-300 rounded-xl shadow-luxury-lg z-50 p-4 backdrop-blur-sm">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-400" />
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
                          className="w-full pl-10 pr-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent text-sm"
                          autoFocus
                        />
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button
                          type="submit"
                          className="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                          {currentLanguage.code === "ru"
                            ? "Поиск"
                            : currentLanguage.code === "kz"
                              ? "Іздеу"
                              : "Search"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <Link
                to="/account"
                className="p-2 hover:bg-sage-50/80 rounded-lg transition-all duration-300 hover:scale-105 shadow-sm text-sage-700 cursor-pointer backdrop-blur-sm sm:p-2.5"
              >
                <User className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-sage-50/80 rounded-lg relative group transition-all duration-300 hover:scale-105 shadow-sm text-sage-700 cursor-pointer backdrop-blur-sm sm:p-2.5"
              >
                <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform duration-300" />
                {getTotalItems() > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-500 to-gold-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex items-center justify-center font-bold shadow-lg border-2 border-white">
                      {getTotalItems()}
                    </span>
                    <div className="absolute -top-1 -right-1 bg-gold-500 rounded-full h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 animate-ping opacity-60"></div>
                  </>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2.5 hover:bg-sage-50/80 rounded-lg transition-all duration-300 hover:scale-105 shadow-sm text-sage-700 cursor-pointer backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Enhanced Slide-in Drawer */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
              <div className="fixed right-0 top-0 h-full w-72 sm:w-80 bg-white/95 border-l border-sage-300 shadow-luxury-xl z-50 transform transition-all duration-500 ease-out">
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-heading font-semibold text-sage-800">
                      Menu
                    </h2>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-sage-100 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                  <nav className="space-y-3 sm:space-y-4">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-3 sm:px-4 py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:text-sage-800 hover:bg-sage-50 rounded-xl transform cursor-pointer ${
                          location.pathname === item.href
                            ? "text-sage-700 bg-sage-100 shadow-md"
                            : "text-sage-600"
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-sage-50 text-foreground border-t border-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-sage-600 to-sage-800 bg-clip-text text-transparent">
                Nirvana Chai
              </h3>
              <p className="text-sage-700 mb-3 sm:mb-4 text-sm sm:text-base">
                More than a drink — tea is a daily ritual, a quiet companion,
                and a global connector. Join us on a journey that spans
                continents and generations.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-sage-600">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">+7 702 201 0652</span>
                  <span className="sm:hidden">Call</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">support@nirvanachai.kz</span>
                  <span className="sm:hidden">Email</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg">📍</span>
                  <span className="hidden sm:inline">Раимбек 165а, Almaty, Kazakhstan</span>
                  <span className="sm:hidden">Almaty, KZ</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sage-800 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/shop"
                    className="text-sage-600 hover:text-sage-800 cursor-pointer transition-colors"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sage-600 hover:text-sage-800 cursor-pointer transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sage-600 hover:text-sage-800 cursor-pointer transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sage-800 text-sm sm:text-base">
                Customer Care
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/faq"
                    className="text-sage-600 hover:text-sage-800 cursor-pointer transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="text-sage-600 hover:text-sage-800 cursor-pointer transition-colors"
                  >
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="text-sage-600 hover:text-sage-800 cursor-pointer transition-colors"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-sage-600 hover:text-sage-800 cursor-pointer transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sage-300 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-sage-600">
            <p>&copy; 2025 Nirvana Chai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Actions */}
      <FloatingActions />
    </div>
  );
}
