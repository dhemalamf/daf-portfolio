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
- Sanity Studio v3 + `next-sanity` for the blog (`/blog`, `/studio`)
- framer-motion for UI animation, Lenis for smooth scrolling (both client-side)
- No test framework is installed yet

## Commands

```bash
npm run dev                     # http://localhost:3000
npm run build                   # production build + type check
npx tsc --noEmit                # type check only
npm run lint                    # NOT usable: no ESLint config yet, prompts interactively
```

Always run `npm run build` before claiming a change works. There is no test
suite, so describe manual verification steps explicitly.

## Architecture

- `src/app/` — routes: `/`, `/about`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/studio`
- `src/components/` — section components; `src/components/animations/` holds motion primitives
- `src/data/` — typed content (`profile.ts`, `caseStudies.ts`). Case studies and profile are static; blog posts come from Sanity.
- `src/sanity/` — client, image URL builder, schemas
- `src/lib/analytics.ts` — GA4 event helpers
- Path alias: `@/*` → `src/*`

Server components are the default. Add `'use client'` only for state, effects,
browser APIs, or framer-motion. `CaseStudyContent` and `ContactForm` are current
examples of over-broad client boundaries.

## Conventions

- Design language is Swiss/editorial: Instrument Serif display, Geist body,
  JetBrains Mono labels; vermillion `#FF3E00` accent; sharp 2px radii; visible
  hairline rules. Do not introduce `rounded-xl`, violet accents, gradients, or
  `glass-card` styling — those are legacy blog/contact-form leftovers being
  migrated.
- Use design tokens (`bg-background`, `text-foreground/70`, `.mono-label`,
  `.btn-ink`, `.section-container`), not raw hex values.
- Respect `prefers-reduced-motion` for any new animation.
- Content lives in `src/data/`, not inline in JSX, unless it is page chrome.
- Never commit `test_reports/` output or `.env` files.

## Environment

Sanity values fall back to hardcoded defaults in `src/sanity/client.ts` and the
GA measurement ID falls back in `src/components/GoogleAnalytics.tsx`. For local
work, put the values in `.env.local` (git-ignored) instead of relying on the
fallbacks.

## Known issues (see docs/code-review.md)

- `next-sanity@12` declares peers `next ^16` and `sanity ^5`, but the project
  runs Next 15 + Sanity 3; `.npmrc` sets `legacy-peer-deps=true`, which hides it.
- `/blog` returns 500 when Sanity is unreachable (no error boundary or fallback).
- `test_reports/iteration_1.json` is committed and stale.
- `README.md` still describes the pre-Sanity Next 14 version of the site.
