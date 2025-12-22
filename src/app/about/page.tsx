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
                        <div className="prose prose-lg prose-invert">
                            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                                {profile.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-20 bg-neutral-900/30">
                <div className="section-container">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-card p-6 md:p-8 hover-lift">
                            <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Outcome-Driven</h3>
                            <p className="text-neutral-400">
                                I measure success by impact, not output. Every feature shipped should move the needle on metrics that matter.
                            </p>
                        </div>
                        <div className="glass-card p-6 md:p-8 hover-lift">
                            <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Cross-Functional Leader</h3>
                            <p className="text-neutral-400">
                                The best products emerge from aligned teams. I bridge engineering, design, and business to drive shared success.
                            </p>
                        </div>
                        <div className="glass-card p-6 md:p-8 hover-lift">
                            <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-2xl">🔬</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2">User-Centered</h3>
                            <p className="text-neutral-400">
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

                    <div className="max-w-4xl">
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
            <section className="py-20 md:py-32 bg-neutral-900/30">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Toolkit"
                        title="Skills & Expertise"
                        description="Capabilities I've developed across product management disciplines."
                    />

                    <div className="max-w-4xl">
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
                    <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                        Check out my case studies to see how I approach product challenges, or get in touch directly.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/work"
                            className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors"
                        >
                            View Case Studies
                        </Link>
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-neutral-700 hover:border-neutral-500 text-white font-medium rounded-lg transition-colors"
                        >
                            LinkedIn Profile
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
