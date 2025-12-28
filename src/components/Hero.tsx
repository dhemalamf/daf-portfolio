'use client'

import Link from 'next/link'
import { profile, impactMetrics } from '@/data/profile'
import { trackButtonClick } from '@/lib/analytics'

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="max-w-4xl">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6 animate-fade-in">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-subtle" />
                        <span className="text-green-400 text-sm font-medium">
                            Open to collaboration
                        </span>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
                        Hi, I&apos;m{' '}
                        <span className="gradient-text">{profile.name.split(' ')[0]}</span>
                        <br />
                        <span className="text-muted-foreground">A {profile.title}</span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-slide-up stagger-1">
                        With <span className="text-foreground font-semibold">4+ years of experience</span>, I’ve helped organizations turn
                        <span className="text-foreground font-semibold"> <br /> complex challenges into impactful digital products </span>
                        and scale products across fintech, public sector, and edtech using
                        <span className="text-foreground font-semibold"> AI-powered systems</span>.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mb-16 animate-slide-up stagger-2">
                        <Link
                            href="/work"
                            onClick={() => trackButtonClick('hero_view_my_work')}
                            className="group px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                        >
                            View My Work
                            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </Link>
                        <a
                            href={profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackButtonClick('hero_view_resume')}
                            className="group px-6 py-3 bg-transparent border border-accent hover:bg-accent/10 text-accent hover:text-accent font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Resume
                        </a>
                    </div>

                    {/* Impact Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-slide-up stagger-3">
                        {impactMetrics.map((metric, index) => (
                            <div
                                key={index}
                                className="group glass-card p-4 md:p-6 hover-lift"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                                    {metric.value}
                                </div>
                                <div className="text-sm font-medium text-foreground mb-1">
                                    {metric.label}
                                </div>
                                <div className="text-xs text-muted-foreground hidden md:block">
                                    {metric.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Scroll indicator */}
            <a
                href="#featured-work"
                className="absolute bottom-8 left-0 right-0 hidden md:flex justify-center items-center gap-2 animate-float cursor-pointer hover:text-foreground transition-colors group"
            >
                <span className="text-sm font-medium text-accent tracking-wide relative group-hover:text-accent/90 transition-colors">
                    <span className="relative z-10">Explore My Work</span>
                    {/* Glow effect */}
                    <span className="absolute inset-0 blur-lg bg-accent/30 animate-pulse-subtle" />
                </span>
                <svg
                    className="w-4 h-4 text-accent drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:text-accent/90 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </a>
        </section>
    )
}
