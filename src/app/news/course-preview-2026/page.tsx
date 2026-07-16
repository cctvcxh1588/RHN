'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  Map as MapIcon,
  Compass,
  Wind,
  Anchor,
  Navigation,
  CloudRain,
} from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

const waypoints = [
  {
    name: 'Sanya',
    role: 'Start / Finish',
    note: 'Tropical resort city on the southern coast — host port and starting gun.',
  },
  {
    name: 'Dongfang',
    role: 'Waypoint 1',
    note: 'Western industrial coast, first strategic gate after leaving Sanya.',
  },
  {
    name: 'Yang Pu',
    role: 'Waypoint 2',
    note: 'Deep-water port with strong tidal flows in and around the peninsula.',
  },
  {
    name: 'Haikou',
    role: 'Waypoint 3',
    note: "Hainan's capital on the Qiongzhou Strait; traditionally a decisive corner.",
  },
  {
    name: 'Qinglan',
    role: 'Waypoint 4',
    note: 'East-coast fishing port where the fleet turns south into the trades.',
  },
  {
    name: 'Wanning',
    role: 'Waypoint 5',
    note: 'Famous surf coast — reliable easterlies but exposed swell.',
  },
  {
    name: 'Lingshui',
    role: 'Waypoint 6',
    note: 'Final gate before turning west along the south coast toward Sanya.',
  },
];

export default function CoursePreviewArticlePage() {
  useEffect(() => {
    document.title =
      'Race Course Revealed: New Clockwise Route Around Hainan | News';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ============ HERO BANNER ============ */}
      <section className="relative h-[50vh] min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/carousel-2.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/50 via-primary-deep/60 to-primary-deep/90" />

        <div className="relative z-10 w-full pb-12 md:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent-gold/90 text-primary-deep rounded-full">
                  <Tag className="w-3.5 h-3.5" />
                  Race Course
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/80 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  October 8, 2026
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight max-w-3xl">
                Race Course Revealed: New Clockwise Route Around Hainan
              </h1>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ BACK LINK + BYLINE ============ */}
      <section className="bg-white py-8 md:py-10 border-b border-primary-deep/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to News
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <User className="w-4 h-4 text-accent-gold" />
              By Race Committee
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-gold" />
              <time dateTime="2026-10-08">October 8, 2026</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <Tag className="w-4 h-4 text-accent-gold" />
              Race Course
            </span>
          </div>
        </div>
      </section>

      {/* ============ ARTICLE BODY ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="prose prose-lg max-w-none text-primary-deep/90">
              <p className="text-xl md:text-2xl font-display font-medium text-primary-deep leading-relaxed mb-8">
                <strong>New for 2026:</strong> for the first time in the
                event&apos;s history, the fleet will circumnavigate Hainan
                Island <strong>clockwise</strong> — heading west out of Sanya
                and returning along the east coast.
              </p>

              <p className="text-base md:text-lg leading-relaxed mb-6">
                The reversed direction fundamentally changes the strategic
                complexion of the race. Instead of a downwind blast up the east
                coast, competitors will now face the prevailing southwest
                monsoon head-on in the opening 36 hours — a demanding upwind
                start that will separate well-prepared programs from the rest
                of the fleet almost immediately.
              </p>
            </div>
          </RevealOnScroll>

          {/* Key Stats */}
          <RevealOnScroll delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
              <div className="bg-surface-container rounded-2xl p-6 text-center">
                <Navigation className="w-6 h-6 text-accent-gold mx-auto mb-3" />
                <div className="text-3xl font-display font-bold text-primary-deep">
                  680
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Nautical Miles (Full)
                </div>
              </div>
              <div className="bg-surface-container rounded-2xl p-6 text-center">
                <Compass className="w-6 h-6 text-accent-gold mx-auto mb-3" />
                <div className="text-3xl font-display font-bold text-primary-deep">
                  7
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Waypoints
                </div>
              </div>
              <div className="bg-surface-container rounded-2xl p-6 text-center">
                <Anchor className="w-6 h-6 text-accent-gold mx-auto mb-3" />
                <div className="text-3xl font-display font-bold text-primary-deep">
                  280
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Half Round (NM)
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="prose prose-lg max-w-none text-primary-deep/90">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mt-4 mb-5 flex items-center gap-3">
                <MapIcon className="w-7 h-7 text-accent-gold" />
                The Route
              </h2>

              <p className="text-base md:text-lg leading-relaxed mb-4">
                The full course covers approximately{' '}
                <strong>680 nautical miles</strong>, threading seven waypoints
                around the island:
              </p>

              <p className="text-base md:text-lg leading-relaxed mb-8 font-display text-primary-deep">
                Sanya → Dongfang → Yang Pu → Haikou → Qinglan → Wanning →
                Lingshui → Sanya
              </p>
            </div>
          </RevealOnScroll>

          {/* Waypoints List */}
          <div className="space-y-4 mb-12">
            {waypoints.map((wp, index) => (
              <RevealOnScroll key={wp.name} delay={index * 0.05}>
                <div className="flex items-start gap-4 p-5 bg-surface-container rounded-2xl hover:shadow-card transition-shadow">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary-deep text-white flex items-center justify-center font-display font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h3 className="text-lg font-display font-bold text-primary-deep">
                        {wp.name}
                      </h3>
                      <span className="text-xs uppercase tracking-wider text-accent-gold font-semibold">
                        {wp.role}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {wp.note}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Map placeholder */}
          <RevealOnScroll>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-surface-container shadow-card mb-12">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{ backgroundImage: "url('/route-map.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <div className="text-white">
                  <div className="text-xs uppercase tracking-wider text-accent-gold font-semibold mb-1">
                    Interactive Map
                  </div>
                  <div className="text-sm font-display font-semibold">
                    2026 Course · Clockwise Circumnavigation
                  </div>
                </div>
                <Link
                  href="/course"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold text-primary-deep text-sm font-semibold hover:bg-white transition-colors"
                >
                  View Full Course
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="prose prose-lg max-w-none text-primary-deep/90">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mt-4 mb-5 flex items-center gap-3">
                <Anchor className="w-7 h-7 text-accent-gold" />
                Half Round Option
              </h2>

              <p className="text-base md:text-lg leading-relaxed mb-6">
                For crews stepping up to their first offshore campaign or
                boats better suited to shorter passages, the{' '}
                <strong>ORC Half Round</strong> option offers a{' '}
                <strong>280 nautical mile</strong> course running{' '}
                <strong>Sanya → Lingshui → Sanya</strong>. It preserves the
                headline experience — a proper offshore leg with tropical
                trade-wind sailing — in a format that&apos;s more accessible
                for weekend-warrior programs.
              </p>

              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mt-12 mb-5 flex items-center gap-3">
                <Wind className="w-7 h-7 text-accent-gold" />
                Strategic Implications
              </h2>

              <p className="text-base md:text-lg leading-relaxed mb-6">
                Leaving Sanya to the west means the fleet immediately confronts
                the <strong>prevailing southwest monsoon</strong>. Historically
                this leg has been sailed with the wind astern; running it upwind
                changes sail selection, watch systems, and — for many boats —
                the calculus around which crew comes on board. Expect longer
                tacking duels along the west coast and premium value on
                well-drilled sail changes.
              </p>

              <p className="text-base md:text-lg leading-relaxed mb-6">
                Once the fleet clears the northwest corner past Yang Pu and
                turns east through the Qiongzhou Strait toward Haikou, the
                dynamic shifts entirely. Strong tidal currents, commercial
                shipping traffic, and unpredictable wind shadows off the
                mainland make this stretch one of the most tactically demanding
                on the course.
              </p>

              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mt-12 mb-5 flex items-center gap-3">
                <CloudRain className="w-7 h-7 text-accent-gold" />
                Weather & Typhoon Considerations
              </h2>

              <p className="text-base md:text-lg leading-relaxed mb-6">
                Late October and early November sit at the tail end of the
                northwest Pacific typhoon season. The Race Committee monitors
                tropical systems for two weeks before the start, and both
                start-time and routing are subject to safety-based
                modification. Recent editions have avoided incident thanks to
                careful scheduling — but crews should prepare for the full
                spectrum of tropical conditions, from glassy calms to
                short-lived squalls of 30+ knots.
              </p>

              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mt-12 mb-5">
                Historical Notes on the Waypoints
              </h2>

              <p className="text-base md:text-lg leading-relaxed mb-6">
                <strong>Haikou</strong>, on the Qiongzhou Strait, has been a
                trading port for more than a thousand years and its old
                lighthouse continues to serve as a visual reference at night.
                <strong> Yang Pu</strong> hosts one of China&apos;s largest
                deep-water container terminals, and its bay produces unusual
                current patterns that catch out first-time competitors.
                <strong> Wanning</strong>, meanwhile, is home to Hainan&apos;s
                famous surf beaches — a reminder that the eastern coast is fully
                exposed to South China Sea swell.
              </p>

              <p className="text-base md:text-lg leading-relaxed mb-6">
                Every one of the seven marks tells a story. Taken together they
                form what the Race Committee believes is the most compelling
                Round Hainan course yet.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ CTA BACK TO NEWS ============ */}
      <section className="bg-surface-container py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-3">
              Keep Reading
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mb-6">
              Explore More Stories
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-deep text-white text-sm font-semibold hover:bg-accent-gold hover:text-primary-deep transition-colors group shadow-card"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to News
              </Link>
              <Link
                href="/course"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary-deep text-sm font-semibold hover:bg-accent-gold transition-colors group shadow-card border border-primary-deep/10"
              >
                View Full Course
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
