import { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import TimelineExperienceCard from '@/components/TimelineExperienceCard'
import SkillsGrid from '@/components/SkillsGrid'
import { profile } from '@/data/profile'
import { getExperiences, getPrinciples, getSkillGroups } from '@/content/about'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'About',
    alternates: { canonical: '/about' },
    description:
        'A product manager building measurable digital products across fintech, edtech, and AI.',
}


export const revalidate = 3600

export default async function AboutPage() {
    const [experiences, principles, skillGroups] = await Promise.all([
        getExperiences(),
        getPrinciples(),
        getSkillGroups(),
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
                                Building products that matter.
                            </h1>
                        </div>
                        <div className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l lg:border-foreground/15">
                            <p className="text-foreground/75 text-base md:text-lg leading-relaxed text-pretty">
                                Product Manager with 4+ years across fintech, edtech,
                                public-sector and AI-enabled platforms, leading
                                cross-functional teams in startup, enterprise and consulting
                                contexts to deliver measurable outcomes.
                            </p>
                            <a
                                href={profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 btn-outline"
                                data-testid="about-resume-btn"
                            >
                                Download CV ↗
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Principles */}
            <section className="py-24 md:py-32 border-b border-foreground/15">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Operating principles"
                        title={<>How I work, briefly.</>}
                    />
                    <div className="border-t border-foreground/20 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/10">
                        {principles.map((p) => (
                            <div key={p.title} className="p-8 md:p-10">
                                <h3 className="font-sans font-semibold text-2xl md:text-3xl tracking-tight leading-tight mb-4">
                                    {p.title}
                                </h3>
                                <p className="text-foreground/70 leading-relaxed text-sm md:text-base text-pretty">
                                    {p.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="py-24 md:py-32 border-b border-foreground/15">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Career journey"
                        title={<>The full archive.</>}
                        description={`${experiences.length} chapters across fintech, edtech, healthtech, public sector and AI consulting, each with its own lessons in shipping product.`}
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

            {/* Skills */}
            <section className="py-24 md:py-32 border-b border-foreground/15">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Capabilities"
                        title={<>Skills & expertise.</>}
                    />
                    {skillGroups.length > 0 && <SkillsGrid groups={skillGroups} />}
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
