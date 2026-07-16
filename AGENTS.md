# AGENTS.md - Round Hainan Regatta Official Website

## Project Overview
Professional English official website for the 15th Round Hainan Regatta (2026). A multi-page Next.js site with magazine-style editorial design, ocean/sailing theme, and full responsive support.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with TypeScript 5
- **Core**: React 19
- **UI Library**: shadcn/ui (基于 Radix UI) + Tailwind CSS 4
- **Icons**: lucide-react

## Pages (App Router)
```
/                  - Home (Hero carousel, stats, about, Hainan, previews)
/about             - The Race story & vision
/course            - Race course with SVG map & waypoints
/schedule          - 8-day race schedule timeline
/classes           - 4 racing classes
/news              - News & photo gallery (placeholder)
/contact           - Contact form & committee info
/register          - Race entry registration form (posts to /api/register)
/admin/registrations - Token-gated admin dashboard to view/export entries
```

## API Routes
- `GET  /api/register` - health probe; with `?token=<RHN_ADMIN_TOKEN>` returns entries list (default token: `rhn-2026-admin`, override via env)
- `POST /api/register` - validate + persist an entry to Supabase `registrations` table

## Database (Supabase)
- Table: `registrations` — see `src/storage/database/shared/schema.ts`
- Managed via Coze Supabase integration; backend uses service_role_key (RLS enabled, no policy needed for public write via API layer)

## Components
```
src/components/
├── ui/              # shadcn/ui components
├── Navbar.tsx       # Fixed top nav, transparent→solid on scroll, mobile hamburger
├── Footer.tsx       # Site footer with links and social
├── HeroCarousel.tsx # Auto-rotating image carousel with dot navigation
└── RevealOnScroll.tsx # IntersectionObserver fade-up animation wrapper
```

## Design Tokens
Brand colors defined in `globals.css` @theme:
- `--color-primary`: #005BAB (Ocean Blue)
- `--color-primary-deep`: #003C7E (Deep Blue)  
- `--color-primary-bright`: #0096DF (Sky Blue)
- `--color-accent-gold`: #F6AA00 (Trophy Gold)
- `--color-accent-coral`: #DD0078 (Signal Coral)
- `--color-accent-yellow`: #FFE100 (Wind Yellow)
- `--color-surface-container`: #EEF2F7
- `--color-foreground`: #1A2332

Fonts: Playfair Display (display) + Inter (body) via Google Fonts CN mirror

## Key Design Patterns
- **Nav**: Transparent on top, solid on scroll with backdrop-blur
- **Hero Carousel**: 4 images, 5s auto-rotation, 1.5s fade transition, dot navigation
- **Scroll reveal**: RevealOnScroll component uses IntersectionObserver, 0.6s ease
- **Counter animation**: Stats count up on scroll into view (IntersectionObserver)
- **Route animation**: SVG stroke-dashoffset animation for course maps
- **Section rhythm**: py-24 (desktop) / py-16 (mobile), max-w-7xl container

## Brand Info
- Official name: Round Hainan Regatta (15th Edition, 2026)
- Tagline: "680 Miles. One Island. A Sea You've Never Sailed."
- Date: October 31 – November 7, 2026
- Location: Sanya, Hainan, China
- Email: roundhainanregatta@foxmail.com
