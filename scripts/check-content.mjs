#!/usr/bin/env node
/**
 * Copy guard for Studio-authored content.
 *
 * `check:ui` only scans source files, so anything typed into Sanity bypasses it.
 * This script fetches the migrated Work and About documents and applies the
 * same copy rules to the strings a human wrote.
 *
 * Deliberate behaviour:
 * - never scans the journal (`post`); that content is out of scope
 * - prints a count per type as information
 * - an empty collection is NOT a failure
 * - exits 0 with a notice when Sanity is unreachable, so offline builds pass
 * - exits 1 only on an actual banned-copy match
 */
import process from 'node:process'
import { createClient } from 'next-sanity'

import { CTA_RULE, EM_DASH_RULE, FILLER_RULE } from './lib/copy-rules.mjs'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'js6xvhgj'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const TYPES = [
    'caseStudy',
    'experience',
    'certification',
    'skillGroup',
    'impactMetric',
    'operatingStance',
    'principle',
]

const RULES = [EM_DASH_RULE, FILLER_RULE, CTA_RULE]

/** Fields that are identifiers, URLs, or image objects, not prose. */
const SKIP_KEYS = new Set([
    '_id',
    '_type',
    '_rev',
    '_createdAt',
    '_updatedAt',
    'slug',
    'articleUrl',
    'credentialUrl',
    'logo',
])

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    timeout: 8000,
})

function* walkStrings(value, path = []) {
    if (value == null) return
    if (typeof value === 'string') {
        yield [path, value]
        return
    }
    if (Array.isArray(value)) {
        for (const item of value) yield* walkStrings(item, path)
        return
    }
    if (typeof value === 'object') {
        for (const [key, child] of Object.entries(value)) {
            if (SKIP_KEYS.has(key) || key.startsWith('_')) continue
            yield* walkStrings(child, [...path, key])
        }
    }
}

async function main() {
    let docs
    try {
        docs = await client.fetch(
            `*[_type in $types && !(_id in path("drafts.**"))]{ _id, _type, ... }`,
            { types: TYPES }
        )
    } catch (error) {
        console.log(
            `content copy guard · ${projectId}/${dataset}\n` +
                `… Sanity unreachable (${error.message ?? error}). Skipping copy check.`
        )
        return 0
    }

    const counts = Object.fromEntries(TYPES.map((type) => [type, 0]))
    const hits = []

    for (const doc of docs) {
        counts[doc._type] = (counts[doc._type] ?? 0) + 1

        for (const [path, text] of walkStrings(doc)) {
            for (const rule of RULES) {
                rule.pattern.lastIndex = 0
                const match = rule.pattern.exec(text)
                if (!match) continue
                hits.push({
                    id: doc._id,
                    type: doc._type,
                    field: path.join('.') || '(root)',
                    rule: rule.id,
                    message: rule.message,
                    matched: match[0],
                })
            }
        }
    }

    console.log(`content copy guard · ${projectId}/${dataset}`)
    console.log('')
    for (const [type, count] of Object.entries(counts)) {
        console.log(`  ${type.padEnd(16)} ${count}`)
    }
    console.log(`  ${'total'.padEnd(16)} ${docs.length}`)
    console.log('')

    if (hits.length === 0) {
        console.log('✓ No banned copy patterns in Studio content.')
        return 0
    }

    for (const hit of hits) {
        console.log(`${hit.type} · ${hit.field}  [${hit.rule}]`)
        console.log(`  ${hit.message}`)
        console.log(`  matched: ${JSON.stringify(hit.matched)}  (document ${hit.id})`)
        console.log('')
    }

    console.log(`✗ ${hits.length} hit${hits.length === 1 ? '' : 's'}. Fix the copy in Studio.`)
    return 1
}

main()
    .then((code) => process.exit(code))
    .catch((error) => {
        console.error(error)
        process.exit(2)
    })
