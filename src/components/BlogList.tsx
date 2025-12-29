'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

interface BlogPost {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt: string
    coverImage: any
    tags: string[]
    readingTime: string
}

interface BlogListProps {
    posts: BlogPost[]
    allTags: string[]
}

const POSTS_PER_PAGE = 9

export default function BlogList({ posts, allTags }: BlogListProps) {
    // State
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [readingTimeMin, setReadingTimeMin] = useState('')
    const [readingTimeMax, setReadingTimeMax] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    // Parse reading time from string like "5 min read" to number
    const parseReadingTime = (timeStr: string | undefined): number => {
        if (!timeStr) return 0
        const match = timeStr.match(/(\d+)/)
        return match ? parseInt(match[1], 10) : 0
    }

    // Filter posts
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            // Search filter
            if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false
            }

            // Tag filter (match any selected tag)
            if (selectedTags.length > 0 && (!post.tags || !post.tags.some(tag => selectedTags.includes(tag)))) {
                return false
            }

            // Date filter
            const postDate = new Date(post.publishedAt)
            if (dateFrom && postDate < new Date(dateFrom)) {
                return false
            }
            if (dateTo && postDate > new Date(dateTo)) {
                return false
            }

            // Reading time filter
            const readingTime = parseReadingTime(post.readingTime)
            if (readingTimeMin && readingTime < parseInt(readingTimeMin, 10)) {
                return false
            }
            if (readingTimeMax && readingTime > parseInt(readingTimeMax, 10)) {
                return false
            }

            return true
        })
    }, [posts, searchQuery, selectedTags, dateFrom, dateTo, readingTimeMin, readingTimeMax])

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedTags([])
        setDateFrom('')
        setDateTo('')
        setReadingTimeMin('')
        setReadingTimeMax('')
        setCurrentPage(1)
    }

    // Reset to page 1 when filters change
    const handleFilterChange = (setter: (val: any) => void, value: any) => {
        setter(value)
        setCurrentPage(1)
    }

    const hasActiveFilters = searchQuery || selectedTags.length > 0 || dateFrom || dateTo || readingTimeMin || readingTimeMax

    // Toggle tag selection
    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
        setCurrentPage(1)
    }

    // Pagination logic
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    return (
        <div>
            {/* Unified Toolbar */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
                {/* Search */}
                <div className="relative">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search post"
                        value={searchQuery}
                        onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
                        className="w-64 sm:w-80 pl-9 pr-3 py-2 text-sm bg-slate-200/50 dark:bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                    />
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-border hidden sm:block"></div>

                {/* Filters Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all flex items-center gap-2 ${showFilters || hasActiveFilters
                        ? 'bg-background text-foreground border-border shadow-sm'
                        : 'bg-slate-200/50 dark:bg-muted/50 border-border text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                    Filters
                    {hasActiveFilters && (
                        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    )}
                </button>

                {/* View Toggle */}
                <div className="flex bg-slate-200/50 dark:bg-muted/50 border border-border rounded-lg p-0.5">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        title="Grid View"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list'
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                        title="List View"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
                <div className="bg-slate-200/30 dark:bg-muted/30 p-6 rounded-lg border border-border space-y-4 mb-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Date Range */}
                        <div>
                            <label className="block text-sm text-muted-foreground mb-2">Date From</label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => handleFilterChange(setDateFrom, e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-muted-foreground mb-2">Date To</label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => handleFilterChange(setDateTo, e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground/20"
                            />
                        </div>

                        {/* Reading Time Range */}
                        <div>
                            <label className="block text-sm text-muted-foreground mb-2">Min Read (min)</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={readingTimeMin}
                                onChange={(e) => handleFilterChange(setReadingTimeMin, e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-muted-foreground mb-2">Max Read (min)</label>
                            <input
                                type="number"
                                min="0"
                                placeholder="30"
                                value={readingTimeMax}
                                onChange={(e) => handleFilterChange(setReadingTimeMax, e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground/20"
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                            Tags {selectedTags.length > 0 && <span className="text-foreground">({selectedTags.length} selected)</span>}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1 text-sm rounded-md transition-all ${selectedTags.includes(tag)
                                        ? 'bg-accent text-accent-foreground shadow-sm'
                                        : 'bg-slate-200 dark:bg-muted text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reset Filters */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 transition-all flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset Filters
                        </button>
                    )}
                </div>
            )}

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} posts
                {filteredPosts.length !== posts.length && ` (filtered from ${posts.length})`}
            </p>

            {/* Blog Posts */}
            {
                filteredPosts.length > 0 ? (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedPosts.map((post) => (
                                    <BlogCardGrid key={post._id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {paginatedPosts.map((post) => (
                                    <BlogCardList key={post._id} post={post} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                {/* Previous Button */}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-border hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Page Numbers */}
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        // Show first, last, current, and adjacent pages
                                        const showPage =
                                            page === 1 ||
                                            page === totalPages ||
                                            Math.abs(page - currentPage) <= 1

                                        if (!showPage) {
                                            // Show ellipsis
                                            if (page === 2 || page === totalPages - 1) {
                                                return (
                                                    <span key={page} className="px-2 py-1 text-muted-foreground">
                                                        ...
                                                    </span>
                                                )
                                            }
                                            return null
                                        }

                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                                                    ? 'bg-accent text-accent-foreground'
                                                    : 'border border-border hover:border-accent'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    })}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-border hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg mb-4">
                            No posts match your filters
                        </p>
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent text-foreground font-medium rounded-lg transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )
            }
        </div>
    )
}

// Grid View Card
function BlogCardGrid({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug.current}`} className="group block h-full">
            <article className="glass-card overflow-hidden hover-lift h-full flex flex-col">
                {post.coverImage && (
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={urlFor(post.coverImage).width(600).height(400).url()}
                            alt={post.coverImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        {post.readingTime && (
                            <>
                                <span>•</span>
                                <span>{post.readingTime}</span>
                            </>
                        )}
                    </div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-accent-400 transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-accent-500/10 text-accent-400 text-xs font-medium rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    )
}

// List View Card
function BlogCardList({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug.current}`} className="group block">
            <article className="glass-card overflow-hidden hover-lift flex flex-col md:flex-row">
                {post.coverImage && (
                    <div className="relative h-48 md:h-auto md:w-64 flex-shrink-0 overflow-hidden">
                        <Image
                            src={urlFor(post.coverImage).width(400).height(300).url()}
                            alt={post.coverImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        {post.readingTime && (
                            <>
                                <span>•</span>
                                <span>{post.readingTime}</span>
                            </>
                        )}
                    </div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-accent-400 transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-accent-500/10 text-accent-400 text-xs font-medium rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    )
}
