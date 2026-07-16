"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, ShieldAlert, Download } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function DisclaimerPage() {
  useEffect(() => {
    document.title = "Disclaimer of Liability and Declaration | Round Hainan Regatta";
  }, []);

  const clauses = [
    "I hereby declare that I have received advice and have been expressly informed of the dangers of this regatta.",
    "In addition, I understand that there are several dangers in this regatta, including factors such as climate, walruses, equipment, and personal ability, which may cause injury or even life-threatening risk to me. I also understand that this regatta will be conducted in waters far away from rescue facilities and medical facilities, and I still choose to continue to participate in this regatta.",
    "I understand and agree that whether it is the organizer, organizer, co-organizer, guiding unit, sponsor unit, its branch; and any employee, supervisor, agent, or transferee of such party (hereinafter referred to as the \u201CExempt Party\u201D) shall not be liable for injury, death, or other damage, whether passive or active, arising out of my participation in this regatta or from the negligent act or negligence of any party (including the Exempt Party), or his family, heir, or transferee, bear any legal responsibility. In consideration of being allowed to participate in this regatta, I hereby accept the risks associated with the above activities, that is, any injury, injury, or damage that I may experience while participating in this race, including all risks foreseeable or unforeseen in connection therewith.",
    "I understand and warrant that I, my family, heirs, or assigns will be held harmless from all claims and actions arising out of my entry and participation in this regatta, including claims arising during or after the regatta.",
    "I also understand that the ocean sailing race is a physically strenuous activity, and I will do my best in the activity. If I am injured due to a heart attack, panic, heat stroke, hypothermia, dehydration, drowning, etc., I expressly assume the risk of such injury, and I do not reserve and waive the right to trace the personal or organizational responsibility listed above.",
    "I also promise to do my best to avoid any act that is not allowed by the laws of various countries and regions, and I will take all responsibility if I accidentally violate the law, because the aforementioned [Exempt Party] has fully warned me to be careful.",
    "In addition, I declare that I am of legal age and competent to sign this release of liability, or that I have obtained the written consent of my parent or guardian.",
    "I am signing this document on the understanding that the terms of this document have the effect of a legal contract and not only a narrative. I am signing this document of my free will and on the understanding that I have waived my legal rights, and if any provision of this Declaration is found to be unenforceable or invalid, that provision may be separated from this Declaration. The remaining provisions of this statement shall be deemed to be unenforceable and have never been included in this Statement.",
    "I hereby use this document to exempt and release the organizers, organizers, co-organizers, guiding units, sponsors, and their branches of the event; and all obligations and liabilities of individual employees, supervisors, agents, or assigns of such parties, the relevant entities as defined above, for personal injury, property damage, or wrongful death arising from any cause, including but not limited to any negligent act or dereliction of duty of the exempted party.",
    "I have read and been fully informed of the contents of this Disclaimer of Liability and Declaration before signing this document on my behalf.",
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
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent-coral/90 text-white rounded-full mb-5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Appendix 6
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight max-w-3xl">
                Disclaimer of Liability & Declaration
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl">
                15th Round Hainan Regatta 2026 &middot; October 31 – November 7
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
            href="/downloads/Disclaimer-of-Liability-and-Declaration.docx"
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-coral text-white text-sm font-semibold hover:bg-accent-coral/90 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download DOCX
          </a>
        </div>
      </section>

      {/* WARNING BANNER */}
      <section className="bg-white pt-14 md:pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="rounded-2xl border-l-4 border-accent-coral bg-accent-coral/5 p-5 md:p-6 flex gap-4">
              <ShieldAlert className="w-6 h-6 text-accent-coral shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-primary-deep mb-1">
                  Please read carefully before signing.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every competitor is required to sign this Disclaimer of Liability and Declaration prior to registration. By signing, you acknowledge that you have understood and accepted the risks of participating in the Round Hainan Regatta.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CLAUSES */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {clauses.map((c, i) => (
              <RevealOnScroll key={i} delay={Math.min(i * 0.02, 0.2)}>
                <div className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-[15px] md:text-base leading-relaxed text-foreground/85 pt-0.5">
                    {c}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Signature block */}
          <RevealOnScroll delay={0.1}>
            <div className="mt-14 p-6 md:p-8 rounded-2xl bg-surface-container border border-surface-container-high">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Participant Signature
                  </p>
                  <div className="h-10 border-b-2 border-dashed border-primary-deep/30" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Date
                  </p>
                  <div className="h-10 border-b-2 border-dashed border-primary-deep/30" />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
