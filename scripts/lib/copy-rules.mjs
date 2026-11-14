/**
 * Copy rules shared by the source guard (`check-ui-slop.mjs`) and the CMS
 * guard (`check-content.mjs`), so the two can never drift apart.
 *
 * Patterns use the `g` flag; callers must reset `lastIndex` before each test.
 */

export const CTA_RULE = {
    id: 'cta-copy',
    pattern: /\b(?:Get Started|Learn More|Sign Up Free|Book a Demo)\b/g,
    message: 'Generic CTA. Name the action (for example "See the case study").',
}

export const FILLER_RULE = {
    id: 'filler-copy',
    pattern:
        /\b(?:supercharge|seamless(?:ly)?|game-chang(?:er|ing)|cutting-edge|revolutioni[sz]e|elevate your|unlock the|transform your|delve|tapestry|boasts)\b/gi,
    message: 'Marketing filler. Say what the thing does with a checkable claim.',
}

export const EM_DASH_RULE = {
    id: 'em-dash',
    pattern: /—/g,
    message: 'Em dash in prose. Use a period, a comma, or a spaced hyphen.',
}
