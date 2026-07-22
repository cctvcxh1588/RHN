"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText, Settings2, Users, Home, LogOut, ExternalLink, Calendar, Trophy, MapPin, FileStack, Image, Mail } from "lucide-react";

export default function CmsDashboardPage() {
	const [token, setToken] = useState("");
	const [inputToken, setInputToken] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const t = typeof window !== "undefined" ? sessionStorage.getItem("rhn_admin_token") || "" : "";
		setToken(t);
	}, []);

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		if (!inputToken.trim()) return;
		try {
			const res = await fetch("/api/cms/news?token=" + encodeURIComponent(inputToken) + "&limit=1", { cache: "no-store" });
			if (res.ok) {
				sessionStorage.setItem("rhn_admin_token", inputToken.trim());
				setToken(inputToken.trim());
				setError("");
			} else {
				setError("Token 无效，请重试");
			}
		} catch {
			setError("网络错误");
		}
	}

	function logout() {
		sessionStorage.removeItem("rhn_admin_token");
		setToken("");
	}

	if (!token) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-mist p-6">
				<form onSubmit={handleLogin} className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 space-y-5">
					<div>
						<h1 className="text-2xl font-display font-bold text-foreground">CMS 内容管理</h1>
						<p className="text-sm text-ink-gray mt-1">Round Hainan Regatta 2026</p>
					</div>
					<input
						type="password"
						value={inputToken}
						onChange={(e) => setInputToken(e.target.value)}
						placeholder="管理员 Token"
						className="w-full px-4 py-3 rounded-lg border border-fog focus:outline-none focus:ring-2 focus:ring-primary/30"
						autoFocus
					/>
					{error && <p className="text-sm text-accent-coral">{error}</p>}
					<button
						type="submit"
						className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-deep transition-colors"
					>
						登录 · Sign In
					</button>
				</form>
			</div>
		);
	}

	const cards = [
		{ href: "/admin/cms/news", icon: FileText, title: "新闻管理", subtitle: "News", desc: "发布、编辑、删除新闻文章" },
		{ href: "/admin/cms/contact", icon: Mail, title: "联系页面", subtitle: "Contact", desc: "编辑联系方式、地址、社交链接" },
		{ href: "/admin/cms/settings", icon: Settings2, title: "站点设置", subtitle: "Settings", desc: "首页标语、联系方式、全局配置" },
		{ href: "/admin/cms/schedule", icon: Calendar, title: "赛程管理", subtitle: "Schedule", desc: "8 天赛程表，逐日编辑" },
		{ href: "/admin/cms/classes", icon: Trophy, title: "组别管理", subtitle: "Classes", desc: "4 个组别卡片，增删改" },
		{ href: "/admin/cms/waypoints", icon: MapPin, title: "航点管理", subtitle: "Waypoints", desc: "航线航点顺序与坐标" },
		{ href: "/admin/cms/pages", icon: FileStack, title: "长页内容", subtitle: "Pages", desc: "About / Hainan 等长文内容" },
		{ href: "/admin/registrations", icon: Users, title: "报名管理", subtitle: "Registrations", desc: "查看船队报名、导出 CSV" },
		{ href: "/admin/cms/gallery", icon: Image, title: "图库管理", subtitle: "Photo Gallery", desc: "上传/管理 Photo Gallery 图片" },
	];

	return (
		<div className="min-h-screen bg-mist">
			<header className="bg-white border-b border-fog">
				<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
					<div>
						<h1 className="text-xl font-display font-bold text-foreground">CMS 内容管理</h1>
						<p className="text-xs text-ink-gray">Round Hainan Regatta 2026</p>
					</div>
					<div className="flex items-center gap-3">
						<Link href="/" className="text-sm text-ink-gray hover:text-primary flex items-center gap-1">
							<Home size={16} /> 前往站点
						</Link>
						<button onClick={logout} className="text-sm text-ink-gray hover:text-accent-coral flex items-center gap-1">
							<LogOut size={16} /> 退出
						</button>
					</div>
				</div>
			</header>

			<main className="max-w-6xl mx-auto px-6 py-10">
				<h2 className="text-3xl font-display font-bold text-foreground mb-2">仪表盘</h2>
				<p className="text-ink-gray mb-8">选择要管理的内容模块</p>

				<div className="grid md:grid-cols-3 gap-5">
					{cards.map((c) => (
						<Link
							key={c.href}
							href={c.href}
							className="group bg-white rounded-2xl shadow-card hover:shadow-float transition-all p-6 border border-transparent hover:border-primary/20"
						>
							<div className="flex items-start justify-between mb-4">
								<div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
									<c.icon size={24} />
								</div>
								<ExternalLink size={16} className="text-ink-gray group-hover:text-primary" />
							</div>
							<h3 className="text-lg font-bold text-foreground">{c.title}</h3>
							<p className="text-xs text-ink-gray mb-2">{c.subtitle}</p>
							<p className="text-sm text-ink-gray">{c.desc}</p>
						</Link>
					))}
				</div>

				<div className="mt-10 bg-white rounded-2xl p-6 shadow-card">
					<h3 className="font-bold text-foreground mb-3">使用说明</h3>
					<ul className="text-sm text-ink-gray space-y-2 list-disc pl-5">
						<li>新闻发布后立即出现在网站新闻列表页</li>
						<li>站点设置修改会影响首页 Hero 区域与联系信息</li>
						<li>所有变更即时生效，无需部署</li>
						<li>Token 已存入浏览器 SessionStorage，关闭标签页后需重新登录</li>
					</ul>
				</div>
			</main>
		</div>
	);
}
