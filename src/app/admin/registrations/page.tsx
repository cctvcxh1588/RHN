'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, RefreshCw, Download, Lock } from 'lucide-react';

type Entry = {
  id: string;
  entry_id: string;
  team_name: string;
  race_class: string;
  skipper_name: string;
  email: string;
  phone: string;
  country: string | null;
  crew_count: string | null;
  mmsi: string | null;
  loa: string | null;
  has_insurance: boolean;
  has_safety: boolean;
  status: string;
  lang: string | null;
  notes: string | null;
  created_at: string;
};

const RACE_CLASSES = [
  'All',
  'Dubois 50 Class',
  'ORC Full Round Class',
  'ORC Half Round Class',
  'Fareast 28R Class',
];

export default function AdminRegistrationsPage() {
  const [token, setToken] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [filterClass, setFilterClass] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(
    async (tk: string) => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({ token: tk, limit: '500' });
        if (filterClass !== 'All') params.set('race_class', filterClass);
        const res = await fetch(`/api/register?${params.toString()}`);
        const json = await res.json();
        if (!res.ok || !json.ok) {
          setError(json.error === 'UNAUTHORIZED' ? 'Invalid access token' : json.message || 'Failed to load');
          setAuthed(false);
          return;
        }
        setEntries(json.entries || []);
        setTotal(json.total || 0);
        setAuthed(true);
        if (typeof window !== 'undefined') sessionStorage.setItem('rhn_admin_token', tk);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    },
    [filterClass],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = sessionStorage.getItem('rhn_admin_token');
    if (saved) {
      setToken(saved);
      fetchData(saved);
    }
  }, [fetchData]);

  useEffect(() => {
    if (authed && token) fetchData(token);
  }, [filterClass, authed, token, fetchData]);

  const filteredEntries = entries.filter((e) => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      e.team_name.toLowerCase().includes(s) ||
      e.skipper_name.toLowerCase().includes(s) ||
      e.email.toLowerCase().includes(s) ||
      e.entry_id.toLowerCase().includes(s)
    );
  });

  const exportCsv = () => {
    const headers = [
      'Entry ID',
      'Team',
      'Class',
      'Skipper',
      'Email',
      'Phone',
      'Country',
      'Crew',
      'MMSI',
      'LOA',
      'Insurance',
      'Safety',
      'Status',
      'Lang',
      'Notes',
      'Created At',
    ];
    const rows = filteredEntries.map((e) => [
      e.entry_id,
      e.team_name,
      e.race_class,
      e.skipper_name,
      e.email,
      e.phone,
      e.country ?? '',
      e.crew_count ?? '',
      e.mmsi ?? '',
      e.loa ?? '',
      e.has_insurance ? 'Yes' : 'No',
      e.has_safety ? 'Yes' : 'No',
      e.status,
      e.lang ?? '',
      (e.notes ?? '').replace(/\n/g, ' '),
      e.created_at,
    ]);
    const escape = (v: string) =>
      /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => escape(String(c))).join(','))
      .join('\n');
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rhn-entries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container p-6">
        <div className="bg-white rounded-2xl shadow-card p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Admin Access</h1>
              <p className="text-sm text-muted-foreground">Registrations Dashboard</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Enter the admin access token to view submitted entries.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (token.trim()) fetchData(token.trim());
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Access token"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              autoFocus
            />
            {error && <p className="text-sm text-accent-coral">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-deep transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-border">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container">
      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-medium mb-2">RHN 2026 · Admin</div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground">Race Entries</h1>
            <p className="text-muted-foreground mt-1">
              {total} total submission{total === 1 ? '' : 's'} · {filteredEntries.length} showing
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fetchData(token)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border hover:border-primary text-foreground text-sm transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary-deep transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Site
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white rounded-xl shadow-sm border border-border/60">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by team, skipper, email, entry ID..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-white text-sm"
          >
            {RACE_CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-primary/5 text-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Entry ID</th>
                  <th className="text-left px-4 py-3 font-medium">Team</th>
                  <th className="text-left px-4 py-3 font-medium">Class</th>
                  <th className="text-left px-4 py-3 font-medium">Skipper</th>
                  <th className="text-left px-4 py-3 font-medium">Contact</th>
                  <th className="text-left px-4 py-3 font-medium">Country</th>
                  <th className="text-left px-4 py-3 font-medium">Crew</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-muted-foreground">Loading…</td>
                  </tr>
                )}
                {!loading && filteredEntries.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-muted-foreground">No entries yet.</td>
                  </tr>
                )}
                {!loading && filteredEntries.map((e) => (
                  <tr key={e.id} className="border-t border-border hover:bg-primary/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-primary">{e.entry_id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{e.team_name}</td>
                    <td className="px-4 py-3 text-xs">{e.race_class}</td>
                    <td className="px-4 py-3">{e.skipper_name}</td>
                    <td className="px-4 py-3 text-xs">
                      <div>{e.email}</div>
                      <div className="text-muted-foreground">{e.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-xs">{e.country ?? '—'}</td>
                    <td className="px-4 py-3 text-center">{e.crew_count ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        e.status === 'confirmed' ? 'bg-primary/10 text-primary' :
                        e.status === 'rejected' ? 'bg-accent-coral/10 text-accent-coral' :
                        'bg-accent-gold/10 text-accent-gold'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(e.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Showing up to 500 latest entries. Use CSV export for full data offloading.
        </p>
      </div>
    </div>
  );
}
