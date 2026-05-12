'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ExperienceCardProps {
    company: string
    logo?: string
    role: string
    period: string
    type: string
    description: string
    highlights: string[]
    industries: string[]
    index?: number
}

export default function ExperienceCard({
    company,
    logo,
    role,
    period,
    type,
    description,
    highlights,
    industries,
    index = 0,
}: ExperienceCardProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.15 })
    const isPresent = period.includes('Present')

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            data-testid={`experience-card-${company.toLowerCase().replace(/\s+/g, '-')}`}
            className="group grid grid-cols-12 gap-x-6 gap-y-4 py-8 md:py-10 border-t border-foreground/15 hover:bg-foreground/[0.02] transition-colors"
        >
            {/* Left: period */}
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
                <div className="flex items-baseline gap-2 mono-label text-foreground/70">
                    {isPresent && <span className="text-vermillion">●</span>}
                    {period}
                </div>
                <div className="mono-label text-foreground/40 mt-2">{type}</div>
            </div>

            {/* Middle: role, company, description */}
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
                <div className="flex items-center gap-3 mb-3">
                    {logo && (
                        <div className="w-9 h-9 flex items-center justify-center bg-surface border border-foreground/10 p-1.5 shrink-0">
                            <Image
                                src={logo}
                                alt={`${company} logo`}
                                width={36}
                                height={36}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                    <h3 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight">
                        {role}
                    </h3>
                </div>
                <div className="mono-label text-vermillion mb-4">{company}</div>
                <p className="text-foreground/70 leading-relaxed text-sm md:text-base text-pretty mb-5">
                    {description}
                </p>
                <ul className="space-y-2.5">
                    {highlights.map((h, i) => (
                        <li
                            key={i}
                            className="flex items-baseline gap-3 text-foreground/75 text-sm leading-relaxed"
                        >
                            <span className="mono-label text-foreground/35 w-8 shrink-0">
                                .{String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="flex-1">{h}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right: industries */}
            <div className="col-span-12 md:col-span-3 lg:col-span-4 flex md:justify-end">
                <div className="flex flex-wrap gap-2 md:justify-end h-fit">
                    {industries.map((tag, i) => (
                        <span key={i} className="tag-pill">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.article>
    )
}
