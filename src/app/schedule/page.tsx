'use client';

import Link from 'next/link';
import { ChevronDown, MapPin, Anchor, Ship, Compass, Calendar, ArrowRight } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { useLang } from '@/lib/LanguageProvider';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

/* ─── Schedule Data ─── */
const scheduleDays = [
  {
    date: 'October 31',
    day: 'Saturday',
    title: 'Registration & Measurement',
    icon: Calendar,
    events: [
      {
        time: '08:00 – 12:00',
        label: 'Registration Opens',
        location: 'Sanya Serenity Marina',
        detail:
          'All competing teams must complete registration at the Sanya Serenity Marina Race Office. Documents verification, crew list submission, and boat registration forms to be processed.',
      },
      {
        time: '13:00 – 17:00',
        label: 'Crew Weigh-in & Safety Checks',
        location: 'Sanya Serenity Marina',
        detail:
          'Mandatory crew weigh-in for all teams. Safety equipment inspection including life jackets, EPIRBs, flares, fire extinguishers, and emergency rafts. Each boat must have a valid safety certificate.',
      },
      {
        time: '18:00 – 21:00',
        label: 'Welcome Reception & Skippers\' Briefing',
        location: 'Sanya Serenity Marina — Event Hall',
        detail:
          'Official welcome reception for all participants, sponsors, and officials. The Skippers\' Briefing will cover race rules, navigation marks, weather forecasts, communication protocols, and safety procedures for the 15th edition.',
      },
    ],
  },
  {
    date: 'November 1',
    day: 'Sunday',
    title: 'Practice Race & Opening Ceremony',
    icon: Ship,
    events: [
      {
        time: '09:00 – 12:00',
        label: 'Practice Race in Sanya Bay',
        location: 'Sanya Bay',
        detail:
          'A practice race to allow crews to familiarize themselves with the local conditions, test boat handling, and practice starting procedures. All competing yachts are expected to participate.',
      },
      {
        time: '15:00 – 17:00',
        label: 'Official Opening Ceremony',
        location: 'Sanya Serenity Marina — Main Stage',
        detail:
          'Grand Opening Ceremony featuring traditional performances, parade of nations, and speeches from organizing committee, government officials, and distinguished guests. All teams to present in uniform.',
      },
      {
        time: '19:00 – 22:00',
        label: 'Opening Dinner',
        location: 'Sanya Serenity Marina — Ballroom',
        detail:
          'Gala dinner for all participants, dignitaries, and sponsors. Cultural performances and networking opportunities. Team photos and media interviews scheduled.',
      },
    ],
  },
  {
    date: 'November 2',
    day: 'Monday',
    title: 'Inshore Races',
    icon: Compass,
    events: [
      {
        time: '10:00',
        label: 'First Warning Signal',
        location: 'Sanya Bay',
        detail:
          'First warning signal at 11:00. Up to three inshore races scheduled depending on wind conditions. Courses will be set using windward-leeward or trapezoid configurations.',
      },
      {
        time: '11:00 – 16:00',
        label: 'Inshore Racing (3 Races)',
        location: 'Sanya Bay',
        detail:
          'Three inshore races scheduled back-to-back. Each race approximately 45-60 minutes. The race committee will announce the course format at the morning briefing. All classes participate.',
      },
      {
        time: '17:00',
        label: 'Post-Race Briefing',
        location: 'Sanya Serenity Marina',
        detail:
          'Results review and weather briefing for the following day\'s offshore start. Protests to be filed within the protest time limit.',
      },
    ],
  },
  {
    date: 'November 3',
    day: 'Tuesday',
    title: 'Offshore Race Start',
    icon: Anchor,
    events: [
      {
        time: '08:00',
        label: 'Full Round Fleet — Offshore Start',
        location: 'Sanya Bay',
        detail:
          'The Full Round fleet starts the 680-nautical-mile circumnavigation of Hainan Island. Course: Sanya → West Coast → Haikou. Teams face overnight sailing with challenging coastal conditions.',
      },
      {
        time: '08:30',
        label: 'Half Round Fleet — Offshore Start',
        location: 'Sanya Bay',
        detail:
          'The Half Round fleet departs for a shorter course: Sanya → Lingshui area. This course tests tactical decision-making along the southeastern coast.',
      },
      {
        time: '18:00 – 22:00',
        label: 'Tracking & Live Updates',
        location: 'Sanya Serenity Marina — Race HQ',
        detail:
          'Live yacht tracking available via the official race tracker. Estimated positions and ETA updates posted regularly. Media center open for press coverage.',
      },
    ],
  },
  {
    date: 'November 4',
    day: 'Wednesday',
    title: 'Offshore Racing (Day 2)',
    icon: Ship,
    events: [
      {
        time: 'All Day',
        label: 'Full Round Fleet — Northwest Coast',
        location: 'West Coast → Approaching Haikou',
        detail:
          'The Full Round fleet rounds the northwest coast of Hainan, navigating through challenging tidal currents and variable wind conditions along the Gulf of Tonkin. Leading boats approach Haikou by evening.',
      },
      {
        time: 'All Day',
        label: 'Half Round Fleet — Lingshui Area',
        location: 'Lingshui',
        detail:
          'The Half Round fleet competes in the Lingshui area, known for its scenic coastal waters and challenging wind patterns. Racing continues throughout the day.',
      },
      {
        time: 'Evening',
        label: 'Half Round — Return to Sanya',
        location: 'Sanya',
        detail:
          'Half Round fleet expected to return to Sanya Marina. Post-race processing and initial results compilation.',
      },
    ],
  },
  {
    date: 'November 5',
    day: 'Thursday',
    title: 'Offshore Racing (Day 3)',
    icon: Ship,
    events: [
      {
        time: 'All Day',
        label: 'Full Round Fleet — Haikou to East Coast',
        location: 'Haikou → South along East Coast',
        detail:
          'Full Round fleet departs Haikou, heading south along the picturesque east coast of Hainan. This leg features iconic coastal landmarks and potentially challenging sea states as boats navigate the eastern seaboard.',
      },
      {
        time: 'All Day',
        label: 'Half Round Fleet — Rest Day / Inshore Racing',
        location: 'Sanya Bay',
        detail:
          'Rest day for the Half Round fleet with optional inshore racing for those who wish to continue competing. Social activities organized at the marina.',
      },
    ],
  },
  {
    date: 'November 6',
    day: 'Friday',
    title: 'Finish & Prize Giving',
    icon: Anchor,
    events: [
      {
        time: 'Morning – Afternoon',
        label: 'Full Round — Southeast Coast Finish',
        location: 'Southeast Coast → Approaching Sanya',
        detail:
          'Full Round fleet rounds the southeast coast of Hainan, passing through the scenic waters near Luhuitou Peninsula. Leading boats expected to finish in Sanya. Estimated finish times will be announced based on progress.',
      },
      {
        time: 'Afternoon',
        label: 'Full Round — Finish at Sanya',
        location: 'Sanya Serenity Marina',
        detail:
          'Finish line off Sanya Serenity Marina. Welcome celebrations for completing teams. Post-race documentation and interviews.',
      },
      {
        time: '18:00',
        label: 'Half Round — Prize Giving Ceremony',
        location: 'Sanya Serenity Marina',
        detail:
          'Prize Giving Ceremony for the Half Round fleet. Recognition of top finishers and special category awards.',
      },
    ],
  },
  {
    date: 'November 7',
    day: 'Saturday',
    title: 'Awards Ceremony & Closing',
    icon: Calendar,
    events: [
      {
        time: '15:00 – 17:00',
        label: 'Final Prize Giving Ceremony',
        location: 'Sanya Serenity Marina — Main Stage',
        detail:
          'Grand Prize Giving Ceremony for the Full Round fleet. Overall winners, class winners, and special awards presented. Commemorative trophies and prizes for all categories.',
      },
      {
        time: '19:00 – 22:00',
        label: 'Closing Dinner & Farewell',
        location: 'Sanya Serenity Marina — Ballroom',
        detail:
          'Official closing dinner to celebrate the 15th edition of the Round Hainan Regatta. Speeches, cultural performances, and a special tribute to participants and volunteers. Preview of the 16th edition.',
      },
      {
        time: '22:00',
        label: 'Official End of the 15th Edition',
        location: 'Sanya',
        detail:
          'The 15th Round Hainan Regatta officially concludes. Departure arrangements for international teams and logistics for boat shipping coordinated by the race office.',
      },
    ],
  },
];

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
  day: (typeof scheduleDays)[0];
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

            {/* Day cards */}
            {scheduleDays.map((day, index) => (
              <DayCard key={index} day={day} index={index} />
            ))}
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