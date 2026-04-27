import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import CaseStudyCard from '@/components/CaseStudyCard'
import SkillsGrid from '@/components/SkillsGrid'
import ExperienceCard from '@/components/ExperienceCard'
import FadeIn from '@/components/animations/FadeIn'
import Marquee from '@/components/animations/Marquee'
import MagneticButton from '@/components/animations/MagneticButton'
import { getFeaturedCaseStudies } from '@/data/caseStudies'
import { experiences, profile, certifications } from '@/data/profile'
import Link from 'next/link'

export default function Home() {
    const featuredCaseStudies = getFeaturedCaseStudies().slice(0, 5)

    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Featured Work Section */}
            <section id="featured-work" className="py-24 md:py-36 relative">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Featured Work"
                        title="Selected Case Studies"
                        description="Deep dives into products I've shaped, from problem identification to measurable outcomes."
                    />

                    {/* Featured card — full width */}
                    <div className="mb-6">
                        <CaseStudyCard caseStudy={featuredCaseStudies[0]} featured />
                    </div>

                    {/* Remaining 4 cards — strict 2×2 equal-height grid */}
                    <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
                        {featuredCaseStudies.slice(1).map((caseStudy) => (
                            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
                        ))}
                    </div>

                    <div className="mt-14 text-center">
                        <MagneticButton strength={0.15}>
                            <Link
                                href="/work"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-border hover:border-violet-500/50 text-foreground font-medium rounded-xl transition-all hover:bg-violet-500/5"
                            >
                                View All Work
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-24 md:py-36 bg-muted/[0.3] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent pointer-events-none" />
                <div className="section-container relative z-10">
                    <SectionHeading
                        eyebrow="Experience"
                        title="Where I've Made Impact"
                        description="My journey across startups and consulting, building products that drive real results."
                    />

                    <div className="space-y-6">
                        {experiences.slice(0, 3).map((exp, index) => (
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
                                index={index}
                            />
                        ))}
                    </div>

                    <div className="mt-14 text-center">
                        <MagneticButton strength={0.15}>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 px-7 py-3.5 border border-border hover:border-violet-500/50 text-foreground font-medium rounded-xl transition-all hover:bg-violet-500/5"
                            >
                                Learn More About Me
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-24 md:py-36 relative">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Expertise"
                        title="Skills & Capabilities"
                        description="The toolkit I bring to every product challenge."
                    />

                    <SkillsGrid />
                </div>
            </section>

            {/* Certifications Section */}
            <section className="py-24 md:py-36 bg-muted/[0.3] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />
                <div className="section-container relative z-10">
                    <SectionHeading
                        eyebrow="Credentials"
                        title="Certifications"
                        description="Continuous learning and professional development."
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                        {certifications.map((cert, index) => (
                            <FadeIn key={cert.id} delay={index * 0.1}>
                                <div className="glass-card p-6 md:p-8 hover-lift flex flex-col items-start gap-4 h-full">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-violet-400">{cert.issuer}</span>
                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">{cert.issuedDate}</span>
                                        </div>
                                        <h3 className="text-xl font-display font-bold mb-2">{cert.name}</h3>
                                    </div>
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-violet-400 transition-colors group"
                                    >
                                        View Credential
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-36 relative overflow-hidden">
                {/* Marquee Background */}
                <div className="absolute inset-0 flex items-center opacity-[0.03] pointer-events-none select-none">
                    <Marquee speed="slow">
                        <span className="text-7xl md:text-9xl font-display font-bold whitespace-nowrap mx-8">
                            Let&apos;s Build Something Great
                        </span>
                        <span className="text-7xl md:text-9xl font-display font-bold whitespace-nowrap mx-8">
                            •
                        </span>
                        <span className="text-7xl md:text-9xl font-display font-bold whitespace-nowrap mx-8">
                            Product Management
                        </span>
                        <span className="text-7xl md:text-9xl font-display font-bold whitespace-nowrap mx-8">
                            •
                        </span>
                        <span className="text-7xl md:text-9xl font-display font-bold whitespace-nowrap mx-8">
                            AI & Fintech
                        </span>
                        <span className="text-7xl md:text-9xl font-display font-bold whitespace-nowrap mx-8">
                            •
                        </span>
                    </Marquee>
                </div>

                <div className="section-container relative z-10 text-center">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                            Let&apos;s Build Something{' '}
                            <span className="gradient-text">Great</span>
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
                            Whether you need a product leader for your next venture or want to discuss collaboration opportunities, I&apos;d love to hear from you.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="flex flex-wrap justify-center gap-4">
                            <MagneticButton strength={0.2}>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-all hover:shadow-xl hover:shadow-violet-500/20"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Get in Touch
                                </Link>
                            </MagneticButton>
                            <MagneticButton strength={0.2}>
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-border hover:border-violet-500/50 text-foreground font-medium rounded-xl transition-all hover:bg-violet-500/5"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    Connect on LinkedIn
                                </a>
                            </MagneticButton>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </>
    )
}
