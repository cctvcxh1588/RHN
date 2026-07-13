# AGENTS.md - Hainan Round Island International Sailing Race Website

## Project Overview
Professional English official website for the Hainan Round Island International Sailing Race (15th Edition, 2026). A single-page scrolling site with magazine-style editorial design, ocean/sailing theme, and full responsive support.

## Tech Stack
- **Type**: Native static HTML/CSS/JS (no build step)
- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Custom properties, Grid, Flexbox, animations, responsive design
- **JavaScript (ES5+)**: Vanilla JS, IntersectionObserver, requestAnimationFrame
- **Fonts**: Inter + Playfair Display via Google Fonts (CN mirror: fonts.googleapis.cn)
- **Images**: Unsplash CDN for high-quality sailing/ocean photography

## Project Structure
```
.
├── index.html          # Main single-page HTML with all sections
├── styles/
│   └── main.css        # Complete stylesheet (CSS custom properties, responsive)
├── script.js           # Interactions: parallax, scroll animations, nav, form
├── DESIGN.md           # Design system & visual identity specification
├── AGENTS.md           # This file
└── .coze               # Build/run configuration
```

## Sections (in order)
1. **Navigation** - Fixed top bar, transparent → solid on scroll, mobile hamburger
2. **Hero** - Full-screen parallax, dramatic sailing photo, event name + tagline
3. **About** - Race history, statistics with animated counters
4. **Race Course** - SVG map of Hainan Island circumnavigation + route cards
5. **Schedule** - Timeline with 8 race events (Oct 31 - Nov 7, 2026)
6. **Participation** - 3 racing classes (IRC, ORC, Unified) + entry process
7. **Sponsors** - Tiered sponsor grid (Title, Gold, Official)
8. **News & Media** - 3 news cards + 6-image photo gallery
9. **Contact** - Committee info, social links, contact form
10. **Footer** - Brand, quick links, resources, copyright

## Key Design Tokens
- Primary Deep: `#0A1E3D` | Teal: `#00A5B5` | Gold: `#C9A961`
- Font Heading: Inter 600-800 | Display: Playfair Display 700-900
- Max-width: 1280px | Section padding: 120px (desktop), 64px (mobile)
- Breakpoints: 1024px, 768px, 480px

## Development Commands
- **Dev server**: Managed by `.coze` config (native-static template)
- **No build step required** - static files served directly

## Design Patterns
- **Parallax**: Hero background image moves at 0.5x scroll speed via rAF
- **Fade-up**: IntersectionObserver adds `.visible` class for CSS transitions
- **Counter animation**: Stats count up with cubic ease-out on scroll into view
- **Route animation**: SVG path stroke-dashoffset animation on scroll
- **Nav highlight**: Active section detection via scroll position
