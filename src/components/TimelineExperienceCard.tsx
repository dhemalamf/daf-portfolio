'use client'

import Image from 'next/image'
import { m as motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
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
    isLast,
    index = 0,
}: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.15 })
    const isPresent = period.includes('Present')

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            className="relative grid grid-cols-12 gap-x-6 py-10 border-t border-foreground/15"
            data-testid={`timeline-card-${company.toLowerCase().replace(/\s+/g, '-')}`}
        >
            {/* Period column */}
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
                <div className="flex items-baseline gap-2 mono-label text-foreground/70">
                    {period}
                </div>
                <div className="mono-label text-foreground/60 mt-2">{type}</div>
            </div>

            {/* Center: timeline indicator */}
            <div className="hidden md:flex md:col-span-1 justify-center">
                <div className="relative flex flex-col items-center">
                    <div
                        className={`w-2.5 h-2.5 ${
                            isPresent ? 'bg-foreground' : 'bg-foreground/40'
                        } shrink-0`}
                    />
                    {!isLast && (
                        <div className="absolute top-3 w-px bg-foreground/20 h-[calc(100%+2.5rem)]" />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
                <div className="flex items-center gap-3 mb-3">
                    {logo && (
                        <div className="w-9 h-9 bg-white border border-foreground/10 p-1.5 shrink-0">
                            <Image
                                src={logo}
                                alt={`${company} logo`}
                                width={36}
                                height={36}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                    <div>
                        <h3 className="font-sans font-semibold text-2xl md:text-3xl leading-tight tracking-tight">
                            {role}
                        </h3>
                        <div className="mono-label text-foreground/60">{company}</div>
                    </div>
                </div>

                <p className="text-foreground/70 leading-relaxed text-sm md:text-base text-pretty mb-5 max-w-3xl">
                    {description}
                </p>

                <ul className="space-y-2.5 mb-5 list-disc pl-4 marker:text-foreground/30">
                    {highlights.map((h, i) => (
                        <li key={i} className="text-foreground/75 text-sm leading-relaxed">
                            {h}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                    {industries.map((tag, i) => (
                        <span key={i} className="tag-pill">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
