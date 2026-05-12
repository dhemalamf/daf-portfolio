'use client'

import Link from 'next/link'
import { CaseStudy } from '@/data/caseStudies'
import { motion } from 'framer-motion'
import BackToTop from '@/components/BackToTop'

interface Props {
    caseStudy: CaseStudy
    relatedStudies: CaseStudy[]
}

export default function CaseStudyContent({ caseStudy, relatedStudies }: Props) {
    return (
        <article className="pt-28 md:pt-36 pb-20">
            <div className="section-container">
                {/* Back link */}
                <div className="max-w-4xl mx-auto mb-12">
                    <Link
                        href="/work"
                        className="group inline-flex items-center gap-2 mono-label text-foreground/55 hover:text-vermillion transition-colors"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to work</span>
                    </Link>
                </div>

                {/* Header */}
                <header className="max-w-4xl mx-auto mb-20 border-b border-foreground/15 pb-14">
                    <div className="flex items-center gap-3 mb-6 mono-label text-foreground/55">
                        <span className="text-vermillion">●</span>
                        <span>{caseStudy.industry}</span>
                        <span className="text-foreground/25">/</span>
                        <span>{caseStudy.period}</span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="h-1 text-balance mb-5"
                    >
                        {caseStudy.title}
                    </motion.h1>

                    <p className="mono-label text-vermillion mb-5">{caseStudy.company}</p>

                    <p className="text-foreground/80 text-lg leading-relaxed text-pretty max-w-3xl">
                        {caseStudy.summary}
                    </p>

                    {caseStudy.articleUrl && (
                        <a
                            href={caseStudy.articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ink mt-8"
                        >
                            Read full article <span aria-hidden>↗</span>
                        </a>
                    )}
                </header>

                {/* Body */}
                <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
                    {/* Challenge */}
                    <Section numeral="01" label="The challenge">
                        <p className="text-foreground/85 leading-relaxed text-lg text-pretty">{caseStudy.challenge}</p>
                    </Section>

                    {/* Process */}
                    <Section numeral="02" label="The process">
                        <ol className="space-y-5 border-t border-foreground/15">
                            {caseStudy.process.map((step, i) => (
                                <li
                                    key={i}
                                    className="grid grid-cols-12 gap-6 pt-5 border-b border-foreground/10 pb-5"
                                >
                                    <span className="col-span-2 md:col-span-1 mono-label text-vermillion">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <p className="col-span-10 md:col-span-11 text-foreground/85 leading-relaxed text-pretty">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </Section>

                    {/* Solution */}
                    <Section numeral="03" label="The solution">
                        <p className="text-foreground/85 leading-relaxed text-lg text-pretty">{caseStudy.solution}</p>
                    </Section>

                    {/* Outcomes */}
                    <Section numeral="04" label="The outcomes">
                        <div className="border-t border-foreground/20 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/10">
                            {caseStudy.outcomes.map((o, i) => (
                                <div key={i} className="p-6 md:p-8">
                                    <div className="mono-label text-foreground/40 mb-3">0{i + 1}</div>
                                    <div className="font-serif text-3xl md:text-4xl leading-tight tracking-tight text-vermillion mb-3">
                                        {o.metric}
                                    </div>
                                    <p className="text-foreground/70 leading-relaxed text-sm text-pretty">
                                        {o.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Tags */}
                    <div className="pt-10 border-t border-foreground/15">
                        <div className="mono-label text-foreground/40 mb-5">Skills & methods</div>
                        <div className="flex flex-wrap gap-2">
                            {caseStudy.tags.map((tag, i) => (
                                <span key={i} className="tag-pill">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-4xl mx-auto mt-24 border border-foreground/15 p-8 md:p-12 grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-12 md:col-span-8">
                        <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight mb-2">
                            Interested in working together?
                        </h3>
                        <p className="text-foreground/65">
                            I&apos;d love to discuss bringing this same approach to your product challenges.
                        </p>
                    </div>
                    <div className="col-span-12 md:col-span-4 md:text-right">
                        <Link href="/contact" className="btn-ink">
                            Get in touch <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>

                {/* Related */}
                {relatedStudies.length > 0 && (
                    <div className="max-w-6xl mx-auto mt-24">
                        <div className="border-t border-foreground/20 pt-8 mb-8 flex items-baseline justify-between">
                            <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
                                More <span className="ital text-vermillion">case studies</span>
                            </h2>
                            <Link href="/work" className="mono-label text-foreground/55 hover:text-vermillion link-underline">
                                View all ↗
                            </Link>
                        </div>
                        <ul>
                            {relatedStudies.map((s, i) => (
                                <li key={s.slug}>
                                    <Link
                                        href={`/work/${s.slug}`}
                                        className="group grid grid-cols-12 gap-6 items-baseline py-6 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors"
                                    >
                                        <div className="col-span-1 mono-label text-foreground/40 group-hover:text-vermillion transition-colors">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div className="col-span-11 md:col-span-7">
                                            <div className="font-serif text-xl md:text-2xl leading-tight tracking-tight group-hover:text-vermillion transition-colors">
                                                {s.title}
                                            </div>
                                            <div className="mono-label text-foreground/55 mt-1">{s.company}</div>
                                        </div>
                                        <div className="hidden md:block md:col-span-3 mono-label text-foreground/55">
                                            {s.industry}
                                        </div>
                                        <div className="hidden md:block md:col-span-1 mono-label text-foreground/55 text-right">
                                            {s.period}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <BackToTop />
        </article>
    )
}

function Section({
    numeral,
    label,
    children,
}: {
    numeral: string
    label: string
    children: React.ReactNode
}) {
    return (
        <section>
            <div className="flex items-baseline gap-3 mb-8">
                <span className="mono-label text-vermillion">{numeral}</span>
                <span className="h-px w-8 bg-foreground/30" />
                <span className="mono-label text-foreground/55">{label}</span>
            </div>
            {children}
        </section>
    )
}
