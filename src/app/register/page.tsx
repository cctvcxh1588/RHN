'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Ship,
  User,
  Mail,
  Phone,
  Globe,
  Anchor,
  FileText,
  Send,
  AlertCircle,
  Calendar,
  DollarSign,
  ClipboardList,
} from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { useLang } from '@/lib/LanguageProvider';

const RACE_CLASSES = [
  'Dubois 50 Class',
  'ORC Full Round Class',
  'ORC Half Round Class',
  'Fareast 28R Class',
];

type FormState = {
  teamName: string;
  raceClass: string;
  sailNumber: string;
  loa: string;
  hullColor: string;
  skipperName: string;
  email: string;
  phone: string;
  country: string;
  crewCount: string;
  hasInsurance: boolean;
  hasSafety: boolean;
  notes: string;
};

const initial: FormState = {
  teamName: '',
  raceClass: '',
  sailNumber: '',
  loa: '',
  hullColor: '',
  skipperName: '',
  email: '',
  phone: '',
  country: '',
  crewCount: '',
  hasInsurance: false,
  hasSafety: false,
  notes: '',
};

export default function RegisterPage() {
  const { t, lang } = useLang();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ entryId: string } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    document.title =
      (lang === 'zh' ? '船队报名' : 'Register') + ' | Round Hainan Regatta';
  }, [lang]);

  const classLabels: Record<string, string> = {
    'Dubois 50 Class': t('register', 'classOpt1'),
    'ORC Full Round Class': t('register', 'classOpt2'),
    'ORC Half Round Class': t('register', 'classOpt3'),
    'Fareast 28R Class': t('register', 'classOpt4'),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _removed, ...rest } = prev;
        void _removed;
        return rest;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    (['teamName', 'raceClass', 'skipperName', 'email', 'phone'] as const).forEach(
      (k) => {
        if (!form[k] || String(form[k]).trim() === '') {
          errs[k] = t('register', 'required');
        }
      },
    );
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t('register', 'invalidEmail');
    }
    if (!form.hasInsurance) errs.hasInsurance = t('register', 'required');
    if (!form.hasSafety) errs.hasSafety = t('register', 'required');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setApiError(t('register', 'networkError'));
      } else {
        setSuccess({ entryId: data.entryId });
      }
    } catch {
      setApiError(t('register', 'networkError'));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(initial);
    setSuccess(null);
    setErrors({});
    setApiError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg border bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition';
  const errClass = 'border-accent-coral';
  const okClass = 'border-surface-container hover:border-primary/40';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-deep via-primary to-primary-bright overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(246,170,0,0.35),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent-gold/60 text-accent-gold text-xs font-semibold uppercase tracking-widest">
            {t('register', 'heroBadge')}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white font-display tracking-tight">
            {t('register', 'heroTitle')}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            {t('register', 'heroSub')}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24 bg-surface-container/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Registration Info */}
          <RevealOnScroll>
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Deadline */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-coral/10 flex items-center justify-center shrink-0">
                    <Calendar size={20} className="text-accent-coral" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                      {lang === 'zh' ? '报名截止' : 'Registration Deadline'}
                    </h3>
                    <p className="text-lg font-bold text-accent-coral mt-1">
                      {lang === 'zh' ? '2026年10月9日 18:00' : 'October 9, 2026 · 18:00'}
                    </p>
                    <p className="text-xs text-foreground/60 mt-1">
                      {lang === 'zh' ? '北京时间' : 'Beijing Time (UTC+8)'}
                    </p>
                  </div>
                </div>
                {/* Documents */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                      {lang === 'zh' ? '需提交文件' : 'Required Documents'}
                    </h3>
                    <ul className="text-xs text-foreground/70 mt-1 space-y-0.5">
                      <li>• {lang === 'zh' ? 'ORC 证书' : 'ORC Certificate'}</li>
                      <li>• {lang === 'zh' ? '船员保险证明' : 'Crew Insurance'}</li>
                      <li>• {lang === 'zh' ? '安全设备清单' : 'Safety Equipment List'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {success ? (
            <RevealOnScroll>
              <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground font-display mb-3">
                  {t('register', 'successTitle')}
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-4 max-w-2xl mx-auto">
                  {t('register', 'successText')}
                </p>
                <p className="text-sm text-foreground/50 mb-8">
                  <span className="font-semibold text-primary">
                    Entry ID: {success.entryId}
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-deep transition"
                  >
                    {t('register', 'submitAnother')}
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary/5 transition"
                  >
                    {lang === 'zh' ? '返回首页' : 'Back to Home'}
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-card p-6 md:p-10 space-y-10"
            >
              {/* Section: Boat & Team */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Ship size={20} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground font-display">
                    {t('register', 'sectionBoat')}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                      {t('register', 'teamName')} <span className="text-accent-coral">*</span>
                    </label>
                    <input
                      name="teamName"
                      value={form.teamName}
                      onChange={handleChange}
                      className={`${inputClass} ${errors.teamName ? errClass : okClass}`}
                    />
                    {errors.teamName && (
                      <p className="text-xs text-accent-coral mt-1">{errors.teamName}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                      {t('register', 'class')} <span className="text-accent-coral">*</span>
                    </label>
                    <select
                      name="raceClass"
                      value={form.raceClass}
                      onChange={handleChange}
                      className={`${inputClass} ${errors.raceClass ? errClass : okClass}`}
                    >
                      <option value="">{t('register', 'classPlaceholder')}</option>
                      {RACE_CLASSES.map((c) => (
                        <option key={c} value={c}>
                          {classLabels[c]}
                        </option>
                      ))}
                    </select>
                    {errors.raceClass && (
                      <p className="text-xs text-accent-coral mt-1">{errors.raceClass}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                      {t('register', 'sailNumber')}
                    </label>
                    <input
                      name="sailNumber"
                      value={form.sailNumber}
                      onChange={handleChange}
                      placeholder="CHN 1234"
                      className={`${inputClass} ${okClass}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                      {t('register', 'loa')}
                    </label>
                    <input
                      name="loa"
                      value={form.loa}
                      onChange={handleChange}
                      placeholder="15.2"
                      className={`${inputClass} ${okClass}`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                      {t('register', 'hullColor')}
                    </label>
                    <input
                      name="hullColor"
                      value={form.hullColor}
                      onChange={handleChange}
                      placeholder={lang === 'zh' ? '例：白色 / 深蓝' : 'e.g. White / Navy Blue'}
                      className={`${inputClass} ${okClass}`}
                    />
                  </div>
                </div>
              </div>

              {/* Section: Skipper */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-gold/15 flex items-center justify-center">
                    <User size={20} className="text-accent-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground font-display">
                    {t('register', 'sectionContact')}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                      {t('register', 'skipperName')} <span className="text-accent-coral">*</span>
                    </label>
                    <input
                      name="skipperName"
                      value={form.skipperName}
                      onChange={handleChange}
                      className={`${inputClass} ${errors.skipperName ? errClass : okClass}`}
                    />
                    {errors.skipperName && (
                      <p className="text-xs text-accent-coral mt-1">{errors.skipperName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/80 mb-1.5 flex items-center gap-1.5">
                      <Mail size={14} /> {t('register', 'email')}{' '}
                      <span className="text-accent-coral">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`${inputClass} ${errors.email ? errClass : okClass}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-accent-coral mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/80 mb-1.5 flex items-center gap-1.5">
                      <Phone size={14} /> {t('register', 'phone')}{' '}
                      <span className="text-accent-coral">*</span>
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`${inputClass} ${errors.phone ? errClass : okClass}`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-accent-coral mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/80 mb-1.5 flex items-center gap-1.5">
                      <Globe size={14} /> {t('register', 'country')}
                    </label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder={lang === 'zh' ? '中国' : 'China'}
                      className={`${inputClass} ${okClass}`}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/80 mb-1.5 flex items-center gap-1.5">
                      <Anchor size={14} /> {t('register', 'crewCount')}
                    </label>
                    <input
                      name="crewCount"
                      type="number"
                      min={1}
                      max={20}
                      value={form.crewCount}
                      onChange={handleChange}
                      placeholder="8"
                      className={`${inputClass} ${okClass}`}
                    />
                  </div>
                </div>
              </div>

              {/* Section: Confirmations & Notes */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-coral/10 flex items-center justify-center">
                    <FileText size={20} className="text-accent-coral" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground font-display">
                    {t('register', 'sectionOther')}
                  </h2>
                </div>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 rounded-lg border border-surface-container bg-surface-container/30 hover:border-primary/40 cursor-pointer transition">
                    <input
                      name="hasInsurance"
                      type="checkbox"
                      checked={form.hasInsurance}
                      onChange={handleChange}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-primary cursor-pointer"
                    />
                    <span className="text-sm text-foreground/80 leading-relaxed">
                      {t('register', 'hasInsurance')}{' '}
                      {errors.hasInsurance && (
                        <span className="text-accent-coral text-xs ml-1">
                          ({errors.hasInsurance})
                        </span>
                      )}
                    </span>
                  </label>
                  <label className="flex items-start gap-3 p-4 rounded-lg border border-surface-container bg-surface-container/30 hover:border-primary/40 cursor-pointer transition">
                    <input
                      name="hasSafety"
                      type="checkbox"
                      checked={form.hasSafety}
                      onChange={handleChange}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-primary cursor-pointer"
                    />
                    <span className="text-sm text-foreground/80 leading-relaxed">
                      {t('register', 'hasSafety')}{' '}
                      {errors.hasSafety && (
                        <span className="text-accent-coral text-xs ml-1">
                          ({errors.hasSafety})
                        </span>
                      )}
                    </span>
                  </label>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-1.5">
                      {t('register', 'notes')}
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder={t('register', 'notesPlaceholder')}
                      className={`${inputClass} ${okClass} resize-y`}
                    />
                  </div>
                </div>
              </div>

              {apiError && (
                <div className="flex items-start gap-2 p-4 rounded-lg bg-accent-coral/10 border border-accent-coral/30 text-sm text-accent-coral">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{apiError}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-surface-container">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-accent-gold text-primary-deep font-bold text-sm uppercase tracking-widest hover:bg-accent-gold/90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-primary-deep/40 border-t-primary-deep animate-spin" />
                      {t('register', 'submitting')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('register', 'submit')}
                    </>
                  )}
                </button>
                <p className="text-xs text-foreground/50 leading-relaxed">
                  {lang === 'zh'
                    ? '提交即表示您同意组委会通过所提供的邮箱与您联系。'
                    : 'By submitting you agree to be contacted by the Organizing Committee at the email provided.'}
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
