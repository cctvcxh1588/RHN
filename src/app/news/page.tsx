'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Camera, ImageIcon } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

const newsArticles = [
  {
    id: 'entry-announcement',
    date: 'March 15, 2026',
    title: 'Entries Open for the 15th Round Hainan Regatta',
    excerpt:
      'The Organizing Committee is pleased to announce that entries are now open for the 15th edition of the Round Hainan Regatta. Competing classes include Dubois 50, ORC Full Round, ORC Half Round, and Fareast 28R.',
    category: 'Announcements',
  },
  {
    id: 'course-preview',
    date: 'April 2, 2026',
    title: 'Race Course Preview: 680 Miles Around Hainan',
    excerpt:
      'Get an early look at the 2026 race course. Starting from Sanya, the fleet will navigate clockwise around Hainan Island, passing iconic landmarks and challenging offshore passages.',
    category: 'Race Info',
  },
  {
    id: 'skipper-interview',
    date: 'April 20, 2026',
    title: 'Skipper Spotlight: Preparing for the 15th Edition',
    excerpt:
      'We sat down with returning skippers to discuss their preparations, strategies, and what makes the Round Hainan Regatta a must-do event on the Asian sailing calendar.',
    category: 'Interviews',
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
  useEffect(() => {
    document.title = 'News & Media | Round Hainan Regatta';
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
            {newsArticles.map((article, index) => (
              <RevealOnScroll key={article.id} delay={index * 0.1}>
                <article className="group bg-white rounded-2xl shadow-card hover:shadow-float transition-all duration-300 overflow-hidden flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-surface-container">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: "url('/hero.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/20 to-transparent" />
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
                    <h3 className="text-lg font-bold text-primary-deep mb-3 leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                      {article.excerpt}
                    </p>

                    {/* Read More */}
                    <Link
                      href={`/news/${article.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-bright transition-colors mt-auto group/link"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
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