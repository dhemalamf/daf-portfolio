# Move Work and About content into Sanity Studio — design

Date: 2026-11-13
Status: awaiting approval
Owner: Dhema'alam Fajrianto

## Intent

Editing case studies, experience, skills, certifications, impact metrics,
operating stances and principles currently means a code change and a deploy.
Move that content into the existing Sanity project (`js6xvhgj` / `production`)
so it can be edited in `/studio`, while keeping the site's identity strings and
the static files as a safety net.

## Goals

- Case studies (7) and every About-page collection are editable in Studio.
- The rendered site is unchanged: same components, same layout, same copy.
- An existing Sanity outage never blanks the site.
- Publishing a case study updates the site without a rebuild.

## Non-goals

- Profile identity (name, title, bio, email, links, resume) stays in code.
  `layout.tsx` metadata, JSON-LD and the sitemap depend on it, and it changes
  once a year at most.
- No draft preview, no Presentation tool, no visual editing. Can be added later.
- No change to the journal, its schema, or its webhook contract.
- No rich text for case-study narrative; structured fields stay.

## Decisions already made

| Question | Choice | Why |
|---|---|---|
| Scope | Work + About collections; identity in code | Studio covers what changes; metadata stays deterministic |
| Narrative format | Structured string/text fields | Matches the current layout exactly; no renderer or typography work |
| Outage behaviour | Static files in `src/data/` remain as fallback | Site never blanks; CI build survives a Sanity outage |

## Resolved after builder check

These were open in the first draft. Settled here so the plan can proceed.

**Counts in prose are derived, not typed.** "Seven products", "Five selected
case studies", "six chapters", "Three working stances" and the
`experiences.length - 4` counter (which goes negative below four) are replaced
by values derived from the loaded collections, or reworded to avoid a number.
Section headings and descriptions stay in code as page chrome: scope is
collections, not bespoke page copy.

**Grids adapt; Studio does not cap counts.** Every grid already maps its array,
so extra items wrap. The home page guards `featured[0]` before rendering the
large card and renders nothing when there are no featured studies. No Studio
`max()` validation on collection size.

**`check:content` is a migration gate, not an editorial gate.** It checks only
the migrated Work and About types (never posts), reports collection counts as
information, and **never fails on an empty collection** — an intentionally
emptied collection is valid. It fails only on banned copy patterns in the
migrated types (em dashes, filler words). Its rule table gains an explicit
em-dash rule, which the original draft claimed to reuse but did not exist.

**Empty and unavailable states.** An empty collection renders an empty state or
is omitted, per section: home hides the featured card and each collection
section renders nothing rather than a broken grid. A case study that exists only
in Sanity, requested while Sanity is down, renders the "unavailable" panel used
by the blog (`src/app/blog/[slug]/page.tsx`) instead of 404 — 404 is reserved
for a slug Sanity confirms does not exist. The frozen fallback cannot serve
content it has never seen, and pretending otherwise would 404 a real page.

## Approaches considered

1. **One `siteSettings` singleton with embedded arrays.** Fewest documents, one
   save button. Rejected: no per-item search, no independent publishing, arrays
   are awkward to edit for seven case studies.
2. **Separate document per item (chosen).** One type per collection, each with
   its own order field. Consistent with the existing `post` type, gives Studio
   search and previews, and lets items be created or unpublished independently.
3. **Move only Work, leave About static.** Rejected by decision: About is the
   page that changes most often.

## Design

### Document types

All are `type: 'document'`, listed in `src/sanity/schemas/index.ts`, and each
collection carries a numeric `order` used for display sorting.

**`caseStudy`** — mirrors the current `CaseStudy` interface:

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `slug` | slug | from title, required |
| `company` | string | required |
| `industry` | string | required |
| `period` | string | display string, e.g. `2025` |
| `summary` | text | required, max 300 |
| `challenge` | text | required |
| `process` | array of string | required, min 1 |
| `solution` | text | required |
| `tradeOffs` | text | optional |
| `technicalHurdles` | text | optional |
| `retrospective` | text | optional |
| `visual` | string | list: `c4`, `flow`, `dashboard`, `state-machine` |
| `outcomes` | array of `{metric, description}` | required, max 3 |
| `tags` | array of string | |
| `featured` | boolean | |
| `order` | number | required |
| `publishDate` | date | required |
| `articleUrl` | url | optional |

**`experience`** — `company`, `role`, `period`, `type`, `description`,
`highlights[]`, `industries[]`, `logo` (image), `order`.

**`certification`** — `name`, `issuer`, `issuedDate`, `credentialUrl`, `order`.

**`skillGroup`** — `title`, `items[]`, `order`.

**`impactMetric`** — `value`, `label`, `description`, `order`.

**`operatingStance`** — `title`, `stance`, `example`, `order`.

**`principle`** — `title`, `text`, `order`.

`logo` is an image field. The migration uploads the six existing PNGs from
`public/logos/`; the loader resolves it to a URL string so components keep
receiving `logo?: string`.

### Reading layer

Components never talk to Sanity. A new `src/content/` layer returns the same
shapes they already use:

```
src/content/caseStudies.ts   getCaseStudies(), getCaseStudyBySlug(slug), getFeaturedCaseStudies()
src/content/about.ts         getExperiences(), getCertifications(), getSkillGroups(),
                             getImpactMetrics(), getOperatingStances(), getPrinciples()
```

Rules, applied identically in both files:

- Sanity succeeds → its data is authoritative, **including an empty result**.
  An intentionally emptied collection renders empty; it does not resurrect the
  fallback.
- Sanity fails (network, timeout, bad query) → return the static fallback from
  `src/data/` and `console.error('[content] ...')`.
- Every read is wrapped in the existing `FetchResult` pattern and cached with
  `next: { tags: [...] }`; `work` for case studies, `about` for everything else.

Rollout order matters: run the migration **before** deploying the loader, or
the site renders empty collections. `npm run check:content` (below) is the gate.

### Pages

- `/` and `/about` and `/work` become async server components reading from
  `src/content/`, with `revalidate = 3600` as a backstop.
- `/work/[slug]` keeps `generateStaticParams`, sourced from
  `getCaseStudies()`; a Sanity outage at build falls back to the static slugs.
  It also gets `revalidate = 3600`; the webhook is the fast path, this is the
  floor.
- `notFound()` only when Sanity succeeded and returned no such slug; when the
  read failed, the page renders the blog's "unavailable" panel instead.
- Metadata and JSON-LD keep reading from the resolved case study; nothing
  changes structurally.

### Sort order

**Decided: `order` drives the site.** Home featured cards, related studies and
the `/work` default all follow the `order` field, so reordering in Studio
reorders the site. The Date/Name control on `/work` stays available, but its
default becomes manual order and its label reflects that; `publishDate` is still
displayed, still drives JSON-LD, and remains the secondary sort.

Seeding `order` date-desc reproduces today's home page and `/work` default. The
one intentional difference: related studies currently use the authored array
order, and will follow `order` instead.

`getFeaturedCaseStudies()` keeps the `featured` flag as a filter and uses
`order` for sorting. The home page renders the largest card from the first
featured study and guards against an empty list.

### Revalidation

`/api/revalidate` currently purges only `posts`. Extend it to accept a `_type`
in the webhook body:

- `post` → `posts` (unchanged), `/blog`, `/blog/<slug>`
- `caseStudy` → `work`, `/`, `/work`, `/work/<slug>`
- anything About → `about`, `/`, `/about`

The shared-secret check and fail-closed behaviour stay exactly as they are.

**Owner action required.** The existing webhook in sanity.io/manage is filtered
to `_type == 'post'`. Its filter must be broadened to cover `caseStudy` and the
About types (or a second webhook added). Until then, edits land on the hourly
ISR backstop only. The route itself is ready either way.

### Studio structure

`structureTool` gains an explicit list: **Work** (case studies), **About**
(experience, certifications, skill groups, impact metrics, operating stances,
principles), **Journal** (posts). Sorted lists use the `order` field; case
studies use `order`.

### Migration

`scripts/migrate-content.mjs`, run manually with `SANITY_API_WRITE_TOKEN`:

- deterministic `_id`s (`caseStudy.<slug>`, `experience.doitpay`, …) so
  re-running replaces rather than duplicates;
- `createOrReplace` for documents, `client.assets.upload` for the six logos;
- prints a summary and supports `--dry-run`;
- never runs in CI.

New env var documented in `.env.example` (empty) and `.env.local` (ignored).

### Copy guard for CMS content

`check:ui` only scans source. `scripts/check-content.mjs` fetches published
Work and About documents and applies the copy rules (em dashes, filler words,
banned CTA phrasing) to the strings a human typed into Studio. The rule table
gains an explicit em-dash rule.

Scope and gating: migrated types only, never `post`; collection counts are
printed as information; an empty collection is **not** a failure. It exits 0
with a notice when Sanity is unreachable, so offline builds are unaffected.

## Constraints

- React Server Components; the content layer is server-only. No client bundle
  growth (Studio stays the only heavy route).
- Sanity reads keep the existing 8 s timeout and no-CDN setting.
- No new dependencies; `@sanity/client` already ships via `next-sanity`.
- Tokens never enter git; only `NEXT_PUBLIC_*` values are committed.

## Risks

| Risk | Mitigation |
|---|---|
| Loader deployed before migration blanks Work | Run migration first; `check:content` reports counts after the import |
| Two sources drift (fallback never updated) | Fallback is documented as frozen, not editable; deprecate it once stable |
| Sanity outage during `next build` | Fallback keeps SSG working |
| `src/data` shape and Sanity shape diverge | One canonical TypeScript interface; loader maps explicitly |
| Webhook misconfigured → stale pages | ISR backstop (`revalidate = 3600`) on all three routes |
| Hardcoded counts disagree with collections | Counts derived from loaded data |
| A Sanity-only slug requested during an outage | Renders the "unavailable" panel, never a false 404 |

## Left to the builder

- Exact field descriptions and Studio helper text.
- Whether `order` starts at 0 or 1.
- Splitting `about.ts` if it grows past a readable size.
- Whether the sitemap keeps reading static or switched content.

## Verification

1. `npm run migrate:content -- --dry-run` lists the expected 7 studies, 6
   experiences, 4 certifications, 4 skill groups, 4 metrics, 3 stances and 3
   principles; then a real run, then a second run to prove idempotence.
2. `npm run check:content` passes and reports every collection's count; an
   intentionally emptied collection reports zero without failing.
3. `/`, `/about`, `/work`, one case study: DOM matches the pre-migration
   content, no layout shift (related-studies order may differ under Option A).
4. Simulate an outage (wrong project ID) and confirm the fallback renders, and
   that a Sanity-only slug shows the "unavailable" panel rather than a 404.
5. Publish a test edit in Studio, confirm the webhook updates the page.
6. `npm run check:ui && npm run lint && npm run typecheck && npm run build`.
