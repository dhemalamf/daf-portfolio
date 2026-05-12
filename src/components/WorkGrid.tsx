'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CaseStudy } from '@/data/caseStudies'
import CaseStudyCard from '@/components/CaseStudyCard'

interface WorkGridProps {
    initialCaseStudies: CaseStudy[]
}

type SortKey = 'title' | 'publishDate'
type SortDirection = 'asc' | 'desc'

export default function WorkGrid({ initialCaseStudies }: WorkGridProps) {
    const [sortKey, setSortKey] = useState<SortKey>('publishDate')
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

    const sorted = useMemo(() => {
        return [...initialCaseStudies].sort((a, b) => {
            if (sortKey === 'title') {
                return sortDirection === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            }
            const dateA = new Date(a.publishDate).getTime()
            const dateB = new Date(b.publishDate).getTime()
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
        })
    }, [initialCaseStudies, sortKey, sortDirection])

    return (
        <div>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 border-b border-foreground/15 pb-5">
                <div className="mono-label text-foreground/50">
                    {sorted.length} case studies · ordered by{' '}
                    <span className="text-foreground">
                        {sortKey === 'title' ? 'name' : 'date'}
                    </span>{' '}
                    ({sortDirection})
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setSortKey('publishDate')}
                        data-testid="sort-by-date"
                        className={`mono-label px-3 py-2 border ${
                            sortKey === 'publishDate'
                                ? 'border-foreground text-foreground bg-foreground/[0.04]'
                                : 'border-foreground/15 text-foreground/55 hover:border-foreground/40'
                        }`}
                    >
                        Date
                    </button>
                    <button
                        onClick={() => setSortKey('title')}
                        data-testid="sort-by-title"
                        className={`mono-label px-3 py-2 border ${
                            sortKey === 'title'
                                ? 'border-foreground text-foreground bg-foreground/[0.04]'
                                : 'border-foreground/15 text-foreground/55 hover:border-foreground/40'
                        }`}
                    >
                        Name
                    </button>
                    <span className="w-px h-5 bg-foreground/15 mx-1.5" />
                    <button
                        onClick={() => setSortDirection('desc')}
                        data-testid="sort-desc"
                        className={`mono-label px-3 py-2 border ${
                            sortDirection === 'desc'
                                ? 'border-foreground text-foreground bg-foreground/[0.04]'
                                : 'border-foreground/15 text-foreground/55 hover:border-foreground/40'
                        }`}
                        aria-label="Sort descending"
                    >
                        ↓
                    </button>
                    <button
                        onClick={() => setSortDirection('asc')}
                        data-testid="sort-asc"
                        className={`mono-label px-3 py-2 border ${
                            sortDirection === 'asc'
                                ? 'border-foreground text-foreground bg-foreground/[0.04]'
                                : 'border-foreground/15 text-foreground/55 hover:border-foreground/40'
                        }`}
                        aria-label="Sort ascending"
                    >
                        ↑
                    </button>
                </div>
            </div>

            {/* Grid */}
            <motion.div layout className="grid md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {sorted.map((cs, i) => (
                        <motion.div
                            key={cs.id}
                            layout
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                            className={`h-full ${i === 0 ? 'md:col-span-2' : ''}`}
                        >
                            <CaseStudyCard caseStudy={cs} featured={i === 0} index={i} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
