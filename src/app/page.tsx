import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import CaseStudyCard from '@/components/CaseStudyCard'
import ExperienceCard from '@/components/ExperienceCard'
import HowIOperate from '@/components/HowIOperate'
import { getFeaturedCaseStudies } from '@/content/caseStudies'
import {
    getCertifications,
    getExperiences,
    getImpactMetrics,
    getOperatingStances,
} from '@/content/about'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 86400

export const metadata: Metadata = {
    alternates: { canonical: '/' },
}

export default async function Home() {
    const [featured, experiences, certifications, metrics, stances] =
        await Promise.all([
            getFeaturedCaseStudies(),
            getExperiences(),
            getCertifications(),
            getImpactMetrics(),
            getOperatingStances(),
        ])

    return (
        <>
            <Hero metrics={metrics} />

            {/* ===========================================
                Four flagships, one per archetype
                =========================================== */}
            <section id="featured-work" className="py-24 md:py-36 relative">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Selected work"
                        title={<>Four flagships across four domains.</>}
                        description={
                            <>
                                Enterprise architecture, payout infrastructure, consumer
                                growth, and applied AI, each told as problem, approach and
                                outcome.
                            </>
                        }
                    />

                    {featured.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {featured.map((cs, i) => (
                                <CaseStudyCard key={cs.id} caseStudy={cs} index={i} />
                            ))}
                        </div>
                    )}

                    <div className="mt-12 flex items-center justify-between gap-4 border-t border-foreground/15 pt-8">
                        <span className="mono-label text-foreground/65">
                            {featured.length} flagships · full archive on the work page
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
                        eyebrow="Experience · 2021 – present"
                        title={<>A trajectory across scaling products.</>}
                        description="From quality assurance at MCF to payout infrastructure at Doitpay: six roles, each with its own lesson in shipping product."
                    />

                    {experiences.length > 0 && (
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
                    )}

                    <div className="mt-10 flex items-center justify-between">
                        <span className="mono-label text-foreground/65">
                            {experiences.length > 4
                                ? `+${experiences.length - 4} more roles in archive`
                                : 'Full history on the about page'}
                        </span>
                        <Link href="/about" data-testid="home-full-history" className="btn-outline">
                            Full work history
                            <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===========================================
                How I operate
                =========================================== */}
            <section className="py-24 md:py-36 border-t border-foreground/15 bg-foreground/[0.015] dark:bg-foreground/[0.02]">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="How I operate"
                        title={<>Stances, with evidence.</>}
                        description="Systems architecture, operational risk, and zero-to-one discovery, each with the work behind it."
                    />
                    <HowIOperate stances={stances} />
                </div>
            </section>

            {/* ===========================================
                Certifications
                =========================================== */}
            <section className="py-24 md:py-36 border-t border-foreground/15">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Credentials"
                        title={<>Continuous learning.</>}
                        description="Selected bootcamps, programs and certifications from across my product journey."
                    />

                    {certifications.length > 0 && (
                    <ul className="border-t border-foreground/20">
                        {certifications.map((cert) => (
                            <li
                                key={cert.id}
                                data-testid={`cert-row-${cert.id}`}
                                className="group grid grid-cols-12 gap-6 items-baseline py-6 md:py-8 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors"
                            >
                                <div className="col-span-12 md:col-span-3 mono-label text-foreground/60">
                                    {cert.issuer}
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <h3 className="font-sans font-semibold text-xl md:text-2xl leading-tight tracking-tight">
                                        {cert.name}
                                    </h3>
                                </div>
                                <div className="col-span-6 md:col-span-2 mono-label text-foreground/60">
                                    {cert.issuedDate}
                                </div>
                                <div className="col-span-6 md:col-span-2 md:text-right">
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mono-label text-foreground/70 hover:text-cobalt link-underline transition-colors"
                                    >
                                        View credential ↗
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
            </section>
        </>
    )
}
