'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/lib/LanguageProvider';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLang();

  const navLinks = [
    { href: '/', label: t('nav', 'home') },
    { href: '/about', label: t('nav', 'about') },
    { href: '/course', label: t('nav', 'course') },
    { href: '/schedule', label: t('nav', 'schedule') },
    { href: '/classes', label: t('nav', 'classes') },
    { href: '/news', label: t('nav', 'news') },
    { href: '/contact', label: t('nav', 'contact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary-deep/95 backdrop-blur-md shadow-lg'
          : 'bg-primary-deep/70 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <img
              src="/logo.png"
              alt="Round Hainan Regatta"
              className="h-14 w-auto object-contain transition-all duration-300"
              style={{
                filter:
                  'drop-shadow(0 0 6px rgba(246,170,0,0.8)) drop-shadow(0 0 25px rgba(246,170,0,0.4)) brightness(1.5) contrast(1.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter =
                  'drop-shadow(0 0 10px rgba(246,170,0,1)) drop-shadow(0 0 35px rgba(246,170,0,0.6)) brightness(1.6) contrast(1.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter =
                  'drop-shadow(0 0 6px rgba(246,170,0,0.8)) drop-shadow(0 0 25px rgba(246,170,0,0.4)) brightness(1.5) contrast(1.15)';
              }}
            />
            <span className="hidden sm:block text-sm font-semibold text-white/90 tracking-wide">
              Round Hainan Regatta
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.href
                    ? 'text-accent-gold bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageToggle className="ml-2" />
            <Link
              href="/register"
              className="ml-3 px-5 py-2 text-sm font-semibold text-primary-deep bg-accent-gold hover:bg-accent-gold/90 rounded-md transition-all hover:scale-105"
            >
              {t('nav', 'register')}
            </Link>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              className="text-white/80 hover:text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 bg-primary-deep/98 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 text-sm font-medium rounded-md ${
                pathname === link.href
                  ? 'text-accent-gold bg-white/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="block px-4 py-3 text-sm font-semibold text-primary-deep bg-accent-gold hover:bg-accent-gold/90 rounded-md text-center mt-2"
          >
            {t('nav', 'register')}
          </Link>
        </div>
      </div>
    </header>
  );
}
