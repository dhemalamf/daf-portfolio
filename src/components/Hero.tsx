'use client'

import { profile } from '@/data/profile'
import type { ImpactMetric } from '@/data/types'
import { trackButtonClick } from '@/lib/analytics'
import { m as motion } from 'framer-motion'

export default function Hero({ metrics }: { metrics: ImpactMetric[] }) {
    if (metrics.length === 0) return null
    return (
        <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
            <div className="section-container relative z-10">
                {/* Location line. No availability badge, no live status. */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center mb-10 md:mb-16 border-t border-foreground/15 pt-4"
                >
                    <span className="mono-label text-foreground/70">
                        Jakarta, Indonesia
                    </span>
                </motion.div>

                {/* Asymmetric headline grid */}
                <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-end mb-16 md:mb-24">
                    <div className="col-span-12 lg:col-span-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="h-display text-balance text-foreground"
                        >
                            Dhema&apos;alam Fajrianto
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="col-span-12 lg:col-span-4 mt-10 lg:mt-0 lg:pl-6 lg:border-l lg:border-foreground/15"
                    >
                        <p className="text-foreground text-xl md:text-2xl font-medium leading-snug text-pretty">
                            {profile.tagline}.
                        </p>

                        <p className="mt-4 text-foreground/75 text-base leading-relaxed text-pretty">
                            Product Manager with four-plus years designing and scaling
                            software across fintech payment rails, enterprise architecture
                            consulting, and AI-enabled platforms.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                                href="#featured-work"
                                onClick={() => trackButtonClick('hero_view_work')}
                                className="btn-ink"
                                data-testid="hero-view-work-btn"
                            >
                                Explore selected work
                                <span aria-hidden>→</span>
                            </a>
                            <a
                                href={profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackButtonClick('hero_view_resume')}
                                className="btn-outline"
                                data-testid="hero-view-resume-btn"
                            >
                                View resume
                                <span aria-hidden>↗</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Impact metrics. Values are static in the server HTML. */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="border-t border-foreground/20"
                    data-testid="hero-impact-metrics"
                >
                    <div className="mono-label text-foreground/65 py-4 flex items-center justify-between border-b border-foreground/10">
                        <span>Selected impact · 2021 – 2026</span>
                        <span className="hidden sm:inline">{metrics.length} metrics</span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-foreground/10 border-b border-foreground/20">
                        {metrics.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                                className="p-4 sm:p-5 md:p-7 group hover:bg-foreground/[0.03] transition-colors"
                            >
                                <div className="metric text-3xl sm:text-4xl md:text-5xl leading-none text-foreground mb-3">
                                    {metric.value}
                                </div>
                                <div className="text-sm font-medium text-foreground mb-1">
                                    {metric.href ? (
                                        <a
                                            href={metric.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() =>
                                                trackButtonClick('hero_metric_niama')
                                            }
                                            className="hover:text-cobalt link-underline transition-colors"
                                            data-testid={`hero-metric-link-${i}`}
                                        >
                                            {metric.label}
                                            <span aria-hidden> ↗</span>
                                        </a>
                                    ) : (
                                        metric.label
                                    )}
                                </div>
                                <div className="text-xs text-foreground/70 leading-snug">
                                    {metric.description}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
