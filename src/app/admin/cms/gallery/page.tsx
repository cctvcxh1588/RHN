"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ArrowLeft,
  Check,
  ImageIcon,
  Upload,
} from "lucide-react";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: string;
  sort_order: number;
  created_at: string | null;
};

const CATEGORIES = ["racing", "scenery", "ceremony", "venue"] as const;

const EMPTY_FORM = {
  src: "",
  alt: "",
  category: "racing" as string,
  sort_order: 0,
};

export default function AdminGalleryPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Add form state
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  // Edit state (inline editing)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    alt: string;
    category: string;
    sort_order: number;
  }>({ alt: "", category: "racing", sort_order: 0 });

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
    const r = await fetch("/api/cms/gallery?limit=1", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const j = await r.json();
    if (j.ok) {
      sessionStorage.setItem("rhn_admin_token", token);
      setAuthed(true);
    } else {
      alert("Token invalid");
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/cms/gallery", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const j = await r.json();
      if (j.ok) setItems(j.items || []);
    } catch {
      /* handled by empty state */
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.src.trim() || !form.alt.trim()) return;
    setSaving(true);
    try {
      const r = await fetch("/api/cms/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          src: form.src.trim(),
          alt: form.alt.trim(),
          category: form.category,
          sort_order: form.sort_order,
        }),
      });
      const j = await r.json();
      if (j.ok) {
        setMsg("Image added successfully");
        setForm(EMPTY_FORM);
        setShowForm(false);
        load();
        setTimeout(() => setMsg(""), 2500);
      } else {
        alert(j.error || "Failed to add image");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Delete image "${item.alt}"? This cannot be undone.`)) return;
    const r = await fetch(`/api/cms/gallery?id=${encodeURIComponent(item.id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const j = await r.json();
    if (j.ok) {
      setMsg("Image deleted");
      setItems((prev) => prev.filter((x) => x.id !== item.id));
      setTimeout(() => setMsg(""), 2500);
    } else {
      alert(j.error || "Failed to delete image");
    }
  };

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditForm({
      alt: item.alt,
      category: item.category,
      sort_order: item.sort_order,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (item: GalleryItem) => {
    if (!editForm.alt.trim()) return;
    setSaving(true);
    try {
      const r = await fetch(`/api/cms/gallery?id=${encodeURIComponent(item.id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alt: editForm.alt.trim(),
          category: editForm.category,
          sort_order: editForm.sort_order,
        }),
      });
      const j = await r.json();
      if (j.ok) {
        setMsg("Image updated");
        setEditingId(null);
        load();
        setTimeout(() => setMsg(""), 2500);
      } else {
        alert(j.error || "Failed to update image");
      }
    } finally {
      setSaving(false);
    }
  };

  // Helper for image upload: copy URL to clipboard
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const fd = new FormData();
    fd.append("file", f);
    const r = await fetch("/api/upload", { method: "POST", body: fd });
    const j = await r.json();
    if (j.ok) {
      setForm((prev) => ({ ...prev, src: j.url }));
      alert("Image URL copied to clipboard:\n" + j.url);
    } else {
      alert(j.error || "Upload failed");
    }
    e.target.value = "";
  };

  const categoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      racing: "Racing",
      scenery: "Scenery",
      ceremony: "Ceremony",
      venue: "Venue",
    };
    return labels[cat] || cat;
  };

  if (!authed) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-32 pb-20">
          <div className="mx-auto max-w-md px-6">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <h1 className="mb-6 font-display text-2xl font-bold text-foreground">
                CMS Login
              </h1>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && auth()}
                placeholder="Admin token"
                className="mb-4 w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground"
              />
              <button
                onClick={auth}
                className="w-full rounded-lg bg-primary py-3 font-semibold text-on-primary"
              >
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
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Link
                href="/admin/cms"
                className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back to CMS
              </Link>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Gallery
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage gallery images for the regatta site
              </p>
            </div>
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary"
            >
              <Plus className="h-4 w-4" />{" "}
              {showForm ? "Cancel" : "Add Image"}
            </button>
          </div>

          {/* Success notification */}
          {msg && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
              <Check className="h-4 w-4" /> {msg}
            </div>
          )}

          {/* Add Image Form */}
          {showForm && (
            <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="mb-4 font-display text-xl font-bold text-foreground">
                Add New Image
              </h2>
              <form onSubmit={handleAdd} className="space-y-4">
                {/* Image URL */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Image URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={form.src}
                      onChange={(e) =>
                        setForm({ ...form, src: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      required
                      className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id="gallery-upload"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="gallery-upload"
                      className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted"
                    >
                      <Upload className="h-4 w-4" /> Upload
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Upload an image first, then the URL will be pasted. Or paste
                    an external image URL directly.
                  </p>
                </div>

                {/* Alt Text */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={form.alt}
                    onChange={(e) =>
                      setForm({ ...form, alt: e.target.value })
                    }
                    placeholder="Describe the image"
                    required
                    className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
                  />
                </div>

                {/* Category + Sort Order row */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {categoryLabel(cat)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={form.sort_order}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          sort_order: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setForm(EMPTY_FORM);
                    }}
                    className="rounded-lg border border-border px-4 py-2 text-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary"
                  >
                    <Save className="h-4 w-4" />{" "}
                    {saving ? "Adding..." : "Add Image"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="py-16 text-center text-muted-foreground">
              Loading...
            </div>
          )}

          {/* Empty state */}
          {!loading && items.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-card">
              <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-lg font-semibold text-foreground">
                No images yet
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                Click "Add Image" to upload the first gallery image.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-on-primary"
              >
                <Plus className="h-4 w-4" /> Add Image
              </button>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && items.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-float"
                >
                  {/* Image preview */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).parentElement!.classList.add(
                          "flex",
                          "items-center",
                          "justify-center"
                        );
                        (e.target as HTMLImageElement).parentElement!.innerHTML =
                          '<svg class="h-10 w-10 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                      }}
                    />

                    {/* Delete button overlay */}
                    <button
                      onClick={() => handleDelete(item)}
                      className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-lg bg-destructive/80 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-destructive group-hover:opacity-100"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>

                    {/* Category badge */}
                    <span className="absolute left-2 bottom-2 rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                      {categoryLabel(item.category)}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    {editingId === item.id ? (
                      /* Inline edit mode */
                      <div className="space-y-3">
                        <div>
                          <label className="mb-0.5 block text-xs font-medium text-muted-foreground">
                            Alt Text
                          </label>
                          <input
                            type="text"
                            value={editForm.alt}
                            onChange={(e) =>
                              setEditForm({ ...editForm, alt: e.target.value })
                            }
                            className="w-full rounded-md border border-border bg-muted px-2 py-1.5 text-sm text-foreground"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="mb-0.5 block text-xs font-medium text-muted-foreground">
                              Category
                            </label>
                            <select
                              value={editForm.category}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  category: e.target.value,
                                })
                              }
                              className="w-full rounded-md border border-border bg-muted px-2 py-1.5 text-sm text-foreground"
                            >
                              {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                  {categoryLabel(cat)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="mb-0.5 block text-xs font-medium text-muted-foreground">
                              Sort Order
                            </label>
                            <input
                              type="number"
                              value={editForm.sort_order}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  sort_order: parseInt(e.target.value) || 0,
                                })
                              }
                              className="w-full rounded-md border border-border bg-muted px-2 py-1.5 text-sm text-foreground"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={cancelEdit}
                            className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-muted"
                          >
                            <X className="h-3 w-3" /> Cancel
                          </button>
                          <button
                            onClick={() => saveEdit(item)}
                            disabled={saving}
                            className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs text-on-primary"
                          >
                            <Save className="h-3 w-3" />{" "}
                            {saving ? "..." : "Save"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display mode */
                      <>
                        <p className="mb-2 text-sm font-medium text-foreground line-clamp-2">
                          {item.alt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Sort: {item.sort_order}
                          </span>
                          <button
                            onClick={() => startEdit(item)}
                            className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-muted"
                          >
                            <Pencil className="h-3 w-3" /> Edit
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}