import type { OperatingStance } from './types'

export type { OperatingStance } from './types'

/**
 * "How I operate" replaces the old toolkit pill grid. Drafted from the
 * experience data in profile.ts; keep claims checkable and specific.
 */
export const operatingStances: OperatingStance[] = [
    {
        title: 'Specs that survive engineering review',
        stance:
            'I write specs as decision records, not feature lists: current behavior, constraints, state transitions, failure modes, explicit non-goals, and acceptance criteria. Engineering should be able to build from the document without a follow-up meeting.',
        example:
            'For the Doitpay core disbursement engine, I mapped fund-transfer states, reconciliation hooks, and back-office exceptions before the first build ticket.',
    },
    {
        title: 'Due diligence before commitment',
        stance:
            'I treat technical due diligence as product risk work: read the architecture, trace the data, test the failure path, and price the maintenance. If a system cannot explain its failure modes, that is a scope risk, not an engineering detail.',
        example:
            'On the HM Sampoerna decoupling, I used C4 models to separate real business coupling from accidental coupling before recommending a path.',
    },
    {
        title: 'Compliance as a design input',
        stance:
            'KYC, AML, and reconciliation are product requirements, not launch blockers. I bring them into the flow early so the happy path and the review path are designed together, and so growth experiments do not create new compliance debt.',
        example:
            'At Transfez, the verification-flow revamp kept compliance-critical steps while removing friction elsewhere, supporting a 55% increase in verified users.',
    },
]
