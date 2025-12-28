import { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import WorkGrid from '@/components/WorkGrid'
import { caseStudies } from '@/data/caseStudies'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
    title: "Work | Dhema'alam Fajrianto",
    description: 'Case studies showcasing product management work across fintech, edtech, and AI platforms.',
}

export default function WorkPage() {
    return (
        <div className="pt-24 md:pt-32 pb-20">
            <div className="section-container">
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <span className="inline-block text-accent-400 text-sm font-semibold uppercase tracking-wider mb-4">
                        Portfolio
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        My <span className="gradient-text">Work</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        A selection of products and platforms I’ve helped shape—from early analysis to execution.
                        Each case study follows a <span className="text-foreground font-medium">problem</span> → <span className="text-foreground font-medium">thinking</span> → <span className="text-foreground font-medium">outcome structure</span>, showcasing how I translate complex business challenges into clear product decisions, scalable systems, and measurable impact.
                    </p>
                </div>

                {/* Case Studies Grid */}
                {/* Case Studies Grid with Sorting */}
                <WorkGrid initialCaseStudies={caseStudies} />

                {/* NDA Note & Call to Action */}
                <div className="mt-20 border border-dashed border-border rounded-2xl p-8 md:p-12 text-center bg-muted/30">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-500/10 rounded-xl mb-6 text-2xl">
                        💡
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Looking for deeper insights?</h3>
                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
                        Due to non-disclosure agreements, some specific metrics and strategic details are omitted here.
                        However, I’m always open to walking through my process and methodology in a private conversation.
                    </p>
                    <a
                        href={profile.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
                    >
                        Let&apos;s Schedule a Chat
                    </a>
                </div>
            </div>
        </div>
    )
}
