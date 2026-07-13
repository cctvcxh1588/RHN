# DESIGN.md - Hainan Round Island International Sailing Race

## Design Philosophy
**Core Concept**: "Ocean Elegance Meets Athletic Precision" - A magazine-style editorial design that captures the drama of offshore racing while maintaining international sophistication.

## Visual Identity

### Color Palette
- **Primary Deep**: `#0A1E3D` (Midnight Ocean) - Authority, depth, professionalism
- **Primary Teal**: `#00A5B5` (Horizon Teal) - Energy, sport, ocean surface
- **Accent Gold**: `#C9A961` (Trophy Gold) - Prestige, achievement, awards
- **Pure White**: `#FFFFFF` (Sail White) - Clean space, breathing room
- **Soft Gray**: `#F5F7FA` (Mist Gray) - Subtle backgrounds, card surfaces
- **Text Dark**: `#1A2332` (Navigation Blue) - Readability, contrast

### Typography
- **Headlines**: "Inter" (600-800 weight) - Modern, geometric, international
- **Body**: "Inter" (400 weight) - Clean readability
- **Display/Accent**: "Playfair Display" (700-900) - Editorial elegance for hero text
- **Hierarchy**: 
  - Hero titles: 64-96px, letter-spacing -0.02em
  - Section titles: 48-56px, bold
  - Subtitles: 24-28px, medium weight
  - Body: 16-18px, line-height 1.6-1.8

### Imagery Direction
- **Hero**: Dramatic wide-angle sailing photography, boats heeling in strong wind, spray visible
- **Race Course**: Aerial/map views showing Hainan Island coastline
- **Action Shots**: Close-up crew work, sail details, wave impacts
- **Lifestyle**: Podium moments, team celebrations, harbor scenes
- **Treatment**: High contrast, slight desaturation for editorial feel, consistent color grading

### Layout Principles
- **Grid**: 12-column responsive grid, max-width 1440px
- **Spacing**: Generous whitespace, 120-160px section padding
- **Hero**: Full viewport height (100vh), parallax scroll effect
- **Cards**: Subtle shadows (0 4px 20px rgba(10,30,61,0.08)), 12px border-radius
- **Breakpoints**: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

### Motion & Interaction
- **Scroll**: Smooth scroll behavior, parallax on hero (0.5 speed ratio)
- **Navigation**: Fixed top bar, transparent → solid on scroll, smooth anchor links
- **Hover States**: Cards lift 8px with shadow intensification, 0.3s ease
- **Fade-ins**: Elements fade up on scroll (IntersectionObserver, 0.6s duration)
- **Buttons**: Subtle scale (1.02) on hover, smooth color transitions

### Component Patterns
- **Navigation**: Logo left, menu center, CTA right, hamburger mobile
- **Hero**: Full-screen image, centered text overlay, gradient scrim for readability
- **Section Headers**: Left-aligned title + subtitle, optional decorative line
- **Timeline**: Vertical line with alternating cards (desktop), stacked (mobile)
- **Sponsor Grid**: Logo cards with hover zoom effect
- **News Cards**: Image top, meta info, title, excerpt, read more link

### Design Don'ts
- ❌ No cartoonish illustrations or clipart
- ❌ No overly saturated neon colors
- ❌ No generic stock photo aesthetics
- ❌ No cramped layouts or small touch targets
- ❌ No inconsistent border-radius or shadow values
- ❌ No auto-playing videos without mute control
