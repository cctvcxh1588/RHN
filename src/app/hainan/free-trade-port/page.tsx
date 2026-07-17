'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Spinner } from '@/components/ui/spinner';
import { useLang } from '@/lib/LanguageProvider';
import {
  ShoppingBag,
  Plane,
  Globe2,
  Briefcase,
  Anchor,
  Ship,
  Users,
  Gem,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface CmsPageItem {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  eyebrow_en: string;
  eyebrow_zh: string;
  subtitle_en: string;
  subtitle_zh: string;
  body_en: string;
  body_zh: string;
  hero_image_url: string;
}

type FetchState = 'loading' | 'success' | 'error';

export default function FreeTradePortPage() {
  const { lang } = useLang();
  const [cmsItem, setCmsItem] = useState<CmsPageItem | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('loading');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/cms/pages?slug=hainan-free-trade-port');
        const json = await res.json();
        if (!json.ok) throw new Error(json.error ?? 'API_ERROR');
        const item: CmsPageItem | undefined = json.items?.find(
          (p: CmsPageItem) => p.slug === 'hainan-free-trade-port',
        );
        if (cancelled) return;
        if (item) {
          setCmsItem(item);
          setFetchState('success');
        } else {
          // No matching CMS item found – fall back to hardcoded content
          setFetchState('error');
        }
      } catch {
        if (!cancelled) setFetchState('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Derived hero values with CMS fallback ──────────────────────────────
  const heroTitle = lang === 'zh'
    ? (cmsItem?.title_zh || cmsItem?.title_en || '海南自由贸易港')
    : (cmsItem?.title_en || 'Hainan Free Trade Port');
  const heroSubtitle = lang === 'zh'
    ? (cmsItem?.subtitle_zh || cmsItem?.subtitle_en || '亚洲最新免税目的地')
    : (cmsItem?.subtitle_en || "Asia's Newest Duty-Free Destination");

  // ── Hardcoded fallback content (used when CMS is unavailable) ──────────
  const policies = [
    {
      icon: Plane,
      title: '30-Day Visa-Free Entry',
      desc: 'Citizens from 59 countries — including the US, UK, Australia, France, Germany, Japan and Korea — enjoy 30 days visa-free travel to Hainan for tourism, business, or family visits.',
    },
    {
      icon: ShoppingBag,
      title: 'Duty-Free Quota ¥100,000',
      desc: 'Each traveller (Chinese or foreign) can purchase up to ¥100,000 (~US$14,000) of duty-free goods per person per year while in Hainan — no departure required.',
    },
    {
      icon: Globe2,
      title: 'Zero-Tariff on 1,900+ Goods',
      desc: 'Over 1,900 categories of imported goods — from raw materials to production equipment and consumer items — enter Hainan tariff-free under the FTP framework.',
    },
    {
      icon: Briefcase,
      title: 'Simplified Business Registration',
      desc: 'Companies can be registered in as little as one working day, with streamlined foreign investment approvals and reduced corporate income tax rates of 15% for encouraged industries.',
    },
  ];

  const sailingBenefits = [
    {
      icon: Ship,
      title: 'Yacht Import Made Easy',
      desc: 'Hainan offers preferential yacht import policies for international sailors, with reduced tariffs and streamlined customs clearance — a major advantage for cruisers and racing teams entering Chinese waters.',
    },
    {
      icon: Anchor,
      title: 'World-Class Marinas',
      desc: 'From Sanya Serenity Marina to Phoenix Island Marina and Visun Royal Yacht Club, Hainan hosts hundreds of berths for vessels up to 100+ metres, catering to the largest superyachts.',
    },
    {
      icon: Users,
      title: 'Crew Visa Facilitation',
      desc: 'Race organisers and marina operators can facilitate crew arrival documentation for regatta participants, making Hainan one of the most accessible offshore racing destinations in Asia.',
    },
  ];

  const shoppingHubs = [
    {
      name: 'Sanya International Duty-Free Shopping Complex',
      subtitle: 'CDF Sanya · Haitang Bay',
      desc: 'The largest duty-free complex in the world by floor area — over 120,000 m² of luxury boutiques, cosmetics halls, wines & spirits, and international brands. A must-visit even for non-shoppers.',
      tag: 'Flagship',
      image: '/sanya-duty-free.jpg',
    },
    {
      name: 'CDF Haikou International Duty Free City',
      subtitle: 'Haikou · Xiuying District',
      desc: 'Opened in 2022, this waterfront complex spans 280,000 m² and hosts over 800 global brands. Fashion, watches, jewellery, gourmet food and even cars are available under duty-free terms.',
      tag: 'Newest',
      image: '/haikou-duty-free.jpg',
    },
  ];

  const categories = [
    { icon: Gem, label: 'Luxury Goods' },
    { icon: Sparkles, label: 'Cosmetics & Skincare' },
    { icon: ShoppingBag, label: 'Fashion & Watches' },
    { icon: Globe2, label: 'Electronics' },
    { icon: Gem, label: 'Jewellery' },
    { icon: Sparkles, label: 'Wines & Spirits' },
  ];

  // ── Loading state ──────────────────────────────────────────────────────
  if (fetchState === 'loading') {
    return (
      <>
        {/* Reference note */}
        <div className="bg-surface-container border-b border-black/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-center">
            <p className="text-[11px] sm:text-xs text-foreground/50 tracking-wide">
              Reference: Cool Hainan APP &amp; official tourism resources
            </p>
          </div>
        </div>

        {/* Hero placeholder with spinner */}
        <section className="relative min-h-[360px] h-[50vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hainan-ftp-city.jpg')" }}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(145deg, rgba(0,60,126,0.78) 0%, rgba(0,0,0,0.55) 50%, rgba(0,60,126,0.7) 100%)',
            }}
          />
          <div className="relative z-[2] flex flex-col items-center gap-4">
            <Spinner className="h-10 w-10 text-accent-gold" />
            <p className="text-white/70 text-sm tracking-wide">Loading…</p>
          </div>
        </section>
      </>
    );
  }

  // ── Error / fallback state ─────────────────────────────────────────────
  if (fetchState === 'error') {
    return (
      <>
        {/* Reference note */}
        <div className="bg-surface-container border-b border-black/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-center">
            <p className="text-[11px] sm:text-xs text-foreground/50 tracking-wide">
              Reference: Cool Hainan APP &amp; official tourism resources
            </p>
          </div>
        </div>

        {/* ============ 1. Hero Banner ============ */}
        <section className="relative min-h-[360px] h-[50vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hainan-ftp-city.jpg')" }}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(145deg, rgba(0,60,126,0.78) 0%, rgba(0,0,0,0.55) 50%, rgba(0,60,126,0.7) 100%)',
            }}
          />
          <div className="relative z-[2] text-center px-4 sm:px-6">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent-gold uppercase">
                Explore Hainan
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white leading-tight mt-4 mb-4">
                {heroTitle}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">
                {heroSubtitle}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* ============ 2. Introduction ============ */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                {lang === 'zh' ? '全新全球门户' : 'A New Global Gateway'}
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                China&apos;s Boldest Economic Experiment
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mb-10" />
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <div className="max-w-4xl space-y-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
                <p>
                  Established in June 2020 with the release of the &ldquo;Master
                  Plan for the Construction of Hainan Free Trade Port,&rdquo;
                  the Hainan FTP is China&apos;s most ambitious opening-up
                  initiative since the founding of the Shenzhen Special Economic
                  Zone. The entire 35,000 km² island is being transformed into a
                  single, integrated free trade port.
                </p>
                <p>
                  By 2025, Hainan will complete the &ldquo;independent customs
                  operation&rdquo; milestone — meaning goods and capital move
                  freely across the island under a first-line-open,
                  second-line-managed system. By 2035, the island aims to become
                  the world&apos;s largest free trade port, rivalling Hong Kong,
                  Singapore and Dubai as a global hub for trade, tourism and
                  finance.
                </p>
                <p>
                  For international visitors, sailors and businesses, this means
                  unprecedented access: visa-free travel, tax-free shopping,
                  low-tariff imports and a rapidly modernising infrastructure
                  built for a truly international audience.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ============ 3. Key Policies ============ */}
        <section className="bg-surface-container py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <RevealOnScroll>
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  {lang === 'zh' ? '购物须知' : 'What You Need to Know'}
                </span>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                  {lang === 'zh' ? '关键政策一览' : 'Key Policies at a Glance'}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="w-16 h-1 bg-accent-gold mx-auto" />
              </RevealOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {policies.map((p, i) => {
                const Icon = p.icon;
                return (
                  <RevealOnScroll key={p.title} delay={i * 0.1}>
                    <div className="bg-white rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
                      <div className="w-12 h-12 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-primary-deep" />
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl text-primary-deep mb-3 leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ 4. For Sailing Visitors ============ */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card mb-12 lg:mb-16">
                <Image
                  src="/hainan-ftp-city.jpg"
                  alt="Hainan Free Trade Port skyline"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" />
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <RevealOnScroll>
                <div>
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                    {lang === 'zh' ? '帆船社区专属' : 'For the Sailing Community'}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                    {lang === 'zh' ? '为国际帆船人而建' : 'Built for International Sailors'}
                  </h2>
                  <div className="w-16 h-1 bg-accent-gold mb-8" />
                  <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6">
                    The Free Trade Port framework has been especially
                    transformative for the marine leisure industry. Hainan is
                    now positioning itself as the &ldquo;Yacht Capital of
                    Asia&rdquo; — with policies specifically tailored to help
                    international boats, crews and event organisers thrive.
                  </p>
                  <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                    Whether you are a Round Hainan Regatta competitor, an ocean
                    cruiser passing through Asia, or a superyacht owner exploring
                    the region, Hainan&apos;s FTP status makes arrival easier
                    than anywhere else in mainland China.
                  </p>
                </div>
              </RevealOnScroll>

              <div className="space-y-5">
                {sailingBenefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <RevealOnScroll key={b.title} delay={0.15 + i * 0.1}>
                      <div className="bg-surface-container rounded-xl p-6 shadow-card hover:shadow-float transition-all">
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-accent-gold" />
                          </div>
                          <div>
                            <h3 className="font-display text-lg sm:text-xl text-primary-deep mb-2">
                              {b.title}
                            </h3>
                            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                              {b.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5. Duty-Free Shopping ============ */}
        <section className="bg-surface-container py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <RevealOnScroll>
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  {lang === 'zh' ? '免税天堂' : 'Duty-Free Paradise'}
                </span>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                  Where to Shop
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="w-16 h-1 bg-accent-gold mx-auto" />
              </RevealOnScroll>
            </div>

            <RevealOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-card">
                  <Image
                    src="/hainan-duty-free.jpg"
                    alt="Sanya International Duty-Free Shopping Complex"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                    {lang === 'zh' ? '全球最大免税综合体' : 'World&apos;s Largest Duty-Free Complex'}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary-deep mt-3 mb-4 leading-tight">
                    Shop the World, Tax-Free
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                    With over 120,000 m² of retail space and hundreds of global
                    luxury brands, the Sanya International Duty-Free Shopping
                    Complex is the crown jewel of Hainan&apos;s retail revolution.
                    Visitors can enjoy up to ¥100,000 (~US$14,000) in duty-free
                    purchases per person per year — no departure required.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
              {shoppingHubs.map((s, i) => (
                <RevealOnScroll key={s.name} delay={i * 0.15}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-float transition-all h-full">
                    <div className="relative aspect-[16/9] bg-primary-deep/10">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-accent-gold text-primary-deep text-xs font-bold tracking-wider uppercase">
                        {s.tag}
                      </span>
                    </div>
                    <div className="p-7">
                      <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-1">
                        {s.name}
                      </h3>
                      <p className="text-sm text-accent-gold font-medium mb-4">
                        {s.subtitle}
                      </p>
                      <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll>
              <h3 className="font-display text-2xl sm:text-3xl text-primary-deep text-center mb-8">
                What You Can Buy
              </h3>
            </RevealOnScroll>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((c, i) => {
                const Icon = c.icon;
                return (
                  <RevealOnScroll key={c.label} delay={i * 0.06}>
                    <div className="bg-white rounded-lg p-5 text-center shadow-card hover:shadow-float transition-all">
                      <Icon className="w-6 h-6 text-accent-gold mx-auto mb-3" />
                      <p className="text-xs sm:text-sm font-medium text-foreground/80">
                        {c.label}
                      </p>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ 6. CTA ============ */}
        <section className="bg-primary-deep py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <RevealOnScroll>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
                Discover More of Hainan
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                From duty-free luxury to tropical beaches and ancient Li culture
                — Hainan is a world of experiences waiting to be explored.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <Link
                href="/#explore-hainan"
                className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 text-base font-semibold text-primary-deep bg-accent-gold hover:bg-accent-gold/90 rounded-md transition-all hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Explore Hainan
              </Link>
            </RevealOnScroll>
          </div>
        </section>
      </>
    );
  }

  // ── Success state – CMS data available ─────────────────────────────────
  return (
    <>
      {/* Reference note */}
      <div className="bg-surface-container border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-center">
          <p className="text-[11px] sm:text-xs text-foreground/50 tracking-wide">
            Reference: Cool Hainan APP &amp; official tourism resources
          </p>
        </div>
      </div>

      {/* ============ 1. Hero Banner ============ */}
      <section className="relative min-h-[360px] h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: cmsItem?.hero_image_url
              ? `url(${cmsItem.hero_image_url})`
              : "url('/hainan-ftp-city.jpg')",
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(145deg, rgba(0,60,126,0.78) 0%, rgba(0,0,0,0.55) 50%, rgba(0,60,126,0.7) 100%)',
          }}
        />
        <div className="relative z-[2] text-center px-4 sm:px-6">
          <RevealOnScroll>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent-gold uppercase">
              {cmsItem?.eyebrow_en || 'Explore Hainan'}
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white leading-tight mt-4 mb-4">
              {heroTitle}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">
              {heroSubtitle}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ 2. CMS Additional Body Content (if present) ============ */}
      {cmsItem?.body_en && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div
                className="cms-body prose prose-lg max-w-none text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: cmsItem.body_en }}
              />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ============ 3. Key Policies ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                {lang === 'zh' ? '购物须知' : 'What You Need to Know'}
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                Key Policies at a Glance
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto" />
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {policies.map((p, i) => {
              const Icon = p.icon;
              return (
                <RevealOnScroll key={p.title} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
                    <div className="w-12 h-12 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary-deep" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep mb-3 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 4. For Sailing Visitors ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card mb-12 lg:mb-16">
              <Image
                src="/hainan-ftp-city.jpg"
                alt="Hainan Free Trade Port skyline"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" />
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <RevealOnScroll>
              <div>
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  {lang === 'zh' ? '帆船社区专属' : 'For the Sailing Community'}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                  Built for International Sailors
                </h2>
                <div className="w-16 h-1 bg-accent-gold mb-8" />
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6">
                  The Free Trade Port framework has been especially
                  transformative for the marine leisure industry. Hainan is now
                  positioning itself as the &ldquo;Yacht Capital of Asia&rdquo;
                  — with policies specifically tailored to help international
                  boats, crews and event organisers thrive.
                </p>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Whether you are a Round Hainan Regatta competitor, an ocean
                  cruiser passing through Asia, or a superyacht owner exploring
                  the region, Hainan&apos;s FTP status makes arrival easier than
                  anywhere else in mainland China.
                </p>
              </div>
            </RevealOnScroll>

            <div className="space-y-5">
              {sailingBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <RevealOnScroll key={b.title} delay={0.15 + i * 0.1}>
                    <div className="bg-surface-container rounded-xl p-6 shadow-card hover:shadow-float transition-all">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent-gold" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg sm:text-xl text-primary-deep mb-2">
                            {b.title}
                          </h3>
                          <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                            {b.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. Duty-Free Shopping ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                {lang === 'zh' ? '免税天堂' : 'Duty-Free Paradise'}
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                Where to Shop
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto" />
            </RevealOnScroll>
          </div>

          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-card">
                <Image
                  src="/hainan-duty-free.jpg"
                  alt="Sanya International Duty-Free Shopping Complex"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  World&apos;s Largest Duty-Free Complex
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary-deep mt-3 mb-4 leading-tight">
                  Shop the World, Tax-Free
                </h3>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  With over 120,000 m² of retail space and hundreds of global
                  luxury brands, the Sanya International Duty-Free Shopping
                  Complex is the crown jewel of Hainan&apos;s retail revolution.
                  Visitors can enjoy up to ¥100,000 (~US$14,000) in duty-free
                  purchases per person per year — no departure required.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
            {shoppingHubs.map((s, i) => (
              <RevealOnScroll key={s.name} delay={i * 0.15}>
                <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-float transition-all h-full">
                  <div className="relative aspect-[16/9] bg-primary-deep/10">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-accent-gold text-primary-deep text-xs font-bold tracking-wider uppercase">
                      {s.tag}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-1">
                      {s.name}
                    </h3>
                    <p className="text-sm text-accent-gold font-medium mb-4">
                      {s.subtitle}
                    </p>
                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll>
            <h3 className="font-display text-2xl sm:text-3xl text-primary-deep text-center mb-8">
              What You Can Buy
            </h3>
          </RevealOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c, i) => {
              const Icon = c.icon;
              return (
                <RevealOnScroll key={c.label} delay={i * 0.06}>
                  <div className="bg-white rounded-lg p-5 text-center shadow-card hover:shadow-float transition-all">
                    <Icon className="w-6 h-6 text-accent-gold mx-auto mb-3" />
                    <p className="text-xs sm:text-sm font-medium text-foreground/80">
                      {c.label}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 6. CTA ============ */}
      <section className="bg-primary-deep py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Discover More of Hainan
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              From duty-free luxury to tropical beaches and ancient Li culture
              — Hainan is a world of experiences waiting to be explored.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <Link
              href="/#explore-hainan"
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 text-base font-semibold text-primary-deep bg-accent-gold hover:bg-accent-gold/90 rounded-md transition-all hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore Hainan
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}