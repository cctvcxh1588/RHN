"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { useLang } from "@/lib/LanguageProvider";
import { Feather, Palette, Music, CalendarDays, Sparkles, ArrowLeft, Loader2 } from "lucide-react";

interface CmsPageItem {
    id: string;
    slug: string;
    title_en: string;
    title_zh: string;
    eyebrow_en: string;
    eyebrow_zh: string;
    subtitle_en: string;
    subtitle_zh: string;
    body_en: string;
    body_zh: string;
    hero_image_url: string;
}

export default function CulturePage() {
    const { lang } = useLang();
    const [cmsItem, setCmsItem] = useState<CmsPageItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/api/cms/pages?slug=hainan-culture")
            .then((res) => res.json())
            .then((data) => {
                if (data.ok && data.items && data.items.length > 0) {
                    setCmsItem(data.items[0]);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    const liTraits = [{
        icon: Palette,
        title: "Li Brocade (黎锦)",
        desc: "Woven on backstrap looms for more than 3,000 years, Li brocade is one of China&apos;s oldest textile arts. In 2009 UNESCO inscribed Li traditional textile techniques on the List of Intangible Cultural Heritage in Urgent Need of Safeguarding."
    }, {
        icon: Feather,
        title: "Face &amp; Body Tattoos",
        desc: "Historically, Li women received intricate hand-tapped tattoos as a rite of passage. Today the tradition is largely preserved in memory and museums — the surviving elders are living archives of a vanishing art."
    }, {
        icon: Music,
        title: "Bamboo Dance (竹竿舞)",
        desc: "A rhythmic dance in which dancers hop between clapping bamboo poles. Originally a harvest celebration, it has become one of Hainan&apos;s most iconic performing arts, taught in schools across the island."
    }];

    const miaoTraits = [{
        icon: Sparkles,
        title: "Silver Artistry",
        desc: "Miao silversmiths handcraft elaborate headdresses, collars and bracelets. A traditional Miao festival costume can carry several kilograms of silver — a wearable family fortune."
    }, {
        icon: Palette,
        title: "Embroidery &amp; Batik",
        desc: "Miao embroidery encodes migration histories and ancestral stories in geometric patterns — the fabric itself becomes a written record for a people whose language has no traditional script."
    }, {
        icon: Music,
        title: "Lusheng &amp; Folk Song",
        desc: "The lusheng (a bamboo mouth organ) and antiphonal love songs are central to Miao courtship and celebration, echoing across the mountain villages of central Hainan."
    }];

    const sites = [{
        name: "Betel Nut Valley 槟榔谷",
        subtitle: "Baoting · Indigenous Cultural Village",
        desc: "Hainan&apos;s premier living museum of Li and Miao culture. Wander through traditional boat-shaped thatched houses, watch brocade weaving demonstrations, and see the last generation of tattooed Li grandmothers.",
        image: "/binglanggu.jpg"
    }, {
        name: "Wuzhi Mountain 五指山",
        subtitle: "Sacred Peak · 1,867 m",
        desc: "The &ldquo;Five-Finger Mountain&rdquo; is the tallest peak in Hainan and the spiritual heart of the Li people, who believe their ancestors emerged from its slopes. Rainforest hikes reveal rare orchids and endemic wildlife.",
        image: "/hainan-wuzhi-mountain.jpg"
    }, {
        name: "Boao Buddhist Complex 博鳌禅寺",
        subtitle: "Qionghai · Contemporary Sanctuary",
        desc: "Adjacent to the famous Boao Forum, this vast temple complex blends Southern Chinese and Southeast Asian Buddhist architecture, with tranquil courtyards, lotus ponds and towering golden halls.",
        image: "/boao-zen.jpg"
    }, {
        name: "Qilou Old Street 骑楼老街",
        subtitle: "Haikou · Living Heritage District",
        desc: "A kilometre of arcaded shophouses built by returning Overseas Chinese in the early 20th century. The blend of Baroque, Southeast Asian and Lingnan styles is unlike anywhere else in China.",
        image: "/hainan-qilou-street.jpg"
    }];

    const festivals = [{
        name: lang === 'zh' ? "三月三节" : "March 3rd Festival (三月三)",
        when: lang === 'zh' ? "农历三月初三" : "3rd day of the 3rd lunar month",
        desc: lang === 'zh' ? "黎族最重要的节日——爱情、丰收与祖先的欢乐庆典。年轻人对唱情歌，家家户户品尝五色饭，村寨里竹竿舞跳到深夜。" : "The most important Li festival — a joyous celebration of love, harvest and ancestry. Young people sing courtship songs, families feast on five-coloured rice, and villages host bamboo dances late into the night."
    }, {
        name: lang === 'zh' ? "海南欢乐节" : "Hainan Joy Festival",
        when: lang === 'zh' ? "七月" : "July",
        desc: lang === 'zh' ? "全岛为期一周的盛大庆典，以海南标志性作物为主题，包含椰雕比赛、民俗表演和海口、文昌两地的美食集市。" : "A weeklong island-wide celebration of Hainan's signature crop, featuring coconut-carving competitions, folk performances and street food fairs in Haikou and Wenchang."
    }, {
        name: lang === 'zh' ? "三亚国际马拉松" : "Sanya International Marathon",
        when: lang === 'zh' ? "十二月" : "December",
        desc: lang === 'zh' ? "虽非古老传统，却已成为深受喜爱的现代盛事——来自世界各地的数千名跑者在三亚海岸线上奔跑，将运动与城市的国际化文化生活完美融合。" : "Not ancient, but now a beloved modern tradition — thousands of runners from around the world race along Sanya's coastline, blending sport with the city's cosmopolitan cultural life."
    }];

    const heroTitle = lang === 'zh' ? (cmsItem?.title_zh || "丰富遗产") : (cmsItem?.title_en || "Rich Heritage");
    const heroSubtitle = lang === 'zh' ? (cmsItem?.subtitle_zh || "热带岛屿的古老传统") : (cmsItem?.subtitle_en || "Ancient Traditions of the Tropical Island");
    const heroEyebrow = lang === 'zh' ? (cmsItem?.eyebrow_zh || "探索海南") : (cmsItem?.eyebrow_en || "Explore Hainan");
    const heroImage = cmsItem?.hero_image_url || "/hainan-li-brocade.jpg";
    const bodyHtml = cmsItem?.body_en || "";

    if (loading) {
        return (
            <>
                <div className="bg-surface-container border-b border-black/5">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-center">
                        <p className="text-[11px] sm:text-xs text-foreground/50 tracking-wide">Reference: Cool Hainan APP & official tourism resources</p>
                    </div>
                </div>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-10 h-10 text-accent-gold animate-spin" />
                </div>
            </>
        );
    }

    if (error || !cmsItem) {
        return (
            <>
                <div className="bg-surface-container border-b border-black/5">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-center">
                        <p className="text-[11px] sm:text-xs text-foreground/50 tracking-wide">Reference: Cool Hainan APP & official tourism resources</p>
                    </div>
                </div>
                <section
                    className="relative min-h-[360px] h-[50vh] flex items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/hainan-li-brocade.jpg')"
                        }} />
                    <div
                        className="absolute inset-0 z-[1]"
                        style={{
                            background: "linear-gradient(145deg, rgba(0,60,126,0.78) 0%, rgba(0,0,0,0.55) 50%, rgba(0,60,126,0.7) 100%)"
                        }} />
                    <div className="relative z-[2] text-center px-4 sm:px-6">
                        <RevealOnScroll>
                            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent-gold uppercase">Explore Hainan</span>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.15}>
                            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white leading-tight mt-4 mb-4">Rich Heritage</h1>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.3}>
                            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">Ancient Traditions of the Tropical Island</p>
                        </RevealOnScroll>
                    </div>
                </section>
                <section className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <RevealOnScroll>
                            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '三千年活态文化' : 'Three Thousand Years of Living Culture'}</span>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.1}>
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">An Island of Many Peoples</h2>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.2}>
                            <div className="w-16 h-1 bg-accent-gold mb-10" />
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.3}>
                            <div className="max-w-4xl space-y-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
                                <p>Long before Hainan became a tropical resort destination, it was home to some of southern China&apos;s oldest civilisations. The Li people arrived from the mainland more than 3,000 years ago, followed centuries later by the Miao, the Hui, and finally waves of Han settlers, merchants and returning Overseas Chinese.</p>
                                <p>The result is a cultural tapestry unlike anywhere else in China: boat-shaped Li houses beneath coconut groves; Miao silver headdresses catching the mountain sun; Southeast Asian arcaded shophouses lining Haikou&apos;s old streets; and Buddhist temples opening onto tropical seas.</p>
                                <p>For visitors to the Round Hainan Regatta, exploring these heritage sites is a chance to see the human story behind the landscape — a story written in fabric, silver, song and stone.</p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>
                <section className="bg-surface-container py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <RevealOnScroll>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                                    <Image src="/hainan-li-brocade.jpg" alt="Li ethnic brocade weaving" fill className="object-cover" />
                                </div>
                                <div>
                                    <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '活态遗产' : 'Living Heritage'}</span>
                                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '三千年的纺织传统' : 'A Textile Tradition of 3,000 Years'}</h3>
                                    <div className="w-16 h-1 bg-accent-gold mb-6" />
                                    <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">Woven on backstrap looms by generations of Li women, brocade is more than fabric — it is a living record of clan lineage, cosmology and myth. UNESCO recognised its urgent need for safeguarding in 2009, and today a new generation of weavers is keeping the loom alive in villages across central Hainan.</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 mb-12">
                            <RevealOnScroll>
                                <div className="lg:col-span-1">
                                    <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '最早的岛民' : 'The First Islanders'}</span>
                                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">The Li People 黎族</h2>
                                    <div className="w-16 h-1 bg-accent-gold mb-6" />
                                    <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">With a population of approximately 1.5 million, the Li are Hainan&apos;s oldest inhabitants — believed to have crossed from the mainland during the late Neolithic. They speak a Tai-Kadai language and preserve traditions unbroken for millennia.</p>
                                </div>
                            </RevealOnScroll>
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                                {liTraits.map((t, i) => {
                                    const Icon = t.icon;
                                    return (
                                        <RevealOnScroll key={t.title} delay={0.15 + i * 0.1}>
                                            <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-float transition-all h-full">
                                                <div className="w-11 h-11 rounded-full bg-primary-deep/5 flex items-center justify-center mb-4">
                                                    <Icon className="w-5 h-5 text-primary-deep" />
                                                </div>
                                                <h3 className="font-display text-lg sm:text-xl text-primary-deep mb-3 leading-snug" dangerouslySetInnerHTML={{ __html: t.title }} />
                                                <p className="text-sm text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
                                            </div>
                                        </RevealOnScroll>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <RevealOnScroll>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
                                <div className="order-2 lg:order-1">
                                    <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '银饰与民歌' : 'Silver & Song'}</span>
                                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary-deep mt-3 mb-4 leading-tight">Wearable Family Fortunes</h3>
                                    <div className="w-16 h-1 bg-accent-gold mb-6" />
                                    <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">Miao silversmiths handcraft elaborate headdresses, collars and bracelets that can weigh several kilograms — worn on festival days as a shining record of family history. Each piece encodes ancestral stories, protective symbols and mountain motifs passed from mother to daughter.</p>
                                </div>
                                <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                                    <Image src="/hainan-miao-silver.jpg" alt="Miao silver ornaments" fill className="object-cover" />
                                </div>
                            </div>
                        </RevealOnScroll>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
                            <RevealOnScroll>
                                <div className="lg:col-span-1">
                                    <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '山地社区' : 'Mountain Communities'}</span>
                                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">The Miao People 苗族</h2>
                                    <div className="w-16 h-1 bg-accent-gold mb-6" />
                                    <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">Hainan&apos;s Miao communities settled in the central highlands during the Ming dynasty, arriving from Guangxi as soldiers and later farmers. Today they preserve their distinct language, dress and music in villages nestled among the tropical mountains.</p>
                                </div>
                            </RevealOnScroll>
                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                                {miaoTraits.map((t, i) => {
                                    const Icon = t.icon;
                                    return (
                                        <RevealOnScroll key={t.title} delay={0.15 + i * 0.1}>
                                            <div className="bg-surface-container rounded-xl p-6 shadow-card hover:shadow-float transition-all h-full">
                                                <div className="w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center mb-4">
                                                    <Icon className="w-5 h-5 text-accent-gold" />
                                                </div>
                                                <h3 className="font-display text-lg sm:text-xl text-primary-deep mb-3 leading-snug" dangerouslySetInnerHTML={{ __html: t.title }} />
                                                <p className="text-sm text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
                                            </div>
                                        </RevealOnScroll>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-surface-container py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <RevealOnScroll>
                                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">Cultural Sites to Visit</span>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.1}>
                                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">Where Heritage Lives</h2>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.2}>
                                <div className="w-16 h-1 bg-accent-gold mx-auto" />
                            </RevealOnScroll>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {sites.map((s, i) => <RevealOnScroll key={s.name} delay={i * 0.1}>
                                <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all h-full flex flex-col">
                                    <div className="relative aspect-[16/9] bg-primary-deep/10">
                                        <Image src={s.image} alt={s.name} fill className="object-cover" />
                                    </div>
                                    <div className="p-7 lg:p-8 flex-1 flex flex-col">
                                        <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-1">{s.name}</h3>
                                        <p className="text-xs sm:text-sm text-accent-gold font-medium mb-3 tracking-wide">{s.subtitle}</p>
                                        <p className="text-sm sm:text-base text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.desc }} />
                                    </div>
                                </div>
                            </RevealOnScroll>)}
                        </div>
                    </div>
                </section>
                <section className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <RevealOnScroll>
                                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '节日与庆典' : 'Festivals & Celebrations'}</span>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.1}>
                                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '全年庆典' : 'A Year of Celebration'}</h2>
                            </RevealOnScroll>
                            <RevealOnScroll delay={0.2}>
                                <div className="w-16 h-1 bg-accent-gold mx-auto" />
                            </RevealOnScroll>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {festivals.map((f, i) => <RevealOnScroll key={f.name} delay={i * 0.1}>
                                <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
                                    <CalendarDays className="w-6 h-6 text-accent-gold mb-4" />
                                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-2">{f.name}</h3>
                                    <p className="text-xs sm:text-sm text-foreground/50 uppercase tracking-wider mb-4">{f.when}</p>
                                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: f.desc }} />
                                </div>
                            </RevealOnScroll>)}
                        </div>
                    </div>
                </section>
                <section className="bg-primary-deep py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <RevealOnScroll>
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">Continue Your Journey</h2>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.15}>
                            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">Culture is only one dimension of Hainan. Explore the island&apos;s beaches, cuisine and free-trade opportunities.</p>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.3}>
                            <Link
                                href="/#explore-hainan"
                                className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 text-base font-semibold text-primary-deep bg-accent-gold hover:bg-accent-gold/90 rounded-md transition-all hover:scale-105 shadow-lg">
                                <ArrowLeft className="w-4 h-4" />Back to Explore Hainan
                            </Link>
                        </RevealOnScroll>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <div className="bg-surface-container border-b border-black/5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-center">
                    <p className="text-[11px] sm:text-xs text-foreground/50 tracking-wide">Reference: Cool Hainan APP & official tourism resources</p>
                </div>
            </div>
            <section className="relative min-h-[360px] h-[50vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                />
                <div
                    className="absolute inset-0 z-[1]"
                    style={{
                        background: "linear-gradient(145deg, rgba(0,60,126,0.78) 0%, rgba(0,0,0,0.55) 50%, rgba(0,60,126,0.7) 100%)"
                    }}
                />
                <div className="relative z-[2] text-center px-4 sm:px-6">
                    <RevealOnScroll>
                        <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent-gold uppercase">{heroEyebrow}</span>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.15}>
                        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white leading-tight mt-4 mb-4">{heroTitle}</h1>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.3}>
                        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">{heroSubtitle}</p>
                    </RevealOnScroll>
                </div>
            </section>
            {bodyHtml && (
                <section className="bg-white py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <RevealOnScroll>
                            <div
                                className="max-w-4xl prose prose-lg prose-a:text-accent-gold prose-headings:font-display prose-headings:text-primary-deep leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: bodyHtml }}
                            />
                        </RevealOnScroll>
                    </div>
                </section>
            )}
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '三千年活态文化' : 'Three Thousand Years of Living Culture'}</span>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.1}>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '多民族之岛' : 'An Island of Many Peoples'}</h2>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.2}>
                        <div className="w-16 h-1 bg-accent-gold mb-10" />
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.3}>
                        <div className="max-w-4xl space-y-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
                            <p>{lang === 'zh' ? '早在海南成为热带度假胜地之前，它就是华南最古老文明的家园。黎族人在3000多年前从大陆迁徙而来，几个世纪后，苗族、回族以及大批汉族移民、商人和归国华侨相继到来。' : 'Long before Hainan became a tropical resort destination, it was home to some of southern China\'s oldest civilisations. The Li people arrived from the mainland more than 3,000 years ago, followed centuries later by the Miao, the Hui, and finally waves of Han settlers, merchants and returning Overseas Chinese.'}</p>
                            <p>{lang === 'zh' ? '这造就了中国独一无二的文化织锦：椰林下的黎族船形屋；山间阳光下的苗族银冠；海口老街的东南亚骑楼；以及面向热带大海的佛教寺庙。' : 'The result is a cultural tapestry unlike anywhere else in China: boat-shaped Li houses beneath coconut groves; Miao silver headdresses catching the mountain sun; Southeast Asian arcaded shophouses lining Haikou\'s old streets; and Buddhist temples opening onto tropical seas.'}</p>
                            <p>{lang === 'zh' ? '对于环海南岛大帆船赛的游客来说，探索这些文化遗产是了解风景背后人文故事的机会——一个用织物、银器、歌声和石头书写的故事。' : 'For visitors to the Round Hainan Regatta, exploring these heritage sites is a chance to see the human story behind the landscape — a story written in fabric, silver, song and stone.'}</p>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
            <section className="bg-surface-container py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                                <Image
                                    src="/hainan-li-brocade.jpg"
                                    alt="Li ethnic brocade weaving"
                                    fill
                                    className="object-cover" />
                            </div>
                            <div>
                                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '活态遗产' : 'Living Heritage'}</span>
                                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '三千年的纺织传统' : 'A Textile Tradition of 3,000 Years'}</h3>
                                <div className="w-16 h-1 bg-accent-gold mb-6" />
                                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">{lang === 'zh' ? '黎族妇女用腰机织布，世代相传，织锦不仅是织物——它是氏族血统、宇宙观和神话的活态记录。2009年联合国教科文组织认定其急需保护，如今新一代织布人正在海南中部的村庄里保持织机的活力。' : 'Woven on backstrap looms by generations of Li women, brocade is more than fabric — it is a living record of clan lineage, cosmology and myth. UNESCO recognised its urgent need for safeguarding in 2009, and today a new generation of weavers is keeping the loom alive in villages across central Hainan.'}</p>
                            </div>
                        </div>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 mb-12">
                        <RevealOnScroll>
                            <div className="lg:col-span-1">
                                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '最早的岛民' : 'The First Islanders'}</span>
                                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '黎族' : 'The Li People'} 黎族</h2>
                                <div className="w-16 h-1 bg-accent-gold mb-6" />
                                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">{lang === 'zh' ? '黎族人口约150万，是海南最古老的居民——据信在新石器时代晚期从大陆渡海而来。他们说侗台语系语言，保存了数千年来未曾中断的传统。' : 'With a population of approximately 1.5 million, the Li are Hainan\'s oldest inhabitants — believed to have crossed from the mainland during the late Neolithic. They speak a Tai-Kadai language and preserve traditions unbroken for millennia.'}</p>
                            </div>
                        </RevealOnScroll>
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {liTraits.map((t, i) => {
                                const Icon = t.icon;
                                return (
                                    <RevealOnScroll key={t.title} delay={0.15 + i * 0.1}>
                                        <div className="bg-white rounded-xl p-6 shadow-card hover:shadow-float transition-all h-full">
                                            <div className="w-11 h-11 rounded-full bg-primary-deep/5 flex items-center justify-center mb-4">
                                                <Icon className="w-5 h-5 text-primary-deep" />
                                            </div>
                                            <h3 className="font-display text-lg sm:text-xl text-primary-deep mb-3 leading-snug" dangerouslySetInnerHTML={{ __html: t.title }} />
                                            <p className="text-sm text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
                                        </div>
                                    </RevealOnScroll>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
                            <div className="order-2 lg:order-1">
                                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '银饰与民歌' : 'Silver & Song'}</span>
                                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '可穿戴的家产' : 'Wearable Family Fortunes'}</h3>
                                <div className="w-16 h-1 bg-accent-gold mb-6" />
                                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">{lang === 'zh' ? '苗族银匠手工打造精美的头饰、项圈和手镯，重达数公斤——在节日佩戴，作为家族历史的闪亮记录。每件银饰都编码了祖先故事、保护符号和山峦图案，从母亲传给女儿。' : 'Miao silversmiths handcraft elaborate headdresses, collars and bracelets that can weigh several kilograms — worn on festival days as a shining record of family history. Each piece encodes ancestral stories, protective symbols and mountain motifs passed from mother to daughter.'}</p>
                            </div>
                            <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
                                <Image src="/hainan-miao-silver.jpg" alt="Miao silver ornaments" fill className="object-cover" />
                            </div>
                        </div>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
                        <RevealOnScroll>
                            <div className="lg:col-span-1">
                                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '山地社区' : 'Mountain Communities'}</span>
                                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '苗族' : 'The Miao People'} 苗族</h2>
                                <div className="w-16 h-1 bg-accent-gold mb-6" />
                                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">{lang === 'zh' ? '海南的苗族社区在明朝时期定居于中部高地，从广西作为士兵后来成为农民迁徙而来。如今他们在热带山间的村庄里保存着独特的语言、服饰和音乐。' : 'Hainan\'s Miao communities settled in the central highlands during the Ming dynasty, arriving from Guangxi as soldiers and later farmers. Today they preserve their distinct language, dress and music in villages nestled among the tropical mountains.'}</p>
                            </div>
                        </RevealOnScroll>
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {miaoTraits.map((t, i) => {
                                const Icon = t.icon;
                                return (
                                    <RevealOnScroll key={t.title} delay={0.15 + i * 0.1}>
                                        <div className="bg-surface-container rounded-xl p-6 shadow-card hover:shadow-float transition-all h-full">
                                            <div className="w-11 h-11 rounded-full bg-accent-gold/15 flex items-center justify-center mb-4">
                                                <Icon className="w-5 h-5 text-accent-gold" />
                                            </div>
                                            <h3 className="font-display text-lg sm:text-xl text-primary-deep mb-3 leading-snug" dangerouslySetInnerHTML={{ __html: t.title }} />
                                            <p className="text-sm text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.desc }} />
                                        </div>
                                    </RevealOnScroll>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-surface-container py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <RevealOnScroll>
                            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '文化遗址' : 'Cultural Sites to Visit'}</span>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.1}>
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">{lang === 'zh' ? '遗产活态之地' : 'Where Heritage Lives'}</h2>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.2}>
                            <div className="w-16 h-1 bg-accent-gold mx-auto" />
                        </RevealOnScroll>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {sites.map((s, i) => <RevealOnScroll key={s.name} delay={i * 0.1}>
                            <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-float transition-all h-full flex flex-col">
                                <div className="relative aspect-[16/9] bg-primary-deep/10">
                                    <Image src={s.image} alt={s.name} fill className="object-cover" />
                                </div>
                                <div className="p-7 lg:p-8 flex-1 flex flex-col">
                                    <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-1">{s.name}</h3>
                                    <p className="text-xs sm:text-sm text-accent-gold font-medium mb-3 tracking-wide">{s.subtitle}</p>
                                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.desc }} />
                                </div>
                            </div>
                        </RevealOnScroll>)}
                    </div>
                </div>
            </section>
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <RevealOnScroll>
                            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-accent-gold uppercase">{lang === 'zh' ? '节日与庆典' : 'Festivals & Celebrations'}</span>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.1}>
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-deep mt-3 mb-4 leading-tight">A Year of Celebration</h2>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.2}>
                            <div className="w-16 h-1 bg-accent-gold mx-auto" />
                        </RevealOnScroll>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {festivals.map((f, i) => <RevealOnScroll key={f.name} delay={i * 0.1}>
                            <div className="bg-surface-container rounded-xl p-7 lg:p-8 shadow-card hover:shadow-float transition-all h-full">
                                <CalendarDays className="w-6 h-6 text-accent-gold mb-4" />
                                <h3 className="font-display text-xl sm:text-2xl text-primary-deep leading-snug mb-2">{f.name}</h3>
                                <p className="text-xs sm:text-sm text-foreground/50 uppercase tracking-wider mb-4">{f.when}</p>
                                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: f.desc }} />
                            </div>
                        </RevealOnScroll>)}
                    </div>
                </div>
            </section>
            <section className="bg-primary-deep py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <RevealOnScroll>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">Continue Your Journey</h2>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.15}>
                        <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">Culture is only one dimension of Hainan. Explore the island&apos;s beaches, cuisine and free-trade opportunities.</p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.3}>
                        <Link
                            href="/#explore-hainan"
                            className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 text-base font-semibold text-primary-deep bg-accent-gold hover:bg-accent-gold/90 rounded-md transition-all hover:scale-105 shadow-lg">
                            <ArrowLeft className="w-4 h-4" />Back to Explore Hainan
                        </Link>
                    </RevealOnScroll>
                </div>
            </section>
        </>
    );
}