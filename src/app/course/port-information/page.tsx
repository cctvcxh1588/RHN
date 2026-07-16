"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Anchor, Compass, Radio, Waves, MapPin } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

interface Port {
  name: string;
  subtitle?: string;
  coord: string;
  depth?: string;
  berths?: string;
  vhf: string;
  highlight?: boolean;
}

const ports: Port[] = [
  {
    name: "Sanya Serenity Marina",
    subtitle: "Host Port",
    coord: "18°12.735′N, 109°28.108′E",
    depth: "6 m (during lowest tide)",
    berths: "325",
    vhf: "VHF 12",
    highlight: true,
  },
  {
    name: "National Sailing Training Base & Public Marina — Haikou",
    subtitle: "Emergency Port of Call",
    coord: "20°01.630′N, 110°16.102′E",
    berths: "610",
    vhf: "VHF 12",
  },
  {
    name: "Lingshui Yaqing International Clearwater Bay Marina",
    coord: "18°24.030′N, 109°52.383′E",
    berths: "780",
    vhf: "VHF 12",
  },
  {
    name: "China Resources Shimei Bay International Marina Club",
    subtitle: "Emergency Port of Call",
    coord: "18°39.017′N, 110°14.867′E",
    depth: "6 m (during lowest tide)",
    berths: "213",
    vhf: "VHF 12",
  },
  {
    name: "CNBAS",
    subtitle: "Emergency Port of Call",
    coord: "19°11′N, 108°37′E",
    depth: "9 m (during lowest tide)",
    vhf: "VHF 08",
  },
  {
    name: "Ocean Flower Island Yacht Club",
    subtitle: "Emergency Port of Call",
    coord: "19°43′N, 109°11′E",
    depth: "8 m (during lowest tide)",
    vhf: "VHF 12",
  },
];

export default function PortInformationPage() {
  useEffect(() => {
    document.title = "Port Information | Round Hainan Regatta";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative h-[50vh] min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/60 via-primary-deep/70 to-primary-deep/95" />
        <div className="relative z-10 w-full pb-12 md:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent-gold/90 text-primary-deep rounded-full mb-5">
                <Anchor className="w-3.5 h-3.5" />
                Appendix 5
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight max-w-3xl">
                Port Information
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl">
                Host port and emergency ports of call along the 680-mile route.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* BACK */}
      <section className="bg-white py-8 border-b border-primary-deep/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to The Course
          </Link>
        </div>
      </section>

      {/* PORT LIST */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ports.map((p) => (
              <RevealOnScroll key={p.name} delay={0.05}>
                <div
                  className={`h-full rounded-2xl border shadow-card overflow-hidden ${
                    p.highlight
                      ? "border-accent-gold/60 bg-gradient-to-br from-accent-gold/5 to-white"
                      : "border-surface-container-high bg-white"
                  }`}
                >
                  <div
                    className={`h-1.5 w-full ${
                      p.highlight
                        ? "bg-gradient-to-r from-accent-gold to-orange-500"
                        : "bg-gradient-to-r from-primary-bright to-primary"
                    }`}
                  />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                          p.highlight
                            ? "bg-accent-gold/20 text-accent-gold"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Anchor className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {p.subtitle && (
                          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-gold mb-1">
                            {p.subtitle}
                          </span>
                        )}
                        <h3 className="text-lg font-display font-bold text-primary-deep leading-tight">
                          {p.name}
                        </h3>
                      </div>
                    </div>

                    <dl className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Compass className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                            Central Coordinate
                          </dt>
                          <dd className="font-mono text-sm text-foreground">
                            {p.coord}
                          </dd>
                        </div>
                      </div>

                      {p.depth && (
                        <div className="flex items-start gap-3">
                          <Waves className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                          <div>
                            <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                              Maximum Depth
                            </dt>
                            <dd className="text-sm text-foreground">
                              {p.depth}
                            </dd>
                          </div>
                        </div>
                      )}

                      {p.berths && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                          <div>
                            <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                              Total Berths
                            </dt>
                            <dd className="text-sm text-foreground">
                              {p.berths}
                            </dd>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <Radio className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
                            Marina VHF Channel
                          </dt>
                          <dd className="text-sm text-foreground font-semibold">
                            {p.vhf}
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
