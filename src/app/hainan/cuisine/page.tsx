'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';
import { useLang } from '@/lib/LanguageProvider';
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

// ── Hardcoded hero fallback ──────────────────────────────────
const fallbackTitle = { en: 'Culinary Journey', zh: '美食之旅' };
const fallbackSubtitle = { en: 'Tropical Flavours of the South China Sea', zh: '南海热带风味' };
const fallbackEyebrow = { en: 'Explore Hainan', zh: '探索海南' };

export default function CuisinePage() {
  const { lang } = useLang();
  const [cmsData, setCmsData] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchCms() {
      try {
        const res = await fetch('/api/cms/pages?slug=hainan-cuisine');
        const json = await res.json();
        if (!cancelled) {
          if (json.ok && json.items && json.items.length > 0) {
            setCmsData(json.items[0]);
          } else {
            setError(true);
          }
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchCms();
    return () => { cancelled = true; };
  }, []);

  // ── Determine hero content ──────────────────────────────────
  const heroTitle = lang === 'zh' ? (cmsData?.title_zh || fallbackTitle.zh) : (cmsData?.title_en || fallbackTitle.en);
  const heroSubtitle = lang === 'zh' ? (cmsData?.subtitle_zh || fallbackSubtitle.zh) : (cmsData?.subtitle_en || fallbackSubtitle.en);
  const heroEyebrow = lang === 'zh' ? (cmsData?.eyebrow_zh || fallbackEyebrow.zh) : (cmsData?.eyebrow_en || fallbackEyebrow.en);
  const cmsBody = lang === 'zh' ? (cmsData?.body_zh || null) : (cmsData?.body_en || null);

  // ── Loading state ───────────────────────────────────────────
  if (loading) {
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

        {/* Loading spinner */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-accent-gold animate-spin" />
            <p className="text-sm text-foreground/60 tracking-wide">Loading Hainan cuisine...</p>
          </div>
        </div>

        {/* ============ CTA ============ */}
        <section className="bg-primary-deep py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Taste the Island
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              From poached Wenchang chicken to a Sanya seafood feast — every
              meal in Hainan is an invitation.
            </p>
            <Link
              href="/#explore-hainan"
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 text-base font-semibold text-primary-deep bg-accent-gold hover:bg-accent-gold/90 rounded-md transition-all hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore Hainan
            </Link>
          </div>
        </section>
      </>
    );
  }

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

      {/* ============ CMS Body (additional section below hero, if present) ============ */}
      {cmsBody && (
        <section className="bg-white py-12 md:py-16 border-b border-black/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="prose prose-lg max-w-4xl mx-auto text-foreground/80"
              dangerouslySetInnerHTML={{ __html: cmsBody }}
            />
          </div>
        </section>
      )}

      {/* ============ 2. Introduction ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
              {lang === 'zh' ? '海岛与海洋的美食' : 'A Cuisine of Islands & Oceans'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
              {lang === 'zh' ? '新鲜、纯净、热带' : 'Fresh, Clean, Tropical'}
            </h2>
            <div className="w-16 h-1 bg-accent-gold mb-10"></div>
          </div>
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
        </div>
      </section>

      {/* ============ 3. Four Famous Dishes ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">
              {lang === 'zh' ? '海南四大名菜' : 'The Four Famous Dishes'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">
              {lang === 'zh' ? '四大名菜' : 'The Four Famous Dishes'}
            </h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Famous Dish 1: Wenchang Chicken */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all h-full flex flex-col">
              <div className="relative aspect-[16/9] bg-primary-deep/10">
                <img src="/hainan-wenchang-chicken.jpg" alt="Wenchang Chicken 文昌鸡" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
              <div className="p-7 lg:p-8 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20.94 11 20.94 11 20.94 11"/><path d="M7 7h.01M7 3h.01M11 7h.01M11 3h.01M15 7h.01M15 3h.01M19 7h.01M19 3h.01M3 7h.01M3 3h.01"/><rect x="2" y="11" width="20" height="11" rx="2"/><path d="M7 11v4"/><path d="M17 11v4"/></svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug">Wenchang Chicken 文昌鸡</h3>
                    <p className="text-xs sm:text-sm text-foreground/50 uppercase tracking-wider mt-1">Origin: Wenchang City</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">The undisputed king of Hainan cuisine. Free-range chickens raised on banyan seeds and coconuts are gently poached in aromatic broth, then served cold with a bright ginger-scallion dipping sauce. The tender, jelly-like skin and clean flavour make this the ancestor of Hainanese Chicken Rice worldwide.</p>
              </div>
            </div>

            {/* Famous Dish 2: Dongshan Mutton */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all h-full flex flex-col">
              <div className="relative aspect-[16/9] bg-primary-deep/10">
                <img src="/hainan-dongshan-goat.png" alt="Dongshan Mutton 东山羊" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
              <div className="p-7 lg:p-8 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20.94 11 20.94 11 20.94 11"/><path d="M7 7h.01M7 3h.01M11 7h.01M11 3h.01M15 7h.01M15 3h.01M19 7h.01M19 3h.01M3 7h.01M3 3h.01"/><rect x="2" y="11" width="20" height="11" rx="2"/><path d="M7 11v4"/><path d="M17 11v4"/></svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug">Dongshan Mutton 东山羊</h3>
                    <p className="text-xs sm:text-sm text-foreground/50 uppercase tracking-wider mt-1">Origin: Dongshan Mountain, Wanning</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">Black mountain goats raised on wild herbs and grasses produce meat that is famously tender, aromatic and almost entirely free of the &ldquo;gamey&rdquo; taste common elsewhere. Traditionally braised with red dates or roasted whole for banquets.</p>
              </div>
            </div>

            {/* Famous Dish 3: Jiaji Duck */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all h-full flex flex-col">
              <div className="relative aspect-[16/9] bg-primary-deep/10">
                <img src="/hainan-jiaji-duck.png" alt="Jiaji Duck 加积鸭" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
              <div className="p-7 lg:p-8 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20.94 11 20.94 11 20.94 11"/><path d="M7 7h.01M7 3h.01M11 7h.01M11 3h.01M15 7h.01M15 3h.01M19 7h.01M19 3h.01M3 7h.01M3 3h.01"/><rect x="2" y="11" width="20" height="11" rx="2"/><path d="M7 11v4"/><path d="M17 11v4"/></svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug">Jiaji Duck 加积鸭</h3>
                    <p className="text-xs sm:text-sm text-foreground/50 uppercase tracking-wider mt-1">Origin: Jiaji, Qionghai</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">A native Hainan duck breed fattened on rice and small fish, then slow-braised or steamed. The result is rich, silky meat with a clean broth — historically served at the tables of returning Overseas Chinese merchants.</p>
              </div>
            </div>

            {/* Famous Dish 4: Hele Crab */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all h-full flex flex-col">
              <div className="relative aspect-[16/9] bg-primary-deep/10">
                <img src="/hainan-hele-crab.jpg" alt="Hele Crab 和乐蟹" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
              <div className="p-7 lg:p-8 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20.94 11 20.94 11 20.94 11"/><path d="M7 7h.01M7 3h.01M11 7h.01M11 3h.01M15 7h.01M15 3h.01M19 7h.01M19 3h.01M3 7h.01M3 3h.01"/><rect x="2" y="11" width="20" height="11" rx="2"/><path d="M7 11v4"/><path d="M17 11v4"/></svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug">Hele Crab 和乐蟹</h3>
                    <p className="text-xs sm:text-sm text-foreground/50 uppercase tracking-wider mt-1">Origin: Hele Town, Wanning</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">Mangrove-dwelling mud crabs prized for their fist-sized golden roe and exceptionally sweet meat. Simply steamed and served with a vinegar-ginger dip, they are the crown jewel of a Hainan seafood banquet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. Street Food & Signature Dishes ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '街头美食与特色菜' : 'Street Food & Signatures'}</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '本地人吃什么' : 'What Locals Eat'}</h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto"></div>
          </div>

          {/* Feature image */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card mb-12 lg:mb-14">
            <img src="/hainan-coconut-chicken.png" alt="Coconut chicken hot pot" style={{width:'100%',height:'100%',objectFit:'cover'}} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '三亚特色' : 'Sanya Signature'}</span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mt-2 leading-tight">{lang === 'zh' ? '椰子鸡火锅' : 'Coconut Chicken Hot Pot'}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Street Food 1: Hainanese Chicken Rice */}
            <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
              <div className="w-12 h-12 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-primary-deep mb-3 leading-snug">Hainanese Chicken Rice 海南鸡饭</h3>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">The dish that travelled the world. Poached chicken over fragrant rice cooked in the chicken&apos;s stock, served with three signature sauces (ginger, chilli, dark soy). Every family in Singapore and Malaysia has an opinion on it — but Hainan is the source.</p>
            </div>

            {/* Street Food 2: Qingbuliang */}
            <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
              <div className="w-12 h-12 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-primary-deep mb-3 leading-snug">Qingbuliang 清补凉</h3>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">Hainan&apos;s beloved summer dessert: chilled coconut milk (or sweet syrup) mixed with red beans, mung beans, jelly cubes, taro, watermelon, longan and more. Cooling, textural and utterly addictive on a hot island afternoon.</p>
            </div>

            {/* Street Food 3: Coconut Chicken Hot Pot */}
            <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
              <div className="w-12 h-12 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-1.136-2.5-3.5-2.5-3.5S6.5 7.5 5.5 9c-.5.5 0 1.5 0 2.5a2.5 2.5 0 0 0 3 3z"/><path d="M12 19c1.5 0 3-1 3-3 .5-1 0-2 0-3.5 0-1.5-1.5-4-1.5-4S12 10 12 12c0 1.5 0 3.5 0 3.5 0 1.5 0 3.5 0 3.5z"/></svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-primary-deep mb-3 leading-snug">Coconut Chicken Hot Pot 椰子鸡火锅</h3>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">Sanya&apos;s signature dining experience. Whole chicken simmered in fresh young coconut water instead of broth, producing a naturally sweet, clear soup. Add mushrooms, seafood and greens as you dine.</p>
            </div>

            {/* Street Food 4: Sanya Seafood BBQ */}
            <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
              <div className="w-12 h-12 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8c0 3.5-3 6-6 6s-6-2.5-6-6 3-6 6-6 6 2.5 6 6z"/><path d="M18 8c0 1.5-.5 3-1 4"/><path d="M6 8c0-1.5.5-3 1-4"/></svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-primary-deep mb-3 leading-snug">Sanya Seafood BBQ 三亚海鲜烧烤</h3>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">The nightly ritual of Sanya. Pick your live seafood — prawns, oysters, scallops, squid — from tank-side markets and watch it grilled with garlic, vermicelli and a fiery chilli-lime dressing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. Tropical Fruits ============ */}
      <section className="bg-surface-container py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '热带馈赠' : 'Tropical Bounty'}</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '海南水果' : 'Fruits of Hainan'}</h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-foreground/70 leading-relaxed">{lang === 'zh' ? '海南地处热带，盛产50多种水果，许多几乎全年可供应。路边摊和早市是品尝的最佳去处。' : 'Sitting in the tropical belt, Hainan produces more than 50 varieties of fruit — many available almost year-round. Roadside stalls and morning markets are the best places to try them.'}</p>
          </div>

          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card mb-10 lg:mb-12">
            <img src="/hainan-fruits.jpg" alt="Tropical fruits arrangement" style={{width:'100%',height:'100%',objectFit:'cover'}} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {/* Fruit 1: Mango */}
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card hover:shadow-float transition-all h-full">
              <svg className="w-5 h-5 text-accent-gold mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c-4.97 0-9-4.03-9-9 0-2.39 1.14-4.49 2.39-6.29C6.57 4.87 8 2 12 2s5.43 2.87 6.61 4.71C19.86 8.51 21 10.61 21 13c0 4.97-4.03 9-9 9z"/></svg>
              <h4 className="font-display text-base sm:text-lg text-primary-deep leading-snug mb-2">{lang === 'zh' ? '芒果' : 'Mango'} 芒果</h4>
              <p className="text-[11px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">{lang === 'zh' ? '4月 – 7月' : 'April – July'}</p>
              <p className="text-xs sm:text-sm text-foreground/70">{lang === 'zh' ? '三亚金芒' : 'Sanya golden mangoes'}</p>
            </div>

            {/* Fruit 2: Coconut */}
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card hover:shadow-float transition-all h-full">
              <svg className="w-5 h-5 text-accent-gold mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c-4.97 0-9-4.03-9-9 0-2.39 1.14-4.49 2.39-6.29C6.57 4.87 8 2 12 2s5.43 2.87 6.61 4.71C19.86 8.51 21 10.61 21 13c0 4.97-4.03 9-9 9z"/></svg>
              <h4 className="font-display text-base sm:text-lg text-primary-deep leading-snug mb-2">{lang === 'zh' ? '椰子' : 'Coconut'} 椰子</h4>
              <p className="text-[11px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">{lang === 'zh' ? '全年' : 'Year-round'}</p>
              <p className="text-xs sm:text-sm text-foreground/70">{lang === 'zh' ? '文昌品种' : 'Wenchang variety'}</p>
            </div>

            {/* Fruit 3: Mangosteen */}
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card hover:shadow-float transition-all h-full">
              <svg className="w-5 h-5 text-accent-gold mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c-4.97 0-9-4.03-9-9 0-2.39 1.14-4.49 2.39-6.29C6.57 4.87 8 2 12 2s5.43 2.87 6.61 4.71C19.86 8.51 21 10.61 21 13c0 4.97-4.03 9-9 9z"/></svg>
              <h4 className="font-display text-base sm:text-lg text-primary-deep leading-snug mb-2">{lang === 'zh' ? '山竹' : 'Mangosteen'} 山竹</h4>
              <p className="text-[11px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">{lang === 'zh' ? '5月 – 9月' : 'May – September'}</p>
              <p className="text-xs sm:text-sm text-foreground/70">{lang === 'zh' ? '紫色水果皇后' : 'Purple queen of fruits'}</p>
            </div>

            {/* Fruit 4: Dragon Fruit */}
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card hover:shadow-float transition-all h-full">
              <svg className="w-5 h-5 text-accent-gold mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c-4.97 0-9-4.03-9-9 0-2.39 1.14-4.49 2.39-6.29C6.57 4.87 8 2 12 2s5.43 2.87 6.61 4.71C19.86 8.51 21 10.61 21 13c0 4.97-4.03 9-9 9z"/></svg>
              <h4 className="font-display text-base sm:text-lg text-primary-deep leading-snug mb-2">{lang === 'zh' ? '火龙果' : 'Dragon Fruit'} 火龙果</h4>
              <p className="text-[11px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">{lang === 'zh' ? '6月 – 11月' : 'June – November'}</p>
              <p className="text-xs sm:text-sm text-foreground/70">{lang === 'zh' ? '红心 & 甜' : 'Red-fleshed & sweet'}</p>
            </div>

            {/* Fruit 5: Lychee */}
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card hover:shadow-float transition-all h-full">
              <svg className="w-5 h-5 text-accent-gold mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c-4.97 0-9-4.03-9-9 0-2.39 1.14-4.49 2.39-6.29C6.57 4.87 8 2 12 2s5.43 2.87 6.61 4.71C19.86 8.51 21 10.61 21 13c0 4.97-4.03 9-9 9z"/></svg>
              <h4 className="font-display text-base sm:text-lg text-primary-deep leading-snug mb-2">{lang === 'zh' ? '荔枝' : 'Lychee'} 荔枝</h4>
              <p className="text-[11px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">{lang === 'zh' ? '5月 – 6月' : 'May – June'}</p>
              <p className="text-xs sm:text-sm text-foreground/70">{lang === 'zh' ? '海南是中国最早收获' : 'Hainan is China\'s earliest harvest'}</p>
            </div>

            {/* Fruit 6: Longan */}
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card hover:shadow-float transition-all h-full">
              <svg className="w-5 h-5 text-accent-gold mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c-4.97 0-9-4.03-9-9 0-2.39 1.14-4.49 2.39-6.29C6.57 4.87 8 2 12 2s5.43 2.87 6.61 4.71C19.86 8.51 21 10.61 21 13c0 4.97-4.03 9-9 9z"/></svg>
              <h4 className="font-display text-base sm:text-lg text-primary-deep leading-snug mb-2">{lang === 'zh' ? '龙眼' : 'Longan'} 龙眼</h4>
              <p className="text-[11px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">{lang === 'zh' ? '7月 – 8月' : 'July – August'}</p>
              <p className="text-xs sm:text-sm text-foreground/70">{lang === 'zh' ? '甜 & 花香' : 'Sweet & floral'}</p>
            </div>

            {/* Fruit 7: Jackfruit */}
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card hover:shadow-float transition-all h-full">
              <svg className="w-5 h-5 text-accent-gold mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c-4.97 0-9-4.03-9-9 0-2.39 1.14-4.49 2.39-6.29C6.57 4.87 8 2 12 2s5.43 2.87 6.61 4.71C19.86 8.51 21 10.61 21 13c0 4.97-4.03 9-9 9z"/></svg>
              <h4 className="font-display text-base sm:text-lg text-primary-deep leading-snug mb-2">{lang === 'zh' ? '菠萝蜜' : 'Jackfruit'} 菠萝蜜</h4>
              <p className="text-[11px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">{lang === 'zh' ? '4月 – 8月' : 'April – August'}</p>
              <p className="text-xs sm:text-sm text-foreground/70">{lang === 'zh' ? '大 & 香' : 'Massive & fragrant'}</p>
            </div>

            {/* Fruit 8: Wax Apple */}
            <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card hover:shadow-float transition-all h-full">
              <svg className="w-5 h-5 text-accent-gold mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c-4.97 0-9-4.03-9-9 0-2.39 1.14-4.49 2.39-6.29C6.57 4.87 8 2 12 2s5.43 2.87 6.61 4.71C19.86 8.51 21 10.61 21 13c0 4.97-4.03 9-9 9z"/></svg>
              <h4 className="font-display text-base sm:text-lg text-primary-deep leading-snug mb-2">{lang === 'zh' ? '莲雾' : 'Wax Apple'} 莲雾</h4>
              <p className="text-[11px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">{lang === 'zh' ? '5月 – 7月' : 'May – July'}</p>
              <p className="text-xs sm:text-sm text-foreground/70">{lang === 'zh' ? '脆 & 清爽' : 'Crisp & refreshing'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. Where to Eat ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '去哪吃' : 'Where to Eat'}</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '美食目的地推荐' : 'Insider Food Destinations'}</h2>
            <div className="w-16 h-1 bg-accent-gold mx-auto"></div>
          </div>

          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-card mb-12 lg:mb-14">
            <img src="/hainan-seafood-market.jpg" alt="Sanya seafood market" style={{width:'100%',height:'100%',objectFit:'cover'}} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '本地推荐' : 'Local Institution'}</span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mt-2 leading-tight">{lang === 'zh' ? '三亚海鲜市场' : 'Sanya Seafood Market'}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Eat Spot 1: Sanya Number 1 Market */}
            <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
              <div className="w-11 h-11 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-primary-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-1">Sanya Number 1 Market 第一市场</h3>
              <p className="text-xs sm:text-sm text-accent-gold font-medium mb-4 tracking-wide">Sanya · Downtown</p>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">The essential Sanya food experience. Pick live seafood from dozens of vendors — grouper, prawns, mantis shrimp, abalone — then take it upstairs to a &ldquo;pick and cook&rdquo; restaurant where they&apos;ll prepare it any way you like within minutes.</p>
            </div>

            {/* Eat Spot 2: Wenchang Chicken Restaurants */}
            <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
              <div className="w-11 h-11 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-primary-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-1">Wenchang Chicken Restaurants</h3>
              <p className="text-xs sm:text-sm text-accent-gold font-medium mb-4 tracking-wide">Wenchang &amp; islandwide</p>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">For the definitive Wenchang chicken, drive out to the town itself — or find a legacy restaurant like Longquan (龙泉) or Taobao (陶宝) in Haikou. Order the full set: cold chicken, chicken oil rice, and a bowl of the poaching broth.</p>
            </div>

            {/* Eat Spot 3: Qilou Old Street Food Halls */}
            <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
              <div className="w-11 h-11 rounded-full bg-primary-deep/5 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-primary-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-1">Qilou Old Street Food Halls</h3>
              <p className="text-xs sm:text-sm text-accent-gold font-medium mb-4 tracking-wide">Haikou · Historic District</p>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">The arcaded shophouses of Haikou&apos;s Qilou district hide some of Hainan&apos;s most authentic small eateries — from a bowl of Haikou-style rice noodles at dawn to late-night Hainan coffee and coconut cake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-primary-deep py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              {lang === 'zh' ? '品味海南' : 'Taste the Island'}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              {lang === 'zh' ? '从白切文昌鸡到三亚海鲜盛宴——海南的每一餐都是一次邀请。' : 'From poached Wenchang chicken to a Sanya seafood feast — every meal in Hainan is an invitation.'}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <Link
              href="/#explore-hainan"
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 text-base font-semibold text-primary-deep bg-accent-gold hover:bg-accent-gold/90 rounded-md transition-all hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === 'zh' ? '返回探索海南' : 'Back to Explore Hainan'}
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}