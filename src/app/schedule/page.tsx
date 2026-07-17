'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin, Anchor, Ship, Compass, Calendar, ArrowRight, ClipboardList, Users, Trophy } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { useLang } from '@/lib/LanguageProvider';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

/* ─── Types ─── */
type ScheduleEvent = {
  time: string;
  label_en: string;
  label_zh: string;
  location_en: string;
  location_zh: string;
  detail_en: string;
  detail_zh: string;
};

type ScheduleItem = {
  id: string;
  day_label: string;
  date_label_en: string;
  date_label_zh: string;
  title_en: string;
  title_zh: string;
  description_en: string | null;
  description_zh: string | null;
  location_en: string | null;
  location_zh: string | null;
  category: string;
  sort_order: number;
  events_json: string | ScheduleEvent[];
  is_published: boolean;
};

type DayData = {
  date: string;
  day: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  events: {
    time: string;
    label: string;
    location: string;
    detail: string;
  }[];
};

/* ─── Icon mapping ─── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ceremony: Calendar,
  Race: Ship,
  Briefing: ClipboardList,
  Other: Compass,
};

function getIcon(category: string, sortOrder: number): React.ComponentType<{ className?: string }> {
  if (iconMap[category]) return iconMap[category];
  // Fallback based on sort_order
  const fallbacks: React.ComponentType<{ className?: string }>[] = [Calendar, Ship, Compass, Anchor, Users, Trophy, ClipboardList, Ship];
  return fallbacks[sortOrder % fallbacks.length];
}

/* ─── SVG Timeline Line ─── */
function TimelineLine() {
  return (
    <svg
      className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 hidden md:block"
      aria-hidden="true"
    >
      <line
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="#F6AA00"
        strokeWidth="2"
        strokeDasharray="6 6"
        className="opacity-50"
      />
    </svg>
  );
}

/* ─── Timeline Dot ─── */
function TimelineDot() {
  return (
    <div className="absolute left-1/2 top-6 z-10 hidden md:flex -translate-x-1/2 items-center justify-center">
      <div className="h-5 w-5 rounded-full border-4 border-accent-gold bg-primary-deep shadow-[0_0_0_4px_rgba(246,170,0,0.2)]" />
    </div>
  );
}

/* ─── Day Card Component ─── */
function DayCard({
  day,
  index,
}: {
  day: DayData;
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const Icon = day.icon;

  return (
    <RevealOnScroll delay={index * 0.1}>
      <div className="relative mb-12 last:mb-0">
        {/* Mobile — always left aligned */}
        <div className="md:hidden">
          <div className="flex items-start gap-4">
            {/* Date badge column */}
            <div className="flex flex-col items-center shrink-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold/15 px-3 py-1 text-xs font-semibold text-accent-gold whitespace-nowrap">
                <Icon className="h-3.5 w-3.5" />
                <span>{day.date}</span>
              </div>
              <div className="mt-2 h-full w-0.5 bg-accent-gold/20" />
            </div>
            {/* Card */}
            <div className="min-w-0 flex-1 rounded-xl border border-primary-deep/10 bg-white p-5 shadow-card">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-primary-deep/10 px-2.5 py-0.5 text-xs font-medium text-primary-deep">
                  {day.day}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-bold text-primary-deep">
                {day.title}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {day.events.map((event, eIdx) => (
                  <AccordionItem key={eIdx} value={`mobile-${index}-${eIdx}`}>
                    <AccordionTrigger className="py-3 text-left">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium text-accent-gold">
                          {event.time}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {event.label}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {event.detail}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Desktop — alternating left/right */}
        <div className="hidden md:block">
          <TimelineDot />

          <div className={`flex items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Card side */}
            <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
              <div
                className={`rounded-xl border border-primary-deep/10 bg-white p-6 shadow-card transition-shadow hover:shadow-float ${
                  isLeft ? 'text-right' : 'text-left'
                }`}
              >
                {/* Date badge */}
                <div
                  className={`mb-2 flex items-center gap-1.5 ${
                    isLeft ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold/15 px-3 py-1 text-xs font-semibold text-accent-gold">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{day.date}</span>
                  </div>
                </div>

                {/* Day */}
                <span className="mb-1 inline-block rounded-full bg-primary-deep/10 px-2.5 py-0.5 text-xs font-medium text-primary-deep">
                  {day.day}
                </span>

                <h3 className="mb-4 text-xl font-bold text-primary-deep">
                  {day.title}
                </h3>

                <Accordion type="single" collapsible className="w-full">
                  {day.events.map((event, eIdx) => (
                    <AccordionItem key={eIdx} value={`desktop-${index}-${eIdx}`}>
                      <AccordionTrigger className="py-3">
                        <div className={`flex flex-col gap-0.5 ${isLeft ? 'items-end' : 'items-start'}`}>
                          <span className="text-xs font-medium text-accent-gold">
                            {event.time}
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            {event.label}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className={`text-sm leading-relaxed text-muted-foreground ${isLeft ? 'text-right' : 'text-left'}`}>
                          {event.detail}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Empty side for balance */}
            <div className="w-[calc(50%-2rem)]" />
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

/* ─── Page Component ─── */
export default function SchedulePage() {
  const { t } = useLang();
  const [scheduleDays, setScheduleDays] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSchedule = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/cms/schedule');
        const json = await res.json();

        if (!json.ok) {
          throw new Error(json.error || 'Failed to fetch schedule');
        }

        const items: ScheduleItem[] = json.items;

        // Sort by sort_order
        const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);

        const days: DayData[] = sorted.map((item) => {
          // Parse events_json
          let events: ScheduleEvent[] = [];
          if (item.events_json) {
            if (typeof item.events_json === 'string') {
              try {
                events = JSON.parse(item.events_json);
              } catch {
                events = [];
              }
            } else {
              events = item.events_json;
            }
          }

          return {
            date: item.date_label_en,
            day: item.day_label,
            title: item.title_en,
            icon: getIcon(item.category, item.sort_order),
            events: events.map((ev) => ({
              time: ev.time,
              label: ev.label_en,
              location: ev.location_en,
              detail: ev.detail_en,
            })),
          };
        });

        if (!cancelled) {
          setScheduleDays(days);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSchedule();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════
          1. Hero Banner
         ════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero.jpg)' }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/70 via-primary-deep/50 to-primary-deep/80" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <RevealOnScroll>
            <span className="mb-4 inline-block rounded-full bg-accent-gold/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-gold backdrop-blur-sm">
              {t('schedule', 'heroBadge')}
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t('schedule', 'heroTitle')}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="mt-4 text-lg font-light text-white/80 sm:text-xl">
              {t('schedule', 'heroSub')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.45}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-accent-gold" />
                October 31 – November 7, 2026
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent-gold" />
                Sanya, Hainan, China
              </span>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/40" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. Day by Day Timeline
         ════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-24 sm:py-32">
        {/* Section header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-16 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
                {t('schedule', 'timelineEyebrow')}
              </span>
              <h2 className="font-display text-4xl font-bold text-primary-deep sm:text-5xl">
                {t('schedule', 'timelineTitle')}
              </h2>
              <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent-gold" />
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                Eight days of unforgettable racing, celebration, and camaraderie
                around the beautiful island of Hainan.
              </p>
            </div>
          </RevealOnScroll>

          {/* Timeline */}
          <div className="relative mx-auto max-w-5xl">
            {/* Desktop — central vertical line */}
            <TimelineLine />

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent-gold/30 border-t-accent-gold" />
                  <span className="text-sm text-muted-foreground">Loading schedule...</span>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
                <p className="text-sm font-medium text-destructive">Failed to load schedule</p>
                <p className="mt-1 text-xs text-muted-foreground">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary-deep px-4 py-2 text-sm font-semibold text-white hover:bg-primary-deep/90"
                >
                  Retry
                </button>
              </div>
            ) : scheduleDays.length === 0 ? (
              <div className="rounded-xl border border-border bg-muted/30 p-8 text-center">
                <p className="text-sm text-muted-foreground">No schedule items available yet.</p>
              </div>
            ) : (
              /* Day cards */
              scheduleDays.map((day, index) => (
                <DayCard key={index} day={day} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. CTA Section
         ════════════════════════════════════════════════════ */}
      <section className="relative bg-primary-deep py-24 sm:py-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent-gold/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary-bright/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <RevealOnScroll>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold">
              Join the Adventure
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Plan Your Visit
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Whether you&apos;re a competitor, sponsor, or spectator — experience
              the thrill of the Round Hainan Regatta. Get in touch with our team
              to start planning your journey.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.45}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent-gold px-8 py-3.5 text-base font-semibold text-primary-deep shadow-lg transition-all hover:bg-accent-gold/90 hover:shadow-xl hover:scale-105"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/classes"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                View Racing Classes
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}