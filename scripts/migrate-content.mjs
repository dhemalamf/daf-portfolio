#!/usr/bin/env node
/**
 * One-shot migration: copy the static Work and About content into Sanity.
 *
 * Every document gets a deterministic `_id`, so the script is idempotent:
 * running it again replaces the same documents instead of duplicating them.
 * Logos are uploaded once and reused by filename on later runs.
 *
 * Run:
 *   npm run migrate:content -- --dry-run   # print what would be written
 *   npm run migrate:content                # write to Sanity
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local (loaded by --env-file).
 */
import { createReadStream } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createClient } from 'next-sanity'

import { caseStudies } from '../src/data/caseStudies.ts'
import { certifications, experiences, impactMetrics, skills } from '../src/data/profile.ts'
import { operatingStances } from '../src/data/operating.ts'
import { principles } from '../src/data/principles.ts'
import { apiVersion, dataset, projectId } from '../src/sanity/config.ts'

const DRY_RUN = process.argv.includes('--dry-run')
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
    console.error(
        'migrate-content: SANITY_API_WRITE_TOKEN is not set.\n' +
            'Add it to .env.local and run: npm run migrate:content'
    )
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    timeout: 30000,
})

const slugify = (value) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

const keyed = (items, prefix) =>
    items.map((item, index) => ({ _key: `${prefix}${index}`, ...item }))

/** Resolve a local `/logos/x.png` path to a Sanity image reference. */
const logoCache = new Map()
async function resolveLogo(localPath) {
    const filename = path.basename(localPath)
    if (logoCache.has(filename)) return logoCache.get(filename)

    const existing = await client.fetch(
        `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
        { filename }
    )

    let assetId = existing
    if (!assetId) {
        if (DRY_RUN) {
            assetId = `dry-run-upload-${filename}`
        } else {
            const absolute = path.join(root, 'public', localPath.replace(/^\//, ''))
            const asset = await client.assets.upload('image', createReadStream(absolute), {
                filename,
            })
            assetId = asset._id
        }
    }

    const ref = {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
    }
    logoCache.set(filename, ref)
    return ref
}

const documents = []

function addCaseStudies() {
    for (const study of caseStudies) {
        documents.push({
            _id: `caseStudy.${study.slug}`,
            _type: 'caseStudy',
            title: study.title,
            slug: { _type: 'slug', current: study.slug },
            company: study.company,
            industry: study.industry,
            period: study.period,
            summary: study.summary,
            challenge: study.challenge,
            process: study.process,
            solution: study.solution,
            ...(study.tradeOffs ? { tradeOffs: study.tradeOffs } : {}),
            ...(study.technicalHurdles ? { technicalHurdles: study.technicalHurdles } : {}),
            ...(study.retrospective ? { retrospective: study.retrospective } : {}),
            visual: study.visual ?? 'flow',
            outcomes: keyed(study.outcomes, 'o'),
            tags: study.tags,
            featured: study.featured,
            order: study.order,
            publishDate: study.publishDate,
            ...(study.articleUrl ? { articleUrl: study.articleUrl } : {}),
        })
    }
}

async function addExperiences() {
    for (const [index, job] of experiences.entries()) {
        documents.push({
            _id: `experience.${job.id}`,
            _type: 'experience',
            company: job.company,
            ...(job.logo ? { logo: await resolveLogo(job.logo) } : {}),
            role: job.role,
            period: job.period,
            type: job.type,
            description: job.description,
            highlights: job.highlights,
            industries: job.industries,
            order: index,
        })
    }
}

function addCertifications() {
    for (const [index, cert] of certifications.entries()) {
        documents.push({
            _id: `certification.${cert.id}`,
            _type: 'certification',
            name: cert.name,
            issuer: cert.issuer,
            issuedDate: cert.issuedDate,
            credentialUrl: cert.credentialUrl,
            order: index,
        })
    }
}

function addSkillGroups() {
    const groups = [
        { title: 'Product management', items: skills.productManagement },
        { title: 'Technical', items: skills.technical },
        { title: 'Domain expertise', items: skills.domains },
        { title: 'Tools & platforms', items: skills.tools },
    ]
    for (const [index, group] of groups.entries()) {
        documents.push({
            _id: `skillGroup.${slugify(group.title)}`,
            _type: 'skillGroup',
            title: group.title,
            items: group.items,
            order: index,
        })
    }
}

function addImpactMetrics() {
    for (const [index, metric] of impactMetrics.entries()) {
        documents.push({
            _id: `impactMetric.${index}`,
            _type: 'impactMetric',
            value: metric.value,
            label: metric.label,
            description: metric.description,
            order: index,
        })
    }
}

function addOperatingStances() {
    for (const [index, stance] of operatingStances.entries()) {
        documents.push({
            _id: `operatingStance.${index}`,
            _type: 'operatingStance',
            title: stance.title,
            stance: stance.stance,
            example: stance.example,
            order: index,
        })
    }
}

function addPrinciples() {
    for (const [index, principle] of principles.entries()) {
        documents.push({
            _id: `principle.${index}`,
            _type: 'principle',
            title: principle.title,
            text: principle.text,
            order: index,
        })
    }
}

async function main() {
    console.log(
        `migrate-content → ${projectId}/${dataset}${DRY_RUN ? ' (dry run)' : ''}\n`
    )

    addCaseStudies()
    addCertifications()
    addSkillGroups()
    addImpactMetrics()
    addOperatingStances()
    addPrinciples()
    await addExperiences()

    const counts = documents.reduce((acc, doc) => {
        acc[doc._type] = (acc[doc._type] ?? 0) + 1
        return acc
    }, {})

    if (DRY_RUN) {
        for (const doc of documents) {
            const label = doc.title ?? doc.name ?? doc.value ?? doc.company ?? '(untitled)'
            console.log(`  ${doc._type.padEnd(16)} ${doc._id.padEnd(42)} ${label}`)
        }
        console.log('')
    } else {
        let written = 0
        for (const doc of documents) {
            await client.createOrReplace(doc)
            written += 1
            process.stdout.write(`\r  written ${written}/${documents.length}`)
        }
        process.stdout.write('\n')
    }

    console.log('\nSummary')
    for (const [type, count] of Object.entries(counts).sort()) {
        console.log(`  ${type.padEnd(16)} ${count}`)
    }
    console.log(`  ${'total'.padEnd(16)} ${documents.length}`)

    if (DRY_RUN) console.log('\nDry run: nothing written. Re-run without --dry-run.')
}

main().catch((error) => {
    console.error('\nmigrate-content failed:', error.message ?? error)
    process.exit(1)
})
