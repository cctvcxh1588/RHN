'use client';

import { Globe } from 'lucide-react';
import { useLang } from '@/lib/LanguageProvider';

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={lang === 'en' ? 'Switch to Chinese' : '切换到英文'}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-white/85 hover:text-white hover:bg-white/10 border border-white/20 transition-colors ${className}`}
    >
      <Globe size={14} />
      <span className="tracking-wide">{lang === 'en' ? '中文' : 'EN'}</span>
    </button>
  );
}
