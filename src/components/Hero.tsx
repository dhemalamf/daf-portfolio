'use client'

import Link from 'next/link'
import { profile, impactMetrics } from '@/data/profile'
import { trackButtonClick } from '@/lib/analytics'
import { motion } from 'framer-motion'
import ConstellationBackground from '@/components/ConstellationBackground'
import TextScramble from '@/components/animations/TextScramble'
import AnimatedCounter from '@/components/animations/AnimatedCounter'
import MagneticButton from '@/components/animations/MagneticButton'
import ScrollIndicator from '@/components/ScrollIndicator'

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 overflow-hidden">
            {/* Constellation Background */}
            <ConstellationBackground />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.03] via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="section-container relative z-10 flex-1 flex flex-col justify-center">
                <div className="max-w-4xl">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8"
                    >
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-emerald-400 text-sm font-medium">
                            Open to collaboration
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8"
                    >
                        <span className="block mb-2">
                            Hi, I&apos;m{' '}
                            <span className="gradient-text">
                                <TextScramble text={profile.name.split(' ')[0]} delay={600} duration={1000} />
                            </span>
                        </span>
                        <span className="block text-muted-foreground/80">
                            A {profile.title}
                        </span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
                    >
                        With{' '}
                        <span className="text-foreground font-semibold">4+ years of experience</span>,
                        I&apos;ve helped organizations turn{' '}
                        <span className="text-foreground font-semibold">complex challenges into impactful digital products</span>{' '}
                        and scale products across fintech, public sector, and edtech using{' '}
                        <span className="text-foreground font-semibold">AI-powered systems</span>.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="flex flex-wrap gap-4 mb-16"
                    >
                        <MagneticButton strength={0.15}>
                            <Link
                                href="/work"
                                onClick={() => trackButtonClick('hero_view_my_work')}
                                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20"
                            >
                                View My Work
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </MagneticButton>
                        <MagneticButton strength={0.15}>
                            <a
                                href={profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackButtonClick('hero_view_resume')}
                                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-border hover:border-violet-500/50 text-foreground font-medium rounded-xl transition-all hover:bg-violet-500/5"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Resume
                            </a>
                        </MagneticButton>
                    </motion.div>

                    {/* Impact Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                    >
                        {impactMetrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                                className="group glass-card p-5 md:p-6 hover-lift accent-border"
                            >
                                <div className="text-2xl md:text-3xl font-display font-bold text-amber-400 mb-1">
                                    <AnimatedCounter value={metric.value} />
                                </div>
                                <div className="text-sm font-semibold text-foreground mb-1">
                                    {metric.label}
                                </div>
                                <div className="text-xs text-muted-foreground hidden md:block">
                                    {metric.description}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="section-container relative z-10 flex justify-center pt-12 md:pt-16">
                <ScrollIndicator />
            </div>
        </section>
    )
}
