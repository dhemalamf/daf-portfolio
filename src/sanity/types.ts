import type { PortableTextBlock } from '@portabletext/react'
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'

/** Image object as returned by the blog queries (asset + optional metadata). */
export type PostImage = SanityImageObject & {
    _type?: 'image'
    alt?: string
    caption?: string
}

/** Fields needed to render a post card or list row. */
export interface PostSummary {
    _id: string
    title: string
    slug: { current: string }
    publishedAt: string
    excerpt: string
    coverImage?: PostImage | null
    tags?: string[] | null
    readingTime?: string | null
}

/** Full post, including the Portable Text body. */
export interface PostDetail extends PostSummary {
    body: PortableTextBlock[]
}

/** Result of a CMS read: `ok: false` means Sanity was unreachable, not empty. */
export type FetchResult<T> = { ok: true; data: T } | { ok: false }
