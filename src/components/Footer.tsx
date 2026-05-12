import Link from 'next/link'
import { profile } from '@/data/profile'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative border-t border-foreground/15 mt-24 grain">
            <div className="section-container py-16 md:py-24 relative z-10">
                {/* Top: huge editorial CTA */}
                <div className="border-b border-foreground/15 pb-16 mb-12">
                    <div className="grid grid-cols-12 gap-6 items-end">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="mono-label text-foreground/50 mb-6">
                                <span className="text-vermillion">●</span> 05 — Get in touch
                            </div>
                            <h2 className="h-display text-balance">
                                Let&apos;s ship
                                <span className="ital text-vermillion"> something</span>
                                <br className="hidden md:block" /> meaningful
                                <span className="text-vermillion">.</span>
                            </h2>
                        </div>
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
                            <a
                                href={`mailto:${profile.email}`}
                                data-testid="footer-email"
                                className="btn-ink justify-between w-full"
                            >
                                <span>{profile.email}</span>
                                <span aria-hidden>→</span>
                            </a>
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="footer-linkedin"
                                className="btn-outline justify-between w-full"
                            >
                                <span>LinkedIn</span>
                                <span aria-hidden>↗</span>
                            </a>
                            <a
                                href={profile.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="footer-whatsapp"
                                className="btn-outline justify-between w-full"
                            >
                                <span>WhatsApp</span>
                                <span aria-hidden>↗</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mid columns */}
                <div className="grid grid-cols-12 gap-6 mb-16">
                    <div className="col-span-12 md:col-span-6">
                        <div className="font-serif text-3xl leading-tight tracking-tight mb-3">
                            Dhema<span className="text-vermillion">.</span>
                        </div>
                        <p className="text-sm text-foreground/65 max-w-md">
                            {profile.shortBio}
                        </p>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <div className="mono-label text-foreground/40 mb-4">Navigate</div>
                        <ul className="space-y-2 text-sm">
                            {[
                                ['Index', '/'],
                                ['About', '/about'],
                                ['Work', '/work'],
                                ['Journal', '/blog'],
                                ['Contact', '/contact'],
                            ].map(([label, href]) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-foreground/75 hover:text-vermillion link-underline transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-6 md:col-span-3">
                        <div className="mono-label text-foreground/40 mb-4">Elsewhere</div>
                        <ul className="space-y-2 text-sm">
                            {[
                                ['LinkedIn', profile.linkedin],
                                ['GitHub', profile.github],
                                ['Twitter / X', profile.twitter],
                                ['Email', `mailto:${profile.email}`],
                                ['Resume', profile.resume],
                            ].map(([label, href]) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground/75 hover:text-vermillion link-underline transition-colors"
                                    >
                                        {label} ↗
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="grid grid-cols-12 border-t border-foreground/15 pt-6 mono-label text-foreground/45 gap-y-2">
                    <div className="col-span-12 md:col-span-4">© {year} Dhema. All rights reserved.</div>
                    <div className="col-span-12 md:col-span-4 md:text-center">
                        Jakarta · Indonesia · UTC+7
                    </div>
                    <div className="col-span-12 md:col-span-4 md:text-right">
                        Set in Instrument Serif · Geist · JetBrains Mono
                    </div>
                </div>
            </div>

            {/* Giant background wordmark */}
            <div className="select-none pointer-events-none overflow-hidden border-t border-foreground/15">
                <div className="font-serif text-[28vw] leading-[0.78] tracking-tightest text-foreground/[0.05] text-center">
                    Dhema<span className="ital text-vermillion/20">.</span>
                </div>
            </div>
        </footer>
    )
}
