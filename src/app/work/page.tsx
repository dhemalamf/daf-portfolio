import { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import CaseStudyCard from '@/components/CaseStudyCard'
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
                        Deep dives into products I&apos;ve shaped. Each case study follows the problem → process → outcome framework to show how I approach product challenges.
                    </p>
                </div>

                {/* Case Studies Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {caseStudies.map((caseStudy) => (
                        <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
                    ))}
                </div>

                {/* Note */}
                <div className="mt-16 glass-card p-6 md:p-8 max-w-2xl">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">💡</span>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Looking for more details?</h3>
                            <p className="text-neutral-400 text-sm">
                                Some project details are under NDA. I&apos;m happy to discuss my work in more depth during a conversation.
                                <a href="/contact" className="text-accent-400 hover:underline ml-1">
                                    Let&apos;s connect →
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
