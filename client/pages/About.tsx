import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Award,
  Globe,
  Heart,
  Leaf,
  Users,
  Shield,
  MapPin,
  Star,
} from "lucide-react";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import {
  useSimpleAnimation,
  animationClasses,
} from "../hooks/useSimpleAnimation";

export default function About() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguageCurrency();

  // Animation hooks
  const heroAnimation = useSimpleAnimation({ delay: 100 });
  const valuesAnimation = useSimpleAnimation({ delay: 150 });

  // Core Values - Simplified
  const coreValues = [
    {
      icon: Award,
      title: {
        en: "Three Generations of Expertise",
        ru: "Три поколения мастерства",
        kz: "Үш ұрпақ білімі",
      },
      description: {
        en: "Traditional wisdom passed down through generations of tea artisans",
        ru: "Традиционная мудрость, передаваемая поколениями чайных мастеров",
        kz: "Шай шеберлерінің ұрпақтан ұрпаққа берілетін дәстүрлі данышпандығы",
      },
    },
    {
      icon: Globe,
      title: {
        en: "Global Sourcing",
        ru: "Глобальные поставки",
        kz: "Жаһандық жеткізу",
      },
      description: {
        en: "Premium teas from the world's most celebrated tea gardens",
        ru: "Премиум чаи из самых известных чайных садов мира",
        kz: "Әлемнің ең атақты шай бақтарынан премиум шайлар",
      },
    },
    {
      icon: Heart,
      title: {
        en: "Pure & Natural",
        ru: "Чистый и натуральный",
        kz: "Таза және табиғи",
      },
      description: {
        en: "No artificial additives — just the pure essence of tea",
        ru: "Без искусственных добавок — только чистая сущность чая",
        kz: "Жасанды қоспалар жоқ — тек шайдың таза мәні",
      },
    },
    {
      icon: Leaf,
      title: {
        en: "Sustainable Practices",
        ru: "Устойчивая практика",
        kz: "Тұрақты тәжірибе",
      },
      description: {
        en: "Supporting communities and preserving tea traditions",
        ru: "Поддержка сообществ и сохранение чайных традиций",
        kz: "Қоғамдастықтарды қолдау және шай дәстүрлерін сақтау",
      },
    },
  ];

  const getLocalizedText = (textObj: any) => {
    if (!textObj) return "";
    if (currentLanguage.code === "ru" && textObj.ru) return textObj.ru;
    if (currentLanguage.code === "kz" && textObj.kz) return textObj.kz;
    return textObj.en || textObj;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={heroAnimation.elementRef}
            className={`text-center ${animationClasses.fadeInUp(heroAnimation.isVisible)}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
              {currentLanguage.code === "ru"
                ? "О нас"
                : currentLanguage.code === "kz"
                  ? "Біз туралы"
                  : "About Us"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {currentLanguage.code === "ru"
                ? "Мы — Nirvanachai, семейная компания с более чем 70-летней историей в мире чая. Наша миссия — делиться лучшими чаями мира с ценителями по всему миру."
                : currentLanguage.code === "kz"
                  ? "Біз — Nirvanachai, шай әлемінде 70 жылдан астам тарихы бар отбасылық компания. Біздің миссиямыз — әлемнің үздік шайларын әлем бойынша бағалаушылармен бөлісу."
                  : "We are Nirvanachai, a family company with over 70 years of history in the world of tea. Our mission is to share the world's finest teas with connoisseurs everywhere."}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={valuesAnimation.elementRef}
            className={`text-center mb-16 ${animationClasses.fadeInUp(valuesAnimation.isVisible)}`}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              {currentLanguage.code === "ru"
                ? "Наши ценности"
                : currentLanguage.code === "kz"
                  ? "Біздің құндылықтарымыз"
                  : "Our Values"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {currentLanguage.code === "ru"
                ? "Принципы, которые направляют нас в каждом решении"
                : currentLanguage.code === "kz"
                  ? "Әр шешімде бізді бағыттайтын принциптер"
                  : "The principles that guide us in every decision"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <value.icon className="h-12 w-12 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {getLocalizedText(value.title)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {getLocalizedText(value.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
              {currentLanguage.code === "ru"
                ? "Глобальное присутствие"
                : currentLanguage.code === "kz"
                  ? "Жаһандық қатысу"
                  : "Global Presence"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {currentLanguage.code === "ru"
                ? "От Алматы до мира — мы приносим лучшие чаи в каждый уголок планеты"
                : currentLanguage.code === "kz"
                  ? "Алматыдан әлемге дейін — біз планетаның әр бұрышындағы үздік шайларды әкелеміз"
                  : "From Almaty to the world — we bring the finest teas to every corner of the planet"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <MapPin className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentLanguage.code === "ru"
                  ? "Базировано в Алматы"
                  : currentLanguage.code === "kz"
                    ? "Алматыда орналасқан"
                    : "Based in Almaty"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage.code === "ru"
                  ? "Казахстан — наш дом и сердце чайной культуры"
                  : currentLanguage.code === "kz"
                    ? "Қазақстан — біздің үйіміз және шай мәдениетінің жүрегі"
                    : "Kazakhstan — our home and the heart of tea culture"}
              </p>
            </div>

            <div className="p-6">
              <Globe className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentLanguage.code === "ru"
                  ? "Международные поставки"
                  : currentLanguage.code === "kz"
                    ? "Халықаралық жеткізулер"
                    : "International Shipping"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage.code === "ru"
                  ? "Доставляем в более чем 40 стран мира"
                  : currentLanguage.code === "kz"
                    ? "Әлемнің 40-тан астам еліне жеткіземіз"
                    : "Shipping to over 40 countries worldwide"}
              </p>
            </div>

            <div className="p-6">
              <Users className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentLanguage.code === "ru"
                  ? "Глобальное сообщество"
                  : currentLanguage.code === "kz"
                    ? "Жаһандық қоғамдастық"
                    : "Global Community"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage.code === "ru"
                  ? "Более 100,000 довольных клиентов"
                  : currentLanguage.code === "kz"
                    ? "100,000-нан астам қанағаттанған клиент"
                    : "Over 100,000 satisfied customers"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            {currentLanguage.code === "ru"
              ? "Присоединяйтесь к нам"
              : currentLanguage.code === "kz"
                ? "Бізге қосылыңыз"
                : "Join Our Journey"}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {currentLanguage.code === "ru"
              ? "Откройте для себя мир изысканного чая с Nirvanachai"
              : currentLanguage.code === "kz"
                ? "Nirvanachai компаниясымен талғампаз шай әлемін ашыңыз"
                : "Discover the world of exquisite tea with Nirvanachai"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {currentLanguage.code === "ru"
                ? "Посмотреть коллекцию"
                : currentLanguage.code === "kz"
                  ? "Коллекцияны қарау"
                  : "View Collection"}
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              {currentLanguage.code === "ru"
                ? "Связаться с нами"
                : currentLanguage.code === "kz"
                  ? "Бізбен байланысу"
                  : "Contact Us"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
