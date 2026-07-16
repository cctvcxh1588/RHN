# CONTENT_GUIDE.md — Round Hainan Regatta 网站内容更新指南

> **适用对象**：非技术人员（无需懂代码）
> **更新方式**：在 IDE 中搜索关键词 → 修改文本 → 保存后自动生效

---

## 快速导航

| 你想改什么 | 文件 | 行号区域 |
|-----------|------|---------|
| **首页 Hero 标语/日期** | `src/app/page.tsx` | 196–230 |
| **首页统计数字** | `src/app/page.tsx` | 96–112 |
| **首页 About 描述** | `src/app/page.tsx` | 288–290 |
| **首页 Course 描述** | `src/app/page.tsx` | 377–397 |
| **首页 Schedule 卡片** | `src/app/page.tsx` | 136–148 |
| **首页 Classes 卡片** | `src/app/page.tsx` | 150–158 |
| **首页 Hainan 4 张卡片** | `src/app/page.tsx` | 114–134 |
| **轮播图片** | `src/app/page.tsx` | 82–94 |
| **About 页** | `src/app/about/page.tsx` | 全页 |
| **Course 页** | `src/app/course/page.tsx` | 全页 |
| **Schedule 赛程** | `src/app/schedule/page.tsx` | 全页 |
| **Classes 组别** | `src/app/classes/page.tsx` | 全页 |
| **News 新闻** | `src/app/news/page.tsx` | 全页 |
| **Contact 联系方式** | `src/app/contact/page.tsx` | 全页 |
| **导航栏菜单** | `src/components/Navbar.tsx` | 全页 |
| **页脚** | `src/components/Footer.tsx` | 全页 |
| **中英翻译** | `src/lib/i18n.ts` | 全页 |
| **全局颜色/字体** | `src/app/globals.css` | 全页 |

---

## 一、首页（Home）内容修改

### 1.1 轮播图片

**文件**：`src/app/page.tsx`，第 82–94 行

```typescript
const heroSlides = [{
    src: "/hero.jpg",           // ← 替换为你的图片文件名
    alt: "Round Hainan Regatta hero"
}, {
    src: "/carousel-2.jpg",     // ← 替换
    alt: "Sailing boats at sunset"
}, {
    src: "/carousel-3.jpg",     // ← 替换
    alt: "Racing yachts in open water"
}, {
    src: "/carousel-4.jpg",     // ← 替换
    alt: "Hainan coastline sailing"
}];
```

**修改方法**：
1. 把新图片放到 `public/` 目录（如 `public/my-new-photo.jpg`）
2. 把上面 `src:` 后面的文件名改成 `"/my-new-photo.jpg"`
3. 保存文件，浏览器自动刷新

### 1.2 统计数字

**文件**：`src/app/page.tsx`，第 96–112 行

```typescript
const stats = [{
    value: 15,      // ← 修改数字
    suffix: "",     // 后缀（如 "km" 则显示 "15km"）
    label: "Editions"  // 英文标签（中文标签在 i18n.ts 里改，见第 5 节）
}, {
    value: 680,
    suffix: "",
    label: "Nautical Miles"
}, {
    value: 8,
    suffix: "",
    label: "Race Days"
}, {
    value: 4,
    suffix: "",
    label: "Racing Classes"
}];
```

### 1.3 About 板块描述文字

**文件**：`src/app/page.tsx`，第 288–290 行

```typescript
<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
    Since its founding in 2010...  ← 直接修改这段文字
</p>
<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
    The 15th edition in 2026...   ← 直接修改这段文字
</p>
```

### 1.4 Course 板块描述 + 航点

**文件**：`src/app/page.tsx`，第 377–397 行

```typescript
<p className="...">
    The full circumnavigation covers 680 nautical miles...  ← 修改描述
</p>

// 航点列表（第 385 行）
{["Sanya", "Danzhou", "Haikou", "Wanning", "Sanya"]  // ← 修改航点名称或顺序
```

### 1.5 Schedule 高亮卡片

**文件**：`src/app/page.tsx`，第 136–148 行

```typescript
const scheduleHighlights = [{
    date: "Oct 31",                            // ← 修改日期
    event: "Opening Ceremony",                 // ← 修改标题
    description: "The regatta begins..."       // ← 修改描述
}, {
    date: "Nov 2",
    event: "Offshore Start",
    description: "The fleet departs..."
}, {
    date: "Nov 7",
    event: "Awards Ceremony",
    description: "The final day concludes..."
}];
```

### 1.6 Classes 组别卡片

**文件**：`src/app/page.tsx`，第 150–158 行

```typescript
const racingClasses = [{
    name: "Dubois 50",                        // ← 组别名称
    description: "A high-performance...",      // ← 描述
    features: ["One-design racing",            // ← 要点列表
               "Crew of 10-12",
               "High-performance design"]
}, {
    name: "ORC Full Round",
    ...
}];
```

### 1.7 Hainan 4 张卡片

**文件**：`src/app/page.tsx`，第 114–134 行

```typescript
const hainanHighlights = [{
    icon: Building,                                // 图标，不要改
    title: "Duty-Free Paradise",                   // ← 标题（中文在 i18n.ts 里）
    description: "Hainan's Free Trade Port...",    // ← 描述（中文在 i18n.ts 里）
    slug: "free-trade-port"                        // 链接后缀，不要改
}, {
    icon: Landmark,
    title: "Rich Heritage",
    description: "Home to the Li and Miao...",
    slug: "culture"
}, {
    icon: Umbrella,
    title: "Tropical Paradise",
    description: "With powder-soft beaches...",
    slug: "beaches"
}, {
    icon: UtensilsCrossed,
    title: "Culinary Journey",
    description: "From fresh seafood...",
    slug: "cuisine"
}];
```

---

## 二、各子页面内容修改

### 2.1 About 页（The Race）

**文件**：`src/app/about/page.tsx`

```
第 1–50 行    → Hero 区（标题、徽章、日期）
第 51–120 行  → The Story 板块（文字段落）
第 121–180 行 → The Vision 板块（文字 + 图片引用）
第 181–207 行 → 底部引用
```

**图片位置**：`/vision-image.jpg`（在 `public/` 目录）

### 2.2 Course 页

**文件**：`src/app/course/page.tsx`

```
第 1–50 行    → Hero 区
第 51–100 行  → 赛程描述 + 航点列表
第 101–180 行 → Race Routes 地图（图片 `/route-map-v2.png`）
第 181–496 行 → 5 个规则卡片（NOTICE OF RACE 等）
               → 航点详细表格
```

**地图图片**：`/route-map-v2.png`（在 `public/` 目录）

### 2.3 Schedule 页（8 天赛程）

**文件**：`src/app/schedule/page.tsx`

**赛程数据在第 1–100 行区域**，每条赛程格式：

```typescript
{
    date: "October 31, 2026",           // ← 日期
    day: "Day 1",                       // ← 第几天
    title: "Registration & Briefing",   // ← 标题
    location: "Sanya Serenity Marina",  // ← 地点
    description: "Teams arrive...",     // ← 描述
    category: "inshore"                 // 分类：inshore / offshore / social
}
```

### 2.4 Classes 页（4 个组别）

**文件**：`src/app/classes/page.tsx`

**组别数据在第 1–100 行区域**，每条格式：

```typescript
{
    name: "Dubois 50 Class",                // ← 组别名
    subtitle: "One-Design Excellence",      // ← 副标题
    description: "A high-performance...",    // ← 描述段落
    features: ["One-design racing",          // ← 要点
               "Crew of 10-12",
               "High-performance design"],
    gradient: "from-primary-bright to-primary-deep"  // 卡片顶部渐变色，不要改
}
```

### 2.5 News 页

**文件**：`src/app/news/page.tsx`

**新闻列表在第 1–50 行区域**：

```typescript
const newsArticles = [{
    slug: "rhn-2026-entry-open",          // URL 后缀，不要改
    image: "/news-1.jpg",                  // ← 封面图片
    category: "Announcement",              // ← 分类标签
    date: "March 15, 2026",                // ← 日期
    title: "Entry Now Open...",            // ← 标题
    excerpt: "The 15th Round Hainan..."    // ← 摘要
}];
```

**新增新闻步骤**：
1. 在 `src/app/news/` 下创建新文件夹，如 `src/app/news/my-new-article/`
2. 在文件夹内创建 `page.tsx`，复制现有新闻详情页的代码模板
3. 在 `src/app/news/page.tsx` 的 `newsArticles` 数组里追加一条

### 2.6 Contact 页

**文件**：`src/app/contact/page.tsx`

```
第 1–60 行    → Hero 区
第 61–200 行  → 组委会信息（地址、邮箱、电话）
                ✓ 邮箱：roundhainanregatta@foxmail.com
                ✓ 地址：Sanya Serenity Marina
                ✓ 电话：+86-898-XXXXXXX
第 201–300 行 → Google Maps 嵌入
第 301–459 行 → 联系表单
```

---

## 三、导航栏 & 页脚

### 3.1 导航栏

**文件**：`src/components/Navbar.tsx`

- 导航链接列表在第 1–50 行
- 要修改菜单项名称，看第 2 个参数（如 `t("nav", "about")`），中文翻译在 `src/lib/i18n.ts`
- 要修改 CTA 按钮文字，搜 `t("common", "register")`

### 3.2 页脚

**文件**：`src/components/Footer.tsx`

- 页脚链接、社交媒体图标、版权信息都在此文件
- 版权年份：搜 `2026`，修改即可
- 社交媒体链接：搜 `href="https://` 替换 URL

---

## 四、图片替换

所有图片存放在 `public/` 目录下，按以下规则替换：

| 图片文件 | 用途 | 推荐尺寸 |
|---------|------|---------|
| `/hero.jpg` | 首页轮播第 1 张 | 2400×1350（16:9） |
| `/carousel-2.jpg` | 轮播第 2 张 | 2400×1350 |
| `/carousel-3.jpg` | 轮播第 3 张 | 2400×1350 |
| `/carousel-4.jpg` | 轮播第 4 张 | 2400×1350 |
| `/story-image.jpg` | 首页 About 配图 | 1200×900（4:3） |
| `/course-preview.jpg` | 首页 Course 配图 | 1200×900（4:3） |
| `/vision-image.jpg` | About 页 Vision 配图 | 1200×900 |
| `/route-map-v2.png` | Course 页航线图 | 1267×1033 |
| `/logo.png` | 导航栏 Logo | 透明 PNG |
| `/phoenix-sanya.jpg` | 首页 About 区 | 1200×900 |

**替换步骤**：
1. 把新图片文件放到 `public/` 目录
2. 确保文件名与上表一致（或修改代码中引用路径）
3. 保存，自动生效

---

## 五、中英翻译修改

**文件**：`src/lib/i18n.ts`

翻译按页面分命名空间，如：

```typescript
export const zh: typeof en = {
    common: {
        register: "立即报名",
        learnMore: "了解更多",
        // ...
    },
    nav: {
        home: "首页",
        about: "赛事介绍",
        course: "航线",
        schedule: "赛程",
        classes: "组别",
        news: "新闻",
        contact: "联系我们",
        register: "立即报名",
    },
    home: {
        heroBadge: "第15届 · 环海南岛帆船赛",
        heroTitle: "680 海里 · 一座岛屿",
        heroTitle2: "一片你未曾航行的海",
        heroDate: "2026年10月31日 – 11月7日 · 中国三亚",
        heroCta: "了解赛事",
        aboutEyebrow: "赛事介绍",
        aboutTitle: "一场传奇的诞生",
        // ...
    },
    // ...
};
```

**修改中文翻译**：找到 `zh` 对象中对应的键，修改值即可。
**新增英文翻译**：在 `en` 对象中添加键值对，同时在 `zh` 中添加对应的中文。
**翻译会自动切换**：用户在页面上点击🍂「EN | 中文」切换。

---

## 六、全局样式修改

**文件**：`src/app/globals.css`

### 品牌色

```css
@theme {
    --color-primary: #005BAB;        /* ← 品牌主蓝色 */
    --color-primary-deep: #003C7E;   /* ← 深海蓝 */
    --color-primary-bright: #0096DF; /* ← 天海蓝 */
    --color-accent-gold: #F6AA00;    /* ← 金色 */
    --color-accent-coral: #DD0078;   /* ← 洋红 */
    --color-accent-yellow: #FFE100;  /* ← 风帆黄 */
    --color-foreground: #1A2332;     /* ← 正文色 */
    --color-muted: #EEF2F7;          /* ← 背景灰 */
}
```

### 字体

```css
--font-display: "Playfair Display", ...  /* 大标题衬线字体 */
--font-sans: "Inter", ...                /* 正文字体 */
```

---

## 七、报名数据查看

### 7.1 后台管理页面

访问 `/admin/registrations`，输入 Token 即可：
- 查看所有报名记录
- 按组别过滤
- 搜索关键字
- 导出 CSV

### 7.2 默认 Token

开发环境：`rhn-2026-admin`
（生产环境请在环境变量中设置 `RHN_ADMIN_TOKEN` 替换）

---

## 八、常见修改示例

### 示例 1：修改首页 Hero 标语

**需求**：把 "680 Miles. One Island. A Sea You've Never Sailed." 改成别的

**操作**：
1. 打开 `src/lib/i18n.ts`
2. 搜索 `heroTitle`
3. 修改 `zh.home.heroTitle` 和 `en.home.heroTitle` 的值
4. 保存

### 示例 2：添加一条新闻

**操作**：
1. 在 `src/app/news/` 下创建文件夹 `src/app/news/2026-race-update/`
2. 在该文件夹内创建 `page.tsx`，复制现有新闻详情页（如 `src/app/news/rhn-2026-entry-open/page.tsx`）内容
3. 修改内容为你需要的新文章
4. 在 `src/app/news/page.tsx` 的 `newsArticles` 数组里追加一条（复制一个对象，修改 slug/image/date/title/excerpt）
5. 覆盖图片到 `public/` 目录

### 示例 3：修改赛程某一天的内容

**操作**：
1. 打开 `src/app/schedule/page.tsx`
2. 搜索 `October 31, 2026`（或对应日期）
3. 修改它所在的 `{}` 对象中的字段
4. 保存

### 示例 4：替换 Logo

**操作**：
1. 准备透明背景的 PNG Logo（推荐尺寸：200×60px 以内）
2. 覆盖到 `public/logo.png`
3. 保存，浏览器刷新

---

## 九、修改后如何生效

| 修改内容 | 生效方式 |
|---------|---------|
| 文本内容（.tsx 文件） | 保存后自动热更新（无需操作） |
| CSS 样式（globals.css） | 保存后自动热更新 |
| 翻译（i18n.ts） | 保存后自动热更新 |
| 图片（public/ 目录） | 保存后立即生效 |
| 数据库表结构 | 需要运行 `coze-coding-ai db upgrade` |

**部署后修改**：在开发环境改好后，通过 IDE 的「部署」按钮重新部署即可更新线上版本。

---

## 需要帮助？

如果以上指南没有覆盖到你想改的内容，或者你觉得某个步骤不清楚，随时告诉我，我可以：
1. 直接帮你修改
2. 补充这个指南
3. 给你做一个更简单的 CMS 编辑界面