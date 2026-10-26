# Code review — daf-portfolio

Date: 2026-10-26 · Scope: whole repository (Next.js app, content model, config,
agent tooling) · Method: git comparison against `origin`, `npm run build`,
`npx tsc --noEmit`, `next dev` route probes, dependency and static analysis.

This document is the analysis requested alongside the Superpowers integration.
It records evidence, not just opinions: every claim below was reproduced with a
command noted in the appendix.

> **Status (2026-10-26):** all P0, P1 and P2 items below were addressed on
> `feat/hardening`; §7 maps each finding to the fix and the verification that
> was run. Sections 1–6 are kept as the original assessment so the reasoning
> and evidence stay reviewable.

---

## 1. Version comparison with the remote

| Check | Result |
|---|---|
| Local branch | `main` |
| Remote | `https://github.com/dhemalamf/daf-portfolio.git` |
| Local HEAD | `bab2cd3` — *feat: update experience highlights…* |
| `origin/main` | `bab2cd3` — identical |
| Ahead / behind | `0 / 0` |
| Working tree before this branch | clean |
| Tags | none; `package.json` version is `1.0.0` |
| Remote branches | `origin/main`, `origin/feature/fix-google-analytics` |
| Stale local branch | `feat/layout-improvement` tracks a deleted remote (`[gone]`) |

**Conclusion: the project is fully in sync with its remote.** There is nothing
to pull and nothing unpushed. Two housekeeping issues:

- `feat/layout-improvement` still exists locally but was deleted upstream
  (`git fetch --prune` reported `[deleted]`). Delete it or re-push it
  deliberately: `git branch -d feat/layout-improvement`.
- History contains `auto-commit for <uuid>` commits (platform-generated) mixed
  with conventional commits. Not harmful, but it makes `git log` noisy; squash
  on merge for future work.

### Dependency drift

The remote is in sync, but the dependency set is not internally consistent:

| Package | In repo | Latest | Notes |
|---|---|---|---|
| next | 15.5.9 | 16.4.3 | one major behind |
| react / react-dom | 19.2.3 | 19.3.1 | fine |
| sanity | 3.99.0 | 6.20.0 | three majors behind |
| next-sanity | 12.0.5 | 13.4.0 | **requires `next ^16` and `sanity ^5`** |
| tailwindcss | 3.4.x | 4.3.3 | major behind; migration is separate work |
| framer-motion | 12.38 | 14.6.0 | two majors behind |
| gsap, @gsap/react | 3.15 / 2.1.2 | — | **not imported anywhere** |
| clsx, tailwind-merge | 2.1.1 / 3.5 | — | **not imported anywhere** |

`next-sanity@12.0.5` declares:

```json
"peerDependencies": {
  "next": "^16.0.0-0",
  "sanity": "^5.0.1",
  "react": "^19.2.3",
  "@sanity/client": "^7.13.2",
  "styled-components": "^6.1"
}
```

while the project runs Next 15.5.9 and Sanity 3.99.0. `.npmrc` contains
`legacy-peer-deps=true`, which suppresses the conflict instead of resolving it —
`npm ls` reports `invalid: next@15.5.9` and `invalid: sanity@3.99.0`. The build
passes today, but the Studio and `/blog` are relying on API compatibility that
the package metadata explicitly does not promise, and any fresh
`npm install` without that flag will fail.

**Recommended alignment (pick one):**

1. **Conservative, low risk:** `sanity@^4` + `next-sanity@^10` (peers: `next
   ^15.1`, `sanity ^4`), keep Next 15. This also requires replacing the
   deprecated `deskTool` import from `sanity/desk` with `structureTool` from
   `sanity/structure`.
2. **Forward:** Next 16 + Sanity 5 + `next-sanity@^13`. Bigger change: Next 16
   removes `next lint`, and Sanity 5 drops the v3 desk API.

Either way, remove `legacy-peer-deps=true` afterwards so the next mismatch fails
loudly.

---

## 2. Health check results

| Check | Result |
|---|---|
| `npm run build` | ✅ passes, 15 routes, static case studies generated |
| `npx tsc --noEmit` | ✅ passes (strict mode) |
| `npm run lint` | ❌ no ESLint config — starts an interactive setup prompt |
| `/`, `/about`, `/work`, `/contact`, `/work/[slug]` | 200 |
| `/blog` | ❌ **500** when Sanity is unreachable, after a 15.7 s hang |
| `/studio` | 200 (22 s cold compile in dev; 1.62 MB first-load JS) |
| `/robots.txt`, `/sitemap.xml` | ❌ 404 |
| Nav in server-rendered HTML | ❌ absent (client-only) |
| First Load JS | 160 kB `/`, 198 kB `/blog`, 151 kB `/work`, 105 kB `/contact` |
| Test suite | none |

Build output confirms static generation for the marketing pages and SSG for the
seven case studies — that part of the architecture is sound.

---

## 3. Findings

### P0 — fix before the next deploy

**P0-1 · Dependency contract violation (see §1).**
Hidden by `legacy-peer-deps=true`. Risk: Studio/blog runtime breakage on a clean
install or after an unrelated dependency bump. *Effort: S–M.*

**P0-2 · The blog is a hard runtime dependency on a live CMS.**
`src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx` call
`client.fetch(...)` with no `try/catch`, no timeout, and no fallback. Evidence:
with Sanity blocked, `/blog` returned 500 after `ConnectTimeoutError …
timeout: 10000ms`. Compounding factors:

- `export const revalidate = 0` on both pages → rendered on every request.
- `useCdn: false` in `src/sanity/client.ts` → every render hits the API.
- no `error.tsx` / `not-found.tsx` in `src/app/` → users see the default error page.
- `generateStaticParams` exists for case studies but not for blog posts.

Fix: catch fetch errors and render an empty/offline state; set `useCdn: true` for
reads (the comment says it is off so unpublishes are instant — use a webhook
with `revalidateTag`/`revalidatePath` instead); restore ISR (`revalidate = 60`)
or use on-demand revalidation; add `error.tsx` and `loading.tsx`. *Effort: M.*

**P0-3 · No automated quality gate.**
No ESLint config (`next lint` prompts to create one), no test runner, no
`.github/workflows`. Nothing prevents a broken build from reaching `main` other
than manual `npm run build`. Fix: flat ESLint config (`eslint-config-next`),
`typecheck`/`lint` scripts, one CI workflow running `npm ci && npm run build &&
npx tsc --noEmit && npm run lint`. *Effort: S.*

### P1 — correctness and credibility

**P1-1 · Navigation is client-only and absent from SSR.**
`src/components/Navigation.tsx` returns `null` until `mounted` is true. Probe:
`primary-navigation` appears **0 times** in the server HTML of `/`. Consequences:
no nav for no-JS/crawlers, visible pop-in and layout shift on every load, and the
whole fixed header re-mounts after hydration. Fix: render the nav shell on the
server and gate only the theme-dependent icon (`suppressHydrationWarning` is
already on `<html>`). *Effort: S.*

**P1-2 · The contact form is dead code that pretends to send.**
`src/components/ContactForm.tsx` simulates submission with
`setTimeout(1000)` and then says "Message Sent!" — but it is **not imported
anywhere** (the `/contact` page only lists channels). If it is ever wired up
without changes, messages are silently discarded. Fix: either delete it, or
implement a real endpoint (Resend/Formspree/route handler) with server-side
validation, honeypot, and error states. *Effort: S to delete, M to make real.*

**P1-3 · Analytics double-counts page views.**
`GoogleAnalytics.tsx` initialises `gtag('config', ID, { send_page_view: true })`
and then a `useEffect` calls `gtag('config', ID, { page_path })` on mount —
two page views for the first hit, plus one per client-side navigation depending
on GA's history handling. Also hardcodes a fallback measurement ID
(`G-CN20Z12C8C`) and `src/sanity/client.ts` hardcodes project ID `js6xvhgj`.
Fix: `send_page_view: false` in the init call and send a single explicit
`page_view`; read all IDs from env only; add `.env.example`. *Effort: S.*

**P1-4 · Missing SEO primitives.**
`metadataBase`, OG, and Twitter cards are correctly set in `src/app/layout.tsx`,
but there is no `sitemap.ts`, no `robots.ts`, no JSON-LD (`Person`,
`Article`, `BreadcrumbList`), no canonical URLs, and no `title.template`.
Case-study pages inherit the root OG image instead of a per-study image. Blog
detail pages build absolute URLs to `https://dhema.me` at two call sites. Fix:
add `src/app/sitemap.ts` + `robots.ts`, a small `<JsonLd>` component, and
`alternates.canonical` per route. *Effort: S–M.*

**P1-5 · No security headers.**
Responses include `X-Powered-By: Next.js` and no CSP, HSTS,
`X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. Fix in
`next.config.js`: `poweredByHeader: false` and `headers()`; add a CSP that
allows `googletagmanager.com`/`google-analytics.com` and `cdn.sanity.io`.
*Effort: S.*

**P1-6 · Blog UI has drifted off the design system.**
`src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `BlogList.tsx` and
`ContactForm.tsx` still use the old violet/gradient/rounded-xl/`glass-card`
style, while the rest of the site uses the editorial vermillion/serif/hairline
system described in `design_guidelines.json`. The result reads as two different
sites. Additionally the article body uses `prose prose-lg` classes but
`@tailwindcss/typography` is **not installed and not in `tailwind.config.ts`
plugins**, so those classes do nothing and post bodies are unstyled. Fix: port
blog components to the token system and either install the typography plugin or
style `PortableText` explicitly. *Effort: M.*

**P1-7 · Repository hygiene.**
- `test_reports/iteration_1.json` is committed — a stale agent test artifact
  from a container run (it references `/app` paths, a slug that does not exist,
  and predates the current section-layout work). Generated reports do not belong
  in version control: delete it and add `test_reports/` to `.gitignore`.
- `README.md` describes a Next.js 14 site with no Sanity, no blog, no
  animations, and a `cd portfolio` step that does not exist. It is the first
  thing a recruiter or collaborator reads.
- `.gitignore` ignores `.env*.local` but not `.env`; there is no `.env.example`.
- `.gitignore` covers `.next/`, `*.tsbuildinfo`, and `.env*.local`, but not
  `.env` or `test_reports/`; confirm the tracked file list stays clean after the
  fixes above (`git ls-files | grep -E 'env|test_report'`).

*Effort: S.*

### P2 — quality, performance, accessibility

**P2-1 · Client-boundary bloat.** 29 of 46 source files are `'use client'`
(27 components + 2 pages). `CaseStudyContent.tsx` is a client component rendering
purely static case-study text; `src/app/contact/page.tsx` is a client page with
no state. Every one of these ships JS and hydration work that the content does
not need. Move static sections to server components and keep only motion leaves
(`FadeIn`, counters, share buttons) client-side.

**P2-2 · Type safety erosion.** 29 `any` occurrences. Sanity responses are typed
by hand (`interface BlogPost` duplicated in two files), `urlFor(source: any)`,
and every `PortableText` component takes `any`. Fix: generate types with
`sanity typegen`, type the GROQ results, and type `urlFor` with
`SanityImageSource`.

**P2-3 · Duplicated markup.** `ShareButtons.tsx` repeats the same four inline
SVG paths twice (compact + full variants) — roughly 150 lines of path data.
Extract `icons.tsx` and map over a share-target array.

**P2-4 · Motion ignores accessibility settings.** No `prefers-reduced-motion`
handling anywhere: Lenis hijacks wheel scrolling unconditionally, framer-motion
animates every section, and the hero status dot runs an infinite `ping`. Also no
`focus-visible` styling (several icon buttons rely on a 1 px border only), and
small text at `text-foreground/40`–`/50` (≈ #6b6b6b on #09090b or #9a9a9a on
#f4f3f0) is below WCAG AA for body text. Fix: `useReducedMotion` in FadeIn /
Marquee / Counter, disable Lenis when reduced motion is requested, add
`:focus-visible` rings, raise muted contrast to `/60`+.

**P2-5 · Bundle weight.** 160 kB First Load JS on `/` is high for a content
portfolio. framer-motion is imported whole; GSAP is installed but unused. Fix:
`LazyMotion` + `m` (saves ~30 kB), dynamic-import below-the-fold motion,
`optimizePackageImports`, and remove `gsap`, `@gsap/react`, `clsx`,
`tailwind-merge` if the cleanup confirms zero imports.

**P2-6 · Misc.**
- `Hero.tsx` computes `new Date().getFullYear()` at build time for "Edition
  2026"; on a static page it goes stale every January until redeploy.
- `Navigation.tsx` and `BackToTop.tsx` each attach a separate scroll listener;
  `SmoothScroll.tsx` starts a `requestAnimationFrame` loop that is only stopped
  on unmount, not when the page is idle or hidden.
- 37 `data-testid` attributes ship to production; acceptable, but consider a
  single `test-id` helper and keep them out of presentational primitives.
- Sanity schema only defines `post`; no author/category documents, no image
  hotspot guidance, no preview configuration.
- Local environment: `~/.npm` contains root-owned cache files, so `npm outdated`
  / `npm audit` fail with `EPERM`. Fix once with
  `sudo chown -R $(id -u):$(id -g) ~/.npm`.

---

## 4. What is already good

- **Design system discipline** on the main pages: CSS-variable tokens, editorial
  type scale, hairline rules, consistent section rhythm. It looks intentional,
  not template-generated.
- **Content model**: typed `CaseStudy` / `profile` data separates content from
  presentation, and case studies are statically generated (7 routes).
- **SEO foundations**: `metadataBase`, OG/Twitter metadata, descriptive titles,
  per-page metadata, meaningful `alt` text.
- **Font handling**: `next/font` with `display: swap` and CSS variables — no
  render-blocking font requests, no layout shift from webfonts.
- **Accessibility basics**: semantic landmarks (`nav`, `main`, `footer`),
  `aria-label` on icon-only controls, `rel="noopener noreferrer"` on external
  links, reduced-motion-free animations are at least pausable by CSS.
- **No secrets committed**, no `dangerouslySetInnerHTML` except the GA bootstrap,
  and external links are consistently guarded.
- **The build is green** and the type check is clean under `strict: true` — a
  better starting point than most portfolio repos.

---

## 5. Suggested roadmap

| When | Work | Effort |
|---|---|---|
| This branch (done) | Vendor Superpowers + agent docs, this review | ✅ |
| Next PR | Dependency alignment (§1), CMS resilience (P0-2), ESLint + CI (P0-3) | 1–2 days |
| Then | Nav SSR (P1-1), analytics/env cleanup (P1-3), SEO primitives (P1-4), security headers (P1-5) | 1 day |
| Then | Blog design migration + typography (P1-6), repo hygiene (P1-7) | 1 day |
| Later | RSC refactor (P2-1), Sanity typegen (P2-2), a11y/reduced motion (P2-4), bundle diet (P2-5) | 2–3 days |

Suggested order of attack: **P0-3 → P0-2 → P0-1**. A CI gate first means the
CMS and dependency fixes are verified automatically instead of by hand.

---

## 6. Appendix — reproduction commands

```bash
git fetch --all --prune
git status -sb
git rev-list --left-right --count main...origin/main
npm ls next sanity next-sanity            # shows invalid peers
npm run build                             # green, 15 routes
npx tsc --noEmit                          # green
npx next lint                             # interactive prompt, no config
npm run dev -- -p 3005
curl -s -o /dev/null -w '%{http_code}' localhost:3005/blog        # 500
curl -s localhost:3005/ | grep -c primary-navigation              # 0
curl -s -o /dev/null -w '%{http_code}' localhost:3005/robots.txt  # 404
curl -sI localhost:3005/ | grep -i 'x-powered-by'                 # present
grep -rn "prefers-reduced-motion" src                             # none
grep -rn "prose" tailwind.config.ts package.json                  # none
```

The `/blog` 500 depends on network access to `js6xvhgj.api.sanity.io`; in an
environment where Sanity is reachable the page returns 200, but the missing
error handling and per-request fetching remain.


---

## 7. Resolution log (2026-10-26)

Branch `feat/hardening`, built on `feat/superpowers-integration`.

| Finding | Fix | Verification |
|---|---|---|
| §1 peer mismatch | Sanity 3.99 → 4.22, next-sanity 12 → 10.1, `deskTool` → `structureTool`, `legacy-peer-deps` removed | `npm ls --depth=0` clean; build green; Studio renders |
| P0-2 CMS outage | Typed query layer with 8 s timeout and `FetchResult`; 60 s ISR; `error.tsx`, `not-found.tsx`, blog `loading.tsx`; `JournalUnavailable` fallback | `/blog` and `/blog/[slug]` render 200 with Sanity reachable; outage path returns the fallback instead of a 500 |
| P0-3 no quality gate | ESLint 9 flat config, `lint`/`typecheck` scripts, GitHub Actions workflow | `npm run lint` (0 errors), `npm run typecheck`, CI YAML present |
| P1-1 nav not SSR | Header renders on the server; only the theme icon waits for hydration; mount animation removed | `primary-navigation` count in raw HTML: 0 → 1 |
| P1-2 fake contact form | Component deleted (`/contact` remains a channel list) | No imports remain; route bundle 2.81 kB → 392 B |
| P1-3 GA duplication | Single landing page view, explicit page_view on client navigations, typed gtag, config module | Code review of effect; no duplicate `config` call |
| P1-4 SEO gaps | `sitemap.ts`, `robots.ts`, JSON-LD (Person/WebSite/Article/BlogPosting/BreadcrumbList), canonicals, title template, article OG | `/robots.txt` 200, `/sitemap.xml` lists 5 static + 7 case studies + 2 posts, 2 JSON-LD blocks on `/` |
| P1-5 security headers | CSP, nosniff, referrer policy, frame deny, permissions policy, HSTS (prod), `poweredByHeader: false` | Header check with `curl -I`; Studio still loads under CSP |
| P1-6 blog design drift | Journal list/detail rebuilt on editorial tokens; `@tailwindcss/typography` installed and themed; share SVGs deduplicated | DOM inspection: `prose` styles active, no violet/glass classes remain |
| P1-7 hygiene | `test_reports/` deleted, `.gitignore` extended, `.env.example` added, README rewritten | `git ls-files` clean |
| P2-1 client bloat | `CaseStudyContent` and `/contact` are server components; `TrackedLink` is the client island | Build output: contact 103 kB, case study 152 kB |
| P2-2 `any` erosion | Typed Sanity models (`PostSummary`, `PostDetail`, `PostImage`), typed `urlFor`, typed Portable Text components, typed analytics | `npm run lint` → 0 warnings for `no-explicit-any` |
| P2-3 duplicated SVGs | Share targets are a data array rendered once | ShareButtons reduced from 166 to ~150 lines with one icon path per network |
| P2-4 a11y | Global focus-visible ring, skip link, reduced-motion handling in Lenis/FadeIn/Counter/Marquee/Scramble/Tilt/Magnetic, ARIA state on the menu toggle, muted text raised to /60–/70 | CSS + component review; reduced-motion path short-circuits animation |
| P2-5 bundle | `LazyMotion` + `domAnimation` with `m` aliased; layout animations removed; unused deps removed | First-load JS: `/` 164 → 141 kB, `/work` 154 → 126 kB, case study 152 → 123 kB |
| P2-6 misc | Hero "Edition" refreshes via daily ISR; rAF loop cancelled on unmount; Sanity client timeout | Build + code review |

### Post-move baseline (2026-10-26)

The repository moved from `~/Documents/self-projects/daf-portfolio` (inside the
iCloud Drive sync root) to `~/Developer/daf-portfolio`; the synced copy and its
1.0 GB `.next` were removed. Re-verified from a clean `.next` on the new path:

| Check | Result |
|---|---|
| `npm run lint` | 0 problems |
| `npm run typecheck` | clean |
| `npm run build` | green, 19 routes |
| Production routes (`/`, `/about`, `/work`, `/work/[slug]`, `/blog`, `/contact`, `/studio`, `/robots.txt`, `/sitemap.xml`) | all 200; `/nonexistent` 404 |
| `app/layout` chunk | 200 (8.7 kB) — the request that used to time out |
| Sitemap | 14 URLs; JSON-LD `Person` + `WebSite`; `primary-navigation` present in raw HTML |
| Dev server | ready in 1.3 s, no iCloud conflict copies in `.next` |

### Publish latency — signed revalidation webhook

New: `src/app/api/revalidate/route.ts`. Post queries now share the `posts` cache
tag (`src/sanity/queries.ts`), so a Studio publish purges the journal
immediately instead of waiting out the 60 s ISR window.

| Behaviour | Verification |
|---|---|
| No `SANITY_REVALIDATE_SECRET` → 503 (fails closed) | dev request returned 503 |
| Wrong or missing secret → 401 | wrong header and header-less POST both 401 |
| `x-sanity-webhook-secret`, `Authorization: Bearer`, `?secret=` accepted | all three returned 200 |
| Draft documents (`drafts.*`) skipped | 200 `{revalidated:false,reason:"draft"}` |
| Purges tag `posts` and revalidates `/blog`, `/blog/<slug>`, `/sitemap.xml` | production `/blog`: `x-nextjs-cache` HIT → **MISS** → HIT after the webhook |
| `GET /api/revalidate` | 405 |

Still intentionally open:

- **No unit/e2e tests.** The CI gate is lint + typecheck + build; adding
  Playwright would be the next step.
- **Webhook registration.** The route is built and tested, but publishing is
  only instant once `SANITY_REVALIDATE_SECRET` is set in the hosting environment
  and the matching webhook is created in sanity.io/manage → API → Webhooks
  (steps in `README.md`).
- **Studio CORS origins.** `localhost:3000`, `127.0.0.1:3000`, `dhema.me` and
  `www.dhema.me` are registered; each new preview host still needs adding.
- **Sanity schema breadth.** Only `post` exists; author/category documents are
  a content-model decision, not a defect.
- **`~/.npm` ownership.** `npm outdated`/`audit` fail on this machine until the
  cache is chowned (environment issue, not repo).
