"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Plus, Pencil, Trash2, Save, X, ArrowLeft, Check, Clock, MapPin, Tag } from "lucide-react";

type ScheduleItem = {
  id: string;
  day_label: string;
  date_label_en: string;
  date_label_zh: string;
  title_en: string;
  title_zh: string;
  description_en: string | null;
  description_zh: string | null;
  location_en: string | null;
  location_zh: string | null;
  category: string;
  sort_order: number;
  is_published: boolean;
};

const EMPTY: Omit<ScheduleItem, "id"> = {
  day_label: "",
  date_label_en: "",
  date_label_zh: "",
  title_en: "",
  title_zh: "",
  description_en: "",
  description_zh: "",
  location_en: "",
  location_zh: "",
  category: "Race",
  sort_order: 0,
  is_published: true,
};

const CATEGORIES = [
  { value: "Ceremony", label: "Ceremony / 仪式" },
  { value: "Race", label: "Race / 比赛" },
  { value: "Briefing", label: "Briefing / 会议" },
  { value: "Other", label: "Other / 其他" },
];

export default function AdminSchedulePage() {
  const { t } = useLang();
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ScheduleItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("rhn_admin_token");
    if (saved) {
      setToken(saved);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  const auth = async () => {
    try {
      const r = await fetch("/api/cms/schedule?limit=1", { headers: { Authorization: `Bearer ${token}` } });
      const j = await r.json();
      if (j.ok) {
        sessionStorage.setItem("rhn_admin_token", token);
        setAuthed(true);
      } else alert("Token invalid");
    } catch {
      alert("Auth failed");
    }
  };

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/cms/schedule", { headers: { Authorization: `Bearer ${token}` } });
    const j = await r.json();
    if (j.ok) setItems(j.items);
    setLoading(false);
  };

  const openNew = () => {
    setEditing({ id: "", ...EMPTY, sort_order: items.length });
    setIsNew(true);
  };

  const openEdit = (item: ScheduleItem) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const url = isNew ? "/api/cms/schedule" : `/api/cms/schedule/${editing.id}`;
      const method = isNew ? "POST" : "PATCH";
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editing),
      });
      const j = await r.json();
      if (j.ok) {
        setMsg(isNew ? "Created" : "Saved");
        setEditing(null);
        load();
        setTimeout(() => setMsg(""), 2000);
      } else {
        alert(j.error || "Save failed");
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: ScheduleItem) => {
    if (!confirm(`Delete "${item.day_label} - ${item.title_en}"?`)) return;
    const r = await fetch(`/api/cms/schedule/${item.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const j = await r.json();
    if (j.ok) load();
  };

  if (!authed) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-32 pb-20">
          <div className="mx-auto max-w-md px-6">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <h1 className="mb-6 font-display text-2xl font-bold text-foreground">CMS Login</h1>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && auth()}
                placeholder="Admin token"
                className="mb-4 w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground"
              />
              <button onClick={auth} className="w-full rounded-lg bg-primary py-3 font-semibold text-on-primary">
                Verify
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Link href="/admin/cms" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to CMS
              </Link>
              <h1 className="font-display text-3xl font-bold text-foreground">Schedule Management</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage the 8-day race schedule</p>
            </div>
            <button onClick={openNew} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary">
              <Plus className="h-4 w-4" /> New Day
            </button>
          </div>

          {msg && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
              <Check className="h-4 w-4" /> {msg}
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full">
              <thead className="bg-muted/50 text-sm">
                <tr className="text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Day</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Title (EN)</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Published</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No items. Click "New Day" to create one.</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-semibold text-foreground">{item.day_label}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{item.date_label_en}</td>
                    <td className="px-4 py-3 text-foreground">{item.title_en}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                        <Tag className="h-3 w-3" /> {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {item.is_published ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                          <Check className="h-3 w-3" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openEdit(item)} className="mr-2 inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-sm hover:bg-muted">
                        <Pencil className="h-3 w-3" /> Edit
                      </button>
                      <button onClick={() => remove(item)} className="inline-flex items-center gap-1 rounded-md border border-destructive/30 px-2 py-1 text-sm text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={save} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-dialog">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-foreground">{isNew ? "New Day" : "Edit Day"}</h2>
              <button type="button" onClick={() => setEditing(null)} className="rounded-full p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Day Label (e.g. Day 0)</label>
                <input value={editing.day_label} onChange={(e) => setEditing({ ...editing, day_label: e.target.value })} required className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Category</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground">
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Date Label (EN)</label>
                <input value={editing.date_label_en} onChange={(e) => setEditing({ ...editing, date_label_en: e.target.value })} placeholder="October 31 · Saturday" className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Date Label (ZH)</label>
                <input value={editing.date_label_zh} onChange={(e) => setEditing({ ...editing, date_label_zh: e.target.value })} placeholder="10月31日 · 星期六" className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Title (EN)</label>
                <input value={editing.title_en} onChange={(e) => setEditing({ ...editing, title_en: e.target.value })} required className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Title (ZH)</label>
                <input value={editing.title_zh} onChange={(e) => setEditing({ ...editing, title_zh: e.target.value })} required className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Location (EN)</label>
                <input value={editing.location_en ?? ""} onChange={(e) => setEditing({ ...editing, location_en: e.target.value })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Location (ZH)</label>
                <input value={editing.location_zh ?? ""} onChange={(e) => setEditing({ ...editing, location_zh: e.target.value })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Description (EN)</label>
                <textarea value={editing.description_en ?? ""} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Description (ZH)</label>
                <textarea value={editing.description_zh ?? ""} onChange={(e) => setEditing({ ...editing, description_zh: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Sort Order</label>
                <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div className="flex items-end gap-4">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={editing.is_published} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
                  <span className="text-sm text-foreground">Published</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg border border-border px-4 py-2 text-foreground hover:bg-muted">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary">
                <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}
