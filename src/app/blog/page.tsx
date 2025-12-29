import { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/client'
import BlogList from '@/components/BlogList'

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
        `*[_type == "post"] | order(publishedAt desc) {
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

    // Extract all unique tags from posts
    const allTags = Array.from(
        new Set(posts.flatMap((post) => post.tags || []))
    ).sort()

    return (
        <div className="pt-24 md:pt-32 pb-20">
            <div className="section-container">
                {/* Header */}
                <div className="max-w-3xl mb-12">
                    <span className="inline-block text-accent-400 text-sm font-semibold uppercase tracking-wider mb-4">
                        Blog
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Insights & <span className="gradient-text">Perspectives</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Thoughts on Product Management, AI, and building products that create real value.
                    </p>
                </div>

                {/* Blog List with Search/Filters */}
                {posts.length > 0 ? (
                    <BlogList posts={posts} allTags={allTags} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg mb-6">
                            No blog posts yet. Check back soon!
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent text-foreground font-medium rounded-lg transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

