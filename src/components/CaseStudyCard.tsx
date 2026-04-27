'use client'

import Link from 'next/link'
import { CaseStudy } from '@/data/caseStudies'
import { trackCaseStudyView } from '@/lib/analytics'
import TiltCard from '@/components/animations/TiltCard'

interface CaseStudyCardProps {
    caseStudy: CaseStudy
    featured?: boolean
}

export default function CaseStudyCard({ caseStudy, featured = false }: CaseStudyCardProps) {
    return (
        <Link
            href={`/work/${caseStudy.slug}`}
            onClick={() => trackCaseStudyView(caseStudy.title)}
            className="h-full block group"
        >
            <TiltCard className="h-full" tiltAmount={6} scale={1.01}>
                <article
                    className="glass-card overflow-hidden h-full flex flex-col"
                >
                    {/* Card Header */}
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                            <span className="px-3 py-1 bg-violet-500/10 text-violet-400 text-xs font-medium rounded-full border border-violet-500/10">
                                {caseStudy.industry}
                            </span>
                            <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                                {caseStudy.period}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-display font-bold mb-3 group-hover:text-violet-400 transition-colors duration-300">
                            {caseStudy.title}
                        </h3>

                        {/* Company */}
                        <p className="text-muted-foreground text-sm mb-5">{caseStudy.company}</p>

                        {/* Summary */}
                        <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3">
                            {caseStudy.summary}
                        </p>

                        {/* Outcomes Preview */}
                        <div className="flex flex-wrap gap-3 mt-auto">
                            {caseStudy.outcomes.slice(0, 3).map((outcome, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                                    <span className="text-sm text-foreground font-medium">
                                        {outcome.metric}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Arrow */}
                        <div className="mt-6 flex items-center text-violet-400 text-sm font-medium">
                            <span>Read case study</span>
                            <svg
                                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </article>
            </TiltCard>
        </Link>
    )
}
