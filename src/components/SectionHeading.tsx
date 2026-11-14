'use client'

import { m as motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface SectionHeadingProps {
    eyebrow?: string
    title: ReactNode
    description?: ReactNode
    align?: 'left' | 'center'
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'left',
}: SectionHeadingProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.4 })

    return (
        <div
            ref={ref}
            className={`mb-12 md:mb-20 ${align === 'center' ? 'text-center' : ''}`}
        >
            {eyebrow && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className={`flex items-center gap-3 mb-5 ${align === 'center' ? 'justify-center' : ''}`}
                >
                    <span className="h-px w-8 bg-foreground/30" />
                    <span className="mono-label text-foreground/60">{eyebrow}</span>
                </motion.div>
            )}

            <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-2 mb-6 text-balance"
            >
                {title}
            </motion.h2>

            {description && (
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className={`text-foreground/70 text-base sm:text-lg leading-relaxed max-w-2xl text-pretty ${
                        align === 'center' ? 'mx-auto' : ''
                    }`}
                >
                    {description}
                </motion.div>
            )}
        </div>
    )
}
