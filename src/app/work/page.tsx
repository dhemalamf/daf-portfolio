import { Metadata } from 'next'
import WorkGrid from '@/components/WorkGrid'
import { caseStudies } from '@/data/caseStudies'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
    title: "Work — Dhema'alam Fajrianto",
    description: 'Case studies across fintech, edtech, government, and AI platforms.',
}

export default function WorkPage() {
    return (
        <>
            <section className="pt-36 md:pt-44 pb-12 border-b border-foreground/15">
                <div className="section-container">
                    <div className="mono-label text-foreground/50 mb-6">
                        <span className="text-vermillion">●</span> 02 — Selected work
                    </div>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
                        <div className="col-span-12 lg:col-span-8">
                            <h1 className="h-display text-balance">
                                Case
                                <span className="ital text-vermillion"> studies</span>.
                            </h1>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l lg:border-foreground/15">
                            <p className="text-foreground/75 text-base md:text-lg leading-relaxed text-pretty">
                                Products I&apos;ve helped shape — each told as{' '}
                                <span className="text-foreground">problem</span> →{' '}
                                <span className="text-foreground">approach</span> →{' '}
                                <span className="text-foreground">outcome</span>. Some details are NDA-redacted.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="section-container">
                    <WorkGrid initialCaseStudies={caseStudies} />

                    {/* NDA / outreach panel */}
                    <div className="mt-20 border border-foreground/15 p-8 md:p-12 grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-12 md:col-span-8">
                            <div className="mono-label text-vermillion mb-3">Note</div>
                            <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight mb-3">
                                Looking for deeper insights?
                            </h3>
                            <p className="text-foreground/70 leading-relaxed">
                                Some specific metrics and strategic details are NDA-redacted. Happy to
                                walk through my process and methodology in a private conversation.
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-4 md:text-right">
                            <a
                                href={profile.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ink"
                                data-testid="work-chat-cta"
                            >
                                Schedule a chat <span aria-hidden>↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
