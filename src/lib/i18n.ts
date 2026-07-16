// Bilingual dictionary for the Round Hainan Regatta website
// Keep the shape identical for `en` and `zh` — the getter picks by current lang.

export type Lang = 'en' | 'zh';

export const dict = {
  // ─────── Common / Nav / Footer ───────
  common: {
    en: {
      register: 'Register Now',
      registerInterest: 'Register Interest',
      readMore: 'Read More',
      learnMore: 'Learn More',
      viewAll: 'View All',
      backToCourse: '← Back to Course',
      downloadDocx: 'Download DOCX',
      submit: 'Submit',
      submitting: 'Submitting…',
      required: '*',
      langSwitchLabel: '中文',
    },
    zh: {
      register: '立即报名',
      registerInterest: '意向登记',
      readMore: '了解更多',
      learnMore: '了解详情',
      viewAll: '查看全部',
      backToCourse: '← 返回航线页',
      downloadDocx: '下载 DOCX',
      submit: '提交报名',
      submitting: '提交中…',
      required: '*',
      langSwitchLabel: 'EN',
    },
  },
  nav: {
    en: {
      home: 'Home',
      about: 'The Race',
      course: 'Course',
      schedule: 'Schedule',
      classes: 'Classes',
      news: 'News',
      contact: 'Contact',
      register: 'Register',
    },
    zh: {
      home: '首页',
      about: '赛事简介',
      course: '航线',
      schedule: '赛程',
      classes: '组别',
      news: '新闻',
      contact: '联系我们',
      register: '报名',
    },
  },
  footer: {
    en: {
      tagline:
        'The 15th Round Hainan Regatta — 680 miles of world-class offshore racing around China\u2019s most beautiful island.',
      quickLinks: 'Quick Links',
      resources: 'Resources',
      contact: 'Contact',
      aboutTheRace: 'About the Race',
      raceCourse: 'Race Course',
      eventSchedule: 'Event Schedule',
      racingClasses: 'Racing Classes',
      newsMedia: 'News & Media',
      contactUs: 'Contact Us',
      register: 'Registration',
      location: 'Sanya, Hainan, China',
      edition: '15th Edition | October 31 – November 7, 2026',
      copyright:
        'Round Hainan Regatta Organizing Committee. All rights reserved.',
    },
    zh: {
      tagline:
        '第十五届环海南岛国际大帆船赛 — 680 海里，世界级远洋赛事，环绕中国最美海岛。',
      quickLinks: '快速链接',
      resources: '资源',
      contact: '联系方式',
      aboutTheRace: '赛事简介',
      raceCourse: '航线',
      eventSchedule: '赛程日程',
      racingClasses: '参赛组别',
      newsMedia: '新闻与媒体',
      contactUs: '联系我们',
      register: '报名入口',
      location: '中国 海南 三亚',
      edition: '第十五届 | 2026 年 10 月 31 日 – 11 月 7 日',
      copyright: '环海南岛国际大帆船赛组委会 版权所有',
    },
  },

  // ─────── Home Page ───────
  home: {
    en: {
      heroTitle: '680 Miles. One Island.',
      heroTitle2: 'A Sea You\u2019ve Never Sailed.',
      heroDate: 'October 31 – November 7, 2026 · Sanya, China',
      heroBadge: '15th Edition',
      heroCta: 'Discover the Race',
      heroCta2: 'View the Course',
      statsEyebrow: 'Race by the Numbers',
      statsTitle: 'One of Asia\u2019s Great Offshore Adventures',
      statMiles: 'Nautical Miles',
      statDays: 'Race Days',
      statClasses: 'Racing Classes',
      statEdition: 'Edition',
      aboutEyebrow: 'The Story',
      aboutTitle: 'A Race Woven Into Hainan\u2019s Soul',
      aboutText1:
        'Since 2012, the Round Hainan Regatta has stood as one of Asia\u2019s premier offshore sailing events — a 680-nautical-mile odyssey around the shores of China\u2019s tropical island province.',
      aboutText2:
        'What began as a bold vision has grown into an internationally-recognized championship, drawing elite sailors from across the globe to test themselves against the trade winds, tidal currents, and open-ocean challenges of the South China Sea.',
      aboutCta: 'Read the Full Story',
      hainanEyebrow: 'Explore Hainan',
      hainanTitle: 'The Island. The People. The Culture.',
      hainanIntro:
        'Hainan is more than a race venue — it\u2019s a tropical paradise with rich history, distinctive culture, and world-class amenities. Discover what makes this island so special.',
      hainanFTP: 'Free Trade Port',
      hainanFTPDesc:
        'A visa-free, duty-free gateway to global business and leisure.',
      hainanCulture: 'Culture & Heritage',
      hainanCultureDesc:
        'Li and Miao traditions, colonial architecture, and volcanic geopark.',
      hainanBeaches: 'Beaches & Sea',
      hainanBeachesDesc:
        'Turquoise bays, diving sites, and year-round tropical sun.',
      hainanCuisine: 'Local Cuisine',
      hainanCuisineDesc:
        'Wenchang chicken, seafood feasts, and tropical fruits.',
      courseEyebrow: 'The Course',
      courseTitle: '680 Nautical Miles Around Paradise',
      courseText:
        'Seven strategic waypoints. One island. Offshore, inshore, and coastal races weaving through the Northern, Eastern, Southern, and Western coasts of Hainan.',
      courseCta: 'View Race Course',
    },
    zh: {
      heroTitle: '680 海里 · 一座海岛',
      heroTitle2: '一片你未曾扬帆的海',
      heroDate: '2026 年 10 月 31 日 – 11 月 7 日 · 中国 三亚',
      heroBadge: '第十五届',
      heroCta: '了解赛事',
      heroCta2: '查看航线',
      statsEyebrow: '数字看赛事',
      statsTitle: '亚洲最具挑战的远洋赛事之一',
      statMiles: '海里',
      statDays: '比赛日',
      statClasses: '参赛组别',
      statEdition: '届',
      aboutEyebrow: '赛事故事',
      aboutTitle: '与海南血脉相连的帆船盛事',
      aboutText1:
        '自 2012 年首届举办以来，环海南岛国际大帆船赛已成为亚洲最负盛名的远洋帆船赛事之一 — 680 海里的传奇航程，环绕中国唯一的热带海岛省。',
      aboutText2:
        '从最初的大胆构想到如今的国际级冠军赛事，本赛事吸引来自全球的顶尖水手同场竞技，挑战南海的季风、洋流与开阔水域。',
      aboutCta: '阅读完整故事',
      hainanEyebrow: '发现海南',
      hainanTitle: '海岛 · 人文 · 文化',
      hainanIntro:
        '海南不仅是赛事举办地 — 更是一座拥有深厚历史、独特文化与世界级配套的热带天堂。走进这座海岛，探索她的与众不同。',
      hainanFTP: '自由贸易港',
      hainanFTPDesc: '免签、免税，通往全球商业与休闲的门户。',
      hainanCulture: '文化与传承',
      hainanCultureDesc: '黎苗风情、南洋骑楼、火山地质公园。',
      hainanBeaches: '海滩与海洋',
      hainanBeachesDesc: '碧海蓝湾，潜水胜地，全年热带阳光。',
      hainanCuisine: '海南风味',
      hainanCuisineDesc: '文昌鸡、海鲜盛宴、热带水果。',
      courseEyebrow: '赛事航线',
      courseTitle: '680 海里 环岛远航',
      courseText:
        '七个战略航点，一座海岛。远洋赛、场地赛与沿岸赛穿梭于海南岛北、东、南、西四段海岸。',
      courseCta: '查看完整航线',
    },
  },

  // ─────── About Page ───────
  about: {
    en: {
      heroBadge: '15th Edition · 2026',
      heroTitle: 'The Race',
      heroSub: 'Fourteen years. Fifteen editions. One legendary island loop.',
      storyEyebrow: 'The Story',
      storyTitle: 'From Vision to Legacy',
      visionEyebrow: 'The Vision',
      visionTitle: 'A World-Class Regatta on China\u2019s Southern Sea',
    },
    zh: {
      heroBadge: '第十五届 · 2026',
      heroTitle: '赛事简介',
      heroSub: '十四年 · 十五届 · 一场传奇的环岛航程',
      storyEyebrow: '赛事故事',
      storyTitle: '从愿景到传承',
      visionEyebrow: '赛事愿景',
      visionTitle: '南海之上的世界级帆船盛事',
    },
  },

  // ─────── Course Page (header only) ───────
  course: {
    en: {
      heroBadge: 'The Route',
      heroTitle: 'The Course',
      heroSub: '680 nautical miles around Hainan Island',
      routesEyebrow: 'Race Routes',
      routesTitle: 'Clockwise Around Paradise',
      routesText:
        'The Racing Route is drawn in solid dark blue with directional arrows around the island. A short Non-Racing Route (orange dashed line) connects the northern coast at Haikou.',
      documentsEyebrow: 'Race Regulations & References',
      documentsTitle: 'Official Documents',
      documentsSub:
        'Full text of the 2026 Notice of Race and supporting documents. Click any card to read the complete document.',
    },
    zh: {
      heroBadge: '航线',
      heroTitle: '赛事航线',
      heroSub: '环海南岛 680 海里',
      routesEyebrow: '航线示意',
      routesTitle: '顺时针环岛',
      routesText:
        '比赛赛段（Racing Route）为深蓝实线并标注航行方向，沿海南岛顺时针环绕；北部海口附近另有短距离非比赛赛段（Non-Racing Route，橙色虚线）。',
      documentsEyebrow: '赛事规则与参考',
      documentsTitle: '官方文件',
      documentsSub:
        '2026 年竞赛通知（NOR）及配套文件全文（英文原版）。点击任一卡片查看完整文档。',
    },
  },

  // ─────── Schedule Page ───────
  schedule: {
    en: {
      heroBadge: '8 Days of Racing',
      heroTitle: 'Schedule',
      heroSub: 'October 31 – November 7, 2026',
      timelineEyebrow: 'Day by Day',
      timelineTitle: 'Race Week Timeline',
    },
    zh: {
      heroBadge: '8 天赛程',
      heroTitle: '赛程日程',
      heroSub: '2026 年 10 月 31 日 – 11 月 7 日',
      timelineEyebrow: '每日概览',
      timelineTitle: '赛事周程表',
    },
  },

  // ─────── Classes Page ───────
  classes: {
    en: {
      heroBadge: 'Race Divisions',
      heroTitle: 'Racing Classes',
      heroSub: 'Four one-design and handicap fleets sailing the 2026 course.',
      cardsEyebrow: '2026 Fleet',
      cardsTitle: 'Four Distinct Race Divisions',
    },
    zh: {
      heroBadge: '参赛组别',
      heroTitle: '参赛组别',
      heroSub: '2026 年赛事共设四个组别 — 一级设计与 ORC 分级混合。',
      cardsEyebrow: '2026 参赛船队',
      cardsTitle: '四大组别',
    },
  },

  // ─────── Contact Page ───────
  contact: {
    en: {
      heroBadge: 'Get in Touch',
      heroTitle: 'Contact',
      heroSub:
        'Reach the Organizing Committee for entries, sponsorship, and media inquiries.',
      infoEyebrow: 'Organizing Committee',
      email: 'Email',
      address: 'Address',
      addressValue: 'Sanya Serenity Marina, Sanya, Hainan, China',
      officeHours: 'Office Hours',
      officeHoursValue: 'Monday – Friday · 09:00 – 18:00 CST',
      mapEyebrow: 'Find Us',
      mapTitle: 'Sanya Serenity Marina',
    },
    zh: {
      heroBadge: '联系我们',
      heroTitle: '联系我们',
      heroSub: '如需报名、赞助或媒体合作，请联系赛事组委会。',
      infoEyebrow: '赛事组委会',
      email: '邮箱',
      address: '地址',
      addressValue: '中国 海南 三亚 · 三亚半山半岛帆船港',
      officeHours: '办公时间',
      officeHoursValue: '周一 至 周五 · 09:00 – 18:00（北京时间）',
      mapEyebrow: '找到我们',
      mapTitle: '三亚半山半岛帆船港',
    },
  },

  // ─────── Register Page ───────
  register: {
    en: {
      heroBadge: 'Entry Registration',
      heroTitle: 'Register Your Team',
      heroSub:
        'Submit your entry for the 15th Round Hainan Regatta (2026). All fields marked * are required.',
      sectionBoat: 'Boat & Team Details',
      sectionContact: 'Skipper / Primary Contact',
      sectionOther: 'Additional Information',
      teamName: 'Team / Boat Name',
      class: 'Race Class',
      classPlaceholder: 'Select your race class',
      classOpt1: 'Dubois 50 Class',
      classOpt2: 'ORC Full Round Class',
      classOpt3: 'ORC Half Round Class',
      classOpt4: 'Fareast 28R Class',
      sailNumber: 'Sail Number',
      loa: 'Boat LOA (metres)',
      hullColor: 'Hull Colour',
      skipperName: 'Skipper Full Name',
      email: 'Email',
      phone: 'Mobile Phone',
      country: 'Country / Region',
      crewCount: 'Number of Crew',
      hasInsurance: 'I confirm the boat carries valid third-party insurance ≥ 10,000,000 RMB',
      hasSafety:
        'I confirm the boat meets Category 3 (with liferaft) safety requirements per NOR §21',
      notes: 'Additional Notes',
      notesPlaceholder:
        'Any special requirements, prior participation, or media requests…',
      submit: 'Submit Entry',
      submitting: 'Submitting…',
      successTitle: 'Entry Received',
      successText:
        'Thank you! Your entry has been recorded. The Organizing Committee will contact you shortly at the email you provided. Please also email supporting documents (safety certificates, crew list) to roundhainanregatta@foxmail.com.',
      submitAnother: 'Submit Another Entry',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      networkError: 'Submission failed — please try again or email us directly.',
    },
    zh: {
      heroBadge: '赛事报名',
      heroTitle: '船队报名',
      heroSub:
        '提交第十五届环海南岛国际大帆船赛（2026）报名信息。带 * 的字段为必填项。',
      sectionBoat: '船只与船队信息',
      sectionContact: '船长 / 主要联系人',
      sectionOther: '其他信息',
      teamName: '船队 / 船名',
      class: '参赛组别',
      classPlaceholder: '请选择参赛组别',
      classOpt1: 'Dubois 50 组',
      classOpt2: 'ORC 全环组',
      classOpt3: 'ORC 半环组',
      classOpt4: 'Fareast 28R 组',
      sailNumber: '帆号',
      loa: '船身长度（米）',
      hullColor: '船身颜色',
      skipperName: '船长姓名',
      email: '邮箱',
      phone: '手机',
      country: '国家 / 地区',
      crewCount: '船员人数',
      hasInsurance:
        '本船已购买有效的第三方责任保险，保额不低于人民币 1000 万元',
      hasSafety:
        '本船符合《竞赛通知》第 21 条 Category 3（含救生筏）的安全等级要求',
      notes: '备注信息',
      notesPlaceholder: '特殊需求、往届参赛经历、媒体合作意向等…',
      submit: '提交报名',
      submitting: '提交中…',
      successTitle: '报名已提交',
      successText:
        '感谢您的报名！赛事组委会将尽快通过您提供的邮箱与您联系。请同时将安全证书、船员名单等补充材料发送至 roundhainanregatta@foxmail.com。',
      submitAnother: '再提交一份报名',
      required: '此项为必填',
      invalidEmail: '请输入有效的邮箱地址',
      networkError: '提交失败，请稍后重试或直接邮件联系我们。',
    },
  },
} as const;

export type Dict = typeof dict;
export type Namespace = keyof Dict;
export type Keys<N extends Namespace> = keyof Dict[N]['en'] & keyof Dict[N]['zh'];
