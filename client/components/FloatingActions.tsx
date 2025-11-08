import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  ArrowUp,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import { useTranslation } from "react-i18next";

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useTranslation();

  // Show scroll to top button when user scrolls down
  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const actions = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Call Us",
      action: () => window.open("tel:+77022010652"),
      color: "bg-blue-500 hover:bg-blue-600",
      delay: "100ms",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email Us",
      action: () => window.open("mailto:support@nirvanachai.kz"),
      color: "bg-purple-500 hover:bg-purple-600",
      delay: "200ms",
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "View Cart",
      action: () => (window.location.href = "/cart"),
      color: "bg-sage-500 hover:bg-sage-600",
      delay: "300ms",
    },
  ];

  return (
    <>
      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {/* Action Buttons */}
        {isOpen && (
          <div className="flex flex-col space-y-3">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`
                  ${action.color} text-white p-3 rounded-full shadow-lg transition-all duration-300 
                  transform hover:scale-110 flex items-center space-x-2 group
                  ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                `}
                style={{
                  transitionDelay: isOpen ? action.delay : "0ms",
                }}
              >
                {action.icon}
                <span className="hidden group-hover:block text-sm whitespace-nowrap pr-2">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Main WhatsApp Button */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 relative overflow-hidden group"
          >
            <MessageCircle className="h-6 w-6 relative z-10" />
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>

            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
          </button>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {t("contact.whatsapp_tooltip", "Chat with us")}
            <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-6 left-6 z-50 bg-sage-600 hover:bg-sage-700 text-white p-3 rounded-full shadow-lg
            transition-all duration-300 transform hover:scale-110
            ${showScrollTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
