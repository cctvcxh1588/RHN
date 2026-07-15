'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building, Landmark, Umbrella, UtensilsCrossed, Anchor, Ship, Sailboat, ChevronRight } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import RevealOnScroll from '@/components/RevealOnScroll';

/* ─── Animated Counter Component ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

/* ─── Slide Data ─── */
const heroSlides = [
  { src: '/hero.jpg', alt: 'Round Hainan Regatta hero' },
  { src: '/carousel-2.jpg', alt: 'Sailing boats at sunset' },
  { src: '/carousel-3.jpg', alt: 'Racing yachts in open water' },
  { src: '/carousel-4.jpg', alt: 'Hainan coastline sailing' },
];

/* ─── Stat Data ─── */
const stats = [
  { value: 15, suffix: '', label: 'Editions' },
  { value: 680, suffix: '', label: 'Nautical Miles' },
  { value: 8, suffix: '', label: 'Race Days' },
  { value: 4, suffix: '', label: 'Racing Classes' },
];

/* ─── Hainan Highlights Data ─── */
const hainanHighlights = [
  {
    icon: Building,
    title: 'Duty-Free Paradise',
    description:
      'Hainan\'s Free Trade Port policy offers duty-free shopping, tax incentives, and seamless international access for visitors and investors alike.',
  },
  {
    icon: Landmark,
    title: 'Rich Heritage',
    description:
      'Home to the Li and Miao ethnic groups, Hainan boasts a vibrant cultural tapestry of traditional crafts, festivals, and centuries-old customs.',
  },
  {
    icon: Umbrella,
    title: 'Tropical Paradise',
    description:
      'With powder-soft beaches, crystal-clear waters, and year-round tropical climate, Hainan is Asia\'s ultimate island getaway.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Culinary Journey',
    description:
      'From fresh seafood and Wenchang chicken to Hainan noodles and tropical fruits, the island\'s cuisine is a feast for the senses.',
  },
];

/* ─── Schedule Data ─── */
const scheduleHighlights = [
  {
    date: 'Oct 31',
    event: 'Opening Ceremony',
    description:
      'The regatta begins with a grand opening ceremony at Sanya Serenity Marina, featuring a parade of boats and crew introductions.',
  },
  {
    date: 'Nov 2',
    event: 'Offshore Start',
    description:
      'The fleet departs Sanya for the first leg of the 680-nautical-mile circumnavigation, heading west toward Danzhou.',
  },
  {
    date: 'Nov 7',
    event: 'Awards Ceremony',
    description:
      'The final day concludes with the awards ceremony celebrating the winners across all classes at the Sanya marina.',
  },
];

/* ─── Classes Data ─── */
const racingClasses = [
  {
    name: 'Dubois 50',
    description:
      'A high-performance one-design class featuring the Dubois 50 yacht. These sleek vessels offer competitive racing with identical specifications, putting crew skill and strategy front and center.',
    features: ['One-design racing', 'Crew of 10-12', 'High-performance design'],
  },
  {
    name: 'ORC Full Round',
    description:
      'The premier rating class for the full circumnavigation. Competing under ORC rating rules, this diverse fleet includes everything from custom racers to cruiser-racers, all vying for the coveted overall title.',
    features: ['ORC rating system', 'Full circumnavigation', 'Mixed fleet competition'],
  },
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION 1: Hero Carousel
          ═══════════════════════════════════════════ */}
      <section className="relative h-screen">
        <HeroCarousel slides={heroSlides} interval={5000} className="h-full">
          <div className="relative z-[3] flex h-full flex-col items-center justify-center px-4 text-center">
            {/* Edition Badge */}
            <RevealOnScroll delay={0.1}>
              <span className="inline-block rounded-full bg-accent-gold/20 px-5 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-accent-gold backdrop-blur-sm mb-6">
                15th Edition
              </span>
            </RevealOnScroll>

            {/* Main Title */}
            <RevealOnScroll delay={0.2}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-4 drop-shadow-lg">
                Round Hainan
                <br />
                Regatta
              </h1>
            </RevealOnScroll>

            {/* Subtitle */}
            <RevealOnScroll delay={0.3}>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-6 font-light">
                680 Miles. One Island. A Sea You&apos;ve Never Sailed.
              </p>
            </RevealOnScroll>

            {/* Date */}
            <RevealOnScroll delay={0.4}>
              <p className="text-sm text-white/60 mb-10 tracking-wide">
                October 31 – November 7, 2026 · Sanya, China
              </p>
            </RevealOnScroll>

            {/* CTA Buttons */}
            <RevealOnScroll delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-accent-gold text-primary-deep font-semibold text-sm rounded-md hover:bg-accent-gold/90 transition-all hover:scale-105 shadow-lg"
                >
                  Explore The Race
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/40 text-white font-semibold text-sm rounded-md hover:bg-white/10 hover:border-white/60 transition-all"
                >
                  Register Interest
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </HeroCarousel>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: Stats Section
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <RevealOnScroll key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-primary-deep leading-tight">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground font-medium uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: About The Race
          ═══════════════════════════════════════════ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-4">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-gold">
                The Story
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground mb-4">
              A Race Around Paradise
            </h2>
            <div className="flex justify-center mb-12">
              <div className="h-1 w-16 bg-accent-gold rounded-full" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <RevealOnScroll delay={0.1}>
              <div className="space-y-6">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Since its founding in 2011, the Round Hainan Regatta has grown into one of Asia&apos;s premier offshore sailing events, attracting professional and amateur crews from around the globe. The 680-nautical-mile circumnavigation of Hainan Island offers a unique challenge: unpredictable currents, shifting trade winds, and the stunning backdrop of China&apos;s tropical coastline.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  The 15th edition in 2026 promises to be the most competitive yet, with an expanded fleet, enhanced safety protocols, and a renewed focus on sustainability. Whether you&apos;re a seasoned offshore racer or a passionate spectator, the Round Hainan Regatta is an experience like no other.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center text-primary font-semibold text-sm hover:text-primary-bright transition-colors group"
                >
                  Learn More About The Race
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </RevealOnScroll>

            {/* Right: Image */}
            <RevealOnScroll delay={0.2}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-card">
                <Image
                  src="/phoenix-sanya.jpg"
                  alt="Phoenix Island, Sanya"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: About Hainan
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-4">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-gold">
                Explore Hainan
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground mb-4">
              Beyond the Race
            </h2>
            <div className="flex justify-center mb-16">
              <div className="h-1 w-16 bg-accent-gold rounded-full" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {hainanHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <RevealOnScroll key={item.title} delay={index * 0.1}>
                  <div className="group rounded-xl bg-white p-8 text-center shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-1">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold group-hover:bg-accent-gold group-hover:text-white transition-all duration-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: The Course Preview
          ═══════════════════════════════════════════ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-4">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-gold">
                The Course
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground mb-4">
              Around the Island
            </h2>
            <div className="flex justify-center mb-6">
              <div className="h-1 w-16 bg-accent-gold rounded-full" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <RevealOnScroll delay={0.1}>
              <div className="space-y-6">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  The full circumnavigation covers 680 nautical miles around Hainan Island, starting and finishing in Sanya. The course takes competitors through some of the most challenging and beautiful waters in the South China Sea.
                </p>

                {/* Waypoints */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                    Key Waypoints
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {['Sanya', 'Danzhou', 'Haikou', 'Wanning', 'Sanya'].map(
                      (waypoint, idx) => (
                        <div
                          key={waypoint}
                          className="flex items-center gap-2"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-deep text-white text-xs font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {waypoint}
                          </span>
                          {idx < 4 && (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <Link
                  href="/course"
                  className="inline-flex items-center text-primary font-semibold text-sm hover:text-primary-bright transition-colors group"
                >
                  View Full Course
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </RevealOnScroll>

            {/* Right: Map Preview */}
            <RevealOnScroll delay={0.2}>
              <Link href="/course" className="block group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-card">
                  <Image
                    src="/hainan-map.png"
                    alt="Hainan Island race course map"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-deep/0 group-hover:bg-primary-deep/10 transition-colors" />
                </div>
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: Schedule Preview
          ═══════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-4">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-gold">
                The Schedule
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground mb-4">
              Mark Your Calendar
            </h2>
            <div className="flex justify-center mb-16">
              <div className="h-1 w-16 bg-accent-gold rounded-full" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {scheduleHighlights.map((item, index) => (
              <RevealOnScroll key={item.event} delay={index * 0.1}>
                <div className="rounded-xl bg-white p-8 shadow-card border border-border/50 hover:shadow-float transition-all duration-300 hover:-translate-y-1">
                  <div className="text-accent-gold font-bold text-2xl mb-2 font-display">
                    {item.date}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {item.event}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/schedule"
                className="inline-flex items-center text-primary font-semibold text-sm hover:text-primary-bright transition-colors group"
              >
                View Full Schedule
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7: Classes Preview
          ═══════════════════════════════════════════ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-4">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-gold">
                The Classes
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-center text-foreground mb-4">
              Choose Your Challenge
            </h2>
            <div className="flex justify-center mb-16">
              <div className="h-1 w-16 bg-accent-gold rounded-full" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {racingClasses.map((cls, index) => (
              <RevealOnScroll key={cls.name} delay={index * 0.1}>
                <div className="rounded-xl bg-white p-8 shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-deep/10 text-primary-deep">
                      <Sailboat className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {cls.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {cls.description}
                  </p>
                  <ul className="space-y-2">
                    {cls.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-gold flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.2}>
            <div className="text-center mt-12">
              <Link
                href="/classes"
                className="inline-flex items-center text-primary font-semibold text-sm hover:text-primary-bright transition-colors group"
              >
                View All Classes
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8: CTA Section
          ═══════════════════════════════════════════ */}
      <section className="bg-primary-deep py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
                Ready to Set Sail?
              </h2>
              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">
                Join the 15th Round Hainan Regatta
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-accent-gold text-primary-deep font-bold text-base rounded-md hover:bg-accent-gold/90 transition-all hover:scale-105 shadow-lg"
              >
                Register Interest
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}