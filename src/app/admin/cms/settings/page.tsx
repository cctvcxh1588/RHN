"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";

interface SettingItem {
	key: string;
	value_en: string | null;
	value_zh: string | null;
	description: string | null;
}

export default function CmsSettingsPage() {
	const [token, setToken] = useState("");
	const [items, setItems] = useState<SettingItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [ok, setOk] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setToken(sessionStorage.getItem("rhn_admin_token") || "");
		}
	}, []);

	const load = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/cms/settings", { cache: "no-store" });
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
		if (token) load();
	}, [token, load]);

	function updItem(idx: number, patch: Partial<SettingItem>) {
		setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
	}

	function addNew() {
		setItems((prev) => [...prev, { key: "", value_en: "", value_zh: "", description: "" }]);
	}

	function removeItem(idx: number) {
		if (!confirm("确认删除这条设置？")) return;
		setItems((prev) => prev.filter((_, i) => i !== idx));
	}

	async function save() {
		setSaving(true);
		setError("");
		setOk("");
		try {
			const cleaned = items.filter((i) => i.key.trim().length > 0);
			const res = await fetch(`/api/cms/settings?token=${encodeURIComponent(token)}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ items: cleaned }),
			});
			const j = await res.json();
			if (j.ok) {
				setOk(`已保存 ${j.count} 条设置`);
				setItems(j.items || cleaned);
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

	if (!token) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Link href="/admin/cms" className="text-primary underline">请先登录</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-mist">
			<header className="bg-white border-b border-fog sticky top-0 z-10">
				<div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Link href="/admin/cms" className="text-ink-gray hover:text-primary flex items-center gap-1">
							<ArrowLeft size={18} /> 返回
						</Link>
						<h1 className="text-lg font-bold text-foreground">站点设置</h1>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={addNew}
							className="px-3 py-2 rounded-lg text-sm text-primary hover:bg-primary/10 flex items-center gap-1"
						>
							<Plus size={16} /> 添加
						</button>
						<button
							onClick={save}
							disabled={saving}
							className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-deep transition-colors disabled:opacity-50 flex items-center gap-1"
						>
							<Save size={16} /> {saving ? "保存中..." : "保存全部"}
						</button>
					</div>
				</div>
			</header>

			<main className="max-w-5xl mx-auto px-6 py-8">
				{error && <div className="bg-accent-coral/10 border border-accent-coral text-accent-coral rounded-lg px-4 py-3 mb-4">{error}</div>}
				{ok && <div className="bg-primary/10 border border-primary text-primary rounded-lg px-4 py-3 mb-4">{ok}</div>}

				<div className="bg-white rounded-2xl shadow-card p-4 mb-4">
					<p className="text-sm text-ink-gray">
						以下键值将影响网站显示。前台会优先使用 CMS 中的值，若为空则回退到代码默认值。
					</p>
					<p className="text-xs text-ink-gray mt-2">
						u7ffbu8bd1u952eu683cu5f0f: <code className="bg-fog px-1 rounded">nav_home</code>{" "}
						<code className="bg-fog px-1 rounded">footer_quicklinks</code>{" "}
						<code className="bg-fog px-1 rounded">common_register</code>
						<br />
						u8bbeu7f6eu952e: <code className="bg-fog px-1 rounded">hero_tagline</code>{" "}
						<code className="bg-fog px-1 rounded">hero_subtitle</code>{" "}
						<code className="bg-fog px-1 rounded">hero_badge</code>{" "}
						<code className="bg-fog px-1 rounded">contact_email</code>{" "}
						<code className="bg-fog px-1 rounded">contact_phone</code>
					</p>
				</div>

				{loading ? (
					<div className="py-16 text-center text-ink-gray">加载中...</div>
				) : (
					<div className="space-y-4">
						{items.map((it, idx) => (
							<div key={idx} className="bg-white rounded-2xl shadow-card p-6 space-y-3">
								<div className="grid md:grid-cols-2 gap-3">
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide">Key</span>
										<input
											value={it.key}
											onChange={(e) => updItem(idx, { key: e.target.value })}
											placeholder="例如 hero_tagline"
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono text-sm"
										/>
									</label>
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide">描述（可选）</span>
										<input
											value={it.description || ""}
											onChange={(e) => updItem(idx, { description: e.target.value })}
											placeholder="给自己看的说明文字"
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
										/>
									</label>
								</div>

								<div className="grid md:grid-cols-2 gap-3">
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide">EN Value</span>
										<textarea
											value={it.value_en || ""}
											onChange={(e) => updItem(idx, { value_en: e.target.value })}
											rows={3}
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-y"
										/>
									</label>
									<label className="block">
										<span className="text-xs font-semibold text-ink-gray uppercase tracking-wide">中文值</span>
										<textarea
											value={it.value_zh || ""}
											onChange={(e) => updItem(idx, { value_zh: e.target.value })}
											rows={3}
											className="w-full mt-1 px-3 py-2 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-y"
										/>
									</label>
								</div>

								<div className="flex justify-end pt-2 border-t border-fog/60">
									<button
										onClick={() => removeItem(idx)}
										className="text-accent-coral hover:opacity-80 text-xs flex items-center gap-1"
									>
										<Trash2 size={14} /> 删除此项
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
