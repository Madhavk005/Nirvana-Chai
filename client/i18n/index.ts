import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Enhanced Translation resources with comprehensive coverage
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        shop: "Shop",
        about: "About",
        contact: "Contact",
        account: "My Account",
        cart: "Cart",
        search: "Search",
      },

      // Hero section - Enhanced with emotional appeal
      hero: {
        title1: "Discover Your",
        title2: "Perfect Cup",
        subtitle:
          "From ancient gardens to your cup — experience the art of mindful tea drinking that connects cultures, generations, and moments of pure tranquility.",
        cta_primary: "Start Your Journey",
        cta_secondary: "Explore Collection",
        scroll_hint: "Scroll to explore our story",
      },

      // Why Choose section - Enhanced copy
      why_choose: {
        title: "Why Tea Lovers Choose Nirvanachai",
        subtitle:
          "Discover the difference that three generations of passion, premium sourcing, and mindful curation make in every sip.",
        expertise: "Three generations of mastery",
        expertise_desc:
          "Traditional wisdom passed down through generations of tea artisans",
        global: "Ethically sourced worldwide",
        global_desc:
          "Premium teas from the world's most celebrated tea gardens",
        curated: "Mindfully crafted blends",
        curated_desc:
          "Each blend tells a story of flavor, aroma, and cultural heritage",
        pure: "Pure, natural ingredients",
        pure_desc: "No artificial additives — just the pure essence of tea",
        sustainable: "Sustainably cultivated",
        sustainable_desc:
          "Supporting communities and preserving tea traditions",
        fresh: "Peak freshness guaranteed",
        fresh_desc: "From garden to cup in days, not months",
      },

      // Global Sourcing - Enhanced storytelling
      global_sourcing: {
        title: "A Global Tea Journey",
        subtitle:
          "Each region we source from has been carefully selected for its unique terroir, time-honored traditions, and exceptional quality. Discover the stories behind every leaf.",
        learn_story: "Discover Our Heritage",
        darjeeling: "The Champagne of Teas",
        assam: "Bold & Robust Character",
        kenya: "Bright African Excellence",
        ceylon: "High-Grown Purity",
        china: "Ancient Tea Wisdom",
        vietnam: "Delicate Mountain Teas",
      },

      // Featured Products - Conversion-focused
      featured: {
        title: "Bestselling Tea Collections",
        subtitle:
          "Join thousands of tea lovers who have discovered their perfect cup with our most beloved blends.",
        add_to_cart: "Add to Cart",
        view_all: "Shop All Teas",
        bestseller: "Bestseller",
        new: "New",
        limited: "Limited Edition",
      },

      // Newsletter - FOMO and value-driven
      newsletter: {
        title: "Join 10,000+ Tea Enthusiasts",
        subtitle:
          "Get exclusive access to new blends, brewing secrets, and special offers before anyone else.",
        email_placeholder: "Enter your email address",
        subscribe: "Get Exclusive Access",
        no_spam: "Premium content only. Unsubscribe anytime.",
        benefit1: "🎁 20% off your first order",
        benefit2: "🍃 Early access to new blends",
        benefit3: "📚 Free brewing guides",
      },

      // Contact Info
      contact: {
        phone: "+7 702 201 0652",
        email: "support@nirvanachai.kz",
        address: "Раимбек 165а, Almaty, Kazakhstan",
        whatsapp_tooltip: "Chat with us on WhatsApp",
      },

      // Common CTAs - Optimized for conversion
      cta: {
        shop_now: "Shop Now",
        learn_more: "Learn More",
        get_started: "Get Started",
        try_free: "Try Risk-Free",
        join_now: "Join Now",
        discover: "Discover",
        explore: "Explore",
        continue: "Continue",
        add_to_cart: "Add to Cart",
        buy_now: "Buy Now",
        free_shipping: "Free Shipping",
        money_back: "30-Day Money Back",
      },

      // Shipping & Location
      shipping: {
        estimated_delivery: "Estimated delivery",
        free_shipping_from: "Free shipping from",
        your_location: "Shipping to",
        change_location: "Change location",
        local_currency: "Prices in",
      },

      // Trust indicators
      trust: {
        secure_checkout: "Secure Checkout",
        money_back: "30-Day Money Back Guarantee",
        fast_delivery: "Fast Worldwide Delivery",
        customer_support: "24/7 Customer Support",
        trusted_by: "Trusted by 10,000+ customers",
      },

      // Shop Page
      shop: {
        title: "Premium Tea Collection",
        subtitle: "Discover world-class teas from the finest gardens",
        filter_by: "Filter by",
        sort_by: "Sort by",
        view_mode: "View",
        search_placeholder: "Search teas...",
        no_results: "No teas found",
        load_more: "Load More",
        price_range: "Price Range",
        tea_type: "Tea Type",
        origin: "Origin",
        caffeine: "Caffeine Level",
        in_stock: "In Stock",
        out_of_stock: "Out of Stock",
        sale: "Sale",
        new_arrival: "New",
        bestseller: "Bestseller",
        premium: "Premium",
        organic: "Organic",
        fair_trade: "Fair Trade",
      },

      // Product Details
      product: {
        details: "Product Details",
        ingredients: "Ingredients",
        brewing_guide: "Brewing Guide",
        reviews: "Reviews",
        shipping_info: "Shipping Information",
        related_products: "You Might Also Like",
        add_to_wishlist: "Add to Wishlist",
        remove_from_wishlist: "Remove from Wishlist",
        share: "Share",
        quantity: "Quantity",
        total_price: "Total Price",
        bulk_discount: "Bulk Discount Available",
        tea_type: "Tea Type",
        origin_country: "Origin",
        caffeine_level: "Caffeine",
        brewing_time: "Brewing Time",
        brewing_temp: "Water Temperature",
        steeps: "Number of Steeps",
      },

      // Account Pages
      account: {
        login: "Sign In",
        register: "Create Account",
        logout: "Sign Out",
        dashboard: "My Account",
        profile: "Profile",
        orders: "Order History",
        wishlist: "Wishlist",
        addresses: "Addresses",
        payment_methods: "Payment Methods",
        preferences: "Preferences",
        welcome_back: "Welcome back",
        new_customer: "New to Nirvanachai?",
        forgot_password: "Forgot Password?",
        remember_me: "Remember me",
        email: "Email Address",
        password: "Password",
        confirm_password: "Confirm Password",
        first_name: "First Name",
        last_name: "Last Name",
        phone: "Phone Number",
        create_account_cta: "Create your account to start your tea journey",
      },

      // Checkout & Orders
      checkout: {
        title: "Checkout",
        order_summary: "Order Summary",
        shipping_address: "Shipping Address",
        billing_address: "Billing Address",
        payment_method: "Payment Method",
        order_notes: "Order Notes",
        place_order: "Place Order",
        processing: "Processing...",
        subtotal: "Subtotal",
        shipping: "Shipping",
        tax: "Tax",
        total: "Total",
        discount: "Discount",
        coupon_code: "Coupon Code",
        apply_coupon: "Apply",
        order_confirmation: "Order Confirmation",
        order_number: "Order Number",
        estimated_delivery: "Estimated Delivery",
        track_order: "Track Order",
        order_status: "Order Status",
        order_placed: "Order Placed",
        processing_order: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
      },

      // About Page
      about: {
        title: "Our Story",
        subtitle: "Three generations of tea mastery",
        heritage_title: "Heritage & Tradition",
        heritage_text:
          "Founded in 1952, Nirvanachai represents three generations of dedicated tea craftsmen who have perfected the art of blending premium teas from around the world.",
        quality_title: "Uncompromising Quality",
        quality_text:
          "Every leaf is hand-selected from the finest tea gardens across India, China, Sri Lanka, and beyond. We maintain direct relationships with growers to ensure exceptional quality and fair trade practices.",
        mission_title: "Our Mission",
        mission_text:
          "To bring moments of tranquility and connection to tea lovers worldwide through premium, ethically-sourced teas that honor tradition while embracing innovation.",
        values_title: "Our Values",
        sustainability: "Sustainability",
        quality: "Quality",
        tradition: "Tradition",
        community: "Community",
      },

      // Common UI Elements
      ui: {
        loading: "Loading...",
        error: "Something went wrong",
        retry: "Try Again",
        cancel: "Cancel",
        confirm: "Confirm",
        save: "Save",
        edit: "Edit",
        delete: "Delete",
        close: "Close",
        next: "Next",
        previous: "Previous",
        back: "Back",
        submit: "Submit",
        reset: "Reset",
        clear: "Clear",
        select: "Select",
        choose: "Choose",
        upload: "Upload",
        download: "Download",
      },
    },
  },

  ru: {
    translation: {
      // Navigation
      nav: {
        home: "Главная",
        shop: "Магазин",
        about: "О нас",
        contact: "Контакты",
        account: "Мой аккаунт",
        cart: "Корзина",
        search: "Поиск",
      },

      // Hero section
      hero: {
        title1: "Откройте Свою",
        title2: "Идеальную Чашку",
        subtitle:
          "От древних садов до вашей чашки — испытайте искусство осознанного чаепития, которое соединяет культуры, поколения и моменты чистого спокойствия.",
        cta_primary: "Начать Путешествие",
        cta_secondary: "Изучить Коллекцию",
        scroll_hint: "Прокрутите, чтобы изучить нашу историю",
      },

      // Why Choose section
      why_choose: {
        title: "Почему любители чая выбирают Nirvanachai",
        subtitle:
          "Откройте для себя разницу, которую создают три поколения страсти, пр��миальные источники и внимательная курация в каждом глотке.",
        expertise: "Три поколения мастерства",
        expertise_desc:
          "Традиционная мудрость, передаваемая поколениями чайных мастеров",
        global: "Этично поставляемый по всему миру",
        global_desc: "Премиальные чаи из самых известных чайных садов мира",
        curated: "Внимательно созданные смеси",
        curated_desc:
          "Каждая смесь рассказывает историю вкуса, аромата и культурного наследия",
        pure: "Чистые, натуральные ингредиенты",
        pure_desc: "Никаких искусственных добавок — только чистая суть чая",
        sustainable: "Устойчиво выращенный",
        sustainable_desc: "Поддержка сообществ и сохранение чайных традиций",
        fresh: "Гарантированная свежесть",
        fresh_desc: "От сада до чашки за дни, а не месяцы",
      },

      // Global Sourcing
      global_sourcing: {
        title: "Глобальное Чайное ��утешествие",
        subtitle:
          "Каждый регион, из которого мы получаем сырье, был тщательно отобран за его уникальный терруар, вековые традиции и исключительное качество.",
        learn_story: "Узнать Нашу Историю",
        darjeeling: "Шампанское среди чаев",
        assam: "Смелый и крепкий характер",
        kenya: "Яркое африканское превосходство",
        ceylon: "Высокогорная чистота",
        china: "Древняя чайная мудрость",
        vietnam: "Деликатные горные чаи",
      },

      // Featured Products
      featured: {
        title: "Бестселлеры Чайных Коллекций",
        subtitle:
          "Присоединяйтесь к тысячам любителей чая, которые нашли свою идеальную чашку с нашими самыми любимыми смесями.",
        add_to_cart: "В корзину",
        view_all: "Все чаи",
        bestseller: "Бестселлер",
        new: "Новинка",
        limited: "Лимитированная серия",
      },

      // Newsletter
      newsletter: {
        title: "Присоединяйтесь к 10,000+ Ценителей Чая",
        subtitle:
          "Получите эксклюзивный доступ к новым смесям, секретам заваривания и специальным предложениям раньше всех.",
        email_placeholder: "Введите ваш email",
        subscribe: "Получить Эксклюзивный Доступ",
        no_spam: "Только премиум контент. Отписка в любое время.",
        benefit1: "🎁 20% скидка на первый заказ",
        benefit2: "🍃 Ранний доступ к новым смесям",
        benefit3: "📚 Бесплатные гиды по завариванию",
      },

      // Contact Info
      contact: {
        phone: "+7 702 201 0652",
        email: "support@nirvanachai.kz",
        address: "Раимбек 165а, Алматы, Казахстан",
        whatsapp_tooltip: "Напишите нам в WhatsApp",
      },

      // CTAs
      cta: {
        shop_now: "Купить сейчас",
        learn_more: "Узнат�� больше",
        get_started: "Начать",
        try_free: "Попробовать без риска",
        join_now: "Присоединиться",
        discover: "Открыть",
        explore: "Изучить",
        continue: "Продолжить",
        add_to_cart: "В корзину",
        buy_now: "Купить сейчас",
        free_shipping: "Бесплатная доставка",
        money_back: "30 дней возврата денег",
      },

      // Shipping & Location
      shipping: {
        estimated_delivery: "Ожидаемая доставка",
        free_shipping_from: "Бесплатная доставка от",
        your_location: "Доставка в",
        change_location: "Изменить местоположение",
        local_currency: "Цены в",
      },

      // Trust indicators
      trust: {
        secure_checkout: "Безопасная оплата",
        money_back: "30-дневная гарантия возврата денег",
        fast_delivery: "Быстрая доставка по всему миру",
        customer_support: "Поддержка клиентов 24/7",
        trusted_by: "Нам доверяют 10,000+ клиентов",
      },

      // Shop Page - Russian
      shop: {
        title: "Премиальная Коллекция Чая",
        subtitle: "Откройте для себя мировые чаи из лучших садов",
        filter_by: "Фильтр по",
        sort_by: "Сортировать по",
        view_mode: "Вид",
        search_placeholder: "Поиск чая...",
        no_results: "Чай не найден",
        load_more: "Загрузить еще",
        price_range: "Ценовой диапазон",
        tea_type: "Тип чая",
        origin: "Происхождение",
        caffeine: "Уровень кофеина",
        in_stock: "В наличии",
        out_of_stock: "Нет в наличии",
        sale: "Скидка",
        new_arrival: "Новинка",
        bestseller: "Бестселлер",
        premium: "Премиум",
        organic: "Органический",
        fair_trade: "Справедливая торговля",
      },

      // Product Details - Russian
      product: {
        details: "Детали продукта",
        ingredients: "Ингредиенты",
        brewing_guide: "Руководство по завариванию",
        reviews: "Отзывы",
        shipping_info: "Информация о д��ставке",
        related_products: "Вам также может понравиться",
        add_to_wishlist: "Добавить в избранное",
        remove_from_wishlist: "Удалить из избранного",
        share: "Поделиться",
        quantity: "Количество",
        total_price: "Общая стоимость",
        bulk_discount: "Скидка при покупке оптом",
        tea_type: "Тип чая",
        origin_country: "Происхождение",
        caffeine_level: "Кофеин",
        brewing_time: "Время заваривания",
        brewing_temp: "Температура воды",
        steeps: "Количество завариваний",
      },

      // Account Pages - Russian
      account: {
        login: "Войти",
        register: "Создать аккаунт",
        logout: "Выйти",
        dashboard: "Мой аккаунт",
        profile: "Профиль",
        orders: "История заказов",
        wishlist: "Избранное",
        addresses: "Адреса",
        payment_methods: "Способы оплаты",
        preferences: "Предпочтения",
        welcome_back: "Добро пожаловать",
        new_customer: "Впе��вые в Nirvanachai?",
        forgot_password: "Забыли пароль?",
        remember_me: "Запомнить меня",
        email: "Электронная почта",
        password: "Пароль",
        confirm_password: "Подтвердите пароль",
        first_name: "Имя",
        last_name: "Фамилия",
        phone: "Номер телефона",
        create_account_cta:
          "Создайте аккаунт, чтобы начать ваше чайное путешествие",
      },

      // Checkout & Orders - Russian
      checkout: {
        title: "Оформление заказа",
        order_summary: "Сводка заказа",
        shipping_address: "Адрес доставки",
        billing_address: "Адрес для выставления счета",
        payment_method: "Способ оплаты",
        order_notes: "Примечания к заказу",
        place_order: "Оформить заказ",
        processing: "Обработка...",
        subtotal: "Промежуточный итог",
        shipping: "Доставка",
        tax: "Налог",
        total: "Итого",
        discount: "Скидка",
        coupon_code: "Код купона",
        apply_coupon: "Применить",
        order_confirmation: "Подтверждение заказа",
        order_number: "Номер заказа",
        estimated_delivery: "Ожидаемая доставка",
        track_order: "Отследить заказ",
        order_status: "Статус заказа",
        order_placed: "Заказ размещен",
        processing_order: "Обработка",
        shipped: "Отправлен",
        delivered: "Доставлен",
        cancelled: "Отменен",
      },

      // About Page - Russian
      about: {
        title: "Наша История",
        subtitle: "Три поколения чайного мастерства",
        heritage_title: "Наследие и Традиции",
        heritage_text:
          "Основанная в 1952 году, Nirvanachai представляет три поколения преданных чайных мастеров, которые совершенствовали искусство смешивания премиальных чаев со всего мира.",
        quality_title: "Бескомпромиссное Качество",
        quality_text:
          "Каждый лист отбирается вручную из лучших чайных садов Индии, Китая, Шри-Ланки и других стран. Мы поддерживаем прямые отношения с производителями для обеспечения исключительного качества и справедливой торговли.",
        mission_title: "Наша Миссия",
        mission_text:
          "Принести моменты спокойствия и связи любителям чая по всему миру через премиальные, этично поставляемые чаи, которые чтят традиции, принимая инновации.",
        values_title: "Наши Ценности",
        sustainability: "Устойчивость",
        quality: "Качество",
        tradition: "Традиция",
        community: "Сообщество",
      },

      // Common UI Elements - Russian
      ui: {
        loading: "Загрузка...",
        error: "Что-то пошло не так",
        retry: "Попробовать снова",
        cancel: "Отмена",
        confirm: "Подтвердить",
        save: "Сохранить",
        edit: "Редактировать",
        delete: "Удалить",
        close: "Закрыть",
        next: "Далее",
        previous: "Предыдущий",
        back: "Назад",
        submit: "Отправить",
        reset: "Сбросить",
        clear: "Очистить",
        select: "Выбрать",
        choose: "Выбрать",
        upload: "Загрузить",
        download: "Скачать",
      },
    },
  },

  kz: {
    translation: {
      // Navigation
      nav: {
        home: "Басты бет",
        shop: "Дүкен",
        about: "Біз туралы",
        contact: "Байланыс",
        account: "Менің аккаунтым",
        cart: "Себет",
        search: "Іздеу",
      },

      // Hero section
      hero: {
        title1: "Өзіңіздің",
        title2: "Керемет Кесеңізді Табыңыз",
        subtitle:
          "Ежелгі бақтардан сіздің кесеңізге дейін — мәдениеттер, ұрпақтар мен таза тыныштық сәттерін байланыстыратын саналы шай ішу өнерін сезініңіз.",
        cta_primary: "Саяхатты Бастау",
        cta_secondary: "Коллекцияны Зерттеу",
        scroll_hint: "Біздің тарихымызды зерттеу үшін төмен жылжытыңыз",
      },

      // Why Choose section
      why_choose: {
        title: "Шай сүйушілер неліктен Nirvanachai таңдайды",
        subtitle:
          "Әр ішімде үш ұрпақтың құмарлығы, сапалы дереккөздер және мұқият курацияның жасайтын айырмашылығын табыңыз.",
        expertise: "Үш ұрпақтың шеберлігі",
        expertise_desc:
          "Шай шеберлерінің ұрпақтарымен берілетін дәстүрлі данышпандық",
        global: "Әлемдік этикалық дереккөздер",
        global_desc: "Әлемдегі ең танымал шай бақтарынан сапалы шайлар",
        curated: "Мұқият жасалған қоспалар",
        curated_desc:
          "Әр қоспа дәм, хош иіс және мәдени мұраның тарихын айтады",
        pure: "Таза, табиғи ингредиенттер",
        pure_desc: "Жасанды қоспалар жоқ — тек шайдың таза маңызы",
        sustainable: "Тұрақты өсірілген",
        sustainable_desc: "Қауымдастықтарды қолдау және шай дәстүрлерін сақтау",
        fresh: "Кепілді тазалық",
        fresh_desc: "Бақтан кесеге дейін айлар емес, күндер ішінде",
      },

      // Global Sourcing
      global_sourcing: {
        title: "Ғаламдық Шай Саяхаты",
        subtitle:
          "Біз де��еккөз алатын әр өңір өзінің бірегей терруары, ғасырлық дәстүрлері және е��екше сапасы үшін мұқият таңдалған.",
        learn_story: "Біздің Мұрамызды Білу",
        darjeeling: "Шайлардың шампаны",
        assam: "Батыл және берік сипат",
        kenya: "Жарқын африкалық үздік",
        ceylon: "Биік таулы тазалық",
        china: "Ежелгі шай данышпандығы",
        vietnam: "Нәзік тау шайлары",
      },

      // Featured Products
      featured: {
        title: "Сатылым Көшбасшылары",
        subtitle:
          "Біздің ең сүйікті қоспаларымызбен өздерінің керемет кесесін тапқан мыңдаған шай сүйушілерге қосылыңыз.",
        add_to_cart: "Себетке Қосу",
        view_all: "Барлық Шайлар",
        bestseller: "Бестселлер",
        new: "Жаңа",
        limited: "Шектеулі серия",
      },

      // Newsletter
      newsletter: {
        title: "10,000+ Шай Қанаушыларына Қосылыңыз",
        subtitle:
          "Жаңа қоспалар, дайындау құпиялары және басқаларға дейін арнайы ұсыныстарға э��склюзивті қол жеткізуді алыңыз.",
        email_placeholder: "Email мекенжайыңызды енгізіңіз",
        subscribe: "Эксклюзивті Қол Жеткі��у Алу",
        no_spam:
          "Тек премиум контент. Кез келген уақытта жазылудан бас тартыңыз.",
        benefit1: "🎁 Бірінші тапсырысқа 20% жеңілдік",
        benefit2: "🍃 Жаңа қоспаларға ерте қол жеткізу",
        benefit3: "📚 Тегін дайындау нұсқаулықтары",
      },

      // Contact Info
      contact: {
        phone: "+7 702 201 0652",
        email: "support@nirvanachai.kz",
        address: "Раимбек 165а, Алматы, Қазақстан",
        whatsapp_tooltip: "WhatsApp арқылы бізбен чаттасыңыз",
      },

      // CTAs
      cta: {
        shop_now: "Қазір сатып алу",
        learn_more: "Көбірек білу",
        get_started: "Бастау",
        try_free: "Тәуекелсіз сынау",
        join_now: "Қазір қосылу",
        discover: "Ашу",
        explore: "Зерттеу",
        continue: "Жалғастыру",
        add_to_cart: "Себетке қосу",
        buy_now: "Қазір сатып алу",
        free_shipping: "Тегін жеткізу",
        money_back: "30 күн ақша қайтару",
      },

      // Shipping & Location
      shipping: {
        estimated_delivery: "Болжамды жеткізу",
        free_shipping_from: "Тегін жеткізу бастап",
        your_location: "Жеткізу",
        change_location: "Орынды өзгерту",
        local_currency: "Бағалар",
      },

      // Trust indicators
      trust: {
        secure_checkout: "Қауіпсіз төлем",
        money_back: "30 күндік ақша қайтару кепілдігі",
        fast_delivery: "Әлемдік жылдам жеткізу",
        customer_support: "24/7 тұтынушыларды қолдау",
        trusted_by: "10,000+ тұтынушы сенеді",
      },

      // Shop Page - Kazakh
      shop: {
        title: "Премиум Шай Коллекциясы",
        subtitle: "Ең жақсы бақтардан әлемдік шайларды ашыңыз",
        filter_by: "Сүзгі бойынша",
        sort_by: "Сұрыптау",
        view_mode: "Көру",
        search_placeholder: "Шай іздеу...",
        no_results: "Шай табылмады",
        load_more: "Көбірек жүктеу",
        price_range: "Баға ауқымы",
        tea_type: "Шай түрі",
        origin: "Шығу тегі",
        caffeine: "Кофеин деңгейі",
        in_stock: "Қоймада бар",
        out_of_stock: "Қоймада жоқ",
        sale: "Жеңілдік",
        new_arrival: "Жаңа",
        bestseller: "Бестселлер",
        premium: "Премиум",
        organic: "Органикалық",
        fair_trade: "Әділ сауда",
      },

      // Product Details - Kazakh
      product: {
        details: "Өнім мәліметтері",
        ingredients: "Ингредиенттер",
        brewing_guide: "Дайындау нұсқаулығы",
        reviews: "Пікірлер",
        shipping_info: "Жеткізу туралы ақпарат",
        related_products: "Сізге ұнауы мүмкін",
        add_to_wishlist: "Тілек тізіміне қосу",
        remove_from_wishlist: "Тілек тізімінен алып тастау",
        share: "Бөлісу",
        quantity: "Саны",
        total_price: "Жалпы бағасы",
        bulk_discount: "Көлемді сатып алғандағы жеңілдік",
        tea_type: "Шай түрі",
        origin_country: "Шығу тегі",
        caffeine_level: "Кофеин",
        brewing_time: "Дайындау уақыты",
        brewing_temp: "Су температурасы",
        steeps: "Дайындау рет саны",
      },

      // Account Pages - Kazakh
      account: {
        login: "Кіру",
        register: "Аккаунт жасау",
        logout: "Шығу",
        dashboard: "Менің аккаунтым",
        profile: "Профиль",
        orders: "Тапсырыс тарихы",
        wishlist: "Тілек тізімі",
        addresses: "Мекенжайлар",
        payment_methods: "Төлем тәсілдері",
        preferences: "Теңшелімдер",
        welcome_back: "Қош келдіңіз",
        new_customer: "Nirvanachai-да алғаш рет?",
        forgot_password: "Құпия сөзді ұмыттыңыз ба?",
        remember_me: "Мені есте сақта",
        email: "Электрондық пошта",
        password: "Құпия сөз",
        confirm_password: "Құпия сөзді растау",
        first_name: "Аты",
        last_name: "Тегі",
        phone: "Телефон нөмірі",
        create_account_cta: "Шай саяхатыңызды бастау үшін аккаунт жасаңыз",
      },

      // Checkout & Orders - Kazakh
      checkout: {
        title: "Тапсырыс ресімдеу",
        order_summary: "Тапсырыс қорытындысы",
        shipping_address: "Жеткізу мекенжайы",
        billing_address: "Төлем мекенжайы",
        payment_method: "Төлем тәсілі",
        order_notes: "Тапсырыс ескертпелері",
        place_order: "Тапсырыс беру",
        processing: "Өңдеу...",
        subtotal: "Аралық сома",
        shipping: "Жеткізу",
        tax: "Салық",
        total: "Барлығы",
        discount: "Жеңілдік",
        coupon_code: "Купон коды",
        apply_coupon: "Қолдану",
        order_confirmation: "Тапсырыс растауы",
        order_number: "Тапсырыс нөмірі",
        estimated_delivery: "Болжамды жеткізу",
        track_order: "Тапсырысты қадағалау",
        order_status: "Тапсырыс мәртебесі",
        order_placed: "Тапс��рыс берілді",
        processing_order: "Өңдеу",
        shipped: "Жіберілді",
        delivered: "Жеткізілді",
        cancelled: "Бас тартылды",
      },

      // About Page - Kazakh
      about: {
        title: "Біздің Тарих",
        subtitle: "Үш ұрпақтың шай шеберлігі",
        heritage_title: "Мұра және Дәстүрлер",
        heritage_text:
          "1952 жылы құрылған Nirvanachai әлемнен премиум шайларды араластыру өнерін жетілдірген үш ұрпақ арпалы шай шеберлерін білдіреді.",
        quality_title: "Ымырасыз Сапа",
        quality_text:
          "Әр жапырақ Үндістан, Қытай, Шри-Ланка және басқа елдердің ең жақсы шай бақтарынан қолмен таңдалады. Ерекше сапа мен әділ сауда тәжірибелерін қамтамасыз ету үшін өндірушілермен тікелей қарым-қатынас орнатамыз.",
        mission_title: "Біздің Миссия",
        mission_text:
          "Дәстүрлерді құрметтеп, инновацияларды қабылдайтын премиум, этика��ық дереккөздегі шайлар арқылы әлемдегі шай сүйерлерге тыныштық пен байланыс сәттерін әкелу.",
        values_title: "Біздің Құндылықтар",
        sustainability: "Тұрақтылық",
        quality: "Сапа",
        tradition: "Дәстүр",
        community: "Қауымдастық",
      },

      // Common UI Elements - Kazakh
      ui: {
        loading: "Жүктелуде...",
        error: "Бірдеңе дұрыс болмады",
        retry: "Қайта сынау",
        cancel: "Бас тарту",
        confirm: "Растау",
        save: "Сақтау",
        edit: "Өзгерту",
        delete: "Жою",
        close: "Жабу",
        next: "Келесі",
        previous: "Алдыңғы",
        back: "Артқа",
        submit: "Жіберу",
        reset: "Қалпына келтіру",
        clear: "Тазарту",
        select: "Таңдау",
        choose: "Таңдау",
        upload: "Жүктеп салу",
        download: "Жүктеп алу",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
