import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { caseStudies, getCaseStudyBySlug } from '@/data/caseStudies'
import CaseStudyActions from '@/components/CaseStudyActions'
import BackToTop from '@/components/BackToTop'

interface PageProps {
    params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const caseStudy = getCaseStudyBySlug(params.slug)

    if (!caseStudy) {
        return { title: 'Not Found' }
    }

    return {
        title: `${caseStudy.title} | Dhema'alam Fajrianto`,
        description: caseStudy.summary,
    }
}

export async function generateStaticParams() {
    return caseStudies.map((cs) => ({
        slug: cs.slug,
    }))
}

export default function CaseStudyPage({ params }: PageProps) {
    const caseStudy = getCaseStudyBySlug(params.slug)

    if (!caseStudy) {
        notFound()
    }

    return (
        <div className="pt-24 md:pt-32 pb-20">
            <article className="section-container">
                {/* Back link */}
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <span>←</span>
                        <span>Back to Work</span>
                    </Link>
                </div>

                {/* Header */}
                <header className="max-w-4xl mx-auto mb-16">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                            {caseStudy.industry}
                        </span>
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                            {caseStudy.period}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        {caseStudy.title}
                    </h1>
                    <p className="text-muted-foreground text-lg mb-4">{caseStudy.company}</p>
                    <p className="text-foreground text-lg leading-relaxed">
                        {caseStudy.summary}
                    </p>

                    <CaseStudyActions
                        articleUrl={caseStudy.articleUrl}
                        title={caseStudy.title}
                        slug={caseStudy.slug}
                    />
                </header>

                {/* Content */}
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Challenge */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-xl">🎯</span>
                            </div>
                            <h2 className="text-2xl font-bold">The Challenge</h2>
                        </div>
                        <p className="text-foreground leading-relaxed">
                            {caseStudy.challenge}
                        </p>
                    </section>

                    {/* Process */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-xl">⚙️</span>
                            </div>
                            <h2 className="text-2xl font-bold">The Process</h2>
                        </div>
                        <div className="space-y-4">
                            {caseStudy.process.map((step, index) => (
                                <div key={index} className="flex gap-4 items-start">
                                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-accent">
                                        {index + 1}
                                    </div>
                                    <p className="text-foreground pt-1">{step}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Solution */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-xl">💡</span>
                            </div>
                            <h2 className="text-2xl font-bold">The Solution</h2>
                        </div>
                        <p className="text-foreground leading-relaxed">
                            {caseStudy.solution}
                        </p>
                    </section>

                    {/* Outcomes */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-xl">📈</span>
                            </div>
                            <h2 className="text-2xl font-bold">The Outcomes</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {caseStudy.outcomes.map((outcome, index) => (
                                <div key={index} className="glass-card p-8 text-center">
                                    <div className="text-3xl font-bold text-accent mb-2">
                                        {outcome.metric}
                                    </div>
                                    <div className="text-base text-muted-foreground">
                                        {outcome.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tags */}
                    <section className="pt-8 border-t border-border">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                            Skills & Methods
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {caseStudy.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-muted text-foreground text-sm rounded-lg"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Next Steps CTA - Full Width */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Interested in working together?</h3>
                            <p className="text-muted-foreground">
                                I&apos;d love to discuss how I can bring this same approach to your product challenges.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-lg transition-colors"
                        >
                            Get in Touch
                            <span>→</span>
                        </Link>
                    </div>
                </div>

                {/* Related Case Studies */}
                {(() => {
                    const relatedStudies = caseStudies
                        .filter(cs => cs.slug !== caseStudy.slug)
                        .slice(0, 3)

                    if (relatedStudies.length === 0) return null

                    return (
                        <div className="mt-20">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8">
                                More <span className="gradient-text">Case Studies</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedStudies.map((study) => (
                                    <Link
                                        key={study.slug}
                                        href={`/work/${study.slug}`}
                                        className="group block"
                                    >
                                        <article className="glass-card p-6 hover-lift h-full flex flex-col">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded-full">
                                                    {study.industry}
                                                </span>
                                                <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                                                    {study.period}
                                                </span>
                                            </div>
                                            <h3 className="font-bold mb-2 group-hover:text-accent-400 transition-colors">
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
                                ))}
                            </div>
                        </div>
                    )
                })()}
            </article>

            <BackToTop />
        </div>
    )
}
