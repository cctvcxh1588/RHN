'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sailboat, MapPin, Users, Trophy, Ship, Anchor, Compass, ArrowRight, CheckCircle, ClipboardList, Calendar, Flag } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { useLang } from '@/lib/LanguageProvider';

const classes = [
  {
    id: 'dubois-50',
    name: 'Dubois 50 Class',
    tagline: 'One-design class',
    description:
      'The Dubois 50 is a 50-ft performance cruiser designed for competitive one-design racing. With identical boats, victory comes down to pure sailing skill, crew coordination, and tactical decision-making.',
    color: 'from-accent-gold to-yellow-500',
    colorLight: 'bg-accent-gold/10',
    borderColor: 'border-accent-gold',
    features: [
      'One-design competition — identical boats',
      'Strict measurement rules',
      'Professional crew required',
    ],
    icon: Sailboat,
  },
  {
    id: 'orc-full',
    name: 'ORC Full Round Class',
    tagline: 'Full circumnavigation — 680 NM',
    description:
      'The premier offshore class using the ORC rating system. Competitors tackle the full 680-nautical-mile circumnavigation of Hainan Island, testing endurance and strategy.',
    color: 'from-primary to-primary-deep',
    colorLight: 'bg-primary-container',
    borderColor: 'border-primary',
    features: [
      'ORC certificate required',
      'Full offshore crew',
      'Competitive rating system',
    ],
    icon: Ship,
  },
  {
    id: 'orc-half',
    name: 'ORC Half Round Class',
    tagline: 'Half circumnavigation',
    description:
      'A shorter but no less competitive course using the ORC rating system. Ideal for regional teams and those new to the Round Hainan experience.',
    color: 'from-primary-bright to-blue-400',
    colorLight: 'bg-primary-bright/10',
    borderColor: 'border-primary-bright',
    features: [
      'ORC certificate required',
      'Shorter offshore course',
      'Ideal for regional teams',
    ],
    icon: Compass,
  },
  {
    id: 'fareast-28r',
    name: 'Fareast 28R Class',
    tagline: 'One-design sports boat',
    description:
      'High-performance inshore racing in the exciting Fareast 28R sports boat. Perfect for Corinthian crews seeking thrilling, close-quarters competition.',
    color: 'from-accent-coral to-pink-500',
    colorLight: 'bg-accent-coral/10',
    borderColor: 'border-accent-coral',
    features: [
      'High-performance sports boat',
      'Ideal for Corinthian crews',
      'Exciting inshore racing',
    ],
    icon: Anchor,
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: 'Submit Application',
    description:
      'Complete the online entry form with your vessel details, crew information, and chosen class.',
  },
  {
    icon: Calendar,
    title: 'Registration Confirmed',
    description:
      'Receive your official entry confirmation and class assignment from the Race Committee.',
  },
  {
    icon: Flag,
    title: 'Measurement & Certification',
    description:
      'Submit required certificates (ORC, safety equipment) and undergo measurement verification.',
  },
  {
    icon: Trophy,
    title: 'Race Ready',
    description:
      'Attend the mandatory skipper briefing, collect your race pack, and prepare for the start.',
  },
];

export default function ClassesPage() {
  const { t } = useLang();
  useEffect(() => {
    document.title = 'Racing Classes | Round Hainan Regatta';
  }, []);

  return (
    <div className="min-h-screen">
      {/* ============ HERO BANNER ============ */}
      <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/60 via-primary-deep/40 to-primary-deep/70" />
        {/* Bottom vignette */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,60,126,0.6) 100%)',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-4">
              {t('classes', 'heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {t('classes', 'heroSub')}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ CLASSES OVERVIEW ============ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-4">
                {t('classes', 'cardsEyebrow')}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-deep mb-4">
                {t('classes', 'cardsTitle')}
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Whether you&apos;re a seasoned offshore veteran or a passionate
                Corinthian crew, there&apos;s a class designed for you. Each class
                offers a unique racing experience around the stunning coastline of
                Hainan Island.
              </p>
            </div>
          </RevealOnScroll>

          {/* 2x2 Grid of Class Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classes.map((cls, index) => {
              const Icon = cls.icon;
              return (
                <RevealOnScroll key={cls.id} delay={index * 0.1}>
                  <div
                    className={`group relative bg-white rounded-2xl shadow-card hover:shadow-float transition-all duration-300 overflow-hidden ${cls.borderColor} border-t-4`}
                  >
                    {/* Inner accent bar */}
                    <div
                      className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${cls.color} opacity-80`}
                    />

                    <div className="p-8 pl-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${cls.colorLight}`}
                          >
                            <Icon
                              className={`w-6 h-6 bg-gradient-to-b ${cls.color} bg-clip-text text-transparent`}
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-primary-deep">
                              {cls.name}
                            </h3>
                            <span className="text-xs font-medium text-accent-gold uppercase tracking-wider">
                              {cls.tagline}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {cls.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3 mb-6">
                        {cls.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Learn More Link */}
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-bright transition-colors group/link"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ ENTRY PROCESS ============ */}
      <section className="bg-surface-container py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-4">
                How to Enter
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-deep mb-4">
                Entry Process
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Follow these simple steps to enter the Round Hainan Regatta.
                Our team is here to guide you through every stage of the
                registration process.
              </p>
            </div>
          </RevealOnScroll>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <RevealOnScroll key={step.title} delay={index * 0.1}>
                  <div className="relative bg-white rounded-2xl shadow-card p-8 text-center group hover:shadow-float transition-all duration-300">
                    {/* Step Number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent-gold text-primary-deep text-sm font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-5 group-hover:bg-accent-gold/20 transition-colors">
                      <StepIcon className="w-8 h-8 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-primary-deep mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* CTA */}
          <RevealOnScroll delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-gold text-primary-deep font-semibold rounded-lg hover:bg-accent-gold/90 transition-all hover:scale-105 shadow-md"
              >
                Register Your Interest
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}