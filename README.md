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

Dependencies are aligned on Next 15.5, Sanity 4.22 and next-sanity 10 with no
`legacy-peer-deps`. Check peer ranges before bumping either side (see
`docs/code-review.md` §1).

### Environment

The blog reads from Sanity. Values fall back to the project defaults in
`src/sanity/client.ts`, so local dev works without a `.env`, but for your own
dataset copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Server-only: signs the Sanity → /api/revalidate webhook (see below)
SANITY_REVALIDATE_SECRET=
```

The Studio is at `/studio`. `/blog` needs network access to Sanity; when the API
is unreachable the route degrades to a "journal unavailable" panel instead of a
500, and recovers on the next revalidation.

### Instant revalidation

Posts are cached with ISR (`revalidate = 60`) under the `posts` cache tag. To
publish without waiting up to a minute, register a Sanity webhook
(sanity.io/manage → API → Webhooks):

| Field | Value |
|---|---|
| URL | `https://<site>/api/revalidate` |
| Trigger | Create, Update, Delete |
| Filter | `_type == "post"` |
| HTTP header | `x-sanity-webhook-secret: <SANITY_REVALIDATE_SECRET>` |

The route also accepts `Authorization: Bearer <secret>` or `?secret=`. It fails
closed: with no `SANITY_REVALIDATE_SECRET` set it returns 503, and a wrong secret
returns 401. On a valid call it purges the `posts` tag and revalidates `/blog`,
`/blog/<slug>` and `/sitemap.xml`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build + type check |
| `npm run start` | serve the production build |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | `tsc --noEmit` |

CI runs all three on every pull request (`.github/workflows/ci.yml`).

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

Any Node host works; the site is Vercel-ready. Set the four environment
variables above in the project settings (the three `NEXT_PUBLIC_*` values are
optional — documented defaults ship — but `SANITY_REVALIDATE_SECRET` is required
for the publish webhook), then deploy. Case-study routes are pre-rendered at
build time; blog routes render on demand and need Sanity reachable at runtime.

## License

Personal portfolio — all rights reserved. Vendored Superpowers skills remain
MIT-licensed (see `THIRD_PARTY_NOTICES.md`).

## Troubleshooting

**`ChunkLoadError: Loading chunk app/layout failed`**
The `.next` directory is stale or contains duplicated files (a synced folder or a
build running alongside `npm run dev` can cause this). Recovery:

```bash
pkill -f "next dev"
rm -rf .next
npm run dev
```

Then hard-reload the browser (Cmd+Shift+R). Never run `npm run build` while the
dev server is running — both write to `.next`.

**Keep the project out of iCloud Drive / Dropbox.** `~/Documents` is synced on
this machine, and file-provider conflict copies inside `.next`/`node_modules`
break webpack manifests (files named `* 2.json` are the tell). Prefer a local
path such as `~/Developer/daf-portfolio`; if the project stays in a synced
folder, `rm -rf .next` is the standard fix after weird chunk errors.

**Studio shows "Connect this studio to your project"**
The current origin is not an allowed CORS origin for the project. Add it under
sanity.io/manage → API → CORS origins with *Allow credentials* enabled.
