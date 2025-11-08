interface LocationData {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  currency: string;
  language: string;
  timezone: string;
}

interface ShippingInfo {
  zone: string;
  estimatedDays: string;
  freeShippingThreshold: number;
  defaultCurrency: string;
  preferredLanguages: string[];
}

export class LocationService {
  private static instance: LocationService;
  private locationData: LocationData | null = null;
  private isDetecting = false;

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async detectLocation(): Promise<LocationData | null> {
    if (this.locationData) return this.locationData;
    if (this.isDetecting) return null;

    this.isDetecting = true;

    try {
      // Try multiple detection methods
      const data = await this.detectFromBrowser();
      this.locationData = data;
      return data;
    } catch (error) {
      console.log("Location detection failed, using fallback");
      return this.getFallbackLocation();
    } finally {
      this.isDetecting = false;
    }
  }

  private async detectFromBrowser(): Promise<LocationData> {
    // Method 1: Try IP-based detection (using free service)
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      if (data.country_code) {
        return {
          country: data.country_name || "Unknown",
          countryCode: data.country_code,
          region: data.region || "",
          city: data.city || "",
          currency: data.currency || "USD",
          language: this.getLanguageFromCountry(data.country_code),
          timezone:
            data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
      }
    } catch (error) {
      console.log("IP detection failed, trying timezone detection");
    }

    // Method 2: Timezone-based detection
    return this.detectFromTimezone();
  }

  private detectFromTimezone(): LocationData {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language;

    // Common timezone to country mapping
    const timezoneMap: Record<string, Partial<LocationData>> = {
      "Asia/Almaty": {
        country: "Kazakhstan",
        countryCode: "KZ",
        currency: "KZT",
        language: "kz",
      },
      "Europe/Moscow": {
        country: "Russia",
        countryCode: "RU",
        currency: "RUB",
        language: "ru",
      },
      "Asia/Kolkata": {
        country: "India",
        countryCode: "IN",
        currency: "INR",
        language: "en",
      },
      "Europe/London": {
        country: "United Kingdom",
        countryCode: "GB",
        currency: "GBP",
        language: "en",
      },
      "America/New_York": {
        country: "United States",
        countryCode: "US",
        currency: "USD",
        language: "en",
      },
      "Europe/Paris": {
        country: "France",
        countryCode: "FR",
        currency: "EUR",
        language: "en",
      },
      "Europe/Berlin": {
        country: "Germany",
        countryCode: "DE",
        currency: "EUR",
        language: "en",
      },
    };

    const detected = timezoneMap[timezone] || {};

    return {
      country: detected.country || "Unknown",
      countryCode: detected.countryCode || "US",
      region: "",
      city: "",
      currency: detected.currency || "USD",
      language: detected.language || locale.split("-")[0] || "en",
      timezone,
    };
  }

  private getFallbackLocation(): LocationData {
    const locale = navigator.language;
    return {
      country: "Unknown",
      countryCode: "US",
      region: "",
      city: "",
      currency: "USD",
      language: locale.split("-")[0] || "en",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  private getLanguageFromCountry(countryCode: string): string {
    const countryLanguageMap: Record<string, string> = {
      KZ: "kz",
      RU: "ru",
      IN: "en",
      GB: "en",
      US: "en",
      CA: "en",
      AU: "en",
      FR: "en", // We'll keep English for broader appeal
      DE: "en",
      ES: "en",
      IT: "en",
    };

    return countryLanguageMap[countryCode] || "en";
  }

  getShippingInfo(countryCode: string): ShippingInfo {
    const shippingZones: Record<string, ShippingInfo> = {
      KZ: {
        zone: "Kazakhstan (Domestic)",
        estimatedDays: "1-2 business days",
        freeShippingThreshold: 30,
        defaultCurrency: "KZT",
        preferredLanguages: ["kz", "ru", "en"],
      },
      RU: {
        zone: "CIS Countries",
        estimatedDays: "3-5 business days",
        freeShippingThreshold: 75,
        defaultCurrency: "RUB",
        preferredLanguages: ["ru", "en"],
      },
      IN: {
        zone: "Asia Pacific",
        estimatedDays: "4-7 business days",
        freeShippingThreshold: 100,
        defaultCurrency: "INR",
        preferredLanguages: ["en"],
      },
      US: {
        zone: "North America",
        estimatedDays: "6-10 business days",
        freeShippingThreshold: 150,
        defaultCurrency: "USD",
        preferredLanguages: ["en"],
      },
      GB: {
        zone: "Europe",
        estimatedDays: "5-8 business days",
        freeShippingThreshold: 125,
        defaultCurrency: "EUR",
        preferredLanguages: ["en"],
      },
    };

    // Default to international shipping for unlisted countries
    return (
      shippingZones[countryCode] || {
        zone: "International",
        estimatedDays: "7-14 business days",
        freeShippingThreshold: 200,
        defaultCurrency: "USD",
        preferredLanguages: ["en"],
      }
    );
  }

  getCurrencySymbol(currency: string): string {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      RUB: "₽",
      KZT: "₸",
      INR: "₹",
      GBP: "£",
    };
    return symbols[currency] || "$";
  }

  getLocationData(): LocationData | null {
    return this.locationData;
  }
}

export const locationService = LocationService.getInstance();
