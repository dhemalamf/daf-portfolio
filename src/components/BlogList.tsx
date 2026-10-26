'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/sanity/image'
import type { PostSummary } from '@/sanity/types'
import FadeIn from '@/components/animations/FadeIn'

interface BlogListProps {
    posts: PostSummary[]
    allTags: string[]
}

const POSTS_PER_PAGE = 9

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

const readingMinutes = (value?: string | null) => {
    if (!value) return 0
    const match = value.match(/(\d+)/)
    return match ? Number.parseInt(match[1], 10) : 0
}

export default function BlogList({ posts, allTags }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [readingTimeMin, setReadingTimeMin] = useState('')
    const [readingTimeMax, setReadingTimeMax] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            if (
                searchQuery &&
                !post.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                return false
            }
            if (
                selectedTags.length > 0 &&
                !post.tags?.some((tag) => selectedTags.includes(tag))
            ) {
                return false
            }
            const publishedAt = new Date(post.publishedAt)
            if (dateFrom && publishedAt < new Date(dateFrom)) return false
            if (dateTo && publishedAt > new Date(dateTo)) return false
            const minutes = readingMinutes(post.readingTime)
            if (readingTimeMin && minutes < Number.parseInt(readingTimeMin, 10)) {
                return false
            }
            if (readingTimeMax && minutes > Number.parseInt(readingTimeMax, 10)) {
                return false
            }
            return true
        })
    }, [
        posts,
        searchQuery,
        selectedTags,
        dateFrom,
        dateTo,
        readingTimeMin,
        readingTimeMax,
    ])

    const hasActiveFilters =
        Boolean(searchQuery) ||
        selectedTags.length > 0 ||
        Boolean(dateFrom) ||
        Boolean(dateTo) ||
        Boolean(readingTimeMin) ||
        Boolean(readingTimeMax)

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedTags([])
        setDateFrom('')
        setDateTo('')
        setReadingTimeMin('')
        setReadingTimeMax('')
        setCurrentPage(1)
    }

    const updateFilter = <T,>(setter: (value: T) => void, value: T) => {
        setter(value)
        setCurrentPage(1)
    }

    const toggleTag = (tag: string) => {
        setSelectedTags((previous) =>
            previous.includes(tag)
                ? previous.filter((item) => item !== tag)
                : [...previous, tag]
        )
        setCurrentPage(1)
    }

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    const fieldClass =
        'w-full bg-transparent border border-foreground/20 px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-vermillion focus-visible:outline-none transition-colors'

    return (
        <div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="relative">
                    <label htmlFor="journal-search" className="sr-only">
                        Search journal
                    </label>
                    <input
                        id="journal-search"
                        type="search"
                        placeholder="Search entries"
                        value={searchQuery}
                        onChange={(event) =>
                            updateFilter(setSearchQuery, event.target.value)
                        }
                        className={`${fieldClass} w-56 sm:w-72 pl-3`}
                    />
                </div>

                <button
                    type="button"
                    onClick={() => setShowFilters((value) => !value)}
                    aria-expanded={showFilters}
                    aria-controls="journal-filters"
                    className={`mono-label px-3 py-2.5 border transition-colors ${
                        showFilters || hasActiveFilters
                            ? 'border-foreground text-foreground'
                            : 'border-foreground/20 text-foreground/60 hover:border-foreground/50'
                    }`}
                >
                    Filters{hasActiveFilters ? ` (${selectedTags.length || '•'})` : ''}
                </button>

                <div className="flex border border-foreground/20">
                    <button
                        type="button"
                        onClick={() => setViewMode('grid')}
                        aria-pressed={viewMode === 'grid'}
                        className={`mono-label px-3 py-2.5 transition-colors ${
                            viewMode === 'grid'
                                ? 'bg-foreground text-background'
                                : 'text-foreground/60 hover:text-foreground'
                        }`}
                    >
                        Grid
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('list')}
                        aria-pressed={viewMode === 'list'}
                        className={`mono-label px-3 py-2.5 border-l border-foreground/20 transition-colors ${
                            viewMode === 'list'
                                ? 'bg-foreground text-background'
                                : 'text-foreground/60 hover:text-foreground'
                        }`}
                    >
                        List
                    </button>
                </div>

                <p className="mono-label text-foreground/45 sm:ml-auto">
                    {filteredPosts.length === 0
                        ? '0 entries'
                        : `${startIndex + 1}–${Math.min(endIndex, filteredPosts.length)} of ${filteredPosts.length}`}
                </p>
            </div>

            <AnimatePresence initial={false}>
                {showFilters && (
                    <motion.div
                        id="journal-filters"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="border border-foreground/15 p-5 md:p-6 mb-8 space-y-5">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label
                                        htmlFor="journal-date-from"
                                        className="mono-label block text-foreground/55 mb-2"
                                    >
                                        From
                                    </label>
                                    <input
                                        id="journal-date-from"
                                        type="date"
                                        value={dateFrom}
                                        onChange={(event) =>
                                            updateFilter(setDateFrom, event.target.value)
                                        }
                                        className={fieldClass}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="journal-date-to"
                                        className="mono-label block text-foreground/55 mb-2"
                                    >
                                        To
                                    </label>
                                    <input
                                        id="journal-date-to"
                                        type="date"
                                        value={dateTo}
                                        onChange={(event) =>
                                            updateFilter(setDateTo, event.target.value)
                                        }
                                        className={fieldClass}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="journal-read-min"
                                        className="mono-label block text-foreground/55 mb-2"
                                    >
                                        Min read
                                    </label>
                                    <input
                                        id="journal-read-min"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={readingTimeMin}
                                        onChange={(event) =>
                                            updateFilter(setReadingTimeMin, event.target.value)
                                        }
                                        className={fieldClass}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="journal-read-max"
                                        className="mono-label block text-foreground/55 mb-2"
                                    >
                                        Max read
                                    </label>
                                    <input
                                        id="journal-read-max"
                                        type="number"
                                        min="0"
                                        placeholder="30"
                                        value={readingTimeMax}
                                        onChange={(event) =>
                                            updateFilter(setReadingTimeMax, event.target.value)
                                        }
                                        className={fieldClass}
                                    />
                                </div>
                            </div>

                            {allTags.length > 0 && (
                                <div>
                                    <p className="mono-label text-foreground/55 mb-2">
                                        Topics
                                        {selectedTags.length > 0 &&
                                            ` · ${selectedTags.length} selected`}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {allTags.map((tag) => {
                                            const active = selectedTags.includes(tag)
                                            return (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => toggleTag(tag)}
                                                    aria-pressed={active}
                                                    className={
                                                        active
                                                            ? 'tag-pill-accent'
                                                            : 'tag-pill hover:border-foreground/40'
                                                    }
                                                >
                                                    {tag}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mono-label text-vermillion hover:underline"
                                >
                                    Reset all filters
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {filteredPosts.length > 0 ? (
                <>
                    {viewMode === 'grid' ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedPosts.map((post, index) => (
                                <BlogCard
                                    key={post._id}
                                    post={post}
                                    index={index}
                                    layout="grid"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="border-t border-foreground/15">
                            {paginatedPosts.map((post, index) => (
                                <BlogCard
                                    key={post._id}
                                    post={post}
                                    index={index}
                                    layout="list"
                                />
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <nav
                            aria-label="Journal pagination"
                            className="flex items-center justify-center gap-2 mt-12"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentPage((page) => Math.max(1, page - 1))
                                }
                                disabled={currentPage === 1}
                                aria-label="Previous page"
                                className="mono-label px-3 py-2 border border-foreground/20 hover:border-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                ←
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(
                                    (page) =>
                                        page === 1 ||
                                        page === totalPages ||
                                        Math.abs(page - currentPage) <= 1
                                )
                                .map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => setCurrentPage(page)}
                                        aria-current={
                                            currentPage === page ? 'page' : undefined
                                        }
                                        className={`mono-label px-3 py-2 border transition-colors ${
                                            currentPage === page
                                                ? 'bg-foreground text-background border-foreground'
                                                : 'border-foreground/20 hover:border-foreground'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(totalPages, page + 1)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                aria-label="Next page"
                                className="mono-label px-3 py-2 border border-foreground/20 hover:border-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                →
                            </button>
                        </nav>
                    )}
                </>
            ) : (
                <div className="border border-foreground/15 p-8 md:p-12">
                    <div className="mono-label text-vermillion mb-3">No results</div>
                    <h2 className="font-serif text-3xl tracking-tight mb-2">
                        No entries match those filters.
                    </h2>
                    <p className="text-foreground/70 mb-6">
                        Try a broader search or reset the filters.
                    </p>
                    <button type="button" onClick={clearFilters} className="btn-outline">
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    )
}

interface BlogCardProps {
    post: PostSummary
    index: number
    layout: 'grid' | 'list'
}

function BlogCard({ post, index, layout }: BlogCardProps) {
    const meta = (
        <div className="flex flex-wrap items-center gap-3 mono-label text-foreground/50">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.readingTime && (
                <>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                </>
            )}
        </div>
    )

    const tags = post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="tag-pill">
                    {tag}
                </span>
            ))}
            {post.tags.length > 2 && (
                <span className="mono-label text-foreground/45 self-center">
                    +{post.tags.length - 2}
                </span>
            )}
        </div>
    )

    if (layout === 'list') {
        return (
            <FadeIn delay={index * 0.05}>
                <Link
                    href={`/blog/${post.slug.current}`}
                    className="group grid grid-cols-12 gap-4 md:gap-6 items-baseline py-7 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors"
                >
                    <div className="col-span-12 md:col-span-2">{meta}</div>
                    <div className="col-span-12 md:col-span-6">
                        <h2 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight group-hover:text-vermillion transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-foreground/60 text-sm leading-relaxed mt-2 text-pretty line-clamp-2">
                            {post.excerpt}
                        </p>
                    </div>
                    <div className="col-span-8 md:col-span-2">{tags}</div>
                    <div className="col-span-4 md:col-span-2 md:text-right">
                        <span className="mono-label text-foreground/55 group-hover:text-vermillion transition-colors">
                            Read →
                        </span>
                    </div>
                </Link>
            </FadeIn>
        )
    }

    return (
        <FadeIn delay={index * 0.05}>
            <Link
                href={`/blog/${post.slug.current}`}
                className="group flex h-full flex-col border border-foreground/15 hover:border-foreground/40 transition-colors bg-surface"
            >
                {post.coverImage && (
                    <div className="relative h-48 w-full overflow-hidden border-b border-foreground/10">
                        <Image
                            src={urlFor(post.coverImage).width(600).height(400).url()}
                            alt={post.coverImage.alt || post.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover img-mute group-hover:scale-[1.03] transition-transform duration-700"
                        />
                    </div>
                )}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                    {meta}
                    <h2 className="font-serif text-2xl leading-tight tracking-tight mt-3 mb-3 group-hover:text-vermillion transition-colors text-pretty">
                        {post.title}
                    </h2>
                    <p className="text-foreground/65 text-sm leading-relaxed mb-5 flex-1 line-clamp-3 text-pretty">
                        {post.excerpt}
                    </p>
                    <div className="flex items-end justify-between gap-4 mt-auto pt-4 border-t border-foreground/10">
                        {tags || <span />}
                        <span className="mono-label text-foreground/55 group-hover:text-vermillion transition-colors shrink-0">
                            Read →
                        </span>
                    </div>
                </div>
            </Link>
        </FadeIn>
    )
}
