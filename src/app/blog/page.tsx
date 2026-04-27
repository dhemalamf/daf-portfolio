import { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/client'
import BlogList from '@/components/BlogList'
import FadeIn from '@/components/animations/FadeIn'

export const revalidate = 0

export const metadata: Metadata = {
    title: "Blog | Dhema'alam Fajrianto",
    description: 'Insights on Product Management, AI, and building products that matter.',
}

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

async function getBlogPosts(): Promise<BlogPost[]> {
    const posts = await client.fetch(
        `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
            _id,
            title,
            slug,
            publishedAt,
            excerpt,
            coverImage,
            tags,
            readingTime
        }`
    )
    return posts
}

export default async function BlogPage() {
    const posts = await getBlogPosts()

    const allTags = Array.from(
        new Set(posts.flatMap((post) => post.tags || []))
    ).sort()

    return (
        <div className="pt-24 md:pt-36 pb-20">
            <div className="section-container">
                {/* Header */}
                <div className="max-w-3xl mb-14">
                    <FadeIn>
                        <span className="inline-block text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">
                            Blog
                        </span>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                            Insights & <span className="gradient-text">Perspectives</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Thoughts on Product Management, AI, and building products that create real value.
                        </p>
                    </FadeIn>
                </div>

                {/* Blog List with Search/Filters */}
                {posts.length > 0 ? (
                    <BlogList posts={posts} allTags={allTags} />
                ) : (
                    <FadeIn>
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg mb-6">
                                No blog posts yet. Check back soon!
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-violet-500/50 text-foreground font-medium rounded-xl transition-all hover:bg-violet-500/5"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>
                    </FadeIn>
                )}
            </div>
        </div>
    )
}
