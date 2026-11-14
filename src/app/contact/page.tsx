import type { Metadata } from 'next'
import { profile } from '@/data/profile'
import TrackedLink from '@/components/TrackedLink'

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with Dhema: email, WhatsApp, LinkedIn, or download the resume.',
    alternates: { canonical: '/contact' },
}

const channels = [
    {
        label: 'Email',
        value: profile.email,
        href: `mailto:${profile.email}`,
        note: 'Best for considered conversations & briefs.',
        event: 'contact_email',
    },
    {
        label: 'WhatsApp',
        value: 'Direct message',
        href: profile.whatsapp,
        external: true,
        note: 'Quickest channel, usually a reply within a day.',
        event: 'contact_whatsapp',
    },
    {
        label: 'LinkedIn',
        value: '/in/dhemalamf',
        href: profile.linkedin,
        external: true,
        note: 'Connect, follow my updates, or reach out professionally.',
        event: 'contact_linkedin',
    },
    {
        label: 'GitHub',
        value: '@dhemalamf',
        href: profile.github,
        external: true,
        note: 'Where the side-projects live.',
        event: 'contact_github',
    },
    {
        label: 'Twitter / X',
        value: '@alam_dhema',
        href: profile.twitter,
        external: true,
        note: 'Occasional product & AI musings.',
        event: 'contact_twitter',
    },
]

export default function ContactPage() {
    return (
        <>
            <section className="pt-36 md:pt-44 pb-12 border-b border-foreground/15">
                <div className="section-container">
                    <div className="mono-label text-foreground/65 mb-6">
                        Contact
                    </div>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
                        <div className="col-span-12 lg:col-span-8">
                            <h1 className="h-display text-balance">
                                Say hello.
                            </h1>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l lg:border-foreground/15">
                            <p className="text-foreground/75 text-base md:text-lg leading-relaxed text-pretty">
                                Whether you have a product role, a collaboration idea, or simply want
                                to talk shop. I&apos;d love to hear from you.
                            </p>
                            <div className="mt-6 flex items-center gap-2 mono-label">
                                <span aria-hidden className="inline-flex h-2 w-2 rounded-full bg-foreground/40" />
                                <span className="text-foreground/70">Currently available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="section-container">
                    <ul className="border-t border-foreground/20">
                        {channels.map((channel) => (
                            <li
                                key={channel.label}
                                data-testid={`contact-channel-${channel.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
                            >
                                <TrackedLink
                                    href={channel.href}
                                    target={channel.external ? '_blank' : undefined}
                                    rel={channel.external ? 'noopener noreferrer' : undefined}
                                    event={channel.event}
                                    className="group grid grid-cols-12 gap-6 items-baseline py-8 md:py-10 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors"
                                >
                                    <div className="col-span-12 md:col-span-3 mono-label text-foreground/60">
                                        {channel.label}
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="font-sans font-semibold text-3xl md:text-4xl leading-tight tracking-tight group-hover:text-cobalt transition-colors">
                                            {channel.value}
                                        </div>
                                        <div className="text-foreground/60 text-sm mt-1">{channel.note}</div>
                                    </div>
                                    <div className="col-span-12 md:col-span-3 md:text-right">
                                        <span className="mono-label text-foreground/70 group-hover:text-cobalt transition-colors">
                                            {channel.external ? 'Open ↗' : 'Compose →'}
                                        </span>
                                    </div>
                                </TrackedLink>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-16 border border-foreground/15 p-8 md:p-12 grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-12 md:col-span-8">
                            <div className="mono-label text-foreground/60 mb-3">CV</div>
                            <h2 className="font-sans font-semibold text-3xl tracking-tight leading-tight mb-2">
                                Or skim the résumé.
                            </h2>
                            <p className="text-foreground/65 text-sm">
                                One-page version.
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-4 md:text-right">
                            <TrackedLink
                                href={profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                event="contact_resume"
                                className="btn-ink"
                            >
                                Download CV <span aria-hidden>↗</span>
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
