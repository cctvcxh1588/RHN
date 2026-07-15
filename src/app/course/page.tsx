'use client';

import Image from 'next/image';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Anchor, Navigation, MapPin, Ship, Compass, ArrowRight } from 'lucide-react';

const waypoints = [
  {
    name: 'Sanya',
    role: 'Start / Finish',
    description:
      'The racing capital of Hainan. Departure from Sanya Serenity Marina, heading west along the coast.',
    distance: '—',
    icon: 'MapPin',
    color: 'text-accent-gold',
    svgX: 343,
    svgY: 410,
  },
  {
    name: 'Danzhou',
    role: 'Waypoint',
    description:
      'Mid-race checkpoint on the western side. Known for its dramatic coastal cliffs and shifting winds.',
    distance: '~185 NM from Sanya',
    icon: 'Navigation',
    color: 'text-accent-gold',
    svgX: 354,
    svgY: 207,
  },
  {
    name: 'Haikou',
    role: 'Halfway Rest',
    description:
      'Capital of Hainan Island. The fleet rounds the northern tip before heading down the east coast.',
    distance: '~130 NM from Danzhou',
    icon: 'Ship',
    color: 'text-accent-gold',
    svgX: 477,
    svgY: 123,
  },
  {
    name: 'Wanning',
    role: 'Waypoint',
    description:
      'East coast surfing hub. A strategic leg where wind shifts can make or break positions.',
    distance: '~175 NM from Haikou',
    icon: 'Compass',
    color: 'text-accent-gold',
    svgX: 484,
    svgY: 322,
  },
  {
    name: 'Sanya',
    role: 'Finish',
    description:
      'The grand finish back in Sanya Bay. Full circumnavigation complete after 680 nautical miles.',
    distance: '~190 NM from Wanning',
    icon: 'Anchor',
    color: 'text-accent-coral',
    svgX: 343,
    svgY: 410,
  },
];

export default function CoursePage() {
  return (
    <div className="min-h-screen">
      {/* ==================== 1. Hero Banner ==================== */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Round Hainan Regatta Course"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/70 via-primary-deep/50 to-primary-deep/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/40 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <RevealOnScroll delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
              The Course
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-2xl mx-auto">
              Circumnavigating Hainan Island
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <div className="mt-8 flex items-center justify-center gap-2 text-accent-gold/80 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              <span>680 NM &bull; 2 Courses &bull; 5 Waypoints</span>
            </div>
          </RevealOnScroll>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 20C240 60 480 0 720 20C960 40 1200 0 1440 20V60H0V20Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ==================== 2. Overview ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center mb-16">
              The 15th Round Hainan Regatta offers two offshore race courses designed
              for different levels of sailing challenge. Both routes showcase the
              breathtaking coastline of Hainan Island, from the bustling port city of
              Sanya to the historic capital Haikou, with tactical racing conditions
              that test the mettle of every crew.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Full Round */}
            <RevealOnScroll delay={0.1}>
              <div className="bg-primary-container rounded-2xl p-8 shadow-card border border-primary-bright/10">
                <div className="w-12 h-12 rounded-full bg-primary-deep flex items-center justify-center mb-5">
                  <Ship className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-deep mb-2">Full Round</h3>
                <p className="text-3xl font-display font-bold text-accent-gold mb-3">
                  680 <span className="text-sm font-sans font-normal text-muted-foreground">NM</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sanya &rarr; Danzhou &rarr; Haikou &rarr; Wanning &rarr; Sanya. A complete
                  circumnavigation of Hainan Island.
                </p>
              </div>
            </RevealOnScroll>

            {/* Half Round */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-primary-container rounded-2xl p-8 shadow-card border border-primary-bright/10">
                <div className="w-12 h-12 rounded-full bg-primary-bright flex items-center justify-center mb-5">
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-deep mb-2">Half Round</h3>
                <p className="text-3xl font-display font-bold text-primary-bright mb-3">
                  280 <span className="text-sm font-sans font-normal text-muted-foreground">NM</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sanya &rarr; Lingshui &rarr; Sanya. A shorter coastal route along the
                  southern and eastern shores.
                </p>
              </div>
            </RevealOnScroll>

            {/* Inshore Races */}
            <RevealOnScroll delay={0.3}>
              <div className="bg-primary-container rounded-2xl p-8 shadow-card border border-primary-bright/10">
                <div className="w-12 h-12 rounded-full bg-accent-coral flex items-center justify-center mb-5">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-deep mb-2">Inshore Races</h3>
                <p className="text-3xl font-display font-bold text-accent-coral mb-3">
                  Day <span className="text-sm font-sans font-normal text-muted-foreground">Races</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Multiple windward-leeward and buoy races held in Sanya&apos;s protected
                  waters for close-quarters action.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ==================== 3. SVG Map Section ==================== */}
      <section className="bg-surface-container py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-center font-display text-3xl md:text-4xl font-bold text-primary-deep mb-4">
              Race Routes
            </h2>
            <p className="text-center text-muted-foreground text-sm md:text-base mb-12 max-w-xl mx-auto">
              Follow the full circumnavigation (gold) and half-round course (blue)
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="relative w-full max-w-4xl mx-auto aspect-[660/500] bg-surface-container-high rounded-3xl shadow-card overflow-hidden">
              {/* Background map image */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <Image
                  src="/hainan-map.png"
                  alt="Hainan Island Map"
                  fill
                  className="object-contain object-center p-4"
                />
              </div>

              {/* SVG overlay */}
              <svg
                viewBox="0 0 660 500"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* ===== Full Round Route (gold dashed ~ outside island) ===== */}
                {/* Sanya(343,410) → Danzhou(354,207) → Haikou(477,123) → Wanning(484,322) → Sanya(343,410) */}
                {/* Going outside the island: swing west then north then east then south */}
                <path
                  d="M 343 410
                     C 300 380, 310 280, 354 207
                     C 380 170, 430 130, 477 123
                     C 510 120, 530 220, 484 322
                     C 460 370, 390 420, 343 410"
                  className="text-accent-gold animate-dash"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  fill="none"
                />

                {/* ===== Half Round Route (blue dashed) ===== */}
                {/* Sanya(343,410) → Lingshui(426,368) → Sanya(343,410) */}
                <path
                  d="M 343 410
                     C 370 395, 400 380, 426 368
                     C 400 385, 370 400, 343 410"
                  className="text-primary-bright animate-dash"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="6 5"
                  fill="none"
                />

                {/* ===== Connecting lines from waypoints to route ===== */}
                {/* Full Round connecting lines */}
                <line x1="343" y1="410" x2="343" y2="400" className="text-accent-gold" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="354" y1="207" x2="354" y2="195" className="text-accent-gold" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="477" y1="123" x2="477" y2="111" className="text-accent-gold" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="484" y1="322" x2="484" y2="310" className="text-accent-gold" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Half Round connecting line */}
                <line x1="426" y1="368" x2="426" y2="356" className="text-primary-bright" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* ===== Waypoint Markers (Gold circles) ===== */}
                {/* Sanya (Start/Finish) */}
                <circle cx="343" cy="410" r="8" className="text-accent-gold" fill="currentColor" stroke="white" strokeWidth="2" />
                <circle cx="343" cy="410" r="4" fill="white" />

                {/* Danzhou */}
                <circle cx="354" cy="207" r="8" className="text-accent-gold" fill="currentColor" stroke="white" strokeWidth="2" />
                <circle cx="354" cy="207" r="4" fill="white" />

                {/* Haikou */}
                <circle cx="477" cy="123" r="8" className="text-accent-gold" fill="currentColor" stroke="white" strokeWidth="2" />
                <circle cx="477" cy="123" r="4" fill="white" />

                {/* Wanning */}
                <circle cx="484" cy="322" r="8" className="text-accent-gold" fill="currentColor" stroke="white" strokeWidth="2" />
                <circle cx="484" cy="322" r="4" fill="white" />

                {/* Lingshui (Half Round) */}
                <circle cx="426" cy="368" r="8" className="text-primary-bright" fill="currentColor" stroke="white" strokeWidth="2" />
                <circle cx="426" cy="368" r="4" fill="white" />

                {/* ===== Labels ===== */}
                {/* Sanya label */}
                <text x="343" y="440" textAnchor="middle" className="text-xs font-bold" fill="#003C7E" stroke="white" strokeWidth="3" paintOrder="stroke" style={{ fontSize: '11px' }}>Sanya</text>
                <text x="343" y="440" textAnchor="middle" className="text-xs font-bold" fill="#003C7E" style={{ fontSize: '11px' }}>Sanya</text>

                {/* Danzhou label */}
                <text x="354" y="185" textAnchor="middle" className="text-xs font-bold" fill="#003C7E" stroke="white" strokeWidth="3" paintOrder="stroke" style={{ fontSize: '11px' }}>Danzhou</text>
                <text x="354" y="185" textAnchor="middle" className="text-xs font-bold" fill="#003C7E" style={{ fontSize: '11px' }}>Danzhou</text>

                {/* Haikou label */}
                <text x="477" y="101" textAnchor="middle" className="text-xs font-bold" fill="#003C7E" stroke="white" strokeWidth="3" paintOrder="stroke" style={{ fontSize: '11px' }}>Haikou</text>
                <text x="477" y="101" textAnchor="middle" className="text-xs font-bold" fill="#003C7E" style={{ fontSize: '11px' }}>Haikou</text>

                {/* Wanning label */}
                <text x="484" y="300" textAnchor="middle" className="text-xs font-bold" fill="#003C7E" stroke="white" strokeWidth="3" paintOrder="stroke" style={{ fontSize: '11px' }}>Wanning</text>
                <text x="484" y="300" textAnchor="middle" className="text-xs font-bold" fill="#003C7E" style={{ fontSize: '11px' }}>Wanning</text>

                {/* Lingshui label */}
                <text x="426" y="346" textAnchor="middle" className="text-xs font-bold" fill="#0096DF" stroke="white" strokeWidth="3" paintOrder="stroke" style={{ fontSize: '11px' }}>Lingshui</text>
                <text x="426" y="346" textAnchor="middle" className="text-xs font-bold" fill="#0096DF" style={{ fontSize: '11px' }}>Lingshui</text>

                {/* Route legend */}
                <g transform="translate(420, 440)">
                  <rect x="0" y="0" width="150" height="50" rx="6" fill="white" fillOpacity="0.9" stroke="#C8D2DE" strokeWidth="1" />
                  <line x1="12" y1="16" x2="42" y2="16" className="text-accent-gold" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 4" />
                  <text x="50" y="20" className="text-xs" fill="#1A2332" style={{ fontSize: '10px' }}>Full Round (680 NM)</text>
                  <line x1="12" y1="36" x2="42" y2="36" className="text-primary-bright" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
                  <text x="50" y="40" className="text-xs" fill="#1A2332" style={{ fontSize: '10px' }}>Half Round (280 NM)</text>
                </g>
              </svg>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ==================== 4. Key Waypoints Section ==================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-center font-display text-3xl md:text-4xl font-bold text-primary-deep mb-4">
              KEY WAYPOINTS
            </h2>
            <p className="text-center text-muted-foreground text-sm md:text-base mb-16 max-w-xl mx-auto">
              Strategic points along the circumnavigation course
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {waypoints.map((wp, index) => {
              const IconComponent =
                wp.icon === 'MapPin'
                  ? MapPin
                  : wp.icon === 'Navigation'
                    ? Navigation
                    : wp.icon === 'Ship'
                      ? Ship
                      : wp.icon === 'Compass'
                        ? Compass
                        : Anchor;

              return (
                <RevealOnScroll key={`${wp.name}-${wp.role}`} delay={0.1 * index}>
                  <div className="bg-surface-container rounded-2xl p-6 shadow-card border border-surface-container-high text-center h-full flex flex-col items-center group hover:shadow-float transition-all duration-300 hover:-translate-y-1">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                        index === 4
                          ? 'bg-accent-coral/10 text-accent-coral'
                          : 'bg-accent-gold/10 text-accent-gold'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Waypoint number */}
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1">
                      {index === 0 ? 'Start' : index === 4 ? 'Finish' : `WP 0${index}`}
                    </span>

                    {/* City name */}
                    <h3
                      className={`text-lg font-bold mb-1 ${
                        index === 4 ? 'text-accent-coral' : 'text-primary-deep'
                      }`}
                    >
                      {wp.name}
                    </h3>

                    {/* Role */}
                    <p className="text-xs font-semibold text-accent-gold uppercase tracking-wider mb-2">
                      {wp.role}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-grow">
                      {wp.description}
                    </p>

                    {/* Distance */}
                    <div className="w-full pt-3 border-t border-surface-container-high">
                      <span className="text-xs font-medium text-primary-bright">
                        {wp.distance}
                      </span>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 5. Race Course Details ==================== */}
      <section className="bg-surface-container py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-center font-display text-3xl md:text-4xl font-bold text-primary-deep mb-4">
              Race Course Details
            </h2>
            <p className="text-center text-muted-foreground text-sm md:text-base mb-16 max-w-xl mx-auto">
              Choose your challenge
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Full Round Card */}
            <RevealOnScroll delay={0.1}>
              <div className="bg-white rounded-3xl shadow-card overflow-hidden border border-surface-container-high group hover:shadow-float transition-all duration-300">
                <div className="h-3 bg-accent-gold" />
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center">
                      <Ship className="w-7 h-7 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-deep">Full Round</h3>
                      <p className="text-sm text-muted-foreground">Sanya → Danzhou → Haikou → Wanning → Sanya</p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-display font-bold text-accent-gold">680</span>
                    <span className="text-lg font-medium text-muted-foreground">nautical miles</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    The ultimate test of offshore sailing. The Full Round course takes
                    competitors on a complete circumnavigation of Hainan Island, passing
                    through four strategic waypoints. Teams face varied wind and sea
                    conditions as they round the island, from the sheltered waters of the
                    Gulf of Tonkin to the exposed eastern seaboard.
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary-deep uppercase tracking-wider">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'Complete circumnavigation of Hainan Island',
                        'Passing 4 strategic waypoints',
                        'Variable wind conditions — west coast vs east coast',
                        'Night sailing required for competitive finish',
                        'Navigation through busy shipping lanes near Haikou',
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Half Round Card */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-white rounded-3xl shadow-card overflow-hidden border border-surface-container-high group hover:shadow-float transition-all duration-300">
                <div className="h-3 bg-primary-bright" />
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary-bright/10 flex items-center justify-center">
                      <Navigation className="w-7 h-7 text-primary-bright" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-deep">Half Round</h3>
                      <p className="text-sm text-muted-foreground">Sanya → Lingshui → Sanya</p>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-display font-bold text-primary-bright">280</span>
                    <span className="text-lg font-medium text-muted-foreground">nautical miles</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    A shorter but no less challenging course for crews looking for a
                    competitive offshore race without the full circumnavigation. The
                    Half Round takes competitors along the stunning southern and eastern
                    coastline of Hainan, with Lingshui as the turning waypoint before
                    the sprint back to Sanya.
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary-deep uppercase tracking-wider">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'Southern and eastern coastal route',
                        'Ideal for crews new to offshore racing',
                        'Stunning coastal scenery throughout',
                        'Tactical wind shifts near Lingshui peninsula',
                        'Same start and finish as Full Round in Sanya',
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-primary-bright mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ==================== Inline styles for animations ==================== */}
      <style jsx>{`
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -60;
          }
        }
        .animate-dash {
          animation: dash-flow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}