import { client } from './client'
import type { FetchResult, PostDetail, PostSummary } from './types'

const SUMMARY_FIELDS = `
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    tags,
    readingTime
`

const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    ${SUMMARY_FIELDS}
}`

const POST_QUERY = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${SUMMARY_FIELDS},
    body
}`

const RELATED_QUERY = `*[
    _type == "post" &&
    _id != $currentPostId &&
    !(_id in path("drafts.**")) &&
    count((tags[])[@ in $tags]) > 0
] | order(publishedAt desc)[0...3] {
    ${SUMMARY_FIELDS}
}`

const RECENT_QUERY = `*[
    _type == "post" &&
    _id != $currentPostId &&
    !(_id in path("drafts.**"))
] | order(publishedAt desc)[0...3] {
    ${SUMMARY_FIELDS}
}`

function reportFailure(operation: string, error: unknown) {
    console.error(
        `[sanity] ${operation} failed: ${error instanceof Error ? error.message : String(error)}`
    )
}

/** All published posts, newest first. */
export async function getPosts(): Promise<FetchResult<PostSummary[]>> {
    try {
        const posts = await client.fetch<PostSummary[]>(POSTS_QUERY)
        return { ok: true, data: posts }
    } catch (error) {
        reportFailure('getPosts', error)
        return { ok: false }
    }
}

/** A single post by slug. `data: null` means the slug does not exist. */
export async function getPost(
    slug: string
): Promise<FetchResult<PostDetail | null>> {
    try {
        const post = await client.fetch<PostDetail | null>(POST_QUERY, { slug })
        return { ok: true, data: post }
    } catch (error) {
        reportFailure('getPost', error)
        return { ok: false }
    }
}

/** Up to three posts sharing a tag, falling back to the most recent posts. */
export async function getRelatedPosts(
    currentPostId: string,
    tags: string[]
): Promise<FetchResult<PostSummary[]>> {
    try {
        let posts = await client.fetch<PostSummary[]>(RELATED_QUERY, {
            currentPostId,
            tags,
        })
        if (posts.length === 0) {
            posts = await client.fetch<PostSummary[]>(RECENT_QUERY, {
                currentPostId,
            })
        }
        return { ok: true, data: posts }
    } catch (error) {
        reportFailure('getRelatedPosts', error)
        return { ok: false }
    }
}
