'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TimelineExperienceCardProps {
    company: string
    logo?: string
    role: string
    period: string
    type: string
    description: string
    highlights: string[]
    industries: string[]
    isLast?: boolean
    index?: number
}

export default function TimelineExperienceCard({
    company,
    logo,
    role,
    period,
    type,
    description,
    highlights,
    industries,
    isLast = false,
    index = 0,
}: TimelineExperienceCardProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative flex gap-6"
        >
            {/* Timeline */}
            <div className="hidden md:flex flex-col items-center">
                {/* Dot */}
                <div className={`w-4 h-4 rounded-full border-4 border-background z-10 flex-shrink-0 ${period.includes('Present') ? 'bg-violet-500' : 'bg-muted-foreground/30'}`} />
                {/* Line */}
                {!isLast && (
                    <div className="w-px h-full bg-gradient-to-b from-violet-500/40 to-transparent -mt-1" />
                )}
            </div>

            {/* Card */}
            <article className="glass-card p-6 md:p-8 hover-lift flex-1 mb-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                        {/* Company Logo */}
                        {logo && (
                            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0 rounded-xl bg-muted/50 p-2">
                                <Image
                                    src={logo}
                                    alt={`${company} logo`}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-display font-bold mb-1">{role}</h3>
                            <p className="text-violet-400 font-medium">{company}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                        <span
                            className={`px-3 py-1 text-sm rounded-full font-medium ${period.includes('Present')
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-muted text-muted-foreground'
                                }`}
                        >
                            {period}
                        </span>
                        <span className="text-muted-foreground text-sm">{type}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

                {/* Highlights */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                        Key Achievements
                    </h4>
                    <ul className="space-y-3">
                        {highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Industries */}
                <div className="flex flex-wrap gap-2">
                    {industries.map((industry, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-violet-500/10 text-violet-400 text-xs font-medium rounded-full border border-violet-500/10"
                        >
                            {industry}
                        </span>
                    ))}
                </div>
            </article>
        </motion.div>
    )
}
