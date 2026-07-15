'use client';

import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function AboutPage() {
  const stats = [
    { number: '15', suffix: '', label: 'Editions' },
    { number: '680', suffix: '', label: 'Nautical Miles' },
    { number: '8', suffix: '', label: 'Days of Racing' },
  ];

  return (
    <>
      {/* ============ 1. Hero Banner ============ */}
      <section className="relative min-h-[400px] h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        {/* Dark Overlay with Subtle Gradient */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(145deg, rgba(0,60,126,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,60,126,0.65) 100%)',
          }}
        />
        {/* Content */}
        <div className="relative z-[2] text-center px-4 sm:px-6">
          <RevealOnScroll>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-4">
              The Race
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">
              680 Miles of World-Class Offshore Racing
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ 2. The Story Section ============ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <RevealOnScroll>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
              The Story
            </span>
          </RevealOnScroll>

          {/* Title */}
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-3 mb-4 leading-tight">
              A Legacy on the Water
            </h2>
          </RevealOnScroll>

          {/* Gold Decorative Line */}
          <RevealOnScroll delay={0.2}>
            <div className="w-16 h-1 bg-accent-gold mb-10" />
          </RevealOnScroll>

          {/* Story Content */}
          <RevealOnScroll delay={0.3}>
            <div className="max-w-4xl space-y-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <p>
                Since its founding in 2011, the Round Hainan Regatta has grown
                into one of Asia&apos;s premier offshore sailing events, attracting
                world-class sailors and competitive fleets from across the globe.
              </p>
              <p>
                The 15th edition in 2026 promises to be the most competitive yet,
                with an expanded fleet of international competitors. The race
                circumnavigates Hainan Island — China&apos;s southernmost tropical
                paradise — covering approximately 680 nautical miles of
                challenging ocean racing.
              </p>
              <p>
                The regatta is not merely a competition; it is a celebration of
                maritime heritage, seamanship, and the spirit of adventure. From
                the strategic challenges of the Qiongzhou Strait to the tactical
                inshore courses off Sanya&apos;s coastline, every mile demands skill,
                strategy, and endurance.
              </p>
              <p>
                The Round Hainan Regatta has been instrumental in developing
                China&apos;s offshore sailing culture, providing a platform for
                Chinese sailors to compete on an international stage while
                introducing the world to the breathtaking beauty of Hainan&apos;s
                coastline.
              </p>
              <p>
                As the race enters its 15th edition, it continues to honor its
                founding mission: to promote international sailing exchange,
                foster the sport of ocean racing in China, and showcase Hainan as
                a world-class destination for marine sports.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ 3. Key Stats Section ============ */}
      <section className="bg-surface-container py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16">
            {stats.map((stat, index) => (
              <RevealOnScroll key={stat.label} delay={index * 0.15}>
                <div className="text-center">
                  <span className="block font-display text-5xl sm:text-6xl lg:text-7xl text-primary leading-none">
                    {stat.number}
                    {stat.suffix}
                  </span>
                  <span className="block mt-3 text-sm sm:text-base text-foreground/60 uppercase tracking-[0.15em] font-medium">
                    {stat.label}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. The Vision Section ============ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Column */}
            <RevealOnScroll>
              <div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                  The Vision
                </h2>
                <div className="w-16 h-1 bg-accent-gold mb-8" />
                <div className="space-y-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
                  <p>
                    The Round Hainan Regatta envisions a future where the waters
                    of the South China Sea become a global stage for offshore
                    sailing excellence. We believe in the power of sport to
                    transcend borders, build bridges between cultures, and
                    inspire the next generation of seafarers.
                  </p>
                  <p>
                    Our mission is to establish Hainan as a premier destination
                    for international sailing, fostering a vibrant maritime
                    community that honors the rich nautical heritage of the
                    region while embracing innovation and world-class competition.
                  </p>
                  <p>
                    Through the regatta, we aim to promote environmental
                    stewardship of our oceans, support the development of
                    Chinese sailing talent, and create an enduring legacy that
                    extends far beyond the race course.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Image Column */}
            <RevealOnScroll delay={0.2}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-card">
                <Image
                  src="/phoenix-sanya.jpg"
                  alt="Phoenix Island, Sanya — home of the Round Hainan Regatta"
                  fill
                  className="object-cover"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ 5. CTA Section ============ */}
      <section className="bg-primary-deep py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Join the 15th Edition
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Be part of Asia&apos;s premier offshore sailing event. Register your
              interest today and secure your place on the starting line.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 text-base font-semibold text-primary-deep bg-accent-gold hover:bg-accent-gold/90 rounded-md transition-all hover:scale-105 shadow-lg"
            >
              Register Interest
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}