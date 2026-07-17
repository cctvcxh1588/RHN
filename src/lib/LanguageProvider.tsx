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

/** CMS settings override map, keyed by "namespace_key" → { en, zh } */
type OverrideMap = Record<string, { en: string; zh: string }>;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);
  const [overrides, setOverrides] = useState<OverrideMap>({});

  // Fetch CMS settings overrides
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/cms/settings');
        const j = await res.json();
        if (j.ok && Array.isArray(j.items)) {
          const map: OverrideMap = {};
          for (const item of j.items) {
            map[item.key] = { en: item.value_en || '', zh: item.value_zh || '' };
          }
          setOverrides(map);
        }
      } catch {
        // silent — fallback to dict
      }
    })();
  }, []);

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
      // 1. Check CMS override first
      const overrideKey = `${String(ns)}_${String(key)}`;
      const override = overrides[overrideKey];
      if (override) {
        const val = lang === 'zh' ? override.zh : override.en;
        if (val) return val;
      }

      // 2. Fall back to dictionary
      const bundle = dict[ns] as Record<Lang, Record<string, string>>;
      const active = bundle[lang];
      const fallback = bundle.en;
      const value = active?.[key as string] ?? fallback[key as string];
      return typeof value === 'string' ? value : String(key);
    },
    [lang, overrides],
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