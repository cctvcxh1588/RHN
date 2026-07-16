'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Camera, ImageIcon } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

interface Article {
  id: string;
  href: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  sortKey: number;
}

const staticArticles: Article[] = [
  {
    id: 'rhn-2026-entry-open',
    href: '/news/rhn-2026-entry-open',
    date: 'October 15, 2026',
    title: 'Entries Now Open for 15th Round Hainan Regatta',
    excerpt:
      'The Organizing Committee is pleased to announce that entries are now open for the 15th edition of the Round Hainan Regatta, running October 31 – November 7, 2026 from Sanya. Competing classes include Dubois 50, ORC Full Round, ORC Half Round, and Fareast 28R.',
    category: 'Entry Announcement',
    image: '/hero.jpg',
    sortKey: new Date('2026-10-15').getTime(),
  },
  {
    id: 'course-preview-2026',
    href: '/news/course-preview-2026',
    date: 'October 8, 2026',
    title: 'Race Course Revealed: New Clockwise Route Around Hainan',
    excerpt:
      'For 2026 the fleet will circumnavigate Hainan clockwise for the first time — heading west out of Sanya through seven waypoints across approximately 680 nautical miles. Discover the strategy behind the new course.',
    category: 'Race Course',
    image: '/carousel-2.jpg',
    sortKey: new Date('2026-10-08').getTime(),
  },
  {
    id: 'skipper-interview',
    href: '/news/skipper-interview',
    date: 'September 20, 2026',
    title: 'Skipper Interview: Veteran Sailor on Sailing Around Hainan',
    excerpt:
      'Captain Chen Wei, veteran of eight Round Hainan Regattas, sits down to share how the race has evolved, which leg is toughest, and what advice he has for newcomers preparing for their first tropical offshore adventure.',
    category: 'Interview',
    image: '/carousel-3.jpg',
    sortKey: new Date('2026-09-20').getTime(),
  },
];

const galleryImages = [
  { src: '/hero.jpg', alt: 'Regatta fleet sailing' },
  { src: '/carousel-2.jpg', alt: 'Yacht underway' },
  { src: '/carousel-3.jpg', alt: 'Sunset sailing' },
  { src: '/carousel-4.jpg', alt: 'Racing action' },
  { src: '/phoenix-sanya.jpg', alt: 'Phoenix Island, Sanya' },
  { src: '/hero.jpg', alt: 'Round Hainan Regatta fleet' },
];

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>(staticArticles);

  useEffect(() => {
    document.title = 'News & Media | Round Hainan Regatta';

    // Fetch CMS news and merge with static articles
    fetch('/api/cms/news?published=true')
      .then((r) => r.json())
      .then((data: { ok?: boolean; entries?: Array<{
        slug: string;
        title_en: string;
        title_zh: string | null;
        excerpt_en: string | null;
        excerpt_zh: string | null;
        category: string | null;
        image_url: string | null;
        published_at: string | null;
      }> }) => {
        if (!data.ok || !Array.isArray(data.entries)) return;
        const cmsItems: Article[] = data.entries.map((n) => {
          const dateObj = n.published_at ? new Date(n.published_at) : new Date();
          return {
            id: `cms-${n.slug}`,
            href: `/news/cms/${n.slug}`,
            date: dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            title: n.title_en || '',
            excerpt: n.excerpt_en || '',
            category: n.category || 'News',
            image: n.image_url || '/hero.jpg',
            sortKey: dateObj.getTime(),
          };
        });
        // Merge and sort by date desc
        const merged = [...cmsItems, ...staticArticles].sort((a, b) => b.sortKey - a.sortKey);
        setArticles(merged);
      })
      .catch(() => { /* silent fallback to static */ });
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
              News &amp; Media
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Stay up to date with the latest news, race updates, and media from
              the Round Hainan Regatta.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ LATEST NEWS ============ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-4">
                Updates
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-deep mb-4">
                Latest News
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Read the latest updates, race reports, and stories from the
                Round Hainan Regatta community.
              </p>
            </div>
          </RevealOnScroll>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <RevealOnScroll key={article.id} delay={index * 0.1}>
                <Link
                  href={article.href}
                  className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 rounded-2xl"
                >
                  <article className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-float cursor-pointer">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-surface-container">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('${article.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/30 to-transparent" />
                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent-gold/90 text-primary-deep rounded-full">
                        {article.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={article.date}>{article.date}</time>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-primary-deep mb-3 leading-snug transition-colors group-hover:text-primary">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                        {article.excerpt}
                      </p>

                      {/* Read More */}
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 mt-auto group-hover:text-accent-gold group-hover:gap-3">
                        Read More
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PHOTO GALLERY ============ */}
      <section className="bg-surface-container py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-4">
                Gallery
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-deep mb-4">
                Photo Gallery
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Browse stunning images from past editions and the beautiful
                waters around Hainan Island.
              </p>
            </div>
          </RevealOnScroll>

          {/* 2x3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryImages.map((img, index) => (
              <RevealOnScroll key={index} delay={index * 0.05}>
                <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all duration-300 cursor-pointer">
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${img.src}')` }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary-deep/0 group-hover:bg-primary-deep/30 transition-all duration-300 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTENT NOTE ============ */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-surface-container rounded-2xl">
              <ImageIcon className="w-5 h-5 text-accent-gold shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Content coming soon. Stay tuned for updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
