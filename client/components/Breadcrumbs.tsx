import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  customItems?: BreadcrumbItem[];
}

export function Breadcrumbs({ items, customItems }: BreadcrumbsProps) {
  const location = useLocation();
  const { currentLanguage } = useLanguageCurrency();

  const getLocalizedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      home: {
        en: "Home",
        ru: "Главная",
        kz: "Басты бет",
      },
      shop: {
        en: "Shop",
        ru: "Магазин",
        kz: "Дүкен",
      },
      product: {
        en: "Product",
        ru: "Продукт",
        kz: "Өнім",
      },
      cart: {
        en: "Cart",
        ru: "Корзина",
        kz: "Себет",
      },
      account: {
        en: "Account",
        ru: "Аккаунт",
        kz: "Аккаунт",
      },
      about: {
        en: "About",
        ru: "О нас",
        kz: "Біз туралы",
      },
      contact: {
        en: "Contact",
        ru: "Контакты",
        kz: "Байланыс",
      },
      faq: {
        en: "FAQ",
        ru: "ЧаВо",
        kz: "Жиі қойылатын сұрақтар",
      },
      shipping: {
        en: "Shipping",
        ru: "Доставка",
        kz: "Жеткізу",
      },
      returns: {
        en: "Returns",
        ru: "Возврат",
        kz: "Қайтару",
      },
    };

    return translations[key]?.[currentLanguage.code] || key;
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: getLocalizedText("home"), href: "/" },
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      if (segment === "product" && pathSegments[index + 1]) {
        // For product pages, we'll handle this specially
        return;
      }

      const label = getLocalizedText(segment);
      breadcrumbs.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        href: index === pathSegments.length - 1 ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-3 sm:px-4">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="text-gray-600 hover:text-sage-600 transition-colors flex items-center gap-1"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-sage-700 font-medium flex items-center gap-1">
                {index === 0 && <Home className="h-4 w-4" />}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
