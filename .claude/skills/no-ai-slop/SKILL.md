---
name: no-ai-slop
description: Use before building, generating, or reviewing ANY UI in this repository (page, section, component, card, CTA, form, nav, empty state, or style). Enforces the dhema.me technical-modernist direction: Geist Sans headings and body, JetBrains Mono only for metadata and metrics, cobalt accents only on interactive elements, neutral text, no serif, no marquees, no decorative numbering, no word-level heading accents, no client-side count-ups, and no filler graphics. Full rules and current state: SKILL.md and docs/dhema-me-unslop-guide.md.
---

# No AI Slop: the dhema.me UI contract

Vendored from [claudiusararu/unslop-ui-skill](https://github.com/claudiusararu/unslop-ui-skill),
then rewritten around this project's spec:
[`docs/dhema-me-unslop-guide.md`](../../../docs/dhema-me-unslop-guide.md).

**Authority order.** When sources disagree, earlier wins:

1. The **Strict Design Constraints** in `CLAUDE.md` and the spec §2.
2. The hard rules in this file.
3. `TELLS.md`, the upstream catalog (reference, not law).

The live site is the reference implementation now. If a future change
contradicts this file, the change is wrong.

## The hard rules

### 1. Colour: cobalt on interaction, neutrals everywhere else

- Accent: `#1D4ED8` in light mode, `#3B82F6` in dark mode. It is the only
  saturated colour.
- Use it **only** on interactive elements: primary CTA, active navigation/tab,
  inline link, focus ring. Never on a label, company name, metric, bullet, or a
  word inside a heading.
- Text: `#18181B` light, `#F4F4F5` dark. Surfaces: `#FFFFFF`/`#FAFAFA` light,
  `#09090B`/`#111315` dark.
- Vermillion/orange is gone. Do not reintroduce `#FF3E00`, amber, or any warm
  accent.
- No violet/indigo/purple, no gradient text, no gradient surfaces, no
  glassmorphism, no coloured shadows.

### 2. No marquees or moving tickers

Infinite text carousels are forbidden. The homepage ribbon and `Marquee`
component were removed. Use static content or whitespace.

### 3. No word-level italics or accent colours in headings

Headings use one family, one weight system, and one colour. Do not italicise or
colour a single word ("Case studies, _deeply_ told"). Emphasis comes from the
sentence and the layout. `.ital` is deleted.

### 4. No decorative numbering

No `00`, `01`, `02`, `.01` prefixes on navigation, section headers, cards, or
labels. Numbers are allowed only for a real sequence: process steps, ordered
outcomes, years. `numeral` props are removed.

### 5. No faux-magazine metadata

No "Vol. 04 — Edition 2026", ping badges, or abstract tags that carry no
information. A label states a fact the reader can use ("Open to new work",
"2025"), not a magazine simulation.

### 6. Metrics are static in server HTML

High-impact numbers must be in the initial SSR HTML. No count-up, no `0`
initial state, no hydration flash. `AnimatedCounter` is deleted.

### 7. No abstract filler graphics

No dot matrices, grain overlays, decorative grid lines, mesh blobs, or gradient
orbs. Case-study visuals are neutral wireframe placeholders until real
sanitized screenshots or diagrams replace them.

### 8. Typography: Geist Sans, no serif

- Headings: Geist Sans, weight 600, tracking `-0.025em`, uniform colour.
- Body: Geist Sans, line-height 1.6-1.7.
- Mono: JetBrains Mono, restricted to timestamps, tags, metrics, and code.
- Instrument Serif is removed. Do not add a serif fallback, a display serif, or
  an italic accent word.

## Current state

Phase 1 is executed. Phase 2 is drafted and awaiting the owner's fact-check.
Phase 3 is partly executed.

| Item | State |
|---|---|
| Marquee, ping badges, grain, dot/grid textures, Vol./Edition | removed |
| Count-ups / 0 flash | removed; metrics are static SSR |
| Word-level italics and coloured heading words | removed |
| Decorative section/nav numbering | removed |
| Instrument Serif / Geist pairing | replaced with Geist Sans throughout |
| Vermillion palette | replaced with cobalt + neutrals |
| Case-study trade-offs, technical complexity, retrospective | drafted in `src/data/caseStudies.ts` for 4 flagship studies; needs fact-check |
| "How I Operate" | drafted in `src/data/operating.ts`; needs fact-check |
| Case-study visuals | neutral wireframe placeholders; replace with sanitized assets |
| Journal essays ("Notes on Product") | not written yet; needs the owner's material |
| Footer "Set in ..." credit | removed |

Do not "improve" a draft claim by inventing a number. If a fact is uncertain,
leave it out or ask.

## Layer 1: universal anti-tells

### Type

- No gradient-clipped text.
- Real weight hierarchy. Do not let 600 be the heaviest thing on the page while
  everything else is also 600.
- No manual `<br>` in headings, no `text-balance` on everything, no four-line
  or orphan-word headlines.
- Left-aligned body runs to the container's content width; only centred text
  gets a max-width measure.
- `tabular-nums` for prices, metrics, and tables. No negative tracking on body.

### Colour

- One accent, used sparingly, with a ramp. No raw status colours.
- Body text meets WCAG AA. Never `gray-400/500` as body.
- No aurora, mesh, blob, spotlight, dotted-grid, or cream/sage "calm" palettes.
- Don't default dark-only; both themes must hold up.

### Layout

- No stock centred hero (eyebrow / H1 / subhead / two equal buttons /
  screenshot).
- Break the all-three-equal-columns reflex. Vary alignment and weight.
- No icon-card "feature soup" grid; use real content.
- No cards nested in cards. One surface level per idea.
- No fat four-column footer or hero-mirroring CTA band unless earned.

### Components

- One radius and one elevation rule: 2px and hairline borders.
- No shadcn-default card (`rounded-xl border shadow-sm`), no side stripe, no
  soft-SaaS shadow on every surface.
- No hero pill badge, no "Get Started / Learn More" duo, no gradient buttons.
- No `scale-105` "Most Popular" tier, count-up stats, or green-check/red-X
  comparison circles.

### Imagery and icons

- Real artifacts first: screenshots, flows, architecture diagrams. Then
  photography.
- No 3D blobs, mesh art, duotone, or tilted-browser mockups.
- Icons from an established set, used sparingly at text size. No emoji or `✦`
  as icons. No sparkle-means-AI.
- No invented proof: no fake logos, testimonials, metrics, or charts.

### Copy

- No filler: elevate, unlock, supercharge, seamless, transform, revolutionize,
  game-changing, "Not just X, it's Y".
- No em-dash chains in prose.
- Name the action in CTA labels, not "Get Started".
- Specific, checkable claims with real numbers. Read `src/data/profile.ts` and
  `src/data/caseStudies.ts` before writing copy.
- No artificial rule-of-three lists.

### Motion

- No fade-up-on-everything, no marquee/parallax/count-up reflex, no uniform
  `hover:scale-105`.
- At most one intentional reveal per view. Respect `prefers-reduced-motion`.

### Consistency

- Every instance of a component looks and behaves identically.
- Define a style once as a token or component class; never re-type utility
  strings per instance.
- Spacing, radius, colour, and type come from `tailwind.config.ts` and
  `src/app/globals.css`.

### Responsive

- Works at 375px with no horizontal overflow. Reflow grids to 1-2 columns, keep
  tap targets at least 44px.
- If desktop nav links are hidden, the hamburger and a working panel must ship.
  `src/components/Navigation.tsx` is the reference.
- Test at mobile width before claiming done.

## Layer 2: this repo's direction

Source of truth for values: `src/app/globals.css` and
`design_guidelines.json`. Do not restate values in components; use tokens.

- **Type:** Geist Sans everywhere. Headings 600 at `-0.025em`; body 400 with
  relaxed leading. JetBrains Mono for metrics, dates, tags, and code only.
- **Colour:** neutral surfaces, near-black/off-white text, cobalt only on
  interaction. 2px radius, hairline borders, no shadows.
- **Layout:** 12-column, asymmetric, generous vertical rhythm, strong left
  edge. Hairline rules carry structure. Numbering does not.
- **Imagery:** diagram/screenshot slots in hairline frames. Neutral wireframe
  placeholders are acceptable only until real assets arrive.
- **Motion:** `LazyMotion` + `m`, `domAnimation` only, one subtle reveal.
- **Detail:** tabular numerals for metrics, visible focus ring, cobalt
  selection.

## Repo gates

- Tokens, not raw hex: `bg-background`, `text-foreground/70`, `border-border`,
  `text-cobalt`, `.mono-label`, `.metric`, `.btn-ink`, `.section-container`.
- Server Components by default; `'use client'` only for state, effects, browser
  APIs, or animation.
- Content lives in `src/data/` or Sanity, not inline in JSX except page chrome.
- Never reintroduce `motion` from framer-motion, `layout`/drag props,
  `gradient-text`, `glass-card`, `rounded-xl`, violet/orange accents,
  `shadow-*`, serif fonts, marquees, count-ups, grain, or decorative textures.
- Any new animation respects `prefers-reduced-motion`.

## Self-check (fix any "yes")

- Any serif font, Instrument Serif, `font-serif`, or `.ital`?
- A word italicised or accent-coloured inside a heading?
- Vermillion/orange, violet/indigo/purple, or a warm accent anywhere?
- Cobalt on a non-interactive label, metric, company name, or bullet?
- A decorative `01`/`02` prefix, `numeral` prop, `Vol.`/`Edition`, or ping?
- A metric that starts at `0` or needs JS to show its real value?
- A dot matrix, grain overlay, decorative grid, blob, or orb?
- Gradient text, a gradient button, glass, a shadow utility, or `rounded-xl`?
- A second eyebrow/kicker or a pill above the heading?
- A centred hero template, three equal icon cards, or cards in cards?
- Body text below AA contrast, or `gray-400/500`?
- Filler copy, a "Get Started" CTA, or invented proof?
- More than one reveal per view, or `motion` instead of `m`?
- Nav links hidden on mobile with no working menu?
- Horizontal overflow at 375px?
- A raw hex instead of a token?
- `npm run check:ui`, `npm run lint`, `npm run typecheck`, `npm run build` all
  green?

## Reference

- `docs/dhema-me-unslop-guide.md`: the spec and Phase 1-3 roadmap.
- `docs/unslop-ui.md`: provenance, install, current state, update procedure.
- `TELLS.md`: upstream catalog, reference only.
- Upstream: https://github.com/claudiusararu/unslop-ui-skill (MIT).
- Also cited by the spec: heydamir/unslop, yuwen-lu/unslop-ui.
