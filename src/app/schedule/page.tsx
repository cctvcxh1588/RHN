'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/LanguageProvider';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Calendar, MapPin, Users, Trophy } from 'lucide-react';

interface ScheduleEvent {
  time: string;
  label_en: string;
  label_zh: string;
  class_en: string;
  class_zh: string;
  location_en: string;
  location_zh: string;
}

interface ScheduleDay {
  day_label: string;
  date_label_en: string;
  date_label_zh: string;
  events: ScheduleEvent[];
}

export default function SchedulePage() {
  const { lang } = useLang();
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);

  useEffect(() => {
    fetch('/api/cms/schedule')
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setSchedule(data.items);
        }
      })
      .catch(err => console.error('Failed to load schedule:', err));
  }, []);

  const t = (en: string, zh: string) => (lang === 'zh' ? zh : en);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-deep opacity-90" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <RevealOnScroll>
            <span className="inline-block px-4 py-2 bg-accent-gold/20 border border-accent-gold/30 rounded-full text-accent-gold text-sm font-medium mb-6">
              {t('RACE SCHEDULE', '赛事日程')}
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              {t('The Schedule', '赛程安排')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto">
              {t('October 29 – November 8, 2026', '2026年10月29日 – 11月8日')}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Schedule Table Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('Official Race Schedule', '官方赛事日程')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('All times are local (UTC+8)', '所有时间均为当地时间（UTC+8）')}
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block">
              <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border">
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-primary text-primary-foreground px-6 py-4 font-semibold text-sm">
                  <div className="col-span-2">{t('Date', '日期')}</div>
                  <div className="col-span-2">{t('Time', '时间')}</div>
                  <div className="col-span-4">{t('Activity', '活动')}</div>
                  <div className="col-span-2">{t('Class', '组别')}</div>
                  <div className="col-span-2">{t('Location', '地点')}</div>
                </div>

                {/* Table Body */}
                {schedule.map((day, dayIdx) => (
                  <div key={dayIdx}>
                    {/* Day Header Row */}
                    <div className="grid grid-cols-12 bg-muted/50 px-6 py-3 border-t border-border">
                      <div className="col-span-2 font-bold text-primary">
                        {t(day.day_label, day.day_label)}
                      </div>
                      <div className="col-span-10 font-semibold text-foreground">
                        {t(day.date_label_en, day.date_label_zh)}
                      </div>
                    </div>

                    {/* Event Rows */}
                    {day.events.map((event, eventIdx) => (
                      <div
                        key={eventIdx}
                        className="grid grid-cols-12 px-6 py-4 border-t border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <div className="col-span-2 text-muted-foreground text-sm">
                          {t(day.day_label, day.day_label)}
                        </div>
                        <div className="col-span-2 font-mono text-sm font-medium text-foreground">
                          {event.time}
                        </div>
                        <div className="col-span-4 font-medium text-foreground">
                          {t(event.label_en, event.label_zh)}
                        </div>
                        <div className="col-span-2 text-sm text-muted-foreground">
                          {t(event.class_en, event.class_zh)}
                        </div>
                        <div className="col-span-2 text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {t(event.location_en, event.location_zh)}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-6">
              {schedule.map((day, dayIdx) => (
                <div key={dayIdx} className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                  {/* Day Header */}
                  <div className="bg-primary text-primary-foreground px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-lg">{t(day.day_label, day.day_label)}</div>
                        <div className="text-primary-foreground/80 text-sm">
                          {t(day.date_label_en, day.date_label_zh)}
                        </div>
                      </div>
                      <Calendar className="w-6 h-6 text-accent-gold" />
                    </div>
                  </div>

                  {/* Events */}
                  <div className="divide-y divide-border/50">
                    {day.events.map((event, eventIdx) => (
                      <div key={eventIdx} className="p-5 hover:bg-muted/30 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-20 text-sm font-mono font-medium text-primary">
                            {event.time}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-foreground mb-1">
                              {t(event.label_en, event.label_zh)}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <Users className="w-3 h-3" />
                              {t(event.class_en, event.class_zh)}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {t(event.location_en, event.location_zh)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Legend Section */}
      <section className="py-12 bg-muted/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              {t('Race Classes', '竞赛组别')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
                <div className="font-semibold text-foreground mb-1">Dubois 50</div>
                <div className="text-sm text-muted-foreground">
                  {t('One Design Class', '同型船组别')}
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
                <div className="font-semibold text-foreground mb-1">ORC Full Round</div>
                <div className="text-sm text-muted-foreground">
                  {t('Full Circumnavigation', '全程环航组别')}
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
                <div className="font-semibold text-foreground mb-1">ORC Half Round</div>
                <div className="text-sm text-muted-foreground">
                  {t('Half Circumnavigation', '半程环航组别')}
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border shadow-sm">
                <div className="font-semibold text-foreground mb-1">Fareast 28R</div>
                <div className="text-sm text-muted-foreground">
                  {t('Inshore Racing Class', '场地赛组别')}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
