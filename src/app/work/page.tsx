import { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import WorkGrid from '@/components/WorkGrid'
import { caseStudies } from '@/data/caseStudies'
import { profile } from '@/data/profile'
import FadeIn from '@/components/animations/FadeIn'
import MagneticButton from '@/components/animations/MagneticButton'

export const metadata: Metadata = {
    title: "Work | Dhema'alam Fajrianto",
    description: 'Case studies showcasing product management work across fintech, edtech, and AI platforms.',
}

export default function WorkPage() {
    return (
        <div className="pt-24 md:pt-36 pb-24">
            <div className="section-container">
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <FadeIn>
                        <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
                            Portfolio
                        </span>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                            My <span className="gradient-text">Work</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            A selection of products and platforms I&apos;ve helped shape—from early analysis to execution.
                            Each case study follows a{' '}
                            <span className="text-foreground font-medium">problem</span> →{' '}
                            <span className="text-foreground font-medium">thinking</span> →{' '}
                            <span className="text-foreground font-medium">outcome structure</span>,
                            {' '}showcasing how I translate complex business challenges into clear product decisions, scalable systems, and measurable impact.
                        </p>
                    </FadeIn>
                </div>

                {/* Case Studies Grid */}
                <WorkGrid initialCaseStudies={caseStudies} />

                {/* NDA Note & Call to Action */}
                <FadeIn>
                    <div className="mt-20 glass-card p-8 md:p-12 text-center border-dashed">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-xl mb-6 text-amber-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-display font-bold mb-3 text-foreground">Looking for deeper insights?</h3>
                        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
                            Due to non-disclosure agreements, some specific metrics and strategic details are omitted here.
                            However, I&apos;m always open to walking through my process and methodology in a private conversation.
                        </p>
                        <MagneticButton strength={0.15}>
                            <a
                                href={profile.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-7 py-3.5 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors"
                            >
                                Let&apos;s Schedule a Chat
                            </a>
                        </MagneticButton>
                    </div>
                </FadeIn>
            </div>
        </div>
    )
}
