import { notFound } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import { getSupabaseClient } from "@/storage/database/supabase-client";

export const dynamic = "force-dynamic";

// Same slides as homepage hero carousel
const heroSlides = [
	{ src: "/hero.jpg", alt: "Round Hainan Regatta hero" },
	{ src: "/carousel-2.jpg", alt: "Sailing boats at sunset" },
	{ src: "/carousel-3.jpg", alt: "Racing yachts in open water" },
	{ src: "/carousel-4.jpg", alt: "Hainan coastline sailing" },
];

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

	const cookieStore = await cookies();
	const lang = cookieStore.get("rhn-lang")?.value || "en";

	const title = lang === "zh" && item.title_zh ? item.title_zh : item.title_en;
	const excerpt = lang === "zh" && item.excerpt_zh ? item.excerpt_zh : item.excerpt_en || "";
	const bodyHtml = lang === "zh" && item.body_zh ? item.body_zh : item.body_en || "";

	return (
		<>
			<Navbar />
			<main className="min-h-screen">
				{/* Hero with Carousel */}
				<section className="relative h-[60vh] min-h-[480px]">
					<HeroCarousel slides={heroSlides} interval={5000} className="h-full">
						<div className="relative z-[3] flex h-full flex-col items-center justify-center px-4 text-center">
							<div className="max-w-4xl mx-auto">
								<Link
									href="/news"
									className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm"
								>
									<ArrowLeft size={16} /> {lang === "zh" ? "返回新闻" : "Back to News"}
								</Link>
								<div className="flex flex-wrap items-center justify-center gap-3 mb-4 text-sm">
									<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-gold text-primary-deep font-semibold">
										<Tag size={12} /> {item.category}
									</span>
									<span className="inline-flex items-center gap-1 text-white/80">
										<Calendar size={14} /> {new Date(item.published_at).toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
									</span>
								</div>
								<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">{title}</h1>
								{excerpt && <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">{excerpt}</p>}
							</div>
						</div>
					</HeroCarousel>
				</section>

				{/* Body */}
				<section className="py-16 md:py-24">
					<div className="max-w-3xl mx-auto px-6 prose prose-lg">
						{bodyHtml ? (
							<div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
						) : (
							<p className="text-ink-gray italic">No content.</p>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
