'use client'

import { skills } from '@/data/profile'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const categories: { title: string; items: string[]; numeral: string }[] = [
    { title: 'Product management', items: skills.productManagement, numeral: '01' },
    { title: 'Technical', items: skills.technical, numeral: '02' },
    { title: 'Domain expertise', items: skills.domains, numeral: '03' },
    { title: 'Tools & platforms', items: skills.tools, numeral: '04' },
]

export default function SkillsGrid() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.15 })

    return (
        <div
            ref={ref}
            className="border-t border-foreground/20 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-foreground/10"
            data-testid="skills-grid"
        >
            {categories.map((cat, i) => (
                <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`p-6 md:p-10 ${i >= 2 ? 'md:border-t md:border-foreground/10' : ''}`}
                >
                    <div className="flex items-baseline gap-3 mb-6">
                        <span className="mono-label text-vermillion">{cat.numeral}</span>
                        <span className="h-px flex-1 bg-foreground/15" />
                        <span className="mono-label text-foreground/40">
                            {cat.items.length} skills
                        </span>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight mb-6">
                        {cat.title}
                    </h3>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        {cat.items.map((skill, j) => (
                            <motion.li
                                key={skill}
                                initial={{ opacity: 0, x: -8 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: i * 0.08 + j * 0.03 }}
                                className="group flex items-baseline gap-2.5 py-2 border-b border-foreground/5 text-sm text-foreground/85 hover:text-foreground transition-colors"
                            >
                                <span className="mono-label text-foreground/30 group-hover:text-vermillion transition-colors">
                                    ./{String(j + 1).padStart(2, '0')}
                                </span>
                                <span>{skill}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    )
}
