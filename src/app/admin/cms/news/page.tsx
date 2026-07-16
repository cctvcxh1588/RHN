"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

interface NewsItem {
	id: string;
	slug: string;
	title_en: string;
	title_zh: string | null;
	category: string;
	published_at: string;
	is_published: boolean;
	image_url: string | null;
	excerpt_en: string | null;
}

export default function CmsNewsListPage() {
	const [token, setToken] = useState("");
	const [items, setItems] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setToken(sessionStorage.getItem("rhn_admin_token") || "");
		}
	}, []);

	const load = useCallback(async () => {
		if (!token) return;
		setLoading(true);
		try {
			const res = await fetch("/api/cms/news?token=" + encodeURIComponent(token) + "&limit=200", { cache: "no-store" });
			const j = await res.json();
			if (j.ok) {
				setItems(j.items || []);
				setError("");
			} else {
				setError(j.error || "加载失败");
			}
		} catch {
			setError("网络错误");
		} finally {
			setLoading(false);
		}
	}, [token]);

	useEffect(() => {
		load();
	}, [load]);

	async function del(id: string) {
		if (!confirm("确认删除这条新闻？此操作不可恢复。")) return;
		const res = await fetch(`/api/cms/news/${id}?token=${encodeURIComponent(token)}`, { method: "DELETE" });
		const j = await res.json();
		if (j.ok) {
			setItems((prev) => prev.filter((x) => x.id !== id));
		} else {
			alert("删除失败：" + (j.error || ""));
		}
	}

	async function togglePublish(item: NewsItem) {
		const res = await fetch(`/api/cms/news/${item.id}?token=${encodeURIComponent(token)}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ is_published: !item.is_published }),
		});
		const j = await res.json();
		if (j.ok) load();
		else alert("更新失败");
	}

	if (!token) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<p className="mb-4">请先登录</p>
					<Link href="/admin/cms" className="text-primary underline">前往登录</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-mist">
			<header className="bg-white border-b border-fog">
				<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Link href="/admin/cms" className="text-ink-gray hover:text-primary flex items-center gap-1">
							<ArrowLeft size={18} /> 返回
						</Link>
						<h1 className="text-lg font-bold text-foreground">新闻管理</h1>
					</div>
					<Link
						href="/admin/cms/news/new"
						className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-deep transition-colors flex items-center gap-1"
					>
						<Plus size={16} /> 新建新闻
					</Link>
				</div>
			</header>

			<main className="max-w-6xl mx-auto px-6 py-8">
				{error && <div className="bg-accent-coral/10 border border-accent-coral text-accent-coral rounded-lg px-4 py-3 mb-4">{error}</div>}
				{loading ? (
					<div className="py-16 text-center text-ink-gray">加载中...</div>
				) : items.length === 0 ? (
					<div className="bg-white rounded-2xl p-12 text-center shadow-card">
						<p className="text-ink-gray mb-4">还没有新闻，点击右上角「新建新闻」开始</p>
						<Link href="/admin/cms/news/new" className="text-primary underline text-sm">立即创建</Link>
					</div>
				) : (
					<div className="bg-white rounded-2xl shadow-card overflow-hidden">
						<table className="w-full text-sm">
							<thead className="bg-fog/50">
								<tr>
									<th className="text-left p-4 font-semibold">标题</th>
									<th className="text-left p-4 font-semibold hidden md:table-cell">分类</th>
									<th className="text-left p-4 font-semibold hidden md:table-cell">发布时间</th>
									<th className="text-left p-4 font-semibold">状态</th>
									<th className="text-right p-4 font-semibold">操作</th>
								</tr>
							</thead>
							<tbody>
								{items.map((it) => (
									<tr key={it.id} className="border-t border-fog/60">
										<td className="p-4">
											<div className="font-semibold text-foreground">{it.title_en}</div>
											{it.title_zh && <div className="text-xs text-ink-gray mt-0.5">{it.title_zh}</div>}
											<div className="text-xs text-ink-gray mt-1">/news/cms/{it.slug}</div>
										</td>
										<td className="p-4 hidden md:table-cell text-ink-gray">{it.category}</td>
										<td className="p-4 hidden md:table-cell text-ink-gray whitespace-nowrap">
											{new Date(it.published_at).toLocaleDateString("zh-CN")}
										</td>
										<td className="p-4">
											<button
												onClick={() => togglePublish(it)}
												className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${it.is_published ? "bg-primary/10 text-primary" : "bg-fog text-ink-gray"}`}
												title={it.is_published ? "点击下线" : "点击发布"}
											>
												{it.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
												{it.is_published ? "已发布" : "未发布"}
											</button>
										</td>
										<td className="p-4 text-right whitespace-nowrap">
											<Link
												href={`/admin/cms/news/${it.id}`}
												className="inline-flex items-center gap-1 text-primary hover:text-primary-deep text-xs px-2 py-1"
											>
												<Edit size={14} /> 编辑
											</Link>
											<button
												onClick={() => del(it.id)}
												className="inline-flex items-center gap-1 text-accent-coral hover:opacity-80 text-xs px-2 py-1 ml-1"
											>
												<Trash2 size={14} /> 删除
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</main>
		</div>
	);
}
