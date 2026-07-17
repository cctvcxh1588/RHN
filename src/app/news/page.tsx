"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, ImageIcon, ExternalLink } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { useLang } from "@/lib/LanguageProvider";

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

interface CmsNewsItem {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string | null;
  excerpt_en: string | null;
  excerpt_zh: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string | null;
  sort_order: number | null;
}

interface CmsNewsResponse {
  ok: boolean;
  count: number;
  items: CmsNewsItem[];
}

interface CmsGalleryItem {
  id: string;
  src: string;
  alt: string;
  sort_order: number;
}

interface CmsGalleryResponse {
  ok: boolean;
  count: number;
  items: CmsGalleryItem[];
}

export default function NewsPage() {
  const { lang, t } = useLang();
  const [articles, setArticles] = useState<Article[]>([]);
  const [galleryImages, setGalleryImages] = useState<{ src: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = lang === 'zh' ? "新闻与媒体 | 环海南岛国际大帆船赛" : "News & Media | Round Hainan Regatta";

    // Fetch CMS news
    fetch("/api/cms/news?published=true")
      .then((r) => r.json())
      .then((data: CmsNewsResponse) => {
        if (!data.ok || !Array.isArray(data.items)) return;
        const cmsItems: Article[] = data.items.map((n) => {
          const dateObj = n.published_at
            ? new Date(n.published_at)
            : new Date();
          return {
            id: `cms-${n.slug}`,
            href: `/news/cms/${n.slug}`,
            date: dateObj.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            title: (lang === 'zh' ? n.title_zh : n.title_en) || n.title_en || "",
            excerpt: (lang === 'zh' ? n.excerpt_zh : n.excerpt_en) || n.excerpt_en || "",
            category: n.category || "News",
            image: n.image_url || "/hero.jpg",
            sortKey: dateObj.getTime(),
          };
        });
        // Sort by date desc
        cmsItems.sort((a, b) => b.sortKey - a.sortKey);
        setArticles(cmsItems);
      })
      .catch(() => {
        /* silent fallback to empty */
      });

    // Fetch gallery images
    fetch("/api/cms/gallery?published=true")
      .then((r) => r.json())
      .then((data: CmsGalleryResponse) => {
        if (!data.ok || !Array.isArray(data.items)) return;
        const items = data.items
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((g) => ({ src: g.src, alt: g.alt }));
        setGalleryImages(items);
      })
      .catch(() => {
        /* silent */
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* ============ HERO BANNER ============ */}
      <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/60 via-primary-deep/40 to-primary-deep/70" />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,60,126,0.6) 100%)",
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-4">
              {lang === 'zh' ? '新闻与媒体' : 'News & Media'}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {lang === 'zh'
                ? '了解环海南岛国际大帆船赛的最新新闻、赛事动态与媒体报道。'
                : 'Stay up to date with the latest news, race updates, and media from the Round Hainan Regatta.'}
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
                {lang === 'zh' ? '动态' : 'Updates'}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-deep mb-4">
                {lang === 'zh' ? '最新新闻' : 'Latest News'}
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {lang === 'zh'
                  ? '了解环海南岛国际大帆船赛的最新新闻、赛事动态与媒体报道。'
                  : 'Stay up to date with the latest news, race updates, and media from the Round Hainan Regatta.'}
              </p>
            </div>
          </RevealOnScroll>

          {articles.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {lang === 'zh' ? '暂无新闻，敬请期待！' : 'No news articles yet. Check back soon!'}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <RevealOnScroll key={article.id} delay={index * 0.05}>
                <Link href={article.href}>
                  <article className="group bg-white rounded-2xl shadow-card hover:shadow-float transition-all duration-300 overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${article.image}')` }}
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent-gold text-white rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-xs text-muted-foreground mb-2">
                        {article.date}
                      </span>
                      <h3 className="text-lg font-bold text-primary-deep mb-2 leading-snug group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {article.excerpt.length > 120
                          ? article.excerpt.slice(0, 120) + "..."
                          : article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-gold mt-4 group-hover:gap-2.5 transition-all">
                        {lang === 'zh' ? '了解更多' : 'Read More'}
                        <ExternalLink className="w-3.5 h-3.5" />
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
                {lang === 'zh' ? '图库' : 'Gallery'}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-deep mb-4">
                {lang === 'zh' ? '图片精选' : 'Photo Gallery'}
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {lang === 'zh'
                  ? '浏览往届赛事精彩瞬间与海南岛周边美丽海域的迷人影像。'
                  : 'Browse stunning images from past editions and the beautiful waters around Hainan Island.'}
              </p>
            </div>
          </RevealOnScroll>

          {galleryImages.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {lang === 'zh' ? '暂无图库图片，请在 CMS 后台添加。' : 'No gallery images yet. Add them from the CMS admin panel.'}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryImages.map((img, index) => (
              <RevealOnScroll key={index} delay={index * 0.05}>
                <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all duration-300 cursor-pointer">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${img.src}')` }}
                  />
                  <div className="absolute inset-0 bg-primary-deep/0 group-hover:bg-primary-deep/30 transition-all duration-300 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}