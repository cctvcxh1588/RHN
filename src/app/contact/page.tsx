"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
    Mail,
    MapPin,
    Send,
    MessageSquare,
    User,
    Phone,
    Globe,
    ExternalLink,
    ChevronRight,
} from "lucide-react";

import RevealOnScroll from "@/components/RevealOnScroll";
import { useLang } from "@/lib/LanguageProvider";

export default function ContactPage() {
    const { t } = useLang();
    useEffect(() => {
        document.title = "Contact Us | Round Hainan Regatta";
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {
            name,
            value
        } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });

        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen">
            {}
            <section
                className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden">
                {}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/hero.jpg')"
                    }} />
                {}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-primary-deep/60 via-primary-deep/40 to-primary-deep/70" />
                {}
                <div
                    className="absolute inset-0 z-[2] pointer-events-none"
                    style={{
                        background: "linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,60,126,0.6) 100%)"
                    }} />
                {}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <RevealOnScroll>
                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-4">{t('contact', 'heroTitle')}
                                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">{t('contact', 'heroSub')}
                                          We're here to help.
                                        </p>
                    </RevealOnScroll>
                </div>
            </section>
            {}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <span
                                className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-4">{t('contact', 'heroBadge')}
                                              </span>
                            <h2
                                className="text-3xl md:text-4xl font-display font-bold text-primary-deep mb-4">{t('contact', 'infoEyebrow')}
                                              </h2>
                            <p
                                className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">Have a question about registration, sponsorship, or the race?
                                                Reach out to us using the form below or through our contact
                                                details.
                                              </p>
                        </div>
                    </RevealOnScroll>
                    {}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {}
                        <RevealOnScroll delay={0.1}>
                            <div className="space-y-8">
                                {}
                                <div
                                    className="flex items-start gap-5 p-6 bg-surface-container rounded-2xl hover:shadow-card transition-shadow">
                                    <div
                                        className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-primary-deep mb-1">Email
                                                                </h3>
                                        <a
                                            href="mailto:roundhainanregatta@foxmail.com"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors">roundhainanregatta@foxmail.com
                                                                </a>
                                    </div>
                                </div>
                                {}
                                <div
                                    className="flex items-start gap-5 p-6 bg-surface-container rounded-2xl hover:shadow-card transition-shadow">
                                    <div
                                        className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-primary-deep mb-1">Location
                                                                </h3>
                                        <p className="text-sm text-muted-foreground">Sanya, Hainan, China
                                                                </p>
                                        <p className="text-xs text-muted-foreground/70 mt-1">Sanya Serenity Marina — Race Village
                                                                </p>
                                    </div>
                                </div>
                                {}
                                <div
                                    className="flex items-start gap-5 p-6 bg-surface-container rounded-2xl hover:shadow-card transition-shadow">
                                    <div
                                        className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shrink-0">
                                        <Globe className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-primary-deep mb-3">Social Media
                                                                </h3>
                                        <div className="flex gap-3">
                                            {}
                                            <a
                                                href="#"
                                                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-accent-gold/10 hover:border-accent-gold transition-all"
                                                aria-label="WeChat">
                                                <svg
                                                    className="w-5 h-5 text-muted-foreground"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.49.49 0 0 1 .178-.554C23.028 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.18 2.769c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
                                                </svg>
                                            </a>
                                            {}
                                            <a
                                                href="#"
                                                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-accent-gold/10 hover:border-accent-gold transition-all"
                                                aria-label="Weibo">
                                                <svg
                                                    className="w-5 h-5 text-muted-foreground"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.788.465-2.001.261-2.572-.456-.57-.716-.529-1.674.228-2.12.758-.447 1.924-.141 2.49.567.567.707.642 1.544.088 2.009l-.234.004zm-2.268 1.444c.723.375 1.553.359 2.065.142.511-.217.674-.589.445-.872-.23-.285-.729-.501-1.452-.636-.722-.134-1.177-.062-1.365.19-.188.252.003.62.307.87v.305zm.508-1.075c.193.1.438.154.685.16.247.004.468-.034.618-.114.151-.081.213-.18.157-.27-.056-.088-.256-.148-.561-.192-.424-.06-.707.006-.795.128-.087.119-.037.232.104.288l-.208.02zm-2.009-1.246c1.732.775 3.797.141 4.607-1.413.81-1.556.067-3.576-1.665-4.351-1.73-.775-3.795-.14-4.605 1.415-.81 1.556-.066 3.576 1.663 4.35v-.002zM20.998 8.23c.312-1.168-.052-2.203-.825-2.313-.77-.109-1.575.75-1.886 1.918-.312 1.168.052 2.203.825 2.313.771.11 1.575-.75 1.886-1.918zM15.92 6.557c.523-1.96-.118-3.718-1.43-3.928-1.313-.21-2.702 1.209-3.225 3.17-.523 1.959.118 3.717 1.43 3.927 1.314.21 2.702-1.21 3.225-3.17zM17.9 7.899c.26-.973.01-1.846-.555-1.95-.566-.103-1.213.598-1.473 1.571-.26.973-.01 1.846.555 1.95.566.103 1.213-.598 1.473-1.571z" />
                                                </svg>
                                            </a>
                                            {}
                                            <a
                                                href="#"
                                                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-accent-gold/10 hover:border-accent-gold transition-all"
                                                aria-label="Douyin">
                                                <svg
                                                    className="w-5 h-5 text-muted-foreground"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {}
                                <div
                                    className="p-6 bg-gradient-to-br from-primary-deep to-primary rounded-2xl text-white">
                                    <h3 className="text-sm font-semibold mb-3 text-accent-gold">Race Week
                                                          </h3>
                                    <p className="text-sm text-white/80 leading-relaxed mb-2">
                                        <strong className="text-white">October 31 – November 7, 2026</strong>
                                    </p>
                                    <p className="text-sm text-white/70 leading-relaxed">Sanya Serenity Marina, Hainan, China
                                                          </p>
                                    <div className="mt-4 pt-4 border-t border-white/20">
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-gold hover:text-accent-yellow transition-colors">Register Interest
                                                                  <ExternalLink className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {}
                        <RevealOnScroll delay={0.2}>
                            <div className="bg-surface-container rounded-2xl p-8 lg:p-10 shadow-card">
                                <h3 className="text-xl font-bold text-primary-deep mb-2">Send Us a Message
                                                    </h3>
                                <p className="text-sm text-muted-foreground mb-8">Fill out the form below and we'll get back to you as soon
                                                      as possible.
                                                    </p>
                                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                                    {}
                                    <div>
                                        <label
                                            htmlFor="contact-name"
                                            className="block text-sm font-medium text-primary-deep mb-2">Name <span className="text-accent-coral">*</span>
                                        </label>
                                        <div className="relative">
                                            <User
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                id="contact-name"
                                                name="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your full name"
                                                className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                                        </div>
                                    </div>
                                    {}
                                    <div>
                                        <label
                                            htmlFor="contact-email"
                                            className="block text-sm font-medium text-primary-deep mb-2">Email <span className="text-accent-coral">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                id="contact-email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                                        </div>
                                    </div>
                                    {}
                                    <div>
                                        <label
                                            htmlFor="contact-subject"
                                            className="block text-sm font-medium text-primary-deep mb-2">Subject <span className="text-accent-coral">*</span>
                                        </label>
                                        <div className="relative">
                                            <MessageSquare
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                id="contact-subject"
                                                name="subject"
                                                type="text"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="How can we help?"
                                                className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                                        </div>
                                    </div>
                                    {}
                                    <div>
                                        <label
                                            htmlFor="contact-message"
                                            className="block text-sm font-medium text-primary-deep mb-2">Message <span className="text-accent-coral">*</span>
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your inquiry..."
                                            className="w-full px-4 py-3 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                                    </div>
                                    {}
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 bg-accent-gold text-primary-deep font-semibold rounded-lg hover:bg-accent-gold/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2">
                                        <Send className="w-4 h-4" />
                                        {submitted ? "Message Sent!" : "Send Message"}
                                    </button>
                                    {submitted && <p className="text-center text-sm text-green-600 font-medium">✓ Thank you! Your message has been received. We'll be
                                                              in touch soon.
                                                            </p>}
                                </form>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>
            {}
            <section className="bg-surface-container py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <span
                                className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-gold mb-4">Getting Here
                                              </span>
                            <h2
                                className="text-3xl md:text-4xl font-display font-bold text-primary-deep mb-4">Location & Directions
                                              </h2>
                            <p
                                className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">The Round Hainan Regatta Race Village is located at Sanya
                                                Serenity Marina, one of Asia's premier sailing destinations.
                                              </p>
                        </div>
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Embedded Google Maps — Sanya Serenity Marina */}
                        <RevealOnScroll delay={0.1}>
                            <div className="rounded-2xl overflow-hidden shadow-card bg-white border border-surface-container-high">
                                <iframe
                                    title="Sanya Serenity Marina — Google Maps"
                                    src="https://www.google.com/maps?q=Sanya+Serenity+Marina&hl=en&z=15&output=embed"
                                    width="100%"
                                    height="360"
                                    style={{ border: 0 }}
                                    className="rounded-2xl block"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen />
                                <div className="px-5 py-3 flex items-center justify-between border-t border-surface-container-high bg-surface-container/40">
                                    <span className="text-xs text-muted-foreground">
                                        © Google Maps
                                    </span>
                                    <a
                                        href="https://www.google.com/maps/search/?api=1&query=Sanya+Serenity+Marina+Hainan"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-deep transition-colors">
                                        View larger map
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </RevealOnScroll>
                        {/* Address & directions */}
                        <RevealOnScroll delay={0.2}>
                            <div className="flex flex-col justify-center space-y-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-10 h-10 rounded-xl bg-accent-gold/20 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-accent-gold" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-bold text-primary-deep mb-1">Address
                                                                </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Sanya Serenity Marina (三亚半山半岛帆船港)
                                            <br />Luhuitou Peninsula, Sanya
                                            <br />Hainan Province, China
                                        </p>
                                        {/* Map link buttons — Google Maps + Baidu Maps (for China users) */}
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <a
                                                href="https://www.google.com/maps/search/?api=1&query=Sanya+Serenity+Marina+Hainan"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary-deep transition-colors shadow-sm">
                                                Open in Google Maps
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                            <a
                                                href="https://map.baidu.com/search/三亚半山半岛帆船港"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent-gold text-primary-deep hover:bg-accent-gold/90 transition-colors shadow-sm">
                                                Open in Baidu Maps
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-10 h-10 rounded-xl bg-accent-gold/20 flex items-center justify-center shrink-0">
                                        <svg
                                            className="w-5 h-5 text-accent-gold"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-primary-deep mb-1">By Air
                                                                </h3>
                                        <p className="text-sm text-muted-foreground">Fly into Sanya Phoenix International Airport (SYX). The
                                                                  marina is approximately 15 minutes by taxi.
                                                                </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-10 h-10 rounded-xl bg-accent-gold/20 flex items-center justify-center shrink-0">
                                        <svg
                                            className="w-5 h-5 text-accent-gold"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-primary-deep mb-1">Race Week Dates
                                                                </h3>
                                        <p className="text-sm text-muted-foreground">October 31 – November 7, 2026
                                                                </p>
                                        <p className="text-xs text-muted-foreground/70 mt-1">Skipper briefing: October 30
                                                                </p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>
        </div>
    );
}