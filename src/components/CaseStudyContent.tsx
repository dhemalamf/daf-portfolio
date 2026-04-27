'use client'

import Link from 'next/link'
import { CaseStudy } from '@/data/caseStudies'
import FadeIn from '@/components/animations/FadeIn'
import AnimatedCounter from '@/components/animations/AnimatedCounter'
import MagneticButton from '@/components/animations/MagneticButton'
import BackToTop from '@/components/BackToTop'

interface CaseStudyContentProps {
    caseStudy: CaseStudy
    relatedStudies: CaseStudy[]
}

export default function CaseStudyContent({ caseStudy, relatedStudies }: CaseStudyContentProps) {
    return (
        <div className="pt-24 md:pt-36 pb-20">
            <article className="section-container">
                {/* Back link */}
                <div className="max-w-4xl mx-auto">
                    <FadeIn>
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors group"
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Back to Work</span>
                        </Link>
                    </FadeIn>
                </div>

                {/* Header */}
                <header className="max-w-4xl mx-auto mb-20">
                    <FadeIn>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1 bg-violet-500/10 text-violet-400 text-sm font-medium rounded-full border border-violet-500/10">
                                {caseStudy.industry}
                            </span>
                            <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                                {caseStudy.period}
                            </span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5">
                            {caseStudy.title}
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-muted-foreground text-lg mb-5">{caseStudy.company}</p>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <p className="text-foreground text-lg leading-relaxed">
                            {caseStudy.summary}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <div className="flex flex-wrap gap-4 mt-8">
                            {caseStudy.articleUrl && (
                                <a
                                    href={caseStudy.articleUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/20"
                                >
                                    Read Full Article
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </FadeIn>
                </header>

                {/* Content */}
                <div className="max-w-4xl mx-auto space-y-20">
                    {/* Challenge */}
                    <section>
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-11 h-11 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400 border border-red-500/10">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-display font-bold">The Challenge</h2>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <p className="text-foreground leading-relaxed text-lg">
                                {caseStudy.challenge}
                            </p>
                        </FadeIn>
                    </section>

                    {/* Process */}
                    <section>
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/10">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-display font-bold">The Process</h2>
                            </div>
                        </FadeIn>
                        <div className="space-y-5 relative">
                            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/30 via-violet-500/10 to-transparent" />
                            {caseStudy.process.map((step, index) => (
                                <FadeIn key={index} delay={index * 0.1}>
                                    <div className="flex gap-5 items-start relative">
                                        <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-violet-400 z-10">
                                            {index + 1}
                                        </div>
                                        <p className="text-foreground pt-2 leading-relaxed">{step}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </section>

                    {/* Solution */}
                    <section>
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-11 h-11 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 border border-violet-500/10">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-display font-bold">The Solution</h2>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <p className="text-foreground leading-relaxed text-lg">
                                {caseStudy.solution}
                            </p>
                        </FadeIn>
                    </section>

                    {/* Outcomes */}
                    <section>
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/10">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-display font-bold">The Outcomes</h2>
                            </div>
                        </FadeIn>
                        <div className="grid md:grid-cols-3 gap-6">
                            {caseStudy.outcomes.map((outcome, index) => (
                                <FadeIn key={index} delay={index * 0.15}>
                                    <div className="glass-card p-8 text-center hover-lift">
                                        <div className="text-2xl md:text-3xl font-display font-bold text-amber-400 mb-3">
                                            <AnimatedCounter value={outcome.metric} />
                                        </div>
                                        <div className="text-base text-muted-foreground leading-relaxed">
                                            {outcome.description}
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </section>

                    {/* Tags */}
                    <section className="pt-8 border-t border-border/50">
                        <FadeIn>
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
                                Skills & Methods
                            </h3>
                        </FadeIn>
                        <div className="flex flex-wrap gap-2">
                            {caseStudy.tags.map((tag, index) => (
                                <FadeIn key={index} delay={index * 0.05}>
                                    <span className="px-4 py-2 bg-muted text-foreground text-sm rounded-xl border border-border/50">
                                        {tag}
                                    </span>
                                </FadeIn>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Next Steps CTA */}
                <div className="max-w-4xl mx-auto mt-20">
                    <FadeIn>
                        <div className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-display font-bold mb-2">Interested in working together?</h3>
                                <p className="text-muted-foreground">
                                    I&apos;d love to discuss how I can bring this same approach to your product challenges.
                                </p>
                            </div>
                            <MagneticButton strength={0.15}>
                                <Link
                                    href="/contact"
                                    className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/20"
                                >
                                    Get in Touch
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </MagneticButton>
                        </div>
                    </FadeIn>
                </div>

                {/* Related Case Studies */}
                {relatedStudies.length > 0 && (
                    <div className="mt-24">
                        <FadeIn>
                            <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">
                                More <span className="gradient-text">Case Studies</span>
                            </h2>
                        </FadeIn>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedStudies.map((study, index) => (
                                <FadeIn key={study.slug} delay={index * 0.1}>
                                    <Link
                                        href={`/work/${study.slug}`}
                                        className="group block"
                                    >
                                        <article className="glass-card p-6 hover-lift h-full flex flex-col">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="px-2.5 py-0.5 bg-violet-500/10 text-violet-400 text-xs font-medium rounded-full">
                                                    {study.industry}
                                                </span>
                                                <span className="px-2.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                                                    {study.period}
                                                </span>
                                            </div>
                                            <h3 className="font-display font-bold mb-2 group-hover:text-violet-400 transition-colors">
                                                {study.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {study.company}
                                            </p>
                                            <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                                                {study.summary}
                                            </p>
                                        </article>
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            <BackToTop />
        </div>
    )
}
