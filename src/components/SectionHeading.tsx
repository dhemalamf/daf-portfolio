'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionHeadingProps {
    eyebrow?: string
    title: string
    description?: string
    centered?: boolean
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
    centered = false,
}: SectionHeadingProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    return (
        <div ref={ref} className={`mb-14 md:mb-20 ${centered ? 'text-center' : ''}`}>
            {eyebrow && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4"
                >
                    {eyebrow}
                </motion.span>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5"
            >
                {title}
            </motion.h2>
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`text-muted-foreground text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''}`}
                >
                    {description}
                </motion.p>
            )}
        </div>
    )
}
