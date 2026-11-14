# Personal Website Revamp Specification & Anti-Slop Directive
**Target Domain:** [dhema.me](https://dhema.me)  
**Author:** Dhema'alam Fajrianto (Product Manager)  
**Document Version:** 1.0  
**Objective:** Transform `dhema.me` from a generic "vibe-coded" AI template into a distinctive, credible, and senior Product Manager portfolio.

---

## 1. Context & Anti-Slop Repositories

When coding agents (Claude Code, Cursor, Windsurf, v0, Bolt) build without constraints, they default to the statistical median of their training set: `Instrument Serif + Geist`, purple/vermillion accent highlights, moving text marquees with star emojis (`✦`), faux magazine editions, and formulaic 3-column card layouts.

To constrain future AI coding sessions and stop the agent from recycling these defaults, reference and integrate these proven open-source anti-slop guidelines:

1. **[heydamir/unslop](https://github.com/heydamir/unslop)**  
   *Focus:* Systematic audit and cleanup pass for vibe-coded AI sites (redline review for spacing, color restraint, typography, and motion).
2. **[yuwen-lu/unslop-ui](https://github.com/yuwen-lu/unslop-ui)**  
   *Focus:* Hard design rules against AI anti-patterns (no homogenous color goo, no icon-in-rounded-square filler, no default serif heroes, no cards-in-cards).
3. **[claudiusararu/unslop-ui-skill](https://github.com/claudiusararu/unslop-ui-skill)**  
   *Focus:* Catalog of ~100 specific AI design tells and automated rulesets for AI agents (Cursor, Claude Code, v0).

---

## 2. Hard Anti-Slop Directives for Coding Agents

*Place this block directly into `.cursorrules`, `CLAUDE.md`, or the system prompt of any coding agent modifying this repo.*

```markdown
### STRICT DESIGN CONSTRAINTS (ANTI-SLOP RULES)

1. COLOR PALETTE DISCIPLINE (FINTECH PRECISION BLUE):
   - Replace the electric orange/vermillion (`rgb(255 62 0)`) accent entirely.
   - Standardize on Cobalt / Deep International Blue:
     * Light mode accent: `#1D4ED8` (Cobalt blue)
     * Dark mode accent: `#3B82F6` (Clear technical blue)
     * Neutral surfaces: `#09090B` / `#111315` for dark mode, `#FFFFFF` / `#FAFAFA` for light mode.
     * Text: Near-black `#18181B` (light mode), crisp off-white `#F4F4F5` (dark mode).
   - Accents belong ONLY on interactive focus points (primary CTA, active navigation/tabs, inline links). NEVER sprinkle accent colors across words in headings.

2. NO MARQUEES OR MOVING TICKERS:
   - Completely forbidden: infinite text carousels (e.g. "Strategy ✦ Discovery ✦ Execution").
   - Replace with intentional static content or clean whitespace.

2. NO ARBITRARY WORD-LEVEL ITALICS OR ACCENT COLORS:
   - Do NOT italicize or color single words inside headings (e.g., no "Case studies, *deeply* told", no "The *craft* behind").
   - Headings must use unified font styling and uniform color.

3. NO DECORATIVE NUMBERING EPIDEMIC:
   - Do NOT prefix every section, card, or navigation link with "01", "02", ".01", ".02".
   - Numbers are only permitted where an actual sequential ordering exists (e.g., numbered chronological steps).

4. NO FAUX-MAGAZINE / TEMPLATE FILLER METADATA:
   - Remove "Vol. 04 — Edition 2026", radar ping badges, and abstract metadata tags that serve no functional purpose.

5. NO RELIANCE ON BROKEN CLIENT-SIDE COUNT-UPS:
   - All high-impact metrics (e.g., "Rp 2T+ GTV", "55% User Growth") must render in static SSR HTML. No initial "0" state waiting for client hydration.

6. NO ABSTRACT FILLER GRAPHICS:
   - Drop random CSS dot matrixes (`radial-gradient` dots), faux grain overlays, and decorative grid lines.
   - Replace abstract decorative card backgrounds with real product artifacts (sanitized C4 diagrams, UI wireframes, system architecture flows).

7. TYPOGRAPHY DISCIPLINE (NO INSTRUMENT SERIF / NO AI STARTER STACK):
   - Completely remove Instrument Serif.
   - Standardize on an authoritative Technical / Modernist Sans system:
     * Display & Headings: Geist Sans or Inter Display (tight tracking `-0.02em` to `-0.03em`, medium/semibold weights, uniform color).
     * Body Text: Clean neutral Sans with generous line-height (`1.6` to `1.7`) for legibility.
     * Technical metadata & codes: JetBrains Mono or Geist Mono (used strictly for timestamps, tags, and metrics).
   - This moves the site from a "fictional boutique agency" into an authoritative, engineering-adjacent Product Manager aesthetic (Stripe / Linear / Vercel style).
```

---

## 3. What to Build: Section-by-Section Roadmap

### Phase 1: High-Impact "Unslopping" (Immediate Fixes)

- [ ] **Fix Metric SSR Hydration:**
  - Audit hero statistics component.
  - Hardcode initial SSR values so the page never flashes `Rp 0T+`, `0%`, `0+`.
- [ ] **Strip the Marquee Strip:**
  - Delete the ticker component completely.
  - Option A: Leave clean spacing between Hero and Featured Work.
  - Option B: Replace with a clean, low-contrast grayscale static client/company logo bar (`Doitpay`, `Transfez`, `Zero One Group`, `HM Sampoerna`).
- [ ] **Clean Up Typographic Tells:**
  - Remove all `.ital` and `text-vermillion` spans inside headings across `app/page.tsx` and `app/about/page.tsx`.
  - Strip numeral prefixes from navigation and section titles (`00 Index`, `02 Selected work`, `04 Toolkit`).
- [ ] **De-AI the Hero Copy:**
  - Move away from generic third-person buzzwords.
  - Refine hero statement to grounded, specific product achievements:
    > *"Product Manager currently leading core payments & disbursement infrastructure at Doitpay. Previously built consumer remittance products at Transfez (scaling to Rp 2T+ GTV) and delivered enterprise AI platforms at Zero One Group."*

---

### Phase 2: Authentic Senior PM Artifacts (Proof of Work)

- [ ] **Visual Case Study Thumbnails:**
  - Replace dark abstract placeholder cards with actual visual deliverables:
    1. **HM Sampoerna Decoupling:** Sanitized C4 Container diagram or system architecture boundary map.
    2. **Transfez Remittance:** Annotated user flow of the KYC / onboarding funnel revamp or corridor rollout graphic.
    3. **AI-Powered LMS / Sales Dashboard:** Actual UI screen capture or wireframe flow (with client data redacted).
    4. **Doitpay Core Disbursement:** Disbursement state machine diagram or reconciliation flow.
- [ ] **Case Study Deep-Dives Restructure:**
  - Current format is identical across all projects (Challenge → 5 Process points → Solution → 3 Outcomes).
  - Break this formulaic template into real PM narratives:
    - *The Trade-offs:* What hard decisions were made?
    - *The Technical Complexity:* Why was decoupling or KYC optimization hard?
    - *The Retrospective:* What would be done differently today?
- [ ] **Toolkit Section Redesign:**
  - Eliminate the generic pill/tag grid listing 20+ buzzwords (`Fintech`, `Mobile Application`, `B2B`).
  - Replace with **"How I Operate"**: 3 concrete operational stances with specific examples (e.g., how you write specs, how you run tech due diligence, how you validate compliance).

---

### Phase 3: Brand & Editorial Voice

- [ ] **Typography Overhaul (Technical Modernist Sans):**
  - Completely drop `Instrument Serif`.
  - Shift all headings to **Geist Sans** (with `-0.025em` letter-spacing, font-weight 600) for a precise, senior engineering/product look.
  - Retain `Geist Mono` or `JetBrains Mono` strictly for metrics, metadata, and dates.
- [ ] **Writing / Journal ("Notes on Product"):**
  - Add 2–3 short, opinionated field essays or case teardowns instead of standard template posts.
  - Examples:
    - *De-risking Legacy Decoupling in Enterprise FMCG Systems*
    - *Designing Core Disbursement State Machines for Zero-Failure Scenarios*
- [ ] **Footer & Contact Streamlining:**
  - Remove "Jakarta · Indonesia · UTC+7 · Set in Instrument Serif · Geist · JetBrains Mono".
  - Replace with clean direct contact points (Email, LinkedIn, GitHub, Resume).

---

## 4. Execution Checklist for Coding Session

When launching your agent (Claude Code / Cursor / Windsurf):
1. Copy the **Directives in Section 2** into your project's root rule file (`.cursorrules` or `CLAUDE.md`).
2. Run Phase 1 tasks first to immediately shed the generic look.
3. Review every modified component with the question: *"Does this look like a human designer chose it for this specific piece of content, or does this look like an LLM's default starter template?"*
