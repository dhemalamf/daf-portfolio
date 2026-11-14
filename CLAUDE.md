# CLAUDE.md — daf-portfolio

Project instructions for Claude Code and other coding agents. Read this before
changing code.

## Superpowers

This repo vendors [obra/superpowers](https://github.com/obra/superpowers) v7.0.1
as project skills in `.claude/skills/`. A `SessionStart` hook
(`.claude/hooks/superpowers-session-start`, wired in `.claude/settings.json`)
injects the `using-superpowers` bootstrap and a compact UI design digest
automatically.

If the bootstrap was not injected (non-Claude harness, hooks disabled), read
`.claude/skills/using-superpowers/SKILL.md` first, then load the matching skill
file for the task:

| Task | Skill |
|---|---|
| New or changed UI (page, section, component, style) | `no-ai-slop` → `brainstorming` → `writing-plans` |
| New feature, component, or behavior change | `brainstorming` → `writing-plans` |
| Executing a written plan | `subagent-driven-development` or `executing-plans` |
| Any bug or failing test | `systematic-debugging` |
| Implementation work | `test-driven-development` |
| Before saying "done" / committing | `verification-before-completion` |
| Before merging | `requesting-code-review`, `finishing-a-development-branch` |

Skills are instructions, not suggestions: follow the referenced checklist and
announce which skill you are using. See `docs/superpowers.md` for provenance and
the update procedure.

`no-ai-slop` is the UI contract. Read it and the strict constraints below before
any UI change; `npm run check:ui` enforces the machine-checkable half.
Provenance, current debt and update steps: `docs/unslop-ui.md`.

## Strict design constraints (anti-slop)

Copied from [`docs/dhema-me-unslop-guide.md`](docs/dhema-me-unslop-guide.md) §2.
The site now follows these; do not reintroduce the old system.

1. **Colour: cobalt and neutrals only.** Accent is `#1D4ED8` in light mode and
   `#3B82F6` in dark mode. Text is `#18181B` light / `#F4F4F5` dark; surfaces
   are `#FFFFFF`/`#FAFAFA` light and `#09090B`/`#111315` dark. Accents belong
   only on interactive elements: primary CTA, active nav/tabs, inline links,
   focus. Never colour words in headings.
2. **No marquees or moving tickers.** Static content or whitespace only.
3. **No arbitrary word-level italics or accent colours in headings.** One
   family, one weight system, one colour per heading.
4. **No decorative numbering.** No `01`, `02`, `.01` prefixes on sections,
   cards, or nav. Numbers only where a real sequence exists.
5. **No faux-magazine metadata.** No "Vol. 04 — Edition 2026", ping badges, or
   abstract tags with no function.
6. **Metrics render in static SSR HTML.** No `0` initial state, no client-side
   count-up, no hydration flash.
7. **No abstract filler graphics.** No dot matrices, grain, decorative grid
   lines, mesh, or orbs. Use real artifacts or whitespace.
8. **Typography: Geist Sans + JetBrains Mono.** Headings are Geist Sans 600,
   tracking `-0.025em`, uniform colour. Body is Geist Sans. Mono is restricted
   to timestamps, tags, metrics, and code. Instrument Serif is removed; do not
   add a serif fallback.

## Stack

- Next.js 15.5.9 (App Router, React Server Components), React 19, TypeScript strict
- Tailwind CSS 3.4 with CSS-variable design tokens (`src/app/globals.css`, `tailwind.config.ts`)
- Sanity Studio v4 + `next-sanity` 10 for the blog (`/blog`, `/studio`)
- framer-motion for UI animation (lazy `m` components), Lenis for smooth scrolling
- No test framework is installed yet

## Commands

```bash
npm run dev                     # http://localhost:3000
npm run build                   # production build
npm run typecheck               # tsc --noEmit
npm run lint                    # eslint (flat config)
npm run check:ui                # UI design guard (fails on AI-slop patterns)
npm run check:content           # copy guard for Studio-authored content
```

Always run `npm run check:ui`, `npm run check:content`, `npm run lint`,
`npm run typecheck` and `npm run build` before claiming a change works. There is no test suite, so
describe the manual verification you ran.

## Architecture

- `src/app/` — routes: `/`, `/about`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/studio`
- `src/components/` — section components; `src/components/animations/` holds motion primitives
- `src/content/` — server-only loaders that read Sanity and fall back to `src/data/` on failure
- `src/data/` — canonical content types, identity strings, and the frozen fallback copy
- `src/sanity/` — client, image URL builder, schemas
- `src/lib/analytics.ts` — GA4 event helpers
- Path alias: `@/*` → `src/*`

Server components are the default. Add `'use client'` only for state, effects,
browser APIs, or animation. Client islands are deliberately small
(`TrackedLink`, `ShareButtons`, `BackToTop`, animation leaves).

Animation uses `LazyMotion` (`src/components/motion/MotionProvider.tsx`) with
framer-motion's `m` component, imported as `import { m as motion }`. Do not
reintroduce the full `motion` import, and do not use `layout`/drag props — the
bundle only loads `domAnimation` features.

## Conventions

- Design language is technical modernist: Geist Sans for headings and body,
  JetBrains Mono for metadata and metrics, cobalt `#1D4ED8` / `#3B82F6` only on
  interactive elements, neutral `#18181B` / `#F4F4F5` text, 2px radii, hairline
  rules. `rounded-xl`, violet/orange accents, `gradient-text`, `glass-card`,
  gradient surfaces, `shadow-*`, marquees, count-ups, grain, serif type,
  decorative numbering and word-level heading accents are banned:
  `npm run check:ui` fails on them. The full contract is
  `.claude/skills/no-ai-slop/SKILL.md`.
- Use design tokens (`bg-background`, `text-foreground/70`, `.mono-label`,
  `.btn-ink`, `.section-container`), not raw hex values.
- Respect `prefers-reduced-motion` for any new animation.
- Work and About content comes from Sanity through `src/content/`; `src/data/`
  is a frozen outage fallback, not an editing path. Identity strings and page
  chrome stay in code. Blog content comes from Sanity too.
- Never commit `test_reports/` output or `.env` files.

## Environment

Public identifiers live in `src/lib/config.ts` and `src/sanity/config.ts`, with
documented defaults so the site works without env vars. For local overrides or a
fork, copy `.env.example` to `.env.local` (git-ignored).

## Status

- Dependencies are aligned: Next 15 + Sanity 4 + next-sanity 10, no
  `legacy-peer-deps`. Do not bump one side alone; check peer ranges first.
- Blog, Work and About reads are guarded (typed query layer, timeout, ISR,
  static fallback, unavailable panel).
- CI runs lint, typecheck, both design guards and build
  (`.github/workflows/ci.yml`).
- Phase 2 case-study and operating drafts now live in Sanity; they still
  need the owner's fact-check before they are treated as final.
- There is still no test runner; when adding one, prefer Playwright for the
  smoke paths listed in `docs/code-review.md`.
- Studio needs `localhost:3000` (and your preview host) registered as a CORS
  origin in sanity.io/manage before local editing works.
