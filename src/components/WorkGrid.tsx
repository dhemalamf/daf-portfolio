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

    const sortedCaseStudies = useMemo(() => {
        return [...initialCaseStudies].sort((a, b) => {
            if (sortKey === 'title') {
                return sortDirection === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            } else {
                const dateA = new Date(a.publishDate).getTime()
                const dateB = new Date(b.publishDate).getTime()
                return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
            }
        })
    }, [initialCaseStudies, sortKey, sortDirection])

    return (
        <div>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-end mb-8 gap-4">
                <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-xl border border-border/50">
                    <span className="text-sm text-muted-foreground pl-2">Sort by:</span>

                    {/* Sort Key Selector */}
                    <div className="flex bg-background/50 rounded-lg p-1">
                        <button
                            onClick={() => setSortKey('title')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-all ${sortKey === 'title'
                                ? 'bg-background text-foreground shadow-sm border border-border/50'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Name
                        </button>
                        <button
                            onClick={() => setSortKey('publishDate')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-all ${sortKey === 'publishDate'
                                ? 'bg-background text-foreground shadow-sm border border-border/50'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Date
                        </button>
                    </div>

                    <div className="w-px h-4 bg-border" />

                    {/* Sort Direction Selector */}
                    <div className="flex bg-background/50 rounded-lg p-1">
                        <button
                            onClick={() => setSortDirection('asc')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-all ${sortDirection === 'asc'
                                ? 'bg-background text-foreground shadow-sm border border-border/50'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            aria-label="Sort Ascending"
                        >
                            ↑ Asc
                        </button>
                        <button
                            onClick={() => setSortDirection('desc')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-all ${sortDirection === 'desc'
                                ? 'bg-background text-foreground shadow-sm border border-border/50'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            aria-label="Sort Descending"
                        >
                            ↓ Desc
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <motion.div layout className="grid md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {sortedCaseStudies.map((caseStudy, index) => (
                        <motion.div
                            key={caseStudy.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`h-full ${index === 0 ? 'md:col-span-2' : ''}`}
                        >
                            <CaseStudyCard caseStudy={caseStudy} featured={index === 0} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
