'use client'

import Link from 'next/link'
import { profile, impactMetrics } from '@/data/profile'
import { trackButtonClick } from '@/lib/analytics'
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/animations/AnimatedCounter'

export default function Hero() {
    return (
        <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden grain">
            {/* Hairline grid lines (decorative) */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, currentColor 1px, transparent 1px)',
                    backgroundSize: 'calc(100%/12) 100%',
                }}
            />

            <div className="section-container relative z-10">
                {/* Status row */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-10 md:mb-16 border-t border-foreground/15 pt-4"
                >
                    <div className="flex items-center gap-3 mono-label text-foreground/70">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        Open to collaboration · Jakarta, ID
                    </div>
                    <div className="hidden sm:block mono-label text-foreground/40">
                        Vol. 04 — Edition {new Date().getFullYear()}
                    </div>
                </motion.div>

                {/* Asymmetric headline grid */}
                <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-end mb-16 md:mb-24">
                    <div className="col-span-12 lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="mono-label text-foreground/50 mb-6"
                        >
                            <span className="text-vermillion">●</span> Currently — Product Manager @ Doitpay
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-display text-balance text-foreground"
                        >
                            Dhema<span className="ital">&apos;</span>alam{' '}
                            <span className="ital text-vermillion">Fajrianto</span>
                            <span className="block text-foreground/45 mt-4 sm:mt-5 text-[0.55em] leading-none tracking-tight">
                                — building products with measurable impact.
                            </span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="col-span-12 lg:col-span-4 mt-10 lg:mt-0 lg:pl-6 lg:border-l lg:border-foreground/15"
                    >
                        <p className="text-foreground/75 text-base md:text-lg leading-relaxed text-pretty">
                            Product Manager with{' '}
                            <span className="ital text-foreground">four+ years</span> turning
                            complex challenges into impactful digital products across{' '}
                            <span className="text-foreground">fintech</span>,{' '}
                            <span className="text-foreground">public sector</span>, and{' '}
                            <span className="text-foreground">AI-enabled</span> platforms.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="/work"
                                onClick={() => trackButtonClick('hero_view_work')}
                                className="btn-ink"
                                data-testid="hero-view-work-btn"
                            >
                                View selected work
                                <span aria-hidden>→</span>
                            </Link>
                            <a
                                href={profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackButtonClick('hero_view_resume')}
                                className="btn-outline"
                                data-testid="hero-view-resume-btn"
                            >
                                Resume
                                <span aria-hidden>↗</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Impact metrics — editorial table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="border-t border-foreground/20"
                    data-testid="hero-impact-metrics"
                >
                    <div className="mono-label text-foreground/50 py-4 flex items-center justify-between border-b border-foreground/10">
                        <span>Selected impact · 2021 — 2026</span>
                        <span className="hidden sm:inline">{impactMetrics.length} metrics</span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-foreground/10 border-b border-foreground/20">
                        {impactMetrics.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 + i * 0.08 }}
                                className="p-5 md:p-7 group hover:bg-foreground/[0.03] transition-colors"
                            >
                                <div className="font-serif text-5xl md:text-6xl leading-none tracking-tighter text-foreground mb-3">
                                    <AnimatedCounter value={m.value} />
                                </div>
                                <div className="text-sm font-medium text-foreground mb-1">
                                    {m.label}
                                </div>
                                <div className="text-xs text-foreground/55 leading-snug">
                                    {m.description}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
