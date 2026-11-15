import type { OperatingStance } from './types'

export type { OperatingStance } from './types'

/**
 * "How I operate" replaces the old toolkit pill grid. Three transferable
 * stances, each backed by two pieces of named work; keep claims checkable and
 * specific rather than aspirational.
 */
export const operatingStances: OperatingStance[] = [
    {
        title: 'Systems architecture and dependency framing',
        stance:
            'Software fails when boundary lines are blurry. I clarify data dependencies, state transitions, and integration contracts before engineering builds, so the expensive decisions are settled while they are still cheap to change.',
        examples: [
            'Led the technical assessment and C4 architectural modeling for HM Sampoerna, establishing pre-decoupling boundaries between the AYO backoffice, the My Hero backoffice, and the shared field iPad app.',
            'Architected multi-provider payout routing and a weighted balancer that traded partner rate limits against float depletion.',
        ],
    },
    {
        title: 'Operational backbone and risk governance',
        stance:
            'Consumer applications only work when back-office operations and risk controls are watertight. I build internal tooling that cuts manual triage and stops financial or compliance leakage before it reaches a ledger.',
        examples: [
            'Designed automated liquidity circuit breakers that removed the 15 to 30 minute manual triage delay when an upstream bank ran out of float.',
            'Instituted dual-control maker-checker authorization for high-value manual adjustments and dispute handling, with an immutable audit trail on every action.',
        ],
    },
    {
        title: 'Pragmatic zero to one under constraint',
        stance:
            'Discovery under constraint means testing hypotheses quickly and keeping unit economics honest, balancing user friction against real operational cost. A smaller shipped scope beats an elegant plan that misses the regulatory or budget window.',
        examples: [
            'Scaled remittance corridors and rebuilt the KYC verification funnel at Transfez, growing verified users by 55% while holding the compliance line.',
            'Shipped conversational AI for talent mobility and predictive sales analytics inside public-sector and enterprise consulting timelines.',
        ],
    },
]
