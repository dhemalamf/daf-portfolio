# CLAUDE.md — daf-portfolio

Project instructions for Claude Code and other coding agents. Read this before
changing code.

## Superpowers

This repo vendors [obra/superpowers](https://github.com/obra/superpowers) v7.0.1
as project skills in `.claude/skills/`. A `SessionStart` hook
(`.claude/hooks/superpowers-session-start`, wired in `.claude/settings.json`)
injects the `using-superpowers` bootstrap automatically.

If the bootstrap was not injected (non-Claude harness, hooks disabled), read
`.claude/skills/using-superpowers/SKILL.md` first, then load the matching skill
file for the task:

| Task | Skill |
|---|---|
| New feature, component, or behavior change | `brainstorming` → `writing-plans` |
| Executing a written plan | `subagent-driven-development` or `executing-plans` |
| Any bug or failing test | `systematic-debugging` |
| Implementation work | `test-driven-development` |
| Before saying "done" / committing | `verification-before-completion` |
| Before merging | `requesting-code-review`, `finishing-a-development-branch` |

Skills are instructions, not suggestions: follow the referenced checklist and
announce which skill you are using. See `docs/superpowers.md` for provenance and
the update procedure.

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
```

Always run `npm run typecheck` and `npm run build` before claiming a change
works. There is no test suite, so describe the manual verification you ran.

## Architecture

- `src/app/` — routes: `/`, `/about`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/studio`
- `src/components/` — section components; `src/components/animations/` holds motion primitives
- `src/data/` — typed content (`profile.ts`, `caseStudies.ts`). Case studies and profile are static; blog posts come from Sanity.
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

- Design language is Swiss/editorial: Instrument Serif display, Geist body,
  JetBrains Mono labels; vermillion `#FF3E00` accent; sharp 2px radii; visible
  hairline rules. `rounded-xl`, violet accents, `gradient-text` and
  `glass-card` are legacy patterns: do not add new usages.
- Use design tokens (`bg-background`, `text-foreground/70`, `.mono-label`,
  `.btn-ink`, `.section-container`), not raw hex values.
- Respect `prefers-reduced-motion` for any new animation.
- Content lives in `src/data/`, not inline in JSX, unless it is page chrome.
- Never commit `test_reports/` output or `.env` files.

## Environment

Public identifiers live in `src/lib/config.ts` and `src/sanity/config.ts`, with
documented defaults so the site works without env vars. For local overrides or a
fork, copy `.env.example` to `.env.local` (git-ignored).

## Status

- Dependencies are aligned: Next 15 + Sanity 4 + next-sanity 10, no
  `legacy-peer-deps`. Do not bump one side alone; check peer ranges first.
- Blog reads are guarded (typed query layer, timeout, ISR, fallback UI).
- CI runs lint, typecheck and build (`.github/workflows/ci.yml`).
- There is still no test runner; when adding one, prefer Playwright for the
  smoke paths listed in `docs/code-review.md`.
- Studio needs `localhost:3000` (and your preview host) registered as a CORS
  origin in sanity.io/manage before local editing works.
