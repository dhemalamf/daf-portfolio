'use client'

import { profile } from '@/data/profile'
import { trackButtonClick } from '@/lib/analytics'

const channels = [
    {
        n: '01',
        label: 'Email',
        value: profile.email,
        href: `mailto:${profile.email}`,
        note: 'Best for considered conversations & briefs.',
    },
    {
        n: '02',
        label: 'WhatsApp',
        value: 'Direct message',
        href: profile.whatsapp,
        external: true,
        note: 'Quickest channel — usually a reply within a day.',
    },
    {
        n: '03',
        label: 'LinkedIn',
        value: '/in/dhemalamf',
        href: profile.linkedin,
        external: true,
        note: 'Connect, follow my updates, or reach out professionally.',
    },
    {
        n: '04',
        label: 'GitHub',
        value: '@dhemalamf',
        href: profile.github,
        external: true,
        note: 'Where the side-projects live.',
    },
    {
        n: '05',
        label: 'Twitter / X',
        value: '@alam_dhema',
        href: profile.twitter,
        external: true,
        note: 'Occasional product & AI musings.',
    },
]

export default function ContactPage() {
    return (
        <>
            <section className="pt-36 md:pt-44 pb-12 border-b border-foreground/15">
                <div className="section-container">
                    <div className="mono-label text-foreground/50 mb-6">
                        <span className="text-vermillion">●</span> 04 — Contact
                    </div>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
                        <div className="col-span-12 lg:col-span-8">
                            <h1 className="h-display text-balance">
                                Say
                                <span className="ital text-vermillion"> hello</span>.
                            </h1>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l lg:border-foreground/15">
                            <p className="text-foreground/75 text-base md:text-lg leading-relaxed text-pretty">
                                Whether you have a product role, a collaboration idea, or simply want
                                to talk shop — I&apos;d love to hear from you.
                            </p>
                            <div className="mt-6 flex items-center gap-2 mono-label">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>
                                <span className="text-emerald-700 dark:text-emerald-400">Currently available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Channels */}
            <section className="py-16 md:py-24">
                <div className="section-container">
                    <ul className="border-t border-foreground/20">
                        {channels.map((c) => (
                            <li
                                key={c.label}
                                data-testid={`contact-channel-${c.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
                            >
                                <a
                                    href={c.href}
                                    target={c.external ? '_blank' : undefined}
                                    rel={c.external ? 'noopener noreferrer' : undefined}
                                    onClick={() => trackButtonClick(`contact_${c.label.toLowerCase()}`)}
                                    className="group grid grid-cols-12 gap-6 items-baseline py-8 md:py-10 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors"
                                >
                                    <div className="col-span-12 md:col-span-1 mono-label text-foreground/40 group-hover:text-vermillion transition-colors">
                                        {c.n}
                                    </div>
                                    <div className="col-span-12 md:col-span-3 mono-label text-foreground/60">
                                        {c.label}
                                    </div>
                                    <div className="col-span-12 md:col-span-5">
                                        <div className="font-serif text-3xl md:text-4xl leading-tight tracking-tight group-hover:text-vermillion transition-colors">
                                            {c.value}
                                        </div>
                                        <div className="text-foreground/60 text-sm mt-1">{c.note}</div>
                                    </div>
                                    <div className="col-span-12 md:col-span-3 md:text-right">
                                        <span className="mono-label text-foreground/55 group-hover:text-vermillion transition-colors">
                                            {c.external ? 'Open ↗' : 'Compose →'}
                                        </span>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Resume CTA */}
                    <div className="mt-16 border border-foreground/15 p-8 md:p-12 grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-12 md:col-span-8">
                            <div className="mono-label text-vermillion mb-3">CV</div>
                            <h3 className="font-serif text-3xl tracking-tight leading-tight mb-2">
                                Or skim the résumé.
                            </h3>
                            <p className="text-foreground/65 text-sm">
                                One-page version, updated for Q1 2026.
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-4 md:text-right">
                            <a
                                href={profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackButtonClick('contact_resume')}
                                className="btn-ink"
                                data-testid="contact-resume-btn"
                            >
                                Download CV <span aria-hidden>↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
