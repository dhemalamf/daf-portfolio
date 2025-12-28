import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import CaseStudyCard from '@/components/CaseStudyCard'
import SkillsGrid from '@/components/SkillsGrid'
import ExperienceCard from '@/components/ExperienceCard'
import { getFeaturedCaseStudies } from '@/data/caseStudies'
import { experiences, profile, certifications } from '@/data/profile'
import Link from 'next/link'

export default function Home() {
    const featuredCaseStudies = getFeaturedCaseStudies().slice(0, 4)

    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Featured Work Section */}
            <section id="featured-work" className="py-20 md:py-32">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Featured Work"
                        title="Selected Case Studies"
                        description="Deep dives into products I've shaped, from problem identification to measurable outcomes."
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredCaseStudies.map((caseStudy) => (
                            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent text-foreground font-medium rounded-lg transition-colors"
                        >
                            View All Work
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-20 md:py-32 bg-muted/30">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Experience"
                        title="Where I've Made Impact"
                        description="My journey across startups and consulting, building products that drive real results."
                    />

                    <div className="space-y-6">
                        {experiences.slice(0, 3).map((exp) => (
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
                            />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent text-foreground font-medium rounded-lg transition-colors"
                        >
                            Learn More About Me
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 md:py-32">
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
            <section className="py-20 md:py-32 bg-muted/30">
                <div className="section-container">
                    <SectionHeading
                        eyebrow="Credentials"
                        title="Certifications"
                        description="Continuous learning and professional development."
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                        {certifications.map((cert) => (
                            <div key={cert.id} className="glass-card p-6 md:p-8 hover-lift flex flex-col items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-accent">{cert.issuer}</span>
                                        <span className="text-xs text-muted-foreground">{cert.issuedDate}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                                </div>
                                <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                                >
                                    View Credential
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background">
                <div className="section-container text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Let&apos;s Build Something{' '}
                        <span className="gradient-text">Great</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                        Whether you need a product leader for your next venture or want to discuss collaboration opportunities, I&apos;d love to hear from you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Get in Touch
                        </Link>
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-border hover:border-muted-foreground text-foreground font-medium rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            Connect on LinkedIn
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
