#!/usr/bin/env node
/**
 * UI design guard for daf-portfolio.
 *
 * Fails when machine-detectable AI/template "tells" appear in UI source:
 * large radii, violet/indigo accents, gradients, glass cards, soft shadows,
 * low-contrast text, default-cream surfaces, generic CTAs, filler copy,
 * marquees, count-ups, ping badges, grain, and faux-magazine metadata.
 *
 * The contract is docs/dhema-me-unslop-guide.md section 2 plus
 * .claude/skills/no-ai-slop/SKILL.md. Judgment calls (centered hero,
 * icon-card grid, weak hierarchy, word-level heading accents, decorative
 * numbering) live in the skill; this script is the backstop CI can enforce.
 *
 * Usage:
 *   node scripts/check-ui-slop.mjs
 *   node scripts/check-ui-slop.mjs --path src/components
 *
 * Exempt a line with `slop-allow`; exempt the next line with `slop-allow-next`.
 * Comment-only lines and `src/data`, `src/lib`, and `src/sanity` are not
 * scanned, so editorial copy and third-party code cannot trip the guard.
 */
import { readdir, readFile } from 'node:fs/promises'
import { CTA_RULE, FILLER_RULE } from './lib/copy-rules.mjs'
import path from 'node:path'
import process from 'node:process'

const TARGETS = ['src/app', 'src/components']
const EXTENSIONS = new Set(['.ts', '.tsx'])
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', '.tmp'])

const RULES = [
  {
    id: 'radius',
    pattern: /\brounded-(?:xl|2xl|3xl)\b/g,
    message: 'Large radius. This system uses 2px (rounded-sm / rounded-none).',
  },
  {
    id: 'violet-accent',
    pattern:
      /\b(?:bg|text|border|from|via|to|ring|fill|stroke|decoration|shadow)-(?:violet|indigo|purple|fuchsia)-\d{2,3}\b/g,
    message: 'Violet/indigo/purple accent. The only accent is vermillion (#FF3E00).',
  },
  {
    id: 'violet-hex',
    pattern: /#(?:8B5CF6|7C3AED|A78BFA|4F46E5|6366F1|818CF8)\b/gi,
    message: 'AI-default purple hex. Use the vermillion token.',
  },
  {
    id: 'gradient-text',
    pattern: /\b(?:gradient-text(?:-subtle)?|bg-clip-text)\b/g,
    message: 'Gradient-clipped text. Use solid ink.',
  },
  {
    id: 'gradient-surface',
    pattern:
      /\bbg-gradient-to-[a-z]+\b|\bbg-\[(?:linear|radial|conic)-gradient|(?:linear|radial|conic)-gradient\(/g,
    message: 'Gradient surface. Use flat color, a hairline rule, or a real image.',
  },
  {
    id: 'glass',
    pattern: /\bglass-card(?:-strong)?\b/g,
    message:
      'Legacy glass card. Use a hairline-bordered surface; glass is only the fixed header.',
  },
  {
    id: 'shadow',
    pattern: /\bshadow-(?:sm|md|lg|xl|2xl|inner)\b|\bshadow-\[/g,
    message: 'Drop shadow. Separate surfaces with borders and contrast.',
  },
  {
    id: 'contrast',
    pattern: /\btext-(?:gray|zinc|slate|neutral)-(?:300|400|500)\b/g,
    message: 'Low-contrast body text. Use text-foreground/70 or stronger (WCAG AA).',
  },
  {
    id: 'cream',
    pattern: /#(?:faf8f4|f5f1ea|f7f3ec)\b/gi,
    message: 'Default cream surface. Use the parchment token (#F4F3F0 via --background).',
  },
  {
    id: 'accent-stripe',
    pattern: /\bborder-l-4\b/g,
    message: 'One-side accent stripe. Use a full hairline border or hierarchy by type.',
  },
  CTA_RULE,
  FILLER_RULE,
  {
    id: 'hover-scale',
    pattern: /\bhover:scale-105\b/g,
    message: 'Reflex hover zoom. Keep motion intentional and sparing.',
  },
  {
    id: 'marquee',
    pattern: /\bMarquee\b|\bmarquee\b|\banimate-(?:marquee|ticker)\b/g,
    message: 'Marquees and moving tickers are forbidden. Use static content or whitespace.',
  },
  {
    id: 'count-up',
    pattern: /\bAnimatedCounter\b|\bcountUp\b|\banimate-count\b/g,
    message: 'Count-up metrics. Render the real value in SSR HTML; no initial 0.',
  },
  {
    id: 'ping-badge',
    pattern: /\banimate-ping\b/g,
    message: 'Radar ping badge (faux live status). Use a static dot or omit it.',
  },
  {
    id: 'grain',
    pattern: /\bgrain\b/g,
    message: 'Faux grain overlay. Use flat surfaces or a real artifact.',
  },
  {
    id: 'faux-metadata',
    pattern: /\bVol\.\s*\d+|\bEdition\s+\d{4}\b/g,
    message: 'Faux-magazine metadata. State a fact the reader can use, or omit it.',
  },
  {
    id: 'serif',
    pattern:
      /\bfont-serif\b|\bfont-display\b|\bfont-editorial\b|\bInstrument[ _-]?Serif\b/g,
    message: 'Serif typography removed. Use Geist Sans for headings and body.',
  },
  {
    id: 'legacy-accent',
    pattern: /vermillion|#FF3E00|255\s+62\s+0/gi,
    message: 'Vermillion accent removed. Cobalt belongs only on interactive elements.',
  },
  {
    id: 'italics',
    pattern: /\bital\b/g,
    message: 'Word-level italic emphasis removed. Headings use one style and one colour.',
  },
  {
    id: 'numbering',
    pattern: /\bnumeral=|>\s*0\d\s*[—–-]\s*/g,
    message: 'Decorative section numbering removed. Numbers only for real sequences.',
  },
]

function usage() {
  console.log(`Usage: node scripts/check-ui-slop.mjs [--path <dir>]

Scans ${TARGETS.join(' and ')} for machine-detectable UI-slop patterns.
Exit 1 on any hit.`)
}

async function collectFiles(dir) {
  const found = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch (error) {
    if (error.code === 'ENOENT') return found
    throw error
  }

  for (const entry of entries) {
    if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      found.push(...(await collectFiles(full)))
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      found.push(full)
    }
  }
  return found
}

function isCommentOnly(trimmed) {
  return (
    trimmed.startsWith('//') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('{/*')
  )
}

async function scanFile(file) {
  const source = await readFile(file, 'utf8')
  const lines = source.split('\n')
  const hits = []
  let allowNext = false

  lines.forEach((line, index) => {
    const trimmed = line.trim()
    if (isCommentOnly(trimmed)) return
    if (allowNext) {
      allowNext = false
      return
    }
    if (line.includes('slop-allow-next')) {
      allowNext = true
      return
    }
    if (line.includes('slop-allow')) return

    for (const rule of RULES) {
      rule.pattern.lastIndex = 0
      const match = rule.pattern.exec(line)
      if (match) {
        hits.push({
          file,
          line: index + 1,
          rule: rule.id,
          message: rule.message,
          matched: match[0],
        })
      }
    }
  })

  return hits
}

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) {
    usage()
    return 0
  }

  let targets = TARGETS
  const pathFlag = args.indexOf('--path')
  if (pathFlag !== -1) {
    const value = args[pathFlag + 1]
    if (!value) {
      console.error('check-ui-slop: --path needs a directory')
      return 2
    }
    targets = [value]
  }

  const root = process.cwd()
  const files = []
  for (const target of targets) {
    files.push(...(await collectFiles(path.resolve(root, target))))
  }

  if (files.length === 0) {
    console.error(`check-ui-slop: no .ts/.tsx files found in ${targets.join(', ')}`)
    return 2
  }

  const allHits = []
  for (const file of files) {
    allHits.push(...(await scanFile(file)))
  }

  const relative = (file) => {
    const rel = path.relative(root, file)
    return rel.startsWith('..') ? file : rel || file
  }
  const label = `${files.length} file${files.length === 1 ? '' : 's'}`

  if (allHits.length === 0) {
    console.log(`UI design guard · ${label}`)
    console.log('✓ No UI-slop patterns found.')
    return 0
  }

  const byFile = new Map()
  for (const hit of allHits) {
    const list = byFile.get(hit.file) ?? []
    list.push(hit)
    byFile.set(hit.file, list)
  }

  console.log(`UI design guard · ${label}`)
  console.log('')
  for (const [file, hits] of byFile) {
    for (const hit of hits) {
      console.log(`${relative(file)}:${hit.line}  ${hit.rule}`)
      console.log(`  ${hit.message}`)
      console.log(`  matched: ${hit.matched}`)
      console.log('')
    }
  }

  console.log(
    `✗ ${allHits.length} hit${allHits.length === 1 ? '' : 's'} in ${byFile.size} file${
      byFile.size === 1 ? '' : 's'
    }.`,
  )
  console.log(
    '  Fix the hit, or mark the line with `// slop-allow` when the match is not a UI pattern.',
  )
  return 1
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(error)
    process.exit(2)
  })
