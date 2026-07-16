'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  Mail,
  FileText,
  Map,
  Users,
  Trophy,
  Anchor,
} from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function EntryOpenArticlePage() {
  useEffect(() => {
    document.title =
      'Entries Now Open for 15th Round Hainan Regatta | News';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ============ HERO BANNER ============ */}
      <section className="relative h-[50vh] min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/50 via-primary-deep/60 to-primary-deep/90" />

        <div className="relative z-10 w-full pb-12 md:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              {/* Category */}
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent-gold/90 text-primary-deep rounded-full">
                  <Tag className="w-3.5 h-3.5" />
                  Entry Announcement
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/80 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  October 15, 2026
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight max-w-3xl">
                Entries Now Open for 15th Round Hainan Regatta
              </h1>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ BACK TO NEWS (TOP) + BYLINE ============ */}
      <section className="bg-white py-8 md:py-10 border-b border-primary-deep/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to News
          </Link>

          {/* Byline */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <User className="w-4 h-4 text-accent-gold" />
              By Race Committee
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-gold" />
              <time dateTime="2026-10-15">October 15, 2026</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <Tag className="w-4 h-4 text-accent-gold" />
              Entry Announcement
            </span>
          </div>
        </div>
      </section>

      {/* ============ ARTICLE BODY + SIDEBAR ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article Body */}
            <article className="lg:col-span-8 max-w-4xl">
              <RevealOnScroll>
                <div className="prose prose-lg max-w-none text-primary-deep/90">
                  <p className="text-xl md:text-2xl font-display font-medium text-primary-deep leading-relaxed mb-8">
                    The 15th Round Hainan Regatta officially opens registration
                    for the 2026 edition, with the fleet set to depart Sanya,
                    China on <strong>October 31, 2026</strong> and complete the
                    circumnavigation on <strong>November 7, 2026</strong>.
                  </p>

                  <p className="text-base md:text-lg leading-relaxed mb-6">
                    Now entering its fifteenth year, the Round Hainan Regatta
                    has firmly established itself as one of Asia&apos;s premier
                    offshore sailing events. Past editions have attracted
                    <strong> over 40 boats </strong> and welcomed international
                    entries from more than <strong>15 countries</strong>,
                    reflecting the race&apos;s growing reputation on the world
                    stage.
                  </p>

                  <p className="text-base md:text-lg leading-relaxed mb-6">
                    For the 2026 edition, four racing classes will compete
                    alongside one another around Hainan Island:
                    <strong> Dubois 50 One-Design</strong>,
                    <strong> ORC Full Round</strong>,
                    <strong> ORC Half Round</strong>, and the
                    <strong> Fareast 28R </strong>
                    sportboat class. This mix continues to strike a balance
                    between grand-prix offshore campaigns and the tighter,
                    highly tactical inshore sportboat fleet.
                  </p>

                  <p className="text-base md:text-lg leading-relaxed mb-6">
                    The registration deadline is set for{' '}
                    <strong>September 30, 2026</strong>. Late entries may be
                    accepted at the sole discretion of the Organizing
                    Committee, subject to fleet capacity and inspection
                    schedule. Owners are strongly encouraged to submit
                    paperwork early to secure their preferred class allocation
                    and berthing arrangement.
                  </p>

                  <p className="text-base md:text-lg leading-relaxed mb-6">
                    Full details of entry fees, safety equipment requirements,
                    minimum crew qualifications, and category-specific
                    regulations are set out in the official{' '}
                    <strong>Notice of Race</strong>. All competing yachts must
                    complete safety inspection at the host venue prior to the
                    start, and skippers are required to attend the pre-race
                    briefing.
                  </p>

                  <p className="text-base md:text-lg leading-relaxed mb-6">
                    The Race Committee is expecting the strongest and deepest
                    fleet in the event&apos;s history, with several
                    international teams from Hong Kong, Singapore, Australia,
                    and Europe already confirmed. Rumours from the docks
                    suggest at least two new Dubois 50 programs are being
                    assembled specifically for this edition.
                  </p>

                  {/* Blockquote */}
                  <blockquote className="my-10 pl-6 md:pl-8 border-l-4 border-accent-gold bg-surface-container/60 py-6 pr-6 rounded-r-2xl">
                    <p className="text-lg md:text-xl font-display italic text-primary-deep leading-relaxed mb-3">
                      &ldquo;The 15th edition marks a milestone for offshore
                      sailing in Asia. Fifteen years of continuous racing
                      around one of the most beautiful islands in the region
                      is something we are enormously proud of — and this
                      year&apos;s fleet will be the strongest yet.&rdquo;
                    </p>
                    <footer className="text-sm font-semibold text-primary-deep/80 not-italic">
                      — Chief Race Officer, Round Hainan Regatta
                    </footer>
                  </blockquote>

                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mt-12 mb-5">
                    How to Register
                  </h2>

                  <p className="text-base md:text-lg leading-relaxed mb-6">
                    Prospective competitors can begin the entry process through
                    the official regatta website. All applicants will receive
                    an acknowledgement within five business days, followed by
                    payment instructions and safety-inspection scheduling.
                    Questions regarding entries, boat measurement, or
                    logistical support should be directed to the Race Office.
                  </p>

                  <p className="text-base md:text-lg leading-relaxed mb-6">
                    For any queries, please contact the Race Office by email
                    at{' '}
                    <a
                      href="mailto:roundhainanregatta@foxmail.com"
                      className="text-primary font-semibold hover:text-accent-gold transition-colors underline decoration-accent-gold/40 underline-offset-4"
                    >
                      roundhainanregatta@foxmail.com
                    </a>
                    . The Organizing Committee looks forward to welcoming
                    competitors, crews, and supporters back to Sanya for what
                    promises to be an unforgettable fifteenth edition.
                  </p>
                </div>
              </RevealOnScroll>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                <RevealOnScroll delay={0.1}>
                  <div className="bg-surface-container rounded-2xl p-6 shadow-card">
                    <h3 className="text-lg font-display font-bold text-primary-deep mb-4 flex items-center gap-2">
                      <Anchor className="w-5 h-5 text-accent-gold" />
                      Quick Links
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/contact"
                          className="flex items-start gap-3 p-3 rounded-lg bg-white hover:bg-primary-deep hover:text-white transition-colors group"
                        >
                          <Users className="w-5 h-5 mt-0.5 text-accent-gold shrink-0" />
                          <div>
                            <div className="text-sm font-semibold">
                              Register Now
                            </div>
                            <div className="text-xs text-muted-foreground group-hover:text-white/70">
                              Submit your entry
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-start gap-3 p-3 rounded-lg bg-white hover:bg-primary-deep hover:text-white transition-colors group"
                        >
                          <FileText className="w-5 h-5 mt-0.5 text-accent-gold shrink-0" />
                          <div>
                            <div className="text-sm font-semibold">
                              Notice of Race (PDF)
                            </div>
                            <div className="text-xs text-muted-foreground group-hover:text-white/70">
                              Full regulations
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <Link
                          href="/course"
                          className="flex items-start gap-3 p-3 rounded-lg bg-white hover:bg-primary-deep hover:text-white transition-colors group"
                        >
                          <Map className="w-5 h-5 mt-0.5 text-accent-gold shrink-0" />
                          <div>
                            <div className="text-sm font-semibold">
                              Course Information
                            </div>
                            <div className="text-xs text-muted-foreground group-hover:text-white/70">
                              Route & waypoints
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/classes"
                          className="flex items-start gap-3 p-3 rounded-lg bg-white hover:bg-primary-deep hover:text-white transition-colors group"
                        >
                          <Trophy className="w-5 h-5 mt-0.5 text-accent-gold shrink-0" />
                          <div>
                            <div className="text-sm font-semibold">
                              Racing Classes
                            </div>
                            <div className="text-xs text-muted-foreground group-hover:text-white/70">
                              Dubois 50 · ORC · 28R
                            </div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                  <div className="bg-primary-deep rounded-2xl p-6 text-white shadow-card">
                    <h3 className="text-lg font-display font-bold mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-accent-gold" />
                      Race Office
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed mb-4">
                      Questions about entries, safety inspection, or logistics?
                      Reach out directly.
                    </p>
                    <a
                      href="mailto:roundhainanregatta@foxmail.com"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent-gold hover:text-white transition-colors"
                    >
                      roundhainanregatta@foxmail.com
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </RevealOnScroll>
              </div>
            </aside>
          </div>
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
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-deep text-white text-sm font-semibold hover:bg-accent-gold hover:text-primary-deep transition-colors group shadow-card"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to News
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
