import { Shield, Truck, RotateCcw, Users, Star, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useSimpleAnimation,
  animationClasses,
} from "../hooks/useSimpleAnimation";

interface TrustIndicatorsProps {
  variant?: "horizontal" | "grid";
  className?: string;
}

export function TrustIndicators({
  variant = "horizontal",
  className = "",
}: TrustIndicatorsProps) {
  const { t } = useTranslation();
  const animation = useSimpleAnimation({ delay: 200 });

  const indicators = [
    {
      icon: <Shield className="h-5 w-5 text-green-500" />,
      text: t("trust.secure_checkout", "Secure Checkout"),
      subtext: "SSL Protected",
    },
    {
      icon: <RotateCcw className="h-5 w-5 text-blue-500" />,
      text: t("trust.money_back", "30-Day Money Back"),
      subtext: "Guarantee",
    },
    {
      icon: <Truck className="h-5 w-5 text-purple-500" />,
      text: t("trust.fast_delivery", "Fast Delivery"),
      subtext: "Worldwide",
    },
    {
      icon: <Users className="h-5 w-5 text-orange-500" />,
      text: t("trust.trusted_by", "10,000+ Customers"),
      subtext: "Trust Us",
    },
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      text: "4.9/5 Rating",
      subtext: "Customer Reviews",
    },
    {
      icon: <Award className="h-5 w-5 text-red-500" />,
      text: "Premium Quality",
      subtext: "Certified",
    },
  ];

  const gridClasses =
    variant === "grid"
      ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
      : "flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8";

  return (
    <div
      ref={animation.elementRef}
      className={`
        ${className}
        ${animationClasses.fadeInUp(animation.isVisible)}
      `}
    >
      <div className={gridClasses}>
        {indicators.map((indicator, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              {indicator.icon}
            </div>
            <div className="text-center sm:text-left">
              <div className="font-medium leading-tight">{indicator.text}</div>
              {indicator.subtext && (
                <div className="text-xs text-gray-500">{indicator.subtext}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Compact version for use in CTAs
export function CompactTrustIndicators({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center space-x-3 text-xs text-sage-700 ${className}`}
    >
      <div className="flex items-center space-x-1">
        <Shield className="h-3 w-3" />
        <span>Secure</span>
      </div>
      <div className="flex items-center space-x-1">
        <RotateCcw className="h-3 w-3" />
        <span>30-Day</span>
      </div>
      <div className="flex items-center space-x-1">
        <Star className="h-3 w-3" />
        <span>4.9/5</span>
      </div>
    </div>
  );
}
