import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import CaseStudyCard from '@/components/CaseStudyCard'
import SkillsGrid from '@/components/SkillsGrid'
import ExperienceCard from '@/components/ExperienceCard'
import Marquee from '@/components/animations/Marquee'
import { getFeaturedCaseStudies } from '@/data/caseStudies'
import { experiences, profile, certifications } from '@/data/profile'
import Link from 'next/link'

export default function Home() {
    const featured = getFeaturedCaseStudies().slice(0, 5)

    return (
        <>
            <Hero />

            {/* ===========================================
                Manifesto strip (editorial ribbon)
                =========================================== */}
            <section className="border-y border-foreground/15 overflow-hidden bg-background py-6">
                <Marquee speed="slow">
                    {Array.from({ length: 2 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-8 mr-8 font-serif text-3xl md:text-4xl leading-none tracking-tight whitespace-nowrap"
                        >
                            <span>Strategy</span>
                            <span className="text-vermillion">✦</span>
                            <span className="ital">Discovery</span>
                            <span className="text-vermillion">✦</span>
                            <span>Execution</span>
                            <span className="text-vermillion">✦</span>
                            <span className="ital">Measurable impact</span>
                            <span className="text-vermillion">✦</span>
                            <span>AI-native products</span>
                            <span className="text-vermillion">✦</span>
                            <span className="ital">Fintech</span>
                            <span className="text-vermillion">✦</span>
                            <span>Public sector</span>
                            <span className="text-vermillion">✦</span>
                        </div>
                    ))}
                </Marquee>
            </section>

            {/* ===========================================
                Selected case studies
                =========================================== */}
            <section id="featured-work" className="py-24 md:py-36 relative grain">
                <div className="section-container">
                    <SectionHeading
                        numeral="02"
                        eyebrow="Selected work"
                        title={<>Case studies, &nbsp;<span className="ital text-vermillion">deeply</span> told.</>}
                        description={
                            <>
                                Seven products I&apos;ve shaped from problem framing through
                                measurable outcome — spanning fintech, edtech, public sector
                                and AI-native experiences.
                            </>
                        }
                    />

                    {/* Featured (large) */}
                    <div className="mb-6">
                        <CaseStudyCard caseStudy={featured[0]} featured />
                    </div>

                    {/* 2x2 standard cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {featured.slice(1).map((cs, i) => (
                            <CaseStudyCard key={cs.id} caseStudy={cs} index={i} />
                        ))}
                    </div>

                    <div className="mt-12 flex items-center justify-between gap-4 border-t border-foreground/15 pt-8">
                        <span className="mono-label text-foreground/50">
                            Showing 5 of {featured.length}+ case studies
                        </span>
                        <Link href="/work" data-testid="home-view-all-work" className="btn-outline">
                            View all work
                            <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===========================================
                Experience
                =========================================== */}
            <section className="py-24 md:py-36 relative border-t border-foreground/15">
                <div className="section-container">
                    <SectionHeading
                        numeral="03"
                        eyebrow="Experience · 2021 — present"
                        title={<>A trajectory across <span className="ital text-vermillion">scaling</span> products.</>}
                        description="From quality assurance at MCF to leading AI integrations at Zero One Group and Doitpay — six chapters of cross-functional product work."
                    />

                    <div className="border-b border-foreground/15">
                        {experiences.slice(0, 4).map((exp, i) => (
                            <ExperienceCard
                                key={exp.id}
                                company={exp.company}
                                logo={exp.logo}
                                role={exp.role}
                                period={exp.period}
                                type={exp.type}
                                description={exp.description}
                                highlights={exp.highlights}
                                industries={exp.industries}
                                index={i}
                            />
                        ))}
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                        <span className="mono-label text-foreground/50">
                            +{experiences.length - 4} more roles in archive
                        </span>
                        <Link href="/about" data-testid="home-full-history" className="btn-outline">
                            Full work history
                            <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===========================================
                Skills
                =========================================== */}
            <section className="py-24 md:py-36 border-t border-foreground/15 bg-foreground/[0.015] dark:bg-foreground/[0.02]">
                <div className="section-container">
                    <SectionHeading
                        numeral="04"
                        eyebrow="Toolkit"
                        title={<>The <span className="ital text-vermillion">craft</span> behind the work.</>}
                        description="Frameworks, technical fluency, and tools I bring to every product challenge."
                    />
                    <SkillsGrid />
                </div>
            </section>

            {/* ===========================================
                Certifications
                =========================================== */}
            <section className="py-24 md:py-36 border-t border-foreground/15">
                <div className="section-container">
                    <SectionHeading
                        numeral="05"
                        eyebrow="Credentials"
                        title={<>Continuous <span className="ital text-vermillion">learning</span>.</>}
                        description="Selected bootcamps, programs and certifications from across my product journey."
                    />

                    <ul className="border-t border-foreground/20">
                        {certifications.map((cert, i) => (
                            <li
                                key={cert.id}
                                data-testid={`cert-row-${cert.id}`}
                                className="group grid grid-cols-12 gap-6 items-baseline py-6 md:py-8 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors"
                            >
                                <div className="col-span-12 md:col-span-1 mono-label text-foreground/40">
                                    0{i + 1}
                                </div>
                                <div className="col-span-12 md:col-span-3 mono-label text-vermillion">
                                    {cert.issuer}
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <h3 className="font-serif text-xl md:text-2xl leading-tight tracking-tight">
                                        {cert.name}
                                    </h3>
                                </div>
                                <div className="col-span-6 md:col-span-1 mono-label text-foreground/60">
                                    {cert.issuedDate}
                                </div>
                                <div className="col-span-6 md:col-span-2 md:text-right">
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mono-label text-foreground/70 hover:text-vermillion link-underline transition-colors"
                                    >
                                        View credential ↗
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ===========================================
                Closing CTA
                =========================================== */}
            <section className="relative border-t border-foreground/15 py-24 md:py-32 overflow-hidden grain">
                <div className="section-container relative z-10 grid grid-cols-12 gap-6 items-end">
                    <div className="col-span-12 lg:col-span-9">
                        <div className="mono-label text-foreground/50 mb-6">
                            <span className="text-vermillion">●</span> Currently accepting Q1 2026
                        </div>
                        <h2 className="h-display text-balance">
                            Have an idea?
                            <br className="hidden md:block" />
                            <span className="ital text-vermillion">Let&apos;s</span> build it.
                        </h2>
                    </div>
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-3">
                        <Link
                            href="/contact"
                            data-testid="home-cta-contact"
                            className="btn-ink justify-between"
                        >
                            Get in touch <span aria-hidden>→</span>
                        </Link>
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="home-cta-linkedin"
                            className="btn-outline justify-between"
                        >
                            Connect on LinkedIn <span aria-hidden>↗</span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
