import type { Metadata } from 'next'
import BlogList from '@/components/BlogList'
import FadeIn from '@/components/animations/FadeIn'
import JournalUnavailable from '@/components/JournalUnavailable'
import { getPosts } from '@/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
    title: 'Journal',
    description:
        'Essays on product management, AI, and building products that matter.',
    alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
    const result = await getPosts()

    if (!result.ok) {
        return (
            <div className="pt-32 md:pt-40 pb-20">
                <div className="section-container max-w-3xl">
                    <JournalUnavailable detail="The journal could not load." />
                </div>
            </div>
        )
    }

    const posts = result.data
    const allTags = Array.from(
        new Set(posts.flatMap((post) => post.tags ?? []))
    ).sort()

    return (
        <div className="pt-32 md:pt-40 pb-20">
            <div className="section-container">
                <header className="border-b border-foreground/15 pb-10 mb-12">
                    <FadeIn>
                        <div className="mono-label text-foreground/50 mb-6">
                            <span className="text-vermillion">●</span> 03 — Journal
                        </div>
                        <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
                            <div className="col-span-12 lg:col-span-8">
                                <h1 className="h-display text-balance">
                                    Field notes on{' '}
                                    <span className="ital text-vermillion">product</span>.
                                </h1>
                            </div>
                            <div className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l lg:border-foreground/15">
                                <p className="text-foreground/75 text-base md:text-lg leading-relaxed text-pretty">
                                    Essays on product management, AI, and building things
                                    that matter — written between shipping.
                                </p>
                                <p className="mono-label text-foreground/45 mt-4">
                                    {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </header>

                {posts.length > 0 ? (
                    <BlogList posts={posts} allTags={allTags} />
                ) : (
                    <div className="border border-foreground/15 p-8 md:p-12">
                        <div className="mono-label text-vermillion mb-3">Empty</div>
                        <h2 className="font-serif text-3xl tracking-tight mb-2">
                            Nothing published yet.
                        </h2>
                        <p className="text-foreground/70">
                            The first entry is being written. Case studies are available in
                            the meantime.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
