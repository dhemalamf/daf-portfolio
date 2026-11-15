import { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import TimelineExperienceCard from '@/components/TimelineExperienceCard'
import HowIOperate from '@/components/HowIOperate'
import DomainArchive from '@/components/DomainArchive'
import { profile } from '@/data/profile'
import { domainGroups } from '@/data/domains'
import { getExperiences, getOperatingStances } from '@/content/about'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'About',
    alternates: { canonical: '/about' },
    description:
        'A product manager working where system failure is expensive: fintech payment rails, enterprise architecture consulting, and AI-enabled platforms.',
}


export const revalidate = 3600

export default async function AboutPage() {
    const [experiences, stances] = await Promise.all([
        getExperiences(),
        getOperatingStances(),
    ])

    return (
        <>
            {/* Hero */}
            <section className="pt-36 md:pt-44 pb-20 border-b border-foreground/15">
                <div className="section-container">
                    <div className="mono-label text-foreground/65 mb-6">
                        About
                    </div>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
                        <div className="col-span-12 lg:col-span-8">
                            <h1 className="h-display text-balance">
                                Product work for systems that cannot fail.
                            </h1>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l lg:border-foreground/15">
                            <p className="text-foreground/75 text-base md:text-lg leading-relaxed text-pretty">
                                Product Manager with four-plus years designing and scaling
                                software across fintech payment rails, enterprise architecture
                                consulting, and AI-enabled platforms. Most of that work sits
                                in fault-intolerant places: payout engines, verification
                                flows, and the back-office tooling finance and risk teams
                                depend on.
                            </p>
                            <a
                                href={profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 btn-outline"
                                data-testid="about-resume-btn"
                            >
                                View resume ↗
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* How I operate */}
            <section className="py-24 md:py-32 border-b border-foreground/15">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="How I operate"
                        title={<>Stances, with evidence.</>}
                        description="Three stances I bring to every engagement, each with two pieces of named work behind it."
                    />
                    <HowIOperate stances={stances} />
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="py-24 md:py-32 border-b border-foreground/15">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Career journey"
                        title={<>The full history.</>}
                        description={`${experiences.length} roles across fintech, edtech, healthtech, public sector and AI consulting, each with its own lessons in shipping product.`}
                    />

                    {experiences.length > 0 && (
                    <div className="border-b border-foreground/20">
                        {experiences.map((exp, i) => (
                            <TimelineExperienceCard
                                key={exp.id}
                                company={exp.company}
                                logo={exp.logo}
                                role={exp.role}
                                period={exp.period}
                                type={exp.type}
                                description={exp.description}
                                highlights={exp.highlights}
                                industries={exp.industries}
                                isLast={i === experiences.length - 1}
                                index={i}
                            />
                        ))}
                    </div>
                    )}
                </div>
            </section>

            {/* Domain specialization archive */}
            <section className="py-24 md:py-32 border-b border-foreground/15">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Domain depth"
                        title={<>Four practice areas.</>}
                        description="Where the domain knowledge sits, from payout engines and decoupling work to learning platforms at scale."
                    />
                    <DomainArchive domains={domainGroups} />
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 md:py-32">
                <div className="section-container grid grid-cols-12 gap-6 items-end">
                    <div className="col-span-12 lg:col-span-8">
                        <h2 className="heading-2 text-balance">
                            Curious to see the work?
                        </h2>
                    </div>
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
                        <Link href="/work" className="btn-ink justify-between" data-testid="about-cta-work">
                            View case studies <span aria-hidden>→</span>
                        </Link>
                        <Link href="/contact" className="btn-outline justify-between" data-testid="about-cta-contact">
                            Get in touch <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
