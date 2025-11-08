import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { locationService } from "../services/locationService";
import {
  CURRENCIES,
  getCurrencyNameInLanguage,
  getShippingZone,
  RegionalCurrencyUtility,
} from "../utils/currency";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
}

interface LanguageCurrencyContextType {
  // Language
  currentLanguage: Language;
  languages: Language[];
  setLanguage: (language: Language) => void;
  t: (key: string, fallback?: string) => string;

  // Currency
  currentCurrency: Currency;
  currencies: Currency[];
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;

  // Location
  shippingInfo: any;
  detectedLocation: any;
  isLocationDetected: boolean;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "kz", name: "Kazakh", nativeName: "Қазақша", flag: "🇰🇿" },
];

const currencies: Currency[] = [
  { code: "RUB", name: "Russian Ruble", symbol: "₽", exchangeRate: 95.5 },
];

// Translations object
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.account": "My Account",
    "nav.cart": "Cart",

    // Hero section
    "hero.title1": "Experience",
    "hero.title2": "Nirvanachai",
    "hero.subtitle":
      "More than a drink — tea is a daily ritual, a quiet companion, and a global connector. Join us on a journey that spans continents and generations.",
    "hero.explore_blends": "Explore Blends",
    "hero.shop_now": "Shop Now",

    // Why Choose section
    "why_choose.title": "Why Choose Nirvanachai?",
    "why_choose.subtitle":
      "Discover what makes our tea journey extraordinary and why tea lovers worldwide trust our heritage.",
    "why_choose.expertise": "Three generations of expertise",
    "why_choose.global": "Sourced globally",
    "why_choose.curated": "Curated blends & single-origin",
    "why_choose.pure": "Pure ingredients",
    "why_choose.sustainable": "Sustainably sourced",
    "why_choose.fresh": "Freshly packed",

    // Global Sourcing
    "global_sourcing.title": "Global Sourcing, Local Soul",
    "global_sourcing.subtitle":
      "Our tea journey spans the world's most renowned tea regions, each contributing its unique character to create the perfect cup that connects cultures and generations.",
    "global_sourcing.learn_story": "Learn Our Story",

    // Featured Products
    "featured.title": "Featured Blends",
    "featured.subtitle":
      "Discover our most beloved tea collections, carefully crafted to bring you moments of tranquility and joy.",
    "featured.add_to_cart": "Add to Cart",
    "featured.view_all": "View All Products",

    // Newsletter
    "newsletter.title": "Join Our Tea Journey",
    "newsletter.subtitle":
      "Subscribe to receive tea wisdom, exclusive blends, and stories from our global tea family.",
    "newsletter.email_placeholder": "Enter your email",
    "newsletter.subscribe": "Subscribe",
    "newsletter.no_spam": "No spam, just tea love. Unsubscribe anytime.",

    // Contact Info
    "contact.phone": "+7 702 201 0652",
    "contact.email": "support@nirvanachai.kz",
    "contact.address": "Раимбек 165а, Almaty, Kazakhstan",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.shop": "Магазин",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "nav.account": "Мой аккаунт",
    "nav.cart": "Корзина",

    // Hero section
    "hero.title1": "Испытайте",
    "hero.title2": "Нирвана Чай",
    "hero.subtitle":
      "Больше чем напиток — чай это ежедневный ритуал, тихий спутник и глобальный соединитель. Присоединяйтесь к нашему путешествию через континенты и поколения.",
    "hero.explore_blends": "Изучить Смеси",
    "hero.shop_now": "Купить Сейчас",

    // Why Choose section
    "why_choose.title": "Почему выбирают Нирвана Чай?",
    "why_choose.subtitle":
      "Откройте для себя, что делает наше чайное путешествие необычным и почему любители чая во всем мире доверяют нашему наследию.",
    "why_choose.expertise": "Три поколения опыта",
    "why_choose.global": "Источники по всему миру",
    "why_choose.curated": "Тщательно отобранные смеси",
    "why_choose.pure": "Чистые ингредиенты",
    "why_choose.sustainable": "Устойчивые источники",
    "why_choose.fresh": "Свежая упаковка",

    // Global Sourcing
    "global_sourcing.title": "Глобальные Источники, Местная Душа",
    "global_sourcing.subtitle":
      "Наше чайное путешествие охватывает самые известные чайные регионы мира, каждый из которых вносит свой уникальный характер для создания идеальной чашки, которая объединяет культуры и поколения.",
    "global_sourcing.learn_story": "Узнать Нашу Историю",

    // Featured Products
    "featured.title": "Рекомендуемые Смеси",
    "featured.subtitle":
      "Откройте для себя наши самые любимые чайные коллекции, тщательно создан��ые, чтобы принести вам моменты спокойствия и радости.",
    "featured.add_to_cart": "В Корзину",
    "featured.view_all": "Посмотреть Все Товары",

    // Newsletter
    "newsletter.title": "Присоединяйтесь к Нашему Чайному Путешествию",
    "newsletter.subtitle":
      "Подпишитесь, чтобы получать чайную мудрость, эксклюз��вные смеси и истории от нашей глобальной чайной семьи.",
    "newsletter.email_placeholder": "Введите ваш email",
    "newsletter.subscribe": "Подписаться",
    "newsletter.no_spam":
      "Никакого спама, только чайная любовь. Отпишитесь в любое время.",

    // Contact Info
    "contact.phone": "+7 702 201 0652",
    "contact.email": "support@nirvanachai.kz",
    "contact.address": "Раимбек 165а, Алматы, Казахстан",
  },
  kz: {
    // Navigation
    "nav.home": "Басты бет",
    "nav.shop": "Дүкен",
    "nav.about": "Біз туралы",
    "nav.contact": "Байланыс",
    "nav.account": "Менің аккаунтым",
    "nav.cart": "Себет",

    // Hero section
    "hero.title1": "Сезініңіз",
    "hero.title2": "Нирвана Шай",
    "hero.subtitle":
      "Сусыннан артық — шай күнделікті ритуал, тыныш серіктес және ғаламдық байланыстырушы. Құрлықтар мен ұрпақтарды қамтитын саяхатымызға қосылыңыз.",
    "hero.explore_blends": "Қоспаларды Зерттеу",
    "hero.shop_now": "Қазір ��атып Алу",

    // Why Choose section
    "why_choose.title": "Неліктен Нирвана Шайды Таңдау Керек?",
    "why_choose.subtitle":
      "Біздің шай саяхатымызды ерекше ететінді және неліктен әлемдегі шай сүйерлер біздің мұраға сенетінін табыңыз.",
    "why_choose.expertise": "Үш ұрпақтың тәжірибесі",
    "why_choose.global": "Әлемнен алынған",
    "why_choose.curated": "Таңдалған қоспалар",
    "why_choose.pure": "Таза ингредиенттер",
    "why_choose.sustainable": "Тұрақты көздер",
    "why_choose.fresh": "Жаңа оралған",

    // Global Sourcing
    "global_sourcing.title": "Ғаламдық Көздер, Жергілікті Жан",
    "global_sourcing.subtitle":
      "Біздің шай саяхатымыз әлемдегі ең танымал шай өңірлерін қамтиды, олардың әрқайсысы мәдениеттер мен ұрпақтарды байланыстыратын тамаша кесені жасау үшін өзіндік сипатын қосады.",
    "global_sourcing.learn_story": "Біздің Тарихымызды Үйреніңіз",

    // Featured Products
    "featured.title": "Ұсынылатын Қоспалар",
    "featured.subtitle":
      "Сізге тыныштық пен қуаныш сәттерін әкелу үшін мұқият жасалған біздің ең сүйікті шай коллекцияларын табыңыз.",
    "featured.add_to_cart": "Себетке Қосу",
    "featured.view_all": "Барлық Өнімдерді Көру",

    // Newsletter
    "newsletter.title": "Біздің Шай Саяхатымызға Қосылыңыз",
    "newsletter.subtitle":
      "Шай данышпандығын, эксклюзивті қоспаларды және біздің ғаламдық шай отбасындағы оқиғаларды алу үшін жазылыңыз.",
    "newsletter.email_placeholder": "Электрондық поштаңызды енгізіңіз",
    "newsletter.subscribe": "Жазылу",
    "newsletter.no_spam":
      "Спам жоқ, тек шай махabbati. Кез келген уақытта жазылудан бас тартыңыз.",

    // Contact Info
    "contact.phone": "+7 702 201 0652",
    "contact.email": "support@nirvanachai.kz",
    "contact.address": "Раимбек 165а, Алматы, Қазақстан",
  },
};

const LanguageCurrencyContext = createContext<
  LanguageCurrencyContextType | undefined
>(undefined);

export const useLanguageCurrency = () => {
  const context = useContext(LanguageCurrencyContext);
  if (!context) {
    throw new Error(
      "useLanguageCurrency must be used within a LanguageCurrencyProvider",
    );
  }
  return context;
};

export const LanguageCurrencyProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0],
  );
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(
    currencies[0],
  );
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [detectedLocation, setDetectedLocation] = useState<any>(null);
  const [isLocationDetected, setIsLocationDetected] = useState<boolean>(false);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem("nirvanachai-language", language.code);
    i18n.changeLanguage(language.code);
  };

  const setCurrency = (currency: Currency) => {
    setCurrentCurrency(currency);
    localStorage.setItem("nirvanachai-currency", currency.code);
  };

  const t = (key: string, fallback?: string): string => {
    const translation = i18n.t(key);
    return translation !== key ? translation : fallback || key;
  };

  const convertPrice = (price: number): number => {
    // Prices in the data are stored in RUB by default. Return as-is so RUB remains primary.
    return price;
  };

  const formatPrice = (price: number): string => {
    // Format price as Russian Ruble (primary currency) with no decimals
    try {
      const locale = currentLanguage.code === "ru" ? "ru-RU" : "ru-RU";
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(convertPrice(price));
    } catch (e) {
      // Fallback simple formatting
      return `${Math.round(convertPrice(price))} ${currentCurrency.symbol}`;
    }
  };

  return (
    <LanguageCurrencyContext.Provider
      value={{
        currentLanguage,
        languages,
        setLanguage,
        t,
        currentCurrency,
        currencies,
        setCurrency,
        formatPrice,
        convertPrice,
        shippingInfo,
        detectedLocation,
        isLocationDetected,
      }}
    >
      {children}
    </LanguageCurrencyContext.Provider>
  );
};
