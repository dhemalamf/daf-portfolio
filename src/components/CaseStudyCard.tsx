'use client'

import Link from 'next/link'
import { CaseStudy } from '@/data/caseStudies'
import { trackCaseStudyView } from '@/lib/analytics'
import { m as motion } from 'framer-motion'
import WireframePlaceholder from '@/components/WireframePlaceholder'

interface CaseStudyCardProps {
    caseStudy: CaseStudy
    featured?: boolean
    index?: number
}

export default function CaseStudyCard({
    caseStudy,
    featured = false,
    index = 0,
}: CaseStudyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            className="h-full"
        >
            <Link
                href={`/work/${caseStudy.slug}`}
                onClick={() => trackCaseStudyView(caseStudy.title)}
                data-testid={`case-study-card-${caseStudy.slug}`}
                className={`group relative block h-full surface-card overflow-hidden transition-colors duration-300 hover:border-foreground/40 ${
                    featured ? 'lg:flex lg:flex-row' : ''
                }`}
            >
                <article
                    className={`p-6 md:p-8 lg:p-10 flex flex-col h-full ${featured ? 'lg:w-1/2' : ''}`}
                >
                    <div className={featured ? 'mb-7 lg:hidden' : 'mb-7'}>
                        <WireframePlaceholder
                            variant={caseStudy.visual ?? 'flow'}
                        />
                    </div>

                    {/* Top meta */}
                    <div className="flex items-center gap-3 mb-6 mono-label text-foreground/70">
                        <span>{caseStudy.industry}</span>
                        <span className="text-foreground/25">/</span>
                        <span>{caseStudy.period}</span>
                    </div>

                    {/* Title */}
                    <h3
                        className={`font-sans font-semibold tracking-tight leading-[1.05] mb-4 text-foreground transition-colors duration-300 group-hover:text-cobalt ${
                            featured
                                ? 'text-3xl md:text-4xl lg:text-5xl'
                                : 'text-2xl md:text-3xl'
                        }`}
                    >
                        {caseStudy.title}
                    </h3>

                    {/* Company */}
                    <p className="text-sm text-foreground/70 mb-6">{caseStudy.company}</p>

                    {/* Summary */}
                    <p
                        className={`text-foreground/70 leading-relaxed mb-7 text-pretty ${
                            featured ? 'text-base md:text-lg' : 'text-sm md:text-base line-clamp-3'
                        }`}
                    >
                        {caseStudy.summary}
                    </p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Outcomes */}
                    <div className="border-t border-foreground/10 pt-5 mb-6 space-y-2">
                        {caseStudy.outcomes.slice(0, featured ? 3 : 2).map((o) => (
                            <div key={o.metric} className="text-sm text-foreground/85">
                                {o.metric}
                            </div>
                        ))}
                    </div>

                    {/* Read CTA */}
                    <div className="flex items-center justify-between">
                        <span className="mono-label text-foreground/70 group-hover:text-cobalt transition-colors">
                            Read case study
                        </span>
                        <span
                            className="inline-flex items-center justify-center w-9 h-9 border border-foreground/20 text-foreground/60 group-hover:bg-cobalt group-hover:text-white group-hover:border-cobalt transition-all"
                            aria-hidden
                        >
                            <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </article>

                {featured && (
                    <div className="hidden lg:flex lg:w-1/2 items-center border-l border-border bg-foreground/[0.02] p-6">
                        <WireframePlaceholder
                            variant={caseStudy.visual ?? 'flow'}
                            className="w-full"
                        />
                    </div>
                )}
            </Link>
        </motion.div>
    )
}
