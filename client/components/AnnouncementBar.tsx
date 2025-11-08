import { useState } from "react";
import { X, Gift, Truck, Percent } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();
  const { formatPrice, shippingInfo } = useLanguageCurrency();

  if (!isVisible) return null;

  const announcements = [
    {
      icon: <Gift className="h-4 w-4" />,
      text: "New Customer? Get 20% OFF your first order",
      cta: "SHOP NOW",
      urgency: false,
    },
    {
      icon: <Truck className="h-4 w-4" />,
      text: shippingInfo
        ? `Free shipping on orders over ${formatPrice(shippingInfo.freeShippingThreshold)}`
        : "Free worldwide shipping on orders over $50",
      cta: "EXPLORE",
      urgency: false,
    },
    {
      icon: <Percent className="h-4 w-4" />,
      text: "Limited Time: Premium Tea Collection 25% OFF",
      cta: "GET DEAL",
      urgency: true,
    },
  ];

  // Randomly select an announcement
  const selectedAnnouncement =
    announcements[Math.floor(Math.random() * announcements.length)];

  return (
    <div
      className={`
      relative bg-amber-50 text-amber-800 text-sm border-b border-amber-200
      ${selectedAnnouncement.urgency ? "animate-pulse-soft" : ""}
    `}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-center relative">
        <div className="flex items-center space-x-2 font-medium">
          {selectedAnnouncement.icon}
          <span>{selectedAnnouncement.text}</span>
          <button className="ml-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200">
            {selectedAnnouncement.cta}
          </button>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Moving highlight effect for urgency */}
      {selectedAnnouncement.urgency && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      )}
    </div>
  );
}
