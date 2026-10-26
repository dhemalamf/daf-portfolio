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

Announce the skill you are using and follow its checklist. If your harness
supports `SessionStart` hooks, `.claude/settings.json` already injects the
bootstrap; otherwise reading the file is enough.

Provenance, scope, and update steps: `docs/superpowers.md`.

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build; also runs the type check
npx tsc --noEmit   # types only
```

`npm run lint` is not usable yet — there is no ESLint config and `next lint`
starts an interactive setup prompt. Do not run it unattended.

## Ground rules

- Default to React Server Components; `'use client'` only when required.
- Keep content in `src/data/`; blog content comes from Sanity.
- Follow the editorial design tokens in `src/app/globals.css`; no violet,
  no large radii, no gradients.
- Run `npm run build` before claiming success, and state what you verified.
- Do not commit `test_reports/`, `.env*` (except `.env.example`), or `.next/`.

## Current state

Next.js 15.5.9 · React 19 · Tailwind 3.4 · Sanity 3.99 + next-sanity 12
(peer-range mismatch, masked by `legacy-peer-deps=true`). No automated tests.
Known defects and improvement plan: `docs/code-review.md`.
