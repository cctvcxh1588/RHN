"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ClipboardCheck, Info, Download } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function InspectionListPage() {
  useEffect(() => {
    document.title = "Inspection List — Race Category 3 | Round Hainan Regatta";
  }, []);

  const pages = [
    { src: "/inspection-1.png", label: "Page 1" },
    { src: "/inspection-2.png", label: "Page 2" },
    { src: "/inspection-3.png", label: "Page 3" },
    { src: "/inspection-4.png", label: "Page 4" },
    { src: "/inspection-5.png", label: "Page 5" },
  ];

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
                <ClipboardCheck className="w-3.5 h-3.5" />
                Appendix 1
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight max-w-3xl">
                Inspection List — Race Category 3
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl">
                Monohulls with Liferaft &middot; Full equipment inspection checklist per World Sailing OSR.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* BACK + INFO */}
      <section className="bg-white py-8 border-b border-primary-deep/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to The Course
          </Link>
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="w-4 h-4 text-accent-gold" />
            {pages.length} pages
          </span>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white pt-14 md:pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="rounded-2xl bg-surface-container border border-surface-container-high p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-display font-bold text-primary-deep mb-3">
                About this checklist
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Every participating boat must complete the equipment inspection based on this checklist prior to the start of the regatta. The inspection follows the World Sailing Offshore Special Regulations (OSR) for Race Category 3 Monohulls with Liferaft, together with the special safety regulations of the Organizing Committee. Skippers must self-inspect, sign, and submit the completed list to the Race Office before the first race.
              </p>
              <a
                href="mailto:roundhainanregatta@foxmail.com"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-gold transition-colors"
              >
                <Download className="w-4 h-4" />
                Request a signed copy from the OC
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* PAGES */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {pages.map((p, i) => (
              <RevealOnScroll key={p.src} delay={Math.min(i * 0.05, 0.2)}>
                <div className="rounded-2xl overflow-hidden shadow-card border border-surface-container-high bg-white">
                  <div className="flex items-center justify-between px-5 py-3 bg-primary-deep text-white">
                    <span className="text-sm font-semibold">{p.label}</span>
                    <span className="text-xs opacity-70">
                      Inspection List &middot; Category 3
                    </span>
                  </div>
                  <div className="relative w-full">
                    <Image
                      src={p.src}
                      alt={`Inspection list ${p.label}`}
                      width={1200}
                      height={1700}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
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
