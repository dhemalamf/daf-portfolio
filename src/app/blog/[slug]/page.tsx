import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import ShareButtons from '@/components/ShareButtons'
import BackToTop from '@/components/BackToTop'

// Force fresh data on every request (no caching)
export const revalidate = 0

interface BlogPost {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt: string
    coverImage: any
    body: any
    tags: string[]
    readingTime: string
}

async function getPost(slug: string): Promise<BlogPost | null> {
    const post = await client.fetch(
        `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
            _id,
            title,
            slug,
            publishedAt,
            excerpt,
            coverImage,
            body,
            tags,
            readingTime
        }`,
        { slug }
    )
    return post
}

async function getRelatedPosts(currentPostId: string, tags: string[]): Promise<BlogPost[]> {
    // First try to get posts with matching tags
    let relatedPosts = await client.fetch(
        `*[_type == "post" && _id != $currentPostId && !(_id in path("drafts.**")) && count((tags[])[@ in $tags]) > 0] | order(publishedAt desc)[0...3] {
            _id,
            title,
            slug,
            publishedAt,
            excerpt,
            coverImage,
            tags,
            readingTime
        }`,
        { currentPostId, tags: tags || [] }
    )

    // If no related posts found, get recent posts
    if (relatedPosts.length === 0) {
        relatedPosts = await client.fetch(
            `*[_type == "post" && _id != $currentPostId && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...3] {
                _id,
                title,
                slug,
                publishedAt,
                excerpt,
                coverImage,
                tags,
                readingTime
            }`,
            { currentPostId }
        )
    }

    return relatedPosts
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: `${post.title} | Dhema'alam Fajrianto`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.coverImage ? [urlFor(post.coverImage).width(1200).height(630).url()] : [],
        },
    }
}

const portableTextComponents = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="my-8">
                    <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || 'Blog post image'}
                        width={1200}
                        height={675}
                        className="rounded-lg"
                    />
                    {value.caption && (
                        <p className="text-sm text-muted-foreground text-center mt-2">{value.caption}</p>
                    )}
                </div>
            )
        },
        code: ({ value }: any) => {
            return (
                <pre className="my-6 p-4 bg-muted rounded-lg overflow-x-auto">
                    <code className="text-sm">{value.code}</code>
                </pre>
            )
        },
    },
    block: {
        h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-12 mb-4">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-4">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-3">{children}</h3>,
        normal: ({ children }: any) => <p className="mb-6 leading-relaxed">{children}</p>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-accent pl-4 my-6 italic text-muted-foreground">
                {children}
            </blockquote>
        ),
    },
    marks: {
        link: ({ children, value }: any) => {
            return (
                <a
                    href={value.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                >
                    {children}
                </a>
            )
        },
        strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
        code: ({ children }: any) => (
            <code className="px-2 py-1 bg-muted rounded text-sm font-mono">{children}</code>
        ),
    },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = await getRelatedPosts(post._id, post.tags || [])

    return (
        <div className="pt-24 md:pt-32 pb-20">
            <div className="section-container">
                <article className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <span>←</span>
                        <span>Back to Blog</span>
                    </Link>

                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            {post.readingTime && (
                                <>
                                    <span>•</span>
                                    <span>{post.readingTime}</span>
                                </>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

                        <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-accent-500/10 text-accent-400 text-sm font-medium rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Share Buttons (Compact) */}
                        <ShareButtons
                            title={post.title}
                            url={`https://dhema.me/blog/${post.slug.current}`}
                            compact
                        />
                    </header>

                    {/* Cover Image */}
                    {post.coverImage && (
                        <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden">
                            <Image
                                src={urlFor(post.coverImage).width(1200).height(630).url()}
                                alt={post.coverImage.alt || post.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <PortableText value={post.body} components={portableTextComponents} />
                    </div>

                    {/* Share Buttons (Full) */}
                    <div className="mt-12 pt-8 border-t border-border">
                        <ShareButtons
                            title={post.title}
                            url={`https://dhema.me/blog/${post.slug.current}`}
                        />
                    </div>
                </article>

                {/* Back to Blog CTA */}
                <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-border">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-lg transition-colors"
                    >
                        ← Back to All Posts
                    </Link>
                </div>

                {/* Recommended Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">
                            Recommended <span className="gradient-text">Posts</span>
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost._id}
                                    href={`/blog/${relatedPost.slug.current}`}
                                    className="group block"
                                >
                                    <article className="glass-card overflow-hidden hover-lift h-full flex flex-col">
                                        {relatedPost.coverImage && (
                                            <div className="relative h-40 w-full overflow-hidden">
                                                <Image
                                                    src={urlFor(relatedPost.coverImage).width(400).height(250).url()}
                                                    alt={relatedPost.coverImage.alt || relatedPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                                <time dateTime={relatedPost.publishedAt}>
                                                    {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </time>
                                                {relatedPost.readingTime && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{relatedPost.readingTime}</span>
                                                    </>
                                                )}
                                            </div>
                                            <h3 className="font-bold mb-2 group-hover:text-accent-400 transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                                                {relatedPost.excerpt}
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <BackToTop />
        </div>
    )
}
