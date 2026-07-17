"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { useLang } from "@/lib/LanguageProvider";
import { Anchor, Navigation, MapPin, Ship, Compass, ArrowRight, Sailboat, FileText, AlertTriangle, ClipboardCheck, Scale } from "lucide-react";

// Hardcoded distances based on sort_order index (0-based)
const HARDCODED_DISTANCES = [
    "—",                    // 0 - Start (Sanya)
    "~90 NM from Sanya",     // 1 - Dongfang
    "~115 NM from Dongfang", // 2 - Yang Pu
    "~110 NM from Yang Pu",  // 3 - Haikou
    "~95 NM from Haikou",    // 4 - Qinglan
    "~150 NM from Qinglan",  // 5 - Wanning
    "~65 NM from Wanning",   // 6 - Lingshui
    "~55 NM from Lingshui",  // 7 - Finish (Sanya)
];

// Map role_en to lucide icon name
function getIconForRole(role: string, index: number, total: number): string {
    const roleLower = role.toLowerCase();
    if (roleLower === "start") return "MapPin";
    if (roleLower === "finish") return "Anchor";
    if (roleLower === "halfway rest" || roleLower === "halfway") return "Ship";
    // Rotating set for regular waypoints
    const rotatingIcons = ["Compass", "Navigation", "Sailboat", "Compass", "Navigation"];
    const waypointIndex = index - 1; // skip start
    return rotatingIcons[waypointIndex % rotatingIcons.length] || "Navigation";
}

// Map CMS item to the waypoint shape used in the template
function cmsItemToWaypoint(item: any, index: number, total: number) {
    return {
        name: item.name_en || item.name_zh || "",
        role: item.role_en || item.role_zh || "Waypoint",
        description: item.description_en || item.description_zh || "",
        distance: HARDCODED_DISTANCES[index] || "",
        icon: getIconForRole(item.role_en || item.role_zh || "", index, total),
    };
}

export default function CoursePage() {
    const { t } = useLang();
    const [waypoints, setWaypoints] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let cancelled = false;
        fetch("/api/cms/waypoints")
            .then((r) => r.json())
            .then((data) => {
                if (cancelled) return;
                if (data.ok && Array.isArray(data.items)) {
                    const total = data.items.length;
                    const mapped = data.items.map((item: any, idx: number) =>
                        cmsItemToWaypoint(item, idx, total)
                    );
                    setWaypoints(mapped);
                }
                setLoading(false);
            })
            .catch(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);
    return (
        <div className="min-h-screen">
            {}
            <section
                className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/hero.jpg"
                    alt="Round Hainan Regatta Course"
                    fill
                    className="object-cover"
                    priority />
                {}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-primary-deep/70 via-primary-deep/50 to-primary-deep/80" />
                <div
                    className="absolute inset-0 bg-gradient-to-r from-primary-deep/40 to-transparent" />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <RevealOnScroll delay={0.1}>
                        <h1
                            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">{t('course', 'heroTitle')}
                                        </h1>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.3}>
                        <p
                            className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-2xl mx-auto">{t('course', 'heroSub')}
                                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.5}>
                        <div
                            className="mt-8 flex items-center justify-center gap-2 text-accent-gold/80 text-sm font-medium">
                            <MapPin className="w-4 h-4" />
                            <span>680 NM • 2 Courses • 7 Waypoints</span>
                        </div>
                    </RevealOnScroll>
                </div>
                {}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto">
                        <path d="M0 20C240 60 480 0 720 20C960 40 1200 0 1440 20V60H0V20Z" fill="white" />
                    </svg>
                </div>
            </section>
            {}
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <p
                            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center mb-16">The 15th Round Hainan Regatta offers two offshore race courses designed
                                          for different levels of sailing challenge. As set out in the 2026 Notice
                                          of Race, the Full Round now sails clockwise around Hainan Island
                                          — heading west from Sanya, up the western seaboard, across the Qiongzhou
                                          Strait, and back down the eastern coast through seven strategic waypoints.
                                        </p>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {}
                        <RevealOnScroll delay={0.1}>
                            <div
                                className="bg-primary-container rounded-2xl p-8 shadow-card border border-primary-bright/10">
                                <div
                                    className="w-12 h-12 rounded-full bg-primary-deep flex items-center justify-center mb-5">
                                    <Ship className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-primary-deep mb-2">Full Round</h3>
                                <p className="text-3xl font-display font-bold text-accent-gold mb-3">680 <span className="text-sm font-sans font-normal text-muted-foreground">NM</span>
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">Sanya → Dongfang → Yang Pu → Haikou → Qinglan →
                                                      Wanning → Lingshui → Sanya. A clockwise circumnavigation
                                                      of Hainan Island.
                                                    </p>
                            </div>
                        </RevealOnScroll>
                        {}
                        <RevealOnScroll delay={0.2}>
                            <div
                                className="bg-primary-container rounded-2xl p-8 shadow-card border border-primary-bright/10">
                                <div
                                    className="w-12 h-12 rounded-full bg-primary-bright flex items-center justify-center mb-5">
                                    <Navigation className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-primary-deep mb-2">Half Round</h3>
                                <p className="text-3xl font-display font-bold text-primary-bright mb-3">280 <span className="text-sm font-sans font-normal text-muted-foreground">NM</span>
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">Sanya → Lingshui → Sanya. A shorter coastal route along the
                                                      southern and southeastern shores, ideal for crews new to offshore racing.
                                                    </p>
                            </div>
                        </RevealOnScroll>
                        {}
                        <RevealOnScroll delay={0.3}>
                            <div
                                className="bg-primary-container rounded-2xl p-8 shadow-card border border-primary-bright/10">
                                <div
                                    className="w-12 h-12 rounded-full bg-accent-coral flex items-center justify-center mb-5">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-primary-deep mb-2">Inshore Races</h3>
                                <p className="text-3xl font-display font-bold text-accent-coral mb-3">Day <span className="text-sm font-sans font-normal text-muted-foreground">Races</span>
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">Multiple windward-leeward and buoy races held in Sanya's protected
                                                      waters for close-quarters action.
                                                    </p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>
            {}
            <section className="bg-surface-container py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <h2
                            className="text-center font-display text-3xl md:text-4xl font-bold text-primary-deep mb-4">{t('course', 'routesTitle')}
                                        </h2>
                        <p
                            className="text-center text-muted-foreground text-sm md:text-base mb-12 max-w-xl mx-auto">Solid dark blue marks the Racing Route around Hainan Island; dashed orange marks the Non-Racing Route near Haikou.
                                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.2}>
                        <div className="relative w-full max-w-4xl mx-auto rounded-3xl shadow-card overflow-hidden bg-white">
                            <Image
                                src="/route-map-v2.png"
                                alt="Race Routes around Hainan Island — waypoints and directional arrows"
                                width={1267}
                                height={1033}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </RevealOnScroll>
                    {/* Race Documents Cards — 5 official regulatory documents */}
                    <RevealOnScroll delay={0.3}>
                        <div className="mt-20 md:mt-24">
                            <div className="text-center mb-12">
                                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-4">
                                    {t('course', 'documentsEyebrow')}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-deep mb-4">
                                    {t('course', 'documentsTitle')}
                                </h3>
                                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    {t('course', 'documentsSub')}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    {
                                        href: "/course/notice-of-race",
                                        icon: FileText,
                                        title: "Notice of Race",
                                        subtitle: "NOR 2026",
                                        desc: "The full 2026 Notice of Race governing the 15th Round Hainan Regatta — rules, entries, schedule, and scoring.",
                                        accent: "from-primary to-primary-deep",
                                    },
                                    {
                                        href: "/course/on-water-penalties",
                                        icon: Scale,
                                        title: "Recommended On-Water Penalties",
                                        subtitle: "Appendix UA",
                                        desc: "Umpire observation procedures, flag signals, and how on-water penalties are applied during racing.",
                                        accent: "from-accent-gold to-orange-500",
                                    },
                                    {
                                        href: "/course/port-information",
                                        icon: Anchor,
                                        title: "Port Information",
                                        subtitle: "Appendix 5",
                                        desc: "Coordinates, berths, VHF channels and depths for the host port and all emergency ports of call.",
                                        accent: "from-primary-bright to-primary",
                                    },
                                    {
                                        href: "/course/disclaimer",
                                        icon: AlertTriangle,
                                        title: "Disclaimer of Liability",
                                        subtitle: "Appendix 6",
                                        desc: "Mandatory disclaimer and declaration to be signed by every competitor prior to participation.",
                                        accent: "from-accent-coral to-pink-600",
                                    },
                                    {
                                        href: "/course/inspection-list",
                                        icon: ClipboardCheck,
                                        title: "Inspection List — Category 3",
                                        subtitle: "Appendix 1",
                                        desc: "Full equipment inspection checklist for Race Category 3 (with liferaft) Monohulls per OSR requirements.",
                                        accent: "from-primary-deep to-primary",
                                    },
                                ].map((doc) => {
                                    const Icon = doc.icon;
                                    return (
                                        <Link
                                            key={doc.href}
                                            href={doc.href}
                                            className="group relative overflow-hidden rounded-2xl bg-white border border-surface-container-high shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className={`h-1.5 w-full bg-gradient-to-r ${doc.accent}`} />
                                            <div className="p-6 md:p-7">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.accent} flex items-center justify-center shrink-0 shadow-sm`}>
                                                        <Icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-gold mb-1">
                                                            {doc.subtitle}
                                                        </span>
                                                        <h4 className="text-lg md:text-xl font-display font-bold text-primary-deep leading-tight group-hover:text-primary transition-colors">
                                                            {doc.title}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                                                    {doc.desc}
                                                </p>
                                                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                                                    Read document
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
            {}
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <h2
                            className="text-center font-display text-3xl md:text-4xl font-bold text-primary-deep mb-4">KEY WAYPOINTS
                                        </h2>
                        <p
                            className="text-center text-muted-foreground text-sm md:text-base mb-16 max-w-xl mx-auto">Seven strategic points along the clockwise circumnavigation
                                        </p>
                    </RevealOnScroll>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {loading ? (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                Loading waypoints…
                            </div>
                        ) : waypoints.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                No waypoint data available.
                            </div>
                        ) : waypoints.map((wp, index) => {
                            const isFinish = index === waypoints.length - 1;
                            const IconComponent = wp.icon === "MapPin" ? MapPin : wp.icon === "Navigation" ? Navigation : wp.icon === "Ship" ? Ship : wp.icon === "Compass" ? Compass : wp.icon === "Sailboat" ? Sailboat : Anchor;

                            return (
                                <RevealOnScroll key={`${wp.name}-${wp.role}-${index}`} delay={0.08 * index}>
                                    <div
                                        className="bg-surface-container rounded-2xl p-6 shadow-card border border-surface-container-high text-center h-full flex flex-col items-center group hover:shadow-float transition-all duration-300 hover:-translate-y-1">
                                        {}
                                        <div
                                            className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${isFinish ? "bg-accent-coral/10 text-accent-coral" : "bg-accent-gold/10 text-accent-gold"}`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        {}
                                        <span
                                            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1">
                                            {index === 0 ? "Start" : isFinish ? "Finish" : `WP 0${index}`}
                                        </span>
                                        {}
                                        <h3
                                            className={`text-lg font-bold mb-1 ${isFinish ? "text-accent-coral" : "text-primary-deep"}`}>
                                            {wp.name}
                                        </h3>
                                        {}
                                        <p
                                            className="text-xs font-semibold text-accent-gold uppercase tracking-wider mb-2">
                                            {wp.role}
                                        </p>
                                        {}
                                        <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-grow">
                                            {wp.description}
                                        </p>
                                        {}
                                        <div className="w-full pt-3 border-t border-surface-container-high">
                                            <span className="text-xs font-medium text-primary-bright">
                                                {wp.distance}
                                            </span>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            );
                        })}
                    </div>
                </div>
            </section>
            {}
            <section className="bg-surface-container py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <h2
                            className="text-center font-display text-3xl md:text-4xl font-bold text-primary-deep mb-4">Race Course Details
                                        </h2>
                        <p
                            className="text-center text-muted-foreground text-sm md:text-base mb-16 max-w-xl mx-auto">Choose your challenge
                                        </p>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {}
                        <RevealOnScroll delay={0.1}>
                            <div
                                className="bg-white rounded-3xl shadow-card overflow-hidden border border-surface-container-high group hover:shadow-float transition-all duration-300">
                                <div className="h-3 bg-accent-gold" />
                                <div className="p-8 md:p-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div
                                            className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center">
                                            <Ship className="w-7 h-7 text-accent-gold" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-primary-deep">Full Round</h3>
                                            <p className="text-sm text-muted-foreground">Sanya → Dongfang → Yang Pu → Haikou → Qinglan → Wanning → Lingshui → Sanya
                                                                      </p>
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-5xl font-display font-bold text-accent-gold">680</span>
                                        <span className="text-lg font-medium text-muted-foreground">nautical miles</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">The ultimate test of offshore sailing. As set out in the 2026 Notice
                                                            of Race, the Full Round takes competitors on a clockwise
                                                            circumnavigation of Hainan Island, passing seven strategic waypoints —
                                                            Dongfang, Yang Pu, Haikou, Qinglan, Wanning and Lingshui — before the
                                                            final run back to Sanya. Teams face varied conditions as they round
                                                            the island, from the exposed western seaboard, through the busy
                                                            Qiongzhou Strait in the north, and back down the trade-wind eastern coast.
                                                          </p>
                                    <div className="space-y-3">
                                        <h4
                                            className="text-sm font-semibold text-primary-deep uppercase tracking-wider">Key Features
                                                                </h4>
                                        <ul className="space-y-2">
                                            {[
                                                "Clockwise circumnavigation of Hainan Island",
                                                "Passing 7 strategic waypoints per 2026 Notice of Race",
                                                "Exposed west-coast racing from Sanya via Dongfang to Yang Pu",
                                                "Navigation through busy shipping lanes near Haikou",
                                                "Trade-wind eastern seaboard sprint from Qinglan home to Sanya",
                                                "Multiple nights at sea required for a competitive finish"
                                            ].map(
                                                (feature, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <ArrowRight className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {}
                        <RevealOnScroll delay={0.2}>
                            <div
                                className="bg-white rounded-3xl shadow-card overflow-hidden border border-surface-container-high group hover:shadow-float transition-all duration-300">
                                <div className="h-3 bg-primary-bright" />
                                <div className="p-8 md:p-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div
                                            className="w-14 h-14 rounded-full bg-primary-bright/10 flex items-center justify-center">
                                            <Navigation className="w-7 h-7 text-primary-bright" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-primary-deep">Half Round</h3>
                                            <p className="text-sm text-muted-foreground">Sanya → Lingshui → Sanya</p>
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-5xl font-display font-bold text-primary-bright">280</span>
                                        <span className="text-lg font-medium text-muted-foreground">nautical miles</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">A shorter but no less challenging course for crews looking for a
                                                            competitive offshore race without the full circumnavigation. The
                                                            Half Round takes competitors east along Hainan's southern
                                                            coastline to Lingshui as the turning waypoint, before the sprint
                                                            back to Sanya. Certain legs may be run as non-race delivery segments
                                                            to align with the Full Round schedule.
                                                          </p>
                                    <div className="space-y-3">
                                        <h4
                                            className="text-sm font-semibold text-primary-deep uppercase tracking-wider">Key Features
                                                                </h4>
                                        <ul className="space-y-2">
                                            {[
                                                "Southern and southeastern coastal route",
                                                "Ideal for crews new to offshore racing",
                                                "Stunning coastal scenery throughout",
                                                "Tactical wind shifts near Lingshui peninsula",
                                                "Non-race delivery segments between certain legs",
                                                "Same start and finish as Full Round in Sanya"
                                            ].map(
                                                (feature, i) => <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <ArrowRight className="w-4 h-4 text-primary-bright mt-0.5 shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>
            {}
            <style jsx>{`
        /* Path is drawn clockwise (Sanya → Dongfang → Yang Pu → Haikou → Qinglan → Wanning → Lingshui → Sanya).
           A negative stroke-dashoffset animates dashes along the direction the path was drawn,
           so -60 produces a clockwise dash flow. */
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -60;
          }
        }
        .animate-dash {
          animation: dash-flow 3s linear infinite;
        }
      `}</style>
        </div>
    );
}