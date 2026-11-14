# AGENTS.md — daf-portfolio

Guidance for coding agents (Codex, Cursor, Copilot, Gemini CLI, DSH, …) working
in this repository. `CLAUDE.md` carries the same project context for Claude Code.

## Start here: Superpowers

This repo vendors [obra/superpowers](https://github.com/obra/superpowers) v7.0.1
in `.claude/skills/`. Before responding to a task, read:

1. `.claude/skills/using-superpowers/SKILL.md` — the bootstrap skill
2. The specific skill for the task (`brainstorming`, `writing-plans`,
   `systematic-debugging`, `test-driven-development`,
   `verification-before-completion`, `requesting-code-review`, …)
3. For any page, section, component, or visual change:
   `.claude/skills/no-ai-slop/SKILL.md` and the **Strict design constraints** in
   `CLAUDE.md` / `docs/dhema-me-unslop-guide.md` §2. The project spec overrides
   the upstream catalog. Where the live site contradicts it, the site is debt,
   not precedent.

Announce the skill you are using and follow its checklist. If your harness
supports `SessionStart` hooks, `.claude/settings.json` already injects the
bootstrap and the UI digest; otherwise reading the files is enough.

Provenance, scope, and update steps: `docs/superpowers.md` and
`docs/unslop-ui.md`.

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (flat config)
npm run check:ui   # UI design guard (fails on AI-slop patterns)
npm run check:content  # copy guard for Studio-authored content
```

Run check:ui, check:content, lint, typecheck and build before claiming
success. CI runs the same five.

## Ground rules

- Default to React Server Components; `'use client'` only when required.
- Content comes from Sanity via `src/content/`; `src/data/` is a frozen
  fallback for outages only. Identity strings stay in code.
- Follow the design tokens in `src/app/globals.css`: Geist Sans headings/body,
  JetBrains Mono for metadata and metrics, cobalt accents only on interactive
  elements, neutral text. No serif type, no vermillion/orange, no violet, no
  large radii, no gradients. The full rules are in
  `.claude/skills/no-ai-slop/SKILL.md`.
- No marquees, count-ups, decorative numbering, word-level italic/accent words
  in headings, faux-magazine metadata, grain, dot matrices, or decorative grid
  lines. These are removed; never reintroduce them.
- Run `npm run check:ui`, `npm run check:content` and `npm run build` before
  claiming success, and state what you verified.
- Do not commit `test_reports/`, `.env*` (except `.env.example`), or `.next/`.

## Current state

Next.js 15.5.9 · React 19 · Tailwind 3.4 · Sanity 4.22 + next-sanity 10
(aligned peer ranges, no `legacy-peer-deps`). CI runs lint, typecheck, both design
guards and build. No test runner yet. The review, fixes and remaining
known gaps are documented in `docs/code-review.md`.
