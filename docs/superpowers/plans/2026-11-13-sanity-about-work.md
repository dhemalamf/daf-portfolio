# Move Work and About content into Sanity — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development
> (recommended) or executing-plans to implement this plan task-by-task. Steps
> use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make case studies and the About collections editable in Sanity Studio
while the rendered site stays identical and a Sanity outage never blanks it.

**Architecture:** Seven Sanity document types feed a server-only `src/content/`
layer that returns the same TypeScript shapes the components already use. Sanity
is authoritative when reachable; on failure the layer returns the frozen
`src/data/` fallback. Tag-based revalidation (`work`, `about`) makes publishes
instant, with a 1-hour ISR floor.

**Tech Stack:** Next.js 15 App Router (RSC, ISR), Sanity 4.22 + next-sanity 10,
TypeScript strict, node scripts (no new dependencies).

**Spec:** `docs/superpowers/specs/2026-11-13-sanity-about-work-design.md`

## Global Constraints

- No new dependencies. `@sanity/client` ships via `next-sanity`.
- React Server Components only; the content layer must never be imported by a
  `'use client'` module.
- Sanity reads keep `useCdn: false` and the 8 s timeout from
  `src/sanity/client.ts`.
- Project `js6xvhgj`, dataset `production`, API version `2024-01-01`.
- Public queries filter `!(_id in path("drafts.**"))`.
- Every collection read survives failure: `src/content/*` never throws.
- An empty Sanity result is authoritative and renders empty; only a failed read
  falls back to `src/data/`.
- Identity strings (name, title, bio, email, links, resume) stay in code.
- `order` drives display order; `publishDate` stays for display and JSON-LD.
- Never commit `.env*` except `.env.example`; never print
  `SANITY_API_WRITE_TOKEN`.
- Type-only imports inside `src/data/` must use `import type` and
  `export type … from`, never plain `import`. Node's type stripping erases them,
  which is what lets the migration script load those files at runtime with no
  extension resolution.
- Run `npm run check:ui && npm run lint && npm run typecheck && npm run build`
  before claiming a task complete.

## Review Focus

1. **A published case study with an empty `process` array or one outcome.**
   Should render the page with those blocks omitted, not crash on
   `process.map`.
2. **Sanity slow or down while a case-study slug exists only in Sanity.**
   Expect the "unavailable" panel, never a false 404 and never a blank page.
3. **Every case study archived in Studio.** `/`, `/work` and `/about` must
   render without `featured[0]` throwing and without broken empty grids.
4. **Migration run twice.** Expect the same document count, no duplicates, no
   duplicate logo assets.
5. **A Studio user reorders items.** Expect the site order to change after
   revalidation, and `/work`'s default sort to reflect it.

---

### Task 1: Canonical types and reshape the static data

**Files:**
- Create: `src/data/types.ts`, `src/data/principles.ts`
- Modify: `src/data/caseStudies.ts`, `src/data/profile.ts`,
  `src/data/operating.ts`, `src/app/about/page.tsx`

**Interfaces:**
- Produces: `CaseStudy`, `CaseStudyVisual`, `Experience`, `Certification`,
  `SkillGroup`, `ImpactMetric`, `OperatingStance`, `Principle` from
  `@/data/types`. `caseStudies.ts` re-exports `CaseStudy` and `CaseStudyVisual`
  so existing imports keep working.
- `Experience.id`, `Certification.id` become `string`.
- `CaseStudy` gains `order: number` (WorkGrid sorts on it client-side).
  Seed `order` date-desc across the seven studies:
  `sampoerna-myhero-decoupling` 0, `ai-lms-platform` 1,
  `ai-talent-matching-dashboard` 2, `ai-sales-forecasting-dashboard` 3,
  `transfez-mobile-app` 4, `apiary-academy-learning-platform` 5,
  `revamping-dana-indonesia` 6. This is the order the site shows today on `/`
  and `/work`; only related-studies order changes.

- [ ] **Step 1: Create `src/data/types.ts`**

Move `CaseStudy` and `CaseStudyVisual` from `caseStudies.ts`, and add:

```ts
export interface Experience {
    id: string
    company: string
    logo?: string
    role: string
    period: string
    type: string
    description: string
    highlights: string[]
    industries: string[]
}
export interface Certification {
    id: string
    name: string
    issuer: string
    issuedDate: string
    credentialUrl: string
}
export interface SkillGroup { title: string; items: string[] }
export interface ImpactMetric { value: string; label: string; description: string }
export interface OperatingStance { title: string; stance: string; example: string }
export interface Principle { title: string; text: string }
```

- [ ] **Step 2: Point the data files at the shared types**

`caseStudies.ts`: import and `export type { CaseStudy, CaseStudyVisual } from './types'`.
`profile.ts`: type each array (`experiences: Experience[]`, etc.) and change
numeric `id`s to stable strings — experiences `doitpay`, `zero-one-group`,
`transfez`, `learnext`, `asa-ren`, `mcf`; certifications `apiary-bootcamp`,
`binar-bootcamp`, `dti-scrum`, `linkedin-pm`.
`operating.ts`: import `OperatingStance` from `./types` instead of defining it.

- [ ] **Step 3: Move the About principles out of the page**

Create `src/data/principles.ts` exporting `principles: Principle[]` with the
three entries currently inline in `src/app/about/page.tsx` (`Outcome-driven`,
`Cross-functional`, `Evidence-led`). Import them in the page and delete the
local `const principles`.

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run build`
Expected: exit 0, 19/19 pages generated.
Run: `grep -rn "id: [0-9]," src/data` → no matches.

- [ ] **Step 5: Commit**

```bash
git add src/data src/app/about/page.tsx
git commit -m "refactor(content): canonical types for work and about data"
```

---

### Task 2: Sanity schemas and Studio structure

**Files:**
- Create: `src/sanity/schemas/{caseStudy,experience,certification,skillGroup,impactMetric,operatingStance,principle}.ts`
- Modify: `src/sanity/schemas/index.ts`, `sanity.config.ts`

**Interfaces:**
- Produces document types: `caseStudy`, `experience`, `certification`,
  `skillGroup`, `impactMetric`, `operatingStance`, `principle`.
- `caseStudy` fields: `title`, `slug`, `company`, `industry`, `period`,
  `summary`, `challenge`, `process[]`, `solution`, `tradeOffs`,
  `technicalHurdles`, `retrospective`, `visual` (`c4|flow|dashboard|state-machine`),
  `outcomes[]{metric,description}`, `tags[]`, `featured`, `order`,
  `publishDate`, `articleUrl`.
- `experience`: `company`, `role`, `period`, `type`, `description`,
  `highlights[]`, `industries[]`, `logo` (image), `order`.
- `certification`: `name`, `issuer`, `issuedDate`, `credentialUrl`, `order`.
- `skillGroup`: `title`, `items[]`, `order`. `impactMetric`: `value`, `label`,
  `description`, `order`. `operatingStance`: `title`, `stance`, `example`,
  `order`. `principle`: `title`, `text`, `order`.

- [ ] **Step 1: Write the seven schema files**

Follow the shape of `src/sanity/schemas/post.ts`: `defineType` + `defineField`,
`validation` on required fields (`title`, `slug`, `summary`, `challenge`,
`solution`, `order` for every type), `preview` selecting the display field.
`slug` uses `options: { source: 'title', maxLength: 96 }`.

- [ ] **Step 2: Register them**

`src/sanity/schemas/index.ts`: `types: [blogPost, caseStudy, experience,
certification, skillGroup, impactMetric, operatingStance, principle]`.

- [ ] **Step 3: Group the Studio sidebar**

`sanity.config.ts`: `structureTool({ structure })` with
`structure.list().title('Work').items([S.documentTypeListItem('caseStudy')])`,
an `About` list with the six About types, and a `Journal` list with `post`.

- [ ] **Step 4: Verify**

Run: `npm run dev`, open `http://localhost:3000/studio`, sign in.
Expected: sidebar shows Work / About / Journal; Work contains Case study; a new
Case study document renders every field without errors.
Stop the dev server before the next build.

- [ ] **Step 5: Commit**

```bash
git add src/sanity/schemas sanity.config.ts
git commit -m "feat(sanity): schemas for case studies and about collections"
```

---

### Task 3: Migration script and data import

**Files:**
- Create: `scripts/migrate-content.mjs`
- Modify: `package.json`, `.env.example`

**Interfaces:**
- Produces: `npm run migrate:content` and `npm run migrate:content -- --dry-run`.
- Document `_id`s use **hyphens, never dots**: `caseStudy-<slug>`,
  `experience-<id>`, `certification-<id>`, `skillGroup-<slug(title)>`,
  `impactMetric-<order>`, `operatingStance-<order>`, `principle-<order>`.
  Sanity reserves dotted ids (`drafts.`, `versions.`) and denies them to
  anonymous readers, so a dotted id is invisible to the deployed site.
- `order` seeding: use the `order` values already written into
  `src/data/caseStudies.ts` by Task 1; every other collection = source array
  index.

- [ ] **Step 1: Write the script**

`scripts/migrate-content.mjs` imports the data with explicit `.ts` extensions
(Node type stripping) and `@sanity/client` `createClient`:

```js
// run with: node --env-file=.env.local --experimental-strip-types --no-warnings
import { caseStudies } from '../src/data/caseStudies.ts'
```

Behaviour: require `SANITY_API_WRITE_TOKEN` (exit 1 with a message if absent);
`--dry-run` prints `_id` + title per document and writes nothing; real runs use
`client.createOrReplace(doc)`; upload each `public/logos/*.png` with
`client.assets.upload('image', createReadStream(path), { filename })` but reuse
an existing asset when one with the same `originalFilename` exists; set
`logo: { _type: 'image', asset: { _type: 'reference', _ref } }`; print a final
count table; exit non-zero on any failure.

- [ ] **Step 2: Add the npm script and document the variable**

`package.json`: `"migrate:content": "node --env-file=.env.local --experimental-strip-types --no-warnings scripts/migrate-content.mjs"`.
`.env.example`: append a documented empty `SANITY_API_WRITE_TOKEN=` line.

- [ ] **Step 3: Dry run**

Run: `npm run migrate:content -- --dry-run`
Expected: 7 case studies, 6 experiences, 4 certifications, 4 skill groups,
4 metrics, 3 stances, 3 principles; `_type` and `_id` listed; exit 0.

- [ ] **Step 4: Import, then prove idempotence**

Run: `npm run migrate:content` → success summary.
Run it a second time → same counts, no duplicate `_id`s.
Verify in Studio that Work shows 7 case studies and About shows 20 documents.

- [ ] **Step 5: Commit**

```bash
git add scripts/migrate-content.mjs package.json .env.example
git commit -m "feat(content): one-shot migration from static data into Sanity"
```

---

### Task 4: Query layer, loader and the Work routes

**Files:**
- Create: `src/sanity/content.ts`, `src/content/caseStudies.ts`
- Modify: `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`,
  `src/app/sitemap.ts`, `src/components/WorkGrid.tsx`

**Interfaces:**
- `src/sanity/content.ts` exports `WORK_TAG = 'work'`, `ABOUT_TAG = 'about'`
  and `fetchCaseStudies(): Promise<FetchResult<CaseStudy[]>>`,
  `fetchCaseStudyBySlug(slug): Promise<FetchResult<CaseStudy | null>>`.
- `src/content/caseStudies.ts` exports:
  `getCaseStudies(): Promise<CaseStudy[]>` (never throws; falls back on `!ok`),
  `getCaseStudyBySlug(slug): Promise<{ status: 'ok'; caseStudy: CaseStudy } | { status: 'not-found' } | { status: 'unavailable' }>`,
  `getFeaturedCaseStudies(): Promise<CaseStudy[]>` (featured filter, `order` sort).
- `WorkGrid` gains `sortKey 'order'` as the default, with an `Order` button
  beside Date and Name.

- [ ] **Step 1: Write the Sanity queries**

One GROQ projection per type, shaped to the canonical interface
(`"id": _id`, `"slug": slug.current`), draft-filtered, cached with
`next: { tags: [WORK_TAG] }`. Ordering differs by shape: `caseStudy` uses
`| order(order asc, publishDate desc)`; About collections have no `publishDate`
and use `| order(order asc)`. Wrap in the `FetchResult` try/catch pattern
already used in `src/sanity/queries.ts`.

- [ ] **Step 2: Write the loader**

Map each document to `CaseStudy`; resolve `logo` (About types) with
`urlFor(doc.logo).width(72).height(72).url()`. Apply the fallback rule: `ok` →
Sanity (even empty); `!ok` → `console.error('[content] …')` and return the
static array. `org` ordering for the fallback mirrors `order`.

- [ ] **Step 3: Switch the Work routes**

`/work/page.tsx`: `const caseStudies = await getCaseStudies()`.
`/work/[slug]/page.tsx`: `generateStaticParams`, `generateMetadata` and the page
call `getCaseStudyBySlug`; `not-found` → `notFound()`; `unavailable` → render
`src/components/ContentUnavailable.tsx` (new, copy the blog's panel wording).
Add `export const revalidate = 3600`. `sitemap.ts`: use `getCaseStudies()`.

- [ ] **Step 4: Verify**

Run: `npm run build` (exit 0) then `npm run start -- -p 3010` and
`curl -s localhost:3010/work` → 7 study titles present; one study page → its
challenge and outcome text present; `/sitemap.xml` lists all 7 work URLs.
Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/sanity/content.ts src/content src/app/work src/app/sitemap.ts src/components
git commit -m "feat(work): read case studies from Sanity with static fallback"
```

---

### Task 5: About and home read from the CMS

**Files:**
- Create: `src/content/about.ts`
- Modify: `src/app/about/page.tsx`, `src/app/page.tsx`,
  `src/components/SkillsGrid.tsx`, `src/components/HowIOperate.tsx`,
  `src/components/Hero.tsx`

**Interfaces:**
- `src/content/about.ts` exports `getExperiences`, `getCertifications`,
  `getSkillGroups`, `getImpactMetrics`, `getOperatingStances`, `getPrinciples`,
  each `Promise<T[]>` and never throwing.
- Components take their data as props instead of importing `src/data/`:
  `SkillsGrid({ groups })`, `HowIOperate({ stances })`, `Hero({ metrics })`.

- [ ] **Step 1: Write the loader** with the same fallback rule and `ABOUT_TAG`.

- [ ] **Step 2: Pass data down**

Turn the three components into pure renderers of props (they stay `'use client'`
where they already are). Pages `await` the loaders and pass results.

- [ ] **Step 3: Derive the counts and handle empty collections**

Replace hardcoded numbers: "Seven products I've shaped" → `{caseStudies.length}`
or drop the number; "Five selected case studies" → length; "six chapters" →
`experiences.length`; "Three working stances" → `stances.length`; replace
`+{experiences.length - 4}` with a derived, non-negative value.

Empty-collection rules, applied per section: the home featured card renders only
when `featured.length > 0`; the case-study and experience sections render
nothing (not an empty grid) when their array is empty; the metrics row and the
skills grid hide when empty; a `principles` or `stances` array with fewer than
three items still renders, wrapping in the existing grid.

- [ ] **Step 4: Verify**

Run: `npm run build`, then `npm run start -- -p 3010` and
`curl -s localhost:3010/about | grep -c "Doitpay"` → ≥1; home → metrics, study
titles and the three stances present. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/content/about.ts src/app/about src/app/page.tsx src/components
git commit -m "feat(about): read experiences, skills and metrics from Sanity"
```

---

### Task 6: Revalidation for the new types

**Files:**
- Modify: `src/app/api/revalidate/route.ts`, `README.md`

**Interfaces:**
- Route branches on `payload._type`; response gains `tag` and `paths`.

- [ ] **Step 1: Branch the route**

`post` → `posts` + `/blog` + `/blog/<slug>` (unchanged). `caseStudy` → `work` +
`/`, `/work`, `/work/<slug>`, `/sitemap.xml`. Other Work/About types → `about`
+ `/`, `/about`. Unknown type → 200 with `revalidated: false`. Draft `_id`s and
the secret check keep their current behaviour.

- [ ] **Step 2: Verify locally**

With the secret set, `curl -s -X POST localhost:3010/api/revalidate -H
'x-sanity-webhook-secret: <secret>' -H 'content-type: application/json' -d
'{"_type":"caseStudy","slug":{"current":"transfez-mobile-app"}}'` → 200 with
`tag: "work"` and the four paths. A wrong secret → 401.

- [ ] **Step 3: Document the webhook change**

README: the filter becomes
`_type in ["post","caseStudy","experience","certification","skillGroup","impactMetric","operatingStance","principle"]`,
and note the filter must be updated in sanity.io/manage.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/revalidate/route.ts README.md
git commit -m "feat(revalidate): purge work and about caches on publish"
```

---

### Task 7: Content copy guard and CI

**Files:**
- Create: `scripts/check-content.mjs`
- Modify: `package.json`, `.github/workflows/ci.yml`

**Interfaces:**
- `npm run check:content` exits 0 when Sanity is unreachable, exits 1 only on a
  banned copy pattern in a migrated type.
- Prints a count per type as information; an empty collection is not a failure.

- [ ] **Step 1: Write the script**

Fetch every migrated type with a `*[_type == $type]` query, walk the string
fields, and apply: em dash in prose, filler words from the existing rule table,
and the generic CTA list. Ignore `post`. Report `type.field (document _id)` for
each hit. The migrated copy is verified clean today (no em dashes or filler
words in `src/data/`), so this guard passes on day one and only catches future
edits.

- [ ] **Step 2: Add script and CI step**

`package.json`: `"check:content": "node --env-file=.env.local --no-warnings scripts/check-content.mjs"`.
CI: run it after `npm run check:ui`, with `continue-on-error: false` but relying
on the unreachable→0 behaviour.

- [ ] **Step 3: Verify**

Run: `npm run check:content` → prints counts, exits 0.
Temporarily create a document with `summary` containing "seamless" in Studio,
re-run → exits 1 naming that field; delete the document.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-content.mjs package.json .github/workflows/ci.yml
git commit -m "feat(ci): guard Studio-authored copy against slop patterns"
```

---

### Task 8: Documentation and end-to-end verification

**Files:**
- Modify: `README.md`, `CLAUDE.md`, `AGENTS.md`, `docs/unslop-ui.md`

- [ ] **Step 1: Update the docs**

README: scripts table gains `migrate:content` and `check:content`; the content
section explains that Work and About come from Sanity with a static fallback;
the webhook filter is documented. `CLAUDE.md` / `AGENTS.md`: the line "Content
lives in `src/data/`" becomes "Work and About content comes from Sanity via
`src/content/`; `src/data/` is a frozen outage fallback, not an editing path."

- [ ] **Step 2: Full gate**

Run: `npm run check:ui && npm run check:content && npm run lint && npm run typecheck && npm run build`
Expected: all exit 0.

- [ ] **Step 3: Outage drill**

Run the server with `NEXT_PUBLIC_SANITY_PROJECT_ID=invalid` and confirm `/`,
`/about`, `/work` and a case study still render the fallback content; confirm a
slug that exists only in Sanity shows the unavailable panel, not a 404.

- [ ] **Step 4: Empty-collection drill**

In Studio, unpublish all case studies; confirm `/`, `/work` and `/about` render
without errors and without an empty featured card. Republish.

- [ ] **Step 5: Commit**

```bash
git add README.md CLAUDE.md AGENTS.md docs/unslop-ui.md
git commit -m "docs: describe the Sanity-backed content model"
```
