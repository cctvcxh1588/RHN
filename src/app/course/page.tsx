"use client";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Anchor, Navigation, MapPin, Ship, Compass, ArrowRight, Sailboat } from "lucide-react";

const waypoints = [{
    name: "Sanya",
    role: "Start",
    description: "Home port and gateway to the tropics. Departure from Sanya Serenity Marina, heading west along the southern shore.",
    distance: "—",
    icon: "MapPin",
    svgX: 343,
    svgY: 425
}, {
    name: "Dongfang",
    role: "Waypoint",
    description: "West coast, first turning point. Crews set up for the long haul north along the exposed western seaboard.",
    distance: "~90 NM from Sanya",
    icon: "Compass",
    svgX: 190,
    svgY: 285
}, {
    name: "Yang Pu",
    role: "Waypoint",
    description: "Northwest deep-water port in the Danzhou coast area. Sheltered waters before the run to the top of the island.",
    distance: "~115 NM from Dongfang",
    icon: "Navigation",
    svgX: 280,
    svgY: 175
}, {
    name: "Haikou",
    role: "Halfway Rest",
    description: "Northern capital on the Qiongzhou Strait. The fleet rounds the top of Hainan before heading down the east coast.",
    distance: "~110 NM from Yang Pu",
    icon: "Ship",
    svgX: 477,
    svgY: 105
}, {
    name: "Qinglan",
    role: "Waypoint",
    description: "Northeast port near Wenchang — a historic maritime hub. Gateway from the Qiongzhou Strait to the trade-wind coast.",
    distance: "~95 NM from Haikou",
    icon: "Sailboat",
    svgX: 555,
    svgY: 200
}, {
    name: "Wanning",
    role: "Waypoint",
    description: "East coast waters — Hele Crab country. Trade winds and open ocean tactics dominate this leg.",
    distance: "~150 NM from Qinglan",
    icon: "Compass",
    svgX: 500,
    svgY: 340
}, {
    name: "Lingshui",
    role: "Waypoint",
    description: "Southeast coast, final approach. Tactical rounding before the sprint home to Sanya Bay.",
    distance: "~65 NM from Wanning",
    icon: "Navigation",
    svgX: 440,
    svgY: 385
}, {
    name: "Sanya",
    role: "Finish",
    description: "Return home to the finish line in Sanya Bay. Full circumnavigation complete after 680 nautical miles.",
    distance: "~55 NM from Lingshui",
    icon: "Anchor",
    svgX: 343,
    svgY: 425
}];

export default function CoursePage() {
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
                            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">The Course
                                        </h1>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.3}>
                        <p
                            className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-2xl mx-auto">Circumnavigating Hainan Island — Clockwise
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
                            className="text-center font-display text-3xl md:text-4xl font-bold text-primary-deep mb-4">Race Routes
                                        </h2>
                        <p
                            className="text-center text-muted-foreground text-sm md:text-base mb-12 max-w-xl mx-auto">Follow the clockwise Full Round (gold) and the Half Round course (blue)
                                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.2}>
                        <div
                            className="relative w-full max-w-4xl mx-auto aspect-[660/500] bg-surface-container-high rounded-3xl shadow-card overflow-hidden">
                            {}
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                <Image
                                    src="/hainan-map.png"
                                    alt="Hainan Island Map"
                                    fill
                                    className="object-contain object-center p-4" />
                            </div>
                            {}
                            <svg
                                viewBox="0 0 660 500"
                                className="absolute inset-0 w-full h-full"
                                preserveAspectRatio="xMidYMid meet"
                                style={{
                                    backgroundColor: "transparent"
                                }}>
                                {/* Full Round route — CLOCKWISE: Sanya → Dongfang → Yang Pu → Haikou → Qinglan → Wanning → Lingshui → Sanya. Path direction is clockwise so a negative stroke-dashoffset makes dashes flow clockwise. */}
                                <path
                                    d="M 343 425
                     C 280 470, 150 400, 190 285
                     C 140 240, 200 180, 280 175
                     C 330 120, 400 80, 477 105
                     C 560 100, 595 150, 555 200
                     C 600 260, 555 310, 500 340
                     C 490 370, 475 395, 440 385
                     C 430 430, 400 445, 343 425"
                                    className="text-accent-gold animate-dash"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeDasharray="8 6"
                                    fill="none" />
                                {}
                                {/* Half Round route — Sanya ↔ Lingshui (~280 NM), a small clockwise-ish loop that hugs the SE coast. */}
                                <path
                                    d="M 343 425
                     C 380 448, 415 415, 440 385
                     C 415 405, 380 418, 343 425"
                                    className="text-primary-bright animate-dash"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeDasharray="6 5"
                                    fill="none" />
                                {}
                                {}
                                <circle
                                    cx="343"
                                    cy="425"
                                    r="8"
                                    className="text-accent-gold"
                                    fill="currentColor"
                                    stroke="white"
                                    strokeWidth="2" />
                                <circle cx="343" cy="425" r="4" fill="white" />
                                {}
                                <circle
                                    cx="440"
                                    cy="385"
                                    r="8"
                                    className="text-accent-gold"
                                    fill="currentColor"
                                    stroke="white"
                                    strokeWidth="2" />
                                <circle cx="440" cy="385" r="4" fill="white" />
                                {}
                                <circle
                                    cx="500"
                                    cy="340"
                                    r="8"
                                    className="text-accent-gold"
                                    fill="currentColor"
                                    stroke="white"
                                    strokeWidth="2" />
                                <circle cx="500" cy="340" r="4" fill="white" />
                                {}
                                <circle
                                    cx="555"
                                    cy="200"
                                    r="8"
                                    className="text-accent-gold"
                                    fill="currentColor"
                                    stroke="white"
                                    strokeWidth="2" />
                                <circle cx="555" cy="200" r="4" fill="white" />
                                {}
                                <circle
                                    cx="477"
                                    cy="105"
                                    r="8"
                                    className="text-accent-gold"
                                    fill="currentColor"
                                    stroke="white"
                                    strokeWidth="2" />
                                <circle cx="477" cy="105" r="4" fill="white" />
                                {}
                                <circle
                                    cx="280"
                                    cy="175"
                                    r="8"
                                    className="text-accent-gold"
                                    fill="currentColor"
                                    stroke="white"
                                    strokeWidth="2" />
                                <circle cx="280" cy="175" r="4" fill="white" />
                                {}
                                <circle
                                    cx="190"
                                    cy="285"
                                    r="8"
                                    className="text-accent-gold"
                                    fill="currentColor"
                                    stroke="white"
                                    strokeWidth="2" />
                                <circle cx="190" cy="285" r="4" fill="white" />
                                {}
                                {}
                                <text
                                    x="343"
                                    y="455"
                                    textAnchor="middle"
                                    fill="#003C7E"
                                    stroke="white"
                                    strokeWidth="3"
                                    paintOrder="stroke"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Sanya</text>
                                <text
                                    x="343"
                                    y="455"
                                    textAnchor="middle"
                                    fill="#003C7E"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Sanya</text>
                                {}
                                <text
                                    x="465"
                                    y="400"
                                    textAnchor="start"
                                    fill="#003C7E"
                                    stroke="white"
                                    strokeWidth="3"
                                    paintOrder="stroke"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Lingshui</text>
                                <text
                                    x="465"
                                    y="400"
                                    textAnchor="start"
                                    fill="#003C7E"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Lingshui</text>
                                {}
                                <text
                                    x="520"
                                    y="345"
                                    textAnchor="start"
                                    fill="#003C7E"
                                    stroke="white"
                                    strokeWidth="3"
                                    paintOrder="stroke"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Wanning</text>
                                <text
                                    x="520"
                                    y="345"
                                    textAnchor="start"
                                    fill="#003C7E"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Wanning</text>
                                {}
                                <text
                                    x="575"
                                    y="205"
                                    textAnchor="start"
                                    fill="#003C7E"
                                    stroke="white"
                                    strokeWidth="3"
                                    paintOrder="stroke"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Qinglan</text>
                                <text
                                    x="575"
                                    y="205"
                                    textAnchor="start"
                                    fill="#003C7E"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Qinglan</text>
                                {}
                                <text
                                    x="477"
                                    y="88"
                                    textAnchor="middle"
                                    fill="#003C7E"
                                    stroke="white"
                                    strokeWidth="3"
                                    paintOrder="stroke"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Haikou</text>
                                <text
                                    x="477"
                                    y="88"
                                    textAnchor="middle"
                                    fill="#003C7E"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Haikou</text>
                                {}
                                <text
                                    x="260"
                                    y="160"
                                    textAnchor="end"
                                    fill="#003C7E"
                                    stroke="white"
                                    strokeWidth="3"
                                    paintOrder="stroke"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Yang Pu</text>
                                <text
                                    x="260"
                                    y="160"
                                    textAnchor="end"
                                    fill="#003C7E"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Yang Pu</text>
                                {}
                                <text
                                    x="170"
                                    y="290"
                                    textAnchor="end"
                                    fill="#003C7E"
                                    stroke="white"
                                    strokeWidth="3"
                                    paintOrder="stroke"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Dongfang</text>
                                <text
                                    x="170"
                                    y="290"
                                    textAnchor="end"
                                    fill="#003C7E"
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: 700
                                    }}>Dongfang</text>
                                {}
                                <g transform="translate(20, 440)">
                                    <rect
                                        x="0"
                                        y="0"
                                        width="170"
                                        height="50"
                                        rx="6"
                                        fill="white"
                                        fillOpacity="0.9"
                                        stroke="#C8D2DE"
                                        strokeWidth="1" />
                                    <line
                                        x1="12"
                                        y1="16"
                                        x2="42"
                                        y2="16"
                                        className="text-accent-gold"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeDasharray="5 4" />
                                    <text
                                        x="50"
                                        y="20"
                                        fill="#1A2332"
                                        style={{
                                            fontSize: "10px"
                                        }}>Full Round (680 NM)</text>
                                    <line
                                        x1="12"
                                        y1="36"
                                        x2="42"
                                        y2="36"
                                        className="text-primary-bright"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeDasharray="4 4" />
                                    <text
                                        x="50"
                                        y="40"
                                        fill="#1A2332"
                                        style={{
                                            fontSize: "10px"
                                        }}>Half Round (280 NM)</text>
                                </g>
                            </svg>
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
                        {waypoints.map((wp, index) => {
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