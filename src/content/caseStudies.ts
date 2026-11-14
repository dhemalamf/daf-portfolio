import { caseStudies as fallbackCaseStudies } from '@/data/caseStudies'
import type { CaseStudy } from '@/data/types'
import { fetchCaseStudies, fetchCaseStudyBySlug } from '@/sanity/content'

/**
 * Server-only content layer.
 *
 * Sanity is authoritative when reachable, including an intentionally empty
 * result. The static files in `src/data/` are a frozen fallback used only when
 * the read fails, so a CMS outage never blanks the site.
 */

export type CaseStudyLookup =
    | { status: 'ok'; caseStudy: CaseStudy }
    | { status: 'not-found' }
    | { status: 'unavailable' }

export async function getCaseStudies(): Promise<CaseStudy[]> {
    const result = await fetchCaseStudies()
    if (result.ok) return result.data

    console.error('[content] case studies unavailable, serving static fallback')
    return [...fallbackCaseStudies].sort((a, b) => a.order - b.order)
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyLookup> {
    const result = await fetchCaseStudyBySlug(slug)

    if (!result.ok) {
        console.error('[content] case study unavailable, serving static fallback')
        const match = fallbackCaseStudies.find((study) => study.slug === slug)
        return match ? { status: 'ok', caseStudy: match } : { status: 'unavailable' }
    }

    return result.data
        ? { status: 'ok', caseStudy: result.data }
        : { status: 'not-found' }
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
    const studies = await getCaseStudies()
    return studies.filter((study) => study.featured).sort((a, b) => a.order - b.order)
}
