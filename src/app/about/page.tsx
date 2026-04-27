import { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import TimelineExperienceCard from '@/components/TimelineExperienceCard'
import SkillsGrid from '@/components/SkillsGrid'
import FadeIn from '@/components/animations/FadeIn'
import MagneticButton from '@/components/animations/MagneticButton'
import { profile, experiences } from '@/data/profile'
import Link from 'next/link'

export const metadata: Metadata = {
    title: "About | Dhema'alam Fajrianto",
    description: 'Learn more about my journey as a Product Manager across fintech, edtech, and AI platforms.',
}

export default function AboutPage() {
    return (
        <div className="pt-24 md:pt-36">
            {/* Hero */}
            <section className="pb-24">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <FadeIn>
                            <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-5">
                                About Me
                            </span>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8">
                                Building products that{' '}
                                <span className="gradient-text">matter</span>
                            </h1>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                                <span className="text-foreground font-semibold">Product Manager with 4+ years of experience</span>{' '}
                                building products across fintech, edtech, and government/BUMN, including AI-enabled web platforms.
                                I lead cross-functional teams in corporate, startup, and consulting settings
                                <span className="text-foreground font-semibold"> to deliver measurable business outcomes</span>.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-24 bg-muted/[0.3] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent pointer-events-none" />
                <div className="section-container relative z-10">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                    </svg>
                                ),
                                title: 'Outcome-Driven',
                                description: 'I measure success by impact, not output. Every feature shipped should move the needle on metrics that matter.',
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                ),
                                title: 'Cross-Functional Leader',
                                description: 'The best products emerge from aligned teams. I bridge engineering, design, and business to drive shared success.',
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                ),
                                title: 'User-Centered',
                                description: 'Deep user understanding is non-negotiable. I let research and data guide decisions, not assumptions.',
                            },
                        ].map((item, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                                <div className="glass-card p-8 hover-lift h-full">
                                    <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 mb-5">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-display font-bold mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="py-24 md:py-36">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Career Journey"
                        title="Professional Experience"
                        description="My path across diverse industries, building products that create value."
                    />

                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
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
                                isLast={index === experiences.length - 1}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-24 md:py-36 bg-muted/[0.3] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />
                <div className="section-container relative z-10">
                    <SectionHeading
                        eyebrow="Toolkit"
                        title="Skills & Expertise"
                        description="Capabilities I've developed across product management disciplines."
                    />

                    <SkillsGrid />
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="section-container text-center">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">
                            Want to know more?
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                            Check out my case studies to see how I approach product challenges, or get in touch directly.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="flex flex-wrap justify-center gap-4">
                            <MagneticButton strength={0.15}>
                                <Link
                                    href="/work"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/20"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    View Case Studies
                                </Link>
                            </MagneticButton>
                            <MagneticButton strength={0.15}>
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-border hover:border-violet-500/50 text-foreground font-medium rounded-xl transition-all hover:bg-violet-500/5"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    Visit my LinkedIn
                                </a>
                            </MagneticButton>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    )
}
