"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

interface NewsForm {
	slug: string;
	title_en: string;
	title_zh: string;
	category: string;
	published_at: string;
	image_url: string;
	excerpt_en: string;
	excerpt_zh: string;
	body_en: string;
	body_zh: string;
	is_published: boolean;
	sort_order: number;
}

const EMPTY: NewsForm = {
	slug: "",
	title_en: "",
	title_zh: "",
	category: "News",
	published_at: new Date().toISOString().slice(0, 10),
	image_url: "",
	excerpt_en: "",
	excerpt_zh: "",
	body_en: "",
	body_zh: "",
	is_published: true,
	sort_order: 0,
};

export default function CmsNewsEditPage() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const isNew = params.id === "new";

	const [token, setToken] = useState("");
	const [form, setForm] = useState<NewsForm>(EMPTY);
	const [loading, setLoading] = useState(!isNew);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setToken(sessionStorage.getItem("rhn_admin_token") || "");
		}
	}, []);

	const load = useCallback(async () => {
		if (isNew || !token) return;
		try {
			const res = await fetch(`/api/cms/news/${params.id}?token=${encodeURIComponent(token)}`, { cache: "no-store" });
			const j = await res.json();
			if (j.ok) {
				const it = j.item;
				setForm({
					slug: it.slug || "",
					title_en: it.title_en || "",
					title_zh: it.title_zh || "",
					category: it.category || "News",
					published_at: (it.published_at || "").slice(0, 10) || new Date().toISOString().slice(0, 10),
					image_url: it.image_url || "",
					excerpt_en: it.excerpt_en || "",
					excerpt_zh: it.excerpt_zh || "",
					body_en: it.body_en || "",
					body_zh: it.body_zh || "",
					is_published: !!it.is_published,
					sort_order: it.sort_order || 0,
				});
			} else {
				setError(j.error || "加载失败");
			}
		} catch {
			setError("网络错误");
		} finally {
			setLoading(false);
		}
	}, [isNew, token, params.id]);

	useEffect(() => {
		load();
	}, [load]);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		setSaving(true);
		setError("");
		try {
			const payload = {
				...form,
				published_at: form.published_at ? new Date(form.published_at + "T00:00:00Z").toISOString() : new Date().toISOString(),
			};
			const url = isNew
				? `/api/cms/news?token=${encodeURIComponent(token)}`
				: `/api/cms/news/${params.id}?token=${encodeURIComponent(token)}`;
			const res = await fetch(url, {
				method: isNew ? "POST" : "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const j = await res.json();
			if (j.ok) {
				router.push("/admin/cms/news");
			} else {
				setError(j.error + (j.detail ? " · " + j.detail : ""));
			}
		} catch {
			setError("网络错误");
		} finally {
			setSaving(false);
		}
	}

	function upd<K extends keyof NewsForm>(k: K, v: NewsForm[K]) {
		setForm((prev) => ({ ...prev, [k]: v }));
	}

	if (!token) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Link href="/admin/cms" className="text-primary underline">请先登录</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-mist">
			<header className="bg-white border-b border-fog">
				<div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
					<Link href="/admin/cms/news" className="text-ink-gray hover:text-primary flex items-center gap-1">
						<ArrowLeft size={18} /> 返回列表
					</Link>
					<h1 className="text-lg font-bold text-foreground">{isNew ? "新建新闻" : "编辑新闻"}</h1>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-6 py-8">
				{loading ? (
					<div className="py-16 text-center text-ink-gray">加载中...</div>
				) : (
					<form onSubmit={submit} className="bg-white rounded-2xl shadow-card p-8 space-y-6">
						{error && <div className="bg-accent-coral/10 border border-accent-coral text-accent-coral rounded-lg px-4 py-3">{error}</div>}

						<div className="grid md:grid-cols-2 gap-4">
							<Field label="Slug（URL 路径，小写字母/数字/-）" required>
								<input
									required
									value={form.slug}
									onChange={(e) => upd("slug", e.target.value)}
									className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30"
									placeholder="e.g. entry-open-2026"
								/>
							</Field>
							<Field label="分类">
								<input
									value={form.category}
									onChange={(e) => upd("category", e.target.value)}
									className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30"
								/>
							</Field>
						</div>

						<Field label="英文标题" required>
							<input
								required
								value={form.title_en}
								onChange={(e) => upd("title_en", e.target.value)}
								className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
						</Field>

						<Field label="中文标题">
							<input
								value={form.title_zh}
								onChange={(e) => upd("title_zh", e.target.value)}
								className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
						</Field>

						<div className="grid md:grid-cols-2 gap-4">
							<Field label="发布日期">
								<input
									type="date"
									value={form.published_at}
									onChange={(e) => upd("published_at", e.target.value)}
									className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30"
								/>
							</Field>
							<Field label="排序（数字越大越靠前）">
								<input
									type="number"
									value={form.sort_order}
									onChange={(e) => upd("sort_order", parseInt(e.target.value || "0", 10))}
									className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30"
								/>
							</Field>
						</div>

						<Field label="封面图片 URL（可选，建议 /public 目录下路径如 /news-cover.jpg）">
							<input
								value={form.image_url}
								onChange={(e) => upd("image_url", e.target.value)}
								className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30"
								placeholder="/hero.jpg 或 https://..."
							/>
						</Field>

						<Field label="英文摘要（列表卡片显示）">
							<textarea
								value={form.excerpt_en}
								onChange={(e) => upd("excerpt_en", e.target.value)}
								rows={2}
								className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
							/>
						</Field>

						<Field label="中文摘要">
							<textarea
								value={form.excerpt_zh}
								onChange={(e) => upd("excerpt_zh", e.target.value)}
								rows={2}
								className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
							/>
						</Field>

						<Field label="英文正文（支持段落，使用空行分段）">
							<textarea
								value={form.body_en}
								onChange={(e) => upd("body_en", e.target.value)}
								rows={10}
								className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y font-mono text-sm"
							/>
						</Field>

						<Field label="中文正文">
							<textarea
								value={form.body_zh}
								onChange={(e) => upd("body_zh", e.target.value)}
								rows={10}
								className="w-full px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y font-mono text-sm"
							/>
						</Field>

						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={form.is_published}
								onChange={(e) => upd("is_published", e.target.checked)}
								className="w-4 h-4"
							/>
							<span className="text-sm">立即发布（取消勾选可保存为草稿）</span>
						</label>

						<div className="flex items-center justify-end gap-3 pt-4 border-t border-fog">
							<Link href="/admin/cms/news" className="px-5 py-2 rounded-lg text-ink-gray hover:text-foreground">
								取消
							</Link>
							<button
								type="submit"
								disabled={saving}
								className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-deep transition-colors disabled:opacity-50 flex items-center gap-2"
							>
								<Save size={16} /> {saving ? "保存中..." : "保存"}
							</button>
						</div>
					</form>
				)}
			</main>
		</div>
	);
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
	return (
		<label className="block">
			<span className="text-sm font-semibold text-foreground block mb-1.5">
				{label} {required && <span className="text-accent-coral">*</span>}
			</span>
			{children}
		</label>
	);
}
