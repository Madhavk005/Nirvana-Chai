import { useState, useEffect } from "react";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  ShoppingBag,
  CreditCard,
  MapPin,
  Bell,
  Shield,
  Edit,
  Save,
  X,
} from "lucide-react";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { useCartStore, useWishlistStore, useUIStore } from "../stores/useStore";
import { useTranslation } from "react-i18next";

export default function Account() {
  const { formatPrice } = useLanguageCurrency();
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "",
    address: "",
    city: "",
    country: "Kazakhstan",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Use Zustand stores
  const { items: cartItems, getTotalPrice } = useCartStore();
  const { items: wishlistItems, removeItem: removeFromWishlist } =
    useWishlistStore();
  const { addNotification } = useUIStore();

  // Mock user data - in real app this would come from API
  const [userOrders] = useState([
    {
      id: "12345",
      date: "2025-01-10",
      status: "Delivered",
      total: 89.97,
      items: ["Earl Grey Supreme", "Dragon Well Green", "Morning Serenity"],
    },
    {
      id: "12344",
      date: "2025-01-05",
      status: "In Transit",
      total: 45.99,
      items: ["Himalayan Gold"],
    },
    {
      id: "12343",
      date: "2024-12-28",
      status: "Delivered",
      total: 124.96,
      items: [
        "Assam Breakfast",
        "Evening Bliss",
        "Iron Goddess Oolong",
        "Silver Needle White",
      ],
    },
  ]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call login API
      const response = await fetch("/api/forms/login-attempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
        }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        addNotification(
          "success",
          i18n.language === "ru" ? "Успешный вход!" : "Login successful!",
        );
      } else {
        addNotification(
          "error",
          i18n.language === "ru" ? "Ошибка входа" : "Login failed",
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      addNotification(
        "error",
        i18n.language === "ru" ? "Ошибка подключения" : "Connection error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      addNotification(
        "error",
        i18n.language === "ru"
          ? "Пароли не совпадают"
          : "Passwords do not match",
      );
      return;
    }

    setIsLoading(true);

    try {
      // Call register API
      const response = await fetch("/api/forms/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
        }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setUserProfile({
          ...userProfile,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
        });
        addNotification(
          "success",
          i18n.language === "ru"
            ? "Регистрация успешна!"
            : "Registration successful!",
        );
      } else {
        addNotification(
          "error",
          i18n.language === "ru" ? "Ошибка регистрации" : "Registration failed",
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      addNotification(
        "error",
        i18n.language === "ru" ? "Ошибка подключения" : "Connection error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    // In real app, this would call an API to update user profile
    setIsEditingProfile(false);
    addNotification(
      "success",
      i18n.language === "ru" ? "Профиль обновлен!" : "Profile updated!",
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: "", password: "" });
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    addNotification(
      "info",
      i18n.language === "ru" ? "Выход выполнен" : "Logged out",
    );
  };

  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  const cartTotal = getTotalPrice();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-off-white to-clay-50 py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold text-sage-800 mb-2">
                {i18n.language === "ru"
                  ? "Добро пожаловать в Nirvanachai"
                  : "Welcome to Nirvanachai"}
              </h1>
              <p className="text-sage-600">
                {i18n.language === "ru"
                  ? "Войдите в аккаунт или создайте новый"
                  : "Sign in to your account or create a new one"}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex mb-8 bg-sage-50 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "login"
                    ? "bg-white text-sage-800 shadow-sm"
                    : "text-sage-600 hover:text-sage-800"
                }`}
              >
                {i18n.language === "ru" ? "Войти" : "Sign In"}
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "register"
                    ? "bg-white text-sage-800 shadow-sm"
                    : "text-sage-600 hover:text-sage-800"
                }`}
              >
                {i18n.language === "ru" ? "Создать аккаунт" : "Create Account"}
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    {i18n.language === "ru" ? "Email адрес" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    {i18n.language === "ru" ? "Пароль" : "Password"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400 hover:text-sage-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  {isLoading
                    ? i18n.language === "ru"
                      ? "Вход..."
                      : "Signing In..."
                    : i18n.language === "ru"
                      ? "Войти"
                      : "Sign In"}
                </button>

                <div className="text-center">
                  <a
                    href="#"
                    className="text-sm text-sage-600 hover:text-sage-800"
                  >
                    {i18n.language === "ru"
                      ? "Забыли пароль?"
                      : "Forgot your password?"}
                  </a>
                </div>
              </form>
            )}

            {/* Register Form */}
            {activeTab === "register" && (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      {i18n.language === "ru" ? "Имя" : "First Name"}
                    </label>
                    <input
                      type="text"
                      value={registerData.firstName}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          firstName: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      {i18n.language === "ru" ? "Фамилия" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      value={registerData.lastName}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          lastName: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    {i18n.language === "ru" ? "Email адрес" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    {i18n.language === "ru" ? "Пароль" : "Password"}
                  </label>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    {i18n.language === "ru"
                      ? "Подтвердите пароль"
                      : "Confirm Password"}
                  </label>
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  {isLoading
                    ? i18n.language === "ru"
                      ? "Создание аккаунта..."
                      : "Creating Account..."
                    : i18n.language === "ru"
                      ? "Создать аккаунт"
                      : "Create Account"}
                </button>

                <p className="text-xs text-sage-500 text-center">
                  {i18n.language === "ru"
                    ? "Создавая аккаунт, вы соглашаетесь с нашими Условиями обслуживания и Политикой конфиденциальности."
                    : "By creating an account, you agree to our Terms of Service and Privacy Policy."}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Logged in dashboard
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-heading font-bold text-sage-800">
                {i18n.language === "ru" ? "Добро пожаловать," : "Welcome back,"}{" "}
                {userProfile.firstName}!
              </h1>
              <p className="text-sage-600 mt-1">
                {i18n.language === "ru"
                  ? "Управляйте своими заказами, предпочтениями и чайным путешествием"
                  : "Manage your orders, preferences, and tea journey"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {i18n.language === "ru" ? "Выйти" : "Sign Out"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sage-800">
                    {userProfile.firstName} {userProfile.lastName}
                  </h3>
                  <p className="text-sm text-sage-600">{userProfile.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <a
                  href="#orders"
                  className="flex items-center gap-3 p-3 rounded-lg bg-sage-50 text-sage-800"
                >
                  <Package className="h-5 w-5" />
                  {i18n.language === "ru" ? "Мои заказы" : "My Orders"}
                </a>
                <a
                  href="#wishlist"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-50 text-sage-600"
                >
                  <Heart className="h-5 w-5" />
                  {i18n.language === "ru" ? "Избранное" : "Wishlist"}
                </a>
                <a
                  href="#settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-50 text-sage-600"
                >
                  <Settings className="h-5 w-5" />
                  {i18n.language === "ru"
                    ? "Настройки аккаунта"
                    : "Account Settings"}
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-sage-800">
                  {userOrders.length}
                </div>
                <div className="text-sm text-sage-600">
                  {i18n.language === "ru" ? "Всего заказов" : "Total Orders"}
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-sage-800">
                  {formatPrice(totalSpent)}
                </div>
                <div className="text-sm text-sage-600">
                  {i18n.language === "ru" ? "Всего потрачено" : "Total Spent"}
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-sage-800">
                  {wishlistItems.length}
                </div>
                <div className="text-sm text-sage-600">
                  {i18n.language === "ru"
                    ? "Избранных товаров"
                    : "Wishlist Items"}
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-sage-800">
                  {cartItems.length}
                </div>
                <div className="text-sm text-sage-600">
                  {i18n.language === "ru"
                    ? "Товаров в корзине"
                    : "Items in Cart"}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-heading font-bold text-sage-800 mb-6">
                {i18n.language === "ru" ? "Недавние заказы" : "Recent Orders"}
              </h2>
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-sage-800">
                          {i18n.language === "ru" ? "Заказ" : "Order"} #
                          {order.id}
                        </h3>
                        <p className="text-sm text-sage-600">
                          {i18n.language === "ru" ? "Размещен" : "Placed on"}{" "}
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-sage-800">
                          {formatPrice(order.total)}
                        </div>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "In Transit"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status === "Delivered" &&
                          i18n.language === "ru"
                            ? "Доставлен"
                            : order.status === "In Transit" &&
                                i18n.language === "ru"
                              ? "В пути"
                              : order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-sage-600">
                      {order.items.length}{" "}
                      {i18n.language === "ru" ? "товар" : "item"}
                      {order.items.length > 1
                        ? i18n.language === "ru"
                          ? "ов"
                          : "s"
                        : ""}
                      : {order.items.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-heading font-bold text-sage-800 mb-6">
                {i18n.language === "ru" ? "Ваше избранное" : "Your Wishlist"}
              </h2>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-sage-300 mx-auto mb-4" />
                  <p className="text-sage-600">
                    {i18n.language === "ru"
                      ? "Ваше избранное пусто"
                      : "Your wishlist is empty"}
                  </p>
                  <a
                    href="/shop"
                    className="inline-block mt-4 text-sage-600 hover:text-sage-800 underline"
                  >
                    {i18n.language === "ru"
                      ? "Начать покупки"
                      : "Start shopping"}
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">☕</div>
                        <h3 className="font-semibold text-sage-800 mb-2">
                          {i18n.language === "ru" ? "Товар" : "Product"} #
                          {item.id}
                        </h3>
                        <div className="text-lg font-bold text-sage-800 mb-3">
                          {formatPrice(25.99)}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-sage-600 hover:bg-sage-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                            {i18n.language === "ru"
                              ? "В корзину"
                              : "Add to Cart"}
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Account Settings */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-sage-800">
                  {i18n.language === "ru"
                    ? "Настройки аккаунта"
                    : "Account Settings"}
                </h2>
                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-2 text-sage-600 hover:text-sage-800"
                  >
                    <Edit className="h-4 w-4" />
                    {i18n.language === "ru" ? "Редактировать" : "Edit"}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateProfile}
                      className="flex items-center gap-2 bg-sage-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sage-700"
                    >
                      <Save className="h-4 w-4" />
                      {i18n.language === "ru" ? "Сохранить" : "Save"}
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="flex items-center gap-2 text-sage-600 hover:text-sage-800 px-4 py-2 rounded-lg text-sm"
                    >
                      <X className="h-4 w-4" />
                      {i18n.language === "ru" ? "Отмена" : "Cancel"}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      {i18n.language === "ru" ? "Имя" : "First Name"}
                    </label>
                    <input
                      type="text"
                      value={userProfile.firstName}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          firstName: e.target.value,
                        })
                      }
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      {i18n.language === "ru" ? "Фамилия" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      value={userProfile.lastName}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          lastName: e.target.value,
                        })
                      }
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    {i18n.language === "ru" ? "Email" : "Email"}
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                    disabled={!isEditingProfile}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      {i18n.language === "ru" ? "Телефон" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          phone: e.target.value,
                        })
                      }
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      {i18n.language === "ru" ? "Страна" : "Country"}
                    </label>
                    <select
                      value={userProfile.country}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          country: e.target.value,
                        })
                      }
                      disabled={!isEditingProfile}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:bg-gray-50"
                    >
                      <option value="Kazakhstan">
                        {i18n.language === "ru" ? "Казахстан" : "Kazakhstan"}
                      </option>
                      <option value="Russia">
                        {i18n.language === "ru" ? "Россия" : "Russia"}
                      </option>
                      <option value="India">
                        {i18n.language === "ru" ? "Индия" : "India"}
                      </option>
                      <option value="USA">
                        {i18n.language === "ru" ? "США" : "United States"}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    {i18n.language === "ru" ? "Адрес" : "Address"}
                  </label>
                  <input
                    type="text"
                    value={userProfile.address}
                    onChange={(e) =>
                      setUserProfile({
                        ...userProfile,
                        address: e.target.value,
                      })
                    }
                    disabled={!isEditingProfile}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 disabled:bg-gray-50"
                    placeholder={
                      i18n.language === "ru"
                        ? "Улица, дом, квартира"
                        : "Street address, apartment, etc."
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
