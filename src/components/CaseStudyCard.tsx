'use client'

import Link from 'next/link'
import { CaseStudy } from '@/data/caseStudies'
import { trackCaseStudyView } from '@/lib/analytics'

interface CaseStudyCardProps {
    caseStudy: CaseStudy
    featured?: boolean
}

export default function CaseStudyCard({ caseStudy, featured = false }: CaseStudyCardProps) {
    return (
        <Link
            href={`/work/${caseStudy.slug}`}
            onClick={() => trackCaseStudyView(caseStudy.title)}
            className="h-full block"
        >
            <article
                className={`group glass-card overflow-hidden hover-lift h-full flex flex-col ${featured ? 'md:col-span-2' : ''
                    }`}
            >
                {/* Card Header */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-accent-500/10 text-accent-400 text-xs font-medium rounded-full">
                            {caseStudy.industry}
                        </span>
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                            {caseStudy.period}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-accent-400 transition-colors">
                        {caseStudy.title}
                    </h3>

                    {/* Company */}
                    <p className="text-muted-foreground text-sm mb-4">{caseStudy.company}</p>

                    {/* Summary */}
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {caseStudy.summary}
                    </p>

                    {/* Outcomes Preview */}
                    <div className="flex flex-wrap gap-4 mt-auto">
                        {caseStudy.outcomes.slice(0, 3).map((outcome, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-accent-500 rounded-full" />
                                <span className="text-sm text-foreground font-medium">
                                    {outcome.metric}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center text-accent-400 text-sm font-medium">
                        <span>Read case study</span>
                        <span className="ml-2 group-hover:translate-x-2 transition-transform">
                            →
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}
