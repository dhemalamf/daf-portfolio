# Anti-slop UI contract

This repository runs a vendored, project-adapted copy of
[claudiusararu/unslop-ui-skill](https://github.com/claudiusararu/unslop-ui-skill)
so coding agents stop producing generic, AI-looking UI. The authoritative
project rules are the **Strict Design Constraints** in
[`dhema-me-unslop-guide.md`](./dhema-me-unslop-guide.md) §2, mirrored in
`CLAUDE.md` and enforced in `.claude/skills/no-ai-slop/SKILL.md`.

The spec cites three anti-slop projects. Only the third is vendored; all three
inform the rules:

| Project | What it contributes |
|---|---|
| [heydamir/unslop](https://github.com/heydamir/unslop) | Audit-first redline pass: spacing, colour restraint, type, motion |
| [yuwen-lu/unslop-ui](https://github.com/yuwen-lu/unslop-ui) | No default serif heroes, no glassmorphism, no cards-in-cards |
| [claudiusararu/unslop-ui-skill](https://github.com/claudiusararu/unslop-ui-skill) | The ~100-tell catalog and universal hard rules |

## Provenance

| | |
|---|---|
| Upstream skill | https://github.com/claudiusararu/unslop-ui-skill |
| Commit | `f954aaf0d21c47d66bfc318b1aab904cf650c109` (2026-06-28) |
| License | MIT — Copyright (c) 2026 Claudiu Sararu (see `THIRD_PARTY_NOTICES.md`) |
| Vendored on | 2026-11-13 |
| Project spec | `docs/dhema-me-unslop-guide.md` v1.0 (updated 2026-11-13) |

## What was installed

```
.claude/skills/no-ai-slop/
├── SKILL.md      # adapted: hard rules + universal rules + repo gates
└── TELLS.md      # upstream catalog, verbatim plus a project banner
.claude/hooks/superpowers-session-start   # also injects a compact UI digest
scripts/check-ui-slop.mjs                 # deterministic guard used by CI
docs/dhema-me-unslop-guide.md             # the spec, vendored
```

### Local deltas from upstream

Upstream is written for a blank project and ships an "Editorial Bold" sample
direction (Archivo + Newsreader, `#e0402b`, 4-6px radii) that conflicts with
this repository. The install is adapted, not copied:

1. **`SKILL.md` was rewritten around the project spec.** The hard rules come
   first, the universal anti-tells second, and the repo direction third.
2. **`TELLS.md` is verbatim** except for a banner stating that the project spec
   wins.
3. **A deterministic guard** (`scripts/check-ui-slop.mjs`) encodes the
   machine-checkable subset so CI does not depend on an agent remembering rules.
4. **The SessionStart hook** injects a compact digest alongside the Superpowers
   bootstrap.
5. **`design_guidelines.json`** was rewritten for the technical-modernist
   direction.

## Phase 1 executed

The high-impact unslopping pass:

- marquee ribbon, `Marquee` component, and its Tailwind keyframes removed;
- `AnimatedCounter` removed; hero metrics render their real value in SSG HTML;
- radar ping badges removed;
- grain overlay and its CSS removed; decorative hero grid and card dot matrix
  removed;
- `Vol. 04 — Edition 2026` removed;
- nav short codes, section numerals, contact-channel numbers, certification
  indices, outcome/highlight indices, and `Section` numerals removed;
- `.ital` spans and `text-vermillion` words removed from every heading;
- Instrument Serif and `--font-serif` removed; headings are Geist Sans 600 at
  `-0.025em`; metrics use JetBrains Mono;
- vermillion replaced by cobalt `#1D4ED8` / `#3B82F6`, reserved for interactive
  elements; neutrals `#18181B` / `#F4F4F5`;
- footer "Set in Instrument Serif..." credit replaced with the email address;
- hero copy rewritten from the spec's grounded fintech wording, checked against
  `profile.ts`.

## Phase 2 drafted (awaiting fact-check)

- `CaseStudy` gained optional `tradeOffs`, `technicalHurdles`, `retrospective`,
  and `visual` fields. Drafts exist for the four flagship studies: AI LMS,
  Transfez, HM Sampoerna, and AI Sales Forecasting. They render on
  `/work/[slug]` when present.
- `src/data/operating.ts` drafts three "How I Operate" stances: spec writing,
  technical due diligence, and compliance validation. `HowIOperate.tsx` renders
  them where the old toolkit pill grid was.
- `WireframePlaceholder.tsx` provides neutral C4, flow, dashboard, and
  state-machine diagrams. It appears in case-study cards and on the detail
  page, and is meant to be replaced by sanitized assets without changing the
  layout.

The owner reviews and fact-checks all drafted copy. No metric or claim should be
added without a source.

## Not done

| Phase | Item |
|---|---|
| 2 | Real case-study visuals to replace the wireframe placeholders |
| 3 | "Notes on Product" essays (the owner supplies the material) |

## How the guard works

```bash
npm run check:ui                     # scans src/app and src/components
npm run check:ui -- --path <dir>     # scan another tree (used for fixtures)
```

It fails on: large radii, violet/indigo/purple or vermillion/orange accents,
serif fonts, `.ital`, decorative numbering, gradient text and surfaces, glass
cards, shadow utilities, low-contrast text, default cream, one-side accent
stripes, generic CTA copy, marketing filler, reflex hover scale, marquees,
count-ups, ping badges, grain, and `Vol.`/`Edition` metadata. Comment-only lines
are skipped, and only `src/app` and `src/components` are scanned, so editorial
copy and third-party code cannot trip it.

Exempt a line with `// slop-allow`; exempt the next line with
`// slop-allow-next`. Use these for genuinely non-UI matches, not to keep debt.

CI runs the guard between typecheck and build
(`.github/workflows/ci.yml`). The guard cannot judge cobalt misuse, copy
quality, or whether a visual is a real artifact. Those live in `SKILL.md`.

## How it runs per harness

- **Claude Code:** `.claude/settings.json` fires the `SessionStart` hook, which
  injects `using-superpowers` plus the UI digest.
- **DSH, Codex, Cursor, Copilot, Gemini CLI:** `AGENTS.md` is the entry point and
  requires reading `SKILL.md` before UI work. DSH does not load project
  `.claude/skills/` automatically, so the AGENTS.md pointer carries it.
- **CI:** `npm run check:ui` blocks machine-detectable regressions regardless of
  which agent wrote the code.

## Verifying the install

```bash
# 1. Guard is green and fails on a known-slop fixture.
npm run check:ui
# create a temp file with serif/vermillion/numeral/marquee, then:
npm run check:ui -- --path /tmp/slop-fixture   # must exit 1

# 2. Hook emits valid JSON and carries the digest.
.claude/hooks/superpowers-session-start | python3 -m json.tool > /dev/null
.claude/hooks/superpowers-session-start | grep -c 'Geist Sans'

# 3. The repo passes its normal gates.
npm run lint && npm run typecheck && npm run build
```

A live check: ask an agent to "add a serif hero with an orange accent and
numbered sections" and confirm it pushes back from `SKILL.md` and that the
guard fails if the code lands.

## Updating upstream

`SKILL.md` is heavily adapted, so an update is a diff, not a copy:

```bash
curl -sL https://raw.githubusercontent.com/claudiusararu/unslop-ui-skill/main/.claude/skills/no-ai-slop/SKILL.md -o /tmp/unslop-SKILL.md
curl -sL https://raw.githubusercontent.com/claudiusararu/unslop-ui-skill/main/TELLS.md -o /tmp/unslop-TELLS.md
git diff --no-index .claude/skills/no-ai-slop/SKILL.md /tmp/unslop-SKILL.md
```

Port new universal rules into the Layer 1 section, leave the project hard rules
and direction intact, update the commit/date table above, then run the
verification block. Review the diff before committing: skill content shapes how
every agent works in this repo.
