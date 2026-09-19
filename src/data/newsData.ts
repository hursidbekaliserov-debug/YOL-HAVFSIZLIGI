export interface NewsArticle {
  id: string;
  category: 'weather' | 'rules' | 'repairs' | 'tech' | 'safety';
  isUrgent?: boolean;
  date: string;
  author: { uz: string; ru: string; en: string };
  title: { uz: string; ru: string; en: string };
  summary: { uz: string; ru: string; en: string };
  content: { uz: string[]; ru: string[]; en: string[] };
  readTime: string;
  badge: { uz: string; ru: string; en: string };
  icon: string;
  tips?: { uz: string[]; ru: string[]; en: string[] };
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-qamchiq-snow',
    category: 'weather',
    isUrgent: true,
    date: 'Bugun, 18:30',
    author: {
      uz: 'FVV va IIV YHXBB Matbuot Xizmati',
      ru: 'Пресс-служба МЧС и ГУБДД МВД',
      en: 'Press Service of EMERCOM & Traffic Police',
    },
    title: {
      uz: 'Qamchiq dovonida qor yog\'ishi va yaxmalak sababli haydovchilar ogohlantirilmoqda',
      ru: 'Водителей предупреждают о снегопаде и гололеде на перевале Камчик',
      en: 'Drivers warned about snowfall and icy conditions on Kamchik Pass',
    },
    summary: {
      uz: 'A-373 avtomobil yo\'lining Qamchiq dovoni qismida ob-havo sharoiti keskin o\'zgardi. Barcha haydovchilardan qishki shinalarsiz harakatlanmaslik so\'raladi.',
      ru: 'На перевале Камчик автодороги А-373 резко ухудшились погодные условия. Водителей настоятельно просят не выезжать без зимней резины.',
      en: 'Severe winter weather conditions reported along the A-373 Kamchik Pass section. Motorists must ensure winter tires and chains.',
    },
    content: {
      uz: [
        'Favqulodda vaziyatlar vazirligi va Yo\'l harakati xavfsizligi xizmati xabariga ko\'ra, A-373 Toshkent — O\'sh xalqaro avtomobil yo\'lining Qamchiq dovoni qismida qor yog\'ishi davom etmoqda.',
        'Havo harorati -3°C gacha pasaygan bo\'lib, ayrim balandlik uchastkalarida qalin tuman va ko\'rinish masofasining 150 metrgacha qisqarishi kuzatilmoqda.',
        'Yo\'l xo\'jaligi korxonalari tomonidan qatnov qismini qordan tozalash hamda qum-tuz aralashmasini sepish bo\'yicha 40 dan ortiq maxsus texnika uzluksiz jalb etilgan.',
        'Haydovchilarga oraliq masofani 2 barobarga oshirish, keskin tormozlanish va xavfli quvib o\'tishlardan qat\'iyan saqlanish tavsiya etiladi.',
      ],
      ru: [
        'По данным МЧС и Службы безопасности дорожного движения, на перевале Камчик трассы А-373 продолжается снегопад.',
        'Температура воздуха опустилась до -3°C, местами наблюдается густой туман с видимостью до 150 метров.',
        'Дорожные службы непрерывно очищают полотно и распыляют противогололедную песчано-солевую смесь с участием более 40 единиц спецтехники.',
        'Водителям настоятельно рекомендуется удвоить дистанцию, избегать резких торможений и опасных обгонов.',
      ],
      en: [
        'According to EMERCOM and the Traffic Safety Service, snow continues to fall on the Kamchik Pass section of the A-373 highway.',
        'Temperatures dropped to -3°C, accompanied by dense fog reducing visibility to 150 meters.',
        'Road maintenance agencies have deployed over 40 specialized snow removal units distributing salt-sand mixtures.',
        'Drivers are instructed to double their braking distance, avoid harsh maneuvering, and maintain steady low speeds.',
      ],
    },
    readTime: '3 daqiqa',
    badge: { uz: 'Tezkor Ogohlik', ru: 'Срочно', en: 'Urgent Alert' },
    icon: '❄️',
    tips: {
      uz: [
        'Avtomobilingizda qishki shinalar mavjudligini tekshiring',
        'Tormoz va yoritish chiroqlari sozligiga ishonch hosil qiling',
        'Zarur bo\'lsa FVVning 1050 yoki IIV 102 raqamiga murojaat qiling',
      ],
      ru: [
        'Убедитесь в наличии зимней резины',
        'Проверьте исправность тормозной системы и фар',
        'При необходимости звоните в МЧС (1050) или 102',
      ],
      en: [
        'Verify mandatory winter tires are installed',
        'Check headlamps and braking system efficiency',
        'Emergency call 1050 (EMERCOM) or 102 (Police)',
      ],
    },
  },
  {
    id: 'news-smart-traffic-lights',
    category: 'tech',
    date: 'Kecha, 14:20',
    author: {
      uz: 'Raqamli Texnologiyalar Vazirligi & Road Safety AI',
      ru: 'Министерство Цифровых Технологий и Road Safety AI',
      en: 'Ministry of Digital Technologies & Road Safety AI',
    },
    title: {
      uz: 'Toshkent shahrida 25 ta yangi adaptiv aqlli svetofor tizimi ishga tushirildi',
      ru: 'В Ташкенте запущено 25 новых адаптивных «умных» светофоров',
      en: '25 new adaptive smart traffic signals activated across Tashkent',
    },
    summary: {
      uz: 'Sun\'iy intellekt sensorlari yordamida tirbandlik oqimi tahlil qilinib, yashil chiroq davomiyligi avtomatik tarzda 15-30 soniyaga uzaytiriladi.',
      ru: 'С помощью датчиков ИИ анализируется плотность потока, и время зеленого сигнала регулируется в режиме реального времени.',
      en: 'Equipped with computer vision sensors, real-time traffic flow adjusts green phases dynamically to relieve urban congestion.',
    },
    content: {
      uz: [
        'Toshkent shahrining eng serqatnov chorrahalarida 25 ta yangi avlod intellektual svetofor tizimi tajriba-sinov tarzida to\'liq ishga tushirildi.',
        'Tizim kompyuter ko\'rishi va neyron tarmoqlari orqali avtomobillar soni hamda navbat uzunligini soniyalar ichida hisoblaydi.',
        'Buning natijasida avtobuslar va jamoat transporti uchun "yashil to\'lqin" koridorlari ta\'minlanib, umumiy tirbandlik darajasi 22% ga kamaydi.',
        'Yil yakuniga qadar poytaxtdagi yana 120 ta yirik chorraha mazkur intellektual tizimga integratsiya qilinishi rejalashtirilgan.',
      ],
      ru: [
        'На самых загруженных перекрестках Ташкента в пилотном режиме введены 25 интеллектуальных светофорных комплексов нового поколения.',
        'Система с помощью машинного зрения и нейросетей за доли секунды вычисляет количество транспорта и длину очереди.',
        'Благодаря алгоритмам создаются «зеленые волны» для общественного транспорта, снижая заторы на 22%.',
        'До конца года запланирована интеграция еще 120 ключевых перекрестков столицы.',
      ],
      en: [
        '25 next-generation smart traffic light systems have been fully deployed at high-density intersections across Tashkent.',
        'Using computer vision sensors, the neural network models track queue lengths and traffic volumes in real time.',
        'This enables dynamic green waves for buses and emergency vehicles, slashing rush-hour congestion by up to 22%.',
        'An additional 120 intersections are scheduled for deployment by year-end.',
      ],
    },
    readTime: '2 daqiqa',
    badge: { uz: 'AI Innovatsiya', ru: 'Инновации ИИ', en: 'AI Innovation' },
    icon: '🚦',
  },
  {
    id: 'news-school-zones',
    category: 'safety',
    date: '17-sentyabr',
    author: {
      uz: 'Avtomobil Yo\'llari Qo\'mitasi',
      ru: 'Комитет по Автомобильным Дорогам',
      en: 'State Committee for Roads',
    },
    title: {
      uz: 'Maktablar atrofida "Xavfsiz qadam" dasturi doirasida 30 km/soat tezlik nazorati kuchaytirilmoqda',
      ru: 'Вокруг школ ужесточается контроль ограничения скорости 30 км/ч в рамках программы «Безопасный шаг»',
      en: 'Speed limits of 30 km/h strictly enforced around educational zones under "Safe Step" initiative',
    },
    summary: {
      uz: 'Yangi o\'quv yili munosabati bilan barcha umumta\'lim maktablari oldida termoplastik yo\'l chiziqlari, sun\'iy notekisliklar va avtomatlashtirilgan fotoradarlar o\'rnatildi.',
      ru: 'Вблизи всех общеобразовательных школ обновлена термопластиковая разметка, установлены искусственные неровности и фоторадары.',
      en: 'Elevated pedestrian crosswalks, thermoplastic markings, and speed enforcement cameras installed near educational institutions.',
    },
    content: {
      uz: [
        'Respublika bo\'yicha maktab va bog\'chalar atrofida yo\'l infratuzilmasini modernizatsiya qilish bo\'yicha keng ko\'lamli ishlar yakuniga yetdi.',
        'Barcha o\'quv muassasalari yaqinida ruxsat etilgan maksimal tezlik 30 km/soat etib belgilangan va maxsus ogohlantiruvchi belgilar joylashtirilgan.',
        'Piyodalar o\'tish joylarida tungi vaqtda piyoda yaqinlashganda avtomatik yonuvchi yorug\'lik datchiklari sinovdan o\'tkazilmoqda.',
        'YHXBB ota-onalar va haydovchilarni bolalar qatnovi yuqori bo\'lgan hududlarda hushyorlikni oshirishga chaqiradi.',
      ],
      ru: [
        'По всей республике завершены работы по повышению безопасности дорожной инфраструктуры около школ и детсадов.',
        'Установлено строгое ограничение скорости 30 км/ч с соответствующими дорожными знаками.',
        'На нерегулируемых переходах тестируются датчики движения с яркой ночной светодиодной подсветкой при приближении пешехода.',
        'ГУБДД призывает водителей проявлять предельную бдительность в зонах движения детей.',
      ],
      en: [
        'Nationwide upgrades around primary schools and kindergartens have been implemented to protect vulnerable young pedestrians.',
        'A mandatory speed ceiling of 30 km/h is marked with prominent warning signage and automated surveillance.',
        'Automated LED crosswalk illuminators activated by motion sensors are currently undergoing pilot testing.',
        'Authorities urge drivers to exercise extreme vigilance near school corridors.',
      ],
    },
    readTime: '3 daqiqa',
    badge: { uz: 'Bolalar Xavfsizligi', ru: 'Детская Безопасность', en: 'Child Safety' },
    icon: '🎒',
  },
  {
    id: 'news-m39-repairs',
    category: 'repairs',
    date: '15-sentyabr',
    author: {
      uz: 'O\'zyo\'lko\'rik Infratuzilma Boshqarmasi',
      ru: 'Управление дорожной инфраструктуры',
      en: 'Highway Infrastructure Management',
    },
    title: {
      uz: 'M-39 Toshkent — Samarqand trassasining 42 km qismida yangi asfalt qoplamasi yotqizilmoqda',
      ru: 'На 42-километровом участке трассы М-39 Ташкент — Самарканд ведется укладка нового асфальта',
      en: 'Asphalt resurfacing underway along 42-km stretch of M-39 Tashkent — Samarkand highway',
    },
    summary: {
      uz: 'Sirdaryo va Jizzax viloyatlari hududidan o\'tuvchi qismlarda yo\'l to\'shamasini yangilash ishlari jadallik bilan olib borilmoqda. Ayrim yo\'nalishlarda harakat vaqtincha cheklangan.',
      ru: 'На участках трассы через Сырдарьинскую и Джизакскую области обновляется покрытие. Движение местами организовано по суженным полосам.',
      en: 'Extensive roadbed reconstruction underway on sectors passing through Sirdaryo and Jizzakh regions with temporary lane reductions.',
    },
    content: {
      uz: [
        'M-39 xalqaro avtomagistralining Sirdaryo viloyati Mirzacho\'l burilishi hamda Jizzax aylanma yo\'li oralig\'ida kapital ta\'mirlash ishlari amalga oshirilmoqda.',
        'Yo\'l qoplamasiga chidamli polimer-asfaltbeton yotqizilib, uning xizmat qilish muddati 10 yilgacha uzaytirilishi ko\'zda tutilgan.',
        'Ta\'mirlash hududlarida 70 km/soat tezlik cheklovi o\'rnatilgan bo\'lib, vaqtinchalik sariq yo\'l chiziqlari tortilgan.',
        'Haydovchilardan ushbu oraliqda ehtiyotkorlik bilan harakatlanish va ogohlantiruvchi belgilarga qat\'iy rioya qilish so\'raladi.',
      ],
      ru: [
        'На трассе М-39 между поворотом на Мирзачуль и объездной Джизака идут масштабные дорожно-строительные работы.',
        'Применяется полимерасфальтобетон повышенной износостойкости со сроком службы более 10 лет.',
        'В зоне работ действует ограничение 70 км/ч и нанесена временная желтая разметка.',
        'Водителей просят соблюдать требования временных знаков и держать безопасный боковой интервал.',
      ],
      en: [
        'Heavy maintenance operations are active along M-39 between the Mirzachul junction and Jizzakh bypass.',
        'Polymer-modified asphalt is applied to endure extreme thermal variations and heavy cargo axle loads for 10+ years.',
        'Temporary speed limits of 70 km/h and yellow detour markings have been established.',
        'Drivers should plan journeys with potential 15-20 minute delays.',
      ],
    },
    readTime: '2 daqiqa',
    badge: { uz: 'Yo\'l Ta\'miri', ru: 'Ремонт Дорог', en: 'Roadwork' },
    icon: '🚧',
  },
  {
    id: 'news-radar-regulation',
    category: 'rules',
    date: '12-sentyabr',
    author: {
      uz: 'IIV Yo\'l Harakati Xavfsizligi Xizmati',
      ru: 'Служба БДД МВД Республики Узбекистан',
      en: 'Traffic Safety Service of the MoIA',
    },
    title: {
      uz: 'Mobil fotoradarlar va o\'lchov vositalari bo\'yicha yangi ochiqlik talablari joriy etildi',
      ru: 'Введены новые требования к прозрачности применения мобильных радаров и средств фиксации',
      en: 'New mandatory transparency rules instituted for mobile speed cameras and radars',
    },
    summary: {
      uz: 'Endilikda barcha statsionar va ko\'chma radarlar o\'rnatilgan joylar oldidan majburiy 5.43 "Radar" ogohlantiruvchi belgisi kamida 100-300 metr masofada joylashtirilishi shart.',
      ru: 'Теперь перед всеми мобильными и стационарными радарами обязательно размещение знака 5.43 «Радар» на расстоянии не менее 100-300 метров.',
      en: 'Sign 5.43 "Radar" must now be visibly posted 100-300 meters prior to all automated enforcement positions.',
    },
    content: {
      uz: [
        'Yo\'l harakati ishtirokchilarining huquqlarini ta\'minlash maqsadida tezlikni qayd etuvchi vositalarni o\'rnatish bo\'yicha yangi qoidalar qabul qilindi.',
        'Har bir statsionar hamda xususiy tadbirkorlar tomonidan o\'rnatilgan radar vositalari metrologiya sertifikatiga va ochiq reestr raqamiga ega bo\'lishi shart.',
        'Ogohlantiruvchi yo\'l belgisisiz yashirincha qayd etilgan qoidabuzarliklar bo\'yicha jarimalar bekor qilinishi mumkin.',
        'Fuqarolar o\'z jarimalarini elektron hukumat portali yoki Road Safety platformasida tekshirib borishlari mumkin.',
      ],
      ru: [
        'В целях обеспечения прав участников движения введены уточненные регламенты работы средств автоматической фиксации.',
        'Все радары, включая установленные предпринимателями, должны обладать государственным сертификатом поверки.',
        'Фиксация без предупреждающего дорожного знака признается неправомерной.',
        'Граждане могут отслеживать и обжаловать некорректные начисления через портал электронных госуслуг.',
      ],
      en: [
        'Updated directives clarify the operational boundaries of automated speed measurement and red-light devices.',
        'Every device must hold an unexpired metrological calibration certificate registered in the national catalog.',
        'Fines issued without mandatory preceding warning signs are eligible for prompt legal annulment.',
        'Citizens may inspect radar credentials and report improper device placements through the civic portal.',
      ],
    },
    readTime: '4 daqiqa',
    badge: { uz: 'Qonunchilik & Huquq', ru: 'Законодательство', en: 'Legislation' },
    icon: '📜',
  },
];
