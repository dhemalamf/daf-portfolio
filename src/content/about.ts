import {
    certifications as fallbackCertifications,
    experiences as fallbackExperiences,
    impactMetrics as fallbackMetrics,
    skills,
} from '@/data/profile'
import { operatingStances as fallbackStances } from '@/data/operating'
import { principles as fallbackPrinciples } from '@/data/principles'
import type {
    Certification,
    Experience,
    ImpactMetric,
    OperatingStance,
    Principle,
    SkillGroup,
} from '@/data/types'
import {
    fetchCertifications,
    fetchExperiences,
    fetchImpactMetrics,
    fetchOperatingStances,
    fetchPrinciples,
    fetchSkillGroups,
} from '@/sanity/content'

/**
 * Server-only loaders for the About collections.
 *
 * Sanity wins when reachable (including an empty result). On failure these fall
 * back to the frozen static data so the site never renders a broken section.
 */

const fallbackSkillGroups: SkillGroup[] = [
    { title: 'Product management', items: skills.productManagement },
    { title: 'Technical', items: skills.technical },
    { title: 'Domain expertise', items: skills.domains },
    { title: 'Tools & platforms', items: skills.tools },
]

async function load<T>(
    operation: string,
    fetcher: () => Promise<{ ok: true; data: T[] } | { ok: false }>,
    fallback: T[]
): Promise<T[]> {
    const result = await fetcher()
    if (result.ok) return result.data

    console.error(`[content] ${operation} unavailable, serving static fallback`)
    return fallback
}

export const getExperiences = () =>
    load<Experience>('experiences', fetchExperiences, fallbackExperiences)

export const getCertifications = () =>
    load<Certification>('certifications', fetchCertifications, fallbackCertifications)

export const getSkillGroups = () =>
    load<SkillGroup>('skill groups', fetchSkillGroups, fallbackSkillGroups)

export const getImpactMetrics = () =>
    load<ImpactMetric>('impact metrics', fetchImpactMetrics, fallbackMetrics)

export const getOperatingStances = () =>
    load<OperatingStance>('operating stances', fetchOperatingStances, fallbackStances)

export const getPrinciples = () =>
    load<Principle>('principles', fetchPrinciples, fallbackPrinciples)
