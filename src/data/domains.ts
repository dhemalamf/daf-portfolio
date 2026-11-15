import type { DomainGroup } from './types'

/**
 * Domain Specialization Archive, rendered on /about and /work.
 *
 * This is where depth lives: four practice areas, each a list of things the
 * reader can check against the case studies rather than a tag cloud.
 */
export const domainGroups: DomainGroup[] = [
    {
        title: 'Financial technology and payments',
        items: [
            'Core payout disbursement engines and failover automation',
            'Cross-border consumer remittance and corridor expansion',
            'KYC verification, compliance checks, and regulatory reporting',
            'Maker-checker financial authorization and reconciliation',
        ],
    },
    {
        title: 'Enterprise architecture and consulting',
        items: [
            'Technical due diligence and C4 architectural modeling',
            'Legacy system decoupling and modularization',
            'Multi-stakeholder alignment between enterprise clients and technical vendors',
            'White-label platform modularization for ecosystem partners',
        ],
    },
    {
        title: 'Applied AI and data products',
        items: [
            'Conversational analytics over structured relational data',
            'Learning systems with automated assessment workflows',
            'Talent matching with explainable, bidirectional qualification logic',
            'Pragmatic evaluation of model output against deterministic business rules',
        ],
    },
    {
        title: 'EdTech and learning systems',
        items: [
            'Learning management systems at 165,000+ active learners',
            'Progressive web app delivery for emerging-market connectivity',
            'Content delivery workflows and learner progression analytics',
            'Role-based access for administrators, teachers, and students',
        ],
    },
]
