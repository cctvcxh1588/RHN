'use client';

import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';
import {
  Feather,
  Palette,
  Music,
  Mountain,
  MapPin,
  CalendarDays,
  Sparkles,
  Landmark,
  ArrowLeft,
} from 'lucide-react';

export default function CulturePage() {
  const liTraits = [
    {
      icon: Palette,
      title: 'Li Brocade (黎锦)',
      desc: 'Woven on backstrap looms for more than 3,000 years, Li brocade is one of China&apos;s oldest textile arts. In 2009 UNESCO inscribed Li traditional textile techniques on the List of Intangible Cultural Heritage in Urgent Need of Safeguarding.',
    },
    {
      icon: Feather,
      title: 'Face &amp; Body Tattoos',
      desc: 'Historically, Li women received intricate hand-tapped tattoos as a rite of passage. Today the tradition is largely preserved in memory and museums — the surviving elders are living archives of a vanishing art.',
    },
    {
      icon: Music,
      title: 'Bamboo Dance (竹竿舞)',
      desc: 'A rhythmic dance in which dancers hop between clapping bamboo poles. Originally a harvest celebration, it has become one of Hainan&apos;s most iconic performing arts, taught in schools across the island.',
    },
  ];

  const miaoTraits = [
    {
      icon: Sparkles,
      title: 'Silver Artistry',
      desc: 'Miao silversmiths handcraft elaborate headdresses, collars and bracelets. A traditional Miao festival costume can carry several kilograms of silver — a wearable family fortune.',
    },
    {
      icon: Palette,
      title: 'Embroidery &amp; Batik',
      desc: 'Miao embroidery encodes migration histories and ancestral stories in geometric patterns — the fabric itself becomes a written record for a people whose language has no traditional script.',
    },
    {
      icon: Music,
      title: 'Lusheng &amp; Folk Song',
      desc: 'The lusheng (a bamboo mouth organ) and antiphonal love songs are central to Miao courtship and celebration, echoing across the mountain villages of central Hainan.',
    },
  ];

  const sites = [
    {
      name: 'Betel Nut Valley 槟榔谷',
      subtitle: 'Baoting · Indigenous Cultural Village',
      desc: 'Hainan&apos;s premier living museum of Li and Miao culture. Wander through traditional boat-shaped thatched houses, watch brocade weaving demonstrations, and see the last generation of tattooed Li grandmothers.',
    },
    {
      name: 'Wuzhi Mountain 五指山',
      subtitle: 'Sacred Peak · 1,867 m',
      desc: 'The &ldquo;Five-Finger Mountain&rdquo; is the tallest peak in Hainan and the spiritual heart of the Li people, who believe their ancestors emerged from its slopes. Rainforest hikes reveal rare orchids and endemic wildlife.',
    },
    {
      name: 'Boao Buddhist Complex 博鳌禅寺',
      subtitle: 'Qionghai · Contemporary Sanctuary',
      desc: 'Adjacent to the famous Boao Forum, this vast temple complex blends Southern Chinese and Southeast Asian Buddhist architecture, with tranquil courtyards, lotus ponds and towering golden halls.',
    },
    {
      name: 'Qilou Old Street 骑楼老街',
      subtitle: 'Haikou · Living Heritage District',
      desc: 'A kilometre of arcaded shophouses built by returning Overseas Chinese in the early 20th century. The blend of Baroque, Southeast Asian and Lingnan styles is unlike anywhere else in China.',
    },
  ];

  const festivals = [
    {
      name: 'March 3rd Festival (三月三)',
      when: '3rd day of the 3rd lunar month',
      desc: 'The most important Li festival — a joyous celebration of love, harvest and ancestry. Young people sing courtship songs, families feast on five-coloured rice, and villages host bamboo dances late into the night.',
    },
    {
      name: 'Hainan Coconut Festival',
      when: 'Late March / early April',
      desc: 'A weeklong island-wide celebration of Hainan&apos;s signature crop, featuring coconut-carving competitions, folk performances and street food fairs in Haikou and Wenchang.',
    },
    {
      name: 'Sanya International Marathon',
      when: 'February / March',
      desc: 'Not ancient, but now a beloved modern tradition — thousands of runners from around the world race along Sanya&apos;s coastline, blending sport with the city&apos;s cosmopolitan cultural life.',
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
          style={{ backgroundImage: "url('/hero.jpg')" }}
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
              Rich Heritage
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">
              Ancient Traditions of the Tropical Island
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ 2. Introduction ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
              Three Thousand Years of Living Culture
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
              An Island of Many Peoples
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="w-16 h-1 bg-accent-gold mb-10" />
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <div className="max-w-4xl space-y-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <p>
                Long before Hainan became a tropical resort destination, it was
                home to some of southern China&apos;s oldest civilisations. The
                Li people arrived from the mainland more than 3,000 years ago,
                followed centuries later by the Miao, the Hui, and finally
                waves of Han settlers, merchants and returning Overseas Chinese.
              </p>
              <p>
                The result is a cultural tapestry unlike anywhere else in China:
                boat-shaped Li houses beneath coconut groves; Miao silver
                headdresses catching the mountain sun; Southeast Asian
                arcaded shophouses lining Haikou&apos;s old streets; and
                Buddhist temples opening onto tropical seas.
              </p>
              <p>
                For visitors to the Round Hainan Regatta, exploring these
                heritage sites is a chance to see the human story behind the
                landscape — a story written in fabric, silver, song and stone.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ 3. The Li People ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 mb-12">
            <RevealOnScroll>
              <div className="lg:col-span-1">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  The First Islanders
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                  The Li People 黎族
                </h2>
                <div className="w-16 h-1 bg-accent-gold mb-6" />
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  With a population of approximately 1.5 million, the Li are
                  Hainan&apos;s oldest inhabitants — believed to have crossed
                  from the mainland during the late Neolithic. They speak a
                  Tai-Kadai language and preserve traditions unbroken for
                  millennia.
                </p>
              </div>
            </RevealOnScroll>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {liTraits.map((t, i) => {
                const Icon = t.icon;
                return (
                  <RevealOnScroll key={t.title} delay={0.15 + i * 0.1}>
                    <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-float transition-all h-full">
                      <div className="w-11 h-11 rounded-full bg-primary-deep/5 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-primary-deep" />
                      </div>
                      <h3
                        className="font-display text-lg sm:text-xl text-primary-deep mb-3 leading-snug"
                        dangerouslySetInnerHTML={{ __html: t.title }}
                      />
                      <p
                        className="text-sm text-foreground/70 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t.desc }}
                      />
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. The Miao People ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            <RevealOnScroll>
              <div className="lg:col-span-1">
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                  Mountain Communities
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                  The Miao People 苗族
                </h2>
                <div className="w-16 h-1 bg-accent-gold mb-6" />
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Hainan&apos;s Miao communities settled in the central
                  highlands during the Ming dynasty, arriving from Guangxi as
                  soldiers and later farmers. Today they preserve their
                  distinct language, dress and music in villages nestled
                  among the tropical mountains.
                </p>
              </div>
            </RevealOnScroll>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {miaoTraits.map((t, i) => {
                const Icon = t.icon;
                return (
                  <RevealOnScroll key={t.title} delay={0.15 + i * 0.1}>
                    <div className="bg-surface-container rounded-xl p-6 shadow-card hover:shadow-float transition-all h-full">
                      <div className="w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-accent-gold" />
                      </div>
                      <h3
                        className="font-display text-lg sm:text-xl text-primary-deep mb-3 leading-snug"
                        dangerouslySetInnerHTML={{ __html: t.title }}
                      />
                      <p
                        className="text-sm text-foreground/70 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t.desc }}
                      />
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. Cultural Sites ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                Cultural Sites to Visit
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                Where Heritage Lives
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto" />
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sites.map((s, i) => (
              <RevealOnScroll key={s.name} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary-deep/5 flex items-center justify-center">
                    {i === 1 ? (
                      <Mountain className="w-6 h-6 text-primary-deep" />
                    ) : i === 2 ? (
                      <Landmark className="w-6 h-6 text-primary-deep" />
                    ) : (
                      <MapPin className="w-6 h-6 text-primary-deep" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-1">
                      {s.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-accent-gold font-medium mb-3 tracking-wide">
                      {s.subtitle}
                    </p>
                    <p
                      className="text-sm sm:text-base text-foreground/70 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: s.desc }}
                    />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. Festivals ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <RevealOnScroll>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
                Festivals &amp; Celebrations
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
                A Year of Celebration
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="w-16 h-1 bg-accent-gold mx-auto" />
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {festivals.map((f, i) => (
              <RevealOnScroll key={f.name} delay={i * 0.1}>
                <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
                  <CalendarDays className="w-6 h-6 text-accent-gold mb-4" />
                  <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-2">
                    {f.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/50 uppercase tracking-wider mb-4">
                    {f.when}
                  </p>
                  <p
                    className="text-sm sm:text-base text-foreground/70 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: f.desc }}
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
              Continue Your Journey
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Culture is only one dimension of Hainan. Explore the island&apos;s
              beaches, cuisine and free-trade opportunities.
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
