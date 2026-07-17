"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Pencil, Trash2, Save, X, ArrowLeft, Check } from "lucide-react";

type ClassItem = {
  id: string;
  name_en: string;
  name_zh: string;
  tagline_en: string | null;
  tagline_zh: string | null;
  description_en: string | null;
  description_zh: string | null;
  features_en: string | null;
  features_zh: string | null;
  icon: string;
  color: string;
  sort_order: number;
  is_published: boolean;
};

const EMPTY: Omit<ClassItem, "id"> = {
  name_en: "", name_zh: "",
  tagline_en: "", tagline_zh: "",
  description_en: "", description_zh: "",
  features_en: "", features_zh: "",
  icon: "Sailboat", color: "primary",
  sort_order: 0, is_published: true,
};

const COLORS = ["primary-deep", "primary", "primary-bright", "accent-gold", "accent-coral", "accent-yellow"];

export default function AdminClassesPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ClassItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("rhn_admin_token");
    if (saved) { setToken(saved); setAuthed(true); }
  }, []);

  useEffect(() => { if (authed) load(); }, [authed]);

  const auth = async () => {
    const r = await fetch("/api/cms/classes?limit=1", { headers: { Authorization: `Bearer ${token}` } });
    const j = await r.json();
    if (j.ok) { sessionStorage.setItem("rhn_admin_token", token); setAuthed(true); }
    else alert("Token invalid");
  };

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/cms/classes", { headers: { Authorization: `Bearer ${token}` } });
    const j = await r.json();
    if (j.ok) setItems(j.items);
    setLoading(false);
  };

  const openNew = () => { setEditing({ id: "", ...EMPTY, sort_order: items.length }); setIsNew(true); };
  const openEdit = (item: ClassItem) => { setEditing({ ...item }); setIsNew(false); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const url = isNew ? "/api/cms/classes" : `/api/cms/classes/${editing.id}`;
      const method = isNew ? "POST" : "PATCH";
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editing),
      });
      const j = await r.json();
      if (j.ok) { setMsg(isNew ? "Created" : "Saved"); setEditing(null); load(); setTimeout(() => setMsg(""), 2000); }
      else alert(j.error || "Save failed");
    } finally { setSaving(false); }
  };

  const remove = async (item: ClassItem) => {
    if (!confirm(`Delete "${item.name_en}"?`)) return;
    const r = await fetch(`/api/cms/classes/${item.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
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
              <input type="password" value={token} onChange={(e) => setToken(e.target.value)} onKeyDown={(e) => e.key === "Enter" && auth()} placeholder="Admin token" className="mb-4 w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground" />
              <button onClick={auth} className="w-full rounded-lg bg-primary py-3 font-semibold text-on-primary">Verify</button>
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
              <h1 className="font-display text-3xl font-bold text-foreground">Racing Classes</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage the 4 racing class cards</p>
            </div>
            <button onClick={openNew} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary">
              <Plus className="h-4 w-4" /> New Class
            </button>
          </div>

          {msg && <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary"><Check className="h-4 w-4" /> {msg}</div>}

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full">
              <thead className="bg-muted/50 text-sm">
                <tr className="text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Name (EN)</th>
                  <th className="px-4 py-3 font-medium">Name (ZH)</th>
                  <th className="px-4 py-3 font-medium">Tagline</th>
                  <th className="px-4 py-3 font-medium">Color</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No items.</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-foreground">{item.sort_order}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{item.name_en}</td>
                    <td className="px-4 py-3 text-foreground">{item.name_zh}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{item.tagline_en}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: `var(--color-${item.color})` }} />
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
              <h2 className="font-display text-2xl font-bold text-foreground">{isNew ? "New Class" : "Edit Class"}</h2>
              <button type="button" onClick={() => setEditing(null)} className="rounded-full p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Name (EN)</label>
                <input value={editing.name_en} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} required className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Name (ZH)</label>
                <input value={editing.name_zh} onChange={(e) => setEditing({ ...editing, name_zh: e.target.value })} required className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Tagline (EN)</label>
                <input value={editing.tagline_en ?? ""} onChange={(e) => setEditing({ ...editing, tagline_en: e.target.value })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Tagline (ZH)</label>
                <input value={editing.tagline_zh ?? ""} onChange={(e) => setEditing({ ...editing, tagline_zh: e.target.value })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Description (EN)</label>
                <textarea value={editing.description_en ?? ""} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Description (ZH)</label>
                <textarea value={editing.description_zh ?? ""} onChange={(e) => setEditing({ ...editing, description_zh: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Features (EN) — pipe-separated</label>
                <textarea value={editing.features_en ?? ""} onChange={(e) => setEditing({ ...editing, features_en: e.target.value })} rows={3} placeholder="Feature 1|Feature 2|Feature 3" className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Features (ZH) — pipe-separated</label>
                <textarea value={editing.features_zh ?? ""} onChange={(e) => setEditing({ ...editing, features_zh: e.target.value })} rows={3} placeholder="特色 1|特色 2|特色 3" className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Icon (lucide name)</label>
                <input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Color</label>
                <select value={editing.color} onChange={(e) => setEditing({ ...editing, color: e.target.value })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground">
                  {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Sort Order</label>
                <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div className="flex items-end">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={editing.is_published} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
                  <span className="text-sm text-foreground">Published</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
              <button type="button" onClick={() => setEditing(null)} className="rounded-lg border border-border px-4 py-2 text-foreground hover:bg-muted">Cancel</button>
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
