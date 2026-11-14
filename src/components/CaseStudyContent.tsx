import Link from 'next/link'
import { CaseStudy } from '@/data/caseStudies'
import BackToTop from '@/components/BackToTop'
import FadeIn from '@/components/animations/FadeIn'
import WireframePlaceholder from '@/components/WireframePlaceholder'

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
                        className="group inline-flex items-center gap-2 mono-label text-foreground/70 hover:text-cobalt transition-colors"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to work</span>
                    </Link>
                </div>

                {/* Header */}
                <header className="max-w-4xl mx-auto mb-20 border-b border-foreground/15 pb-14">
                    <div className="flex items-center gap-3 mb-6 mono-label text-foreground/70">
                        <span>{caseStudy.industry}</span>
                        <span className="text-foreground/25">/</span>
                        <span>{caseStudy.period}</span>
                    </div>

                    <FadeIn>
                        <h1 className="heading-1 text-balance mb-5">
                            {caseStudy.title}
                        </h1>
                    </FadeIn>

                    <p className="mono-label text-foreground/60 mb-5">{caseStudy.company}</p>

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

                    <div className="mt-10">
                        <WireframePlaceholder variant={caseStudy.visual ?? 'flow'} />
                    </div>
                </header>

                {/* Body */}
                <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
                    <Section label="The challenge">
                        <p className="text-foreground/85 leading-relaxed text-lg text-pretty">{caseStudy.challenge}</p>
                    </Section>

                    <Section label="The process">
                        <ol className="space-y-5 border-t border-foreground/15">
                            {caseStudy.process.map((step, i) => (
                                <li
                                    key={i}
                                    className="grid grid-cols-12 gap-6 pt-5 border-b border-foreground/10 pb-5"
                                >
                                    <span className="col-span-2 md:col-span-1 mono-label text-foreground/60">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <p className="col-span-10 md:col-span-11 text-foreground/85 leading-relaxed text-pretty">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </Section>

                    <Section label="The solution">
                        <p className="text-foreground/85 leading-relaxed text-lg text-pretty">{caseStudy.solution}</p>
                    </Section>

                    {caseStudy.tradeOffs && (
                        <Section label="The trade-offs">
                            <p className="text-foreground/85 leading-relaxed text-lg text-pretty">{caseStudy.tradeOffs}</p>
                        </Section>
                    )}

                    {caseStudy.technicalHurdles && (
                        <Section label="Technical complexity">
                            <p className="text-foreground/85 leading-relaxed text-lg text-pretty">{caseStudy.technicalHurdles}</p>
                        </Section>
                    )}

                    {caseStudy.retrospective && (
                        <Section label="Retrospective">
                            <p className="text-foreground/85 leading-relaxed text-lg text-pretty">{caseStudy.retrospective}</p>
                        </Section>
                    )}

                    <Section label="The outcomes">
                        <div className="border-t border-foreground/20 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/10">
                            {caseStudy.outcomes.map((o) => (
                                <div key={o.metric} className="p-6 md:p-8">
                                    <div className="font-sans font-semibold text-2xl md:text-3xl leading-tight tracking-tight text-foreground mb-3">
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
                        <div className="mono-label text-foreground/60 mb-5">Skills & methods</div>
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
                        <h3 className="font-sans font-semibold text-2xl md:text-3xl tracking-tight leading-tight mb-2">
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
                            <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-tight">
                                More case studies
                            </h2>
                            <Link href="/work" className="mono-label text-foreground/70 hover:text-cobalt link-underline">
                                View all ↗
                            </Link>
                        </div>
                        <ul>
                            {relatedStudies.map((s) => (
                                <li key={s.slug}>
                                    <Link
                                        href={`/work/${s.slug}`}
                                        className="group grid grid-cols-12 gap-6 items-baseline py-6 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors"
                                    >
                                        <div className="col-span-12 md:col-span-8">
                                            <div className="font-sans font-semibold text-xl md:text-2xl leading-tight tracking-tight group-hover:text-cobalt transition-colors">
                                                {s.title}
                                            </div>
                                            <div className="mono-label text-foreground/70 mt-1">{s.company}</div>
                                        </div>
                                        <div className="hidden md:block md:col-span-3 mono-label text-foreground/70">
                                            {s.industry}
                                        </div>
                                        <div className="hidden md:block md:col-span-1 mono-label text-foreground/70 text-right">
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
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-foreground/30" />
                <span className="mono-label text-foreground/60">{label}</span>
            </div>
            {children}
        </section>
    )
}
