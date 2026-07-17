"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Pencil, Save, X, ArrowLeft, Check, FileText } from "lucide-react";

type PageItem = {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  body_en: string | null;
  body_zh: string | null;
  updated_at: string | null;
};

export default function AdminPagesPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PageItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("rhn_admin_token");
    if (saved) { setToken(saved); setAuthed(true); }
  }, []);

  useEffect(() => { if (authed) load(); }, [authed]);

  const auth = async () => {
    const r = await fetch("/api/cms/pages?limit=1", { headers: { Authorization: `Bearer ${token}` } });
    const j = await r.json();
    if (j.ok) { sessionStorage.setItem("rhn_admin_token", token); setAuthed(true); }
    else alert("Token invalid");
  };

  const load = async () => {
    setLoading(true);
    const r = await fetch("/api/cms/pages", { headers: { Authorization: `Bearer ${token}` } });
    const j = await r.json();
    if (j.ok) setItems(j.items);
    setLoading(false);
  };

  const openEdit = (item: PageItem) => { setEditing({ ...item }); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const r = await fetch(`/api/cms/pages/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editing),
      });
      const j = await r.json();
      if (j.ok) { setMsg("Saved"); setEditing(null); load(); setTimeout(() => setMsg(""), 2000); }
      else alert(j.error || "Save failed");
    } finally { setSaving(false); }
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
          <div className="mb-6">
            <Link href="/admin/cms" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to CMS
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">Long-form Pages</h1>
            <p className="mt-1 text-sm text-muted-foreground">Edit About, Hainan and other long-form content blocks (HTML supported)</p>
          </div>

          {msg && <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary"><Check className="h-4 w-4" /> {msg}</div>}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground py-8">Loading...</div>
            ) : items.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-8">No pages yet.</div>
            ) : items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border bg-card p-5 hover:shadow-card">
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <code className="rounded bg-muted px-2 py-0.5 text-xs text-foreground">{item.slug}</code>
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{item.title_en}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{item.title_zh}</p>
                {item.updated_at && (
                  <p className="mb-3 text-xs text-muted-foreground">Updated: {new Date(item.updated_at).toLocaleString()}</p>
                )}
                <button onClick={() => openEdit(item)} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted">
                  <Pencil className="h-3 w-3" /> Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={save} className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-dialog">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">Edit: {editing.title_en}</h2>
                <code className="mt-1 inline-block rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">{editing.slug}</code>
              </div>
              <button type="button" onClick={() => setEditing(null)} className="rounded-full p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Title (EN)</label>
                <input value={editing.title_en} onChange={(e) => setEditing({ ...editing, title_en: e.target.value })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Title (ZH)</label>
                <input value={editing.title_zh} onChange={(e) => setEditing({ ...editing, title_zh: e.target.value })} className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Body (EN) — HTML supported</label>
                <textarea value={editing.body_en ?? ""} onChange={(e) => setEditing({ ...editing, body_en: e.target.value })} rows={18} className="w-full rounded-lg border border-border bg-muted px-3 py-2 font-mono text-sm text-foreground" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-foreground">Body (ZH) — HTML supported</label>
                <textarea value={editing.body_zh ?? ""} onChange={(e) => setEditing({ ...editing, body_zh: e.target.value })} rows={18} className="w-full rounded-lg border border-border bg-muted px-3 py-2 font-mono text-sm text-foreground" />
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
