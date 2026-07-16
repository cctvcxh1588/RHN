'use client';

import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';
import {
  Utensils,
  Soup,
  Flame,
  Fish,
  Cherry,
  Coffee,
  MapPin,
  Award,
  ArrowLeft,
} from 'lucide-react';

export default function CuisinePage() {
  const famousDishes = [
    {
      name: 'Wenchang Chicken 文昌鸡',
      subtitle: 'Origin: Wenchang City',
      desc: 'The undisputed king of Hainan cuisine. Free-range chickens raised on banyan seeds and coconuts are gently poached in aromatic broth, then served cold with a bright ginger-scallion dipping sauce. The tender, jelly-like skin and clean flavour make this the ancestor of Hainanese Chicken Rice worldwide.',
      image: '/hainan-wenchang-chicken.jpg',
    },
    {
      name: 'Dongshan Mutton 东山羊',
      subtitle: 'Origin: Dongshan Mountain, Wanning',
      desc: 'Black mountain goats raised on wild herbs and grasses produce meat that is famously tender, aromatic and almost entirely free of the &ldquo;gamey&rdquo; taste common elsewhere. Traditionally braised with red dates or roasted whole for banquets.',
      image: '/hainan-coconut-chicken.jpg',
    },
    {
      name: 'Jiaji Duck 加积鸭',
      subtitle: 'Origin: Jiaji, Qionghai',
      desc: 'A native Hainan duck breed fattened on rice and small fish, then slow-braised or steamed. The result is rich, silky meat with a clean broth — historically served at the tables of returning Overseas Chinese merchants.',
      image: '/hainan-seafood-market.jpg',
    },
    {
      name: 'Hele Crab 和乐蟹',
      subtitle: 'Origin: Hele Town, Wanning',
      desc: 'Mangrove-dwelling mud crabs prized for their fist-sized golden roe and exceptionally sweet meat. Simply steamed and served with a vinegar-ginger dip, they are the crown jewel of a Hainan seafood banquet.',
      image: '/hainan-seafood-market.jpg',
    },
  ];

  const streetFood = [
    {
      icon: Utensils,
      title: 'Hainanese Chicken Rice 海南鸡饭',
      desc: 'The dish that travelled the world. Poached chicken over fragrant rice cooked in the chicken&apos;s stock, served with three signature sauces (ginger, chilli, dark soy). Every family in Singapore and Malaysia has an opinion on it — but Hainan is the source.',
    },
    {
      icon: Soup,
      title: 'Qingbuliang 清补凉',
      desc: 'Hainan&apos;s beloved summer dessert: chilled coconut milk (or sweet syrup) mixed with red beans, mung beans, jelly cubes, taro, watermelon, longan and more. Cooling, textural and utterly addictive on a hot island afternoon.',
    },
    {
      icon: Flame,
      title: 'Coconut Chicken Hot Pot 椰子鸡火锅',
      desc: 'Sanya&apos;s signature dining experience. Whole chicken simmered in fresh young coconut water instead of broth, producing a naturally sweet, clear soup. Add mushrooms, seafood and greens as you dine.',
    },
    {
      icon: Fish,
      title: 'Sanya Seafood BBQ 三亚海鲜烧烤',
      desc: 'The nightly ritual of Sanya. Pick your live seafood — prawns, oysters, scallops, squid — from tank-side markets and watch it grilled with garlic, vermicelli and a fiery chilli-lime dressing.',
    },
  ];

  const fruits = [
    { name: 'Mango 芒果', season: 'April – July', note: 'Sanya golden mangoes' },
    { name: 'Coconut 椰子', season: 'Year-round', note: 'Wenchang variety' },
    { name: 'Mangosteen 山竹', season: 'May – September', note: 'Purple queen of fruits' },
    { name: 'Dragon Fruit 火龙果', season: 'June – November', note: 'Red-fleshed &amp; sweet' },
    { name: 'Lychee 荔枝', season: 'May – June', note: 'Hainan is China&apos;s earliest harvest' },
    { name: 'Longan 龙眼', season: 'July – August', note: 'Sweet &amp; floral' },
    { name: 'Jackfruit 菠萝蜜', season: 'April – August', note: 'Massive &amp; fragrant' },
    { name: 'Wax Apple 莲雾', season: 'May – July', note: 'Crisp &amp; refreshing' },
  ];

  const eatSpots = [
    {
      name: 'Sanya Number 1 Market 第一市场',
      subtitle: 'Sanya · Downtown',
      desc: 'The essential Sanya food experience. Pick live seafood from dozens of vendors — grouper, prawns, mantis shrimp, abalone — then take it upstairs to a &ldquo;pick and cook&rdquo; restaurant where they&apos;ll prepare it any way you like within minutes.',
    },
    {
      name: 'Wenchang Chicken Restaurants',
      subtitle: 'Wenchang &amp; islandwide',
      desc: 'For the definitive Wenchang chicken, drive out to the town itself — or find a legacy restaurant like Longquan (龙泉) or Taobao (陶宝) in Haikou. Order the full set: cold chicken, chicken oil rice, and a bowl of the poaching broth.',
    },
    {
      name: 'Qilou Old Street Food Halls',
      subtitle: 'Haikou · Historic District',
      desc: 'The arcaded shophouses of Haikou&apos;s Qilou district hide some of Hainan&apos;s most authentic small eateries — from a bowl of Haikou-style rice noodles at dawn to late-night Hainan coffee and coconut cake.',
    },
  ];

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
          style={{ backgroundImage: "url('/hainan-wenchang-chicken.jpg')" }}
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
              Culinary Journey
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">
              Tropical Flavours of the South China Sea
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ 2. Introduction ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
              A Cuisine of Islands &amp; Oceans
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
              Fresh, Clean, Tropical
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="w-16 h-1 bg-accent-gold mb-10" />
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <div className="max-w-4xl space-y-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <p>
                Hainan cuisine is defined by three things: the tropical produce
                that grows abundantly across the island, the fresh seafood
                landed at its ports every dawn, and the layered cultural
                influences of the Li, Han, Hakka, Cantonese and Overseas
                Chinese communities who have shaped its kitchens for centuries.
              </p>
              <p>
                Unlike the fiery flavours of Sichuan or the rich sauces of
                Shanghai, Hainanese cooking is famously restrained — celebrated
                for &ldquo;letting the ingredient speak.&rdquo; A poached
                chicken, a steamed crab, a bowl of coconut broth: simplicity
                is the point, and quality is everything.
              </p>
              <p>
                And Hainan&apos;s culinary reach extends well beyond its
                shores. The single dish of Hainanese Chicken Rice has become
                one of the defining foods of Singapore, Malaysia and Thailand
                — a delicious diaspora carried across the seas by generations
                of Hainanese migrants.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ 3. Four Famous Dishes ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                海南四大名菜
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                The Four Famous Dishes
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto" />
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {famousDishes.map((d, i) => (
              <RevealOnScroll key={d.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all h-full flex flex-col">
                  <div className="relative aspect-[16/9] bg-primary-deep/10">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-7 lg:p-8 flex-1 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="shrink-0 w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center">
                        <Award className="w-5 h-5 text-accent-gold" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug">
                          {d.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground/50 uppercase tracking-wider mt-1">
                          {d.subtitle}
                        </p>
                      </div>
                    </div>
                    <p
                      className="text-sm sm:text-base text-foreground/70 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: d.desc }}
                    />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. Street Food & Signature Dishes ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                Street Food &amp; Signatures
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                What Locals Eat
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto" />
            </RevealOnScroll>
          </div>

          {/* Feature image: Coconut chicken hot pot */}
          <RevealOnScroll>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card mb-12 lg:mb-14">
              <Image
                src="/hainan-coconut-chicken.jpg"
                alt="Coconut chicken hot pot"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  Sanya Signature
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mt-2 leading-tight">
                  Coconut Chicken Hot Pot
                </h3>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {streetFood.map((s, i) => {
              const Icon = s.icon;
              return (
                <RevealOnScroll key={s.title} delay={i * 0.08}>
                  <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
                    <div className="w-12 h-12 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary-deep" />
                    </div>
                    <h3
                      className="font-display text-xl sm:text-2xl text-primary-deep mb-3 leading-snug"
                      dangerouslySetInnerHTML={{ __html: s.title }}
                    />
                    <p
                      className="text-sm sm:text-base text-foreground/70 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: s.desc }}
                    />
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 5. Tropical Fruits ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                Tropical Bounty
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                Fruits of Hainan
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto mb-6" />
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <p className="max-w-3xl mx-auto text-base sm:text-lg text-foreground/70 leading-relaxed">
                Sitting in the tropical belt, Hainan produces more than 50
                varieties of fruit — many available almost year-round. Roadside
                stalls and morning markets are the best places to try them.
              </p>
            </RevealOnScroll>
          </div>

          {/* Banner image: Tropical fruits arrangement */}
          <RevealOnScroll>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card mb-10 lg:mb-12">
              <Image
                src="/hainan-fruits.jpg"
                alt="Tropical fruits arrangement"
                fill
                className="object-cover"
              />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {fruits.map((f, i) => (
              <RevealOnScroll key={f.name} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card hover:shadow-float transition-all h-full">
                  <Cherry className="w-5 h-5 text-accent-gold mb-3" />
                  <h4 className="font-display text-base sm:text-lg text-primary-deep leading-snug mb-2">
                    {f.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">
                    {f.season}
                  </p>
                  <p
                    className="text-xs sm:text-sm text-foreground/70"
                    dangerouslySetInnerHTML={{ __html: f.note }}
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. Where to Eat ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                Where to Eat
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                Insider Food Destinations
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto" />
            </RevealOnScroll>
          </div>

          {/* Banner image: Sanya seafood market */}
          <RevealOnScroll>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card mb-12 lg:mb-14">
              <Image
                src="/hainan-seafood-market.jpg"
                alt="Sanya seafood market"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  Local Institution
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mt-2 leading-tight">
                  Sanya Seafood Market
                </h3>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {eatSpots.map((e, i) => (
              <RevealOnScroll key={e.name} delay={i * 0.1}>
                <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
                  <div className="w-11 h-11 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                    {i === 2 ? (
                      <Coffee className="w-5 h-5 text-primary-deep" />
                    ) : (
                      <MapPin className="w-5 h-5 text-primary-deep" />
                    )}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-1">
                    {e.name}
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-accent-gold font-medium mb-4 tracking-wide"
                    dangerouslySetInnerHTML={{ __html: e.subtitle }}
                  />
                  <p
                    className="text-sm sm:text-base text-foreground/70 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: e.desc }}
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. CTA ============ */}
      <section className="bg-primary-deep py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Taste the Island
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              From poached Wenchang chicken to a Sanya seafood feast — every
              meal in Hainan is an invitation.
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
