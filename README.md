# Dhema'alam Fajrianto — Product Manager Portfolio

Editorial portfolio for a product manager: case studies, experience, and a
Sanity-powered journal. Live at [dhema.me](https://dhema.me).

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 with CSS-variable design tokens |
| Content | Typed files in `src/data/` + Sanity (blog) |
| Motion | framer-motion, Lenis smooth scroll |
| Analytics | Google Analytics 4 events via `src/lib/analytics.ts` |

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm install` currently relies on `legacy-peer-deps=true` (see `.npmrc`)
because `next-sanity@12` expects Next 16 / Sanity 5 while the project runs Next
15 / Sanity 3. See `docs/code-review.md` §1 before upgrading either side.

### Environment

The blog reads from Sanity. Values fall back to the project defaults in
`src/sanity/client.ts`, so local dev works without a `.env`, but for your own
dataset create `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

The Studio is at `/studio`. `/blog` requires network access to Sanity; without
it the route currently returns a 500 (tracked in `docs/code-review.md`).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build + type check |
| `npm run start` | serve the production build |
| `npm run lint` | not usable yet — no ESLint config, `next lint` prompts interactively |

Type-check without building: `npx tsc --noEmit`.

## Project structure

```
src/
├── app/                      # App Router routes
│   ├── page.tsx              # home
│   ├── about/                # profile, experience, skills
│   ├── work/                 # case-study index + [slug]
│   ├── blog/                 # Sanity-powered journal + [slug]
│   ├── contact/              # contact channels
│   ├── studio/[[...index]]/  # embedded Sanity Studio
│   ├── layout.tsx            # fonts, metadata, providers
│   └── globals.css           # design tokens + utilities
├── components/               # section components
│   └── animations/           # FadeIn, Marquee, TiltCard, …
├── data/                     # profile.ts, caseStudies.ts (typed content)
├── lib/                      # analytics helpers
└── sanity/                   # client, image builder, schemas
```

## Editing content

- **Profile, experience, skills, certifications** — `src/data/profile.ts`
- **Case studies** — `src/data/caseStudies.ts` (`problem → process → outcome`
  structure; `featured` controls the home page selection)
- **Blog posts** — Sanity Studio at `/studio`, schema in
  `src/sanity/schemas/post.ts`

Design direction (palette, type scale, spacing, component behaviour) is captured
in `design_guidelines.json`. Use the tokens in `src/app/globals.css` rather than
raw values.

## Working with coding agents

This repository vendors [Superpowers](https://github.com/obra/superpowers)
v7.0.1 — a development workflow packaged as agent skills (brainstorm → plan →
TDD → review → finish) — in `.claude/skills/`.

- `CLAUDE.md` — Claude Code entry point; a `SessionStart` hook injects the
  `using-superpowers` bootstrap automatically.
- `AGENTS.md` — same guidance for Codex, Cursor, Copilot, Gemini CLI, DSH.
- `docs/superpowers.md` — provenance, layout, verification, update procedure.
- `THIRD_PARTY_NOTICES.md` — upstream MIT license.

## Documentation

- [`docs/code-review.md`](docs/code-review.md) — current defects, priorities, and
  the improvement roadmap
- [`docs/superpowers.md`](docs/superpowers.md) — agent workflow installation

## Deployment

Any Node host works; the site is Vercel-ready. Set the three environment
variables above in the project settings, then deploy. Case-study routes are
pre-rendered at build time; blog routes render on demand and need Sanity
reachable at runtime.

## License

Personal portfolio — all rights reserved. Vendored Superpowers skills remain
MIT-licensed (see `THIRD_PARTY_NOTICES.md`).
