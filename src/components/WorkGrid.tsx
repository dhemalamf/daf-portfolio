"use client"

import { useState, useMemo } from 'react'
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
                // publishDate
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
                <div className="flex items-center gap-3 bg-slate-200/50 dark:bg-muted/50 p-2 rounded-lg border border-border">
                    <span className="text-sm text-muted-foreground pl-2">Sort by:</span>

                    {/* Sort Key Selector */}
                    <div className="flex bg-slate-200 dark:bg-muted rounded-md p-1">
                        <button
                            onClick={() => setSortKey('title')}
                            className={`px-3 py-1.5 text-sm rounded-sm transition-all ${sortKey === 'title'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Name
                        </button>
                        <button
                            onClick={() => setSortKey('publishDate')}
                            className={`px-3 py-1.5 text-sm rounded-sm transition-all ${sortKey === 'publishDate'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Date
                        </button>
                    </div>

                    <div className="w-px h-4 bg-border mx-1"></div>

                    {/* Sort Direction Selector */}
                    <div className="flex bg-slate-200 dark:bg-muted rounded-md p-1">
                        <button
                            onClick={() => setSortDirection('asc')}
                            className={`px-3 py-1.5 text-sm rounded-sm transition-all ${sortDirection === 'asc'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            aria-label="Sort Ascending"
                        >
                            ↑ Asc
                        </button>
                        <button
                            onClick={() => setSortDirection('desc')}
                            className={`px-3 py-1.5 text-sm rounded-sm transition-all ${sortDirection === 'desc'
                                ? 'bg-background text-foreground shadow-sm'
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
            <div className="grid md:grid-cols-2 gap-6">
                {sortedCaseStudies.map((caseStudy) => (
                    <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
                ))}
            </div>
        </div>
    )
}
