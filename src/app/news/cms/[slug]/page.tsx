import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSupabaseClient } from "@/storage/database/supabase-client";

export const dynamic = "force-dynamic";

interface NewsRow {
	id: string;
	slug: string;
	title_en: string;
	title_zh: string | null;
	category: string;
	published_at: string;
	image_url: string | null;
	excerpt_en: string | null;
	excerpt_zh: string | null;
	body_en: string | null;
	body_zh: string | null;
	is_published: boolean;
}

async function getNews(slug: string): Promise<NewsRow | null> {
	try {
		const supabase = await getSupabaseClient();
		const { data, error } = await supabase
			.from("cms_news")
			.select("*")
			.eq("slug", slug)
			.eq("is_published", true)
			.maybeSingle();
		if (error) throw error;
		return (data as NewsRow) || null;
	} catch {
		return null;
	}
}

export default async function CmsNewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const item = await getNews(slug);
	if (!item) notFound();

	const title = item.title_en;
	const titleZh = item.title_zh;
	const excerpt = item.excerpt_en || "";
	const bodyHtml = item.body_en || "";
	const bodyZhHtml = item.body_zh || "";

	return (
		<>
			<Navbar />
			<main className="min-h-screen">
				{/* Hero */}
				<section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-primary-deep to-primary text-white">
					<div className="absolute inset-0 opacity-30">
						{item.image_url && (
							<Image src={item.image_url} alt={title} fill className="object-cover" priority />
						)}
					</div>
					<div className="relative max-w-4xl mx-auto px-6">
						<Link
							href="/news"
							className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm"
						>
							<ArrowLeft size={16} /> Back to News
						</Link>
						<div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
							<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-gold text-primary-deep font-semibold">
								<Tag size={12} /> {item.category}
							</span>
							<span className="inline-flex items-center gap-1 text-white/80">
								<Calendar size={14} /> {new Date(item.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
							</span>
						</div>
						<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{title}</h1>
						{titleZh && <p className="mt-3 text-xl md:text-2xl text-white/80">{titleZh}</p>}
						{excerpt && <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-3xl">{excerpt}</p>}
					</div>
				</section>

				{/* Body */}
				<section className="py-16 md:py-24">
					<div className="max-w-3xl mx-auto px-6 prose prose-lg">
						{bodyHtml ? (
							<div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
						) : (
							<p className="text-ink-gray italic">No content.</p>
						)}
						{bodyZhHtml && (
							<div className="mt-12 pt-8 border-t border-fog">
								<h3 className="font-display text-2xl font-bold text-foreground mb-4">中文版</h3>
								<div dangerouslySetInnerHTML={{ __html: bodyZhHtml }} />
							</div>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
