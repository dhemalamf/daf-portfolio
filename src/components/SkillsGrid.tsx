'use client'

import { skills } from '@/data/profile'
import SpotlightCard from '@/components/animations/SpotlightCard'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
    { title: 'Product Management', items: skills.productManagement, icon: TargetIcon },
    { title: 'Technical Skills', items: skills.technical, icon: GearIcon },
    { title: 'Domain Expertise', items: skills.domains, icon: GlobeIcon },
    { title: 'Tools & Platforms', items: skills.tools, icon: WrenchIcon },
]

function TargetIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
    )
}

function GearIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )
}

function GlobeIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
    )
}

function WrenchIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
    )
}

export default function SkillsGrid() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <SpotlightCard className="glass-card p-6 md:p-8 h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400">
                                <category.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-display font-bold">{category.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.items.map((skill, skillIndex) => (
                                <motion.span
                                    key={skillIndex}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 + skillIndex * 0.03 }}
                                    className="px-3 py-1.5 bg-muted/50 text-muted-foreground text-sm rounded-lg hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-500/20 border border-transparent transition-all duration-200 cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </SpotlightCard>
                </motion.div>
            ))}
        </div>
    )
}
