"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Save, Mail, Phone, MapPin, Globe } from "lucide-react";

interface ContactItem {
	id?: string;
	section: string;
	title_en: string | null;
	title_zh: string | null;
	content_en: string | null;
	content_zh: string | null;
	email: string | null;
	phone: string | null;
	address_en: string | null;
	address_zh: string | null;
	social_links: Record<string, string> | null;
	sort_order: number;
	is_published: boolean;
}

const SECTION_LABELS: Record<string, string> = {
	hero: "页面头部",
	office: "赛事办公室",
	technical: "技术代表",
	registration: "报名支持",
	media: "媒体与新闻",
};

export default function CmsContactPage() {
	const [token, setToken] = useState("");
	const [items, setItems] = useState<ContactItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [ok, setOk] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const saved = sessionStorage.getItem("rhn_admin_token") || "";
			setToken(saved);
		}
	}, []);

	const load = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/cms/contact", { cache: "no-store" });
			const j = await res.json();
			if (j.ok) {
				setItems(j.items || []);
			} else {
				setError(j.error || "加载失败");
			}
		} catch {
			setError("网络错误");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	function updItem(idx: number, patch: Partial<ContactItem>) {
		setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
	}

	async function save() {
		if (!token) {
			setError("请先登录：返回 CMS 首页输入管理员 Token");
			return;
		}
		setSaving(true);
		setError("");
		setOk("");
		try {
			const res = await fetch(`/api/cms/contact?token=${encodeURIComponent(token)}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ items }),
			});
			const j = await res.json();
			if (j.ok) {
				setOk(`已保存 ${j.count} 条记录`);
				setItems(j.items || items);
				setTimeout(() => setOk(""), 3000);
			} else {
				setError(j.error + (j.detail ? " · " + j.detail : ""));
			}
		} catch {
			setError("网络错误");
		} finally {
			setSaving(false);
		}
	}

	return (
		<div className="min-h-screen bg-mist">
			<header className="bg-white border-b border-fog sticky top-0 z-10">
				<div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Link href="/admin/cms" className="text-ink-gray hover:text-primary flex items-center gap-1">
							<ArrowLeft size={18} /> 返回
						</Link>
						<h1 className="text-lg font-bold text-foreground">Contact 页面管理</h1>
					</div>
					<button
						onClick={save}
						disabled={saving}
						className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-deep transition-colors disabled:opacity-50 flex items-center gap-1"
					>
						<Save size={16} /> {saving ? "保存中..." : "保存全部"}
					</button>
				</div>
			</header>

			<main className="max-w-5xl mx-auto px-6 py-8">
				{error && <div className="bg-accent-coral/10 border border-accent-coral text-accent-coral rounded-lg px-4 py-3 mb-4">{error}</div>}
				{ok && <div className="bg-primary/10 border border-primary text-primary rounded-lg px-4 py-3 mb-4">{ok}</div>}

				<div className="bg-white rounded-2xl shadow-card p-4 mb-6">
					<p className="text-sm text-ink-gray">
						编辑 Contact 页面的所有内容。修改后点击"保存全部"即可生效，前台页面会实时显示最新内容。
					</p>
				</div>

				{loading ? (
					<div className="py-16 text-center text-ink-gray">加载中...</div>
				) : (
					<div className="space-y-6">
						{items.map((it, idx) => (
							<div key={it.id || idx} className="bg-white rounded-2xl shadow-card p-6 space-y-4">
								<div className="flex items-center justify-between pb-3 border-b border-fog">
									<div className="flex items-center gap-2">
										<span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-semibold uppercase">
											{SECTION_LABELS[it.section] || it.section}
										</span>
										<span className="text-xs text-ink-gray">{it.section}</span>
									</div>
									<label className="flex items-center gap-2 text-sm">
										<input
											type="checkbox"
											checked={it.is_published !== false}
											onChange={(e) => updItem(idx, { is_published: e.target.checked })}
											className="rounded border-fog"
										/>
										<span className="text-ink-gray">发布</span>
									</label>
								</div>

								<div className="grid md:grid-cols-2 gap-4">
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide">标题 (EN)</span>
										<input
											value={it.title_en || ""}
											onChange={(e) => updItem(idx, { title_en: e.target.value })}
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
										/>
									</label>
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide">标题 (中文)</span>
										<input
											value={it.title_zh || ""}
											onChange={(e) => updItem(idx, { title_zh: e.target.value })}
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
										/>
									</label>
								</div>

								<div className="grid md:grid-cols-2 gap-4">
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide">内容 (EN)</span>
										<textarea
											value={it.content_en || ""}
											onChange={(e) => updItem(idx, { content_en: e.target.value })}
											rows={3}
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-y"
										/>
									</label>
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide">内容 (中文)</span>
										<textarea
											value={it.content_zh || ""}
											onChange={(e) => updItem(idx, { content_zh: e.target.value })}
											rows={3}
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-y"
										/>
									</label>
								</div>

								<div className="grid md:grid-cols-2 gap-4">
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide flex items-center gap-1">
											<Mail size={12} /> 邮箱
										</span>
										<input
											value={it.email || ""}
											onChange={(e) => updItem(idx, { email: e.target.value })}
											placeholder="example@hnoceanrace.com"
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
										/>
									</label>
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide flex items-center gap-1">
											<Phone size={12} /> 电话
										</span>
										<input
											value={it.phone || ""}
											onChange={(e) => updItem(idx, { phone: e.target.value })}
											placeholder="+86 898 8888 8888"
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
										/>
									</label>
								</div>

								<div className="grid md:grid-cols-2 gap-4">
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide flex items-center gap-1">
											<MapPin size={12} /> 地址 (EN)
										</span>
										<input
											value={it.address_en || ""}
											onChange={(e) => updItem(idx, { address_en: e.target.value })}
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
										/>
									</label>
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide flex items-center gap-1">
											<MapPin size={12} /> 地址 (中文)
										</span>
										<input
											value={it.address_zh || ""}
											onChange={(e) => updItem(idx, { address_zh: e.target.value })}
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
										/>
									</label>
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
