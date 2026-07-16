'use client';

import Link from 'next/link';
import { useLang } from '@/lib/LanguageProvider';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLang();

  const quickLinks = [
    { href: '/about', label: t('footer', 'aboutTheRace') },
    { href: '/course', label: t('footer', 'raceCourse') },
    { href: '/schedule', label: t('footer', 'eventSchedule') },
    { href: '/classes', label: t('footer', 'racingClasses') },
  ];

  const resources = [
    { href: '/news', label: t('footer', 'newsMedia') },
    { href: '/register', label: t('footer', 'register') },
    { href: '/contact', label: t('footer', 'contactUs') },
  ];

  return (
    <footer className="bg-primary-deep text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/logo.png"
                alt="Round Hainan Regatta"
                className="h-12 w-auto object-contain"
                style={{
                  filter:
                    'drop-shadow(0 0 6px rgba(246,170,0,0.6)) drop-shadow(0 0 20px rgba(246,170,0,0.3)) brightness(1.3)',
                }}
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {t('footer', 'tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent-gold mb-4">
              {t('footer', 'quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent-gold mb-4">
              {t('footer', 'resources')}
            </h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent-gold mb-4">
              {t('footer', 'contact')}
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a
                  href="mailto:roundhainanregatta@foxmail.com"
                  className="hover:text-white transition-colors"
                >
                  roundhainanregatta@foxmail.com
                </a>
              </li>
              <li>{t('footer', 'location')}</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-gold/30 transition-colors"
                aria-label="WeChat"
              >
                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.49.49 0 0 1 .178-.554C23.028 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.18 2.769c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {currentYear} {t('footer', 'copyright')}
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <span>{t('footer', 'edition')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
