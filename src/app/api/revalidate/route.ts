import { timingSafeEqual } from 'node:crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

/**
 * Sanity → Next.js revalidation webhook.
 *
 * Publishing or unpublishing a post in the Studio calls this route so the
 * journal updates on the next request instead of waiting for the 60 s ISR
 * window. The route fails closed: without SANITY_REVALIDATE_SECRET it returns
 * 503 rather than acting as an open cache-buster.
 *
 * Sanity setup (sanity.io/manage → API → Webhooks):
 *   URL     https://<site>/api/revalidate
 *   Trigger Create, Update, Delete
 *   Filter  _type == "post"
 *   Header  x-sanity-webhook-secret: <the same secret>
 */

const POSTS_TAG = 'posts'

function secretsMatch(received: string, expected: string): boolean {
    const a = Buffer.from(received)
    const b = Buffer.from(expected)
    return a.length === b.length && timingSafeEqual(a, b)
}

function readSecret(request: NextRequest): string | null {
    const header = request.headers.get('x-sanity-webhook-secret')
    if (header) return header

    const authorization = request.headers.get('authorization')
    if (authorization?.startsWith('Bearer ')) {
        return authorization.slice('Bearer '.length).trim()
    }

    return request.nextUrl.searchParams.get('secret')
}

export async function POST(request: NextRequest) {
    const expected = process.env.SANITY_REVALIDATE_SECRET
    if (!expected) {
        console.error(
            '[revalidate] SANITY_REVALIDATE_SECRET is not set — rejecting webhook'
        )
        return Response.json(
            { revalidated: false, error: 'not configured' },
            { status: 503 }
        )
    }

    const received = readSecret(request)
    if (!received || !secretsMatch(received, expected)) {
        return Response.json(
            { revalidated: false, error: 'invalid secret' },
            { status: 401 }
        )
    }

    let payload: { _id?: string; _type?: string; slug?: { current?: string } } = {}
    try {
        payload = await request.json()
    } catch {
        // An empty body is still a valid "something changed" signal.
    }

    // Draft documents never reach the public query, so there is nothing cached
    // to purge. Answer 200 so Sanity does not retry the delivery.
    if (payload._id?.startsWith('drafts.')) {
        return Response.json({ revalidated: false, reason: 'draft' })
    }

    const slug = payload.slug?.current
    const paths = [
        '/blog',
        '/sitemap.xml',
        ...(slug ? [`/blog/${slug}`] : []),
    ]

    revalidateTag(POSTS_TAG)
    for (const path of paths) revalidatePath(path)

    console.log(
        `[revalidate] ${payload._type ?? 'unknown document'} → ${paths.join(', ')}`
    )

    return Response.json({
        revalidated: true,
        tag: POSTS_TAG,
        paths,
        now: Date.now(),
    })
}
