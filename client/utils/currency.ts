import currency from "currency.js";

// Enhanced currency configuration
export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  locale: string;
  precision: number;
  pattern: string;
  separator: string;
  decimal: string;
  fromCents: boolean;
}

// Comprehensive currency data
export const CURRENCIES: Record<string, CurrencyConfig> = {
  RUB: {
    code: "RUB",
    name: "Russian Ruble",
    symbol: "₽",
    exchangeRate: 95.5,
    locale: "ru-RU",
    precision: 0,
    pattern: "# !",
    separator: " ",
    decimal: ",",
    fromCents: false,
  },
};

// Currency utility class
export class CurrencyUtility {
  // Use RUB as the primary/base currency for the site
  private baseCurrency: string = "RUB";
  private currentCurrency: CurrencyConfig;

  constructor(currencyCode: string = "RUB") {
    this.currentCurrency = CURRENCIES[currencyCode] || CURRENCIES.RUB;
  }

  // Set current currency
  setCurrency(currencyCode: string): void {
    if (CURRENCIES[currencyCode]) {
      this.currentCurrency = CURRENCIES[currencyCode];
    }
  }

  // Get current currency info
  getCurrentCurrency(): CurrencyConfig {
    return this.currentCurrency;
  }

  // Convert amount from base currency to current currency
  convert(amount: number, fromCurrency: string = this.baseCurrency): number {
    const fromRate = CURRENCIES[fromCurrency]?.exchangeRate || 1;
    const toRate = this.currentCurrency.exchangeRate;

    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    return usdAmount * toRate;
  }

  // Format amount according to currency rules
  format(
    amount: number,
    options?: {
      showSymbol?: boolean;
      showCode?: boolean;
      precision?: number;
    },
  ): string {
    const {
      showSymbol = true,
      showCode = false,
      precision = this.currentCurrency.precision,
    } = options || {};

    const convertedAmount = this.convert(amount);

    const currencyInstance = currency(convertedAmount, {
      symbol: showSymbol ? this.currentCurrency.symbol : "",
      precision,
      pattern: this.currentCurrency.pattern,
      separator: this.currentCurrency.separator,
      decimal: this.currentCurrency.decimal,
      fromCents: this.currentCurrency.fromCents,
    });

    let formatted = currencyInstance.format();

    if (showCode) {
      formatted = `${formatted} ${this.currentCurrency.code}`;
    }

    return formatted;
  }

  // Format with explicit currency
  formatAs(
    amount: number,
    currencyCode: string,
    options?: {
      showSymbol?: boolean;
      showCode?: boolean;
    },
  ): string {
    const targetCurrency = CURRENCIES[currencyCode];
    if (!targetCurrency) return this.format(amount, options);

    const fromRate = this.currentCurrency.exchangeRate;
    const toRate = targetCurrency.exchangeRate;
    const convertedAmount = (amount / fromRate) * toRate;

    const { showSymbol = true, showCode = false } = options || {};

    const currencyInstance = currency(convertedAmount, {
      symbol: showSymbol ? targetCurrency.symbol : "",
      precision: targetCurrency.precision,
      pattern: targetCurrency.pattern,
      separator: targetCurrency.separator,
      decimal: targetCurrency.decimal,
      fromCents: targetCurrency.fromCents,
    });

    let formatted = currencyInstance.format();

    if (showCode) {
      formatted = `${formatted} ${targetCurrency.code}`;
    }

    return formatted;
  }

  // Calculate savings amount
  calculateSavings(
    originalPrice: number,
    currentPrice: number,
  ): {
    amount: number;
    percentage: number;
    formatted: string;
  } {
    const savings = originalPrice - currentPrice;
    const percentage = (savings / originalPrice) * 100;

    return {
      amount: savings,
      percentage: Math.round(percentage),
      formatted: this.format(savings),
    };
  }

  // Get currency list for dropdowns
  static getCurrencyList(): Array<{
    code: string;
    name: string;
    symbol: string;
    flag?: string;
  }> {
    return Object.values(CURRENCIES).map((currency) => ({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      flag: getCurrencyFlag(currency.code),
    }));
  }

  // Get exchange rate between currencies
  getExchangeRate(fromCurrency: string, toCurrency: string): number {
    const fromRate = CURRENCIES[fromCurrency]?.exchangeRate || 1;
    const toRate = CURRENCIES[toCurrency]?.exchangeRate || 1;

    return toRate / fromRate;
  }

  // Format price range
  formatRange(minPrice: number, maxPrice: number): string {
    return `${this.format(minPrice)} - ${this.format(maxPrice)}`;
  }

  // Get localized number format
  getNumberFormat(): Intl.NumberFormat {
    return new Intl.NumberFormat(this.currentCurrency.locale, {
      style: "currency",
      currency: this.currentCurrency.code,
      minimumFractionDigits: this.currentCurrency.precision,
      maximumFractionDigits: this.currentCurrency.precision,
    });
  }
}

// Helper function to get currency flag emoji with enhanced coverage
function getCurrencyFlag(currencyCode: string): string {
  const flagMap: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    JPY: "🇯🇵",
    CNY: "🇨🇳",
    INR: "🇮🇳",
    RUB: "🇷🇺",
    KZT: "🇰🇿",
    CAD: "🇨🇦",
    AUD: "🇦🇺",
  };

  return flagMap[currencyCode] || "💱";
}

// Get popular payment methods by region
export function getPopularPaymentMethods(countryCode?: string): Array<{
  id: string;
  name: string;
  icon: string;
  description: string;
}> {
  const country = countryCode?.toUpperCase();

  // Base international methods
  const baseMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "💳",
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "🅿️",
      description: "Secure online payments",
    },
  ];

  // Region-specific methods
  if (["RU", "BY"].includes(country || "")) {
    return [
      ...baseMethods,
      {
        id: "mir",
        name: "МИР",
        icon: "🇷🇺",
        description: "Российская платёжная система",
      },
      {
        id: "sberpay",
        name: "SberPay",
        icon: "💚",
        description: "Мгновенные платежи Сбербанка",
      },
      {
        id: "yandexmoney",
        name: "ЮMoney",
        icon: "🟡",
        description: "Яндекс.Деньги",
      },
    ];
  }

  if (country === "KZ") {
    return [
      ...baseMethods,
      {
        id: "kaspi",
        name: "Kaspi Pay",
        icon: "🔴",
        description: "Kaspi банкпен төлеу",
      },
      {
        id: "halyk",
        name: "Halyk Bank",
        icon: "🏦",
        description: "Халық банк картасы",
      },
    ];
  }

  return baseMethods;
}

// Get suggested currency based on user location with enhanced regional support
export function getSuggestedCurrency(countryCode?: string): string {
  if (!countryCode) return "RUB";

  const currencyMap: Record<string, string> = {
    US: "USD",
    CA: "CAD",
    GB: "GBP",
    EU: "EUR",
    DE: "EUR",
    FR: "EUR",
    IT: "EUR",
    ES: "EUR",
    NL: "EUR",
    BE: "EUR",
    AT: "EUR",
    PT: "EUR",
    IE: "EUR",
    FI: "EUR",
    GR: "EUR",
    JP: "JPY",
    CN: "CNY",
    IN: "INR",
    RU: "RUB",
    KZ: "KZT",
    AU: "AUD",
    // Additional CIS countries
    BY: "RUB", // Belarus often uses RUB
    UZ: "USD", // Uzbekistan
    KG: "USD", // Kyrgyzstan
    TJ: "USD", // Tajikistan
    TM: "USD", // Turkmenistan
    AM: "USD", // Armenia
    AZ: "USD", // Azerbaijan
    GE: "USD", // Georgia
    MD: "USD", // Moldova
    UA: "USD", // Ukraine
  };

  return currencyMap[countryCode.toUpperCase()] || "RUB";
}

// Get currency name in local language
export function getCurrencyNameInLanguage(
  currencyCode: string,
  languageCode: string = "en",
): string {
  const currencyNames: Record<string, Record<string, string>> = {
    USD: {
      en: "US Dollar",
      ru: "Доллар США",
      kz: "АҚШ доллары",
    },
    EUR: {
      en: "Euro",
      ru: "Евро",
      kz: "Евро",
    },
    RUB: {
      en: "Russian Ruble",
      ru: "Российский рубль",
      kz: "Ресей рублі",
    },
    KZT: {
      en: "Kazakhstani Tenge",
      ru: "Казахстанский тенге",
      kz: "Қазақстан теңгесі",
    },
    GBP: {
      en: "British Pound",
      ru: "Британский фунт",
      kz: "Британия фунты",
    },
    JPY: {
      en: "Japanese Yen",
      ru: "Японская иена",
      kz: "Жапон иенасы",
    },
    CNY: {
      en: "Chinese Yuan",
      ru: "Китайский юань",
      kz: "Қытай юані",
    },
    INR: {
      en: "Indian Rupee",
      ru: "Индийская рупия",
      kz: "Үнді рупиясы",
    },
  };

  return (
    currencyNames[currencyCode]?.[languageCode] ||
    currencyNames[currencyCode]?.en ||
    currencyCode
  );
}

// Format price with regional preferences
export function formatPriceForRegion(
  amount: number,
  currencyCode: string,
  countryCode?: string,
): string {
  const util = new CurrencyUtility(currencyCode);

  // Special formatting for CIS countries
  if (
    [
      "RU",
      "KZ",
      "BY",
      "UZ",
      "KG",
      "TJ",
      "TM",
      "AM",
      "AZ",
      "GE",
      "MD",
      "UA",
    ].includes(countryCode?.toUpperCase() || "")
  ) {
    return util.format(amount, { precision: 0 });
  }

  return util.format(amount);
}

// Get shipping zones for different regions
export function getShippingZone(countryCode?: string): {
  zone: string;
  deliveryDays: string;
  freeShippingThreshold: number;
  currencyCode: string;
} {
  if (!countryCode) {
    return {
      zone: "International",
      deliveryDays: "10-15",
      freeShippingThreshold: 100,
      currencyCode: "USD",
    };
  }

  const country = countryCode.toUpperCase();

  // CIS Countries - Priority shipping
  if (
    [
      "RU",
      "KZ",
      "BY",
      "UZ",
      "KG",
      "TJ",
      "TM",
      "AM",
      "AZ",
      "GE",
      "MD",
      "UA",
    ].includes(country)
  ) {
    const currency =
      country === "RU" || country === "BY"
        ? "RUB"
        : country === "KZ"
          ? "KZT"
          : "USD";
    const threshold =
      currency === "RUB" ? 5000 : currency === "KZT" ? 20000 : 75;

    return {
      zone: "CIS Region",
      deliveryDays: "3-7",
      freeShippingThreshold: threshold,
      currencyCode: currency,
    };
  }

  // Europe
  if (
    [
      "DE",
      "FR",
      "IT",
      "ES",
      "NL",
      "BE",
      "AT",
      "PT",
      "IE",
      "FI",
      "GR",
      "GB",
    ].includes(country)
  ) {
    return {
      zone: "Europe",
      deliveryDays: "5-8",
      freeShippingThreshold: 75,
      currencyCode: country === "GB" ? "GBP" : "EUR",
    };
  }

  // North America
  if (["US", "CA"].includes(country)) {
    return {
      zone: "North America",
      deliveryDays: "5-10",
      freeShippingThreshold: country === "CA" ? 100 : 75,
      currencyCode: country === "CA" ? "CAD" : "USD",
    };
  }

  // Asia Pacific
  if (["JP", "CN", "IN", "AU"].includes(country)) {
    const currencyMap: Record<string, string> = {
      JP: "JPY",
      CN: "CNY",
      IN: "INR",
      AU: "AUD",
    };

    const thresholdMap: Record<string, number> = {
      JP: 10000,
      CN: 500,
      IN: 5000,
      AU: 100,
    };

    return {
      zone: "Asia Pacific",
      deliveryDays: "7-12",
      freeShippingThreshold: thresholdMap[country] || 100,
      currencyCode: currencyMap[country] || "USD",
    };
  }

  // Rest of World
  return {
    zone: "International",
    deliveryDays: "10-20",
    freeShippingThreshold: 150,
    currencyCode: "USD",
  };
}

// Singleton instance for global use
export const currencyUtil = new CurrencyUtility();

// Enhanced currency utility with regional preferences
export class RegionalCurrencyUtility extends CurrencyUtility {
  private countryCode?: string;
  private languageCode: string = "en";

  constructor(
    currencyCode: string = "USD",
    countryCode?: string,
    languageCode: string = "en",
  ) {
    super(currencyCode);
    this.countryCode = countryCode;
    this.languageCode = languageCode;
  }

  // Format with regional preferences
  formatRegional(amount: number, options?: any): string {
    return formatPriceForRegion(
      amount,
      this.getCurrentCurrency().code,
      this.countryCode,
    );
  }

  // Get currency name in current language
  getCurrencyName(): string {
    return getCurrencyNameInLanguage(
      this.getCurrentCurrency().code,
      this.languageCode,
    );
  }

  // Get shipping info for current region
  getShippingInfo() {
    return getShippingZone(this.countryCode);
  }

  // Get payment methods for current region
  getPaymentMethods() {
    return getPopularPaymentMethods(this.countryCode);
  }

  // Format with tax information (where applicable)
  formatWithTax(
    amount: number,
    includesTax: boolean = false,
  ): {
    price: string;
    taxInfo: string;
  } {
    const formattedPrice = this.formatRegional(amount);

    let taxInfo = "";
    if (["RU", "KZ", "BY"].includes(this.countryCode?.toUpperCase() || "")) {
      if (this.languageCode === "ru") {
        taxInfo = includesTax ? "НДС включён" : "НДС не включён";
      } else if (this.languageCode === "kz") {
        taxInfo = includesTax ? "ҚҚС кіреді" : "ҚҚС кірмейді";
      } else {
        taxInfo = includesTax ? "VAT included" : "VAT excluded";
      }
    } else {
      taxInfo = includesTax ? "Tax included" : "Tax excluded";
    }

    return {
      price: formattedPrice,
      taxInfo,
    };
  }
}

// Create regional utility instance
export const regionalCurrencyUtil = new RegionalCurrencyUtility();

// React hook for currency formatting
export function useCurrency(
  currencyCode?: string,
  countryCode?: string,
  languageCode?: string,
) {
  const util = new RegionalCurrencyUtility(
    currencyCode,
    countryCode,
    languageCode,
  );

  return {
    format: (amount: number, options?: any) => util.format(amount, options),
    formatRegional: (amount: number) => util.formatRegional(amount),
    convert: (amount: number, fromCurrency?: string) =>
      util.convert(amount, fromCurrency),
    formatAs: (amount: number, currency: string, options?: any) =>
      util.formatAs(amount, currency, options),
    calculateSavings: (original: number, current: number) =>
      util.calculateSavings(original, current),
    getCurrentCurrency: () => util.getCurrentCurrency(),
    getCurrencyName: () => util.getCurrencyName(),
    getShippingInfo: () => util.getShippingInfo(),
    getPaymentMethods: () => util.getPaymentMethods(),
    formatWithTax: (amount: number, includesTax?: boolean) =>
      util.formatWithTax(amount, includesTax),
    setCurrency: (code: string) => util.setCurrency(code),
  };
}
