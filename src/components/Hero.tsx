'use client'

import Link from 'next/link'
import { profile } from '@/data/profile'
import type { ImpactMetric } from '@/data/types'
import { trackButtonClick } from '@/lib/analytics'
import { m as motion } from 'framer-motion'

export default function Hero({ metrics }: { metrics: ImpactMetric[] }) {
    if (metrics.length === 0) return null
    return (
        <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
            <div className="section-container relative z-10">
                {/* Status row */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-10 md:mb-16 border-t border-foreground/15 pt-4"
                >
                    <div className="flex items-center gap-3 mono-label text-foreground/70">
                        <span aria-hidden className="inline-flex h-2 w-2 rounded-full bg-foreground/40" />
                        Open to collaboration · Jakarta, ID
                    </div>
                </motion.div>

                {/* Asymmetric headline grid */}
                <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-end mb-16 md:mb-24">
                    <div className="col-span-12 lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="mono-label text-foreground/65 mb-6"
                        >
                            Payments &amp; disbursement · Doitpay
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-display text-balance text-foreground"
                        >
                            Dhema&apos;alam Fajrianto
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="col-span-12 lg:col-span-4 mt-10 lg:mt-0 lg:pl-6 lg:border-l lg:border-foreground/15"
                    >
                        <p className="text-foreground/75 text-base md:text-lg leading-relaxed text-pretty">
                            Leading core payments and disbursement infrastructure at
                            Doitpay. Previously built consumer remittance products at
                            Transfez, scaling to Rp 2T+ GTV, and delivered enterprise AI
                            platforms at Zero One Group.
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
                    <div className="mono-label text-foreground/65 py-4 flex items-center justify-between border-b border-foreground/10">
                        <span>Selected impact · 2021 – 2026</span>
                        <span className="hidden sm:inline">{metrics.length} metrics</span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-foreground/10 border-b border-foreground/20">
                        {metrics.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 + i * 0.08 }}
                                className="p-5 md:p-7 group hover:bg-foreground/[0.03] transition-colors"
                            >
                                <div className="metric text-4xl md:text-5xl leading-none text-foreground mb-3">
                                    {m.value}
                                </div>
                                <div className="text-sm font-medium text-foreground mb-1">
                                    {m.label}
                                </div>
                                <div className="text-xs text-foreground/70 leading-snug">
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
