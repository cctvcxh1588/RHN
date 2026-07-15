# DESIGN.md - 15th Round Hainan Regatta 2026

## Design Philosophy
**Core Concept**: "Ocean Elegance Meets Athletic Precision" — 大气、国际化、杂志编辑风格的官方赛事网站。设计以品牌 VI 为准绳，融合帆船摄影的戏剧张力与赛事的专业公信力。

## Brand Identity Source
- **官方名称**: Round Hainan Regatta (15th Edition, 2026)
- **别称**: RHN 海帆赛 · Sailing around Hainan International Regatta
- **Tagline**: "680 Miles. One Island. A Sea You've Never Sailed."
- **赛事时间**: October 31 – November 7, 2026
- **主办地**: Sanya, Hainan, China
- **Logo**: `/logo.png`（RGBA 透明背景，放置于 public/ 目录）

## Visual Identity (基于品牌 VI)

### Color Palette
从 Logo 提取的品牌色系：

**主色**
- **RHN Deep Blue**: `#003C7E` (深海蓝 / Primary Deep) — 权威、专业、深邃海洋
- **RHN Ocean Blue**: `#005BAB` (品牌主蓝 / Primary) — 品牌主色，Logo 主色
- **RHN Sky Blue**: `#0096DF` (天海蓝 / Primary Bright) — 明快、天海交界

**强调色**
- **Trophy Gold**: `#F6AA00` (金橙色 / Accent Gold) — 竞技、荣誉、奖杯
- **Signal Coral**: `#DD0078` (信号洋红 / Accent Coral) — Logo 装饰点缀
- **Wind Yellow**: `#FFE100` (风帆黄 / Accent Yellow) — 竞技活力

**中性色**
- **Sail White**: `#FFFFFF`
- **Mist Gray**: `#F5F7FA` (背景层次)
- **Fog Gray**: `#EEF2F7` (Tonal Fill / 输入框背景)
- **Ink Gray**: `#595757` (Logo 文字色, 正文次级)
- **Deep Ink**: `#1A2332` (主要正文)

### Typography
- **Display / Editorial**: "Playfair Display" (700-900) — Hero、板块大标题的杂志感衬线
- **Headline / Body**: "Inter" (400-800) — 现代、几何感、国际化
- **中文兜底**: Noto Sans SC
- **层级**:
  - Hero 主标题: 72-104px, letter-spacing -0.02em
  - Section 标题: 44-56px, bold
  - Sub-title: 20-24px, medium
  - Body: 15-17px, line-height 1.7

### Radius
- Card / Button: 8px (`--radius-md`)
- Feature / Hero card: 12px (`--radius-lg`)
- Small chip: 4px (`--radius-sm`)

### Shadow (background ≈ surface 时 opacity ≥ 0.08)
- `--shadow-card`: `0 4px 20px rgba(0, 60, 126, 0.08)`
- `--shadow-float`: `0 10px 30px rgba(0, 60, 126, 0.12)`
- `--shadow-dialog`: `0 25px 50px rgba(0, 60, 126, 0.15)`

### Imagery Direction
- **Hero**: 使用用户提供的 `hero.jpg`（三亚湾多艘竞速帆船的高角度航拍）
- **Course**: 海南岛航拍/地图视角
- **Action**: 船员操帆、浪花、风帆特写
- **Lifestyle**: 港口、颁奖、船队合影
- **处理**: 高对比、轻度去饱和的杂志质感、统一色调

### Layout Principles
- **单页滚动**（Single-page scroll）+ 锚点导航
- **Grid**: 12-column responsive, `max-w-7xl` 主容器（营销官网标准）
- **Section 节奏**: 桌面端 py-24 / py-32，移动端 py-16 / py-20
- **Hero**: 100vh 全屏，微弱视差
- **Cards**: 圆角 8-12px，柔和阴影 0 4px 20px rgba(0,60,126,0.08)
- **Breakpoints**: sm 640, md 768, lg 1024, xl 1280

### Motion & Interaction
- **Nav**: 顶部透明起手，滚动后变实心（`bg-primary/95` + backdrop-blur）
- **Hero**: 微视差（0.4x 滚动速率）
- **Scroll reveal**: 元素进入视口 fade-up (IntersectionObserver, 0.6s)
- **Counter**: About 板块统计数字滚动到位时动画计数
- **Hover**: Card lift 4-8px + shadow 强化，0.3s ease
- **CTA**: 主按钮 hover 时 opacity 90% + subtle scale(1.02)

### Component Patterns
- **Navigation**: Logo 左（SVG Logo + 文字 "Round Hainan Regatta"），菜单中，CTA 按钮右，移动端 hamburger
- **Hero**: 全屏图片 + 深色渐变蒙层（保证文字可读性），左对齐大标题 + 副标题 + edition badge
- **Section Header**: 左对齐 eyebrow + display 大标题 + 副标题 + 装饰金线
- **Timeline**: 竖直中线 + 交替卡片（desktop） / 单侧堆叠（mobile），日期用金色高亮
- **Course**: SVG 海南岛地图 + 航点标注 + 分段卡片
- **Class Cards**: 4 卡片网格（Dubois 50 / ORC Full / ORC Half / Fareast28R），顶部渐变色带、图标、要点列表
- **Sponsor Grid**: 分级（Title / Gold / Official / Media），灰度 logo 悬浮变彩色
- **News Cards**: 图片顶部，meta（分类 · 日期），标题，摘要，Read More
- **Contact**: 组委会信息 + 邮箱 `roundhainanregatta@foxmail.com` + 社交媒体 icons + 表单

### Race Course (真实航线，Notice of Race 2026)
- **起终点**: 三亚 (Sanya)
- **Offshore Race — Full Round (环岛)**: Sanya → Haikou → Sanya
- **Offshore Race — Half Round (半环岛)**: Sanya → Lingshui → Sanya
- **Inshore Races**: Sanya 场地赛

### Race Classes (真实组别，Notice of Race 2026)
- **Dubois 50 Class** — 一级设计船型组
- **ORC Full Round Class** — ORC 分级全程组
- **ORC Half Round Class** — ORC 分级半程组
- **Fareast 28R Class** — Fareast 28R 单一设计组

### Section 节奏调整（用户反馈）
- **THE TIMELINE / THE JOURNEY** 部分需要**更紧凑**：
  - 减少 section 内 vertical padding（从 py-32 缩至 py-20）
  - 卡片间距缩至 gap-6（原 gap-10）
  - 时间线项之间的间距减少 25-30%

### Design Don'ts
- ❌ 不用卡通插画、剪贴画
- ❌ 不用过饱和霓虹色（除品牌自带的洋红/黄作为点缀外）
- ❌ 不用泛用型库存照片风格
- ❌ 不用紫色渐变、蓝紫 AI 味渐变
- ❌ 不用一律等距布局，需疏密有致
- ❌ 不留悬空导航链接（所有菜单指向真实锚点/页面）
