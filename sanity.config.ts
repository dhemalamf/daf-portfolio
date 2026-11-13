import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureResolver } from 'sanity/structure'
import { projectId, dataset } from './src/sanity/client'
import { schema } from './src/sanity/schemas'

// Grouped sidebar: content by the part of the site it drives, so an editor
// never has to hunt through one alphabetical list.
const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Work')
                .child(
                    S.list().title('Work').items([
                        S.documentTypeListItem('caseStudy').title('Case studies'),
                    ])
                ),
            S.listItem()
                .title('About')
                .child(
                    S.list().title('About').items([
                        S.documentTypeListItem('experience').title('Experience'),
                        S.documentTypeListItem('certification').title('Certifications'),
                        S.documentTypeListItem('skillGroup').title('Skill groups'),
                        S.documentTypeListItem('impactMetric').title('Impact metrics'),
                        S.documentTypeListItem('operatingStance').title('Operating stances'),
                        S.documentTypeListItem('principle').title('Principles'),
                    ])
                ),
            S.listItem()
                .title('Journal')
                .child(S.documentTypeList('post').title('Posts')),
        ])

export default defineConfig({
    name: 'default',
    title: `DAF Portfolio${dataset !== 'production' ? ` (${dataset})` : ''}`,

    projectId,
    dataset,

    basePath: '/studio',

    plugins: [
        structureTool({ structure }),
    ],

    schema,
})
