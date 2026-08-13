"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Calendar, MapPin, Mail, Download } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function NoticeOfRacePage() {
  useEffect(() => {
    document.title = "Notice of Race 2026 | Round Hainan Regatta";
  }, []);

  const sections: { heading: string; paragraphs: string[]; list?: string[] }[] = [
    {
      heading: "Overview",
      paragraphs: [
        "The regatta consists of Inshore Races (Sanya Inshore Race & Lingshui Inshore Race / Island Lap Race) and Offshore Races (Sanya–Haikou–Sanya Full Round Hainan Island Offshore Race; Sanya–Lingshui–Sanya Half Round Hainan Island Offshore Race).",
        "The regatta is open to Dubois 50 Class, ORC Full Round Class, ORC Half Round Class, and Fareast 28R Class. Dubois 50 Class and ORC Full Round Class will compete in the Full Round Hainan Island Offshore Race. ORC Half Round Class will compete in the Half Round Hainan Island Offshore Race. Fareast 28R Class will compete in the Sanya Inshore Races.",
      ],
    },
    {
      heading: "Rules",
      paragraphs: [
        "The event is governed by the rules as defined in The Racing Rules of Sailing. The latest version of the following rules will also apply:",
      ],
      list: [
        "IMS Rules",
        "ORC Rating Systems Rules",
        "DP World Sailing Offshore Special Regulations (OSR) for Category 3, with the following additions: Liferaft complying with OSR Category 2 is required for offshore races only.",
        "The boat's AIS shall be active from the first day of equipment inspection until the end of the event.",
        "Jackstays shall be mounted on the deck for the offshore races only from the moment when boats are leaving the docks. This changes OSR 4.04.",
        "Life Jackets as defined in OSR 5.01 shall be worn while a boat is afloat, except when she is made fast or moored or if the crew is below deck.",
        "For the offshore races, the navigation rules of the International Regulations for Preventing Collisions at Sea (IRPCAS) replace RRS Part 2 from 18:00 to 07:00.",
        "A breach of RRS 56.2 shall not be grounds for protest by a boat. This changes RRS 60.1.",
        "No national authority prescriptions will apply.",
        "If there is a conflict between languages, the English text takes precedence.",
        "RRS Appendix T – Arbitration and Mediation shall be enforced. The following text is added after the first sentence of RRS Appendix T1(b): \u201CIf a boat incurs post-race penalties prior to arbitration and mediation, such post-race penalties shall equal 20% of the scoring penalties calculated under Rule 44.3(c).\u201D",
        "On-water enforcement of Appendix UA — Recommended On-Water Penalties (Appendix 4) shall apply during racing.",
        "RRS 60.4(a)(2) is amended to read: \u201C(2) if a protest is lodged by a boat alleging a breach of Part II of the RRS or RRS 31, where the protesting boat was not involved in and did not witness the incident; or\u201D.",
      ],
    },
    {
      heading: "Sailing Instructions",
      paragraphs: [
        "Sailing Instructions will be available for each entrant at completion of the registration formalities.",
      ],
    },
    {
      heading: "Communication",
      paragraphs: [
        "The online Official Notice Board (ONB) is located at RHN Online platform. Communication with competitors will be through online ONB with additional courtesy information by e-mail and/or WeChat. Each boat shall have at least one device connected to the Internet with WeChat installed. On the water, the race committee will make courtesy broadcasts to competitors on VHF radio.",
        "[DP] All boats shall be equipped with a maritime satellite phone.",
        "[DP] RRS 41(c) is changed as follows: A boat shall not receive help from any outside source, except help in the form of information which is freely available to all boats, whether or not by payment of a fee or subscription. This shall not include interpretation of information gathered by advice from any source not on the boat specific to the boat and her situation. Downloading charts, weather and/or tidal GRIB files from subscription services, or having such information passed to the boat in its pure form, is permitted; but receiving messages or information which is the result of interpretation from outside of the boat is not permitted.",
      ],
    },
    {
      heading: "Eligibility & Entry — Boat Eligibility",
      paragraphs: [
        "Dubois 50 Class: The Organizing Committee (OC) will provide 6 Dubois 50 racing boats with third-party liability insurance and meeting the WS OSR for a Race Category 3 Monohulls with Liferaft to compete in one-design class. Dubois 50 will sail the Full Round Hainan Island race.",
        "ORC Class: Boats eligible to enter shall meet the WS OSR for Race Category 3 Monohulls with Liferaft and comply with the definition of Monohull Sailboat not less than 35 feet (Full Round) / 32 feet (Half Round) LOA. OC will group the ORC Class based on Design Type, Current Rating, Hull Factor, Hull Length (HL), and Displacement Length Ratio (DLR). Competitors shall comply with the World Sailing Eligibility Code.",
        "Fareast 28R Class: All Fareast 28R monohulls used for the race are provided by the OC. Each boat carries third-party liability insurance and complies with World Sailing safety standards for competitors. The Fareast 28R Class shall compete in the Sanya Inshore Race.",
        "Boat Insurance is required by NOR 20.1. The event is open to all boats with a valid 2026 ORC Certificate. Boats are required to provide a legally valid certificate of ownership, Certificate of Seaworthiness, or an equivalent document within the validity period.",
      ],
    },
    {
      heading: "Crew Eligibility",
      paragraphs: [
        "The regatta is open to entries from local and international sailors (crew) who may be representing a country / city / club (or simply an individual boat owner) and have reached the age of 18 before October 31, 2026.",
        "Each participating boat shall have at least 2 (Full Round) or 2 (Half Round) crew members who have completed a Category 3 offshore race (or corresponding nautical miles) as helmsman, and 60% (Full Round) or 50% (Half Round) of the crew have experience of participating in offshore races. Details shall be stated in the crew list for online registration.",
        "At least 60% (Full Round) or 50% (Half Round) of the crew members shall hold the WS-approved International Standards of Safety and Lifesaving Training Certificate, or its equivalent.",
        "At least 1 crew member aboard each Fareast 28R entry shall hold relevant inshore race helm experience, and 2 crew members shall have inshore race experience. Full particulars shall be specified in the crew list submitted at registration.",
        "The skipper or experienced crew members should hold valid A1F, A2F, ASA, CYA, RYA, or other yacht driving licenses, or at least an offshore skipper certificate.",
      ],
    },
    {
      heading: "Entry",
      paragraphs: [
        "Participating boats must submit team information to roundhainanregatta@foxmail.com (Official Registration Email) before 18:00 Friday, October 9, 2026. Documents required:",
      ],
      list: [
        "Entry form and crew experience statement",
        "Valid personal maritime safety and lifesaving qualification certificate",
        "Valid first aid safety certificate or equivalent",
        "Photocopy of a valid crew ID / passport / pass",
        "Valid crew driving license",
        "Maritime satellite phone number (NoR 3.3)",
        "Signed disclaimer and consent of rights (each crew member)",
        "Valid boat and crew insurance (crew insurance can be purchased at registration)",
        "Boat AIS MMSI nine-digit code and registered boat name",
        "Valid 2026 ORC certificate",
        "Team group photo and introduction",
        "Valid boat certificates",
      ],
    },
    {
      heading: "Fees & Charter",
      paragraphs: [
        "The entry fee includes accreditation, souvenirs, and tickets for the Opening & Prize-Giving Ceremony within the crew quota stated in the seaworthiness certificate. Extra crew may pay RMB 300 to obtain accreditation and ceremony tickets.",
        "For withdrawals before October 15, 2026 (except force majeure), the OC will deduct a 3% handling fee; withdrawals after October 15, 2026 are non-refundable.",
        "The OC provides RHN-Dubois 50 & Fareast 28R sailboat charter services. All chartered boats are allocated through an online draw held before the race. Deposits will be returned once all boat equipment is checked and accepted after the races. Any damage must be compensated at full replacement price.",
        "All boats participating in offshore races (except the Inshore class) must install YB Iridium satellite trackers; the OC will levy a charge for satellite communication services.",
      ],
    },
    {
      heading: "Groups",
      paragraphs: [
        "Dubois 50 Class and ORC Full Round Class will compete in Sanya Inshore Race and Sanya–Haikou–Sanya Full Round Hainan Island Offshore Race.",
        "ORC Half Round Class will compete in Sanya Inshore Race, Lingshui Inshore Race, and Sanya–Lingshui–Sanya Half Round Hainan Island Offshore Race.",
        "Fareast 28R Class will compete in the Sanya Inshore Races.",
      ],
    },
    {
      heading: "Schedule",
      paragraphs: [
        "Full Round: Sanya–Haikou Offshore Race approximately 45–60 hours; Haikou–Sanya Offshore Race approximately 24–40 hours for the slowest boat.",
        "Half Round: Sanya–Lingshui approximately 10–18 hours; Lingshui–Sanya approximately 10–16 hours for the slowest boat.",
        "Inshore races will be approximately 1 to 1.5 hours. Schedule may change depending on weather and wind conditions.",
      ],
    },
    {
      heading: "Equipment Inspection",
      paragraphs: [
        "Each boat shall have a valid 2026 ORC certificate issued up to November 29, 2026. Certificates issued after that date may be accepted only at the request of the relevant ORC Rating office (this changes RRS 78.2).",
        "No changes shall be made on ORC certificates after November 20, 2026 unless prescribed and approved by the technical committee for correcting errors before the pre-race equipment inspection.",
        "Boats shall be available for equipment inspection from November 29 to 31, 2026. Booking will be available through the Race Office. Inspection follows OSR Category 3 Safety Regulations and OC special safety regulations. See the Inspection List for details. Measurement and rules compliance inspections continue throughout the regatta.",
      ],
    },
    {
      heading: "Venue",
      paragraphs: [
        "The venue for the event is Sanya Serenity Marina. Offshore courses cover the maritime waters around Hainan Island. Inshore racing area is Sanya Bay & Clearwater Bay. Refer to Appendix 2 for details.",
      ],
    },
    {
      heading: "Scoring",
      paragraphs: [
        "The Low Point System applies as defined in RRS Appendix A.",
        "Inshore race results will be determined by corrected times using Polar Curve Scoring and constructed course scoring method. Coastal race results use single insert ToT or ToD calculated by the ORC Weather Routing. The list of ratings will be published no later than one hour before the start.",
        "Dubois 50 & ORC Full Round: one race is required to constitute the series; scores are the sum of Sanya–Haikou and Haikou–Sanya Offshore Races. All teams shall participate in the Inshore race; failure to comply will be penalized with 300 minutes added to the offshore elapsed time.",
        "ORC Half Round: one race is required to constitute the series; scores are the sum of Inshore, Sanya–Lingshui, and Lingshui–Sanya Offshore Races.",
        "Fareast 28R: eight races are planned; one race constitutes the series. When 5+ inshore races are completed, the worst inshore score is dropped.",
      ],
    },
    {
      heading: "Risk Statement",
      paragraphs: [
        "RRS 3 states: \u2018The responsibility for a boat\u2019s decision to participate in a race or to continue to race is hers alone.\u2019 By participating, each competitor agrees that sailing is potentially dangerous with inherent risks: strong winds, rough seas, sudden weather changes, equipment failure, boat handling errors, poor seamanship by other boats, loss of balance, fatigue and increased risk of injury — including permanent, catastrophic injury or death by drowning, trauma, hypothermia, or other causes.",
        "All crew members shall sign the Disclaimer of Liability and Declaration provided by the OC — refer to Appendix 6.",
      ],
    },
    {
      heading: "Insurance",
      paragraphs: [
        "Each boat shall be insured with valid third-party liability insurance with a minimum coverage of RMB 3,000,000.",
        "Every team member shall have personal accidental insurance with a minimum coverage of RMB 800,000 or equivalent per event. The OC will arrange an insurance company on site.",
      ],
    },
    {
      heading: "Prizes",
      paragraphs: [
        "Awards and race prizes are available for all classes, including Dubois 50, ORC Full & Half groups, and Fareast 28R. Detailed awards and prize money arrangements will be released via supplementary notice.",
      ],
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
                <FileText className="w-3.5 h-3.5" />
                Official Document
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight max-w-3xl">
                Notice of Race 2026
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/85 max-w-2xl">
                15th Round Hainan Regatta &middot; October 31 – November 7, 2026 &middot; Sanya, Hainan, China
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* BACK LINK */}
      <section className="bg-white py-8 border-b border-primary-deep/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/course"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-gold transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to The Course
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/downloads/15th-Round-Hainan-Regatta-2026-Notice-of-Race.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-deep transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-gold" />
              October 31 – November 7, 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-gold" />
              Sanya, Hainan, China
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {sections.map((sec, idx) => (
            <RevealOnScroll key={sec.heading} delay={Math.min(idx * 0.03, 0.3)}>
              <div className="mb-10 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-deep mb-4 border-l-4 border-accent-gold pl-4">
                  {sec.heading}
                </h2>
                <div className="space-y-4 text-[15px] md:text-base leading-relaxed text-foreground/85">
                  {sec.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {sec.list && (
                    <ul className="mt-3 space-y-2 pl-1">
                      {sec.list.map((li, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-accent-gold" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}

          {/* Contact */}
          <RevealOnScroll delay={0.1}>
            <div className="mt-14 p-6 md:p-8 rounded-2xl bg-surface-container border border-surface-container-high">
              <h3 className="text-xl font-display font-bold text-primary-deep mb-3">
                Further Information
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                For further information, please contact the Round Hainan Regatta Organizing Committee.
              </p>
              <a
                href="mailto:roundhainanregatta@foxmail.com"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
                roundhainanregatta@foxmail.com
              </a>
              <p className="mt-4 text-xs text-muted-foreground italic">
                Round Hainan Regatta Organizing Committee &middot; July 10, 2026
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
