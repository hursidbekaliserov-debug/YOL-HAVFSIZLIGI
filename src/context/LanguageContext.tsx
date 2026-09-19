'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'uz' | 'ru' | 'en';

export interface Translations {
  // Navigation
  nav_home: string;
  nav_map: string;
  nav_stats: string;
  nav_about: string;
  nav_news: string;
  nav_sos: string;
  nav_report: string;
  sub_brand: string;

  // News portal
  news_badge: string;
  news_title: string;
  news_subtitle: string;

  // Hero
  hero_badge_ai: string;
  hero_badge_fixed: string;
  hero_title_1: string;
  hero_title_ai: string;
  hero_title_2: string;
  hero_subtitle: string;
  hero_cta_map: string;
  hero_cta_stats: string;
  hero_cta_sos: string;

  // Quick report
  quick_title: string;
  quick_hint: string;
  quick_placeholder: string;
  quick_pothole: string;
  quick_traffic: string;
  quick_sign: string;
  quick_light: string;
  quick_send: string;
  quick_success: string;

  // Live stats
  stat_fixed: string;
  stat_ai_acc: string;
  stat_regions: string;
  stat_avg_time: string;
  stat_realtime: string;

  // Features
  feat_badge: string;
  feat_title: string;
  feat_subtitle: string;

  // Braking calc
  calc_badge: string;
  calc_title: string;
  calc_subtitle: string;
  calc_speed_label: string;
  calc_road_cond: string;
  calc_dry: string;
  calc_wet: string;
  calc_ice: string;
  calc_rec_dist: string;
  calc_total: string;
  calc_reaction: string;
  calc_braking: string;

  // Quiz
  quiz_badge: string;
  quiz_title: string;
  quiz_subtitle: string;
  quiz_counter: string;
  quiz_q_label: string;
  quiz_next: string;
  quiz_finish: string;
  quiz_restart: string;
  quiz_score_msg: string;

  // Feeds
  feed_title: string;
  feed_subtitle: string;
  feed_all: string;
  feed_fixed_badge: string;
  feed_progress_badge: string;

  // Leaderboard
  lead_badge: string;
  lead_title: string;
  lead_subtitle: string;
  lead_reports: string;
  lead_resolved: string;

  // Mobile App
  app_badge: string;
  app_title: string;
  app_desc: string;
  app_download: string;

  // FAQ
  faq_badge: string;
  faq_title: string;
  faq_subtitle: string;

  // Final CTA
  final_title: string;
  final_desc: string;
  final_btn: string;
  final_about_btn: string;

  // SOS Modal
  sos_title: string;
  sos_subtitle: string;
  sos_tip_title: string;
  sos_tip_desc: string;
  sos_close: string;
}

export const translations: Record<Language, Translations> = {
  uz: {
    nav_home: 'Bosh sahifa',
    nav_map: 'Interaktiv Xarita',
    nav_stats: 'Statistika & Tahlil',
    nav_about: 'Loyiha haqida',
    nav_news: 'Yangiliklar',
    nav_sos: 'SOS 102',
    nav_report: '+ Murojaat',
    sub_brand: 'O\'zbekiston Yo\'l Xavfsizligi',

    news_badge: 'Tezkor Xabarlar & Yangiliklar',
    news_title: 'Yo\'l Xavfsizligi Yangiliklari',
    news_subtitle: 'Respublika yo\'llaridagi so\'nggi o\'zgarishlar, ta\'mirlash ishlari va qoidalar',

    hero_badge_ai: 'Sun\'iy Intellektli Monitoring',
    hero_badge_fixed: '🟢 14,820+ Muammo Bartaraf Etildi',
    hero_title_1: 'Xavfsiz Yo\'llar —',
    hero_title_ai: 'Sun\'iy Intellekt',
    hero_title_2: 'va Jamoatchilik Kuchida',
    hero_subtitle: 'Yo\'llardagi chuqurchalar, nosoz svetoforlar va xavfli zonalarni real vaqtda aniqlash, xaritada belgilash va mas\'ul idoralar bilan hamkorlikda bartaraf etish platformasi.',
    hero_cta_map: '🗺️ Interaktiv Xaritani Ochish',
    hero_cta_stats: '📊 Hududlar Statistikasi',
    hero_cta_sos: '🚨 Tezkor SOS (102)',

    quick_title: 'Bosh sahifadan tezkor murojaat qoldirish:',
    quick_hint: '1 daqiqada xaritaga tushadi',
    quick_placeholder: 'Ko\'cha yoki chorraha nomi (masalan: Chilonzor 9-mavze)...',
    quick_pothole: '🕳️ Chuqurcha',
    quick_traffic: '🚦 Svetofor nosoz',
    quick_sign: '🚸 Yo\'l belgisi yo\'q',
    quick_light: '💡 Yoritish o\'chgan',
    quick_send: 'Yuborish 🚀',
    quick_success: '✓ Rahmat! Murojaatingiz qabul qilindi va AI tomonidan tekshiruvga yuborildi.',

    stat_fixed: 'Jami bartaraf etildi',
    stat_ai_acc: 'AI Aniqlik darajasi',
    stat_regions: 'Qamrab olingan hududlar',
    stat_avg_time: 'O\'rtacha chora ko\'rish',
    stat_realtime: 'Jonli',

    feat_badge: 'Ekotizim Imkoniyatlari',
    feat_title: 'Yo\'l Infratuzilmasini Yangi Bosqichga Olib Chiqamiz',
    feat_subtitle: 'Sun\'iy intellekt, fuqarolar ishtiroki va davlat xizmatlarini birlashtirgan kompleks yechimlar.',

    calc_badge: 'Interaktiv Xavfsizlik Kalkulyatori',
    calc_title: 'Avtomobil To\'xtash Masofasi Hisoblagichi',
    calc_subtitle: 'Harakat tezligi va yo\'l qoplamasiga qarab xavfsiz oraliq masofani o\'rganing',
    calc_speed_label: 'Harakat tezligi:',
    calc_road_cond: 'Ob-havo va yo\'l holati:',
    calc_dry: '☀️ Quruq asfalt',
    calc_wet: '🌧️ Nam / Yomg\'ir',
    calc_ice: '❄️ Muzlama / Qor',
    calc_rec_dist: 'Tavsiya etilgan oraliq:',
    calc_total: 'Jami to\'xtash masofasi:',
    calc_reaction: 'Inson reaksiya masofasi (1 soniya):',
    calc_braking: 'Tormoz bosilgandan to\'liq to\'xtaguncha:',

    quiz_badge: 'Bilimingizni sinang',
    quiz_title: 'Yo\'l Harakati Xavfsizligi Viktorinasi',
    quiz_subtitle: 'Yo\'l harakati qoidalarini qay darajada bilasiz? O\'zingizni sinab ko\'ring.',
    quiz_counter: 'savol',
    quiz_q_label: 'Savol',
    quiz_next: 'Keyingi savol →',
    quiz_finish: 'Natijani ko\'rish 🏆',
    quiz_restart: '🔄 Qaytadan topshirish',
    quiz_score_msg: 'savoldan to\'g\'ri javob berdingiz:',

    feed_title: 'Jonli Murojaatlar Lentasi',
    feed_subtitle: 'Hududlardan kelib tushayotgan so\'nggi ma\'lumotlar',
    feed_all: 'Barchasini ko\'rish →',
    feed_fixed_badge: 'Bartaraf etildi ✓',
    feed_progress_badge: 'Ijroda (Ta\'mirlanmoqda) ⏳',

    lead_badge: 'Jamoatchilik Nazoratchilari',
    lead_title: 'Eng Faol Fuqarolar Reytingi',
    lead_subtitle: 'Yo\'l xavfsizligiga eng ko\'p hissa qo\'shgan va nosozliklarni aniqlagan faol fuqarolar',
    lead_reports: 'Murojaat',
    lead_resolved: 'Hal etildi',

    app_badge: 'Mobil Ilova 2026',
    app_title: 'Yo\'l Harakati Xavfsizligi doimo cho\'ntagingizda bo\'lsin',
    app_desc: 'Mobil ilova orqali chuqurcha va to\'siqlarni haydash paytida ovozli ogohlantirish sifatida eshiting, xavfli zonalardan oldindan ogoh bo\'ling va yagona bosish bilan xabar bering.',
    app_download: 'Yuklab oling',

    faq_badge: 'Savol-Javoblar',
    faq_title: 'Tez-tez Beriladigan Savollar',
    faq_subtitle: 'Platformadan foydalanish va xavfsizlik monitoringi haqida barcha javoblar',

    final_title: 'Birgalikda Yo\'llarimizni Xavfsiz Qilaylik!',
    final_desc: 'Sizning bitta xabaringiz kimningdir hayotini saqlab qolishi yoki avtomobil shikastlanishining oldini olishi mumkin.',
    final_btn: 'Hozir Xaritada Belgilash →',
    final_about_btn: 'Loyiha haqida to\'liq',

    sos_title: 'Favqulodda Yordam (SOS)',
    sos_subtitle: 'Shoshilinch qo\'ng\'iroqlar va operativ xizmatlar',
    sos_tip_title: 'YTH sodir bo\'lganda birinchi qadamlar:',
    sos_tip_desc: 'Avtotransportni darhol to\'xtating, avariya chirog\'ini yoqing, ogohlantiruvchi belgini o\'rnating va tezkor xizmatlarga xabar bering.',
    sos_close: 'Yopish',
  },
  ru: {
    nav_home: 'Главная',
    nav_map: 'Интерактивная Карта',
    nav_stats: 'Статистика & Анализ',
    nav_about: 'О проекте',
    nav_news: 'Новости',
    nav_sos: 'SOS 102',
    nav_report: '+ Сообщить',
    sub_brand: 'Безопасность Дорог Узбекистана',

    news_badge: 'Срочные Новости & Оповещения',
    news_title: 'Новости Безопасности Дорог',
    news_subtitle: 'Последние изменения, дорожные работы и правила движения в Узбекистане',

    hero_badge_ai: 'Мониторинг на основе ИИ',
    hero_badge_fixed: '🟢 14,820+ Проблем Устранено',
    hero_title_1: 'Безопасные Дороги —',
    hero_title_ai: 'Искусственный Интеллект',
    hero_title_2: 'и Сила Общества',
    hero_subtitle: 'Платформа для обнаружения ям, неисправных светофоров и опасных участков в реальном времени, нанесения на карту и устранения совместно с властями.',
    hero_cta_map: '🗺️ Открыть Интерактивную Карту',
    hero_cta_stats: '📊 Региональная Статистика',
    hero_cta_sos: '🚨 Экстренный SOS (102)',

    quick_title: 'Быстрое сообщение с главной страницы:',
    quick_hint: 'Появится на карте за 1 минуту',
    quick_placeholder: 'Название улицы или перекрестка (напр.: Чиланзар 9-квартал)...',
    quick_pothole: '🕳️ Яма на дороге',
    quick_traffic: '🚦 Неисправен светофор',
    quick_sign: '🚸 Нет дорожного знака',
    quick_light: '💡 Не работает освещение',
    quick_send: 'Отправить 🚀',
    quick_success: '✓ Спасибо! Ваше сообщение принято и отправлено на проверку ИИ.',

    stat_fixed: 'Всего устранено',
    stat_ai_acc: 'Точность ИИ',
    stat_regions: 'Охвачено регионов',
    stat_avg_time: 'Среднее время реакции',
    stat_realtime: 'В реальном времени',

    feat_badge: 'Возможности Экосистемы',
    feat_title: 'Выводим Дорожную Инфраструктуру на Новый Уровень',
    feat_subtitle: 'Комплексные решения, объединяющие искусственный интеллект, граждан и городские службы.',

    calc_badge: 'Интерактивный Калькулятор',
    calc_title: 'Калькулятор Тормозного Пути Автомобиля',
    calc_subtitle: 'Рассчитайте безопасную дистанцию в зависимости от скорости и состояния дорожного покрытия',
    calc_speed_label: 'Скорость движения:',
    calc_road_cond: 'Погодные условия и дорога:',
    calc_dry: '☀️ Сухой асфальт',
    calc_wet: '🌧️ Мокрый / Дождь',
    calc_ice: '❄️ Гололед / Снег',
    calc_rec_dist: 'Рекомендуемая дистанция:',
    calc_total: 'Общий остановочный путь:',
    calc_reaction: 'Путь за время реакции (1 секунда):',
    calc_braking: 'Непосредственно тормозной путь:',

    quiz_badge: 'Проверьте знания',
    quiz_title: 'Викторина по Безопасности Дорожного Движения',
    quiz_subtitle: 'Насколько хорошо вы знаете ПДД? Проверьте свои знания.',
    quiz_counter: 'вопрос',
    quiz_q_label: 'Вопрос',
    quiz_next: 'Следующий вопрос →',
    quiz_finish: 'Посмотреть результат 🏆',
    quiz_restart: '🔄 Пройти заново',
    quiz_score_msg: 'правильных ответов из вопросов:',

    feed_title: 'Лента Обращений в Реальном Времени',
    feed_subtitle: 'Свежие данные и обновления, поступающие из регионов',
    feed_all: 'Смотреть все →',
    feed_fixed_badge: 'Устранено ✓',
    feed_progress_badge: 'В процессе ремонта ⏳',

    lead_badge: 'Общественный Контроль',
    lead_title: 'Рейтинг Активных Граждан',
    lead_subtitle: 'Активисты, внесшие наибольший вклад в дорожную безопасность',
    lead_reports: 'Заявок',
    lead_resolved: 'Устранено',

    app_badge: 'Мобильное Приложение 2026',
    app_title: 'Безопасность дорог всегда в вашем кармане',
    app_desc: 'Получайте голосовые предупреждения о ямах и препятствиях во время вождения, узнавайте об опасных зонах заранее и отправляйте отчеты в один клик.',
    app_download: 'Скачать',

    faq_badge: 'Вопросы и Ответы',
    faq_title: 'Часто Задаваемые Вопросы',
    faq_subtitle: 'Вся информация об использовании платформы и мониторинге безопасности',

    final_title: 'Сделаем Наши Дороги Безопасными Вместе!',
    final_desc: 'Ваше одно сообщение может спасти чью-то жизнь или предотвратить поломку автомобиля.',
    final_btn: 'Отметить на Карте Сейчас →',
    final_about_btn: 'Подробнее о проекте',

    sos_title: 'Экстренная Помощь (SOS)',
    sos_subtitle: 'Срочные вызовы и оперативные службы',
    sos_tip_title: 'Первые действия при ДТП:',
    sos_tip_desc: 'Немедленно остановите транспорт, включите аварийную сигнализацию, выставьте знак аварийной остановки и вызовите службы.',
    sos_close: 'Закрыть',
  },
  en: {
    nav_home: 'Home',
    nav_map: 'Interactive Map',
    nav_stats: 'Statistics & Analytics',
    nav_about: 'About Project',
    nav_news: 'News & Alerts',
    nav_sos: 'SOS 102',
    nav_report: '+ Report',
    sub_brand: 'Uzbekistan Road Safety',

    news_badge: 'Urgent Alerts & News',
    news_title: 'Road Safety News & Updates',
    news_subtitle: 'Latest traffic regulations, roadwork closures, and weather warnings in Uzbekistan',

    hero_badge_ai: 'AI-Powered Safety Monitoring',
    hero_badge_fixed: '🟢 14,820+ Hazards Resolved',
    hero_title_1: 'Safer Roads With —',
    hero_title_ai: 'Artificial Intelligence',
    hero_title_2: '& Community Power',
    hero_subtitle: 'Real-time road anomaly detection, pothole tracking, and infrastructure resolution powered by geospatial AI and citizen reporting.',
    hero_cta_map: '🗺️ Open Interactive Map',
    hero_cta_stats: '📊 Regional Analytics',
    hero_cta_sos: '🚨 Emergency SOS (102)',

    quick_title: 'Quick road hazard report from homepage:',
    quick_hint: 'Appears on map in 1 minute',
    quick_placeholder: 'Street or intersection name (e.g., Chilanzar block 9)...',
    quick_pothole: '🕳️ Road Pothole',
    quick_traffic: '🚦 Malfunctioning Traffic Light',
    quick_sign: '🚸 Missing Road Sign',
    quick_light: '💡 Street Lighting Failure',
    quick_send: 'Submit 🚀',
    quick_success: '✓ Thank you! Your report was received and queued for AI verification.',

    stat_fixed: 'Total Resolved',
    stat_ai_acc: 'AI Accuracy Rate',
    stat_regions: 'Covered Regions',
    stat_avg_time: 'Avg Resolution Time',
    stat_realtime: 'Live',

    feat_badge: 'Ecosystem Capabilities',
    feat_title: 'Elevating Urban Road Infrastructure',
    feat_subtitle: 'End-to-end intelligent solutions uniting deep learning, civic reporting, and municipal services.',

    calc_badge: 'Interactive Safety Tool',
    calc_title: 'Vehicle Braking Distance Calculator',
    calc_subtitle: 'Understand safety stopping distance based on speed and road surface condition',
    calc_speed_label: 'Driving Speed:',
    calc_road_cond: 'Road & Weather Condition:',
    calc_dry: '☀️ Dry Asphalt',
    calc_wet: '🌧️ Wet / Rain',
    calc_ice: '❄️ Ice / Snow',
    calc_rec_dist: 'Recommended Safe Gap:',
    calc_total: 'Total Stopping Distance:',
    calc_reaction: 'Human Reaction Distance (1 sec):',
    calc_braking: 'Actual Braking Distance:',

    quiz_badge: 'Test Your Knowledge',
    quiz_title: 'Road Safety Knowledge Quiz',
    quiz_subtitle: 'How well do you know road safety rules? Test your knowledge.',
    quiz_counter: 'question',
    quiz_q_label: 'Question',
    quiz_next: 'Next Question →',
    quiz_finish: 'View Results 🏆',
    quiz_restart: '🔄 Retake Quiz',
    quiz_score_msg: 'correct answers out of questions:',

    feed_title: 'Live Incident & Resolution Feed',
    feed_subtitle: 'Real-time crowdsourced reports and repair confirmations from across regions',
    feed_all: 'View All Reports →',
    feed_fixed_badge: 'Resolved ✓',
    feed_progress_badge: 'In Progress ⏳',

    lead_badge: 'Community Watch',
    lead_title: 'Active Citizen Leaderboard',
    lead_subtitle: 'Guardians contributing the most to safer urban streets and verified fixes',
    lead_reports: 'Reports',
    lead_resolved: 'Resolved',

    app_badge: 'Mobile App 2026',
    app_title: 'Road Safety AI Always in Your Pocket',
    app_desc: 'Get audio hazard alerts in real-time while driving, discover high-risk intersections in advance, and submit reports in a single tap.',
    app_download: 'Download on',

    faq_badge: 'Questions & Answers',
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Everything you need to know about reporting, AI verification, and municipal action',

    final_title: 'Let\'s Make Our Roads Safer Together!',
    final_desc: 'Your single report can save someone\'s life or prevent severe vehicular damage.',
    final_btn: 'Mark on Map Now →',
    final_about_btn: 'Read About The Mission',

    sos_title: 'Emergency Assistance (SOS)',
    sos_subtitle: 'Urgent hotlines and first responders',
    sos_tip_title: 'First steps in case of an accident:',
    sos_tip_desc: 'Immediately stop the vehicle, turn on hazard warning lights, place the warning triangle, and call emergency services.',
    sos_close: 'Close',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'uz',
  setLanguage: () => {},
  t: (key) => translations.uz[key] || '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('uz');

  useEffect(() => {
    const saved = localStorage.getItem('app_language') as Language;
    if (saved && (saved === 'uz' || saved === 'ru' || saved === 'en')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', lang);
    }
  };

  const t = (key: keyof Translations): string => {
    return translations[language]?.[key] || translations.uz[key] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
