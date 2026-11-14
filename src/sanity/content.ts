import { client } from './client'
import type { FetchResult } from './types'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type {
    CaseStudy,
    CaseStudyVisual,
    Certification,
    Experience,
    ImpactMetric,
    OperatingStance,
    Principle,
    SkillGroup,
} from '@/data/types'
import { urlFor } from './image'

/** Cache tags purged by /api/revalidate on publish. */
export const WORK_TAG = 'work'
export const ABOUT_TAG = 'about'

const cache = (tag: string) => ({ next: { tags: [tag] } })

const CASE_STUDY_FIELDS = `
    "id": _id,
    "slug": slug.current,
    title,
    company,
    industry,
    period,
    summary,
    challenge,
    process,
    solution,
    tradeOffs,
    technicalHurdles,
    retrospective,
    visual,
    outcomes[]{ metric, description },
    tags,
    featured,
    order,
    publishDate,
    articleUrl
`

const CASE_STUDIES_QUERY = `*[
    _type == "caseStudy" &&
    !(_id in path("drafts.**"))
] | order(order asc, publishDate desc) {
    ${CASE_STUDY_FIELDS}
}`

const CASE_STUDY_QUERY = `*[
    _type == "caseStudy" &&
    slug.current == $slug &&
    !(_id in path("drafts.**"))
][0] {
    ${CASE_STUDY_FIELDS}
}`

/** Raw document shape as projected above; fields may be null in Sanity. */
interface CaseStudyDoc {
    id: string
    slug: string | null
    title: string
    company: string
    industry: string
    period: string
    summary: string
    challenge: string
    process: string[] | null
    solution: string
    tradeOffs: string | null
    technicalHurdles: string | null
    retrospective: string | null
    visual: CaseStudyVisual | null
    outcomes: { metric: string; description: string | null }[] | null
    tags: string[] | null
    featured: boolean | null
    order: number | null
    publishDate: string
    articleUrl: string | null
}

function toCaseStudy(doc: CaseStudyDoc): CaseStudy {
    return {
        id: doc.id,
        slug: doc.slug ?? doc.id,
        title: doc.title,
        company: doc.company,
        industry: doc.industry,
        period: doc.period,
        summary: doc.summary,
        challenge: doc.challenge,
        process: doc.process ?? [],
        solution: doc.solution,
        tradeOffs: doc.tradeOffs ?? undefined,
        technicalHurdles: doc.technicalHurdles ?? undefined,
        retrospective: doc.retrospective ?? undefined,
        visual: doc.visual ?? undefined,
        outcomes: (doc.outcomes ?? []).map((outcome) => ({
            metric: outcome.metric,
            description: outcome.description ?? '',
        })),
        tags: doc.tags ?? [],
        featured: doc.featured ?? false,
        order: doc.order ?? 0,
        publishDate: doc.publishDate,
        articleUrl: doc.articleUrl ?? undefined,
    }
}

function reportFailure(operation: string, error: unknown) {
    console.error(
        `[sanity] ${operation} failed: ${error instanceof Error ? error.message : String(error)}`
    )
}

/** Every published case study, in display order. */
export async function fetchCaseStudies(): Promise<FetchResult<CaseStudy[]>> {
    try {
        const docs = await client.fetch<CaseStudyDoc[]>(
            CASE_STUDIES_QUERY,
            {},
            cache(WORK_TAG)
        )
        return { ok: true, data: docs.map(toCaseStudy) }
    } catch (error) {
        reportFailure('fetchCaseStudies', error)
        return { ok: false }
    }
}

/** A single case study. `data: null` means the slug does not exist. */
export async function fetchCaseStudyBySlug(
    slug: string
): Promise<FetchResult<CaseStudy | null>> {
    try {
        const doc = await client.fetch<CaseStudyDoc | null>(
            CASE_STUDY_QUERY,
            { slug },
            cache(WORK_TAG)
        )
        return { ok: true, data: doc ? toCaseStudy(doc) : null }
    } catch (error) {
        reportFailure('fetchCaseStudyBySlug', error)
        return { ok: false }
    }
}

const ABOUT_QUERIES = {
    experiences: `*[_type == "experience" && !(_id in path("drafts.**"))] | order(order asc) {
        "id": _id, company, logo, role, period, type, description, highlights, industries
    }`,
    certifications: `*[_type == "certification" && !(_id in path("drafts.**"))] | order(order asc) {
        "id": _id, name, issuer, issuedDate, credentialUrl
    }`,
    skillGroups: `*[_type == "skillGroup" && !(_id in path("drafts.**"))] | order(order asc) {
        title, items
    }`,
    impactMetrics: `*[_type == "impactMetric" && !(_id in path("drafts.**"))] | order(order asc) {
        value, label, description
    }`,
    operatingStances: `*[_type == "operatingStance" && !(_id in path("drafts.**"))] | order(order asc) {
        title, stance, example
    }`,
    principles: `*[_type == "principle" && !(_id in path("drafts.**"))] | order(order asc) {
        title, text
    }`,
}

async function fetchAboutCollection<T>(
    operation: string,
    query: string
): Promise<FetchResult<T[]>> {
    try {
        const data = await client.fetch<T[]>(query, {}, cache(ABOUT_TAG))
        return { ok: true, data }
    } catch (error) {
        reportFailure(operation, error)
        return { ok: false }
    }
}

export async function fetchExperiences(): Promise<FetchResult<Experience[]>> {
    try {
        const docs = await client.fetch<
            (Omit<Experience, 'logo'> & { logo: SanityImageSource | null })[]
        >(ABOUT_QUERIES.experiences, {}, cache(ABOUT_TAG))

        return {
            ok: true,
            data: docs.map(({ logo, ...rest }) => ({
                ...rest,
                logo: logo ? urlFor(logo).width(72).height(72).url() : undefined,
            })),
        }
    } catch (error) {
        reportFailure('fetchExperiences', error)
        return { ok: false }
    }
}

export const fetchCertifications = () =>
    fetchAboutCollection<Certification>('fetchCertifications', ABOUT_QUERIES.certifications)

export const fetchSkillGroups = () =>
    fetchAboutCollection<SkillGroup>('fetchSkillGroups', ABOUT_QUERIES.skillGroups)

export const fetchImpactMetrics = () =>
    fetchAboutCollection<ImpactMetric>('fetchImpactMetrics', ABOUT_QUERIES.impactMetrics)

export const fetchOperatingStances = () =>
    fetchAboutCollection<OperatingStance>(
        'fetchOperatingStances',
        ABOUT_QUERIES.operatingStances
    )

export const fetchPrinciples = () =>
    fetchAboutCollection<Principle>('fetchPrinciples', ABOUT_QUERIES.principles)
