/**
 * Canonical content shapes shared by the static fallback in `src/data/` and the
 * Sanity-backed loader in `src/content/`. Both sides map to these types, so
 * components never depend on where the content came from.
 */

export type CaseStudyVisual = 'c4' | 'flow' | 'dashboard' | 'state-machine'

export interface CaseStudy {
    id: string
    slug: string
    title: string
    company: string
    industry: string
    period: string
    summary: string
    challenge: string
    process: string[]
    solution: string
    tradeOffs?: string
    technicalHurdles?: string
    retrospective?: string
    visual?: CaseStudyVisual
    outcomes: {
        metric: string
        description: string
    }[]
    tags: string[]
    featured: boolean
    /** Display order. Lower renders first; drives `/work`, home and related. */
    order: number
    articleUrl?: string
    publishDate: string // YYYY-MM-DD
}

export interface Experience {
    id: string
    company: string
    logo?: string
    role: string
    period: string
    type: string
    description: string
    highlights: string[]
    industries: string[]
}

export interface Certification {
    id: string
    name: string
    issuer: string
    issuedDate: string
    credentialUrl: string
}

export interface SkillGroup {
    title: string
    items: string[]
}

/** A practice area, used by the domain archive on About and Work. */
export interface DomainGroup {
    title: string
    items: string[]
}

export interface ImpactMetric {
    value: string
    label: string
    description: string
    /** Optional external link, e.g. an independent project the metric refers to. */
    href?: string
}

export interface OperatingStance {
    title: string
    stance: string
    /** Two checkable proofs, each tied to a named piece of work. */
    examples: string[]
}

export interface Principle {
    title: string
    text: string
}
