import { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import TimelineExperienceCard from '@/components/TimelineExperienceCard'
import SkillsGrid from '@/components/SkillsGrid'
import { profile, experiences } from '@/data/profile'
import Link from 'next/link'

export const metadata: Metadata = {
    title: "About | Dhema'alam Fajrianto",
    description: 'Learn more about my journey as a Product Manager across fintech, edtech, and AI platforms.',
}

export default function AboutPage() {
    return (
        <div className="pt-24 md:pt-32">
            {/* Hero */}
            <section className="pb-20">
                <div className="section-container">
                    <div className="max-w-3xl">
                        <span className="inline-block text-accent-400 text-sm font-semibold uppercase tracking-wider mb-4">
                            About Me
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Building products that{' '}
                            <span className="gradient-text">matter</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                            Product Manager with <span className="text-foreground font-bold">4+ years of experience</span> across <span className="text-foreground font-medium">fintech, edtech, government/BUMN</span>, and <span className="text-foreground font-medium">AI-enabled web platforms</span>.
                            I thrive in both <span className="text-foreground font-medium">corporate, startup and consulting environments</span>, leading cross-functional teams to deliver products that drive <span className="text-foreground font-medium">real business outcomes</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-20 bg-muted/30">
                <div className="section-container">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-card p-6 md:p-8 hover-lift">
                            <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Outcome-Driven</h3>
                            <p className="text-muted-foreground">
                                I measure success by impact, not output. Every feature shipped should move the needle on metrics that matter.
                            </p>
                        </div>
                        <div className="glass-card p-6 md:p-8 hover-lift">
                            <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Cross-Functional Leader</h3>
                            <p className="text-muted-foreground">
                                The best products emerge from aligned teams. I bridge engineering, design, and business to drive shared success.
                            </p>
                        </div>
                        <div className="glass-card p-6 md:p-8 hover-lift">
                            <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl">🔬</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2">User-Centered</h3>
                            <p className="text-muted-foreground">
                                Deep user understanding is non-negotiable. I let research and data guide decisions, not assumptions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="py-20 md:py-32">
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
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section className="py-20 md:py-32 bg-muted/30">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Toolkit"
                        title="Skills & Expertise"
                        description="Capabilities I've developed across product management disciplines."
                    />

                    <div>
                        <SkillsGrid />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="section-container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Want to know more?
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Check out my case studies to see how I approach product challenges, or get in touch directly.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            View Case Studies
                        </Link>
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-muted-foreground text-foreground font-medium rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            Visit my LinkedIn
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
