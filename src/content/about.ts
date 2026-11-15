import {
    certifications as fallbackCertifications,
    experiences as fallbackExperiences,
    impactMetrics as fallbackMetrics,
} from '@/data/profile'
import { operatingStances as fallbackStances } from '@/data/operating'
import type {
    Certification,
    Experience,
    ImpactMetric,
    OperatingStance,
} from '@/data/types'
import {
    fetchCertifications,
    fetchExperiences,
    fetchImpactMetrics,
    fetchOperatingStances,
} from '@/sanity/content'

/**
 * Server-only loaders for the About collections.
 *
 * Sanity wins when reachable (including an empty result). On failure these fall
 * back to the frozen static data so the site never renders a broken section.
 */

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

export const getImpactMetrics = () =>
    load<ImpactMetric>('impact metrics', fetchImpactMetrics, fallbackMetrics)

export const getOperatingStances = () =>
    load<OperatingStance>('operating stances', fetchOperatingStances, fallbackStances)
