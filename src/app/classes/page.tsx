'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sailboat, MapPin, Users, Trophy, Ship, Anchor, Compass, ArrowRight, CheckCircle, ClipboardList, Calendar, Flag } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { useLang } from '@/lib/LanguageProvider';

interface CmsClass {
  id: string;
  name_en: string;
  name_zh: string;
  tagline_en: string;
  tagline_zh: string;
  description_en: string;
  description_zh: string;
  features_en: string;
  features_zh: string;
  icon: 'Sailboat' | 'Ship' | 'Compass' | 'Anchor';
  color: 'primary-deep' | 'primary' | 'primary-bright' | 'accent-gold';
  sort_order: number;
}

interface ClassCard {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  colorLight: string;
  borderColor: string;
  features: string[];
  icon: typeof Sailboat;
}

const iconMap: Record<CmsClass['icon'], typeof Sailboat> = {
  Sailboat,
  Ship,
  Anchor,
  Compass,
};

const colorMap: Record<CmsClass['color'], { gradient: string; light: string; border: string }> = {
  'primary-deep': { gradient: 'from-accent-gold to-yellow-500', light: 'bg-accent-gold/10', border: 'border-accent-gold' },
  'primary': { gradient: 'from-primary to-primary-deep', light: 'bg-primary-container', border: 'border-primary' },
  'primary-bright': { gradient: 'from-primary-bright to-blue-400', light: 'bg-primary-bright/10', border: 'border-primary-bright' },
  'accent-gold': { gradient: 'from-accent-coral to-pink-500', light: 'bg-accent-coral/10', border: 'border-accent-coral' },
};

function mapCmsToClassCard(item: CmsClass): ClassCard {
  const colors = colorMap[item.color] || colorMap['primary'];
  return {
    id: item.id,
    name: item.name_en,
    tagline: item.tagline_en,
    description: item.description_en,
    color: colors.gradient,
    colorLight: colors.light,
    borderColor: colors.border,
    features: (item.features_en || '').split('|').filter(Boolean),
    icon: iconMap[item.icon] || Sailboat,
  };
}

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
  const [classes, setClasses] = useState<ClassCard[]>([]);

  useEffect(() => {
    document.title = 'Racing Classes | Round Hainan Regatta';

    fetch('/api/cms/classes')
      .then((r) => r.json())
      .then((data: { ok?: boolean; items?: CmsClass[] }) => {
        if (!data.ok || !Array.isArray(data.items)) return;
        const mapped = data.items.map(mapCmsToClassCard);
        setClasses(mapped);
      })
      .catch(() => {
        // Silently handle — page will render with empty state if fetch fails
      });
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