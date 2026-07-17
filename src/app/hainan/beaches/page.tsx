'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';
import {
  Waves,
  Sun,
  Shell,
  Anchor,
  Wind,
  Fish,
  MapPin,
  Thermometer,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

interface CmsPage {
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

export default function BeachesPage() {
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Hardcoded fallback content
  const fallback = {
    eyebrow: 'Explore Hainan',
    title: 'Tropical Paradise',
    subtitle: '1,823 Kilometres of Pristine Coastline',
    body: null as string | null,
  };

  const beaches = [
    {
      name: 'Yalong Bay 亚龙湾',
      tag: 'The Oriental Hawaii',
      desc: 'A 7-kilometre crescent of powder-fine white sand backed by lush tropical hills. Yalong Bay boasts the clearest water in Hainan — visibility routinely exceeds 10 metres — and is home to a strip of five-star international resorts including Ritz-Carlton, St. Regis and Mandarin Oriental.',
      image: '/hainan-yalong-bay.jpg',
    },
    {
      name: 'Sanya Bay 三亚湾',
      tag: 'The City Coastline',
      desc: 'A 22-kilometre urban beach hugging downtown Sanya. Its palm-lined coconut avenue (椰梦长廊) is the city&apos;s beloved sunset promenade — locals gather here at dusk for kite-flying, tai chi and street food.',
      image: '/hero.jpg',
    },
    {
      name: 'Haitang Bay 海棠湾',
      tag: 'The Luxury Strip',
      desc: 'Home to Atlantis Sanya, the Sanya International Duty-Free Complex, and a string of ultra-luxury resorts. Haitang&apos;s beach is quieter and more upscale than Yalong, with sweeping views of Wuzhizhou Island offshore.',
      image: '/carousel-2.jpg',
    },
    {
      name: 'Dadonghai 大东海',
      tag: 'Family Friendly',
      desc: 'The most accessible beach in Sanya — a walkable 3-kilometre bay just minutes from downtown. Gentle waves, lifeguards, and a lively boardwalk of restaurants make it perfect for families and first-time visitors.',
      image: '/carousel-3.jpg',
    },
    {
      name: 'Shimei Bay 石梅湾',
      tag: 'Untouched Paradise',
      desc: 'Two hours north of Sanya in Wanning, Shimei Bay is a 6-kilometre stretch backed by China&apos;s only preserved coconut forest — a UNESCO-protected biosphere. Deserted stretches, sea turtles and the Le Méridien resort define the escape.',
      image: '/carousel-4.jpg',
    },
    {
      name: 'Riyue Bay 日月湾',
      tag: 'Surf Capital of China',
      desc: 'Also in Wanning, Riyue Bay (&ldquo;Sun-Moon Bay&rdquo;) hosts consistent year-round swells and has become the undisputed heart of Chinese surf culture, home to the Wanning Riyue Bay International Surfing Festival.',
      image: '/phoenix-sanya.jpg',
    },
  ];

  const activities = [
    {
      icon: Anchor,
      title: 'Sailing &amp; Yachting',
      desc: 'From day charters to the Round Hainan Regatta, Sanya&apos;s marinas host one of Asia&apos;s most active yacht communities. Bareboat and skippered options are widely available.',
    },
    {
      icon: Wind,
      title: 'Kite &amp; Wind Surfing',
      desc: 'The steady northeast trade winds from November through March make Sanya Bay and Houhai a favourite for kite surfers of every level.',
    },
    {
      icon: Fish,
      title: 'Diving &amp; Snorkelling',
      desc: 'Wuzhizhou Island (蜈支洲岛) offers Hainan&apos;s best coral reef diving, with over 80 species of coral, sea turtles and reef fish in warm 26 °C waters.',
    },
    {
      icon: Waves,
      title: 'Surfing',
      desc: 'Riyue Bay in Wanning is China&apos;s surf capital, with beginner-friendly beach breaks and consistent waves up to 2 metres during typhoon season.',
    },
  ];

  const marineSpots = [
    {
      name: 'Wuzhizhou Island 蜈支洲岛',
      desc: 'A 1.48 km² tropical island 30 minutes offshore from Haitang Bay, famous for its coral reefs, glass-bottom boats and turquoise water. Hainan&apos;s most iconic dive site.',
    },
    {
      name: 'Boao Yudai Beach 博鳌玉带滩',
      desc: 'A slender natural sandbar where three rivers meet the South China Sea — a Guinness-recognised wonder of geography and one of Hainan&apos;s most photogenic landscapes.',
    },
    {
      name: 'Phoenix Island 凤凰岛',
      desc: 'Sanya&apos;s landmark man-made island and cruise port, home to a world-class marina and the starting line of the Round Hainan Regatta.',
    },
  ];

  useEffect(() => {
    async function fetchCmsContent() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/cms/pages?slug=hainan-beaches');
        const json = await res.json();
        if (json.ok && Array.isArray(json.items) && json.items.length > 0) {
          setCmsData(json.items[0]);
        } else {
          // No CMS data found — fallback to hardcoded content
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCmsContent();
  }, []);

  // Determine hero content with CMS priority, fallback to hardcoded
  const heroEyebrow = cmsData?.eyebrow_en || fallback.eyebrow;
  const heroTitle = cmsData?.title_en || fallback.title;
  const heroSubtitle = cmsData?.subtitle_en || fallback.subtitle;
  const heroImage = cmsData?.hero_image_url || '/hainan-yalong-bay.jpg';
  const bodyHtml = cmsData?.body_en || null;

  // ==================== Shared: Hero Banner ====================
  const heroSection = (
    <section className="relative min-h-[360px] h-[50vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
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
            {heroEyebrow}
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
  );

  // ==================== Shared: CMS body (optional, rendered below hero) ====================
  const cmsBodySection = bodyHtml ? (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="cms-body-content"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </div>
    </section>
  ) : null;

  // ==================== Shared: Hardcoded Content Sections ====================
  const hardcodedContent = (
    <>
      {/* ============ 2. Introduction ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
              An Island of Beaches
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
              68 Bays. Endless Summer.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="w-16 h-1 bg-accent-gold mb-10" />
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <div className="max-w-4xl space-y-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <p>
                With 1,823 kilometres of coastline — more than any other Chinese
                province — Hainan is a country&apos;s worth of beaches concentrated
                into a single tropical island. Sixty-eight named bays curl around
                the coast, each with its own character: from world-famous resort
                strips to hidden fishing coves reachable only by boat.
              </p>
              <p>
                Sitting on the same latitude as Hawaii, Hainan enjoys a genuinely
                tropical climate. Average sea temperatures never drop below 22 °C,
                and the water clarity in the southern bays rivals the best of
                Southeast Asia. From November to April the trade winds turn the
                island into one of Asia&apos;s premier destinations for sailing,
                kite surfing and offshore racing.
              </p>
              <p>
                Whether you seek luxury resorts, quiet coconut-lined shores or
                world-class dive sites, Hainan&apos;s coastline offers a bay for
                every kind of traveller.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ 3. Top Beaches ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                Top Beach Destinations
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                Six Bays to Know
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto" />
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {beaches.map((b, i) => (
              <RevealOnScroll key={b.name} delay={i * 0.08}>
                <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-float transition-all h-full flex flex-col">
                  <div className="relative aspect-[16/10] bg-primary-deep/10">
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full bg-accent-gold text-primary-deep text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                      {b.tag}
                    </span>
                  </div>
                  <div className="p-6 lg:p-7 flex-1 flex flex-col">
                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-3">
                      {b.name}
                    </h3>
                    <p
                      className="text-sm sm:text-base text-foreground/70 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: b.desc }}
                    />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. Marine Activities ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <RevealOnScroll>
              <div>
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  Marine Activities
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                  Life on &amp; Under the Water
                </h2>
                <div className="w-16 h-1 bg-accent-gold mb-8" />
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Hainan&apos;s combination of warm seas, steady winds and
                  world-class marine infrastructure has made it China&apos;s
                  undisputed capital of ocean sports. From the racing fleets
                  of the Round Hainan Regatta to family snorkelling trips off
                  Wuzhizhou Island, every level of water enthusiast is
                  catered for.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {activities.map((a, i) => {
                const Icon = a.icon;
                return (
                  <RevealOnScroll key={a.title} delay={0.15 + i * 0.08}>
                    <div className="bg-surface-container rounded-xl p-6 shadow-card hover:shadow-float transition-all h-full">
                      <Icon className="w-6 h-6 text-accent-gold mb-4" />
                      <h3
                        className="font-display text-lg sm:text-xl text-primary-deep mb-2 leading-snug"
                        dangerouslySetInnerHTML={{ __html: a.title }}
                      />
                      <p
                        className="text-sm text-foreground/70 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: a.desc }}
                      />
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>

          {/* Feature image: Wuzhizhou Island diving */}
          <RevealOnScroll>
            <div className="mt-16 relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card">
              <Image
                src="/hainan-diving.jpg"
                alt="Wuzhizhou Island diving"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  Wuzhizhou Island
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mt-2 leading-tight">
                  Hainan&apos;s Underwater Playground
                </h3>
              </div>
            </div>
          </RevealOnScroll>

          {/* Highlighted spots */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {marineSpots.map((s, i) => (
              <RevealOnScroll key={s.name} delay={i * 0.1}>
                <div className="bg-primary-deep/[0.03] border border-primary-deep/10 rounded-xl p-6 lg:p-7 hover:shadow-float transition-all h-full">
                  <MapPin className="w-5 h-5 text-primary-deep mb-3" />
                  <h4 className="font-display text-lg sm:text-xl text-primary-deep leading-snug mb-2">
                    {s.name}
                  </h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. Best Time to Visit ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                Plan Your Trip
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                Best Time to Visit
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto" />
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <RevealOnScroll>
              <div className="bg-white rounded-xl p-7 lg:p-9 shadow-card hover:shadow-float transition-all h-full">
                <div className="flex items-center gap-3 mb-5">
                  <Sun className="w-7 h-7 text-accent-gold" />
                  <h3 className="font-display text-2xl text-primary-deep">
                    October – April
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4">
                  Hainan&apos;s peak season. Dry, sunny weather with daytime
                  highs of 22–28 °C and cool nights. Perfect conditions for
                  sailing, beach days and long-distance racing. The Round Hainan
                  Regatta takes place in this window.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary-deep/70">
                  <Thermometer className="w-4 h-4" />
                  <span className="font-medium tracking-wide">
                    Avg. sea temp: 24–26 °C
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="bg-white rounded-xl p-7 lg:p-9 shadow-card hover:shadow-float transition-all h-full">
                <div className="flex items-center gap-3 mb-5">
                  <Shell className="w-7 h-7 text-accent-gold" />
                  <h3 className="font-display text-2xl text-primary-deep">
                    May – September
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4">
                  Hot and humid with occasional typhoons. Temperatures climb to
                  32 °C, rainfall increases and afternoon storms are common —
                  but the surf is at its best, resort prices drop, and the
                  landscape is at its greenest.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary-deep/70">
                  <Thermometer className="w-4 h-4" />
                  <span className="font-medium tracking-wide">
                    Avg. sea temp: 28–30 °C
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ 6. CTA ============ */}
      <section className="bg-primary-deep py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Find Your Bay
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              From Yalong&apos;s luxury sands to Riyue&apos;s surf line — start
              planning your Hainan coastal journey.
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

  // ==================== Loading state ====================
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <Loader2 className="w-10 h-10 text-accent-gold animate-spin" />
        <p className="text-sm text-foreground/50 tracking-wide">Loading beaches...</p>
      </div>
    );
  }

  // ==================== Render: always show full hardcoded content ====================
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

      {/* Hero Banner — CMS data if available, fallback to hardcoded */}
      {heroSection}

      {/* CMS body_en rendered as an additional section below hero if present */}
      {cmsBodySection}

      {/* Full hardcoded content ALWAYS rendered */}
      {hardcodedContent}
    </>
  );
}