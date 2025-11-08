import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";

export default function Contact() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguageCurrency();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-emerald-600" />,
      title: {
        en: "Phone Support",
        ru: "Телефонная поддержка",
        kz: "Телефондық қолдау",
      },
      content: "+7 702 201 0652",
      description: {
        en: "Mon-Fri 9AM-6PM (Almaty Time)",
        ru: "Пн-Пт 9:00-18:00 (время Алматы)",
        kz: "Дс-Бс 9:00-18:00 (Алматы уақыты)",
      },
      action: "tel:+77022010652",
    },
    {
      icon: <Mail className="h-6 w-6 text-emerald-600" />,
      title: {
        en: "Email Support",
        ru: "Поддержка по email",
        kz: "Email қолдау",
      },
      content: "support@nirvanachai.kz",
      description: {
        en: "We typically respond within 24 hours",
        ru: "Обычно отвечаем в течение 24 часов",
        kz: "Әдетте 24 сағат ішінде жауап береміз",
      },
      action: "mailto:support@nirvanachai.kz",
    },
    {
      icon: <MapPin className="h-6 w-6 text-emerald-600" />,
      title: {
        en: "Our Location",
        ru: "Наше местоположение",
        kz: "Біздің орналасқан жеріміз",
      },
      content: "Раимбек 165а",
      description: {
        en: "Almaty, Kazakhstan",
        ru: "Алматы, Казахстан",
        kz: "Алматы, Қазақстан",
      },
      action: null,
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-emerald-600" />,
      title: {
        en: "WhatsApp",
        ru: "WhatsApp",
        kz: "WhatsApp",
      },
      content: "+7 702 201 0652",
      description: {
        en: "Quick support via WhatsApp",
        ru: "Быстрая поддержка через WhatsApp",
        kz: "WhatsApp арқылы жылдам қолдау",
      },
      action: "https://wa.me/77022010652",
    },
  ];

  const faqs = [
    {
      question: {
        en: "How long does shipping take?",
        ru: "Сколько времени занимает доставка?",
        kz: "Жеткізу қанша уақыт алады?",
      },
      answer: {
        en: "We offer express delivery within Kazakhstan (1-2 days) and international shipping (5-10 business days depending on location).",
        ru: "Мы предлагаем экспресс-доставку по Казахстану (1-2 дня) и международную доставку (5-10 рабочих дней в зависимости от местоположения).",
        kz: "Біз Қазақстан бойынша экспресс жеткізуді (1-2 күн) және халықаралық жеткізуді (орналасқан жеріне байланысты 5-10 жұмыс күні) ұсынамыз.",
      },
    },
    {
      question: {
        en: "Do you offer tea tasting guidance?",
        ru: "Предоставляете ли вы рекомендации по дегустации чая?",
        kz: "Шай дәмін тату бойынша нұсқаулар бересіз бе?",
      },
      answer: {
        en: "Absolutely! Our tea experts are happy to provide personalized recommendations based on your taste preferences and brewing experience.",
        ru: "Конечно! Наши эксперты по чаю с радостью предоставят персональные рекомендации на основе ваших вкусовых предпочтений и опыта заваривания.",
        kz: "Әрине! Біздің шай сарапшылары сіздің дәм қалауларыңыз бен қайнату тәжірибеңіз негізінде жеке ұсыныстар беруге қуанышты.",
      },
    },
    {
      question: {
        en: "Are your teas organic?",
        ru: "Ваши чаи органические?",
        kz: "Сіздің шайларыңыз органикалық па?",
      },
      answer: {
        en: "Many of our teas are certified organic. Look for the 'Organic' badge on product pages, and feel free to contact us for specific certifications.",
        ru: "Многие из наших чаев имеют сертификат органического происхождения. Ищите значок 'Органический' на страницах товаров и не стесняйтесь обращаться к нам за конкретными сертификатами.",
        kz: "Біздің шайларымыздың көпшілігі органикалық сертификатталған. Тауар беттерінде 'Органикалық' белгісін іздеңіз және нақты сертификаттар үшін бізге хабарласыңыз.",
      },
    },
    {
      question: {
        en: "Can I return or exchange teas?",
        ru: "Можно ли вернуть или обменять чаи?",
        kz: "Шайларды қайтаруға немесе айырбастауға бола ма?",
      },
      answer: {
        en: "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied, contact us for returns or exchanges.",
        ru: "Да, мы предлагаем 30-дневную гарантию удовлетворенности. Если вы не полностью удовлетворены, свяжитесь с нами для возврата или обмена.",
        kz: "Иә, біз 30 күндік қанағаттану кепілдігін ұсынамыз. Егер сіз толық қанағаттанбасаңыз, қайтару немесе айырбастау үшін бізге хабарласыңыз.",
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
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            {currentLanguage.code === "ru"
              ? "Свяжитесь с нами"
              : currentLanguage.code === "kz"
                ? "Бізбен байланысу"
                : "Get in Touch"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {currentLanguage.code === "ru"
              ? "Есть вопросы о наших чаях, нужна консультация по завариванию или хотите узнать больше о нашей истории? Мы будем рады услышать от вас."
              : currentLanguage.code === "kz"
                ? "Біздің шайларымыз туралы сұрақтарыңыз бар ма, қайнату бойынша кеңес қажет пе немесе біздің тарихымыз туралы көбірек білгіңіз келе ме? Біз сізден есту үшін қуаныштымыз."
                : "Have questions about our teas, need brewing advice, or want to learn more about our story? We'd love to hear from you."}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{info.icon}</div>
                <h3 className="font-heading font-semibold text-gray-900 mb-2">
                  {getLocalizedText(info.title)}
                </h3>
                {info.action ? (
                  <a
                    href={info.action}
                    className="text-emerald-600 hover:text-emerald-800 font-medium block mb-2"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-emerald-600 font-medium mb-2">
                    {info.content}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  {getLocalizedText(info.description)}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                {currentLanguage.code === "ru"
                  ? "Отправьте нам сообщение"
                  : currentLanguage.code === "kz"
                    ? "Бізге хабар жіберіңіз"
                    : "Send us a Message"}
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                    {currentLanguage.code === "ru"
                      ? "Сообщение отправлено успешно!"
                      : currentLanguage.code === "kz"
                        ? "Хабар сәтті жіберілді!"
                        : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-gray-600">
                    {currentLanguage.code === "ru"
                      ? "Спасибо за обращение. Мы свяжемся с вами в течение 24 часов."
                      : currentLanguage.code === "kz"
                        ? "Хабарласу үшін рахмет. Біз 24 сағат ішінде сізбен байланысамыз."
                        : "Thank you for reaching out. We'll get back to you within 24 hours."}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-emerald-600 hover:text-emerald-800 underline"
                  >
                    {currentLanguage.code === "ru"
                      ? "Отправить еще одно сообщение"
                      : currentLanguage.code === "kz"
                        ? "Тағы бір хабар жіберу"
                        : "Send another message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentLanguage.code === "ru"
                          ? "Полное имя *"
                          : currentLanguage.code === "kz"
                            ? "Толық аты *"
                            : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        placeholder={
                          currentLanguage.code === "ru"
                            ? "Ваше полное имя"
                            : currentLanguage.code === "kz"
                              ? "Сіздің толық атыңыз"
                              : "Your full name"
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {currentLanguage.code === "ru"
                          ? "Адрес электронной почты *"
                          : currentLanguage.code === "kz"
                            ? "Email мекенжайы *"
                            : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentLanguage.code === "ru"
                        ? "Тема *"
                        : currentLanguage.code === "kz"
                          ? "Тақырып *"
                          : "Subject *"}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <option value="">
                        {currentLanguage.code === "ru"
                          ? "Выберите тему"
                          : currentLanguage.code === "kz"
                            ? "Тақырыпты таңдаңыз"
                            : "Select a subject"}
                      </option>
                      <option value="product-inquiry">
                        {currentLanguage.code === "ru"
                          ? "Запрос о товаре"
                          : currentLanguage.code === "kz"
                            ? "Тауар туралы сұрау"
                            : "Product Inquiry"}
                      </option>
                      <option value="brewing-advice">
                        {currentLanguage.code === "ru"
                          ? "Советы по завариванию"
                          : currentLanguage.code === "kz"
                            ? "Қайнату бойынша кеңестер"
                            : "Brewing Advice"}
                      </option>
                      <option value="order-support">
                        {currentLanguage.code === "ru"
                          ? "Поддержка заказа"
                          : currentLanguage.code === "kz"
                            ? "Тапсырыс қолдауы"
                            : "Order Support"}
                      </option>
                      <option value="wholesale">
                        {currentLanguage.code === "ru"
                          ? "Оптовый запрос"
                          : currentLanguage.code === "kz"
                            ? "Көтерме сұрау"
                            : "Wholesale Inquiry"}
                      </option>
                      <option value="partnership">
                        {currentLanguage.code === "ru"
                          ? "Партнерство"
                          : currentLanguage.code === "kz"
                            ? "Серіктестік"
                            : "Partnership"}
                      </option>
                      <option value="other">
                        {currentLanguage.code === "ru"
                          ? "Другое"
                          : currentLanguage.code === "kz"
                            ? "Басқа"
                            : "Other"}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentLanguage.code === "ru"
                        ? "Сообщение *"
                        : currentLanguage.code === "kz"
                          ? "Хабар *"
                          : "Message *"}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder={
                        currentLanguage.code === "ru"
                          ? "Расскажите, как мы можем вам помочь..."
                          : currentLanguage.code === "kz"
                            ? "Біз сізге қалай көмектесе алатынымызды айтыңыз..."
                            : "Tell us how we can help you..."
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        {currentLanguage.code === "ru"
                          ? "Отправка..."
                          : currentLanguage.code === "kz"
                            ? "Жіберу..."
                            : "Sending..."}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {currentLanguage.code === "ru"
                          ? "Отправить сообщение"
                          : currentLanguage.code === "kz"
                            ? "Хабар жіберу"
                            : "Send Message"}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Business Hours & Additional Info */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-emerald-600" />
                  {currentLanguage.code === "ru"
                    ? "Часы работы"
                    : currentLanguage.code === "kz"
                      ? "Жұмыс уақыты"
                      : "Business Hours"}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {currentLanguage.code === "ru"
                        ? "Понедельник - Пятница"
                        : currentLanguage.code === "kz"
                          ? "Дүйсенбі - Жұма"
                          : "Monday - Friday"}
                    </span>
                    <span className="font-medium text-gray-900">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {currentLanguage.code === "ru"
                        ? "Суббота"
                        : currentLanguage.code === "kz"
                          ? "Сенбі"
                          : "Saturday"}
                    </span>
                    <span className="font-medium text-gray-900">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {currentLanguage.code === "ru"
                        ? "Воскресенье"
                        : currentLanguage.code === "kz"
                          ? "Жексенбі"
                          : "Sunday"}
                    </span>
                    <span className="font-medium text-gray-900">
                      {currentLanguage.code === "ru"
                        ? "Закрыто"
                        : currentLanguage.code === "kz"
                          ? "Жабық"
                          : "Closed"}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  {currentLanguage.code === "ru"
                    ? "Все время указано в часовом поясе Алматы (GMT+6)"
                    : currentLanguage.code === "kz"
                      ? "Барлық уақыт Алматы уақыт белдеуінде көрсетілген (GMT+6)"
                      : "All times are in Almaty Time Zone (GMT+6)"}
                </p>
              </div>

              {/* Quick Support */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-gray-200 rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                  {currentLanguage.code === "ru"
                    ? "Нужна быстрая помощь?"
                    : currentLanguage.code === "kz"
                      ? "Жылдам көмек қажет пе?"
                      : "Need Quick Help?"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {currentLanguage.code === "ru"
                    ? "Для немедленной помощи обратитесь через WhatsApp или проверьте раздел FAQ."
                    : currentLanguage.code === "kz"
                      ? "Жедел көмек үшін WhatsApp арқылы хабарласыңыз немесе FAQ бөлімін тексеріңіз."
                      : "For immediate assistance, reach out via WhatsApp or check our FAQ section."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/77022010652"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href="/faq"
                    className="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                  >
                    {currentLanguage.code === "ru"
                      ? "Посмотреть FAQ"
                      : currentLanguage.code === "kz"
                        ? "FAQ қарау"
                        : "View FAQ"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">
            {currentLanguage.code === "ru"
              ? "Часто задаваемые вопросы"
              : currentLanguage.code === "kz"
                ? "Жиі қойылатын сұрақтар"
                : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <h3 className="font-heading font-semibold text-gray-900 mb-3">
                  {getLocalizedText(faq.question)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {getLocalizedText(faq.answer)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/faq"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
            >
              {currentLanguage.code === "ru"
                ? "Посмотреть все FAQ →"
                : currentLanguage.code === "kz"
                  ? "Барлық FAQ қарау →"
                  : "View all FAQs →"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
