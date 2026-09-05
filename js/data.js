/* ============================================================
   SARVARBEK SAPARBAYEV — PORTFOLIO DATA
   All site content lives here (EN + UZ). Edit freely.
   ============================================================ */

const DATA = {
  owner: {
    name: "Sarvarbek Saparbayev",
    shortName: "Sarvarbek",
    role: "Flutter & Mobile Developer",
    location: "Urgench, Khorezm, Uzbekistan",
    email: "sarvar3874@gmail.com",
    phone: "+998 93 285 38 74",
    phoneHref: "+998932853874",
    avatar: "assets/avatar.jpg",
    cv: "assets/Sarvarbek_Saparbayev_CV.pdf",
  },

  social: [
    { id: "telegram",  name: "Telegram",  url: "https://t.me/imSarvarbek" },
    { id: "instagram", name: "Instagram", url: "https://www.instagram.com/imsarvarbek" },
    { id: "github",    name: "GitHub",    url: "https://github.com/SaparbayevSarvarbek" },
    { id: "linkedin",  name: "LinkedIn",  url: "https://www.linkedin.com/in/sarvarbek-saparbayev-514a21272/" },
  ],

  nav: [
    { id: "home",       en: "Home",       uz: "Bosh sahifa" },
    { id: "about",      en: "About",      uz: "Men haqimda" },
    { id: "experience", en: "Experience", uz: "Tajriba" },
    { id: "projects",   en: "Projects",   uz: "Loyihalar" },
    { id: "contact",    en: "Contact",    uz: "Aloqa" },
  ],

  /* ---------- UI strings (EN / UZ) ---------- */
  strings: {
    navRole:      { en: "mobile developer",     uz: "mobile dasturchi" },
    menuOpen:     { en: "Open menu",            uz: "Menyuni ochish" },
    menuClose:    { en: "Close menu",           uz: "Menyuni yopish" },
    themeToLight: { en: "Switch to light theme", uz: "Yorugʻ temaga oʻtish" },
    themeToDark:  { en: "Switch to dark theme",  uz: "Tungi temaga oʻtish" },
    skipTo:       { en: "Skip to content",      uz: "Tarkibga oʻtish" },

    heroGreeting: { en: "Hello, I'm", uz: "Salom, men" },
    heroBadge:    { en: "Urgench, Uzbekistan · Open to remote work", uz: "Urganch, Oʻzbekiston · Masofaviy ishlarga ochiq" },
    heroSubtitle: {
      en: "I build fast, reliable mobile apps with real-time chat, secure payments and clean architecture — shipped to Play Store and App Store.",
      uz: "Men real-time chat, xavfsiz toʻlovlar va toza arxitektura bilan tez, ishonchli mobil ilovalar yarataman — Play Store va App Store uchun yetkazib berilgan.",
    },
    viewProjects: { en: "View Projects", uz: "Loyihalarni koʻrish" },
    downloadCV:   { en: "Download CV",    uz: "CV yuklab olish" },

    typewriter: {
      en: ["Flutter Developer", "Mobile Developer", "Android Developer", "Cross-platform Engineer"],
      uz: ["Flutter Dasturchi", "Mobil Dasturchi", "Android Dasturchi", "Kross-platforma Muhandisi"],
    },

    statsLabels: [
      { en: "Years of experience", uz: "Yillik tajriba" },
      { en: "Apps shipped",        uz: "Chiqarilgan ilovalar" },
      { en: "Companies",          uz: "Kompaniyalar" },
      { en: "Cross-platform",      uz: "Kross-platforma" },
    ],

    aboutTitle: { en: "About Me", uz: "Men haqimda" },
    aboutLead: {
      en: "I'm Sarvarbek, a Mobile Developer with 2+ years of experience building Android and cross-platform apps with Flutter. I've shipped marketplace, logistics, translation and travel apps — with real-time chat, payments, push notifications and CRM integrations.",
      uz: "Men Sarvarbek — Flutter bilan Android va kross-platforma ilovalar quradigan, 2+ yillik tajribaga ega Mobil Dasturchiman. Marketplace, logistika, tarjima va sayohat ilovalarini chiqardim — real-time chat, toʻlovlar, push xabarnomalar va CRM integratsiyalari bilan.",
    },
    aboutP2: {
      en: "I care about clean, maintainable code: Clean Architecture, SOLID, Bloc/Cubit, and solid API design with REST and WebSocket. I work closely with backend teams to make data flow fast and reliable, and I optimize apps until they feel instant.",
      uz: "Toza, qoʻllab-quvvatlanadigan kodga e'tibor beraman: Clean Architecture, SOLID, Bloc/Cubit hamda REST va WebSocket bilan mustahkam API dizayni. Backend jamoalari bilan yaqin ishlab, ma'lumot oqimini tez va ishonchli qilaman — ilovalar darhol javob berguncha optimallashtiraman.",
    },
    aboutP3: {
      en: "Right now I'm growing in product teams and startups — shipping real features to real users. Always open to new projects, new teams and interesting problems.",
      uz: "Hozirda mahsulot jamoalari va startaplarda rivojlanmoqdaman — real foydalanuvchilarga real funksiyalarni yetkazmoqdaman. Yangi loyihalar, jamoalar va qiziqarli muammolarga doim ochiqman.",
    },
    skillsTitle: { en: "Skills & Technologies", uz: "Koʻnikmalar va Texnologiyalar" },

    expTitle: { en: "Experience", uz: "Tajriba" },

    projectsTitle: { en: "My Projects", uz: "Mening Loyihalarim" },
    projectsSubtitle: {
      en: "A selection of apps I've designed, built and shipped.",
      uz: "Dizaynlagan, qurgan va chiqargan ilovalarimdan tanlanganlar.",
    },
    featured:    { en: "Featured",    uz: "Tanlangan" },
    privateLabel:{ en: "Private / NDA", uz: "Maxfiy / NDA" },
    viewCode:    { en: "GitHub",      uz: "GitHub" },
    viewApp:     { en: "Play Store",  uz: "Play Store" },

    contactTitle: { en: "Let's Work Together", uz: "Birga Ishlaymiz" },
    contactSubtitle: {
      en: "Have a project or a role in mind? I usually reply within a day.",
      uz: "Loyiha yoki lavozim haqida o'ylaganmisiz? Odatda bir kun ichida javob beraman.",
    },

    formName:    { en: "Name",    uz: "Ism" },
    formEmail:   { en: "Email",   uz: "Email" },
    formMessage: { en: "Message", uz: "Xabar" },
    formSend:    { en: "Send",    uz: "Yuborish" },
    formSending: { en: "Sending…", uz: "Yuborilmoqda…" },

    footerText: { en: "Flutter & Mobile Developer", uz: "Flutter & Mobil Dasturchi" },
    backToTop:  { en: "Back to top", uz: "Yuqoriga" },
    view:       { en: "View", uz: "Koʻrish" },
    madeWith:   { en: "Designed & built with care", uz: "E'tibor bilan dizaynlangan va qurilgan" },

    codeCard: [
      "const developer = {",
      "  name: 'Sarvarbek Saparbayev',",
      "  role: 'Flutter & Mobile Developer',",
      "  experience: '2+ years',",
      "  location: 'Urgench, Uzbekistan',",
      "  focus: ['Real-time chat', 'Payments', 'Clean Architecture'],",
      "  stack: ['Flutter', 'Dart', 'Firebase', 'WebSocket'],",
      "};",
    ],
  },

  /* ---------- content collections (top level) ---------- */
  stats: [
    { value: 2, suffix: "+" },
    { value: 5, suffix: "+" },
    { value: 2, suffix: "" },
    { value: -1, suffix: "" }, // -1 = static "iOS & Android" card, no count-up
  ],

  skills: [
    { group: { en: "Languages", uz: "Tillar" },
      items: ["Dart", "Java", "Kotlin", "C++"] },
    { group: { en: "Mobile", uz: "Mobil" },
      items: ["Flutter", "Android", "Localization", "Push Notifications (FCM)", "Background Service", "Foreground Service"] },
    { group: { en: "Architecture & State", uz: "Arxitektura va Holat" },
      items: ["Clean Architecture", "SOLID", "MVVM", "MVP", "Bloc / Cubit", "GetX", "Provider"] },
    { group: { en: "Backend & Data", uz: "Backend va Ma'lumotlar" },
      items: ["REST API (Dio, Http)", "WebSocket", "Firebase", "SQLite"] },
    { group: { en: "Delivery", uz: "Yetkazib berish" },
      items: ["Git / GitHub", "CI/CD", "Play Store", "App Store"] },
  ],

  experience: [
    {
      title: "Mobile Developer",
      company: "Business Brothers and Partners",
      period: { en: "Oct 2025 – Dec 2026", uz: "Okt 2025 – Dek 2026" },
      points: [
        { en: "Building and maintaining production mobile apps in a product team.",
          uz: "Mahsulot jamoasida production mobil ilovalarni qurish va qoʻllab-quvvatlash." },
      ],
    },
    {
      title: "Mobile Developer",
      company: "Ardent Soft, Urgench",
      period: { en: "Nov 2024 – Sep 2025", uz: "Noy 2024 – Sen 2025" },
      points: [
        { en: "Developed and maintained mobile apps integrated with CRM systems",
          uz: "CRM tizimlari bilan integratsiyalashgan mobil ilovalarni ishlab chiqish va qoʻllab-quvvatlash" },
        { en: "Built a logistics management app for transport companies",
          uz: "Transport kompaniyalari uchun logistika boshqaruv ilovasini yaratdim" },
        { en: "Optimized performance and code quality — reduced load time, improved stability",
          uz: "Samaradorlik va kod sifatini optimallashtirdim — yuklanish vaqti qisqardi, barqarorlik oshdi" },
        { en: "Collaborated with the backend team to improve API communication and data flow",
          uz: "Backend jamoasi bilan hamkorlikda API aloqasi va ma'lumot oqimini yaxshiladim" },
        { en: "Shipped multiple releases improving UX and overall reliability",
          uz: "UX va umumiy ishonchlilikni yaxshilaydigan bir nechta reliz chiqardim" },
      ],
    },
    {
      title: "Education",
      company: "B.Sc. Computer Engineering, Urgench Branch of TUIT",
      period: { en: "2021 – 2025", uz: "2021 – 2025" },
      points: [
        { en: "Bachelor of Science in Computer Engineering.",
          uz: "Kompyuter injiniringi bo'yicha bakalavr darajasi." },
      ],
    },
  ],

  filters: [
    { key: "all",         en: "All",         uz: "Barchasi" },
    { key: "marketplace", en: "Marketplace", uz: "Marketplace" },
    { key: "utility",     en: "Utility",     uz: "Foydali" },
    { key: "travel",      en: "Travel",      uz: "Sayohat" },
  ],

  projects: [
    {
      title: "Joy Top — Real Estate Marketplace",
      desc: {
        en: "Full-featured marketplace to sell and rent houses with real-time chat and secure payments. Built WebSocket messaging with reliable sync between clients; modern Flutter UI optimized for Android and iOS.",
        uz: "Real-time chat va xavfsiz toʻlovlar bilan uylarni sotish va ijaraga berish uchun toʻliq marketplace. Mijozlar oʻrtasida ishonchli sinxronizatsiya bilan WebSocket xabar almashinuvini qurdim; Android va iOS uchun optimallashtirilgan zamonaviy Flutter UI.",
      },
      category: "marketplace",
      featured: true,
      image: "assets/demo-joytop.png",
      tags: ["Flutter", "WebSocket", "Payments", "Real-time Chat", "Clean Architecture"],
      links: { github: "#", store: "#" },
    },
    {
      title: "4RENT — Rental Listings Platform",
      desc: {
        en: "Post listings, upload photos and chat with buyers. Integrated Firebase Cloud Messaging for push notifications and combined REST API + WebSocket for a fast, responsive experience.",
        uz: "E'lonlar joylash, fotosuratlar yuklash va xaridorlar bilan chat. Push xabarnomalar uchun Firebase Cloud Messaging integratsiyasi va tez tajriba uchun REST API + WebSocket kombinatsiyasi.",
      },
      category: "marketplace",
      featured: true,
      image: "assets/demo-4rent.png",
      tags: ["Flutter", "FCM", "REST API", "WebSocket", "Firebase"],
      links: { github: "#", store: "#" },
    },
    {
      title: "Translate App",
      desc: {
        en: "Multilingual translator with instant translation and text-to-speech.",
        uz: "Bir zumda tarjima va matnni ovozga aylantirish bilan koʻp tilli tarjimon.",
      },
      category: "utility",
      featured: false,
      image: "assets/demo-translate.png",
      tags: ["Flutter", "Text-to-Speech", "Localization"],
      links: { github: "#" },
    },
    {
      title: "Jaloliddin Manguberdi — Virtual Tour",
      desc: {
        en: "Information app about the Jaloliddin Manguberdi monument with a 3D model view and a virtual tour via Google Maps.",
        uz: "Jaloliddin Manguberdi yodgorligi haqida 3D model koʻrinishi va Google Maps orqali virtual tur bilan ma'lumot ilovasi.",
      },
      category: "travel",
      featured: false,
      image: "assets/demo-manguberdi.png",
      tags: ["Flutter", "3D View", "Google Maps"],
      links: { github: "#" },
    },
    {
      title: "Uzbekistan Travel",
      desc: {
        en: "Guide to the cities, regions and districts of Uzbekistan with an admin panel for managing content.",
        uz: "Kontentni boshqarish uchun admin panel bilan Oʻzbekiston shaharlari, viloyatlari va tumanlari boʻyicha qoʻllanma.",
      },
      category: "travel",
      featured: false,
      image: "assets/demo-uztravel.png",
      tags: ["Flutter", "REST API", "Admin Panel"],
      links: { github: "#" },
    },
    {
      title: "Logistics Management App (Ardent Soft)",
      desc: {
        en: "Mobile app for transport companies to manage shipments and operations, integrated with the company CRM.",
        uz: "Transport kompaniyalari uchun yuklar va operatsiyalarni boshqarish ilovasi, kompaniya CRM bilan integratsiyalashgan.",
      },
      category: "utility",
      featured: false,
      image: "assets/demo-logistics.png",
      tags: ["Flutter", "CRM Integration", "REST API"],
      links: null,
    },
  ],
};
