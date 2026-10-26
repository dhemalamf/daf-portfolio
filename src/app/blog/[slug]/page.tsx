import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
    PortableText,
    type PortableTextComponents,
} from '@portabletext/react'
import { getPost, getRelatedPosts } from '@/sanity/queries'
import type { PostImage, PostSummary } from '@/sanity/types'
import { urlFor } from '@/sanity/image'
import ShareButtons from '@/components/ShareButtons'
import BackToTop from '@/components/BackToTop'
import JournalUnavailable from '@/components/JournalUnavailable'

export const revalidate = 60

const SITE_URL = 'https://dhema.me'

interface PageProps {
    params: Promise<{ slug: string }>
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const result = await getPost(slug)

    if (!result.ok || !result.data) {
        return { title: 'Journal' }
    }

    const post = result.data
    const image = post.coverImage
        ? urlFor(post.coverImage).width(1200).height(630).url()
        : undefined

    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug.current}` },
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.excerpt,
            url: `${SITE_URL}/blog/${post.slug.current}`,
            publishedTime: post.publishedAt,
            tags: post.tags ?? [],
            images: image ? [{ url: image, width: 1200, height: 630, alt: post.title }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: image ? [image] : [],
        },
    }
}

interface CodeValue {
    code: string
}

interface DividerValue {
    style?: 'line' | 'dots' | 'space'
}

const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }: { value: PostImage }) => (
            <figure className="my-10">
                <div className="relative w-full aspect-[3/2] border border-foreground/15 overflow-hidden">
                    <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || 'Article illustration'}
                        fill
                        sizes="(min-width: 768px) 720px, 100vw"
                        className="object-cover"
                    />
                </div>
                {value.caption && (
                    <figcaption className="mono-label text-foreground/50 mt-3">
                        {value.caption}
                    </figcaption>
                )}
            </figure>
        ),
        code: ({ value }: { value: CodeValue }) => (
            <pre className="my-8 overflow-x-auto border border-foreground/15 bg-foreground/[0.03] p-5 text-sm leading-relaxed">
                <code>{value.code}</code>
            </pre>
        ),
        divider: ({ value }: { value: DividerValue }) => {
            if (value?.style === 'dots') {
                return (
                    <div className="my-10 text-center font-serif text-2xl text-foreground/40 tracking-[0.8em]">
                        •••
                    </div>
                )
            }
            if (value?.style === 'space') {
                return <div className="my-12" />
            }
            return <hr className="my-10 border-foreground/15" />
        },
    },
    marks: {
        link: ({ children, value }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vermillion underline underline-offset-4 decoration-vermillion/40 hover:decoration-vermillion"
            >
                {children}
            </a>
        ),
    },
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const result = await getPost(slug)

    if (!result.ok) {
        return (
            <div className="pt-32 md:pt-36 pb-20">
                <div className="section-container max-w-3xl">
                    <JournalUnavailable detail="This entry could not load." />
                </div>
            </div>
        )
    }

    const post = result.data
    if (!post) {
        notFound()
    }

    const related = await getRelatedPosts(post._id, post.tags ?? [])
    const relatedPosts: PostSummary[] = related.ok ? related.data : []

    return (
        <div className="pt-32 md:pt-36 pb-20">
            <div className="section-container">
                <article className="mx-auto max-w-3xl">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 mono-label text-foreground/55 hover:text-vermillion transition-colors mb-10"
                    >
                        <span aria-hidden className="transition-transform group-hover:-translate-x-1">
                            ←
                        </span>
                        All entries
                    </Link>

                    <header className="border-b border-foreground/15 pb-10 mb-10">
                        <div className="flex flex-wrap items-center gap-3 mono-label text-foreground/50 mb-5">
                            <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt)}
                            </time>
                            {post.readingTime && (
                                <>
                                    <span aria-hidden>·</span>
                                    <span>{post.readingTime}</span>
                                </>
                            )}
                        </div>

                        <h1 className="heading-1 text-balance mb-5">{post.title}</h1>

                        <p className="text-foreground/75 text-lg md:text-xl leading-relaxed text-pretty mb-6">
                            {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="tag-pill">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <ShareButtons
                                title={post.title}
                                url={`${SITE_URL}/blog/${post.slug.current}`}
                                compact
                            />
                        </div>
                    </header>

                    {post.coverImage && (
                        <div className="relative w-full aspect-[3/2] border border-foreground/15 overflow-hidden mb-12">
                            <Image
                                src={urlFor(post.coverImage).width(1200).height(800).url()}
                                alt={post.coverImage.alt || post.title}
                                fill
                                priority
                                sizes="(min-width: 768px) 768px, 100vw"
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none">
                        <PortableText value={post.body} components={portableTextComponents} />
                    </div>

                    <div className="mt-14 pt-8 border-t border-foreground/15">
                        <ShareButtons
                            title={post.title}
                            url={`${SITE_URL}/blog/${post.slug.current}`}
                        />
                    </div>
                </article>

                {relatedPosts.length > 0 && (
                    <section className="mt-20 pt-10 border-t border-foreground/15">
                        <div className="flex items-baseline justify-between gap-4 mb-8">
                            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
                                Keep reading
                            </h2>
                            <Link href="/blog" className="mono-label text-foreground/55 hover:text-vermillion">
                                All entries →
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost._id}
                                    href={`/blog/${relatedPost.slug.current}`}
                                    className="group flex flex-col border border-foreground/15 hover:border-foreground/40 transition-colors bg-surface h-full"
                                >
                                    {relatedPost.coverImage && (
                                        <div className="relative h-36 w-full overflow-hidden border-b border-foreground/10">
                                            <Image
                                                src={urlFor(relatedPost.coverImage)
                                                    .width(480)
                                                    .height(288)
                                                    .url()}
                                                alt={relatedPost.coverImage.alt || relatedPost.title}
                                                fill
                                                sizes="(min-width: 768px) 33vw, 100vw"
                                                className="object-cover img-mute"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="mono-label text-foreground/45 mb-2">
                                            {formatDate(relatedPost.publishedAt)}
                                        </div>
                                        <h3 className="font-serif text-xl leading-snug tracking-tight group-hover:text-vermillion transition-colors text-pretty">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-foreground/60 text-sm leading-relaxed mt-2 line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <BackToTop />
        </div>
    )
}
