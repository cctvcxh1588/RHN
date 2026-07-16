"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Scale, Flag, Info, Download } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function OnWaterPenaltiesPage() {
  useEffect(() => {
    document.title = "Recommended On-Water Penalties | Round Hainan Regatta";
  }, []);

  const signals = [
    {
      color: "from-emerald-500 to-emerald-700",
      label: "Green-and-White Flag",
      sound: "One sound signal",
      meaning:
        "The umpire has seen the incident and considers no rule breach occurred.",
    },
    {
      color: "from-red-500 to-red-700",
      label: "Red Flag",
      sound: "One sound signal",
      meaning:
        "The umpire has seen the incident and considers one or more boats have broken a rule. The umpire shall call out or point out the offending boat(s).",
    },
    {
      color: "from-primary-bright to-primary-deep",
      label: "Flag J",
      sound: "One sound signal",
      meaning:
        "The on-water officials do not have sufficient facts to render a ruling.",
    },
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
                <Scale className="w-3.5 h-3.5" />
                Appendix UA
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight max-w-3xl">
                Recommended On-Water Penalties
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl">
                Umpire observation procedures and signal flags used during racing.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* BACK */}
      <section className="bg-white py-8 border-b border-primary-deep/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to The Course
          </Link>
          <a
            href="/downloads/Recommended-On-Water-Penalties.docx"
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-deep transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download DOCX
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-14">
          <RevealOnScroll>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mb-4 border-l-4 border-accent-gold pl-4">
                1. Umpire Observation
              </h2>
              <p className="text-[15px] md:text-base leading-relaxed text-foreground/85 mb-6">
                Umpires observing racing may make recommended penalty decisions. If an umpire witnesses an incident involving Part II of the RRS or Rule 31, or observes a boat breaking Part II of the RRS or Rule 31, the umpire may display the following signals:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {signals.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl overflow-hidden border border-surface-container-high shadow-card bg-white"
                  >
                    <div className={`h-3 w-full bg-gradient-to-r ${s.color}`} />
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Flag className="w-5 h-5 text-primary" />
                        <h3 className="text-base font-bold text-primary-deep">
                          {s.label}
                        </h3>
                      </div>
                      <p className="text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2">
                        {s.sound}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.meaning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mb-4 border-l-4 border-accent-gold pl-4">
                2. Interpretation & Effect
              </h2>
              <div className="space-y-4 text-[15px] md:text-base leading-relaxed text-foreground/85">
                <p>
                  Signals displayed by umpires are for guidance only. When a red flag is shown, the identified boat is <strong>not required</strong> to take a penalty. However, if the boat fails to take a penalty, other boats may later lodge protests or requests for redress, and the protest committee may also protest against the boat.
                </p>
                <p>
                  If a green-and-white flag is shown, a boat retains the right to lodge a protest or take a voluntary penalty.
                </p>
                <p>
                  If an umpire has displayed a green-and-white flag for an incident, the protest committee may only protest a boat in respect of that incident under RRS 60.4(c)(1) and (2).
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div className="p-6 md:p-8 rounded-2xl bg-accent-gold/10 border-l-4 border-accent-gold">
              <div className="flex gap-4">
                <Info className="w-6 h-6 text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-display font-bold text-primary-deep mb-2">
                    Important Note
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-foreground/85">
                    This appendix does not alter the principle that a competitor who becomes aware of breaking a rule shall <strong>promptly take a penalty</strong> in accordance with Rule 44.2.
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
