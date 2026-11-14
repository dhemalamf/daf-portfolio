import { timingSafeEqual } from 'node:crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

/**
 * Sanity → Next.js revalidation webhook.
 *
 * Publishing or unpublishing in the Studio calls this route so the affected
 * pages update on the next request instead of waiting for the ISR window. The
 * route fails closed: without SANITY_REVALIDATE_SECRET it returns 503 rather
 * than acting as an open cache-buster.
 *
 * Sanity setup (sanity.io/manage → API → Webhooks):
 *   URL     https://<site>/api/revalidate
 *   Trigger Create, Update, Delete
 *   Filter  _type in ["post","caseStudy","experience","certification",
 *                     "skillGroup","impactMetric","operatingStance","principle"]
 *   Header  x-sanity-webhook-secret: <the same secret>
 *
 * A body with no `_type` is treated as a journal change, so the original
 * post-only webhook keeps working.
 */

const POSTS_TAG = 'posts'
const WORK_TAG = 'work'
const ABOUT_TAG = 'about'

const WORK_TYPES = new Set(['caseStudy'])
const ABOUT_TYPES = new Set([
    'experience',
    'certification',
    'skillGroup',
    'impactMetric',
    'operatingStance',
    'principle',
])

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

    const type = payload._type
    const slug = payload.slug?.current

    let tag: string
    let paths: string[]

    if (!type || type === 'post') {
        tag = POSTS_TAG
        paths = ['/blog', '/sitemap.xml', ...(slug ? [`/blog/${slug}`] : [])]
    } else if (WORK_TYPES.has(type)) {
        tag = WORK_TAG
        paths = [
            '/',
            '/work',
            '/sitemap.xml',
            ...(slug ? [`/work/${slug}`] : []),
        ]
    } else if (ABOUT_TYPES.has(type)) {
        tag = ABOUT_TAG
        paths = ['/', '/about']
    } else {
        return Response.json(
            { revalidated: false, reason: `unhandled type: ${type}` },
            { status: 200 }
        )
    }

    revalidateTag(tag)
    for (const path of paths) revalidatePath(path)

    console.log(`[revalidate] ${type ?? 'unknown document'} → ${paths.join(', ')}`)

    return Response.json({
        revalidated: true,
        tag,
        paths,
        now: Date.now(),
    })
}
