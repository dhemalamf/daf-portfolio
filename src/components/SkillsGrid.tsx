'use client'

import type { SkillGroup } from '@/data/types'
import { m as motion, useInView } from 'framer-motion'
import { useRef } from 'react'


export default function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.15 })

    return (
        <div
            ref={ref}
            className="border-t border-foreground/20 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-foreground/10"
            data-testid="skills-grid"
        >
            {groups.map((cat, i) => (
                <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`p-6 md:p-10 ${i >= 2 ? 'md:border-t md:border-foreground/10' : ''}`}
                >
                    <div className="flex items-baseline gap-3 mb-6">
                        <span className="h-px flex-1 bg-foreground/15" />
                        <span className="mono-label text-foreground/60">
                            {cat.items.length} skills
                        </span>
                    </div>

                    <h3 className="font-sans font-semibold text-2xl md:text-3xl leading-tight tracking-tight mb-6">
                        {cat.title}
                    </h3>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        {cat.items.map((skill, j) => (
                            <motion.li
                                key={skill}
                                initial={{ opacity: 0, x: -8 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: i * 0.08 + j * 0.03 }}
                                className="py-2 border-b border-foreground/5 text-sm text-foreground/85"
                            >
                                {skill}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    )
}
