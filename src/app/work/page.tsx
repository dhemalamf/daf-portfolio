import { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import WorkGrid from '@/components/WorkGrid'
import { caseStudies } from '@/data/caseStudies'

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
                    <p className="text-neutral-400 text-lg">
                        A selection of products and platforms I’ve helped shape—from early analysis to execution.
                        Each case study follows a <span className="text-white font-medium">problem</span> → <span className="text-white font-medium">thinking</span> → <span className="text-white font-medium">outcome structure</span>, showcasing how I translate complex business challenges into clear product decisions, scalable systems, and measurable impact.
                    </p>
                </div>

                {/* Case Studies Grid */}
                {/* Case Studies Grid with Sorting */}
                <WorkGrid initialCaseStudies={caseStudies} />

                {/* NDA Note & Call to Action */}
                <div className="mt-20 border border-dashed border-neutral-800 rounded-2xl p-8 md:p-12 text-center bg-neutral-900/30">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-500/10 rounded-xl mb-6 text-2xl">
                        <span className="text-xl"> 💡 </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Looking for deeper insights?</h3>
                    <p className="text-neutral-400 max-w-xl mx-auto leading-relaxed mb-8">
                        Due to non-disclosure agreements, some specific metrics and strategic details are omitted here.
                        However, I’m always open to walking through my process and methodology in a private conversation.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                        Let&apos;s Schedule a Chat
                    </a>
                </div>
            </div>
        </div>
    )
}
