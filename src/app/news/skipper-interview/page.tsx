'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  Quote,
  MessageCircle,
  Camera,
  Anchor,
} from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

const qa = [
  {
    q: 'How has the race changed over the years?',
    a: [
      "When I sailed my first Round Hainan back in the early days, the fleet was mostly local — a handful of enthusiast programs, one or two visiting boats, and a lot of learning-on-the-job. The race has grown enormously since then. Today you see world-class navigators, professional shore teams, dedicated meteorologists — it feels closer to a Sydney-Hobart than the friendly regional event it started as.",
      "But what's most striking is the increase in professionalism at every level. Safety inspections are stricter, crew briefings are more thorough, and the level of preparation demanded by the Notice of Race is genuinely serious. That's raised the standard of racing right through the fleet. Even mid-pack boats now arrive with proper rigs, checked electronics, and crew who have trained together.",
      "The weather patterns are shifting too. We're seeing later typhoon seasons, and the trade winds arrive less predictably than they used to. That puts a premium on flexible strategy — you can't just recycle last year's routing playbook.",
    ],
  },
  {
    q: "What's the toughest leg?",
    a: [
      "Without hesitation: the <strong>northwest passage from Yang Pu up to Haikou</strong>. On paper it looks straightforward — you're mostly sailing along the coast — but the currents through the Qiongzhou Strait are unpredictable, the wind gets funneled and shadowed by the mainland to the north, and you can lose an hour to a competitor half a mile away because they picked the right shift.",
      "It's also usually sailed at night after two days at sea, so the crew is tired and the tactical decisions are relentless. I've seen races won and lost on that single leg. First-time competitors underestimate it every single edition.",
    ],
  },
  {
    q: 'Advice for newcomers?',
    a: [
      "Three things. First: <strong>preparation</strong>. Do more than the minimum required by the Notice of Race. Check your rig, your electronics, your safety gear, your food and water plan. Offshore, small problems become big problems very quickly.",
      "Second: <strong>safety</strong>. Respect the sea. Wear your harness on deck at night without being asked. Have a proper watch system from the moment you cross the start line — not just when you're feeling tired. Know exactly where every piece of safety equipment lives.",
      "Third — and this is the one no one tells you — <strong>respect the sea and enjoy it</strong>. Round Hainan is a race, yes, but it's also one of the most beautiful passages you'll ever sail. Look up occasionally. Watch the flying fish. Take the sunrise in with a cup of coffee. You'll race better if you're actually present.",
    ],
  },
  {
    q: 'What makes Round Hainan unique?',
    a: [
      "It's warm-water offshore racing. That sounds trivial but it changes everything. You don't need six layers of gear, you don't lose fingers, and the crew stays healthier over a week at sea. Compared to a cold-weather classic, morale is completely different — and morale wins offshore races.",
      "The <strong>tropical setting</strong> is genuinely unlike anywhere else in Asian offshore sailing. You're rounding an island framed by palm-lined bays, passing fishing villages with a thousand years of maritime history, and finishing back in Sanya, which — say what you want about it — is a spectacular place to bring a boat and a crew home to.",
      "And there's the <strong>cultural richness</strong>. Hainan isn't just a race venue; it's a destination. The seafood, the Li and Miao heritage, the coffee culture in Xinglong, the duty-free shopping if that's your thing — most crews stay a week either side. It's an event you enjoy, not just endure. That's rare in offshore racing.",
    ],
  },
];

const galleryImages = [
  { src: '/hero.jpg', alt: 'Fleet at the start line' },
  { src: '/carousel-2.jpg', alt: 'Yacht racing under spinnaker' },
  { src: '/carousel-3.jpg', alt: 'Sunset offshore leg' },
  { src: '/carousel-4.jpg', alt: 'Close racing action' },
];

export default function SkipperInterviewArticlePage() {
  useEffect(() => {
    document.title =
      'Skipper Interview: Veteran Sailor on Sailing Around Hainan | News';
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ============ HERO BANNER ============ */}
      <section className="relative h-[50vh] min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/carousel-3.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/50 via-primary-deep/60 to-primary-deep/90" />

        <div className="relative z-10 w-full pb-12 md:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent-gold/90 text-primary-deep rounded-full">
                  <Tag className="w-3.5 h-3.5" />
                  Interview
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/80 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  September 20, 2026
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight max-w-3xl">
                Skipper Interview: Veteran Sailor on Sailing Around Hainan
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
              Interview by RHN Editorial
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-gold" />
              <time dateTime="2026-09-20">September 20, 2026</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <Tag className="w-4 h-4 text-accent-gold" />
              Interview
            </span>
          </div>
        </div>
      </section>

      {/* ============ ARTICLE BODY ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <RevealOnScroll>
            <div className="prose prose-lg max-w-none text-primary-deep/90 mb-12">
              <p className="text-xl md:text-2xl font-display font-medium text-primary-deep leading-relaxed mb-8">
                Few sailors know these waters like{' '}
                <strong>Captain Chen Wei</strong> — veteran of eight Round
                Hainan Regattas, multiple podium finishes, and one of the most
                respected voices in Asian offshore racing.
              </p>

              <p className="text-base md:text-lg leading-relaxed mb-6">
                We sat down with Captain Chen in the days before the 2026
                edition to talk about how the race has evolved, what makes the
                toughest leg so demanding, and the advice he offers first-time
                competitors before they cross the start line in Sanya.
              </p>
            </div>
          </RevealOnScroll>

          {/* Meet the Skipper Card */}
          <RevealOnScroll>
            <div className="bg-surface-container rounded-2xl p-6 md:p-8 shadow-card mb-16 flex flex-col sm:flex-row items-start gap-6">
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-cover bg-center shrink-0"
                style={{ backgroundImage: "url('/carousel-4.jpg')" }}
                role="img"
                aria-label="Captain Chen Wei"
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Anchor className="w-4 h-4 text-accent-gold" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                    Meet the Skipper
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mb-2">
                  Captain Chen Wei
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Eight-time Round Hainan competitor. Racing offshore for more
                  than 25 years, primarily on ORC-rated 45–60 foot boats out of
                  Hong Kong, Sanya, and Qingdao. Multiple class podiums and one
                  of the most experienced ocean navigators in the Asian
                  offshore fleet.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Q & A blocks */}
          <div className="space-y-12">
            {qa.map((item, index) => (
              <RevealOnScroll key={index} delay={0.05}>
                <div>
                  {/* Question */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary-deep text-white flex items-center justify-center font-display font-bold">
                      Q
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-primary-deep leading-snug pt-1">
                      {item.q}
                    </h3>
                  </div>

                  {/* Answer */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-accent-gold text-primary-deep flex items-center justify-center font-display font-bold">
                      A
                    </div>
                    <div className="flex-1 space-y-4">
                      {item.a.map((para, i) => (
                        <p
                          key={i}
                          className="text-base md:text-lg text-primary-deep/90 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: para }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Pull Quote */}
          <RevealOnScroll>
            <blockquote className="mt-16 mb-4 relative bg-primary-deep rounded-2xl p-8 md:p-10 text-white shadow-card">
              <Quote className="absolute -top-4 -left-2 w-12 h-12 text-accent-gold" />
              <p className="text-lg md:text-2xl font-display italic leading-relaxed mb-4 pl-4">
                &ldquo;Round Hainan is a race, yes — but it&apos;s also one of
                the most beautiful passages you&apos;ll ever sail. Look up
                occasionally. You&apos;ll race better if you&apos;re actually
                present.&rdquo;
              </p>
              <footer className="text-sm font-semibold text-accent-gold not-italic pl-4">
                — Captain Chen Wei
              </footer>
            </blockquote>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ PHOTO GALLERY ============ */}
      <section className="bg-surface-container py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-3">
                <Camera className="w-4 h-4" />
                Gallery
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep">
                From the Deck
              </h2>
              <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
                A glimpse of what Captain Chen has seen from eight editions of
                offshore racing around Hainan.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <RevealOnScroll key={index} delay={index * 0.05}>
                <div className="group relative aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all duration-300 cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${img.src}')` }}
                    role="img"
                    aria-label={img.alt}
                  />
                  <div className="absolute inset-0 bg-primary-deep/0 group-hover:bg-primary-deep/40 transition-all duration-300 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BACK TO NEWS ============ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-3">
              <MessageCircle className="w-4 h-4 inline-block mr-1 -mt-0.5" />
              Keep Reading
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mb-6">
              More Stories from the Fleet
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container text-primary-deep text-sm font-semibold hover:bg-accent-gold transition-colors group"
              >
                Explore the Course
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
