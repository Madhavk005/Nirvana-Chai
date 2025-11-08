import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { useCartStore } from "../stores/useStore";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const { formatPrice } = useLanguageCurrency();
  const { t, i18n } = useTranslation();
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Kazakhstan",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Use Zustand store
  const {
    items: cartItems,
    updateQuantity,
    removeItem,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.12; // 12% tax
  const total = subtotal + shipping + tax;
  const totalItems = getTotalItems();

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        shippingInfo,
        cartItems: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        paymentMethod,
        orderTotal: total,
        subtotal,
        shipping,
        tax,
      };

      // Send to backend API
      const response = await fetch("/api/forms/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        setOrderId(result.orderId);
        clearCart();
        setCheckoutStep(4);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && checkoutStep !== 4) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-card border border-border rounded-2xl p-12">
            <ShoppingBag className="h-16 w-16 text-sage-400 mx-auto mb-6" />
            <h1 className="text-3xl font-heading font-bold text-sage-800 mb-4">
              {i18n.language === "ru"
                ? "Ваша корзина пуста"
                : "Your cart is empty"}
            </h1>
            <p className="text-lg text-sage-600 mb-8">
              {i18n.language === "ru"
                ? "Откройте для себя нашу коллекцию премиум чая и начните свое путешествие к идеальной чашке."
                : "Discover our premium tea collection and start your journey to the perfect cup."}
            </p>
            <a
              href="/shop"
              className="inline-flex items-center bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              {i18n.language === "ru" ? "Начать покупки" : "Start Shopping"}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-sage-800 mb-2">
            {checkoutStep === 4
              ? i18n.language === "ru"
                ? "Заказ подтвержден!"
                : "Order Confirmed!"
              : i18n.language === "ru"
                ? "Корзина покупок"
                : "Shopping Cart"}
          </h1>
          {checkoutStep !== 4 && (
            <div className="flex items-center space-x-2 text-sm text-sage-600">
              <span
                className={checkoutStep >= 1 ? "text-sage-800 font-medium" : ""}
              >
                {i18n.language === "ru" ? "Корзина" : "Cart"}
              </span>
              <span>→</span>
              <span
                className={checkoutStep >= 2 ? "text-sage-800 font-medium" : ""}
              >
                {i18n.language === "ru" ? "Доставка" : "Shipping"}
              </span>
              <span>→</span>
              <span
                className={checkoutStep >= 3 ? "text-sage-800 font-medium" : ""}
              >
                {i18n.language === "ru" ? "Оплата" : "Payment"}
              </span>
              <span>→</span>
              <span
                className={checkoutStep >= 4 ? "text-sage-800 font-medium" : ""}
              >
                {i18n.language === "ru" ? "Подтверждение" : "Confirmation"}
              </span>
            </div>
          )}
        </div>

        {/* Step 4: Order Confirmation */}
        {checkoutStep === 4 && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card border border-border rounded-2xl p-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-heading font-bold text-sage-800 mb-4">
                {i18n.language === "ru"
                  ? "Спасибо за ваш заказ!"
                  : "Thank You for Your Order!"}
              </h2>
              <p className="text-lg text-sage-600 mb-6">
                {i18n.language === "ru"
                  ? "Ваш заказ подтвержден и будет отправлен в течение 1-2 рабочих дней."
                  : "Your order has been confirmed and will be shipped within 1-2 business days."}
              </p>
              <div className="bg-sage-50 border border-sage-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-sage-600">
                  {i18n.language === "ru" ? "Номер заказа" : "Order Number"}
                </div>
                <div className="text-lg font-semibold text-sage-800">
                  #{orderId}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/account"
                  className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {i18n.language === "ru" ? "Отследить заказ" : "Track Order"}
                </a>
                <a
                  href="/shop"
                  className="border border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {i18n.language === "ru"
                    ? "Продолжить покупки"
                    : "Continue Shopping"}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Steps 1-3: Cart, Shipping, Payment */}
        {checkoutStep !== 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Cart Items */}
              {checkoutStep === 1 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-heading font-bold text-sage-800 mb-6">
                    {i18n.language === "ru" ? "Ваши товары" : "Your Items"} (
                    {totalItems})
                  </h2>

                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 border border-border rounded-lg"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-sage-50 to-clay-50 rounded-lg flex items-center justify-center text-2xl">
                          {item.image}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-sage-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-sage-600">
                            {item.category}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-semibold text-sage-800">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-sage-400 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-sage-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-border rounded-md hover:bg-sage-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {checkoutStep === 2 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-heading font-bold text-sage-800 mb-6">
                    {i18n.language === "ru"
                      ? "Информация о доставке"
                      : "Shipping Information"}
                  </h2>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">
                          {i18n.language === "ru" ? "Имя *" : "First Name *"}
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.firstName}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              firstName: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">
                          {i18n.language === "ru" ? "Фамилия *" : "Last Name *"}
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.lastName}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              lastName: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">
                          {i18n.language === "ru" ? "Email *" : "Email *"}
                        </label>
                        <input
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              email: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">
                          {i18n.language === "ru" ? "Телефон" : "Phone"}
                        </label>
                        <input
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-2">
                        {i18n.language === "ru" ? "Адрес *" : "Address *"}
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        placeholder={
                          i18n.language === "ru"
                            ? "Улица, дом, квартира и т.д."
                            : "Street address, apartment, suite, etc."
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">
                          {i18n.language === "ru" ? "Город *" : "City *"}
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              city: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">
                          {i18n.language === "ru" ? "Страна *" : "Country *"}
                        </label>
                        <select
                          value={shippingInfo.country}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              country: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        >
                          <option value="Kazakhstan">
                            {i18n.language === "ru"
                              ? "Казахстан"
                              : "Kazakhstan"}
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
                          <option value="Europe">
                            {i18n.language === "ru" ? "Европа" : "Europe"}
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">
                          {i18n.language === "ru"
                            ? "Почтовый индекс"
                            : "Postal Code"}
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.postalCode}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              postalCode: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Payment */}
              {checkoutStep === 3 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xl font-heading font-bold text-sage-800 mb-6">
                    {i18n.language === "ru"
                      ? "Способ оплаты"
                      : "Payment Method"}
                  </h2>

                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-sage-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard className="h-5 w-5 mr-3 text-sage-600" />
                      <span className="font-medium">
                        {i18n.language === "ru"
                          ? "Кредитная/Дебетовая карта"
                          : "Credit/Debit Card"}
                      </span>
                    </label>

                    <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-sage-50">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="w-5 h-5 mr-3 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                        P
                      </div>
                      <span className="font-medium">PayPal</span>
                    </label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">
                          {i18n.language === "ru"
                            ? "Номер карты"
                            : "Card Number"}
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-sage-700 mb-2">
                            {i18n.language === "ru"
                              ? "Срок действия"
                              : "Expiry Date"}
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-sage-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-4">
                <h3 className="text-xl font-heading font-bold text-sage-800 mb-6">
                  {i18n.language === "ru" ? "Сводка заказа" : "Order Summary"}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sage-600">
                    <span>
                      {i18n.language === "ru"
                        ? "Промежуточный итог"
                        : "Subtotal"}
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sage-600">
                    <span>
                      {i18n.language === "ru" ? "Доставка" : "Shipping"}
                    </span>
                    <span>
                      {shipping === 0
                        ? i18n.language === "ru"
                          ? "Бесплатно"
                          : "Free"
                        : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sage-600">
                    <span>{i18n.language === "ru" ? "Налог" : "Tax"}</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-lg font-semibold text-sage-800">
                      <span>{i18n.language === "ru" ? "Итого" : "Total"}</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {shipping === 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-600 mb-6">
                    <Truck className="h-4 w-4" />
                    {i18n.language === "ru"
                      ? "Бесплатная доставка при заказе от $50!"
                      : "Free shipping on orders over $50!"}
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-sage-600">
                    <Shield className="h-4 w-4" />
                    {i18n.language === "ru"
                      ? "Безопасная оплата"
                      : "Secure checkout"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-sage-600">
                    <Truck className="h-4 w-4" />
                    {i18n.language === "ru"
                      ? "Быстрая доставка"
                      : "Fast delivery"}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {checkoutStep === 1 && (
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {i18n.language === "ru"
                        ? "Перейти к доставке"
                        : "Proceed to Shipping"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}

                  {checkoutStep === 2 && (
                    <div className="space-y-2">
                      <button
                        onClick={() => setCheckoutStep(3)}
                        className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        {i18n.language === "ru"
                          ? "Продолжить оплату"
                          : "Continue to Payment"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="w-full border border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors"
                      >
                        {i18n.language === "ru"
                          ? "Вернуться к корзине"
                          : "Back to Cart"}
                      </button>
                    </div>
                  )}

                  {checkoutStep === 3 && (
                    <div className="space-y-2">
                      <button
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            {i18n.language === "ru"
                              ? "Обработка..."
                              : "Processing..."}
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-4 w-4" />
                            {i18n.language === "ru"
                              ? "Завершить заказ"
                              : "Complete Order"}
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setCheckoutStep(2)}
                        className="w-full border border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors"
                      >
                        {i18n.language === "ru"
                          ? "Вернуться к доставке"
                          : "Back to Shipping"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
