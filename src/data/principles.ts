import type { Principle } from './types'

/**
 * Operating principles shown on /about. Moved here from the page so the
 * migration script and the Sanity-backed loader share one source.
 */
export const principles: Principle[] = [
    {
        title: 'Outcome-driven',
        text:
            'I measure success by impact, not output. Every shipped feature should move a metric that matters to the business and the user.',
    },
    {
        title: 'Cross-functional',
        text:
            'The best products emerge from aligned teams. I bridge engineering, design, data and business toward a single, shared outcome.',
    },
    {
        title: 'Evidence-led',
        text:
            'Research, data and direct user contact guide decisions. Assumption is the enemy of good product judgement.',
    },
]
