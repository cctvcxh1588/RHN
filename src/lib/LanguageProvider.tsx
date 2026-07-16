'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { dict, type Lang, type Namespace, type Keys } from './i18n';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: <N extends Namespace, K extends Keys<N>>(ns: N, key: K) => string;
};

const LangContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'rhn-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR-safe: default to 'en'; hydrate from localStorage on mount.
  const [lang, setLangState] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === 'en' || saved === 'zh') setLangState(saved);
    } catch {
      /* noop */
    }
    setMounted(true);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'en' ? 'zh' : 'en');
  }, [lang, setLang]);

  const t = useCallback(
    <N extends Namespace, K extends Keys<N>>(ns: N, key: K): string => {
      const bundle = dict[ns] as Record<Lang, Record<string, string>>;
      const active = bundle[lang];
      const fallback = bundle.en;
      const value = active?.[key as string] ?? fallback[key as string];
      return typeof value === 'string' ? value : String(key);
    },
    [lang],
  );

  // Suppress hydration mismatch by keeping SSR/CSR aligned until mount.
  const currentLang = mounted ? lang : 'en';

  return (
    <LangContext.Provider value={{ lang: currentLang, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
